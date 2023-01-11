import { TransactionSpendingLimitResponse } from 'deso-protocol-types';

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
}

export interface IdentityConstructorOptions {
  windowFake: Window;
}

export interface LoginOptions {
  permissions: TransactionSpendingLimitResponse;
  getFreeDeso: boolean;
}

export type StoredUser = {
  primaryDerivedKey: IdentityDerivePayload & { mnemonic: string };
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
