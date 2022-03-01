export interface CoinEntry {
  CreatorBasisPoints: number;
  DeSoLockedNanos: number;
  NumberOfHolders: number;
  CoinsInCirculationNanos: number;
  CoinWatermarkNanos: number;
  BitCloutLockedNanos: number;
}

export interface DAOCoinEntry {
  NumberOfHolders: number;
  CoinsInCirculationNanos: string;
  MintingDisabled: boolean;
  TransferRestrictionStatus: string;
}
