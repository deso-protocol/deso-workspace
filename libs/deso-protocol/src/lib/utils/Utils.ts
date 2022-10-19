import * as bip39 from 'bip39';
import * as sha256 from 'sha256';
import * as bs58check from 'bs58check';
import { ec as EC } from 'elliptic';
import HDKey from 'hdkey';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import HDNode from 'hdkey';

export const uint64ToBufBigEndian = (uint: number): Buffer => {
  const result: number[] = [];
  while (BigInt(uint) >= BigInt(0xff)) {
    result.push(Number(BigInt(uint) & BigInt(0xff)));
    uint = Number(BigInt(uint) >> BigInt(8));
  }
  result.push(Number(BigInt(uint) | BigInt(0)));
  while (result.length < 8) {
    result.push(0);
  }
  return new Buffer(result.reverse());
};

export const uvarint64ToBuf = (uint: number): Buffer => {
  const result: number[] = [];
  while (uint >= 0x80) {
    result.push(Number((BigInt(uint) & BigInt(0xff)) | BigInt(0x80)));
    uint = Number(BigInt(uint) >> BigInt(7));
  }
  result.push(uint | 0);

  return Buffer.from(result);
};

export const keychainToSeedHex = (keychain: HDNode): string => {
  return keychain.privateKey.toString('hex');
};

export interface KeyFromSeedHexInput {
  seedHex: string;
}

export const generateKeyFromSeedHex = ({ seedHex }: KeyFromSeedHexInput) => {
  const ec = new EC('secp256k1');
  return ec.keyFromPrivate(seedHex);
};

/**
 *
 * @param config determines how to generate the keypair, currently it only supports mnemonic
 * @returns  EC.keypair object
 */
export interface KeyFromMnemonicInput {
  mnemonic: string;
  extraText?: string;
  nonStandard?: boolean;
}
export const generateKeyFromSource = ({
  mnemonic,
  extraText = '',
  nonStandard = true,
}: KeyFromMnemonicInput): EC.KeyPair => {
  const ec = new EC('secp256k1');
  const seed = bip39.mnemonicToSeedSync(mnemonic, extraText);

  const hdKey = HDKey.fromMasterSeed(seed).derive(
    "m/44'/0'/0'/0/0",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nonStandard
  );
  const seedHex = hdKey.privateKey.toString('hex');
  return ec.keyFromPrivate(seedHex);
};

export const privateKeyToSeedHex = (privateKey: string): string => {
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');
  const hdKey = HDKey.fromMasterSeed(privateKeyBuffer);
  return hdKey.privateKey.toString('hex');
};

export type Network = 'mainnet' | 'testnet';

/**
 * @returns publicKeyBase58Check Base58 encoded public key
 * @returns keyPair object for signing
 * Generates a new derived key
 */
export const generateKey = async (
  network: Network = 'mainnet'
): Promise<{
  publicKeyBase58Check: string;
  keyPair: ec.KeyPair;
  seedHex: string;
}> => {
  const e = new ec('secp256k1');
  const entropy = ethers.utils.randomBytes(16);
  const dMnemonic = ethers.utils.entropyToMnemonic(entropy);
  const dKeyChain = ethers.utils.HDNode.fromMnemonic(dMnemonic);
  const prefix = PUBLIC_KEY_PREFIXES[network].deso;
  const keyPair = e.keyFromPrivate(dKeyChain.privateKey); // gives us the keypair
  const seedHex = privateKeyToSeedHex(dKeyChain.privateKey);
  const desoKey = keyPair.getPublic().encode('array', true);
  const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
  const publicKeyBase58Check = bs58check.encode(prefixAndKey);
  return { publicKeyBase58Check, keyPair, seedHex };
};

/**
 *
 * @param transactionHex transaction representation from the construction endpoint
 * @param keyPair EC key object used to sign the transaction
 * @returns signed transaction bytes that can be submitted to the submitTransaction endpoint
 */
