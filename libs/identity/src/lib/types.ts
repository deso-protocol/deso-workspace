export type Network = 'mainnet' | 'testnet';

export interface IdentityResponse {
  service: 'identity';
  method: 'derive' | 'login' | 'initialize';
  payload?: any;
  id?: string;
}

export interface IdentityDerivePayload {
  derivedSeedHex: string;
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

export interface TransactionSpendingLimitOptions {
  IsUnlimited?: boolean;
  GlobalDESOLimit?: number;
  TransactionCountLimitMap?: { [key: string]: number };
  CreatorCoinOperationLimitMap?: { [key: string]: { [key: string]: number } };
  DAOCoinOperationLimitMap?: { [key: string]: { [key: string]: number } };
  NFTOperationLimitMap?: {
    [key: string]: { [key: number]: { [key: string]: number } };
  };
  DAOCoinLimitOrderLimitMap?: { [key: string]: { [key: string]: number } };
}

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
  spendingLimitOptions?: TransactionSpendingLimitOptions;
}

export interface APIProvider {
  post: (url: string, data: any) => Promise<any>;
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
  primaryDerivedKey: IdentityDerivePayload & {
    isAuthorized?: boolean;
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
  activePublicKey: string | null;
  users: Record<string, StoredUser> | null;
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
