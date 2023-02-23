import { api } from '@deso-core/data';
import { identity } from '@deso-core/identity';
import { SubmitTransactionResponse, TransactionFee } from 'deso-protocol-types';

////////////////////////////////////////////////////////////////////////////////
// This is all the stuff we don't export to consumers of the library. If
// anything here needs to be exported, it should be moved to another file.
////////////////////////////////////////////////////////////////////////////////

// This can be mutated by the user of the library via the configure function,
// but it's not exported explicitly. Whatever changes are made externally will
// be reflected in the library.
export const globalConfigOptions = {
  MinFeeRateNanosPerKB: 1500,
};

export interface ConstructedAndSubmittedTx<T> {
  constructedTransactionResponse: T;
  submittedTransactionResponse: SubmitTransactionResponse;
}

export interface OptionalFeesAndExtraData {
  MinFeeRateNanosPerKB?: number;
  TransactionFees?: TransactionFee[] | null;
  ExtraData?: { [key: string]: string };
}

export type TxRequestWithOptionalFeesAndExtraData<T> = Omit<
  T,
  'MinFeeRateNanosPerKB' | 'TransactionFees' | 'ExtraData' | 'InTutorial'
> &
  OptionalFeesAndExtraData;

/**
 * Wraps signing and submit to include the configurable fee, and add defaults
 * for optional params.
 *
 * @param endpoint the endpoint for constructing the transaction
 * @param params tx specific params for the endpoint + optional fees and extra data
 */
export const handleSignAndSubmit = async (
  endpoint: string,
  params: OptionalFeesAndExtraData & any
) => {
  const constructedTransactionResponse = await api.post(endpoint, {
    ...params,
    MinFeeRateNanosPerKB:
      params.MinFeeRateNanosPerKB ?? globalConfigOptions.MinFeeRateNanosPerKB,
  });
  const submittedTransactionResponse = await identity.signAndSubmit(
    constructedTransactionResponse
  );

  return {
    constructedTransactionResponse,
    submittedTransactionResponse,
  };
};
