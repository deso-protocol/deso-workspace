import * as noble from '@noble/secp256k1';
import * as bs58check from 'bs58check';
import { ec as EC } from 'elliptic';

describe('@noble/sepc256k1 and elliptic.ec compatibility', () => {
  it('both libs generate the same base58 encoded public key from the same seed hex', () => {
    const seedHex =
      'caf797541983d115976714b8fb33720439e0790a6186106016d427c128b4e7e3';
    const desoMainNetPrefix = [0xcd, 0x14, 0x0];

    // elliptic key pair
    const ec = new EC('secp256k1');
    const ecKeys = ec.keyFromPrivate(seedHex);
    const ecPubKeyCompressed = ecKeys.getPublic().encode('array', true);
    const ecDesoPubKey = new Uint8Array([
      ...desoMainNetPrefix,
      ...ecPubKeyCompressed,
    ]);
    const ecBs58CheckPubKey = bs58check.encode(ecDesoPubKey);

    // noble key pair
    const noblePubKeyCompressed = noble.getPublicKey(seedHex, true);
    const nobleDesoPubKey = new Uint8Array([
      ...desoMainNetPrefix,
      ...noblePubKeyCompressed,
    ]);
    const nobleBs58CheckPubKey = bs58check.encode(nobleDesoPubKey);

    expect(ecBs58CheckPubKey).toEqual(nobleBs58CheckPubKey);
  });
});
