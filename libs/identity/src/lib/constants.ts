export const DEFAULT_IDENTITY_URI = 'https://identity.deso.org';
export const DEFAULT_NODE_URI = 'https://node.deso.org';
export const IDENTITY_SERVICE_VALUE = 'identity';

// default is no permissions
export const DEFAULT_PERMISSIONS = Object.freeze({
  IsUnlimited: true,
  GlobalDESOLimit: 0,
  TransactionCountLimitMap: {},
  CreatorCoinOperationLimitMap: {},
  DAOCoinOperationLimitMap: {},
  NFTOperationLimitMap: {},
  DAOCoinLimitOrderLimitMap: {},
});
