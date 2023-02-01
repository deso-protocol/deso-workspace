import {
  AccessGroupLimitMapItem,
  AccessGroupMemberLimitMapItem,
  AssociationLimitMapItem,
  TransactionSpendingLimitResponse,
} from 'deso-protocol-types';

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
  AssociationLimitMap?: AssociationLimitMapItem[];
  AccessGroupLimitMap?: AccessGroupLimitMapItem[];
  AccessGroupMemberLimitMap?: AccessGroupMemberLimitMapItem[];
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

export type StoredUser = {
  publicKey: string;
  primaryDerivedKey: IdentityDerivePayload & {
    transactionSpendingLimits: TransactionSpendingLimitResponse;
    IsValid?: boolean;
  };
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

export type IdentityPermissions = 'SUBMIT_POST';
