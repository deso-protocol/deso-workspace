import Deso from 'deso-protocol';
import {
  MessagingGroupPayload,
  TransactionSpendingLimitResponse,
} from 'deso-protocol-types';
import {
  decryptMessageFromEncryptedToApplicationGroupMessagingKey,
  encryptMessageFromEncryptedToApplicationGroupMessagingKey,
  seedHexToPrivateKey,
} from './utils';
const DERIVED_SEED_HEX: Readonly<string> = 'derivedSeedHex';
const LIMIT: Readonly<number> = 1_000_000_000_000;
const alertUserIfNoFunds = async (deso: Deso): Promise<boolean> => {
  const PublicKeysBase58Check = deso.identity.getUserKey() as string;
  const response = await deso.user.getUserStateless({
    PublicKeysBase58Check: [PublicKeysBase58Check],
  });
  if (!response?.UserList) {
    return false;
  }
  console.log(response.UserList[0].BalanceNanos > 0);
  return response.UserList[0].BalanceNanos > 0;
};
const setSecretPrivateUserInfo = (payload: {
  publicKeyBase58Check: string;
  derivedSeedHex: string;
}) => {
  localStorage.setItem(DERIVED_SEED_HEX, JSON.stringify(payload));
};
const getSecretPrivateUserInfo = (): {
  publicKeyBase58Check: string;
  derivedSeedHex: string;
} => {
  return (
    JSON.parse(localStorage.getItem(DERIVED_SEED_HEX) as string) ?? {
      publicKeyBase58Check: '',
      derivedSeedHex: '',
    }
  );
};
const buttonClass =
  'border border-black rounded-md p-3 bg-yellow-400 hover:bg-yellow-500 min-w-[250px] pb-1';
const containerClass = 'min-h-[150px] border-b  mx-auto ';
const USER_TO_SEND_MESSAGE_TO: Readonly<string> =
  'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY';
export const Messaging = ({ deso }: { deso: Deso }) => {
  // let authorizeDerivedKeyTransaction: AuthorizeDerivedKeyResponse | null = null;
  let messagingGroupPayload: MessagingGroupPayload | null = null;
  return (
    <div className="flex flex-col mt-10">
      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={async () => {
            deso.identity.login();
          }}
        >
          step 0: login
        </button>
      </div>
      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={() => {
            deso.identity.phoneVerification();
          }}
        >
          step 1: if the user does not have deso, they can get some through
          phone verifications.
        </button>
      </div>
      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={async () => {
            if (await alertUserIfNoFunds(deso)) {
              return;
            }
            const TransactionSpendingLimitResponse: TransactionSpendingLimitResponse =
              {
                GlobalDESOLimit: 15 * 1e9,
                DAOCoinLimitOrderLimitMap: {},
                TransactionCountLimitMap: {
                  PRIVATE_MESSAGE: LIMIT,
                  MESSAGING_GROUP: LIMIT,
                  AUTHORIZE_DERIVED_KEY: 1,
                },
                CreatorCoinOperationLimitMap: {},
                DAOCoinOperationLimitMap: {},
                NFTOperationLimitMap: {},
              };
            // TODO do we need this call to get the seed hex or can we just generate a key?
            const { publicKeyBase58Check, derivedSeedHex } =
              await deso.identity.derive({
                publicKey: deso.identity.getUserKey() || undefined,
                transactionSpendingLimitResponse:
                  TransactionSpendingLimitResponse,
                deleteKey: false,
              });
            setSecretPrivateUserInfo({ publicKeyBase58Check, derivedSeedHex });
          }}
        >
          step 2: authorize derived key
        </button>
      </div>

      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={async () => {
            const TransactionSpendingLimitResponse: TransactionSpendingLimitResponse =
              {
                GlobalDESOLimit: 15 * 1e9,
                DAOCoinLimitOrderLimitMap: {},
                TransactionCountLimitMap: {
                  PRIVATE_MESSAGE: LIMIT,
                  MESSAGING_GROUP: LIMIT,
                  AUTHORIZE_DERIVED_KEY: 1,
                },
                CreatorCoinOperationLimitMap: {},
                DAOCoinOperationLimitMap: {},
                NFTOperationLimitMap: {},
              };
            const { publicKeyBase58Check, derivedSeedHex } =
              getSecretPrivateUserInfo();
            const authorizeResponse = await deso.user.authorizeDerivedKey(
              {
                OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
                DerivedPublicKeyBase58Check: publicKeyBase58Check,
                AppName: 'APPName',
                ExpirationBlock: LIMIT,
                DeleteKey: false,
                MinFeeRateNanosPerKB: 1000,
                TransactionSpendingLimitResponse,
              },
              { broadcast: false }
            );
            const signedTransaction = deso.utils.signTransaction(
              derivedSeedHex,
              authorizeResponse.TransactionHex,
              true
            );
            const submitResponse =
              deso.transaction.submitTransaction(signedTransaction);
            console.log(submitResponse);
          }}
        >
          step: 3 authorize again
        </button>
      </div>
      <div>
        <button
          className={buttonClass}
          onClick={async () => {
            if (await alertUserIfNoFunds(deso)) {
              return;
            }
            messagingGroupPayload = await deso.identity.messagingGroups(
              deso.identity.getUserKey() as string
            );
          }}
        >
          step 4: generate the default key
        </button>
      </div>

      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={async () => {
            if (await alertUserIfNoFunds(deso)) {
              return;
            }
            console.log('encrypt');

            // encryptedApplicationGroupMessagingKey: string,
            // applicationSeedHex: string,
            // recipientPublicKey: string,
            // message: string
            if (messagingGroupPayload) {
              const encryptedMessage =
                encryptMessageFromEncryptedToApplicationGroupMessagingKey(
                  messagingGroupPayload.encryptedToApplicationGroupMessagingPrivateKey,
                  deso.utils.privateKeyToSeedHex(
                    messagingGroupPayload.encryptedToApplicationGroupMessagingPrivateKey
                  ),
                  USER_TO_SEND_MESSAGE_TO,
                  'message to encrypt'
                );
              console.log(encryptedMessage);
            }
          }}
        >
          step 5: encrypt
        </button>
      </div>

      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={async () => {
            if (await alertUserIfNoFunds(deso)) {
              return;
            }
            if (messagingGroupPayload) {
              decryptMessageFromEncryptedToApplicationGroupMessagingKey(
                messagingGroupPayload.encryptedToApplicationGroupMessagingPrivateKey,
                deso.utils.privateKeyToSeedHex(
                  messagingGroupPayload.encryptedToApplicationGroupMessagingPrivateKey
                ),
                {
                  EncryptedHex:
                    '04dc277d8ba1ad4116ea9143d27a92be5d520de5f5c9d4645f85fe5f6b5791e5be8c8a06bd563c86e557e870ef8c94124102df17ab16548476336c6769cde095cf2758eefc56f9d1cdccf8a6d1b0a5dc6d09054067306a99666783ea36df93d03e81cd2d2ab3a32112c3a5db0630d3bed806a647',
                  IsSender: false,
                  Version: 2,
                  SenderMessagingPublicKey:
                    'BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog',
                  SenderMessagingGroupKeyName: '',
                  RecipientMessagingPublicKey:
                    'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY',
                  RecipientMessagingGroupKeyName: '',
                  PublicKey: deso.identity.getUserKey() as string,
                  Legacy: false,
                }
              );
            }
            // encryptedApplicationGroupMessagingKey: string,
            // applicationSeedHex: string,
            // encryptedMessage: EncryptedMessage
            console.log('decrypt');
          }}
        >
          step 6: decrypt
        </button>
      </div>
    </div>
  );
};
