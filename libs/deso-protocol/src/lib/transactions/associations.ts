import { PartialWithRequiredFields } from '@deso-core/data';
import {
  AssociationTxnResponse,
  CreatePostAssociationRequest,
  CreateUserAssociationRequest,
  DeleteAssociationRequest,
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
  TransactionMetadataCreatePostAssociation,
  TransactionMetadataCreateUserAssociation,
  TransactionMetadataDeletePostAssociation,
  TransactionMetadataDeleteUserAssociation,
  bs58PublicKeyToCompressedBytes,
  encodeUTF8ToBytes,
} from '@deso-core/identity';
import { hexToBytes } from '@noble/hashes/utils';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#create-user-association
 */

export type CreateUserAssociationRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreateUserAssociationRequest,
      | 'TargetUserPublicKeyBase58Check'
      | 'TransactorPublicKeyBase58Check'
      | 'AssociationType'
      | 'AssociationValue'
    >
  >;
export const createUserAssociation = (
  params: CreateUserAssociationRequestParams,
  options?: RequestOptions<
    CreateUserAssociationRequestParams,
    AssociationTxnResponse
  >
): Promise<ConstructedAndSubmittedTx<AssociationTxnResponse>> => {
  return handleSignAndSubmit('api/v0/user-associations/create', params, {
    ...options,
    constructionFunction: constructCreateUserAssociationTransaction,
  });
};

export const constructCreateUserAssociationTransaction = (
  params: CreateUserAssociationRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataCreateUserAssociation();
  // TODO: make sure empty string ends up as the zero public key.
  metadata.appPublicKey = bs58PublicKeyToCompressedBytes(
    params.AppPublicKeyBase58Check || ''
  );
  metadata.associationType = encodeUTF8ToBytes(params.AssociationType);
  metadata.associationValue = encodeUTF8ToBytes(params.AssociationValue);
  metadata.targetUserPublicKey = bs58PublicKeyToCompressedBytes(
    params.TargetUserPublicKeyBase58Check
  );
  return constructBalanceModelTx(
    params.TransactorPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#delete-user-association
 */

export type DeleteUserAssociationRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      DeleteAssociationRequest,
      'TransactorPublicKeyBase58Check' | 'AssociationID'
    >
  >;

export const deleteUserAssociation = (
  params: DeleteUserAssociationRequestParams,
  options?: RequestOptions<
    DeleteUserAssociationRequestParams,
    AssociationTxnResponse
  >
): Promise<ConstructedAndSubmittedTx<AssociationTxnResponse>> => {
  return handleSignAndSubmit('api/v0/user-associations/delete', params, {
    ...options,
    constructionFunction: constructDeleteUserAssociationTransaction,
  });
};

export const constructDeleteUserAssociationTransaction = (
  params: DeleteUserAssociationRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataDeleteUserAssociation();
  metadata.associationID = encodeUTF8ToBytes(params.AssociationID);
  return constructBalanceModelTx(
    params.TransactorPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#create-post-association
 */
export type CreatePostAssociationRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreatePostAssociationRequest,
      | 'PostHashHex'
      | 'TransactorPublicKeyBase58Check'
      | 'AssociationType'
      | 'AssociationValue'
    >
  >;
export const createPostAssociation = (
  params: CreatePostAssociationRequestParams,
  options?: RequestOptions<
    CreatePostAssociationRequestParams,
    AssociationTxnResponse
  >
): Promise<ConstructedAndSubmittedTx<AssociationTxnResponse>> => {
  return handleSignAndSubmit('api/v0/post-associations/create', params, {
    ...options,
    constructionFunction: constructCreatePostAssociationTransaction,
  });
};

export const constructCreatePostAssociationTransaction = (
  params: CreatePostAssociationRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataCreatePostAssociation();
  // TODO: make sure empty string ends up as the zero public key.
  metadata.appPublicKey = bs58PublicKeyToCompressedBytes(
    params.AppPublicKeyBase58Check || ''
  );
  metadata.associationType = encodeUTF8ToBytes(params.AssociationType);
  metadata.associationValue = encodeUTF8ToBytes(params.AssociationValue);
  metadata.postHash = hexToBytes(params.PostHashHex);
  return constructBalanceModelTx(
    params.TransactorPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#delete-post-association
 */
export type DeletePostAssociationRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      DeleteAssociationRequest,
      'TransactorPublicKeyBase58Check' | 'AssociationID'
    >
  >;

export const deletePostAssociation = (
  params: DeletePostAssociationRequestParams,
  options?: RequestOptions<
    DeletePostAssociationRequestParams,
    AssociationTxnResponse
  >
): Promise<ConstructedAndSubmittedTx<AssociationTxnResponse>> => {
  return handleSignAndSubmit('api/v0/post-associations/delete', params, {
    ...options,
    constructionFunction: constructDeletePostAssociationTransaction,
  });
};

export const constructDeletePostAssociationTransaction = (
  params: DeletePostAssociationRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataDeletePostAssociation();
  metadata.associationID = encodeUTF8ToBytes(params.AssociationID);
  return constructBalanceModelTx(
    params.TransactorPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
  );
};
