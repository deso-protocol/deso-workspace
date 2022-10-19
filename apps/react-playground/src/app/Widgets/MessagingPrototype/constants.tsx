import { TransactionSpendingLimitResponse } from 'deso-protocol-types';
export const getTransactionSpendingLimits =
  (): TransactionSpendingLimitResponse => {
    return {
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
  };

export const USER_TO_SEND_MESSAGE_TO: Readonly<string> =
  'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY';
export const DERIVED_SEED_HEX: Readonly<string> = 'derivedSeedHex';
export const GROUP_NAME: Readonly<string> = 'default-key';
export const LIMIT: Readonly<number> = 1_000_000_000_000;
