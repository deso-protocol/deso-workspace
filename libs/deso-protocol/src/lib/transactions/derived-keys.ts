import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import {
  AuthorizeDerivedKeyRequest,
  AuthorizeDerivedKeyResponse,
  ConstructedTransactionResponse,
  RequestOptions,
  TxRequestWithOptionalFeesAndExtraData,
} from '../backend-types';
import { PartialWithRequiredFields } from '../data';
import {
  bs58PublicKeyToCompressedBytes,
  encodeUTF8ToBytes,
  TransactionExtraDataKV,
  TransactionMetadataAuthorizeDerivedKey,
} from '../identity';
import { constructBalanceModelTx, handleSignAndSubmit } from '../internal';
import { ConstructedAndSubmittedTx } from '../types';
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
  return handleSignAndSubmit('api/v0/authorize-derived-key', params, {
    ...options,
    constructionFunction: constructAuthorizeDerivedKey,
  });
};

export const constructAuthorizeDerivedKey = (
  params: AuthorizeDerivedKeyRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataAuthorizeDerivedKey();
  metadata.accessSignature = hexToBytes(params.AccessSignature || '');
  metadata.derivedPublicKey = bs58PublicKeyToCompressedBytes(
    params.DerivedPublicKeyBase58Check
  );
  metadata.expirationBlock = params.ExpirationBlock;
  metadata.operationType = params.DeleteKey ? 0 : 1;
  const consensusExtraDataKVs: TransactionExtraDataKV[] = [];
  if (params.DerivedKeySignature) {
    consensusExtraDataKVs.push(
      new TransactionExtraDataKV(
        encodeUTF8ToBytes('DerivedPublicKey'),
        bs58PublicKeyToCompressedBytes(params.DerivedPublicKeyBase58Check)
      )
    );
  }
  if (params.TransactionSpendingLimitHex) {
    const transactionSpendingLimitBuf = hexToBytes(
      params.TransactionSpendingLimitHex
    );
    if (transactionSpendingLimitBuf.length) {
      consensusExtraDataKVs.push(
        new TransactionExtraDataKV(
          encodeUTF8ToBytes('TransactionSpendingLimit'),
          transactionSpendingLimitBuf
        )
      );
    }
  }
  if (params.Memo || params.AppName) {
    const memo = params.Memo || (params.AppName as string);
    consensusExtraDataKVs.push(
      new TransactionExtraDataKV(
        encodeUTF8ToBytes('DerivedKeyMemo'),
        encodeUTF8ToBytes(bytesToHex(encodeUTF8ToBytes(memo)))
      )
    );
  }
  return constructBalanceModelTx(params.OwnerPublicKeyBase58Check, metadata, {
    ConsensusExtraDataKVs: consensusExtraDataKVs,
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};
