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
export const LOGIN_RESPONSE: Readonly<string> = 'loginResponse';
export const GROUP_NAME: Readonly<string> = 'default-key';
export const ENCRYPT_RESPONSE: Readonly<string> = 'encryptResponse';
export const DECRYPT_RESPONSE: Readonly<string> = 'decryptResponse';
export const ENCRYPTED_APPLICATION_GROUP_MESSAGING_PRIVATE_KEY: Readonly<string> =
  'encryptedToApplicationGroupMessagingPrivateKey';
export const LIMIT: Readonly<number> = 1_000_000_000_000;
export const localStorageKeys: Readonly<string>[] = [
  ENCRYPTED_APPLICATION_GROUP_MESSAGING_PRIVATE_KEY,
  GROUP_NAME,
  LOGIN_RESPONSE,
  DEFAULT_KEY,
  DERIVED_SEED_HEX,
  USER_TO_SEND_MESSAGE_TO_1,
  ENCRYPT_RESPONSE,
  DECRYPT_RESPONSE,
];
