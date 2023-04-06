import { sha256 } from '@noble/hashes/sha256';
import {
  getPublicKey,
  getSharedSecret as nobleGetSharedSecret,
  Point,
  sign as ecSign,
  utils as ecUtils,
} from '@noble/secp256k1';
import * as bs58 from 'bs58';
import { PUBLIC_KEY_PREFIXES } from './constants';
import { jwtAlgorithm, KeyPair, Network } from './types';
import { TransactionV0 } from './transaction-transcoders';

// Browser friendly version of node's Buffer.concat.
export function concatUint8Arrays(arrays: Uint8Array[], length?: number) {
  if (length === undefined) {
    length = arrays.reduce((acc, array) => acc + array.length, 0);
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (let i = 0; i < arrays.length; i++) {
    if (offset + arrays[i].length > length) {
      result.set(arrays[i].slice(0, length - offset), offset);
      break;
    }
    result.set(arrays[i], offset);
    offset += arrays[i].length;
  }
  return result;
}

export const uvarint64ToBuf = (uint: number): Uint8Array => {
  const result: number[] = [];
  while (uint >= 0x80) {
    result.push(Number((BigInt(uint) & BigInt(0xff)) | BigInt(0x80)));
    uint = Number(BigInt(uint) >> BigInt(7));
  }
  result.push(uint | 0);

  return new Uint8Array(result);
};

export const bufToUvarint64 = (buffer: Uint8Array): [number, Uint8Array] => {
  let x = BigInt(0);
  let s = BigInt(0);

  // TODO: fix linting error
  // eslint-disable-next-line no-constant-condition
  for (let i = 0; true; i++) {
    const byte = buffer[i];

    if (i > 9 || (i == 9 && byte > 1)) {
      throw new Error('uint64 overflow');
    }

    if (byte < 0x80) {
      return [
        Number(BigInt(x) | (BigInt(byte) << BigInt(s))),
        buffer.slice(i + 1),
      ];
    }

    x |= BigInt(byte & 0x7f) << BigInt(s);
    s += BigInt(7);
  }
};

interface Base58CheckOptions {
  network: Network;
}

// We are not using the native web crypto API to actually generate keys
// because it does not support the secp256k1 curve. Instead, we are using
// https://github.com/paulmillr/noble-secp256k1 which is a browser friendly
// alternative to the node elliptic package which is far smaller and only
// focuses on supporting the ec algorithm we are actually interested in here.
// If the web crypto API ever adds support for secp256k1, we should change
// this to use it.
//
// See the following for more info:
// https://github.com/w3c/webcrypto/issues/82
//
// If you don't provide a seed, a random one will be generated for you and a
// random key pair will be returned. If you do provide a seed, it should be a
// randomly generated 32 byte value (Uint8Array of length 32 or hex string of
// length 64)
export const keygen = (seed?: string | Uint8Array): KeyPair => {
  const privateKey = seed ? normalizeSeed(seed) : ecUtils.randomBytes(32);
  const seedHex = ecUtils.bytesToHex(privateKey);

  return {
    seedHex,
    private: privateKey,
    public: getPublicKey(privateKey, true /* isCompressed */),
  };
};

const normalizeSeed = (seed: string | Uint8Array): Uint8Array => {
  if (typeof seed === 'string') {
    return ecUtils.hexToBytes(seed);
  } else {
    return seed;
  }
};

/**
 *
 * @param data could be a hex string or a byte array (Uint8Array)
 * @returns
 */
export const sha256X2 = (data: Uint8Array | string): Uint8Array => {
  const d = typeof data === 'string' ? ecUtils.hexToBytes(data) : data;
  return sha256(sha256(d));
};

export const publicKeyToBase58Check = (
  publicKeyBytes: Uint8Array,
  options?: Base58CheckOptions
): string => {
  const prefix = PUBLIC_KEY_PREFIXES[options?.network ?? 'mainnet'].deso;
  // This is the same as the implementation in the bs58check package, but we
  // slightly modify it to use the browser friendly version of Buffer.concat.
  // See: https://github.com/bitcoinjs/bs58check/blob/12b3e700f355c5c49d0be3f8fc29be6c66e753e9/base.js#L1
  const bytes = new Uint8Array([...prefix, ...publicKeyBytes]);
  const checksum = sha256X2(bytes);
  return bs58.encode(concatUint8Arrays([bytes, checksum], bytes.length + 4));
};

export interface SignOptions {
  isDerivedKey: boolean;
}

const sign = (msgHashHex: string, privateKey: Uint8Array) => {
  return ecSign(msgHashHex, privateKey, {
    // For details about the signing options see: https://github.com/paulmillr/noble-secp256k1#signmsghash-privatekey
    canonical: true,
    der: true,
    extraEntropy: true,
    recovered: true,
  });
};

export const signTx = async (
  txHex: string,
  seedHex: string,
  options?: SignOptions
): Promise<string> => {
  const transactionBytes = ecUtils.hexToBytes(txHex);
  const [_, v1FieldsBuffer] = TransactionV0.fromBytes(transactionBytes);
  const signatureIndex = transactionBytes.length - v1FieldsBuffer.length - 1;
  const v0FieldsWithoutSignature = transactionBytes.slice(0, signatureIndex);
  const hashedTxBytes = sha256X2(transactionBytes);
  const transactionHashHex = ecUtils.bytesToHex(hashedTxBytes);
  const privateKey = ecUtils.hexToBytes(seedHex);
  const [signatureBytes, recoveryParam] = await sign(
    transactionHashHex,
    privateKey
  );

  const signatureLength = uvarint64ToBuf(signatureBytes.length);

  if (options?.isDerivedKey) {
    signatureBytes[0] += 1 + recoveryParam;
  }

  const signedTransactionBytes = ecUtils.concatBytes(
    v0FieldsWithoutSignature,
    signatureLength,
    signatureBytes,
    v1FieldsBuffer
  );

  return ecUtils.bytesToHex(signedTransactionBytes);
};

export const getSignedJWT = async (
  seedHex: string,
  alg: jwtAlgorithm,
  {
    derivedPublicKeyBase58Check,
    // TODO: actually support this... or remove it.
    expiration,
  }: {
    derivedPublicKeyBase58Check?: string;
    expiration?: number;
  }
): Promise<string> => {
  const header = JSON.stringify({ alg, typ: 'JWT' });
  const issuedAt = Math.floor(Date.now() / 1000);
  const thirtyMinFromNow = issuedAt + 30 * 60;
  const payload = JSON.stringify({
    ...(derivedPublicKeyBase58Check ? { derivedPublicKeyBase58Check } : {}),
    iat: issuedAt,
    exp: thirtyMinFromNow,
  });

  const jwt = `${urlSafeBase64(header)}.${urlSafeBase64(payload)}`;
  const [signature] = await sign(
    ecUtils.bytesToHex(sha256(new Uint8Array(new TextEncoder().encode(jwt)))),
    ecUtils.hexToBytes(seedHex)
  );
  const encodedSignature = derToJoseEncoding(signature);

  return `${jwt}.${encodedSignature}`;
};

function urlSafeBase64(str: string) {
  return window
    .btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export const encryptChatMessage = async (
  senderSeedHex: string,
  recipientPublicKeyBase58Check: string,
  message: string
) => {
  const privateKey = ecUtils.hexToBytes(senderSeedHex);
  const recipientPublicKey = bs58PublicKeyToBytes(
    recipientPublicKeyBase58Check
  );
  const sharedPrivateKey = await getSharedPrivateKey(
    privateKey,
    recipientPublicKey
  );
  const sharedPublicKey = getPublicKey(sharedPrivateKey);

  return encrypt(sharedPublicKey, message);
};

/**
 * @param publicEncryptionKey could be in raw bytes or base58check format
 * @param plaintext
 * @returns cipher text as a hex string
 */
export const encrypt = async (
  publicKey: Uint8Array | string,
  plaintext: string
): Promise<string> => {
  const ephemPrivateKey = ecUtils.randomBytes(32);
  const ephemPublicKey = getPublicKey(ephemPrivateKey);
  const publicKeyBytes =
    typeof publicKey === 'string'
      ? await bs58PublicKeyToBytes(publicKey)
      : publicKey;
  const privKey = await getSharedPrivateKey(ephemPrivateKey, publicKeyBytes);
  const encryptionKey = privKey.slice(0, 16);
  const iv = ecUtils.randomBytes(16);
  const macKey = sha256(privKey.slice(16));
  const bytes = new TextEncoder().encode(plaintext);
  const cryptoKey = await globalThis.crypto.subtle.importKey(
    'raw',
    encryptionKey,
    'AES-CTR',
    true,
    ['encrypt']
  );
  const cipherBytes = await globalThis.crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      counter: iv,
      length: 128,
    },
    cryptoKey,
    bytes
  );
  const hmac = await ecUtils.hmacSha256(
    macKey,
    new Uint8Array([...iv, ...new Uint8Array(cipherBytes)])
  );

  return ecUtils.bytesToHex(
    new Uint8Array([
      ...ephemPublicKey,
      ...iv,
      ...new Uint8Array(cipherBytes),
      ...hmac,
    ])
  );
};

