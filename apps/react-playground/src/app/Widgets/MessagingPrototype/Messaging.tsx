import Deso from 'deso-protocol';
import { TransactionSpendingLimitResponse } from 'deso-protocol-types';
import {} from './utils';
// export interface TransactionSpendingLimitResponse {
//   GlobalDESOLimit: number;
//   TransactionCountLimitMap: { [key: string]: number };
//   CreatorCoinOperationLimitMap: { [key: string]: { [key: string]: number } };
//   DAOCoinOperationLimitMap: { [key: string]: { [key: string]: number } };
//   NFTOperationLimitMap: {
//     [key: string]: { [key: number]: { [key: string]: number } };
//   };
//   DAOCoinLimitOrderLimitMap: { [key: string]: { [key: string]: number } };
// }
export const Messaging = ({ deso }: { deso: Deso }) => {
  return (
    <div className="flex justify-around">
      <button
        onClick={() => {
          console.log('encrypt');

          // export interface AuthorizeDerivedKeyParams {
          //   OwnerPublicKeyBase58Check?: string;
          //   DerivedPublicKeyBase58Check?: string;
          //   ExpirationBlock?: number;
          //   DeleteKey: boolean;
          //   DerivedKeySignature?: boolean;
          //   TransactionFees: TransactionFee[] | null;
          //   MinFeeRateNanosPerKB: number;
          //   TransactionSpendingLimitResponse?: TransactionSpendingLimitResponse;
          //   Memo?: string;
          //   AppName?: string;
          //   ExtraData?: { [k: string]: string };
          //   ExpirationDays?: number;
          // }
          const LIMIT: Readonly<number> = 1_000_000_000_000;
          const TransactionSpendingLimitResponse: TransactionSpendingLimitResponse =
            {
              GlobalDESOLimit: 15 * 1e9,
              DAOCoinLimitOrderLimitMap: {},
              TransactionCountLimitMap: {
                PRIVATE_MESSAGE: LIMIT,
                MESSAGING_GROUP: LIMIT,
              },
              CreatorCoinOperationLimitMap: {},
              DAOCoinOperationLimitMap: {},
              NFTOperationLimitMap: {},
            };

          deso.user.authorizeDerivedKey({
            OwnerPublicKeyBase58Check: '',
            DerivedPublicKeyBase58Check: '',
            AppName: 'Rarible',
            ExpirationBlock: LIMIT,
            ExpirationDays: LIMIT,
            DeleteKey: false,
            MinFeeRateNanosPerKB: 1000,
            TransactionSpendingLimitResponse,
          });
        }}
      >
        generate derived key
      </button>
      <button
        onClick={() => {
          console.log('encrypt');
        }}
      >
        encrypt
      </button>
      <button
        onClick={() => {
          console.log('decrypt');
        }}
      >
        decrypt
      </button>
    </div>
  );
};
