import { api, PartialWithRequiredFields } from '@deso-core/data';
import { identity } from '@deso-core/identity';
import {
  BlockPublicKeyRequest,
  BlockPublicKeyResponse,
  DeletePIIRequest,
  UpdateUserGlobalMetadataRequest,
} from 'deso-protocol-types';

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
  const JWT = params.JWT ?? (await identity.jwt());
  return api.post('api/v0/update-user-global-metadata', { ...params, JWT });
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#delete-pii-personal-identifiable-information
 */
export const deletePII = async (
  params: PartialWithRequiredFields<DeletePIIRequest, 'PublicKeyBase58Check'>
): Promise<undefined> => {
  const JWT = params.JWT ?? (await identity.jwt());
  return api.post('api/v0/delete-pii', { ...params, JWT });
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
  const JWT = params.JWT ?? (await identity.jwt());
  return api.post('api/v0/block-public-key', { ...params, JWT });
};
