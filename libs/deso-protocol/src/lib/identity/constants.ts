import {
  DeSoNetwork,
  TransactionSpendingLimitResponse,
} from '../backend-types';
export const DEFAULT_IDENTITY_URI = 'https://identity.deso.org';
export const DEFAULT_NODE_URI = 'https://blockproducer.deso.org';
export const IDENTITY_SERVICE_VALUE = 'identity';

// Error messages
export const NO_MONEY_ERROR =
  'User does not have sufficient funds in their wallet to complete the transaction';

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

export const DESO_NETWORK_TO_ETH_NETWORK: Record<
  DeSoNetwork,
  'mainnet' | 'goerli'
> = Object.freeze({
  mainnet: 'mainnet',
  testnet: 'goerli',
});
