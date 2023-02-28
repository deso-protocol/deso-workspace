import { api, PartialWithRequiredFields } from '@deso-core/data';
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
  WalletOrderQuotationRequest,
  WalletOrderReservationRequest,
  WyreWalletOrderQuotationPayload,
  WyreWalletOrderReservationPayload,
} from 'deso-protocol-types';
import { TxRequestWithOptionalFeesAndExtraData } from './internal';
import { ConstructedAndSubmittedTx } from './types';

const jwtPost = async (path: string, params: any) => {
  const isAdminRequest = path.replace(/^\/+/, '').startsWith('api/v0/admin');
  let AdminPublicKey = '';

  if (isAdminRequest) {
    const { currentUser } = identity.snapshot();

    if (!currentUser) {
      throw new Error('Cannot issue an admin request without a logged in user');
    }

    AdminPublicKey = currentUser.publicKey;
  }

  return api.post(path, {
    ...params,
    ...(isAdminRequest && { AdminPublicKey }),
    JWT: await identity.jwt(),
  });
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
/**
 * https://docs.deso.org/deso-backend/api/admin-endpoints#get-verified-users
 */
export const adminGetVerifiedUsers =
  (): Promise<AdminGetVerifiedUsersResponse> => {
    return jwtPost('api/v0/admin/get-verified-users', {});
  };

/**
 * https://docs.deso.org/deso-backend/api/admin-endpoints#get-username-verification-audit-logs
 */
export const adminGetUsernameVerificationAuditLog = (
  params: AdminGetUsernameVerificationAuditLogsRequest
): Promise<AdminGetUsernameVerificationAuditLogsResponse> => {
  return jwtPost('api/v0/admin/get-username-verification-audit-log', params);
};

export const adminNodeControl = (
  params: PartialWithRequiredFields<
    Omit<NodeControlRequest, 'JWT' | 'AdminPublicKey'>,
    'Address' | 'OperationType'
  >
): Promise<NodeControlResponse> => {
  return jwtPost('api/v0/admin/node-control', params);
};

export const adminGrantVerificationBadge = (
  params: Omit<AdminGrantVerificationBadgeRequest, 'AdminPublicKey'>
): Promise<AdminGrantVerificationBadgeResponse> => {
  return jwtPost('api/v0/admin/grant-verification-badge', params);
};

export const adminRemoveVerificationBadge = (
  params: Omit<AdminRemoveVerificationBadgeRequest, 'AdminPublicKey'>
): Promise<AdminRemoveVerificationBadgeResponse> => {
  return jwtPost('api/v0/admin/remove-verification-badge', params);
};

export const adminGetUserAdminData = (
  params: AdminGetUserAdminDataRequest
): Promise<AdminGetUserAdminDataResponse> => {
  return jwtPost('api/v0/admin/get-user-admin-data', params);
};

export const adminGetUserGlobalMetadata = (
  params: AdminGetUserGlobalMetadataRequest
): Promise<AdminGetUserGlobalMetadataResponse> => {
  return jwtPost('api/v0/admin/get-user-global-metadata', params);
};

export const adminUpdateUserGlobalMetadataRequest = (
  params: Omit<AdminUpdateUserGlobalMetadataRequest, 'AdminPublicKey'>
): Promise<void> => {
  return jwtPost('api/v0/admin/update-user-global-metadata', params);
};

export const adminGetAllUserGlobalMetadata = (
  params: AdminGetAllUserGlobalMetadataRequest
): Promise<AdminGetUserGlobalMetadataResponse> => {
  return jwtPost('api/v0/admin/get-all-user-global-metadata', params);
};

export const adminPinToPost = (params: AdminPinPostRequest): Promise<void> => {
  return jwtPost('api/v0/admin/pin-post', params);
};

export const adminUpdateGlobalFeed = (
  params: AdminUpdateGlobalFeedRequest
): Promise<void> => {
  return jwtPost('api/v0/admin/update-global-feed', params);
};

export const adminRemoveNilPosts = (
  params: AdminRemoveNilPostsRequest
): Promise<void> => {
  return jwtPost('api/v0/admin/remove-nil-posts', params);
};

export const adminReprocessBitcoinBlock = (blockHashOrBlockHeight: string) => {
  return jwtPost(
    `api/v0/admin/reprocess-bitcoin-block/${blockHashOrBlockHeight}`,
    {}
  );
};

export const adminGetMempoolStats =
  (): Promise<AdminGetMempoolStatsResponse> => {
    return jwtPost('api/v0/admin/get-mempool-stats', {});
  };

export const adminSwapIdentity = async (
  params: TxRequestWithOptionalFeesAndExtraData<SwapIdentityRequest>
): Promise<ConstructedAndSubmittedTx<SwapIdentityResponse>> => {
  const constructedTransactionResponse = await jwtPost(
    'api/v0/admin/swap-identity',
    params
  );
  const submittedTransactionResponse = await identity.signAndSubmit(
    constructedTransactionResponse
  );

  return {
    constructedTransactionResponse,
    submittedTransactionResponse,
  };
};

export const adminSetUSDCentsToDESOReserveExchangeRate = (
  params: Omit<SetUSDCentsToDeSoExchangeRateRequest, 'AdminPublicKey'>
): Promise<SetUSDCentsToDeSoExchangeRateResponse> => {
  return jwtPost(
    'api/v0/admin/set-usd-cents-to-deso-reserve-exchange-rate',
    params
  );
};

export const adminGetUSDCentsToDESOReserveExchangeRate =
  (): Promise<GetUSDCentsToDeSoExchangeRateResponse> => {
    return api.get('api/v0/admin/get-usd-cents-to-deso-reserve-exchange-rate');
  };

export const adminSetBuyDesoFeeBasisPoints = (
  params: SetBuyDeSoFeeBasisPointsRequest
): Promise<SetBuyDeSoFeeBasisPointsResponse> => {
  return jwtPost('api/v0/admin/set-buy-deso-fee-basis-points', params);
};

export const adminGetBuyDesoFeeBasisPoints =
  (): Promise<GetBuyDeSoFeeBasisPointsResponse> => {
    return api.get('api/v0/admin/get-buy-deso-fee-basis-points');
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
  >
): Promise<ConstructedAndSubmittedTx<UpdateGlobalParamsResponse>> => {
  const constructedTransactionResponse = await jwtPost(
    'api/v0/admin/update-global-params',
    params
  );
  const submittedTransactionResponse = await identity.signAndSubmit(
    constructedTransactionResponse
  );

  return {
    constructedTransactionResponse,
    submittedTransactionResponse,
  };
};

export const adminGetGlobalParams = (): Promise<GetGlobalParamsResponse> => {
  return jwtPost('api/v0/admin/get-global-params', {});
};

export const adminGetNFTDrop = (
  params: AdminGetNFTDropRequest
): Promise<AdminGetNFTDropResponse> => {
  return jwtPost('api/v0/admin/get-nft-drop', params);
};

export const adminUpdateNFTDrop = (
  params: AdminUpdateNFTDropRequest
): Promise<AdminUpdateNFTDropResponse> => {
  return jwtPost('api/v0/admin/update-nft-drop', params);
};

export const adminGetUnfilteredHotFeed = (
  params: Partial<HotFeedPageRequest>
): Promise<HotFeedPageResponse> => {
  return jwtPost('api/v0/admin/get-unfiltered-hot-feed', params);
};

export const adminGetHotFeedAlgorithm =
  (): Promise<AdminGetHotFeedAlgorithmResponse> => {
    return jwtPost('api/v0/admin/get-hot-feed-algorithm', {});
  };

export const adminUpdateHotFeedAlgorithm = (
  params: AdminUpdateHotFeedAlgorithmRequest
): Promise<void> => {
  return jwtPost('api/v0/admin/update-hot-feed-algorithm', params);
};

export const adminUpdateHotFeedUserMultiplier = (
  params: AdminUpdateHotFeedUserMultiplierRequest
): Promise<void> => {
  return jwtPost('api/v0/admin/update-hot-feed-user-multiplier', params);
};

export const adminUpdateHotFeedPostMultiplier = (
  params: AdminUpdateHotFeedPostMultiplierRequest
): Promise<void> => {
  return jwtPost('api/v0/admin/update-hot-feed-post-multiplier', params);
};

export const adminGetHotFeedUserMultiplier = (
  params: AdminGetHotFeedUserMultiplierRequest
): Promise<AdminGetHotFeedUserMultiplierResponse> => {
  return jwtPost('api/v0/admin/get-hot-feed-user-multiplier', params);
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
      >
): Promise<GetWyreWalletOrderForPublicKeyResponse> => {
  return jwtPost('api/v0/admin/get-wyre-wallet-orders-for-public-key', params);
};

export const adminGetWyreWalletOrderQuotation = (
  params: WalletOrderQuotationRequest
): Promise<WyreWalletOrderQuotationPayload> => {
  return jwtPost('api/v0/admin/get-wyre-wallet-order-quotation', params);
};

export const adminGetWyreWalletOrderReservation = (
  params: WalletOrderReservationRequest
): Promise<WyreWalletOrderReservationPayload> => {
  return jwtPost('api/v0/admin/get-wyre-wallet-order-reservation', params);
};
