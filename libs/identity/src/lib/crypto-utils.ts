import * as bs58check from 'bs58check';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import * as sha256 from 'sha256';
import { Network } from './types';

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

export const generateMnemonic = (): string => {
  const entropy = ethers.utils.randomBytes(16);
  return ethers.utils.entropyToMnemonic(entropy);
};

interface KeygenOptions {
  network: Network;
}

export const keygen = (
  mnemonic: string,
  options?: KeygenOptions
): {
  publicKeyBase58Check: string;
  keyPair: ec.KeyPair;
} => {
  const network = options?.network ?? 'mainnet';
  const dKeyChain = ethers.utils.HDNode.fromMnemonic(mnemonic);
  const prefix = PUBLIC_KEY_PREFIXES[network].deso;
  const e = new ec('secp256k1');
  const keyPair = e.keyFromPrivate(dKeyChain.privateKey);
  const desoKey = keyPair.getPublic().encode('array', true);
  const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
  const publicKeyBase58Check = bs58check.encode(prefixAndKey);
  return { publicKeyBase58Check, keyPair };
};

export interface SignOptions {
  isDerivedKey: boolean;
}

export const sign = (
  txHex: string,
  keyPair: ec.KeyPair,
  options?: SignOptions
): string => {
  const transactionBytes = Buffer.from(txHex, 'hex');
  const transactionHash = Buffer.from(sha256.x2(transactionBytes), 'hex');
  const signature = keyPair.sign(transactionHash);
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
