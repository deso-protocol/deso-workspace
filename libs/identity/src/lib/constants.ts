export const DEFAULT_IDENTITY_URI = 'https://identity.deso.org';
export const DEFAULT_NODE_URI = 'https://node.deso.org';
export const IDENTITY_SERVICE_VALUE = 'identity';

// default is no permissions
export const DEFAULT_PERMISSIONS = Object.freeze({
  GlobalDESOLimit: 0,
  TransactionCountLimitMap: {},
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
