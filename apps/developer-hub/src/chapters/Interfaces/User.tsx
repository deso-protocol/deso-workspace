export interface LoginUser {
  hasExtraText: boolean;
  btcDepositAddress: string;
  ethDepositAddress: string;
  version: number;
  encryptedSeedHex: string;
  network: string;
  accessLevel: number;
  accessLevelHmac: string;
}
