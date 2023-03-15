import {
  checkPartyAccessGroups,
  PartialWithRequiredFields,
} from '@deso-core/data';
import { identity } from '@deso-core/identity';
import { utils as ecUtils } from '@noble/secp256k1';
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
 * Convenience function to send a message to a group chat or DM that handles
 * encryption and access group party check. AccessGroup is optional, and if not
 * provided we make the assumption that this is a direct message and use the
 * user's default messaging group. You may also pass an optional
 * sendMessageUnencrypted flag to force the message to be sent unencrypted.
 */
interface SendMessageParams {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  Message: string;
  AccessGroup?: string;
  ExtraData?: { [key: string]: string };
  MinFeeRateNanosPerKB?: number;
}
export const sendMessage = async (
  params: SendMessageParams,
  options?: RequestOptions & { sendMessageUnencrypted?: boolean }
) => {
  if (!params.AccessGroup) {
    params.AccessGroup = 'default-key';
  }

  const {
    SenderAccessGroupPublicKeyBase58Check,
    SenderAccessGroupKeyName,
    RecipientAccessGroupPublicKeyBase58Check,
    RecipientAccessGroupKeyName,
  } = await checkPartyAccessGroups({
    SenderPublicKeyBase58Check: params.SenderPublicKeyBase58Check,
    SenderAccessGroupKeyName: 'default-key',
    RecipientPublicKeyBase58Check: params.RecipientPublicKeyBase58Check,
    RecipientAccessGroupKeyName: params.AccessGroup,
  });

  if (!SenderAccessGroupKeyName) {
    throw new Error('Sender does not have default messaging group');
  }

  const EncryptedMessageText = options?.sendMessageUnencrypted
    ? hexEncodePlainText(params.Message)
    : await identity.encryptMessage(
        RecipientAccessGroupPublicKeyBase58Check,
        params.Message
      );

  if (!EncryptedMessageText) {
    throw new Error('Failed to encrypt message');
  }

  const sendMessageRequestParams = {
    SenderAccessGroupOwnerPublicKeyBase58Check:
      params.SenderPublicKeyBase58Check,
    SenderAccessGroupPublicKeyBase58Check,
    SenderAccessGroupKeyName,
    RecipientAccessGroupOwnerPublicKeyBase58Check:
      params.RecipientPublicKeyBase58Check,
    RecipientAccessGroupPublicKeyBase58Check,
    RecipientAccessGroupKeyName,
    EncryptedMessageText,
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
  };

  return params.AccessGroup === 'default-key'
    ? sendDMMessage(sendMessageRequestParams, options)
    : sendGroupChatMessage(sendMessageRequestParams, options);
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

/**
 * @private
 * internal helper function to convert a string to hex
 * @param plainText
 * @returns hex encoded string
 */
function hexEncodePlainText(plainText: string) {
  const textEncoder = new TextEncoder();
  const bytes = textEncoder.encode(plainText);
  return ecUtils.bytesToHex(new Uint8Array(bytes));
}
