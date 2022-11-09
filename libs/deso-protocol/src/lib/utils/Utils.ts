import * as bip39 from 'bip39';
import * as sha256 from 'sha256';
import * as bs58check from 'bs58check';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHmac,
  createHash,
} from 'crypto';
import { ec as EC } from 'elliptic';
import HDKey from 'hdkey';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import HDNode from 'hdkey';
import Deso from '../../index';
import { GetMessagesResponse, MessageEntryResponse } from 'deso-protocol-types';

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

export const encryptMessageV3 = async (
  deso: Deso,
  messageToSend: string,
  derivedSeedHex: string,
  messagingPrivateKey: string,
  RecipientPublicKeyBase58Check: string,
  isDerived: boolean,
  groupName = 'default-key'
): Promise<void> => {
  if (!messagingPrivateKey) {
    throw 'messagingPrivateKey is undefined';
  }

  const response = await deso.social.checkPartyMessagingKey({
    RecipientMessagingKeyName: groupName,
    RecipientPublicKeyBase58Check,
    SenderMessagingKeyName: groupName,
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
  });

  if (!response.RecipientMessagingKeyName) {
    throw 'SenderMessagingKeyName is undefined';
  }

  if (!response.SenderMessagingKeyName) {
    throw 'SenderMessagingKeyName is undefined';
  }
  const encryptedMessage = encryptMessageFromPrivateMessagingKey(
    messagingPrivateKey,
    response.RecipientMessagingPublicKeyBase58Check,
    messageToSend
  );

  if (!encryptedMessage) {
    throw 'unable to encrypt message';
  }
  const transaction = await deso.social.sendMessageWithoutIdentity({
    EncryptedMessageText: encryptedMessage.toString('hex'),
    RecipientPublicKeyBase58Check,
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
    MinFeeRateNanosPerKB: 1000,
    SenderMessagingGroupKeyName: response.SenderMessagingKeyName,
    RecipientMessagingGroupKeyName: response.RecipientMessagingKeyName,
  });

  if (!transaction?.TransactionHex) {
    throw 'failed to construct transaction';
  }

  const signedTransaction = deso.utils.signTransaction(
    derivedSeedHex as string,
    transaction.TransactionHex,
    isDerived
  );

  await deso.transaction.submitTransaction(signedTransaction).catch(() => {
    throw 'something went wrong while submitting the transaction';
  });
};

export function encryptMessageFromPrivateMessagingKey(
  privateMessagingKey: string,
  recipientPublicKey: string,
  message: string
) {
  const privateKey = seedHexToPrivateKey(privateMessagingKey);
  const groupPrivateEncryptionKeyBuffer = privateKey
    .getPrivate()
    .toBuffer(undefined, 32);
  const publicKeyBuffer = publicKeyToECBuffer(recipientPublicKey);
  return encryptShared(
    groupPrivateEncryptionKeyBuffer,
    publicKeyBuffer,
    message
  );
}

function publicKeyToECBuffer(publicKey: string): Buffer {
  const publicKeyEC = publicKeyToECKeyPair(publicKey);

  return new Buffer(publicKeyEC.getPublic('array'));
}

function publicKeyToECKeyPair(publicKey: string): EC.KeyPair {
  // Sanity check similar to Base58CheckDecodePrefix from core/lib/base58.go
  if (publicKey.length < 5) {
    throw new Error('Failed to decode public key');
  }
  const decoded = bs58check.decode(publicKey);
  const payload = Uint8Array.from(decoded).slice(3);

  const ec = new EC('secp256k1');
  return ec.keyFromPublic(payload, 'array');
}

export const encryptShared = function (
  privateKeySender: Buffer,
  publicKeyRecipient: Buffer,
  msg: string,
  opts: { iv?: Buffer; legacy?: boolean; ephemPrivateKey?: Buffer } = {}
) {
  opts = opts || {};
  const sharedPx = derive(privateKeySender, publicKeyRecipient);
  const sharedPrivateKey = kdf(sharedPx, 32);
  const sharedPublicKey = getPublic(sharedPrivateKey);

  opts.legacy = false;
  return encrypt(sharedPublicKey, msg, opts);
};

