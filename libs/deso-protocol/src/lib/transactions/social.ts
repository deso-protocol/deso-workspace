import { PartialWithRequiredFields } from '@deso-core/data';
import {
  CreateFollowTxnStatelessRequest,
  CreateFollowTxnStatelessResponse,
  CreateLikeStatelessRequest,
  CreateLikeStatelessResponse,
  RequestOptions,
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
import {
  ConstructedAndSubmittedTx,
  TypeWithOptionalFeesAndExtraData,
} from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#update-profile
 */
export const updateProfile = async (
  params: TypeWithOptionalFeesAndExtraData<UpdateProfileRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<UpdateProfileResponse>> => {
  return handleSignAndSubmit('api/v0/update-profile', params, options);
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
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<SubmitPostResponse>> => {
  return handleSignAndSubmit('api/v0/submit-post', params, options);
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
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<CreateFollowTxnStatelessResponse>> => {
  return handleSignAndSubmit(
    'api/v0/create-follow-txn-stateless',
    params,
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-diamonds
 */
export const sendDiamonds = async (
  params: TypeWithOptionalFeesAndExtraData<SendDiamondsRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<SendDiamondsResponse>> => {
  return handleSignAndSubmit('api/v0/send-diamonds', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#like
 */
export const updateLikeStatus = async (
  params: TypeWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<CreateLikeStatelessRequest, 'LikedPostHashHex'>
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<CreateLikeStatelessResponse>> => {
  return handleSignAndSubmit('api/v0/create-like-stateless', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-direct-message
 * TODO: for DM should we fill in the messaging group name as a convenience? For DM it is currently always 'default-key'
 */
type SendNewMessageParams = TypeWithOptionalFeesAndExtraData<
  Omit<SendNewMessageRequest, 'TimestampNanosString'>
>;
export const sendDMMessage = async (
  params: SendNewMessageParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<SendNewMessageResponse>> => {
  return handleSignAndSubmit('api/v0/send-dm-message', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-direct-message
 */
export const updateDMMessage = async (
  params: TypeWithOptionalFeesAndExtraData<SendNewMessageRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<SendNewMessageResponse>> => {
  return handleSignAndSubmit('api/v0/update-dm-message', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-group-chat-message
 */
export const sendGroupChatMessage = async (
  params: SendNewMessageParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<SendNewMessageResponse>> => {
  return handleSignAndSubmit('api/v0/send-group-chat-message', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-group-chat-message
 */
export const updateGroupChatMessage = async (
  params: TypeWithOptionalFeesAndExtraData<SendNewMessageRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<SendNewMessageResponse>> => {
  return handleSignAndSubmit(
    'api/v0/update-group-chat-message',
    params,
    options
  );
};
