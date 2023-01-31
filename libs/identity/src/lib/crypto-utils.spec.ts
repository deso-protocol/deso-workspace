import { utils as ecUtils } from '@noble/secp256k1';
import * as bs58check from 'bs58check';
import { createDecipheriv, createHash, createHmac } from 'crypto';
import { ec as EC } from 'elliptic';
import {
  bs58PublicKeyToBytes,
  decrypt,
  getSharedSecret,
  kdf,
} from './crypto-utils';
import { setupTestPolyfills } from './test-utils';

describe('crypto-utils', () => {
  beforeAll(setupTestPolyfills);
  describe('decodePublicKey()', () => {
    it('decoded public key matches the implementation from the deso chat app', async () => {
      // see https://github.com/deso-protocol/access-group-messaging-app/blob/cd5c237f5e5729196aac0da161d0851bde78092c/src/services/crypto-utils.service.tsx#L39
      const pubKeyBase58Check =
        'BC1YLivYU6g9w3LXNnS7Amiji3AoQQjDNKgTX8GEeaTo7J9551nFCTB';
      const decodedA = await bs58PublicKeyToBytes(pubKeyBase58Check);
      const decodedB = publicKeyToECBuffer(pubKeyBase58Check);
      expect(decodedA).toEqual(new Uint8Array(decodedB));
    });
  });

  describe('sharedSecret()', () => {
    it('derived secret matches the implementation from the deso chat app', async () => {
      const privateKeyHex =
        'a9bf25f68e2f9302f7f41835dc6e68a483146ef996d0ff11a76b8d4dc38ee832';
      const publicKeyBase58Check =
        'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay';
      const decodedPubKey = await bs58PublicKeyToBytes(publicKeyBase58Check);
      const derivedSecretA = await getSharedSecret(
        ecUtils.hexToBytes(privateKeyHex),
        decodedPubKey
      );
      const derivedSecretB = derive(privateKeyHex, decodedPubKey);

      expect(derivedSecretA).toEqual(new Uint8Array(derivedSecretB));
    });
  });

  describe('kdf', () => {
    it('generates the same shared private key as the deso chat app', async () => {
      const recipientSeedHex =
        'a9bf25f68e2f9302f7f41835dc6e68a483146ef996d0ff11a76b8d4dc38ee832';
      const senderPublicKeyBs58Check =
        'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay';
      const derivedSecret = await getSharedSecret(
        ecUtils.hexToBytes(recipientSeedHex),
        await bs58PublicKeyToBytes(senderPublicKeyBs58Check)
      );
      const sharedPrivateKeyA = await kdf(derivedSecret, 32);
      const sharedPrivateKeyB = referenceKDF(Buffer.from(derivedSecret), 32);
      expect(sharedPrivateKeyA).toEqual(new Uint8Array(sharedPrivateKeyB));
    });
  });

  describe('decrypt', () => {
    // TODO: we need to polyfill crypto.subtle for this to work in node
    it('it works', async () => {
      const recipientSeedHex =
        '7397527efd6752f00ecdd105acc1d91ec9f4a12ea835b246489e6e1be0e980e3';
      const senderPublicKeyBs58Check =
        'tBCKVNhD9Kn6WzxT1EdgR3Tf3Yop6CXQSDZnvMLbST6C33DTbsnku4';
      const encryptedMessage =
        '04b0a85301079a387401bba0efe3e5479c16378236de7fd902b4d9bc5e30f8967d5e0ef3585ad9323b6c0765f0aab1f515493a10e80d73065991010008eff1e2880e70cacdadb11bd002510f35c0a9249f2f0b50bc1d797e06671ba42f0cc01e1ba0385c5e7cc25fe6d90c5ac728283a40fc6d2ec70430028209d86fb0359bb17d3cde5bbc6bafda13cb1eba5f64e6b13c8d64';
      const decryptedMsg = await decrypt(
        recipientSeedHex,
        senderPublicKeyBs58Check,
        encryptedMessage
      );
      expect(decryptedMsg).toEqual('Hi. This is my first test message!');
    });
  });
});

// these reference implementations are from the deso chat app: https://github.com/deso-protocol/access-group-messaging-app/blob/cd5c237f5e5729196aac0da161d0851bde78092c/src/services/crypto-utils.service.tsx#L39
function publicKeyToECBuffer(publicKey: string): Buffer {
  const publicKeyEC = publicKeyToECKeyPair(publicKey);

  return Buffer.from(publicKeyEC.getPublic('array'));
}

function publicKeyToECKeyPair(publicKey: string): EC.KeyPair {
  const decoded = bs58check.decode(publicKey);
  const payload = Uint8Array.from(decoded).slice(3);

  const ec = new EC('secp256k1');
  return ec.keyFromPublic(payload, 'array');
}

export const derive = function (
  privateKeyA: Buffer | string,
  publicKeyB: Buffer | Uint8Array
) {
  const ec = new EC('secp256k1');
  const privKey = ec.keyFromPrivate(privateKeyA);
  const pubKey = ec.keyFromPublic(publicKeyB);
  const Px = privKey.derive(pubKey.getPublic()); // BN instance

  return Buffer.from(Px.toArray());
};

export const referenceKDF = function (secret: Buffer, outputLength: number) {
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

const decryptShared = (
  privateKeyRecipient: Buffer,
  publicKeySender: Buffer,
  encrypted: Buffer,
  opts: { legacy?: boolean } = {}
) => {
  opts = opts || {};
  // 4. Derive the shared secret
  const sharedPx = derive(privateKeyRecipient, publicKeySender);
  const sharedPrivateKey = referenceKDF(sharedPx, 32);

  opts.legacy = false;
  // 5. figure out this bullshit
  return referenceDecrypt(sharedPrivateKey, encrypted, opts);
};

export const referenceDecrypt = function (
  privateKey: Buffer,
  encrypted: Buffer,
  opts: { legacy?: boolean }
) {
  opts = opts || {};
  const metaLength = 1 + 64 + 16 + 32;
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
  const hash = referenceKDF(px, 32);
  const encryptionKey = hash.slice(0, 16);

  const macKey = createHash('sha256').update(hash.slice(16)).digest();
  const dataToMac = Buffer.from(cipherAndIv);
  const hmacGood = hmacSha256Sign(macKey, dataToMac);
  // console.log('reference hmac good', new Uint8Array(hmacGood));
  assert(hmacGood.equals(msgMac), 'Incorrect MAC');

  // decrypt message
  if (opts.legacy) {
    return aesCtrDecryptLegacy(iv, encryptionKey, ciphertext);
  } else {
    return aesCtrDecrypt(iv, encryptionKey, ciphertext);
  }
};

const aesCtrDecrypt = function (counter: Buffer, key: Buffer, data: Buffer) {
  const cipher = createDecipheriv('aes-128-ctr', key, counter);
  const firstChunk = cipher.update(data);
  const secondChunk = cipher.final();
  return Buffer.concat([firstChunk, secondChunk]);
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

function assert(condition: boolean, message: string | undefined) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}
