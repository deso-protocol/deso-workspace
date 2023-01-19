import {
  getPublicKey,
  sign as ecSign,
  utils as ecUtils,
} from '@noble/secp256k1';
import * as bs58 from 'bs58';
import { sign as jwtSign } from 'jsonwebtoken';
import KeyEncoder from 'key-encoder/lib/key-encoder';
import { Network } from './types';

// Browser friendly version of node's Buffer.concat.
// courtesy of ChatGPT!
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

interface KeyPair {
  seedHex: string;
  private: Uint8Array;
  public: Uint8Array;
}

export const PUBLIC_KEY_PREFIXES = {
  mainnet: {
    bitcoin: [0x00],
    deso: [0xcd, 0x14, 0x0],
  },
  testnet: {
    bitcoin: [0x6f],
    deso: [0x11, 0xc2, 0x0],
  },
};

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
  // The @noble/secp256k1 implementation of randomBytes is using the native web
  // crypto API to generate random values.
  //
  // NOTE: we are not using the native web crypto API to actually generate keys because
  // it does not support the secp256k1 curve.
  //
  // See the following links for more info:
  // https://github.com/w3c/webcrypto/issues/82
  // https://github.com/paulmillr/noble-secp256k1/blob/e125abdd2f42b2ad4cf5f4a1b7927d7737b7becf/index.ts#L1582
  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  //
  // hashToPrivateKey requires a byte array length >= 40 and <= 1024.
  // 64 is chosen somewhat arbitrarily here.
  const randomBytes = ecUtils.randomBytes(64);
  const seedHex = ecUtils.bytesToHex(randomBytes);
  const privateKey = ecUtils.hashToPrivateKey(seedHex);

  return {
    seedHex,
    private: privateKey,
    public: getPublicKey(privateKey, true /* isCompressed */),
  };
};

const sha256X2 = async (data: Uint8Array): Promise<Uint8Array> => {
  return ecUtils.sha256(await ecUtils.sha256(data));
};

export const publicKeyToBase58Check = async (
  publicKeyBytes: Uint8Array,
  options?: Base58CheckOptions
): Promise<string> => {
  const prefix = PUBLIC_KEY_PREFIXES[options?.network ?? 'mainnet'].deso;
  const bytes = new Uint8Array([...prefix, ...publicKeyBytes]);
  const checksum = await sha256X2(bytes);
  // This is the same as the implementation in the bs58check package, but we
  // slightly modify it to use the browser friendly version of Buffer.concat.
  // See: https://github.com/bitcoinjs/bs58check/blob/12b3e700f355c5c49d0be3f8fc29be6c66e753e9/base.js#L1
  return bs58.encode(concatUint8Arrays([bytes, checksum], bytes.length + 4));
};

export interface SignOptions {
  isDerivedKey: boolean;
}

export const signTx = async (
  txHex: string,
  seedHex: string,
  options?: SignOptions
): Promise<string> => {
  const transactionBytes = ecUtils.hexToBytes(txHex);
  const hashedTxBytes = await sha256X2(transactionBytes);
  const transactionHashHex = ecUtils.bytesToHex(hashedTxBytes);
  const privateKey = ecUtils.hashToPrivateKey(seedHex);
  const [signatureBytes, recoveryParam] = await ecSign(
    transactionHashHex,
    privateKey,
    {
      canonical: true,
      der: true,
      extraEntropy: true,
      recovered: true,
    }
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

export const signJWT = (
  seedHex: string,
  {
    derivedPublicKeyBase58Check,
    expiration,
  }: { derivedPublicKeyBase58Check?: string; expiration?: number } = {}
): string => {
  const keyEncoder = new KeyEncoder('secp256k1');
  const encodedPrivateKey = keyEncoder.encodePrivate(seedHex, 'raw', 'pem');

  return jwtSign(
    derivedPublicKeyBase58Check ? { derivedPublicKeyBase58Check } : {},
    encodedPrivateKey,
    {
      algorithm: 'ES256',
      expiresIn: expiration,
    }
  );
};
