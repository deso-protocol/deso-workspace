import {
  AccessGroupLimitMapItem,
  AccessGroupMemberLimitMapItem,
  AssociationLimitMapItem,
  TransactionSpendingLimitResponse,
} from '../backend-types';
export type Network = 'mainnet' | 'testnet';

export interface IdentityResponse {
  service: 'identity';
  method: 'derive' | 'login' | 'initialize';
  payload?: any;
  id?: string;
}

export interface IdentityDerivePayload {
  derivedSeedHex?: string;
  derivedPublicKeyBase58Check: string;
  publicKeyBase58Check: string;
  btcDepositAddress: string;
  ethDepositAddress: string;
  expirationBlock: number;
  network: Network;
  accessSignature: string;
  jwt: string;
  derivedJwt: string;
  messagingPublicKeyBase58Check: string;
  messagingPrivateKey: string;
  messagingKeyName: string;
  messagingKeySignature: string;
  transactionSpendingLimitHex: string;
  signedUp: boolean;
  publicKeyAdded?: string;
}

export interface TransactionSpendingLimitResponseOptions {
  GlobalDESOLimit?: number;
  TransactionCountLimitMap?: { [key: string]: number | 'UNLIMITED' };
  CreatorCoinOperationLimitMap?: {
    [key: string]: { [key: string]: number | 'UNLIMITED' };
  };
  DAOCoinOperationLimitMap?: {
    [key: string]: { [key: string]: number | 'UNLIMITED' };
  };
  NFTOperationLimitMap?: {
    [key: string]: { [key: number]: { [key: string]: number | 'UNLIMITED' } };
  };
  DAOCoinLimitOrderLimitMap?: {
    [key: string]: { [key: string]: number | 'UNLIMITED' };
  };
  AssociationLimitMap?: (Omit<AssociationLimitMapItem, 'OpCount'> & {
    OpCount: number | 'UNLIMITED';
  })[];
  AccessGroupLimitMap?: (Omit<AccessGroupLimitMapItem, 'OpCount'> & {
    OpCount: number | 'UNLIMITED';
  })[];
  AccessGroupMemberLimitMap?: (Omit<
    AccessGroupMemberLimitMapItem,
    'OpCount'
  > & { OpCount: number | 'UNLIMITED' })[];
  IsUnlimited?: boolean;
}

export type jwtAlgorithm = 'ES256K' | 'ES256';
export interface IdentityConfiguration {
  /**
   * The identity domain. Defaults to https://identity.deso.org
   */
  identityURI?: string;

  /**
   * The current network. If not provided, we will assume mainnet.
   */
  network?: Network;

  /**
   * The deso node used for any api calls (get balance, derived key authorization, etc)
   */
  nodeURI?: string;

  /**
   * Optional redirect URI. If provided, we do a hard redirect to the identity
   * domain and pass data via query params back to the provided uri.
   */
  redirectURI?: string;

  /**
   * The default permissions and spending limits that will be presented to the user
   * during login. If not provided, we will assume no permissions.
   */
  spendingLimitOptions?: TransactionSpendingLimitResponseOptions;

  /**
   * The name of the app used to authorize derived keys. Defaults to unknown.
   */
  appName?: string;

  // Since our keys are generated using the secp256k1 curve, the correct
  // JWT algorithm header *should* be ES256K.
  // See: https://www.rfc-editor.org/rfc/rfc8812.html#name-jose-algorithms-registratio
  //
  // HOWEVER, the backend jwt lib used by deso foundation -
  // https://github.com/golang-jwt/jwt - (as well as many other jwt libraries)
  // do not support ES256K. So instead, we default to the more widely supported ES256 algo,
  // which can still work for verifying our signatures. But if a consumer of this lib is using a
  // jwt lib that supports ES256K they can specify that here.
  // See this github issue
  // for more context: https://github.com/auth0/node-jsonwebtoken/issues/862
  // If ES256K is ever supported by the backend jwt lib, we should change this.
  jwtAlgorithm?: jwtAlgorithm;
}

export interface APIProvider {
  post: (url: string, data: any) => Promise<any>;
  get: (url: string) => Promise<any>;
}

export interface WindowProvider {
  location: { search: string; pathname: string; href: string };
  history: { replaceState: (state: any, title: string, url: string) => void };
  localStorage: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
  };
  open: (
    url: string,
    title: string | undefined,
    options: string
  ) => Window | null;
  addEventListener: (event: string, callback: (event: any) => void) => void;
  removeEventListener: (event: string, callback: (event: any) => void) => void;
}

export interface LoginOptions {
  getFreeDeso: boolean;
}

