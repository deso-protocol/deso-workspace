import { getPublicKey, utils as ecUtils } from '@noble/secp256k1';
import { verify } from 'jsonwebtoken';
import KeyEncoder from 'key-encoder';
import { ChatType, NewMessageEntryResponse } from '../backend-types';
import { getAPIFake, getWindowFake } from '../test-utils';
import { APIError } from './api';
import { DEFAULT_IDENTITY_URI, LOCAL_STORAGE_KEYS } from './constants';
import {
  bs58PublicKeyToCompressedBytes,
  keygen,
  publicKeyToBase58Check,
} from './crypto-utils';
import { ERROR_TYPES } from './error-types';
import { Identity } from './identity';
import {
  Transaction,
  TransactionExtraData,
  TransactionMetadataBasicTransfer,
  TransactionNonce,
} from './transaction-transcoders';
import { APIProvider } from './types';

function getPemEncodePublicKey(privateKey: Uint8Array): string {
  const publicKey = getPublicKey(privateKey, true);
  return new KeyEncoder('secp256k1').encodePublic(
    ecUtils.bytesToHex(publicKey),
    'raw',
    'pem'
  );
}

describe('identity', () => {
  let identity: Identity;
  let windowFake: typeof globalThis;
  let apiFake: APIProvider;
  let postMessageListener: (args: any) => any;
  beforeEach(() => {
    windowFake = getWindowFake({
      addEventListener: (message: any, listener: (args: any) => void): void => {
        postMessageListener = listener;
      },
    }) as unknown as typeof globalThis;
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
            const nonce = new TransactionNonce();
            nonce.expirationBlockHeight = 10000;
            nonce.partialId = 10988297;
            const extraData = new TransactionExtraData();
            extraData.kvs = [];
            const exampleTransaction = new Transaction({
              inputs: [],
              outputs: [],
              version: 1,
              feeNanos: 100,
              nonce,
              publicKey: bs58PublicKeyToCompressedBytes(
                'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay'
              ),
              metadata: new TransactionMetadataBasicTransfer(),
              signature: new Uint8Array(0),
              extraData,
            });
            const txBytes = exampleTransaction.toBytes();
            return Promise.resolve({
              TransactionHex: ecUtils.bytesToHex(txBytes),
            });
          }
          return Promise.resolve(null);
        })
        .mockName('api.post'),
    });
    identity = new Identity(windowFake, apiFake);
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

      const testAppName = 'My Cool App';
      identity.configure({
        appName: testAppName,
      });

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

      expect(identity.snapshot().currentUser?.publicKey).toEqual(
        'BC1YLiot3hqKeKhK82soKAeK3BFdTnMjpd2w4HPfesaFzYHUpUzJ2ay'
      );
      expect(loginKeyPair.seedHex.length > 0).toBe(true);
      expect(loginKeyPair.publicKey.length > 0).toBe(true);
      expect(identity.snapshot().currentUser).toEqual({
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
      // authorize derive key called with the correct payload
      const [_, authorizePayload] = (apiFake.post as jest.Mock).mock.calls.find(
        ([url]) => url.endsWith('authorize-derived-key')
      );
      expect(authorizePayload).toEqual({
        OwnerPublicKeyBase58Check: derivePayload.publicKeyBase58Check,
        DerivedPublicKeyBase58Check: loginKeyPair.publicKey,
        ExpirationBlock: 209932,
        AccessSignature: derivePayload.accessSignature,
        DeleteKey: false,
        DerivedKeySignature: false,
        MinFeeRateNanosPerKB: 1000,
        TransactionSpendingLimitHex: '00000000000001',
        Memo: testAppName,
        AppName: testAppName,
        TransactionFees: [],
        ExtraData: {},
      });
    });

    it('throws an error with the expected type if authorizing the key fails due to no money', async () => {
      const errorMsg =
        'Total input 0 is not sufficient to cover the spend amount';
      apiFake.post = (url: string) => {
        if (url.endsWith('authorize-derived-key')) {
          throw new APIError(errorMsg, 400);
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
      let error: any;

      try {
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
      } catch (e: any) {
        error = e;
      }

      expect(error.type).toEqual(ERROR_TYPES.NO_MONEY);
      expect(error.message).toEqual(errorMsg);
    });
  });

  describe('.jwt()', () => {
    const testDerivedSeedHex =
      'a9bf25f68e2f9302f7f41835dc6e68a483146ef996d0ff11a76b8d4dc38ee832';
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
        getPemEncodePublicKey(ecUtils.hexToBytes(testDerivedSeedHex)),
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

    it('is invalid when verified with the wrong public key', async () => {
      const badSeedHex =
        'b3302883522db5863ded181b727153ddb1a7cd1deb5eaa00d406f9e08ae0bfe8';
      const jwt = await identity.jwt();
      let errorMessage = '';
      try {
        verify(jwt, getPemEncodePublicKey(ecUtils.hexToBytes(badSeedHex)), {
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

  describe('.encryptChatMessage/decryptChatMessage()', () => {
    it('encrypts and decrypts a DM chat message', async () => {
      const senderOwnerKeys = await keygen();
      const recipientOwnerKeys = await keygen();
      const senderMessagingKeys = await keygen();
      const recipientMessagingKeys = await keygen();
      const senderOwnerPKBase58 = await publicKeyToBase58Check(
        senderOwnerKeys.public
      );
      const recipientOwnerPKBase58 = await publicKeyToBase58Check(
        recipientOwnerKeys.public
      );
      const senderMessagingPKBase58 = await publicKeyToBase58Check(
        senderMessagingKeys.public
      );
      const recipientMessagingPKBase58 = await publicKeyToBase58Check(
        recipientMessagingKeys.public
      );

      const plaintextMsg =
        'lorem ipsum dolor sit amet, consectetur adipiscing elit';

      // set active user to the sender and encrypt a message
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        senderOwnerPKBase58
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [senderOwnerPKBase58]: {
            primaryDerivedKey: {
              messagingPrivateKey: senderMessagingKeys.seedHex,
            },
          },
          [recipientOwnerPKBase58]: {
            publicKey: recipientOwnerPKBase58,
            primaryDerivedKey: {
              messagingPrivateKey: recipientMessagingKeys.seedHex,
            },
          },
        })
      );

      // encrypt message with the recipient's messaging public key
      const encryptedMsgHex = await identity.encryptMessage(
        recipientMessagingPKBase58,
        plaintextMsg
      );

      // switch active user to the recipient and decrypt the message
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        recipientOwnerPKBase58
      );

      // This is testing a DM. TODO: also test group chats.
      const message: NewMessageEntryResponse = {
        ChatType: ChatType.DM,
        SenderInfo: {
          OwnerPublicKeyBase58Check: senderOwnerPKBase58,
          AccessGroupKeyName: 'default-key',
          AccessGroupPublicKeyBase58Check: senderMessagingPKBase58,
        },
        RecipientInfo: {
          OwnerPublicKeyBase58Check: recipientOwnerPKBase58,
          AccessGroupKeyName: 'default-key',
          AccessGroupPublicKeyBase58Check: recipientMessagingPKBase58,
        },
        MessageInfo: {
          EncryptedText: encryptedMsgHex,

          // we don't care about these fields for this test, but they have to be
          // here to make the type checker happy
          TimestampNanos: 0,
          TimestampNanosString: '',
          ExtraData: {},
        },
      };

      const { DecryptedMessage, error } = await identity.decryptMessage(
        message,
        []
      );

      expect(error).toBe('');
      expect(encryptedMsgHex).not.toEqual(plaintextMsg);
      expect(DecryptedMessage).toEqual(plaintextMsg);
    });

    it('decodes hex encoded, un-encrypted plaintext', async () => {
      const senderOwnerKeys = await keygen();
      const recipientOwnerKeys = await keygen();
      const recipientMessagingKeys = await keygen();
      const senderOwnerPKBase58 = await publicKeyToBase58Check(
        senderOwnerKeys.public
      );
      const recipientOwnerPKBase58 = await publicKeyToBase58Check(
        recipientOwnerKeys.public
      );

      const plaintextMsg =
        'lorem ipsum dolor sit amet, consectetur adipiscing elit';
      const textEncoder = new TextEncoder();
      const bytes = textEncoder.encode(plaintextMsg);
      const hexEncodedMsg = ecUtils.bytesToHex(new Uint8Array(bytes));

      // we only need to set the active user to the recipient, since we're not
      // decrypting anything.
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        recipientOwnerPKBase58
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [recipientOwnerPKBase58]: {
            publicKey: recipientOwnerPKBase58,
            primaryDerivedKey: {
              messagingPrivateKey: recipientMessagingKeys.seedHex,
            },
          },
        })
      );

      const message: NewMessageEntryResponse = {
        ChatType: ChatType.DM,
        SenderInfo: {
          OwnerPublicKeyBase58Check: senderOwnerPKBase58,
          AccessGroupKeyName: 'default-key',
          AccessGroupPublicKeyBase58Check: senderOwnerPKBase58,
        },
        RecipientInfo: {
          OwnerPublicKeyBase58Check: recipientOwnerPKBase58,
          AccessGroupKeyName: 'default-key',
          AccessGroupPublicKeyBase58Check: recipientOwnerPKBase58,
        },
        MessageInfo: {
          EncryptedText: hexEncodedMsg,

          // we don't care about these fields for this test, but they have to be
          // here to make the type checker happy
          TimestampNanos: 0,
          TimestampNanosString: '',
          ExtraData: {
            // this is the important thing for this test
            unencrypted: '1',
          },
        },
      };

      const { DecryptedMessage, error } = await identity.decryptMessage(
        message,
        []
      );

      expect(error).toBe('');
      expect(DecryptedMessage).toEqual(plaintextMsg);
    });
  });

  describe('.hasPermissions()', () => {
    it('returns true when the user has all the required permissions', () => {
      const activeUserKey =
        'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s';
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        activeUserKey
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [activeUserKey]: {
            primaryDerivedKey: {
              IsValid: true,
              transactionSpendingLimits: {
                TransactionCountLimitMap: {
                  BASIC_TRANSFER: 1,
                  SUBMIT_POST: 2,
                },
                CreatorCoinOperationLimitMap: {
                  BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
                    any: 1,
                    buy: 2,
                    sell: 3,
                  },
                },
              },
            },
          },
        })
      );
      const hasPermissions = identity.hasPermissions({
        TransactionCountLimitMap: {
          BASIC_TRANSFER: 1,
          SUBMIT_POST: 1,
        },
        CreatorCoinOperationLimitMap: {
          BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
            any: 1,
            buy: 1,
            sell: 2,
          },
        },
      });
      expect(hasPermissions).toBe(true);
    });
    it('returns false when the user does not have the required permissions', () => {
      const activeUserKey =
        'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s';
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        activeUserKey
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [activeUserKey]: {
            primaryDerivedKey: {
              IsValid: true,
              transactionSpendingLimits: {
                TransactionCountLimitMap: {
                  BASIC_TRANSFER: 1,
                  SUBMIT_POST: 2,
                },
                CreatorCoinOperationLimitMap: {
                  BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
                    any: 1,
                    buy: 2,
                    sell: 3,
                  },
                },
              },
            },
          },
        })
      );
      const hasPermissions = identity.hasPermissions({
        TransactionCountLimitMap: {
          BASIC_TRANSFER: 1,
          SUBMIT_POST: 1,
        },
        CreatorCoinOperationLimitMap: {
          BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
            any: 1,
            buy: 1,
            sell: 4, // this is more than the user can do
          },
        },
      });
      expect(hasPermissions).toBe(false);
    });
    it('works with a single permission', () => {
      const activeUserKey =
        'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s';
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        activeUserKey
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [activeUserKey]: {
            primaryDerivedKey: {
              IsValid: true,
              transactionSpendingLimits: {
                TransactionCountLimitMap: {
                  BASIC_TRANSFER: 1,
                  SUBMIT_POST: 2,
                },
                CreatorCoinOperationLimitMap: {
                  BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
                    any: 1,
                    buy: 2,
                    sell: 3,
                  },
                },
              },
            },
          },
        })
      );
      const hasPermissions = identity.hasPermissions({
        TransactionCountLimitMap: {
          SUBMIT_POST: 3, // more than the user can do
        },
      });
      expect(hasPermissions).toBe(false);
    });
    it('works if the key has unlimited permissions', () => {
      const activeUserKey =
        'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s';
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        activeUserKey
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [activeUserKey]: {
            primaryDerivedKey: {
              IsValid: true,
              transactionSpendingLimits: {
                IsUnlimited: true, // unlimited permissions
              },
            },
          },
        })
      );
      const hasPermissions = identity.hasPermissions({
        TransactionCountLimitMap: {
          SUBMIT_POST: 3, // doesn't matter what we check, it should be allowed
        },
      });
      expect(hasPermissions).toBe(true);
    });
    it('works if checking unlimited permissions for a specific tx', () => {
      const activeUserKey =
        'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s';
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        activeUserKey
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [activeUserKey]: {
            primaryDerivedKey: {
              IsValid: true,
              transactionSpendingLimits: {
                TransactionCountLimitMap: {
                  BASIC_TRANSFER: 1e9,
                  SUBMIT_POST: 2,
                },
                CreatorCoinOperationLimitMap: {
                  BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
                    any: 1,
                    buy: 2,
                    sell: 3,
                  },
                },
              },
            },
          },
        })
      );
      const hasPermissions = identity.hasPermissions({
        TransactionCountLimitMap: {
          BASIC_TRANSFER: 'UNLIMITED',
        },
      });
      expect(hasPermissions).toBe(true);
    });
    it('it returns false if checking for a permission that does not exist yet', () => {
      const activeUserKey =
        'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s';
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.activePublicKey,
        activeUserKey
      );
      windowFake.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [activeUserKey]: {
            primaryDerivedKey: {
              IsValid: true,
              transactionSpendingLimits: {
                TransactionCountLimitMap: {
                  SUBMIT_POST: 2,
                },
                CreatorCoinOperationLimitMap: {
                  BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
                    any: 1,
                    buy: 2,
                    sell: 3,
                  },
                },
              },
            },
          },
        })
      );
      const hasPermissions = identity.hasPermissions({
        TransactionCountLimitMap: {
          // basic transfer is not in the user's actual permissions
          BASIC_TRANSFER: 1,
        },
      });
      expect(hasPermissions).toBe(false);
    });
  });
  describe('.desoAddressToEthereumAddress()', () => {
    it('works', () => {
      expect(
        identity.desoAddressToEthereumAddress(
          'BC1YLiSayiRJKRut5gNW8CnN7vGugm3UzH8wXJiwx4io4FJKgRTGVqF'
        )
      ).toEqual('0x648D0cdA8D9C79fcC3D808fE35c2BF3887bcB6db');
    });
  });
  describe('.ethereumAddressToDesoAddress()', () => {
    it('works for mainnet', async () => {
      const ethAddress = '0x648d0cda8d9c79fcc3d808fe35c2bf3887bcb6db';
      const ethTransactionsForAddressResponse = {
        status: '1',
        message: 'OK',
        result: [
          // This is is just a partial result object. We only care about the from field and the hash.
          {
            from: ethAddress,
            hash: '0x1aeac6a985eeb2937e5a3069e149d70c1b623e3da96853755bfe2b9940a58f14',
          },
        ],
      };

      const queryETHRPCForTransactionResponse = {
        id: 1,
        jsonrpc: '2.0',
        result: {
          accessList: [],
          blockHash:
            '0x0e5fe1cd87180c85350c464e235a5e9e70bb0a4b4b5eff033cc600b4ed76f88f',
          blockNumber: '0x70b92e',
          chainId: '0x5',
          from: '0x648d0cda8d9c79fcc3d808fe35c2bf3887bcb6db',
          gas: '0x5208',
          gasPrice: '0x73a20d11',
          hash: '0x5a63939f9f5f6c90d4a302395e8f9d92be4e4b85d2430ede1d52aa62442c705d',
          input: '0x',
          maxFeePerGas: '0x73a20d17',
          maxPriorityFeePerGas: '0x73a20d00',
          nonce: '0x0',
          r: '0xb348e2bdba7eb4b833f77684709a15094d5f94307309f3fa47f6c603d5390894',
          s: '0x5993e2aa5653427090178d9714840924ca73a775b79e916d9f8ca4ed2294ca2d',
          to: '0xc8b2fdcf829e3d56f9917cd6356a1bb206101152',
          transactionIndex: '0x71',
          type: '0x2',
          v: '0x1',
          value: '0x5a0369b1f2b48',
        },
        error: {
          code: 0,
          message: '',
        },
      };

      apiFake.get = jest
        .fn()
        .mockImplementation((url: string) => {
          if (
            url.endsWith(
              `get-eth-transactions-for-eth-address/${ethAddress}?eth_network=mainnet`
            )
          ) {
            return Promise.resolve(ethTransactionsForAddressResponse);
          }

          return Promise.resolve(null);
        })
        .mockName('api.get');

      apiFake.post = jest
        .fn()
        .mockImplementation((url: string) => {
          if (url.endsWith('query-eth-rpc')) {
            return Promise.resolve(queryETHRPCForTransactionResponse);
          }

          return Promise.resolve(null);
        })
        .mockName('api.get');

      expect(
        await identity.ethereumAddressToDesoAddress(
          '0x648d0cda8d9c79fcc3d808fe35c2bf3887bcb6db'
        )
      ).toEqual('BC1YLiSayiRJKRut5gNW8CnN7vGugm3UzH8wXJiwx4io4FJKgRTGVqF');
    });
    it('works for testnet', async () => {
      identity.configure({ network: 'testnet' });
      const ethAddress = '0x648d0cda8d9c79fcc3d808fe35c2bf3887bcb6db';
      const ethTransactionsForAddressResponse = {
        status: '1',
        message: 'OK',
        result: [
          // This is is just a partial result object. We only care about the from field and the hash.
          {
            from: ethAddress,
            hash: '0x1aeac6a985eeb2937e5a3069e149d70c1b623e3da96853755bfe2b9940a58f14',
          },
        ],
      };

      const queryETHRPCForTransactionResponse = {
        id: 1,
        jsonrpc: '2.0',
        result: {
          accessList: [],
          blockHash:
            '0x0e5fe1cd87180c85350c464e235a5e9e70bb0a4b4b5eff033cc600b4ed76f88f',
          blockNumber: '0x70b92e',
          chainId: '0x5',
          from: '0x648d0cda8d9c79fcc3d808fe35c2bf3887bcb6db',
          gas: '0x5208',
          gasPrice: '0x73a20d11',
          hash: '0x5a63939f9f5f6c90d4a302395e8f9d92be4e4b85d2430ede1d52aa62442c705d',
          input: '0x',
          maxFeePerGas: '0x73a20d17',
          maxPriorityFeePerGas: '0x73a20d00',
          nonce: '0x0',
          r: '0xb348e2bdba7eb4b833f77684709a15094d5f94307309f3fa47f6c603d5390894',
          s: '0x5993e2aa5653427090178d9714840924ca73a775b79e916d9f8ca4ed2294ca2d',
          to: '0xc8b2fdcf829e3d56f9917cd6356a1bb206101152',
          transactionIndex: '0x71',
          type: '0x2',
          v: '0x1',
          value: '0x5a0369b1f2b48',
        },
        error: {
          code: 0,
          message: '',
        },
      };

      apiFake.get = jest
        .fn()
        .mockImplementation((url: string) => {
          if (
            url.endsWith(
              `get-eth-transactions-for-eth-address/${ethAddress}?eth_network=goerli`
            )
          ) {
            return Promise.resolve(ethTransactionsForAddressResponse);
          }

          return Promise.resolve(null);
        })
        .mockName('api.get');

      apiFake.post = jest
        .fn()
        .mockImplementation((url: string) => {
          if (url.endsWith('query-eth-rpc')) {
            return Promise.resolve(queryETHRPCForTransactionResponse);
          }

          return Promise.resolve(null);
        })
        .mockName('api.get');

      expect(
        await identity.ethereumAddressToDesoAddress(
          '0x648d0cda8d9c79fcc3d808fe35c2bf3887bcb6db'
        )
      ).toEqual('tBCKXZpzthFjXpopawpaFNbvKaw55ZFvMt1T2Psh56c7CDH7dRU7fm');
    });
  });
  describe('.subscribe()', () => {
    it.todo('it notifies the caller of the correct events');
  });
  describe('authorize error handling', () => {
    it.todo(
      'it properly handles the case where a users derived key cannot be authorized'
    );
  });
});
