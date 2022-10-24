import sha256 from 'sha256';
import { Buffer } from 'buffer';

import HDNode from 'hdkey';
import { ec as E } from 'elliptic';

import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHmac,
  createHash,
} from 'crypto';
import bs58check from 'bs58check';

export interface EncryptedMessage {
  EncryptedHex: string;
  PublicKey: string;
  IsSender: boolean;
  Legacy: boolean;
  Version?: number;
  SenderMessagingPublicKey?: string;
  SenderMessagingGroupKeyName?: string;
  RecipientMessagingPublicKey?: string;
  RecipientMessagingGroupKeyName?: string;
}

export type MessagingGroupMember = {
  EncryptedKey: string;
  GroupMemberKeyName: string;
  GroupMemberPublicKeyBase58Check: string;
};

const ec = new E('secp256k1');
const EC = new E('secp256k1');

export function decryptMessage(
  seedHex: string,
  encryptedMessage: EncryptedMessage,
  messagingKeyRandomness: string | undefined,
  ownerPublicKeyBase58Check: string | undefined,
  messagingGroupMemberEntry: MessagingGroupMember | undefined
): string {
  const privateKey: E.KeyPair = seedHexToPrivateKey(seedHex);
  const parentPublicKey =
    ownerPublicKeyBase58Check ||
    privateKeyToDeSoPublicKey(privateKey, Network.mainnet);
  const privateKeyBuffer: Buffer = privateKey
    .getPrivate()
    .toBuffer(undefined, 32);
  const publicKey = encryptedMessage.PublicKey;
  const publicKeyBytes = publicKeyToECBuffer(publicKey);
  const encryptedBytes = new Buffer(encryptedMessage.EncryptedHex, 'hex');
  if (encryptedMessage.Legacy) {
    if (!encryptedMessage.IsSender) {
      return decrypt(privateKeyBuffer, encryptedBytes, {
        legacy: true,
      }).toString();
    } else {
      return '';
    }
  } else if (!encryptedMessage.Version || encryptedMessage.Version === 2) {
    return decryptShared(
      privateKeyBuffer,
      publicKeyBytes,
      encryptedBytes,
      {}
    ).toString();
  } else if (encryptedMessage.Version && encryptedMessage.Version === 3) {
    let privateEncryptionKey = privateKeyBuffer;
    let publicEncryptionKey = publicKeyBytes;
    if (encryptedMessage.IsSender) {
      publicEncryptionKey = publicKeyToECBuffer(
        encryptedMessage.RecipientMessagingPublicKey as string
      );
      privateEncryptionKey = getMessagingKeyForSeed(
        seedHex,
        encryptedMessage.SenderMessagingGroupKeyName as string,
        messagingKeyRandomness
      );
    } else {
      publicEncryptionKey = publicKeyToECBuffer(
        encryptedMessage.SenderMessagingPublicKey as string
      );
      if (encryptedMessage.RecipientMessagingPublicKey === parentPublicKey) {
        privateEncryptionKey = getMessagingKeyForSeed(
          seedHex,
          encryptedMessage.RecipientMessagingGroupKeyName as string,
          messagingKeyRandomness
        );
      } else if (!messagingGroupMemberEntry) {
        throw new Error(
          'Need Messaging Group Member Entry to decrypt non-default-key message'
        );
      } else {
        const groupPrivateEncryptionKey = getMessagingKeyForSeed(
          seedHex,
          messagingGroupMemberEntry.GroupMemberKeyName,
          messagingKeyRandomness
        );
        privateEncryptionKey = decryptGroupMessagingPrivateKeyToMember(
          groupPrivateEncryptionKey,
          Buffer.from(messagingGroupMemberEntry.EncryptedKey, 'hex')
        )
          .getPrivate()
          .toBuffer(undefined, 32);
      }
    }
    return decryptShared(
      privateEncryptionKey,
      publicEncryptionKey,
      encryptedBytes
    ).toString();
  }
  return '';
}

