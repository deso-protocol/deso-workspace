import { api, PartialWithRequiredFields } from '@deso-core/data';
import { identity } from '@deso-core/identity';
import {
  BlockPublicKeyRequest,
  BlockPublicKeyResponse,
  DeletePIIRequest,
  GetUserGlobalMetadataRequest,
  GetUserGlobalMetadataResponse,
  SetNotificationMetadataRequest,
  UpdateUserGlobalMetadataRequest,
} from 'deso-protocol-types';

const jwtPost = async (path: string, params: any) => {
  return api.post(path, { ...params, JWT: await identity.jwt() });
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-user-global-metadata-email-and-phone-number
 */
export const getUserGlobalMetadata = async (
  params: PartialWithRequiredFields<
    GetUserGlobalMetadataRequest,
    'UserPublicKeyBase58Check'
  >
): Promise<GetUserGlobalMetadataResponse> => {
  return jwtPost('api/v0/get-user-global-metadata', params);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#update-user-global-metadata-email-and-state-of-messages-read
 */
export type UpdateUserGlobalMetadataParams = PartialWithRequiredFields<
  UpdateUserGlobalMetadataRequest,
  'UserPublicKeyBase58Check'
>;
export const updateUserGlobalMetadata = async (
  params: UpdateUserGlobalMetadataParams
) => {
  return jwtPost('api/v0/update-user-global-metadata', params);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#delete-pii-personal-identifiable-information
 */
export const deletePII = async (
  params: PartialWithRequiredFields<DeletePIIRequest, 'PublicKeyBase58Check'>
): Promise<undefined> => {
  return jwtPost('api/v0/delete-pii', params);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#block-public-key
 */
export type BlockPublicKeyParams = PartialWithRequiredFields<
  BlockPublicKeyRequest,
  'BlockPublicKeyBase58Check' | 'PublicKeyBase58Check'
>;
export const blockPublicKey = async (
  params: BlockPublicKeyParams
): Promise<BlockPublicKeyResponse> => {
  return jwtPost('api/v0/block-public-key', params);
};

/**
 * https://docs.deso.org/deso-backend/api/notification-endpoints#set-notification-metadata
 */
export const setNotificationMetadata = async (
  params: SetNotificationMetadataRequest
) => {
  return jwtPost('api/v0/set-notification-metadata', params);
};

///////////////////////////////////////////////////////////////////////////////
// Admin endpoints
///////////////////////////////////////////////////////////////////////////////
