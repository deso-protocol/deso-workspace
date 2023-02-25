import { SubmitTransactionResponse, TransactionFee } from 'deso-protocol-types';

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

export interface TransactionOptions {
  // Wether or not we should sign and and submit the transaction to the
  // network.  If this is false, we will only return the constructed
  // transaction which can be useful for previewing the transaction before
  // signing and submitting or for handling signing and submitting outside of
  // the library.
  broadcast: boolean;
}
