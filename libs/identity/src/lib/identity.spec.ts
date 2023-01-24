import { getPublicKey, utils as ecUtils } from '@noble/secp256k1';
import { verify } from 'jsonwebtoken';
import KeyEncoder from 'key-encoder';
import * as util from 'util';
import { APIError } from './api';
import {
  DEFAULT_IDENTITY_URI,
  DEFAULT_NODE_URI,
  LOCAL_STORAGE_KEYS,
} from './constants';
import { Identity } from './identity';
import { getAPIFake, getWindowFake } from './test-utils';
import { APIProvider } from './types';

function getPemEncodePublicKey(privateKey: Uint8Array): string {
  const publicKey = getPublicKey(privateKey, true);
  return new KeyEncoder('secp256k1').encodePublic(
    ecUtils.bytesToHex(publicKey),
    'raw',
    'pem'
  );
}

// TODO: test cases
// - make sure we don't overwrite the derivedSeedHex with an empty string if it already exists (can happen during the
//   regular derive key flow).
// - test redirectURI cases
// - test upgrade permissions cases
const originalTextEncoder = globalThis.TextEncoder;

describe('identity', () => {
  let identity: Identity;
  let windowFake: Window;
  let apiFake: APIProvider;
  let postMessageListener: (args: any) => any;

  beforeEach(() => {
    // jest runs in node which has TextEncoder available in its util package.
    globalThis.TextEncoder = originalTextEncoder ?? util.TextEncoder;
    windowFake = getWindowFake({
      addEventListener: (message: any, listener: (args: any) => void): void => {
        postMessageListener = listener;
      },
    });
    apiFake = getAPIFake({
      get: jest
        .fn()
        .mockImplementation((url: string) => {
          if (url.includes('get-single-derived-key')) {
            return Promise.resolve({
              DerivedKey: {
                OwnerPublicKeyBase58Check:
                  'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay',
                DerivedPublicKeyBase58Check:
                  'BC1YLgWMZWj8TVmDB9eJ7ZtWYYZHBDUUsz5ENmbseF3pF7CmopfXhb7',
                ExpirationBlock: 210445,
                IsValid: true,
                TransactionSpendingLimit: {
                  GlobalDESOLimit: 1000000,
                  TransactionCountLimitMap: null,
                  CreatorCoinOperationLimitMap: null,
                  DAOCoinOperationLimitMap: null,
                  NFTOperationLimitMap: null,
                  DAOCoinLimitOrderLimitMap: null,
                  AssociationLimitMap: null,
                  IsUnlimited: false,
                },
                Memo: '',
              },
            });
          }

          return Promise.resolve(null);
        })
        .mockName('api.get'),
      post: jest
        .fn()
        .mockImplementation((url: string) => {
          if (url.endsWith('authorize-derived-key')) {
            return Promise.resolve({
              TransactionHex: ecUtils.bytesToHex(ecUtils.randomBytes(32)),
            });
          }
          return Promise.resolve(null);
        })
        .mockName('api.post'),
    });
    identity = new Identity(windowFake, apiFake);
  });

  afterEach(() => {
    // restore the original globals
    globalThis.TextEncoder = originalTextEncoder;
  });

  describe('.login()', () => {
    it('generates a derived key pair, merges it with the identity payload, and attempts to authorize it', async () => {
      const derivePayload = {
        publicKeyBase58Check:
          'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay',
        btcDepositAddress: 'Not implemented yet',
        ethDepositAddress: 'Not implemented yet',
        expirationBlock: 209932,
        network: 'mainnet',
        accessSignature:
          '304402206b856bec68082935a470e1db7628105551b966ccb3822c93a50754b55160fe5e02207d6c2dd28127419fb9e0bb58e6ea07b7d33bc8cd912dfe876d966ca56aed1aee',
        jwt: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ0MjEzNDIsImV4cCI6MTY3NzAxMzM0Mn0.9pvSmQ5YETLCE1zV76-KhfHdufJp5fkYBKEgl4gw9iQsp0bg91nNXnhnm92836zHydQvhLJPRLry6wZJyskcrg',
        derivedJwt: '',
        messagingPublicKeyBase58Check:
          'BC1YLg1zXewYRmfkVYAJH6CLJsaZxHh6GyzaAWyDQsPVYuG5b5ab7Fb',
        messagingPrivateKey:
          '9816d3604045252a0210a05eba9ea7ca73c838929913199902c972fe2b9fe347',
        messagingKeyName: 'default-key',
        messagingKeySignature:
          '30450221008965fe5e21139c84066ffd53ffa2ab3ef61fe714fec97b4fe411d6beab995ce402201df84d1d581a2cb73b0b135b6f2163f045ef9fab9975960548a46c6090d7eec3',
        transactionSpendingLimitHex: '00000000000001',
        signedUp: false,
      };

      const mockTxSpendingLimit = {
        GlobalDESOLimit: 1000000,
        TransactionCountLimitMap: null,
        CreatorCoinOperationLimitMap: null,
        DAOCoinOperationLimitMap: null,
        NFTOperationLimitMap: null,
        DAOCoinLimitOrderLimitMap: null,
        AssociationLimitMap: null,
        IsUnlimited: false,
      };

      let loginKeyPair = { publicKey: '', seedHex: '' };
      await Promise.all([
        identity.login(),
        // login waits to resolve until it receives a message from the identity
        // here we fake sending that message
        new Promise((resolve) =>
          setTimeout(() => {
            // before identity sends the message we should have a login key pair in local storage
            const keyPairJSON = windowFake.localStorage.getItem(
              LOCAL_STORAGE_KEYS.loginKeyPair
            );
            if (keyPairJSON) {
              loginKeyPair = JSON.parse(keyPairJSON);
            }

            const payload = {
              ...derivePayload,
              derivedPublicKeyBase58Check: loginKeyPair.publicKey,
              derivedSeedHex: '',
            };

            apiFake.get = jest
              .fn()
              .mockImplementation((url: string) => {
                if (
                  url.endsWith(
                    `get-single-derived-key/${payload.publicKeyBase58Check}/${payload.derivedPublicKeyBase58Check}`
                  )
                ) {
                  return Promise.resolve({
                    DerivedKey: {
                      OwnerPublicKeyBase58Check: payload.publicKeyBase58Check,
                      DerivedPublicKeyBase58Check:
                        payload.derivedPublicKeyBase58Check,
                      ExpirationBlock: 210445,
                      IsValid: true,
                      TransactionSpendingLimit: mockTxSpendingLimit,
                      Memo: '',
                    },
                  });
                }

                return Promise.resolve(null);
              })
              .mockName('api.get');

            // NOTE: identity does not provide the derived seed hex here because we generated the keys ourselves
            postMessageListener({
              origin: DEFAULT_IDENTITY_URI,
              source: { close: jest.fn() },
              data: {
                service: 'identity',
                method: 'derive',
                payload: payload,
              },
            });

            resolve(undefined);
          }, 1)
        ),
      ]);

      expect(identity.activePublicKey).toEqual(
        'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay'
      );
      expect(loginKeyPair.seedHex.length > 0).toBe(true);
      expect(loginKeyPair.publicKey.length > 0).toBe(true);
      expect(identity.currentUser).toEqual({
        publicKey: derivePayload.publicKeyBase58Check,
        primaryDerivedKey: {
          ...derivePayload,
          derivedPublicKeyBase58Check: loginKeyPair.publicKey,
          // NOTE: we have updated our local record to include our generated derived seed hex
          derivedSeedHex: loginKeyPair.seedHex,
          // The key is ready for use
          IsValid: true,
          // the key has its fetched permissions cached
          transactionSpendingLimits: mockTxSpendingLimit,
        },
      });
      // login keys cleaned up from local storage
      expect(
        windowFake.localStorage.getItem(LOCAL_STORAGE_KEYS.loginKeyPair)
      ).toBe(null);
    });

    it('works even if authorizing the key fails', async () => {
      apiFake.post = (url: string) => {
        if (url.endsWith('authorize-derived-key')) {
          throw new APIError('Failed to authorize derived key', 400);
        }

        return Promise.resolve(null);
      };

      const derivePayload = {
        publicKeyBase58Check:
          'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay',
        btcDepositAddress: 'Not implemented yet',
        ethDepositAddress: 'Not implemented yet',
        expirationBlock: 209932,
        network: 'mainnet',
        accessSignature:
          '304402206b856bec68082935a470e1db7628105551b966ccb3822c93a50754b55160fe5e02207d6c2dd28127419fb9e0bb58e6ea07b7d33bc8cd912dfe876d966ca56aed1aee',
        jwt: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ0MjEzNDIsImV4cCI6MTY3NzAxMzM0Mn0.9pvSmQ5YETLCE1zV76-KhfHdufJp5fkYBKEgl4gw9iQsp0bg91nNXnhnm92836zHydQvhLJPRLry6wZJyskcrg',
        derivedJwt: '',
        messagingPublicKeyBase58Check:
          'BC1YLg1zXewYRmfkVYAJH6CLJsaZxHh6GyzaAWyDQsPVYuG5b5ab7Fb',
        messagingPrivateKey:
          '9816d3604045252a0210a05eba9ea7ca73c838929913199902c972fe2b9fe347',
        messagingKeyName: 'default-key',
        messagingKeySignature:
          '30450221008965fe5e21139c84066ffd53ffa2ab3ef61fe714fec97b4fe411d6beab995ce402201df84d1d581a2cb73b0b135b6f2163f045ef9fab9975960548a46c6090d7eec3',
        transactionSpendingLimitHex: '00000000000001',
        signedUp: false,
      };

      let loginKeyPair = { publicKey: '', seedHex: '' };
      await Promise.all([
        identity.login(),
        // login waits to resolve until it receives a message from the identity
        // here we fake sending that message
        new Promise((resolve) =>
          setTimeout(() => {
            // before identity sends the message we should have a login key pair in local storage
            const keyPairJSON = windowFake.localStorage.getItem(
              LOCAL_STORAGE_KEYS.loginKeyPair
            );
            if (keyPairJSON) {
              loginKeyPair = JSON.parse(keyPairJSON);
            }

            // NOTE: identity does not provide the derived seed hex here because we generated the keys ourselves
            postMessageListener({
              origin: DEFAULT_IDENTITY_URI,
              source: { close: jest.fn() },
              data: {
                service: 'identity',
                method: 'derive',
                payload: {
                  ...derivePayload,
                  derivedPublicKeyBase58Check: loginKeyPair.publicKey,
                  derivedSeedHex: '',
                },
              },
            });

            resolve(undefined);
          }, 1)
        ),
      ]);

      expect(identity.activePublicKey).toEqual(
        'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay'
      );
      expect(loginKeyPair.seedHex.length > 0).toBe(true);
      expect(loginKeyPair.publicKey.length > 0).toBe(true);
      expect(identity.currentUser).toEqual({
        publicKey: derivePayload.publicKeyBase58Check,
        // NOTE: we don't have any of the get-single-derived-key data in this scenario.
        // This means the user will have no permissions until they authorize the key.
        primaryDerivedKey: {
          ...derivePayload,
          derivedPublicKeyBase58Check: loginKeyPair.publicKey,
          // NOTE: we have updated our local record to include our generated derived seed hex
          derivedSeedHex: loginKeyPair.seedHex,
        },
      });
      // login keys cleaned up from local storage
      expect(
        windowFake.localStorage.getItem(LOCAL_STORAGE_KEYS.loginKeyPair)
      ).toBe(null);
    });
  });

  describe('.jwt()', () => {
    const testDerivedSeedHex =
      'a9bf25f68e2f9302f7f41835dc6e68a483146ef996d0ff11a76b8d4dc38ee832a37bce43086f7209c8e92e1db1884ed28fceac3b9359d356445bb5cfa1ffc9b5';
    const testDerivedPublicKeyBase58Check =
      'BC1YLiLrdnAcK3eCR32ykwqL7aJfYDs9GPf1Ws8gpqjW78Th94uD5jJ';
    const testPublicKeyBase58Check =
      'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay';

    beforeEach(() => {
      // set up a test user in local storage
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        testPublicKeyBase58Check
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [testPublicKeyBase58Check]: {
            primaryDerivedKey: {
              derivedSeedHex: testDerivedSeedHex,
              derivedPublicKeyBase58Check: testDerivedPublicKeyBase58Check,
              publicKeyBase58Check: testPublicKeyBase58Check,
              expirationBlock: 209505,
              IsValid: true,
            },
          },
        })
      );
    });

    it('generates a jwt with a valid signature and can be verified using the correct public key', async () => {
      const jwt = await identity.jwt();
      const parsedAndVerifiedJwt = verify(
        jwt,
        getPemEncodePublicKey(ecUtils.hashToPrivateKey(testDerivedSeedHex)),
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

      // we should't call authorize if the key is valid.
      const authorizeCalls = (apiFake.post as jest.Mock).mock.calls.filter(
        ([url]) => url.endsWith('authorize-derived-key')
      );

      expect(authorizeCalls.length).toBe(0);
      expect(parsedAndVerifiedJwt).toEqual({
        derivedPublicKeyBase58Check: testDerivedPublicKeyBase58Check,
        iat: expect.any(Number),
        exp: expect.any(Number),
      });
    });

    it('it attempts to authorize the primary derived key if it has not been authorized yet', async () => {
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [testPublicKeyBase58Check]: {
            primaryDerivedKey: {
              accessSignature: '0x0',
              derivedSeedHex: testDerivedSeedHex,
              derivedPublicKeyBase58Check: testDerivedPublicKeyBase58Check,
              publicKeyBase58Check: testPublicKeyBase58Check,
              expirationBlock: 209505,
              transactionSpendingLimitHex: '0x0',
            },
          },
        })
      );

      const jwt = await identity.jwt();
      const parsedAndVerifiedJwt = verify(
        jwt,
        getPemEncodePublicKey(ecUtils.hashToPrivateKey(testDerivedSeedHex)),
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

      const [url, payload] = (apiFake.post as jest.Mock).mock.calls[0];
      expect(url).toBe(`${DEFAULT_NODE_URI}/api/v0/authorize-derived-key`);
      expect(payload).toEqual({
        OwnerPublicKeyBase58Check:
          'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay',
        DerivedPublicKeyBase58Check:
          'BC1YLiLrdnAcK3eCR32ykwqL7aJfYDs9GPf1Ws8gpqjW78Th94uD5jJ',
        ExpirationBlock: 209505,
        AccessSignature: '0x0',
        DeleteKey: false,
        DerivedKeySignature: false,
        MinFeeRateNanosPerKB: 1000,
        TransactionSpendingLimitHex: '0x0',
        Memo: windowFake.location.hostname,
        AppName: 'unkown',
        TransactionFees: [],
        ExtraData: {},
      });
      expect(parsedAndVerifiedJwt).toEqual({
        derivedPublicKeyBase58Check: testDerivedPublicKeyBase58Check,
        iat: expect.any(Number),
        exp: expect.any(Number),
      });
    });

    it('is invalid when verified with the wrong public key', async () => {
      const badSeedHex =
        'b3302883522db5863ded181b727153ddb1a7cd1deb5eaa00d406f9e08ae0bfe8024e889deab4a48026141cc1faaea55e0a28e3d87d9fe70cf60a98110110ea34';
      const jwt = await identity.jwt();
      let errorMessage = '';
      try {
        verify(
          jwt,
          getPemEncodePublicKey(ecUtils.hashToPrivateKey(badSeedHex)),
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
      } catch (e: any) {
        errorMessage = e.toString();
      }

      expect(errorMessage).toEqual('JsonWebTokenError: invalid signature');
    });
  });

  describe('.hasPermissions()', () => {
    it.todo('returns true when the user has the required permissions');
    it.todo(
      'returns false when the user does not have the required permissions'
    );
    it.todo('works with a single permission');
    it.todo('it works with multiple permissions');
  });
});