export const derive = function (privateKeyA: Buffer, publicKeyB: Buffer) {
  assert(Buffer.isBuffer(privateKeyA), 'Bad input');
  assert(Buffer.isBuffer(publicKeyB), 'Bad input');
  assert(privateKeyA.length === 32, 'Bad private key');
  assert(publicKeyB.length === 65, 'Bad public key');
  assert(publicKeyB[0] === 4, 'Bad public key');
  const ec = new EC('secp256k1');
  const keyA = ec.keyFromPrivate(privateKeyA);
  const keyB = ec.keyFromPublic(publicKeyB);
  const Px = keyA.derive(keyB.getPublic()); // BN instance
  return new Buffer(Px.toArray());
};

function assert(condition: boolean, message: string | undefined) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

export const kdf = function (secret: Buffer, outputLength: number) {
  let ctr = 1;
  let written = 0;
  let result = Buffer.from('');
  while (written < outputLength) {
    const ctrs = Buffer.from([ctr >> 24, ctr >> 16, ctr >> 8, ctr]);
    const hashResult = createHash('sha256')
      .update(Buffer.concat([ctrs, secret]))
      .digest();
    result = Buffer.concat([result, hashResult]);
    written += 32;
    ctr += 1;
  }
  return result;
};

export const getPublic = function (privateKey: Buffer): Buffer {
  assert(privateKey.length === 32, 'Bad private key');

  const ec = new EC('secp256k1');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Buffer(ec.keyFromPrivate(privateKey).getPublic('arr'));
  // return new Buffer(
  //   ec.keyFromPrivate(privateKey).getPublic().encode('array', true)
  // );
};

