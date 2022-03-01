export interface User {
  hasExtraText: boolean;
  btcDepositAddress: string;
  ethDepositAddress: string;
  version: number;
  encryptedSeedHex: string;
  network: string;
  accessLevel: number;
  accessLevelHmac: string;
}

export interface Users {
  [user: string]: User;
}
