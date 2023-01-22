import { getPublicKey, utils as ecUtils } from '@noble/secp256k1';
import { verify } from 'jsonwebtoken';
import KeyEncoder from 'key-encoder';
import * as util from 'util';
import { LOCAL_STORAGE_KEYS } from './constants';
import { Identity } from './identity';

const testSeedHex =
  'a9bf25f68e2f9302f7f41835dc6e68a483146ef996d0ff11a76b8d4dc38ee832a37bce43086f7209c8e92e1db1884ed28fceac3b9359d356445bb5cfa1ffc9b5';
const testPublicKeyBase58Check =
  'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay';
const testDerivedPublicKeyBase58Check =
  'BC1YLiLrdnAcK3eCR32ykwqL7aJfYDs9GPf1Ws8gpqjW78Th94uD5jJ';
const windowFake = {
  location: { search: '' },
  localStorage: {
    getItem: (key: string) => {
      switch (key) {
        case LOCAL_STORAGE_KEYS.activePublicKey:
          return testPublicKeyBase58Check;
        case LOCAL_STORAGE_KEYS.identityUsers:
          return JSON.stringify({
            [testPublicKeyBase58Check]: {
              primaryDerivedKey: {
                derivedSeedHex: testSeedHex,
                derivedPublicKeyBase58Check: testDerivedPublicKeyBase58Check,
                publicKeyBase58Check: testPublicKeyBase58Check,
                expirationBlock: 209505,
                isAuthorized: true,
              },
            },
          });
        default:
          return null;
      }
    },
  },
} as Window;

function getPemEncodePublicKey(privateKey: Uint8Array): string {
  const publicKey = getPublicKey(privateKey, true);
  return new KeyEncoder('secp256k1').encodePublic(
    ecUtils.bytesToHex(publicKey),
    'raw',
    'pem'
  );
}

describe('identity.jwt()', () => {
  beforeAll(() => {
    globalThis.TextEncoder = util.TextEncoder;
  });

  it('generates a jwt with a valid signature and can be verified using the correct public key', async () => {
    const identity = new Identity({ windowFake });
    const jwt = await identity.jwt();
    const privateKey = ecUtils.hashToPrivateKey(testSeedHex);
    const parsedAndVerifiedJwt = verify(
      jwt,
      getPemEncodePublicKey(privateKey),
      {
        // See: https://github.com/auth0/node-jsonwebtoken/issues/862
        // tl;dr: the jsonwebtoken library doesn't support the ES256K algorithm,
        // even though this is the correct algorithm for JWTs signed
        // with secp256k1 keys: https://www.rfc-editor.org/rfc/rfc8812.html#name-jose-algorithms-registratio
        // as a workaround, we can use this flag to force it to accept and
        // verify signatures generated with secp256k1 keys
        allowInvalidAsymmetricKeyTypes: true,
      }
    );

    expect(parsedAndVerifiedJwt).toEqual({
      derivedPublicKeyBase58Check: testDerivedPublicKeyBase58Check,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('is invalid when verified with the wrong public key', async () => {
    const badSeedHex =
      'b3302883522db5863ded181b727153ddb1a7cd1deb5eaa00d406f9e08ae0bfe8024e889deab4a48026141cc1faaea55e0a28e3d87d9fe70cf60a98110110ea34';
    const identity = new Identity({ windowFake });
    const jwt = await identity.jwt();
    const badPrivateKey = ecUtils.hashToPrivateKey(badSeedHex);
    let errorMessage = '';

    try {
      verify(jwt, getPemEncodePublicKey(badPrivateKey), {
        // See: https://github.com/auth0/node-jsonwebtoken/issues/862
        // tl;dr: the jsonwebtoken library doesn't support the ES256K algorithm,
        // even though this is the correct algorithm for JWTs signed
        // with secp256k1 keys: https://www.rfc-editor.org/rfc/rfc8812.html#name-jose-algorithms-registratio
        // as a workaround, we can use this flag to force it to accept and
        // verify signatures generated with secp256k1 keys
        allowInvalidAsymmetricKeyTypes: true,
      });
    } catch (e: any) {
      errorMessage = e.toString();
    }

    expect(errorMessage).toEqual('JsonWebTokenError: invalid signature');
  });
});