export function decryptMessageFromPrivateMessagingKey(
  privateMessagingKey: string,
  encryptedMessage: any
) {
  debugger;
  const groupPrivateEncryptionKey = Buffer.from(privateMessagingKey, 'hex');

  const publicEncryptionKey = publicKeyToECBuffer(
    encryptedMessage.IsSender
      ? (encryptedMessage.RecipientMessagingPublicKey as string)
      : (encryptedMessage.SenderMessagingPublicKey as string)
  );
  return decryptShared(
    groupPrivateEncryptionKey,
    publicEncryptionKey,
    Buffer.from((encryptedMessage as any).EncryptedText, 'hex')
  );
}
export function decryptMessageFromEncryptedToApplicationGroupMessagingKey(
  encryptedApplicationGroupMessagingKey: string,
  applicationSeedHex: string,
  encryptedMessage: EncryptedMessage
): string | Buffer {
  if (encryptedMessage.Version !== 3) {
    throw new Error('Message must be v3');
  }
  const groupPrivateEncryptionKey = decryptGroupMessagingPrivateKeyToMember(
    Buffer.from(applicationSeedHex, 'hex'),
    Buffer.from(encryptedApplicationGroupMessagingKey, 'hex')
  )
    .getPrivate()
    .toBuffer(undefined, 32);
  const publicEncryptionKey = publicKeyToECBuffer(
    encryptedMessage.IsSender
      ? (encryptedMessage.RecipientMessagingPublicKey as string)
      : (encryptedMessage.SenderMessagingPublicKey as string)
  );
  return decryptShared(
    groupPrivateEncryptionKey,
    publicEncryptionKey,
    Buffer.from((encryptedMessage as any).EncryptedText, 'hex')
  );
}

function encryptMessage(
  seedHex: string,
  senderGroupKeyName: string,
  recipientPublicKey: string,
  message: string,
  messagingKeyRandomness: string | undefined
): any {
  const privateKey = seedHexToPrivateKey(seedHex);
  const privateKeyBuffer = privateKey.getPrivate().toBuffer(undefined, 32);

  const publicKeyBuffer = publicKeyToECBuffer(recipientPublicKey);
  // Depending on if the senderGroupKeyName parameter was passed, we will determine the private key to use when
  // encrypting the message.
  let privateEncryptionKey = privateKeyBuffer;
  if (senderGroupKeyName) {
    privateEncryptionKey = getMessagingKeyForSeed(
      seedHex,
      senderGroupKeyName,
      messagingKeyRandomness
    );
  }

  // Encrypt the message using keys we determined above.
  const encryptedMessage = encryptShared(
    privateEncryptionKey,
    publicKeyBuffer,
    Buffer.from(message, 'hex')
  );
  return {
    encryptedMessage: encryptedMessage.toString('hex'),
  };
}

export function encryptMessageFromPrivateMessagingKey(
  privateMessagingKey: string,
  recipientPublicKey: string,
  message: string
) {
  const groupPrivateEncryptionKey = Buffer.from(privateMessagingKey, 'hex');

  const publicKeyBuffer = publicKeyToECBuffer(recipientPublicKey);
  return encryptShared(
    groupPrivateEncryptionKey,
    publicKeyBuffer,
    Buffer.from(message, 'hex')
  );
}
export function encryptMessageFromEncryptedToApplicationGroupMessagingKey(
  encryptedApplicationGroupMessagingKey: string,
  applicationSeedHex: string,
  recipientPublicKey: string,
  message: string
): Buffer {
  const groupPrivateEncryptionKey = decryptGroupMessagingPrivateKeyToMember(
    Buffer.from(applicationSeedHex, 'hex'),
    Buffer.from(encryptedApplicationGroupMessagingKey, 'hex')
  )
    .getPrivate()
    .toBuffer(undefined, 32);
  const publicKeyBuffer = publicKeyToECBuffer(recipientPublicKey);
  return encryptShared(
    groupPrivateEncryptionKey,
    publicKeyBuffer,
    Buffer.from(message, 'hex')
  );
}