export const bs58PublicKeyToCompressedBytes = (str: string) => {
  if (!str) {
    return new Uint8Array(33);
  }
  const pubKeyUncompressed = bs58PublicKeyToBytes(str);
  return Uint8Array.from(
    Point.fromHex(ecUtils.bytesToHex(pubKeyUncompressed)).toRawBytes(true)
  );
};

export const bs58PublicKeyToBytes = (str: string) => {
  const bytes = bs58.decode(str);
  const payload = bytes.slice(0, -4);
  const checksumA = bytes.slice(-4);
  const checksumB = sha256X2(payload);

  if (
    (checksumA[0] ^ checksumB[0]) |
    (checksumA[1] ^ checksumB[1]) |
    (checksumA[2] ^ checksumB[2]) |
    (checksumA[3] ^ checksumB[3])
  ) {
    throw new Error('Invalid checksum');
  }

  return Point.fromHex(ecUtils.bytesToHex(payload.slice(3))).toRawBytes(false);
};

const isValidHmac = (candidate: Uint8Array, knownGood: Uint8Array) => {
  if (candidate.length !== knownGood.length) {
    return false;
  }

  for (let i = 0; i < knownGood.length; i++) {
    if (candidate[i] !== knownGood[i]) {
      return false;
    }
  }

  return true;
};

