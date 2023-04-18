import { hexToBytes } from '@noble/hashes/utils';
import { utils as ecUtils } from '@noble/secp256k1';
import {
  ConstructedTransactionResponse,
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
} from '../backend-types';
import { checkPartyAccessGroups, PartialWithRequiredFields } from '../data';
import {
  bs58PublicKeyToCompressedBytes,
  encodeUTF8ToBytes,
  identity,
  TransactionExtraDataKV,
  TransactionMetadataFollow,
  TransactionMetadataLike,
  TransactionMetadataNewMessage,
  TransactionMetadataSubmitPost,
  TransactionMetadataUpdateProfile,
  uvarint64ToBuf,
} from '../identity';
import { constructBalanceModelTx, handleSignAndSubmit } from '../internal';
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
): Promise<
  ConstructedAndSubmittedTx<
    UpdateProfileResponse | ConstructedTransactionResponse
  >
> => {
  return handleSignAndSubmit('api/v0/update-profile', params, options);
};

export const constructUpdateProfileTransaction = (
  params: TypeWithOptionalFeesAndExtraData<UpdateProfileRequest>
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataUpdateProfile();
  // TODO: this is broken.
  metadata.profilePublicKey =
    params.UpdaterPublicKeyBase58Check !== params.ProfilePublicKeyBase58Check
      ? bs58PublicKeyToCompressedBytes(params.ProfilePublicKeyBase58Check)
      : new Uint8Array(0);
  metadata.newUsername = encodeUTF8ToBytes(params.NewUsername);
  metadata.newDescription = encodeUTF8ToBytes(params.NewDescription);
  // TODO: we probably need something to handle the profile pic compression here.
  metadata.newProfilePic = encodeUTF8ToBytes(params.NewProfilePic);
  metadata.newCreatorBasisPoints = params.NewCreatorBasisPoints;
  metadata.newStakeMultipleBasisPoints = params.NewStakeMultipleBasisPoints;
  metadata.isHidden = params.IsHidden;
  return constructBalanceModelTx(params.UpdaterPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#submit-post
 */
export type SubmitPostRequestParams = TypeWithOptionalFeesAndExtraData<
  PartialWithRequiredFields<
    SubmitPostRequest,
    'UpdaterPublicKeyBase58Check' | 'BodyObj'
  >
>;
export const submitPost = (
  params: SubmitPostRequestParams,
  options?: RequestOptions
): Promise<
  ConstructedAndSubmittedTx<SubmitPostResponse | ConstructedTransactionResponse>
> => {
  return handleSignAndSubmit('api/v0/submit-post', params, {
    ...options,
    constructionFunction: constructSubmitPost,
  });
};

export const constructSubmitPost = (
  params: SubmitPostRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataSubmitPost();
  const BodyObj = Object(params.BodyObj) as { [k: string]: string };
  Object.keys(BodyObj).forEach(
    (key) => (!BodyObj[key] || !BodyObj[key].length) && delete BodyObj[key]
  );
  metadata.body = encodeUTF8ToBytes(JSON.stringify(BodyObj));
  metadata.creatorBasisPoints = 1000;
  metadata.stakeMultipleBasisPoints = 12500;
  metadata.timestampNanos = Math.ceil(
    1e6 * (globalThis.performance.timeOrigin + globalThis.performance.now())
  );
  metadata.isHidden = !!params.IsHidden;
  metadata.parentStakeId = hexToBytes(params.ParentStakeID || '');
  metadata.postHashToModify = hexToBytes(params.PostHashHexToModify || '');
  const extraDataKVs: TransactionExtraDataKV[] = [];
  if (params.RepostedPostHashHex) {
    extraDataKVs.push(
      new TransactionExtraDataKV(
        encodeUTF8ToBytes('RecloutedPostHash'),
        hexToBytes(params.RepostedPostHashHex)
      )
    );
    extraDataKVs.push(
      new TransactionExtraDataKV(
        encodeUTF8ToBytes('IsQuotedReclout'),
        Uint8Array.from([
          !params.BodyObj.Body &&
          !params.BodyObj.ImageURLs?.length &&
          !params.BodyObj.VideoURLs?.length
            ? 0
            : 1,
        ])
      )
    );
  }
  return constructBalanceModelTx(params.UpdaterPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    ConsensusExtraDataKVs: extraDataKVs,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#follow
 */
export type CreateFollowTxnRequestParams = TypeWithOptionalFeesAndExtraData<
  PartialWithRequiredFields<
    CreateFollowTxnStatelessRequest,
    'FollowedPublicKeyBase58Check' | 'FollowerPublicKeyBase58Check'
  >
>;

export const updateFollowingStatus = (
  params: CreateFollowTxnRequestParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<CreateFollowTxnStatelessResponse>> => {
  return handleSignAndSubmit('api/v0/create-follow-txn-stateless', params, {
    ...options,
    constructionFunction: constructFollowTransaction,
  });
};

export const constructFollowTransaction = (
  params: CreateFollowTxnRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataFollow();
  metadata.followedPublicKey = bs58PublicKeyToCompressedBytes(
    params.FollowedPublicKeyBase58Check
  );
  metadata.isUnfollow = !!params.IsUnfollow;
  return constructBalanceModelTx(
    params.FollowerPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
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

// This one is a bit annoying since we should really look up how many diamonds you've already given on this post and only send the diff.
export const constructDiamondTransaction = (
  params: TypeWithOptionalFeesAndExtraData<SendDiamondsRequest>
): Promise<ConstructedTransactionResponse> => {
  const consensusExtraDataKVs: TransactionExtraDataKV[] = [];
  const diamondLevelKV = new TransactionExtraDataKV();
  diamondLevelKV.key = encodeUTF8ToBytes('DiamondLevel');
  diamondLevelKV.value = uvarint64ToBuf(params.DiamondLevel);
  consensusExtraDataKVs.push(diamondLevelKV);
  const diamondPostHashKV = new TransactionExtraDataKV();
  diamondPostHashKV.key = encodeUTF8ToBytes('DiamondPostHash');
  diamondPostHashKV.value = hexToBytes(params.DiamondPostHashHex);
  return Promise.reject('Local construction for diamonds not supported yet.');
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#like
 */

export type CreateLikeTransactionParams = TypeWithOptionalFeesAndExtraData<
  PartialWithRequiredFields<
    CreateLikeStatelessRequest,
    'LikedPostHashHex' | 'ReaderPublicKeyBase58Check'
  >
>;
export const updateLikeStatus = async (
  params: CreateLikeTransactionParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<CreateLikeStatelessResponse>> => {
  return handleSignAndSubmit('api/v0/create-like-stateless', params, {
    ...options,
    constructionFunction: constructLikeTransaction,
  });
};

export const constructLikeTransaction = (
  params: CreateLikeTransactionParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataLike();
  metadata.likedPostHash = hexToBytes(params.LikedPostHashHex);
  metadata.isUnlike = !!params.IsUnlike;
  return constructBalanceModelTx(params.ReaderPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
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
): Promise<
  ConstructedAndSubmittedTx<
    SendNewMessageResponse | ConstructedTransactionResponse
  >
> => {
  return handleSignAndSubmit('api/v0/send-dm-message', params, {
    ...options,
    constructionFunction: constructSendDMTransaction,
  });
};

export const constructSendDMTransaction = (
  params: SendNewMessageParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataNewMessage();
  metadata.encryptedText = encodeUTF8ToBytes(params.EncryptedMessageText);
  metadata.newMessageOperation = 0;
  metadata.newMessageType = 0;
  metadata.recipientAccessGroupKeyname = encodeUTF8ToBytes(
    params.RecipientAccessGroupKeyName
  );
  metadata.recipientAccessGroupOwnerPublicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientAccessGroupOwnerPublicKeyBase58Check
  );
  metadata.recipientAccessGroupPublicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientAccessGroupPublicKeyBase58Check
  );
  metadata.senderAccessGroupKeyName = encodeUTF8ToBytes(
    params.SenderAccessGroupKeyName
  );
  metadata.senderAccessGroupOwnerPublicKey = bs58PublicKeyToCompressedBytes(
    params.SenderAccessGroupOwnerPublicKeyBase58Check
  );
  metadata.senderAccessGroupPublicKey = bs58PublicKeyToCompressedBytes(
    params.SenderAccessGroupPublicKeyBase58Check
  );
  metadata.timestampNanos = Math.ceil(
    1e6 * (globalThis.performance.timeOrigin + globalThis.performance.now())
  );
  return constructBalanceModelTx(
    params.SenderAccessGroupOwnerPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-direct-message
 */
export const updateDMMessage = async (
  params: TypeWithOptionalFeesAndExtraData<SendNewMessageRequest>,
  options?: RequestOptions
): Promise<
  ConstructedAndSubmittedTx<
    SendNewMessageResponse | ConstructedTransactionResponse
  >
> => {
  return handleSignAndSubmit('api/v0/update-dm-message', params, {
    ...options,
    constructionFunction: constructUpdateDMTransaction,
  });
};

export const constructUpdateDMTransaction = (
  params: TypeWithOptionalFeesAndExtraData<SendNewMessageRequest>
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataNewMessage();
  metadata.encryptedText = encodeUTF8ToBytes(params.EncryptedMessageText);
  metadata.newMessageOperation = 1;
  metadata.newMessageType = 0;
  metadata.recipientAccessGroupKeyname = encodeUTF8ToBytes(
    params.RecipientAccessGroupKeyName
  );
  metadata.recipientAccessGroupOwnerPublicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientAccessGroupOwnerPublicKeyBase58Check
  );
  metadata.recipientAccessGroupPublicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientAccessGroupPublicKeyBase58Check
  );
  metadata.senderAccessGroupKeyName = encodeUTF8ToBytes(
    params.SenderAccessGroupKeyName
  );
  metadata.senderAccessGroupOwnerPublicKey = bs58PublicKeyToCompressedBytes(
    params.SenderAccessGroupOwnerPublicKeyBase58Check
  );
  metadata.senderAccessGroupPublicKey = bs58PublicKeyToCompressedBytes(
    params.SenderAccessGroupPublicKeyBase58Check
  );
  metadata.timestampNanos = parseInt(params.TimestampNanosString);
  return constructBalanceModelTx(
    params.SenderAccessGroupOwnerPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/social-transactions-api#send-group-chat-message
 */
export const sendGroupChatMessage = async (
  params: SendNewMessageParams,
  options?: RequestOptions
): Promise<
  ConstructedAndSubmittedTx<
    SendNewMessageResponse | ConstructedTransactionResponse
  >
> => {
  return handleSignAndSubmit('api/v0/send-group-chat-message', params, {
    ...options,
    constructionFunction: constructSendGroupChatMessageTransaction,
  });
};

export const constructSendGroupChatMessageTransaction = (
  params: SendNewMessageParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataNewMessage();
  metadata.encryptedText = encodeUTF8ToBytes(params.EncryptedMessageText);
  metadata.newMessageOperation = 0;
  metadata.newMessageType = 1;
  metadata.recipientAccessGroupKeyname = encodeUTF8ToBytes(
    params.RecipientAccessGroupKeyName
  );
  metadata.recipientAccessGroupOwnerPublicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientAccessGroupOwnerPublicKeyBase58Check
  );
  metadata.recipientAccessGroupPublicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientAccessGroupPublicKeyBase58Check
  );
  metadata.senderAccessGroupKeyName = encodeUTF8ToBytes(
    params.SenderAccessGroupKeyName
  );
  metadata.senderAccessGroupOwnerPublicKey = bs58PublicKeyToCompressedBytes(
    params.SenderAccessGroupOwnerPublicKeyBase58Check
  );
  metadata.senderAccessGroupPublicKey = bs58PublicKeyToCompressedBytes(
    params.SenderAccessGroupPublicKeyBase58Check
  );
  metadata.timestampNanos = Math.ceil(
    1e6 * (globalThis.performance.timeOrigin + globalThis.performance.now())
  );
  return constructBalanceModelTx(
    params.SenderAccessGroupOwnerPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
  );
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
): Promise<
  ConstructedAndSubmittedTx<
    SendNewMessageResponse | ConstructedTransactionResponse
  >
> => {
  return handleSignAndSubmit('api/v0/update-group-chat-message', params, {
    ...options,
    constructionFunction: constructUpdateGroupChatMessageTransaction,
  });
};

export const constructUpdateGroupChatMessageTransaction = (
  params: TypeWithOptionalFeesAndExtraData<SendNewMessageRequest>
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataNewMessage();
  metadata.encryptedText = encodeUTF8ToBytes(params.EncryptedMessageText);
  metadata.newMessageOperation = 1;
  metadata.newMessageType = 1;
  metadata.recipientAccessGroupKeyname = encodeUTF8ToBytes(
    params.RecipientAccessGroupKeyName
  );
  metadata.recipientAccessGroupOwnerPublicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientAccessGroupOwnerPublicKeyBase58Check
  );
  metadata.recipientAccessGroupPublicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientAccessGroupPublicKeyBase58Check
  );
  metadata.senderAccessGroupKeyName = encodeUTF8ToBytes(
    params.SenderAccessGroupKeyName
  );
  metadata.senderAccessGroupOwnerPublicKey = bs58PublicKeyToCompressedBytes(
    params.SenderAccessGroupOwnerPublicKeyBase58Check
  );
  metadata.senderAccessGroupPublicKey = bs58PublicKeyToCompressedBytes(
    params.SenderAccessGroupPublicKeyBase58Check
  );
  metadata.timestampNanos = parseInt(params.TimestampNanosString);
  return constructBalanceModelTx(
    params.SenderAccessGroupOwnerPublicKeyBase58Check,
    metadata,
    {
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
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
