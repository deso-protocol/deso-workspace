import { SubmitTransactionResponse, TransactionFee } from './backend-types';
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

export interface ConstructedAndSubmittedTx<T> {
  constructedTransactionResponse: T;
  // This will be null if the broadcast option is set to false.
  submittedTransactionResponse: SubmitTransactionResponse | null;
}
