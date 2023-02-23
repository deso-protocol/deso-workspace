import { SubmitTransactionResponse, TransactionFee } from 'deso-protocol-types';

export interface SubmitResponse<T> {
  constructedTransactionResponse: T;
  submittedTransactionResponse: SubmitTransactionResponse;
}

export interface OptionalFeesAndExtraData {
  MinFeeRateNanosPerKB?: number;
  TransactionFees?: TransactionFee[] | null;
  ExtraData?: { [key: string]: string };
}

export type TypeWithOptionalFeesAndExtraData<T> = Omit<
  T,
  'MinFeeRateNanosPerKB' | 'TransactionFees' | 'ExtraData' | 'InTutorial'
> &
  OptionalFeesAndExtraData;