export const decryptChatMessage = async (
  recipientSeedHex: string,
  publicDecryptionKey: string,
  cipherTextHex: string
) => {
  const privateKey = ecUtils.hexToBytes(recipientSeedHex);
  const publicKey = await bs58PublicKeyToBytes(publicDecryptionKey);
  const sharedPrivateKey = await getSharedPrivateKey(privateKey, publicKey);
  return decrypt(sharedPrivateKey, cipherTextHex);
};

export const decrypt = async (
  privateDecryptionKey: Uint8Array | string,
  cipherTextHex: string
) => {
  const cipherBytes = ecUtils.hexToBytes(cipherTextHex);
  const metaLength = 113;

  if (cipherBytes.length < metaLength) {
    throw new Error('invalid cipher text. data too small.');
  }

  if (!(cipherBytes[0] >= 2 && cipherBytes[0] <= 4)) {
    throw new Error('invalid cipher text.');
  }

  const privateKey = normalizeSeed(privateDecryptionKey);
  const ephemPublicKey = cipherBytes.slice(0, 65);
  const cipherTextLength = cipherBytes.length - metaLength;
  const iv = cipherBytes.slice(65, 65 + 16);
  const cipherAndIv = cipherBytes.slice(65, 65 + 16 + cipherTextLength);
  const cipherText = cipherAndIv.slice(16);
  const msgMac = cipherBytes.slice(65 + 16 + cipherTextLength);
  const sharedSecretKey = await getSharedPrivateKey(privateKey, ephemPublicKey);
  const encryptionKey = sharedSecretKey.slice(0, 16);
  const macKey = sha256(sharedSecretKey.slice(16));
  const hmacKnownGood = await ecUtils.hmacSha256(macKey, cipherAndIv);

  if (!isValidHmac(msgMac, hmacKnownGood)) {
    throw new Error('incorrect MAC');
  }

  const cryptoKey = await globalThis.crypto.subtle.importKey(
    'raw',
    encryptionKey,
    'AES-CTR',
    true,
    ['decrypt']
  );

  const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
    { name: 'AES-CTR', counter: iv, length: 128 },
    cryptoKey,
    cipherText
  );

  return new TextDecoder().decode(decryptedBuffer);
};