export const signMessageLocally = ({
  transactionHex,
  keyPair,
}: {
  transactionHex: string;
  keyPair: ec.KeyPair;
}): string => {
  const transactionBytes = new Buffer(transactionHex, 'hex');
  const transactionHash = new Buffer(sha256.x2(transactionBytes), 'hex');
  const sig = keyPair.sign(transactionHash);
  const signatureBytes = new Buffer(sig.toDER());
  const signatureLength = uvarint64ToBuf(signatureBytes.length);
  const signedTransactionBytes = Buffer.concat([
    transactionBytes.slice(0, -1),
    signatureLength,
    signatureBytes,
  ]);
  return signedTransactionBytes.toString('hex');
};

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

export const desoAddressToECKeyPair = (publicKey: string): ec.KeyPair => {
  if (publicKey.length < 5) {
    throw new Error('Failed to decode public key');
  }
  const decoded = bs58check.decode(publicKey);
  const payload = Uint8Array.from(decoded).slice(3);

  const e = new ec('secp256k1');
  return e.keyFromPublic(payload, 'array');
};

export const getMetaMaskMasterPublicKeyFromSignature = (
  signature: string,
  message: number[],
  network: 'mainnet' | 'testnet' = 'mainnet'
): string => {
  const e = new ec('secp256k1');

  const arrayify = ethers.utils.arrayify;
  const messageHash = arrayify(ethers.utils.hashMessage(message));
  const publicKeyUncompressedHexWith0x = ethers.utils.recoverPublicKey(
    messageHash,
    signature
  );
  const messagingPublicKey = e.keyFromPublic(
    publicKeyUncompressedHexWith0x.slice(2),
    'hex'
  );
  const prefix = PUBLIC_KEY_PREFIXES[network].deso;
  const key = messagingPublicKey.getPublic().encode('array', true);
  const desoKey = Uint8Array.from([...prefix, ...key]);
  const encodedDesoKey = bs58check.encode(desoKey);
  return encodedDesoKey;
};

export const privateKeyToDeSoPublicKey = (
  privateKey: ec.KeyPair,
  network: Network = 'mainnet'
): string => {
  const prefix = PUBLIC_KEY_PREFIXES[network].deso;
  const key = privateKey.getPublic().encode('array', true);
  const prefixAndKey = Uint8Array.from([...prefix, ...key]);
  return bs58check.encode(prefixAndKey);
};

export const publicKeyToDeSoPublicKey = (
  publicKey: EC.KeyPair,
  network: Network = 'mainnet'
): string => {
  const prefix = PUBLIC_KEY_PREFIXES[network].deso;
  const key = publicKey.getPublic().encode('array', true);
  return bs58check.encode(Buffer.from([...prefix, ...key]));
};

export function seedHexToECKeyPair(seedHex: string): EC.KeyPair {
  const ec = new EC('secp256k1');
  return ec.keyFromPrivate(seedHex);
}

export const seedHexToPrivateKey = (seedHex: string): EC.KeyPair => {
  const ec = new EC('secp256k1');
  return ec.keyFromPrivate(seedHex);
};

export const signTransaction = (
  seedHex: string,
  transactionHex: string,
  isDerivedKey: boolean
): string => {
  const privateKey = seedHexToPrivateKey(seedHex);

  const transactionBytes = new Buffer(transactionHex, 'hex');
  const transactionHash = new Buffer(sha256.x2(transactionBytes), 'hex');
  const signature = privateKey.sign(transactionHash, { canonical: true });
  const signatureBytes = new Buffer(signature.toDER());
  const signatureLength = uvarint64ToBuf(signatureBytes.length);

  // If transaction is signed with a derived key, use DeSo-DER recoverable signature encoding.
  if (isDerivedKey) {
    signatureBytes[0] += 1 + (signature.recoveryParam as number);
  }

  const signedTransactionBytes = Buffer.concat([
    // This slice is bad. We need to remove the existing signature length field prior to appending the new one.
    // Once we have frontend transaction construction we won't need to do this.
    transactionBytes.slice(0, -1),
    signatureLength,
    signatureBytes,
  ]);

  return signedTransactionBytes.toString('hex');
};
