import { api, cleanURL, PartialWithRequiredFields } from '@deso-core/data';
import { identity } from '@deso-core/identity';
import {
  AdminGetAllUserGlobalMetadataRequest,
  AdminGetHotFeedAlgorithmResponse,
  AdminGetHotFeedUserMultiplierRequest,
  AdminGetHotFeedUserMultiplierResponse,
  AdminGetMempoolStatsResponse,
  AdminGetNFTDropRequest,
  AdminGetNFTDropResponse,
  AdminGetUserAdminDataRequest,
  AdminGetUserAdminDataResponse,
  AdminGetUserGlobalMetadataRequest,
  AdminGetUserGlobalMetadataResponse,
  AdminGetUsernameVerificationAuditLogsRequest,
  AdminGetUsernameVerificationAuditLogsResponse,
  AdminGetVerifiedUsersResponse,
  AdminGrantVerificationBadgeRequest,
  AdminGrantVerificationBadgeResponse,
  AdminPinPostRequest,
  AdminRemoveNilPostsRequest,
  AdminRemoveVerificationBadgeRequest,
  AdminRemoveVerificationBadgeResponse,
  AdminUpdateGlobalFeedRequest,
  AdminUpdateHotFeedAlgorithmRequest,
  AdminUpdateHotFeedPostMultiplierRequest,
  AdminUpdateHotFeedUserMultiplierRequest,
  AdminUpdateNFTDropRequest,
  AdminUpdateNFTDropResponse,
  AdminUpdateUserGlobalMetadataRequest,
  BlockPublicKeyRequest,
  BlockPublicKeyResponse,
  DeletePIIRequest,
  GetBuyDeSoFeeBasisPointsResponse,
  GetGlobalParamsResponse,
  GetUSDCentsToDeSoExchangeRateResponse,
  GetUserGlobalMetadataRequest,
  GetUserGlobalMetadataResponse,
  GetWyreWalletOrderForPublicKeyRequest,
  GetWyreWalletOrderForPublicKeyResponse,
  HotFeedPageRequest,
  HotFeedPageResponse,
  NodeControlRequest,
  NodeControlResponse,
  RequestOptions,
  ResendVerifyEmailRequest,
  SetBuyDeSoFeeBasisPointsRequest,
  SetBuyDeSoFeeBasisPointsResponse,
  SetNotificationMetadataRequest,
  SetUSDCentsToDeSoExchangeRateRequest,
  SetUSDCentsToDeSoExchangeRateResponse,
  SwapIdentityRequest,
  SwapIdentityResponse,
  UpdateGlobalParamsRequest,
  UpdateGlobalParamsResponse,
  UpdateUserGlobalMetadataRequest,
  VerifyEmailRequest,
  WalletOrderQuotationRequest,
  WalletOrderReservationRequest,
  WyreWalletOrderQuotationPayload,
  WyreWalletOrderReservationPayload,
} from 'deso-protocol-types';
import {
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from './internal';
import { ConstructedAndSubmittedTx } from './types';

const jwtPost = async (
  endpoint: string,
  params: any = {},
  options?: RequestOptions & { signAndSubmit?: boolean }
) => {
  const isAdminRequest = endpoint.includes('api/v0/admin');
  let AdminPublicKey = '';

  if (isAdminRequest) {
    const { currentUser } = identity.snapshot();

    if (!currentUser) {
      throw new Error('Cannot issue an admin request without a logged in user');
    }

    AdminPublicKey = currentUser.publicKey;
  }

  const postParams = {
    ...params,
    ...(isAdminRequest && { AdminPublicKey }),
    JWT: params.JWT ?? (await identity.jwt()),
  };

  if (options?.signAndSubmit) {
    return handleSignAndSubmit(endpoint, postParams, options);
  }

  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    postParams
  );
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-user-global-metadata-email-and-phone-number
 */
export const getUserGlobalMetadata = async (
  params: PartialWithRequiredFields<
    GetUserGlobalMetadataRequest,
    'UserPublicKeyBase58Check'
  >,
  options?: RequestOptions
): Promise<GetUserGlobalMetadataResponse> => {
  return jwtPost('api/v0/get-user-global-metadata', params, options);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#update-user-global-metadata-email-and-state-of-messages-read
 */
export type UpdateUserGlobalMetadataParams = PartialWithRequiredFields<
  UpdateUserGlobalMetadataRequest,
  'UserPublicKeyBase58Check'
>;
export const updateUserGlobalMetadata = async (
  params: UpdateUserGlobalMetadataParams,
  options?: RequestOptions
) => {
  return jwtPost('api/v0/update-user-global-metadata', params, options);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#delete-pii-personal-identifiable-information
 */
export const deletePII = async (
  params: PartialWithRequiredFields<DeletePIIRequest, 'PublicKeyBase58Check'>,
  options?: RequestOptions
): Promise<undefined> => {
  return jwtPost('api/v0/delete-pii', params, options);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#block-public-key
 */
export type BlockPublicKeyParams = PartialWithRequiredFields<
  BlockPublicKeyRequest,
  'BlockPublicKeyBase58Check' | 'PublicKeyBase58Check'
>;
export const blockPublicKey = async (
  params: BlockPublicKeyParams,
  options?: RequestOptions
): Promise<BlockPublicKeyResponse> => {
  return jwtPost('api/v0/block-public-key', params, options);
};

/**
 * https://docs.deso.org/deso-backend/api/notification-endpoints#set-notification-metadata
 */
export const setNotificationMetadata = async (
  params: PartialWithRequiredFields<
    SetNotificationMetadataRequest,
    | 'PublicKeyBase58Check'
    | 'LastSeenIndex'
    | 'LastUnreadNotificationIndex'
    | 'UnreadNotifications'
  >,
  options?: RequestOptions
) => {
  return jwtPost('api/v0/set-notification-metadata', params, options);
};

///////////////////////////////////////////////////////////////////////////////
// Admin endpoints
///////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/admin-endpoints#get-verified-users
 */
export const adminGetVerifiedUsers = (
  options?: RequestOptions
): Promise<AdminGetVerifiedUsersResponse> => {
  return jwtPost('api/v0/admin/get-verified-users', {}, options);
};

/**
 * https://docs.deso.org/deso-backend/api/admin-endpoints#get-username-verification-audit-logs
 */
export const adminGetUsernameVerificationAuditLog = (
  params: AdminGetUsernameVerificationAuditLogsRequest,
  options?: RequestOptions
): Promise<AdminGetUsernameVerificationAuditLogsResponse> => {
  return jwtPost(
    'api/v0/admin/get-username-verification-audit-log',
    params,
    options
  );
};

export const adminNodeControl = (
  params: PartialWithRequiredFields<
    Omit<NodeControlRequest, 'JWT' | 'AdminPublicKey'>,
    'Address' | 'OperationType'
  >,
  options?: RequestOptions
): Promise<NodeControlResponse> => {
  return jwtPost('api/v0/admin/node-control', params, options);
};

export const adminGrantVerificationBadge = (
  params: Omit<AdminGrantVerificationBadgeRequest, 'AdminPublicKey'>,
  options?: RequestOptions
): Promise<AdminGrantVerificationBadgeResponse> => {
  return jwtPost('api/v0/admin/grant-verification-badge', params, options);
};

export const adminRemoveVerificationBadge = (
  params: Omit<AdminRemoveVerificationBadgeRequest, 'AdminPublicKey'>,
  options?: RequestOptions
): Promise<AdminRemoveVerificationBadgeResponse> => {
  return jwtPost('api/v0/admin/remove-verification-badge', params, options);
};

export const adminGetUserAdminData = (
  params: AdminGetUserAdminDataRequest,
  options?: RequestOptions
): Promise<AdminGetUserAdminDataResponse> => {
  return jwtPost('api/v0/admin/get-user-admin-data', params, options);
};

export const adminGetUserGlobalMetadata = (
  params: AdminGetUserGlobalMetadataRequest,
  options?: RequestOptions
): Promise<AdminGetUserGlobalMetadataResponse> => {
  return jwtPost('api/v0/admin/get-user-global-metadata', params, options);
};

export const adminUpdateUserGlobalMetadataRequest = (
  params: Omit<AdminUpdateUserGlobalMetadataRequest, 'AdminPublicKey'>,
  options?: RequestOptions
): Promise<void> => {
  return jwtPost('api/v0/admin/update-user-global-metadata', params, options);
};

export const adminGetAllUserGlobalMetadata = (
  params: AdminGetAllUserGlobalMetadataRequest,
  options?: RequestOptions
): Promise<AdminGetUserGlobalMetadataResponse> => {
  return jwtPost('api/v0/admin/get-all-user-global-metadata', params, options);
};

export const adminPinToPost = (
  params: AdminPinPostRequest,
  options?: RequestOptions
): Promise<void> => {
  return jwtPost('api/v0/admin/pin-post', params, options);
};

export const adminUpdateGlobalFeed = (
  params: AdminUpdateGlobalFeedRequest,
  options?: RequestOptions
): Promise<void> => {
  return jwtPost('api/v0/admin/update-global-feed', params, options);
};

export const adminRemoveNilPosts = (
  params: AdminRemoveNilPostsRequest,
  options?: RequestOptions
): Promise<void> => {
  return jwtPost('api/v0/admin/remove-nil-posts', params, options);
};

export const adminReprocessBitcoinBlock = (
  blockHashOrBlockHeight: string,
  options?: RequestOptions
) => {
  return jwtPost(
    `api/v0/admin/reprocess-bitcoin-block/${blockHashOrBlockHeight}`,
    {},
    options
  );
};

export const adminGetMempoolStats = (
  options?: RequestOptions
): Promise<AdminGetMempoolStatsResponse> => {
  return jwtPost('api/v0/admin/get-mempool-stats', {}, options);
};

export const adminSwapIdentity = async (
  params: TxRequestWithOptionalFeesAndExtraData<SwapIdentityRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<SwapIdentityResponse>> => {
  return jwtPost('api/v0/admin/swap-identity', params, options);
};

export const adminSetUSDCentsToDESOReserveExchangeRate = (
  params: Omit<SetUSDCentsToDeSoExchangeRateRequest, 'AdminPublicKey'>,
  options?: RequestOptions
): Promise<SetUSDCentsToDeSoExchangeRateResponse> => {
  return jwtPost(
    'api/v0/admin/set-usd-cents-to-deso-reserve-exchange-rate',
    params,
    options
  );
};

// Not a jwt request, but it's an admin endpoint so it's here...
export const adminGetUSDCentsToDESOReserveExchangeRate = (
  options?: RequestOptions
): Promise<GetUSDCentsToDeSoExchangeRateResponse> => {
  const endpoint = 'api/v0/admin/get-usd-cents-to-deso-reserve-exchange-rate';
  return api.get(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint
  );
};

export const adminSetBuyDesoFeeBasisPoints = (
  params: Omit<SetBuyDeSoFeeBasisPointsRequest, 'AdminPublicKey'>,
  options?: RequestOptions
): Promise<SetBuyDeSoFeeBasisPointsResponse> => {
  return jwtPost('api/v0/admin/set-buy-deso-fee-basis-points', params, options);
};

export const adminGetBuyDesoFeeBasisPoints = (
  options?: RequestOptions
): Promise<GetBuyDeSoFeeBasisPointsResponse> => {
  const endpoint = 'api/v0/admin/get-buy-deso-fee-basis-points';
  return api.get(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint
  );
};

export const adminUpdateGlobalParams = async (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      UpdateGlobalParamsRequest,
      | 'UpdaterPublicKeyBase58Check'
      | 'USDCentsPerBitcoin'
      | 'CreateProfileFeeNanos'
      | 'MaxCopiesPerNFT'
      | 'CreateNFTFeeNanos'
      | 'MinimumNetworkFeeNanosPerKB'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<UpdateGlobalParamsResponse>> => {
  return handleSignAndSubmit(
    'api/v0/admin/update-global-params',
    params,
    options
  );
};

export const adminGetGlobalParams = (
  options?: RequestOptions
): Promise<GetGlobalParamsResponse> => {
  return jwtPost('api/v0/admin/get-global-params', {}, options);
};

export const adminGetNFTDrop = (
  params: AdminGetNFTDropRequest,
  options?: RequestOptions
): Promise<AdminGetNFTDropResponse> => {
  return jwtPost('api/v0/admin/get-nft-drop', params, options);
};

export const adminUpdateNFTDrop = (
  params: AdminUpdateNFTDropRequest,
  options?: RequestOptions
): Promise<AdminUpdateNFTDropResponse> => {
  return jwtPost('/api/v0/admin/update-nft-drop', params, options);
};

export const adminGetUnfilteredHotFeed = (
  params: Partial<HotFeedPageRequest>,
  options?: RequestOptions
): Promise<HotFeedPageResponse> => {
  return jwtPost('api/v0/admin/get-unfiltered-hot-feed', params, options);
};

export const adminGetHotFeedAlgorithm = (
  options?: RequestOptions
): Promise<AdminGetHotFeedAlgorithmResponse> => {
  return jwtPost('api/v0/admin/get-hot-feed-algorithm', {}, options);
};

export const adminUpdateHotFeedAlgorithm = (
  params: AdminUpdateHotFeedAlgorithmRequest,
  options?: RequestOptions
): Promise<void> => {
  return jwtPost('api/v0/admin/update-hot-feed-algorithm', params, options);
};

export const adminUpdateHotFeedUserMultiplier = (
  params: AdminUpdateHotFeedUserMultiplierRequest,
  options?: RequestOptions
): Promise<void> => {
  return jwtPost(
    'api/v0/admin/update-hot-feed-user-multiplier',
    params,
    options
  );
};

export const adminUpdateHotFeedPostMultiplier = (
  params: AdminUpdateHotFeedPostMultiplierRequest,
  options?: RequestOptions
): Promise<void> => {
  return jwtPost(
    'api/v0/admin/update-hot-feed-post-multiplier',
    params,
    options
  );
};

export const adminGetHotFeedUserMultiplier = (
  params: AdminGetHotFeedUserMultiplierRequest,
  options?: RequestOptions
): Promise<AdminGetHotFeedUserMultiplierResponse> => {
  return jwtPost('api/v0/admin/get-hot-feed-user-multiplier', params, options);
};

export const adminGetWyreWalletOrdersForUser = (
  params:
    | PartialWithRequiredFields<
        Omit<GetWyreWalletOrderForPublicKeyRequest, 'AdminPublicKey'>,
        'PublicKeyBase58Check'
      >
    | PartialWithRequiredFields<
        Omit<GetWyreWalletOrderForPublicKeyRequest, 'AdminPublicKey'>,
        'Username'
      >,
  options?: RequestOptions
): Promise<GetWyreWalletOrderForPublicKeyResponse> => {
  return jwtPost(
    'api/v0/admin/get-wyre-wallet-orders-for-public-key',
    params,
    options
  );
};

export const adminGetWyreWalletOrderQuotation = (
  params: WalletOrderQuotationRequest,
  options?: RequestOptions
): Promise<WyreWalletOrderQuotationPayload> => {
  return jwtPost(
    'api/v0/admin/get-wyre-wallet-order-quotation',
    params,
    options
  );
};

export const adminGetWyreWalletOrderReservation = (
  params: WalletOrderReservationRequest,
  options?: RequestOptions
): Promise<WyreWalletOrderReservationPayload> => {
  return jwtPost(
    'api/v0/admin/get-wyre-wallet-order-reservation',
    params,
    options
  );
};

export const resendVerifyEmail = (
  params: PartialWithRequiredFields<ResendVerifyEmailRequest, 'PublicKey'>,
  options?: RequestOptions
): Promise<void> => {
  return jwtPost('api/v0/resend-verify-email', params, options);
};

export const verifyEmail = (
  params: VerifyEmailRequest,
  options?: RequestOptions
): Promise<void> => {
  const endpoint = 'api/v0/verify-email';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};
