import { PartialWithRequiredFields } from '@deso-core/data';
import {
  AddAccessGroupMembersRequest,
  AddAccessGroupMembersResponse,
  CreateAccessGroupRequest,
  CreateAccessGroupResponse,
  RequestOptions,
} from 'deso-protocol-types';
import {
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';
import { ConstructedAndSubmittedTx } from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/access-groups-api#create-access-group
 */
export const createAccessGroup = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreateAccessGroupRequest,
      | 'AccessGroupOwnerPublicKeyBase58Check'
      | 'AccessGroupKeyName'
      | 'AccessGroupPublicKeyBase58Check'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<CreateAccessGroupResponse>> => {
  return handleSignAndSubmit('api/v0/create-access-group', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/access-groups-api#update-access-group
 */
export const updateAccessGroup = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreateAccessGroupRequest,
      | 'AccessGroupOwnerPublicKeyBase58Check'
      | 'AccessGroupKeyName'
      | 'AccessGroupPublicKeyBase58Check'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<CreateAccessGroupResponse>> => {
  return handleSignAndSubmit('api/v0/update-access-group', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/access-groups-api#add-access-group-members
 */
export const addAccessGroupMembers = (
  params: TxRequestWithOptionalFeesAndExtraData<AddAccessGroupMembersRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<AddAccessGroupMembersResponse>> => {
  return handleSignAndSubmit(
    'api/v0/add-access-group-members',
    params,
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/access-groups-api#remove-access-group-members
 */
export const removeAccessGroupMembers = (
  params: TxRequestWithOptionalFeesAndExtraData<AddAccessGroupMembersRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<AddAccessGroupMembersResponse>> => {
  return handleSignAndSubmit(
    'api/v0/remove-access-group-members',
    params,
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/access-groups-api#update-access-group-members
 */
export const updateAccessGroupMembers = (
  params: TxRequestWithOptionalFeesAndExtraData<AddAccessGroupMembersRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<AddAccessGroupMembersResponse>> => {
  return handleSignAndSubmit(
    'api/v0/update-access-group-members',
    params,
    options
  );
};
