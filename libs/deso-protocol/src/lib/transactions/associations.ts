import { PartialWithRequiredFields } from '@deso-core/data';
import {
  AssociationResponse,
  CreatePostAssociationRequest,
  CreateUserAssociationRequest,
  DeleteAssociationRequest,
} from 'deso-protocol-types';
import {
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';
import { ConstructedAndSubmittedTx, TransactionOptions } from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#create-user-association
 */
export const createUserAssociation = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreateUserAssociationRequest,
      | 'TargetUserPublicKeyBase58Check'
      | 'TransactorPublicKeyBase58Check'
      | 'AssociationType'
      | 'AssociationValue'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<AssociationResponse>> => {
  return handleSignAndSubmit(
    'api/v0/user-associations/create',
    params,
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#delete-user-association
 */
export const deleteUserAssociation = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      DeleteAssociationRequest,
      'TransactorPublicKeyBase58Check' | 'AssociationID'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<AssociationResponse>> => {
  return handleSignAndSubmit(
    'api/v0/user-associations/delete',
    params,
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#create-post-association
 */
export const createPostAssociation = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreatePostAssociationRequest,
      | 'PostHashHex'
      | 'TransactorPublicKeyBase58Check'
      | 'AssociationType'
      | 'AssociationValue'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<AssociationResponse>> => {
  return handleSignAndSubmit(
    'api/v0/post-associations/create',
    params,
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#delete-post-association
 */
export const deletePostAssociation = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      DeleteAssociationRequest,
      'TransactorPublicKeyBase58Check' | 'AssociationID'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<AssociationResponse>> => {
  return handleSignAndSubmit(
    'api/v0/post-associations/delete',
    params,
    options
  );
};
