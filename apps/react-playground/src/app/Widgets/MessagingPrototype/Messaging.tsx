import Deso from 'deso-protocol';
import {
  AuthorizeDerivedKeyResponse,
  MessagingGroupPayload,
  TransactionSpendingLimitResponse,
} from 'deso-protocol-types';
import {
  decryptMessageFromEncryptedToApplicationGroupMessagingKey,
  encryptMessageFromEncryptedToApplicationGroupMessagingKey,
  seedHexToPrivateKey,
} from './utils';
const buttonClass =
  'border border-black rounded-md p-3 bg-yellow-400 hover:bg-yellow-500 min-w-[250px] pb-1';
const containerClass = 'min-h-[150px] border-b  mx-auto ';
const USER_TO_SEND_MESSAGE_TO: Readonly<string> =
  'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY';
export const Messaging = ({ deso }: { deso: Deso }) => {
  let authorizeDerivedKeyTransaction: AuthorizeDerivedKeyResponse | null = null;
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
          onClick={async () => {
            console.log('step 1: authorize derived key');
            const LIMIT: Readonly<number> = 1_000_000_000_000;
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

            const response = await deso.user.authorizeDerivedKey({
              OwnerPublicKeyBase58Check: '',
              DerivedPublicKeyBase58Check: '',
              AppName: 'APPName',
              ExpirationBlock: LIMIT,
              ExpirationDays: LIMIT,
              DeleteKey: false,
              MinFeeRateNanosPerKB: 1000,
              TransactionSpendingLimitResponse,
            });
            authorizeDerivedKeyTransaction = response;
            console.log('authorized derived key', response);
          }}
        >
          step 1: authorize derived key
        </button>
      </div>
      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={() => {
            deso.identity.phoneVerification();
          }}
        >
          step 2: if the user does not have deso, they can get some through
          phone verifications.
        </button>
      </div>

      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={() => {
            if (authorizeDerivedKeyTransaction) {
              deso.transaction.submitTransaction(
                authorizeDerivedKeyTransaction.TransactionHex
              );
            } else {
              alert('need to first construct authorizeDerivedKey transaction');
            }
          }}
        >
          step 3:Now that we have our authorize derive key transaction
          constructed and enough DESO lets submit it
        </button>
      </div>
      <div>
        <button
          className={buttonClass}
          onClick={async () => {
            console.log('generate the default key');
            console.log(deso.identity.getUserKey());
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
          onClick={() => {
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
          onClick={() => {
            if (messagingGroupPayload) {
              decryptMessageFromEncryptedToApplicationGroupMessagingKey(
                messagingGroupPayload.encryptedMessagingKeyRandomness ?? '',
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
