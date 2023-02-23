import { PartialWithRequiredFields } from '@deso-core/data';
import {
  AssociationResponse,
  CreatePostAssociationRequest,
  CreateUserAssociationRequest,
  DeleteAssociationRequest,
} from 'deso-protocol-types';
import {
  ConstructedAndSubmittedTx,
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#create-user-association
 */
export const createUserAssociation = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreateUserAssociationRequest,
      'TransactorPublicKeyBase58Check' | 'AssociationType' | 'AssociationValue'
    >
  >
): Promise<ConstructedAndSubmittedTx<AssociationResponse>> => {
  return handleSignAndSubmit('api/v0/user-associations/create', params);
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
  >
): Promise<ConstructedAndSubmittedTx<AssociationResponse>> => {
  return handleSignAndSubmit('api/v0/user-associations/delete', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/associations-transactions-api#create-post-association
 */
export const createPostAssociation = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreatePostAssociationRequest,
      'PostHashHex' | 'AssociationType' | 'AssociationValue'
    >
  >
): Promise<ConstructedAndSubmittedTx<AssociationResponse>> => {
  return handleSignAndSubmit('api/v0/post-associations/create', params);
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
  >
): Promise<ConstructedAndSubmittedTx<AssociationResponse>> => {
  return handleSignAndSubmit('api/v0/post-associations/delete', params);
};