/**
 * Browser ecies-parity implementation.
 *
 * This is based of the eccrypto js module
 *
 * Imported from https://github.com/sigp/ecies-parity with some changes:
 * - Remove PARITY_DEFAULT_HMAC
 * - Use const instead of var/let
 * - Use node:crypto instead of subtle
 */
function assert(condition: boolean, message: string | undefined) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// The KDF as implemented in Parity
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

// AES-128-CTR is used in the Parity implementation
// Get the AES-128-CTR browser implementation
const aesCtrEncrypt = function (counter: Buffer, key: Buffer, data: Buffer) {
  const cipher = createCipheriv('aes-128-ctr', key, counter);
  const firstChunk = cipher.update(data);
  const secondChunk = cipher.final();
  return Buffer.concat([firstChunk, secondChunk]);
};

const aesCtrDecrypt = function (counter: Buffer, key: Buffer, data: Buffer) {
  const cipher = createDecipheriv('aes-128-ctr', key, counter);
  const firstChunk = cipher.update(data);
  const secondChunk = cipher.final();
  return Buffer.concat([firstChunk, secondChunk]);
};

// Legacy AES-128-CTR without second chunk
const aesCtrEncryptLegacy = function (
  counter: Buffer,
  key: Buffer,
  data: Buffer
) {
  const cipher = createCipheriv('aes-128-ctr', key, counter);
  return cipher.update(data).toString();
};

const aesCtrDecryptLegacy = function (
  counter: Buffer,
  key: Buffer,
  data: Buffer
) {
  const cipher = createDecipheriv('aes-128-ctr', key, counter);
  return cipher.update(data).toString();
};

function hmacSha256Sign(key: Buffer, msg: Buffer) {
  return createHmac('sha256', key).update(msg).digest();
}

// Obtain the public elliptic curve key from a private
export const getPublic = function (privateKey: Buffer): Buffer {
  assert(privateKey.length === 32, 'Bad private key');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Buffer(ec.keyFromPrivate(privateKey).getPublic('arr'));
  // return new Buffer(
  //   ec.keyFromPrivate(privateKey).getPublic().encode('array', true)
  // );
};

// ECDSA
export const sign = function (privateKey: Buffer, msg: Buffer) {
  return new Promise(function (resolve) {
    assert(privateKey.length === 32, 'Bad private key');
    assert(msg.length > 0, 'Message should not be empty');
    assert(msg.length <= 32, 'Message is too long');
    resolve(new Buffer(EC.sign(msg, privateKey, { canonical: true }).toDER()));
  });
};

// Verify ECDSA signatures
export const verify = function (publicKey: Buffer, msg: Buffer, sig: Buffer) {
  return new Promise(function (resolve, reject) {
    assert(publicKey.length === 65, 'Bad public key');
    assert(publicKey[0] === 4, 'Bad public key');
    assert(msg.length > 0, 'Message should not be empty');
    assert(msg.length <= 32, 'Message is too long');
    if (EC.verify(msg, sig, publicKey)) {
      resolve(null);
    } else {
      reject(new Error('Bad signature'));
    }
  });
};

//ECDH
export const derive = function (privateKeyA: Buffer, publicKeyB: Buffer) {
  assert(Buffer.isBuffer(privateKeyA), 'Bad input');
  assert(Buffer.isBuffer(publicKeyB), 'Bad input');
  assert(privateKeyA.length === 32, 'Bad private key');
  assert(publicKeyB.length === 65, 'Bad public key');
  assert(publicKeyB[0] === 4, 'Bad public key');
  const keyA = ec.keyFromPrivate(privateKeyA);
  const keyB = ec.keyFromPublic(publicKeyB);
  const Px = keyA.derive(keyB.getPublic()); // BN instance
  return new Buffer(Px.toArray());
};