export type PrimaryDerivedKeyInfo = IdentityDerivePayload & {
  transactionSpendingLimits: TransactionSpendingLimitResponse;
  IsValid?: boolean;
};

export type StoredUser = {
  publicKey: string;
  primaryDerivedKey: PrimaryDerivedKeyInfo;
};

export interface IdentityUser {
  accessLevel: number;
  accessLevelHmac: string;
  btcDepositAddress: string;
  encryptedSeedHex: string;
  ethDepositAddress: string;
  derivedPublicKeyBase58Check?: string;
  hasExtraText: boolean;
  network: string;
  version: number;
}

export interface IdentityLoginPayload {
  users: Record<string, IdentityUser>;
  publicKeyAdded: string;
  phoneNumberSuccess: boolean;
  signedUp: boolean;
}

export interface IdentityState {
  currentUser: StoredUser | null;
  alternateUsers: Record<string, StoredUser> | null;
}

export interface Deferred {
  resolve: (args: any) => void;
  reject: (args: any) => void;
}

export interface KeyPair {
  seedHex: string;
  private: Uint8Array;
  public: Uint8Array;
}

export interface SubscriberNotification {
  event: NOTIFICATION_EVENTS;
  currentUser: StoredUser | null;
  alternateUsers: Record<string, StoredUser> | null;
}

export interface EtherscanTransactionsByAddressResponse {
  status: string;
  message: string;
  result: EtherscanTransaction[];
}

export interface EtherscanTransaction {
  blockNumber: string;
  timestamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}

export interface AccessGroupPrivateInfo {
  AccessGroupPublicKeyBase58Check: string;
  AccessGroupPrivateKeyHex: string;
  AccessGroupKeyName: string;
}

export enum NOTIFICATION_EVENTS {
  /**
   * This event is fired when the consuming app initially subscribes to identity.
   */
  SUBSCRIBE = 'SUBSCRIBE',

  /**
   * This is an intermediate event fired AFTER the user completes an identity flow
   * that requires a derived key authorization. This event is fired BEFORE the
   * request to authorize the derived key is made.
   */
  AUTHORIZE_DERIVED_KEY_START = 'AUTHORIZE_DERIVED_KEY_START',

  /**
   * This is an intermediate event fired AFTER the user completes an identity
   * flow that requires a derived key authorization. This event is fired AFTER
   * the request to authorize the derived key is made.
   */
  AUTHORIZE_DERIVED_KEY_END = 'AUTHORIZE_DERIVED_KEY_END',

  /**
   * This event is fired if the request to authorize a derived key fails.
   */
  AUTHORIZE_DERIVED_KEY_FAIL = 'AUTHORIZE_DERIVED_KEY_FAIL',

  /**
   * This event is fired when the user opens the permissions approval popup.
   */
  REQUEST_PERMISSIONS_START = 'REQUEST_PERMISSIONS_START',

  /**
   * This event is fired when the user completes approving permissions, and
   * comes AFTER the intermediate AUTHORIZE_DERIVED_KEY events.
   */
  REQUEST_PERMISSIONS_END = 'REQUEST_PERMISSIONS_END',

  /**
   * This event is fired when the user opens the login popup.
   */
  LOGIN_START = 'LOGIN_START',

  /**
   * This event is fired when the user completes logging in, and
   * comes AFTER the intermediate AUTHORIZE_DERIVED_KEY events.
   */
  LOGIN_END = 'LOGIN_END',

  /**
   * This event is fired when the user opens the logout popup.
   */
  LOGOUT_START = 'LOGOUT_START',

  /**
   * This event is fired when the user completes logging out, and
   * comes AFTER the intermediate AUTHORIZE_DERIVED_KEY events.
   */
  LOGOUT_END = 'LOGOUT_END',

  /**
   * This event is fired when the user opens the get deso popup.
   */
  GET_FREE_DESO_START = 'GET_FREE_DESO_START',

  /**
   * This event is fired when the user completes the get deso flow, and comes
   * AFTER the intermediate AUTHORIZE_DERIVED_KEY events.
   */
  GET_FREE_DESO_END = 'GET_FREE_DESO_END',

  /**
   * This event is fired when the user opens the verify phone number popup.
   */
  VERIFY_PHONE_NUMBER_START = 'VERIFY_PHONE_NUMBER_START',

  /**
   * This event is fired when the user completes the verify phone number flow,
   * and comes AFTER the intermediate AUTHORIZE_DERIVED_KEY events.
   */
  VERIFY_PHONE_NUMBER_END = 'VERIFY_PHONE_NUMBER_END',

  /**
   * This event is fired when the consuming app switches the active user.
   */
  CHANGE_ACTIVE_USER = 'CHANGE_ACTIVE_USER',
}
