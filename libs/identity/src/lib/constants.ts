import { TransactionSpendingLimitResponse } from 'deso-protocol-types';

export const DEFAULT_IDENTITY_URI = 'https://identity.deso.org';
export const DEFAULT_NODE_URI = 'https://node.deso.org';
export const IDENTITY_SERVICE_VALUE = 'identity';

// since we issue a derived key and authorize it immediately after login the
// default permission to authorize a derived key
export const DEFAULT_PERMISSIONS: TransactionSpendingLimitResponse =
  Object.freeze({
    // set the limit very low, just enough to authorize a key
    GlobalDESOLimit: 0.01 * 1e9,
    TransactionCountLimitMap: {
      AUTHORIZE_DERIVED_KEY: 1,
    },
    CreatorCoinOperationLimitMap: {},
    DAOCoinOperationLimitMap: {},
    NFTOperationLimitMap: {},
    DAOCoinLimitOrderLimitMap: {},
  });

export const PUBLIC_KEY_PREFIXES = Object.freeze({
  mainnet: {
    bitcoin: [0x00],
    deso: [0xcd, 0x14, 0x0],
  },
  testnet: {
    bitcoin: [0x6f],
    deso: [0x11, 0xc2, 0x0],
  },
});

export const LOCAL_STORAGE_KEYS = Object.freeze({
  activePublicKey: 'desoActivePublicKey',
  identityUsers: 'desoIdentityUsers',
  loginKeyPair: 'desoLoginKeyPair',
});