// Encrypt AES-128-CTR and serialise as in Parity
// Serialization: <ephemPubKey><IV><CipherText><HMAC>
export const encrypt = function (
  publicKeyTo: Buffer,
  msg: Buffer,
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

// Decrypt serialised AES-128-CTR
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

// Encrypt AES-128-CTR and serialise as in Parity
// Using ECDH shared secret KDF
// Serialization: <ephemPubKey><IV><CipherText><HMAC>
export const encryptShared = function (
  privateKeySender: Buffer,
  publicKeyRecipient: Buffer,
  msg: Buffer,
  opts: { iv?: Buffer; legacy?: boolean; ephemPrivateKey?: Buffer } = {}
) {
  opts = opts || {};
  const sharedPx = derive(privateKeySender, publicKeyRecipient);
  const sharedPrivateKey = kdf(sharedPx, 32);
  const sharedPublicKey = getPublic(sharedPrivateKey);

  opts.legacy = false;
  return encrypt(sharedPublicKey, msg, opts);
};

// Decrypt serialised AES-128-CTR
// Using ECDH shared secret KDF
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

export function seedHexToPrivateKey(seedHex: string): E.KeyPair {
  return EC.keyFromPrivate(seedHex);
}

export enum Network {
  mainnet = 'mainnet',
  testnet = 'testnet',
}

const PUBLIC_KEY_PREFIXES = {
  mainnet: {
    bitcoin: [0x00],
    deso: [0xcd, 0x14, 0x0],
  },
  testnet: {
    bitcoin: [0x6f],
    deso: [0x11, 0xc2, 0x0],
  },
};

function privateKeyToDeSoPublicKey(
  privateKey: E.KeyPair,
  network: Network
): string {
  const prefix = PUBLIC_KEY_PREFIXES[network].deso;
  const key = privateKey.getPublic().encode('array', true);
  const prefixAndKey = Uint8Array.from([...prefix, ...key]);

  return bs58check.encode(prefixAndKey);
}

function publicKeyToECKeyPair(publicKey: string): E.KeyPair {
  // Sanity check similar to Base58CheckDecodePrefix from core/lib/base58.go
  if (publicKey.length < 5) {
    throw new Error('Failed to decode public key');
  }
  const decoded = bs58check.decode(publicKey);
  const payload = Uint8Array.from(decoded).slice(3);

  const ec = new E('secp256k1');
  return ec.keyFromPublic(payload, 'array');
}

// Decode public key base58check to Buffer of secp256k1 public key
function publicKeyToECBuffer(publicKey: string): Buffer {
  const publicKeyEC = publicKeyToECKeyPair(publicKey);

  return new Buffer(publicKeyEC.getPublic('array'));
}

function encryptGroupMessagingPrivateKeyToMember(
  memberMessagingPublicKeyBase58Check: string,
  privateKeyHex: string
): string {
  const memberMessagingPkKeyPair = publicKeyToECKeyPair(
    memberMessagingPublicKeyBase58Check
  );
  const messagingPkBuffer = new Buffer(
    memberMessagingPkKeyPair.getPublic().encode('array', true)
  );
  return encrypt(messagingPkBuffer, Buffer.from(privateKeyHex), {
    legacy: false,
  }).toString('hex');
}

function decryptGroupMessagingPrivateKeyToMember(
  privateKeyBuffer: Buffer,
  encryptedPrivateKeyBuffer: Buffer
): E.KeyPair {
  const memberMessagingPriv = decrypt(
    privateKeyBuffer,
    encryptedPrivateKeyBuffer,
    { legacy: false }
  ).toString();
  const secp256k1 = new E('secp256k1');
  return secp256k1.keyFromPrivate(memberMessagingPriv);
}

function getMessagingKeyForSeed(
  seedHex: string,
  keyName: string,
  messagingRandomness: string | undefined
): Buffer {
  return deriveMessagingKey(
    messagingRandomness ? messagingRandomness : seedHex,
    keyName
  );
}

// Compute messaging private key as sha256x2( sha256x2(seed hex) || sha256x2(key name) )
function deriveMessagingKey(seedHex: string, keyName: string): Buffer {
  const secretHash = new Buffer(
    sha256.x2([...new Buffer(seedHex, 'hex')]),
    'hex'
  );
  const keyNameHash = new Buffer(
    sha256.x2([...new Buffer(keyName, 'utf8')]),
    'hex'
  );
  return new Buffer(sha256.x2([...secretHash, ...keyNameHash]), 'hex');
}
