import { PartialWithRequiredFields } from '@deso-core/data';
import {
  CreateFollowTxnStatelessRequest,
  CreateFollowTxnStatelessResponse,
  CreateLikeStatelessRequest,
  CreateLikeStatelessResponse,
  SendDiamondsRequest,
  SendDiamondsResponse,
  SendNewMessageRequest,
  SendNewMessageResponse,
  SubmitPostRequest,
  SubmitPostResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from 'deso-protocol-types';
import { handleSignAndSubmit } from '../internal';
import { SubmitResponse, TypeWithOptionalFeesAndExtraData } from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#update-profile
 */
export const updateProfile = async (
  params: TypeWithOptionalFeesAndExtraData<UpdateProfileRequest>
): Promise<SubmitResponse<UpdateProfileResponse>> => {
  return handleSignAndSubmit('api/v0/update-profile', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#submit-post
 */
export const submitPost = (
  params: TypeWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      SubmitPostRequest,
      'UpdaterPublicKeyBase58Check' | 'BodyObj'
    >
  >
): Promise<SubmitResponse<SubmitPostResponse>> => {
  return handleSignAndSubmit('api/v0/submit-post', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#follow
 */
export const updateFollowingStatus = (
  params: TypeWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreateFollowTxnStatelessRequest,
      'FollowedPublicKeyBase58Check' | 'FollowerPublicKeyBase58Check'
    >
  >
): Promise<SubmitResponse<CreateFollowTxnStatelessResponse>> => {
  return handleSignAndSubmit('api/v0/create-follow-txn-stateless', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-diamonds
 */
export const sendDiamonds = async (
  params: TypeWithOptionalFeesAndExtraData<SendDiamondsRequest>
): Promise<SubmitResponse<SendDiamondsResponse>> => {
  return handleSignAndSubmit('api/v0/send-diamonds', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#like
 */
export const updateLikeStatus = async (
  params: TypeWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<CreateLikeStatelessRequest, 'LikedPostHashHex'>
  >
): Promise<SubmitResponse<CreateLikeStatelessResponse>> => {
  return handleSignAndSubmit('api/v0/create-like-stateless', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-direct-message
 * TODO: for DM should we fill in the messaging group name as a convenience? For DM it is currently always 'default-key'
 */
type SendNewMessageParams = TypeWithOptionalFeesAndExtraData<
  Omit<SendNewMessageRequest, 'TimestampNanosString'>
>;
export const sendDMMessage = async (
  params: SendNewMessageParams
): Promise<SubmitResponse<SendNewMessageResponse>> => {
  return handleSignAndSubmit('api/v0/send-dm-message', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-direct-message
 */
export const updateDMMessage = async (
  params: TypeWithOptionalFeesAndExtraData<SendNewMessageRequest>
): Promise<SubmitResponse<SendNewMessageResponse>> => {
  return handleSignAndSubmit('api/v0/update-dm-message', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-group-chat-message
 */
export const sendGroupChatMessage = async (params: SendNewMessageParams) => {
  return handleSignAndSubmit('api/v0/send-group-chat-message', params);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-group-chat-message
 */
export const updateGroupChatMessage = async (
  params: TypeWithOptionalFeesAndExtraData<SendNewMessageRequest>
) => {
  return handleSignAndSubmit('api/v0/update-group-chat-message', params);
};
