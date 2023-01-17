import { encode as bs58checkEncode } from 'bs58check';
import { ec } from 'elliptic';
import { sign as jwtSign } from 'jsonwebtoken';
import KeyEncoder from 'key-encoder/lib/key-encoder';
import { x2 } from 'sha256';
import { Network } from './types';

const ecdsa = new ec('secp256k1');

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

const uvarint64ToBuf = (uint: number): Buffer => {
  const result: number[] = [];
  while (uint >= 0x80) {
    result.push(Number((BigInt(uint) & BigInt(0xff)) | BigInt(0x80)));
    uint = Number(BigInt(uint) >> BigInt(7));
  }
  result.push(uint | 0);

  return Buffer.from(result);
};

interface Base58CheckOptions {
  network: Network;
}

export const keygen = (): ec.KeyPair => {
  return ecdsa.genKeyPair();
};

export const getPublicKeyBase58Check = (
  keyPair: ec.KeyPair,
  options?: Base58CheckOptions
): string => {
  const prefix = PUBLIC_KEY_PREFIXES[options?.network ?? 'mainnet'].deso;
  const desoKey = keyPair.getPublic().encode('array', true);
  const prefixAndKey = Buffer.from([...prefix, ...desoKey]);
  return bs58checkEncode(prefixAndKey);
};

export interface SignOptions {
  isDerivedKey: boolean;
}

export const signTx = (
  txHex: string,
  seedHex: string,
  options?: SignOptions
): string => {
  const keys = ecdsa.keyFromPrivate(seedHex);
  const transactionBytes = Buffer.from(txHex, 'hex');
  const transactionHash = Buffer.from(x2(transactionBytes), 'hex');
  const signature = keys.sign(transactionHash, { canonical: true });
  const signatureBytes = Buffer.from(signature.toDER());
  const signatureLength = uvarint64ToBuf(signatureBytes.length);

  if (options?.isDerivedKey) {
    signatureBytes[0] += 1 + (signature.recoveryParam as number);
  }

  const signedTransactionBytes = Buffer.concat([
    transactionBytes.slice(0, -1),
    signatureLength,
    signatureBytes,
  ]);

  return signedTransactionBytes.toString('hex');
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
