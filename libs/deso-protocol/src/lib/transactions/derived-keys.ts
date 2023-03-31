import { PartialWithRequiredFields } from '@deso-core/data';
import {
  AuthorizeDerivedKeyRequest,
  AuthorizeDerivedKeyResponse,
  RequestOptions,
} from 'deso-protocol-types';
import {
  constructBalanceModelTx,
  ConstructedTransactionResponse,
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';
import { ConstructedAndSubmittedTx } from '../types';
import {
  TransactionExtraDataKV,
  TransactionMetadataAuthorizeDerivedKey,
} from '../transcoder/transaction-transcoders';
import { bs58PublicKeyToCompressedBytes } from '@deso-core/identity';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/derived-keys-transaction-api#authorize-derived-key
 */
export type AuthorizeDerivedKeyRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      AuthorizeDerivedKeyRequest,
      | 'OwnerPublicKeyBase58Check'
      | 'DerivedPublicKeyBase58Check'
      | 'TransactionSpendingLimitHex'
      | 'Memo'
      | 'ExpirationBlock'
    >
  >;
export const authorizeDerivedKey = (
  params: AuthorizeDerivedKeyRequestParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<AuthorizeDerivedKeyResponse>> => {
  return handleSignAndSubmit('api/v0/authorize-derived-key', params, options);
};

export const constructAuthorizeDerivedKey = (
  params: AuthorizeDerivedKeyRequestParams
): ConstructedTransactionResponse => {
  const metadata = new TransactionMetadataAuthorizeDerivedKey();
  metadata.accessSignature = Buffer.from(params.AccessSignature || '', 'hex');
  metadata.derivedPublicKey = bs58PublicKeyToCompressedBytes(
    params.DerivedPublicKeyBase58Check
  );
  metadata.expirationBlock = params.ExpirationBlock;
  metadata.operationType = params.DeleteKey ? 0 : 1;
  const consensusExtraDataKVs: TransactionExtraDataKV[] = [];
  // TODO: this is a poorly named param, should probably fix this.
  if (params.DerivedKeySignature) {
    const derivedKeyKV = new TransactionExtraDataKV();
    derivedKeyKV.key = Buffer.from('DerivedPublicKey');
    derivedKeyKV.value = bs58PublicKeyToCompressedBytes(
      params.DerivedPublicKeyBase58Check
    );
    consensusExtraDataKVs.push(derivedKeyKV);
  }
  if (params.TransactionSpendingLimitHex) {
    const transactionSpendingLimitBuf = Buffer.from(
      params.TransactionSpendingLimitHex,
      'hex'
    );
    if (transactionSpendingLimitBuf.length) {
      const spendingLimitKV = new TransactionExtraDataKV();
      spendingLimitKV.key = Buffer.from('TransactionSpendingLimit');
      spendingLimitKV.value = transactionSpendingLimitBuf;
      consensusExtraDataKVs.push(spendingLimitKV);
    }
  }
  if (params.Memo || params.AppName) {
    const memo = params.Memo || (params.AppName as string);
    const memoKV = new TransactionExtraDataKV();
    memoKV.key = Buffer.from('DerivedKeyMemo');
    // TODO: I think this is wrong, but need to double check
    memoKV.value = Buffer.from(Buffer.from(memo).toString('hex'));
  }
  return constructBalanceModelTx(params.OwnerPublicKeyBase58Check, metadata, {
    ConsensusExtraDataKVs: consensusExtraDataKVs,
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};
