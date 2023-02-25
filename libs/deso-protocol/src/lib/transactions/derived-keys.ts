import { PartialWithRequiredFields } from '@deso-core/data';
import {
  AuthorizeDerivedKeyRequest,
  AuthorizeDerivedKeyResponse,
} from 'deso-protocol-types';
import {
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';
import { ConstructedAndSubmittedTx, TransactionOptions } from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/derived-keys-transaction-api#authorize-derived-key
 */
export const authorizeDerivedKey = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      AuthorizeDerivedKeyRequest,
      | 'OwnerPublicKeyBase58Check'
      | 'DerivedPublicKeyBase58Check'
      | 'TransactionSpendingLimitHex'
      | 'Memo'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<AuthorizeDerivedKeyResponse>> => {
  return handleSignAndSubmit('api/v0/authorize-derived-key', params, options);
};
