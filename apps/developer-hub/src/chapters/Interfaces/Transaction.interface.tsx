export interface TxInput {
  TxID: number[];
  Index: number;
}

export interface TxOutput {
  PublicKey: string;
  AmountNanos: number;
}

export interface TxnMeta {
  PostHashToModify?: any;
  ParentStakeID?: any;
  Body: string;
  CreatorBasisPoints: number;
  StakeMultipleBasisPoints: number;
  TimestampNanos: number;
  IsHidden: boolean;
}

export interface Transaction {
  TxInputs: TxInput[];
  TxOutputs: TxOutput[];
  TxnMeta: TxnMeta;
  PublicKey: string;
  ExtraData?: any;
  Signature?: any;
  TxnTypeJSON: number;
}

export interface TransactionPost {
  TstampNanos: number;
  PostHashHex: string;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: Transaction;
  TransactionHex: string;
}
