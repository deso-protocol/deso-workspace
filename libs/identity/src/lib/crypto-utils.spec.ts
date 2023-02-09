import bs58check = require('bs58check');
import { createCipheriv, createHash, createHmac, randomBytes } from 'crypto';
import { ec } from 'elliptic';
import { encrypt } from './crypto-utils';
import { setupTestPolyfills } from './test-utils';

describe('encrypt', () => {
  beforeAll(setupTestPolyfills);
  it('works', async () => {
    const testEncryptionKey =
      'tBCKYdH5NpkaafHkU6foem4qx5rDDd9N8nCXXPUecTfHetEarueJJ6';
    const testValueToEncrypt =
      'c9470b0e4bf8a4c307da4bcb1c69810c16745b6601e6988b7a17c5754a027901';
    // const testValueToEncrypt = 'rando plaintext string to encrypt';

    const result1 = await encrypt(testEncryptionKey, testValueToEncrypt);
    const result2 = await encryptAccessGroupPrivateKeyToMemberDefaultKey(
      testEncryptionKey,
      testValueToEncrypt
    );

    expect(result1).toEqual(result2);
  });
});

// reference implementation
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
  console.log('accessGroupPkBuffer', new Uint8Array(accessGroupPkBuffer));
  return encryptReference(accessGroupPkBuffer, accessGroupPrivateKeyHex, {
    legacy: false,
  }).toString('hex');
}

function publicKeyToECKeyPair(publicKey: string): ec.KeyPair {
  // Sanity check similar to Base58CheckDecodePrefix from core/lib/base58.go
  if (publicKey.length < 5) {
    throw new Error('Failed to decode public key');
  }
  const decoded = bs58check.decode(publicKey);
  const payload = Uint8Array.from(decoded).slice(3);
  const EC = new ec('secp256k1');
  return EC.keyFromPublic(payload, 'array');
}

const encryptReference = function (
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
    ciphertext = Buffer.from(aesCtrEncryptLegacy(iv, encryptionKey, msg));
  } else {
    ciphertext = aesCtrEncrypt(iv, encryptionKey, msg);
  }

  const dataToMac = Buffer.concat([iv, ciphertext]);
  const HMAC = hmacSha256Sign(macKey, dataToMac);

  return Buffer.concat([ephemPublicKey, iv, ciphertext, HMAC]);
};

export const getPublic = function (privateKey: Buffer): Buffer {
  const EC = new ec('secp256k1');
  return new Buffer(EC.keyFromPrivate(privateKey).getPublic('array'));
};

function hmacSha256Sign(key: Buffer, msg: Buffer) {
  return createHmac('sha256', key).update(msg).digest();
}

const derive = function (privateKeyA: Buffer, publicKeyB: Buffer) {
  assert(Buffer.isBuffer(privateKeyA), 'Bad input');
  assert(Buffer.isBuffer(publicKeyB), 'Bad input');
  assert(privateKeyA.length === 32, 'Bad private key');
  assert(publicKeyB.length === 65, 'Bad public key');
  assert(publicKeyB[0] === 4, 'Bad public key');
  const EC = new ec('secp256k1');
  const keyA = EC.keyFromPrivate(privateKeyA);
  const keyB = EC.keyFromPublic(publicKeyB);
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