export const getSharedPrivateKey = async (
  privKey: Uint8Array,
  pubKey: Uint8Array
) => {
  const sharedSecret = await getSharedSecret(privKey, pubKey);

  return kdf(sharedSecret, 32);
};

export const decodePublicKey = async (publicKeyBase58Check: string) => {
  const decoded = await bs58PublicKeyToBytes(publicKeyBase58Check);
  const withPrefixRemoved = decoded.slice(3);
  const senderPubKeyHex = ecUtils.bytesToHex(withPrefixRemoved);

  return Point.fromHex(senderPubKeyHex).toRawBytes(false);
};

export const getSharedSecret = async (
  privKey: Uint8Array,
  pubKey: Uint8Array
) => {
  // passing true to compress the public key, and then slicing off the first byte
  // matches the implementation of derive in the elliptic package.
  // https://github.com/paulmillr/noble-secp256k1/issues/28#issuecomment-946538037
  return nobleGetSharedSecret(privKey, pubKey, true).slice(1);
};

// taken from reference implementation in the deso chat app:
// https://github.com/deso-protocol/access-group-messaging-app/blob/cd5c237f5e5729196aac0da161d0851bde78092c/src/services/crypto-utils.service.tsx#L91
export const kdf = (secret: Uint8Array, outputLength: number) => {
  let ctr = 1;
  let written = 0;
  let result = new Uint8Array();

  while (written < outputLength) {
    const hash = sha256(
      new Uint8Array([
        ...new Uint8Array([ctr >> 24, ctr >> 16, ctr >> 8, ctr]),
        ...secret,
      ])
    );
    result = new Uint8Array([...result, ...hash]);
    written += 32;
    ctr += 1;
  }

  return result;
};

// This is a modified version of the derToJose function from
// https://github.com/Brightspace/node-ecdsa-sig-formatter/blob/ca25a2fd5ae9dd85036081632936e802a47a1289/src/ecdsa-sig-formatter.js#L32
// The original package is not browser friendly and requires node polyfills. We
// also don't need to be quite as defensive as the original package since we
// have full control of the input.
function derToJoseEncoding(signature: Uint8Array) {
  const paramBytes = 32;

  let offset = 3;
  const rLength = signature[offset];
  offset += 1;
  const rOffset = offset;
  offset += rLength + 1;
  const sLength = signature[offset];
  offset += 1;
  const sOffset = offset;
  offset += sLength;

  const rPadding = paramBytes - rLength;
  const sPadding = paramBytes - sLength;

  const outPut = new Uint8Array(rPadding + rLength + sPadding + sLength);

  for (offset = 0; offset < rPadding; ++offset) {
    outPut[offset] = 0;
  }

  outPut.set(
    signature.slice(rOffset + Math.max(-rPadding, 0), rOffset + rLength),
    offset
  );

  offset = paramBytes;

  for (const o = offset; offset < o + sPadding; ++offset) {
    outPut[offset] = 0;
  }

  outPut.set(
    signature.slice(sOffset + Math.max(-sPadding, 0), sOffset + sLength),
    offset
  );

  const outputChars = outPut.reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ''
  );

  return urlSafeBase64(outputChars);
}

export function deriveAccessGroupKeyPair(
  privateKeyHex: string,
  groupKeyName: string
): KeyPair {
  const secretHash = sha256X2(privateKeyHex);
  const keyNameHash = sha256X2(new TextEncoder().encode(groupKeyName));
  const privateKey = sha256X2(new Uint8Array([...secretHash, ...keyNameHash]));

  return keygen(privateKey);
}
