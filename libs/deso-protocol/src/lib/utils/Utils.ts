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
import {
  AccessGroupEntryResponse,
  AccessGroupInfo,
  ChatType,
  DecryptedMessageEntryResponse,
  DeSoNetwork,
  GetMessagesResponse,
  MessageEntryResponse,
  NewMessageEntryResponse,
  SendNewMessageResponse,
} from 'deso-protocol-types';
import { access } from 'fs';
import { stringify } from 'querystring';

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
  return bs58check.encode(Uint8Array.from([...prefix, ...key]));
};

export const publicKeyHexToDeSoPublicKey = (
  publicKeyHex: string,
  network: Network = 'mainnet'
): string => {
  const ec = new EC('secp256k1');
  const publicKey = ec.keyFromPublic(publicKeyHex, 'hex');
  return publicKeyToDeSoPublicKey(publicKey, network);
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

// TODO: better typing
export const decryptAccessGroupMessages = async (
  userPublicKeyBase58Check: string,
  messages: NewMessageEntryResponse[],
  accessGroups: AccessGroupEntryResponse[],
  options?: { decryptedKey: string }
): Promise<DecryptedMessageEntryResponse[]> => {
  return await Promise.all(
    (messages || []).map((m) =>
      decryptAccessGroupMessage(
        userPublicKeyBase58Check,
        m,
        accessGroups,
        options
      )
    )
  );
};

export const decryptAccessGroupMessage = async (
  userPublicKeyBase58Check: string,
  message: NewMessageEntryResponse,
  accessGroups: AccessGroupEntryResponse[],
  options?: { decryptedKey: string }
): Promise<DecryptedMessageEntryResponse> => {
  // TODO: figure out sender vs. receiver in group setting
  // if (message.ChatType === ChatType.GROUPCHAT) {
  //   return Promise.reject('group chat decryption not implemented yet');
  // }
  // Okay we know we're dealing with DMs, so figuring out sender vs. receiver is easy.
  // Well now we're assuming that if you're messaging with base key or default key, you're the sender.
  const IsSender =
    message.SenderInfo.OwnerPublicKeyBase58Check === userPublicKeyBase58Check &&
    (message.SenderInfo.AccessGroupKeyName === 'default-key' ||
      !message.SenderInfo.AccessGroupKeyName);
  const otherPartyAccessGroupInfo = IsSender
    ? message.RecipientInfo
    : message.SenderInfo;
  const myAccessGroupInfo = IsSender
    ? message.SenderInfo
    : message.RecipientInfo;

  // if (myAccessGroupInfo.AccessGroupKeyName !== 'default-key') {
  //   return Promise.reject(
  //     'decrypting with non-default key is not currently supported'
  //   );
  // }

  // okay we actually do need this ALL the time to decrypt stuff. we'll fix this up soon.
  if (!options?.decryptedKey) {
    return Promise.reject(
      'must provide decrypted private messaging key in options for now'
    );
  }

  let DecryptedMessage: string;
  if (message.ChatType === ChatType.DM) {
    if (
      message?.MessageInfo?.ExtraData &&
      message.MessageInfo.ExtraData['unencrypted']
    ) {
      DecryptedMessage = Buffer.from(
        message.MessageInfo.EncryptedText,
        'hex'
      ).toString();
    } else {
      try {
        const decryptedMessageBuffer =
          decryptAccessGroupMessageFromPrivateMessagingKey(
            options.decryptedKey,
            userPublicKeyBase58Check,
            myAccessGroupInfo.AccessGroupKeyName,
            message
          );
        DecryptedMessage = decryptedMessageBuffer.toString();
      } catch (e) {
        return {
          ...message,
          ...{ DecryptedMessage: '', IsSender, error: (e as any).toString() },
        };
      }
    }
  } else {
    // ASSUMPTION: if it's a group chat, then the RECIPIENT has the group key name we need?
    const accessGroup = accessGroups.find((accessGroup) => {
      return (
        accessGroup.AccessGroupKeyName ===
          message.RecipientInfo.AccessGroupKeyName &&
        accessGroup.AccessGroupOwnerPublicKeyBase58Check ===
          message.RecipientInfo.OwnerPublicKeyBase58Check &&
        accessGroup.AccessGroupPublicKeyBase58Check ===
          message.RecipientInfo.AccessGroupPublicKeyBase58Check &&
        accessGroup.AccessGroupMemberEntryResponse
      );
    });
    if (
      !accessGroup ||
      !accessGroup.AccessGroupMemberEntryResponse?.EncryptedKey
    ) {
      console.log('access group not found');
      return {
        ...message,
        ...{
          DecryptedMessage: '',
          IsSender,
          error: 'access group member entry not found',
        },
      };
    }
    // message.SenderInfo
    const encryptedKey =
      accessGroup.AccessGroupMemberEntryResponse.EncryptedKey;
    try {
      const decryptedKey = decryptAccessGroupPrivateKeyToMemberDefaultKey(
        Buffer.from(options.decryptedKey, 'hex'),
        Buffer.from(encryptedKey, 'hex')
      );
      const privateEncryptionKey = decryptedKey
        .getPrivate()
        .toArrayLike(Buffer, undefined, 32);
      const decryptedMessageBuffer =
        decryptAccessGroupMessageFromPrivateMessagingKey(
          privateEncryptionKey.toString('hex'),
          userPublicKeyBase58Check,
          accessGroup.AccessGroupKeyName,
          message
        );
      DecryptedMessage = decryptedMessageBuffer.toString();
    } catch (e) {
      console.error(e);
      return {
        ...message,
        ...{ DecryptedMessage: '', IsSender, error: (e as any).toString() },
      };
    }
  }

  return { ...message, ...{ DecryptedMessage, IsSender, error: '' } };
};

export function decryptMessageFromPrivateMessagingKey(
  privateMessagingKey: string,
  encryptedMessage: MessageEntryResponse
) {
  const groupPrivateEncryptionKeyBuffer = seedHexToPrivateKey(
    privateMessagingKey
  )
    .getPrivate()
    .toArrayLike(Buffer, undefined, 32);
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

export function decryptAccessGroupMessageFromPrivateMessagingKey(
  privateMessagingKey: string,
  userPublicKeyBase58Check: string,
  userMessagingKeyName: string,
  message: NewMessageEntryResponse
) {
  const groupPrivateEncryptionKeyBuffer = seedHexToPrivateKey(
    privateMessagingKey
  )
    .getPrivate()
    .toArrayLike(Buffer, undefined, 32);
  const isRecipient =
    message.RecipientInfo.OwnerPublicKeyBase58Check ===
      userPublicKeyBase58Check &&
    message.RecipientInfo.AccessGroupKeyName === userMessagingKeyName;
  const publicEncryptionKey = publicKeyToECBuffer(
    message.ChatType === ChatType.GROUPCHAT
      ? message.SenderInfo.AccessGroupPublicKeyBase58Check
      : isRecipient
      ? (message.SenderInfo.AccessGroupPublicKeyBase58Check as string)
      : (message.RecipientInfo.AccessGroupPublicKeyBase58Check as string)
  );
  return decryptShared(
    groupPrivateEncryptionKeyBuffer,
    publicEncryptionKey,
    Buffer.from(message.MessageInfo.EncryptedText, 'hex')
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

export const encryptAndSendNewMessage = async (
  deso: Deso,
  messageToSend: string,
  derivedSeedHex: string,
  messagingPrivateKey: string,
  RecipientPublicKeyBase58Check: string,
  isDerived: boolean,
  RecipientMessagingKeyName = 'default-key',
  SenderMessagingKeyName = 'default-key'
): Promise<void> => {
  if (!messagingPrivateKey) {
    return Promise.reject('messagingPrivateKey is undefined');
  }

  if (SenderMessagingKeyName !== 'default-key') {
    return Promise.reject('sender must use default key for now');
  }

  // if (RecipientMessagingKeyName !== 'default-key') {
  //   return Promise.reject('recipient must use default-key for now');
  // }

  const response = await deso.accessGroup.CheckPartyAccessGroups({
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
    SenderAccessGroupKeyName: SenderMessagingKeyName,
    RecipientPublicKeyBase58Check: RecipientPublicKeyBase58Check,
    RecipientAccessGroupKeyName: RecipientMessagingKeyName,
  });

  if (!response.SenderAccessGroupKeyName) {
    return Promise.reject('SenderAccessGroupKeyName is undefined');
  }

  // Okay we're if the recipient doesn't have a key, we're going to
  // send it unencrypted. add some extra data.
  // if (!response.RecipientAccessGroupKeyName) {
  //   return Promise.reject('RecipientAccessGroupKeyName is undefined');
  // }

  let message: string;
  let isUnencrypted = false;
  const ExtraData: { [k: string]: string } = {};
  if (response.RecipientAccessGroupKeyName) {
    const encryptedMessage = encryptMessageFromPrivateMessagingKey(
      messagingPrivateKey,
      response.RecipientAccessGroupPublicKeyBase58Check,
      messageToSend
    );
    message = encryptedMessage.toString('hex');
  } else {
    message = Buffer.from(messageToSend).toString('hex');
    isUnencrypted = true;
    ExtraData['unencrypted'] = 'true';
  }

  // TODO: we can kill this later, but it's nice to ensure that we can actually decrypt the
  // message we've just encrypted.
  // const decryptedMessage = await decryptAccessGroupMessage(
  //   deso.identity.getUserKey() as string,
  //   {
  //     SenderInfo: {
  //       OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
  //       AccessGroupKeyName: response.SenderAccessGroupKeyName,
  //       AccessGroupPublicKeyBase58Check: response.SenderAccessGroupPublicKeyBase58Check,
  //     },
  //     RecipientInfo: {
  //       OwnerPublicKeyBase58Check: response.RecipientPublicKeyBase58Check,
  //       AccessGroupKeyName: response.RecipientAccessGroupKeyName,
  //       AccessGroupPublicKeyBase58Check: isUnencrypted ? response.RecipientPublicKeyBase58Check : response.RecipientAccessGroupPublicKeyBase58Check,
  //     },
  //     MessageInfo: {
  //       EncryptedText: message,
  //       TimestampNanos: 0,
  //       ExtraData,
  //     },
  //     ChatType: ChatType.DM,
  //   },
  //   [],
  //   { decryptedKey: messagingPrivateKey },
  // );

  // if (decryptedMessage.error) {
  //   return Promise.reject('error decrypting message we just encrypted. encrypt/decrypt broken');
  // }

  if (!message) {
    return Promise.reject('error encrypting message');
  }

  // TODO: add support for group chat
  let transaction: SendNewMessageResponse;
  const requestBody = {
    SenderAccessGroupOwnerPublicKeyBase58Check:
      deso.identity.getUserKey() as string,
    SenderAccessGroupPublicKeyBase58Check:
      response.SenderAccessGroupPublicKeyBase58Check,
    SenderAccessGroupKeyName: SenderMessagingKeyName,
    RecipientAccessGroupOwnerPublicKeyBase58Check:
      RecipientPublicKeyBase58Check,
    RecipientAccessGroupPublicKeyBase58Check: isUnencrypted
      ? response.RecipientPublicKeyBase58Check
      : response.RecipientAccessGroupPublicKeyBase58Check,
    RecipientAccessGroupKeyName: response.RecipientAccessGroupKeyName,
    ExtraData,
    EncryptedMessageText: message,
    MinFeeRateNanosPerKB: 1000,
  };
  if (
    !RecipientMessagingKeyName ||
    RecipientMessagingKeyName === 'default-key'
  ) {
    transaction = await deso.accessGroup.SendDmMessage(requestBody, {
      broadcast: false,
    });
  } else {
    // Otherwise, we're sending a group chat.
    transaction = await deso.accessGroup.SendGroupChatMessage(requestBody, {
      broadcast: false,
    });
  }

  if (!transaction?.TransactionHex) {
    return Promise.reject('failed to construct transaction');
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

export const encryptAndSendMessageV3 = async (
  deso: Deso,
  messageToSend: string,
  derivedSeedHex: string,
  messagingPrivateKey: string,
  RecipientPublicKeyBase58Check: string,
  isDerived: boolean,
  RecipientMessagingKeyName = 'default-key',
  SenderMessagingKeyName = 'default-key'
): Promise<void> => {
  if (!messagingPrivateKey) {
    throw 'messagingPrivateKey is undefined';
  }

  const response = await deso.social.checkPartyMessagingKey({
    RecipientMessagingKeyName: RecipientMessagingKeyName,
    RecipientPublicKeyBase58Check,
    SenderMessagingKeyName: SenderMessagingKeyName,
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
    .toArrayLike(Buffer, undefined, 32);
  const publicKeyBuffer = publicKeyToECBuffer(recipientPublicKey);
  return encryptShared(
    groupPrivateEncryptionKeyBuffer,
    publicKeyBuffer,
    message
  );
}

export interface AccessGroupPrivateInfo {
  AccessGroupPublicKeyBase58Check: string;
  AccessGroupPrivateKeyHex: string;
  AccessGroupKeyName: string;
  // AccessGroupSignature: string;
}

export function deriveAccessGroupKey(
  defaultKeyPrivateKeyHex: string,
  groupKeyName: string
): Buffer {
  const secretHash = new Buffer(
    sha256.x2([...new Buffer(defaultKeyPrivateKeyHex, 'hex')]),
    'hex'
  );
  const keyNameHash = new Buffer(
    sha256.x2([...new Buffer(groupKeyName, 'utf8')]),
    'hex'
  );
  return new Buffer(sha256.x2([...secretHash, ...keyNameHash]), 'hex');
}

export function getAccessGroupStandardDerivation(
  defaultKeyPrivateKeyHex: string,
  newGroupKeyName: string,
  network: DeSoNetwork = DeSoNetwork.mainnet
): AccessGroupPrivateInfo {
  const accessGroupPrivateKeyBuff = deriveAccessGroupKey(
    defaultKeyPrivateKeyHex,
    newGroupKeyName
  );
  const ec = new EC('secp256k1');

  const accessGroupPrivateKey = ec.keyFromPrivate(accessGroupPrivateKeyBuff);
  return {
    AccessGroupPublicKeyBase58Check: privateKeyToDeSoPublicKey(
      accessGroupPrivateKey,
      network
    ),
    AccessGroupPrivateKeyHex: accessGroupPrivateKeyBuff.toString('hex'),
    AccessGroupKeyName: newGroupKeyName,
  };
}

export function encryptAccessGroupPrivateKeyToMemberDefaultKey(
  memberDefaultKeyPublicKeyBase58Check: string,
  accessGroupPrivateKeyHex: string
): string {
  const memberDefaultKeyAccessGroupKeyPair = publicKeyToECKeyPair(
    memberDefaultKeyPublicKeyBase58Check
  );
  const accessGroupPkBuffer = new Buffer(
    memberDefaultKeyAccessGroupKeyPair.getPublic('array')
  );
  return encrypt(accessGroupPkBuffer, accessGroupPrivateKeyHex, {
    legacy: false,
  }).toString('hex');
}

export function decryptAccessGroupPrivateKeyToMemberDefaultKey(
  memberDefaultKeyPrivateKeyBuffer: Buffer,
  encryptedAccessGroupPrivateKey: Buffer
): ec.KeyPair {
  const memberAccessPriv = decrypt(
    memberDefaultKeyPrivateKeyBuffer,
    encryptedAccessGroupPrivateKey,
    { legacy: false }
  ).toString();
  const EC = new ec('secp256k1');
  return EC.keyFromPrivate(memberAccessPriv);
}
