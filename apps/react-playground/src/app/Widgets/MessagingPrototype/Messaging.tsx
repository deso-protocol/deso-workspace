import Deso from 'deso-protocol';
import {
  AuthorizeDerivedKeyResponse,
  TransactionSpendingLimitResponse,
} from 'deso-protocol-types';
import {
  decryptMessageFromEncryptedToApplicationGroupMessagingKey,
  encryptMessageFromEncryptedToApplicationGroupMessagingKey,
} from './utils';
const buttonClass =
  'border border-black rounded-md p-3 bg-yellow-400 hover:bg-yellow-500 min-w-[250px] pb-1';
const containerClass = 'min-h-[150px] border-b  mx-auto ';
export const Messaging = ({ deso }: { deso: Deso }) => {
  let authorizeDerivedKeyTransaction: AuthorizeDerivedKeyResponse | null = null;
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
              AppName: 'Rarible',
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
            const response = await deso.identity.messagingGroups(
              deso.identity.getUserKey() as string
            );
            console.log(response);
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
            // encryptMessageFromEncryptedToApplicationGroupMessagingKey();
          }}
        >
          step 5: encrypt
        </button>
      </div>

      <div className={containerClass}>
        <button
          className={buttonClass}
          onClick={() => {
            // encryptedApplicationGroupMessagingKey: string,
            // applicationSeedHex: string,
            // encryptedMessage: EncryptedMessage
            // decryptMessageFromEncryptedToApplicationGroupMessagingKey();
            console.log('decrypt');
          }}
        >
          step 6: decrypt
        </button>
      </div>
    </div>
  );
};
