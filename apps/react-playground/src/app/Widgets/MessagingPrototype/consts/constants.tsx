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

export const USER_TO_SEND_MESSAGE_TO_1: Readonly<string> =
  'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY';

export const USER_TO_SEND_MESSAGE_TO_2: Readonly<string> =
  'BC1YLhp53iDyAqYBwi4EMAvufgvwhaennew2pZ2zu1LkvuxW5c3ewtk';
export const DERIVED_SEED_HEX: Readonly<string> = 'derivedSeedHex';
export const DEFAULT_KEY: Readonly<string> = 'defaultKey';
export const DEFAULT_KEY_MESSAGING_GROUP_NAME: Readonly<string> = 'default-key';
export const LIMIT: Readonly<number> = 1_000_000_000_000;
export const localStorageKeys: Readonly<string>[] = [
  DEFAULT_KEY_MESSAGING_GROUP_NAME,
  DEFAULT_KEY,
  DERIVED_SEED_HEX,
  USER_TO_SEND_MESSAGE_TO_1,
];
