import {
  getPublicKey,
  sign as ecSign,
  utils as ecUtils,
} from '@noble/secp256k1';
import * as bs58 from 'bs58';
import { PUBLIC_KEY_PREFIXES } from './constants';
import { jwtAlgorithm, KeyPair, Network } from './types';

// Browser friendly version of node's Buffer.concat.
function concatUint8Arrays(arrays: Uint8Array[], length?: number) {
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

const uvarint64ToBuf = (uint: number): Uint8Array => {
  const result: number[] = [];
  while (uint >= 0x80) {
    result.push(Number((BigInt(uint) & BigInt(0xff)) | BigInt(0x80)));
    uint = Number(BigInt(uint) >> BigInt(7));
  }
  result.push(uint | 0);

  return new Uint8Array(result);
};

interface Base58CheckOptions {
  network: Network;
}

export const keygen = (): KeyPair => {
  // hashToPrivateKey requires a byte array length >= 40 and <= 1024.
  // 64 is chosen somewhat arbitrarily here.
  // ecUtils.randomBytes uses window.crypto.getRandomValues in the browser or
  // crypto.randomBytes in node.
  const seedHex = ecUtils.bytesToHex(ecUtils.randomBytes(64));

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
  const privateKey = ecUtils.hashToPrivateKey(seedHex);

  return {
    seedHex,
    private: privateKey,
    public: getPublicKey(privateKey, true /* isCompressed */),
  };
};

const sha256X2 = async (data: Uint8Array): Promise<Uint8Array> =>
  ecUtils.sha256(await ecUtils.sha256(data));

export const publicKeyToBase58Check = async (
  publicKeyBytes: Uint8Array,
  options?: Base58CheckOptions
): Promise<string> => {
  const prefix = PUBLIC_KEY_PREFIXES[options?.network ?? 'mainnet'].deso;
  // This is the same as the implementation in the bs58check package, but we
  // slightly modify it to use the browser friendly version of Buffer.concat.
  // See: https://github.com/bitcoinjs/bs58check/blob/12b3e700f355c5c49d0be3f8fc29be6c66e753e9/base.js#L1
  const bytes = new Uint8Array([...prefix, ...publicKeyBytes]);
  const checksum = await sha256X2(bytes);
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
  const hashedTxBytes = await sha256X2(transactionBytes);
  const transactionHashHex = ecUtils.bytesToHex(hashedTxBytes);
  const privateKey = ecUtils.hashToPrivateKey(seedHex);
  const [signatureBytes, recoveryParam] = await sign(
    transactionHashHex,
    privateKey
  );

  const signatureLength = uvarint64ToBuf(signatureBytes.length);

  if (options?.isDerivedKey) {
    signatureBytes[0] += 1 + recoveryParam;
  }

  const signedTransactionBytes = ecUtils.concatBytes(
    transactionBytes.slice(0, -1),
    signatureLength,
    signatureBytes
  );

  return ecUtils.bytesToHex(signedTransactionBytes);
};

export const getSignedJWT = async (
  seedHex: string,
  alg: jwtAlgorithm,
  {
    derivedPublicKeyBase58Check,
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
    ecUtils.bytesToHex(await ecUtils.sha256(new TextEncoder().encode(jwt))),
    ecUtils.hashToPrivateKey(seedHex)
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