export const encrypt = function (
  publicKeyTo: Buffer,
  msg: string,
  opts: { iv?: Buffer; legacy?: boolean; ephemPrivateKey?: Buffer }
) {
  opts = opts || {};
  const ephemPrivateKey = opts.ephemPrivateKey || randomBytes(32);
  const ephemPublicKey = getPublic(ephemPrivateKey);

  const sharedPx = derive(ephemPrivateKey, publicKeyTo);
  const hash = kdf(sharedPx, 32);
  const iv = (opts.iv as Buffer) || randomBytes(16);
  const encryptionKey = hash.slice(0, 16);

  // Generate hmac
  const macKey = createHash('sha256').update(hash.slice(16)).digest();

  let ciphertext;
  if (opts.legacy) {
    ciphertext = aesCtrEncryptLegacy(iv, encryptionKey, msg);
  } else {
    ciphertext = aesCtrEncrypt(iv, encryptionKey, msg);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore //TODO is this ignore okay?
  const dataToMac = Buffer.from([...iv, ...ciphertext]);
  const HMAC = hmacSha256Sign(macKey, dataToMac);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore //TODO is this ignore okay?
  return Buffer.from([...ephemPublicKey, ...iv, ...ciphertext, ...HMAC]);
};

const aesCtrEncryptLegacy = function (
  counter: Buffer,
  key: Buffer,
  data: string
) {
  const cipher = createCipheriv('aes-128-ctr', key, counter);
  return cipher.update(data).toString();
};
const aesCtrEncrypt = function (counter: Buffer, key: Buffer, data: string) {
  const cipher = createCipheriv('aes-128-ctr', key, counter);
  const firstChunk = cipher.update(data);
  const secondChunk = cipher.final();
  return Buffer.concat([firstChunk, secondChunk]);
};

function hmacSha256Sign(key: Buffer, msg: Buffer) {
  return createHmac('sha256', key).update(msg).digest();
}

export type DecryptedResponse = {
  [publicKey: string]: (MessageEntryResponse & { DecryptedMessage: string })[];
};
export const decryptMessagesV3 = async (
  messages: GetMessagesResponse,
  messagingPrivateKey: string
): Promise<DecryptedResponse> => {
  if (Object.keys(messages).length === 0) {
    alert('no messages found');
    return {};
  }

  let v3Messages = {};
  if (!messages.OrderedContactsWithMessages) {
    return v3Messages;
  }
  messages.OrderedContactsWithMessages.forEach((m) => {
    v3Messages = {
      ...v3Messages,
      [m.PublicKeyBase58Check]: (m.Messages ?? [])
        .filter(
          (m) => m.Version === 3 // needed if you're using an old account with v2 or v1 messages
        )
        .map((m) => {
          try {
            const DecryptedMessage = decryptMessageFromPrivateMessagingKey(
              messagingPrivateKey as string,
              m
            ).toString();
            return { ...m, DecryptedMessage };
          } catch (e: any) {
            return {
              ...m,
              DecryptedMessage: '',
              error: `${e.message} ${m.IsSender}` ?? 'unknown error',
            };
          }
        }),
    };
  });
  return v3Messages as {
    [publicKey: string]: (MessageEntryResponse & {
      DecryptedMessage: string;
    })[];
  };
};
export function decryptMessageFromPrivateMessagingKey(
  privateMessagingKey: string,
  encryptedMessage: any
) {
  const groupPrivateEncryptionKeyBuffer = seedHexToPrivateKey(
    privateMessagingKey
  )
    .getPrivate()
    .toBuffer(undefined, 32);
  const publicEncryptionKey = publicKeyToECBuffer(
    encryptedMessage.IsSender
      ? (encryptedMessage.RecipientMessagingPublicKey as string)
      : (encryptedMessage.SenderMessagingPublicKey as string)
  );
  return decryptShared(
    groupPrivateEncryptionKeyBuffer,
    publicEncryptionKey,
    Buffer.from(encryptedMessage.EncryptedText, 'hex')
  );
}

export const decryptShared = function (
  privateKeyRecipient: Buffer,
  publicKeySender: Buffer,
  encrypted: Buffer,
  opts: { legacy?: boolean } = {}
) {
  opts = opts || {};
  const sharedPx = derive(privateKeyRecipient, publicKeySender);
  const sharedPrivateKey = kdf(sharedPx, 32);

  opts.legacy = false;
  return decrypt(sharedPrivateKey, encrypted, opts);
};

export const decrypt = function (
  privateKey: Buffer,
  encrypted: Buffer,
  opts: { legacy?: boolean }
) {
  opts = opts || {};
  const metaLength = 1 + 64 + 16 + 32;
  //TODO Nina look here lengths both === the same value so it fails here
  assert(
    encrypted.length > metaLength,
    'Invalid Ciphertext. Data is too small'
  );
  assert(encrypted[0] >= 2 && encrypted[0] <= 4, 'Not valid ciphertext.');

  // deserialize
  const ephemPublicKey = encrypted.slice(0, 65);
  const cipherTextLength = encrypted.length - metaLength;
  const iv = encrypted.slice(65, 65 + 16);
  const cipherAndIv = encrypted.slice(65, 65 + 16 + cipherTextLength);
  const ciphertext = cipherAndIv.slice(16);
  const msgMac = encrypted.slice(65 + 16 + cipherTextLength);

  // check HMAC
  const px = derive(privateKey, ephemPublicKey);
  const hash = kdf(px, 32);
  const encryptionKey = hash.slice(0, 16);
  const macKey = createHash('sha256').update(hash.slice(16)).digest();
  const dataToMac = Buffer.from(cipherAndIv);
  const hmacGood = hmacSha256Sign(macKey, dataToMac);
  assert(hmacGood.equals(msgMac), 'Incorrect MAC');

  // decrypt message
  if (opts.legacy) {
    return aesCtrDecryptLegacy(iv, encryptionKey, ciphertext);
  } else {
    return aesCtrDecrypt(iv, encryptionKey, ciphertext);
  }
};

const aesCtrDecryptLegacy = function (
  counter: Buffer,
  key: Buffer,
  data: Buffer
) {
  const cipher = createDecipheriv('aes-128-ctr', key, counter);
  return cipher.update(data).toString();
};

const aesCtrDecrypt = function (counter: Buffer, key: Buffer, data: Buffer) {
  const cipher = createDecipheriv('aes-128-ctr', key, counter);
  const firstChunk = cipher.update(data);
  const secondChunk = cipher.final();
  return Buffer.concat([firstChunk, secondChunk]);
};
