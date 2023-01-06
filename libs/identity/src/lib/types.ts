export type Network = 'mainnet' | 'testnet';

export interface IdentityResponse {
  service: 'identity';
  method: 'derive';
  payload?: Record<string, any>;
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
