import {
  AccessGroupEntryResponse,
  AccessGroupMemberEntryResponse,
  CheckPartyAccessGroupsRequest,
  CheckPartyAccessGroupsResponse,
  GetAccessGroupInfoRequest,
  GetAccessGroupMemberRequest,
  GetAccessGroupsRequest,
  GetAccessGroupsResponse,
  GetAllMessagingGroupKeysRequest,
  GetAppStateRequest,
  GetAppStateResponse,
  GetBlockTemplateRequest,
  GetBlockTemplateResponse,
  GetBulkAccessGroupEntriesRequest,
  GetBulkAccessGroupEntriesResponse,
  GetDiamondsForPostRequest,
  GetDiamondsForPostResponse,
  GetDiamondsForPublicKeyRequest,
  GetDiamondsForPublicKeyResponse,
  GetExchangeRateResponse,
  GetFollowsResponse,
  GetFollowsStatelessRequest,
  GetFullTikTokURLRequest,
  GetFullTikTokURLResponse,
  GetHodlersForPublicKeyRequest,
  GetHodlersForPublicKeyResponse,
  GetLikesForPostRequest,
  GetLikesForPostResponse,
  GetNextNFTShowcaseResponse,
  GetNFTBidsForNFTPostRequest,
  GetNFTBidsForNFTPostResponse,
  GetNFTBidsForUserRequest,
  GetNFTBidsForUserResponse,
  GetNFTCollectionSummaryRequest,
  GetNFTCollectionSummaryResponse,
  GetNFTEntriesForPostHashRequest,
  GetNFTEntriesForPostHashResponse,
  GetNFTsForUserRequest,
  GetNFTsForUserResponse,
  GetNFTShowcaseRequest,
  GetNFTShowcaseResponse,
  GetNotificationsCountRequest,
  GetNotificationsRequest,
  GetNotificationsResponse,
  GetPaginatedAccessGroupMembersRequest,
  GetPaginatedAccessGroupMembersResponse,
  GetPaginatedMessagesForDmThreadRequest,
  GetPaginatedMessagesForDmThreadResponse,
  GetPaginatedMessagesForGroupChatThreadRequest,
  GetPaginatedMessagesForGroupChatThreadResponse,
  GetPostsDiamondedBySenderForReceiverRequest,
  GetPostsForPublicKeyRequest,
  GetPostsForPublicKeyResponse,
  GetPostsHashHexListRequest,
  GetPostsHashHexListResponse,
  GetPostsStatelessRequest,
  GetPostsStatelessResponse,
  GetProfilesRequest,
  GetProfilesResponse,
  GetQuoteRepostsForPostRequest,
  GetQuoteRepostsForPostResponse,
  GetRepostsForPostRequest,
  GetRepostsForPostResponse,
  GetSinglePostRequest,
  GetSinglePostResponse,
  GetSingleProfileRequest,
  GetSingleProfileResponse,
  GetTransactionSpendingLimitHexStringRequest,
  GetTransactionSpendingLimitHexStringResponse,
  GetTxnRequest,
  GetTxnResponse,
  GetUserDerivedKeysRequest,
  GetUserDerivedKeysResponse,
  GetUserMessageThreadsRequest,
  GetUserMessageThreadsResponse,
  GetUserMetadataRequest,
  GetUserMetadataResponse,
  GetUsersResponse,
  GetUsersStatelessRequest,
  GetVideoStatusRequest,
  GetVideoStatusResponse,
  HotFeedPageRequest,
  HotFeedPageResponse,
  IsFolllowingPublicKeyResponse,
  IsFollowingPublicKeyRequest,
  IsHodlingPublicKeyRequest,
  IsHodlingPublicKeyResponse,
  LinkPreviewResponse,
  RegisterMessagingGroupKeyRequest,
  RegisterMessagingGroupKeyResponse,
  SubmitBlockRequest,
  SubmitBlockResponse,
  TransactionSpendingLimitResponse,
} from 'deso-protocol-types';
import { api, media } from './api';

/**
 * Returns a type that requires the given keys to be present in the partial.
 *
 * @example The PostsHashHexList field is required, but all other fields of the
 * interface GetPostsHashHexListRequest are optional:
 *    const params: PartialWithRequiredFields<GetPostsHashHexListRequest, 'PostsHashHexList'> = { ... }
 *
 * @example To list multiple required fields, use a union:
 *    PartialWithRequiredFields<SomeType, 'requiredFieldA' | 'requiredFieldB'>
 */
export type PartialWithRequiredFields<T, K extends keyof T> = Partial<T> &
  Pick<T, K>;

////////////////////////////////////////////////////////////////////////////////////////////////
// Post Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-posts-stateless
 */
export type GetPostsStatelessParams = Partial<GetPostsStatelessRequest>;
export const getPostsStateless = (
  params: GetPostsStatelessParams
): Promise<GetPostsStatelessResponse> => {
  return api.post('api/v0/get-posts-stateless', params);
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-single-post
 */
export type GetSinglePostParams = PartialWithRequiredFields<
  GetSinglePostRequest,
  'PostHashHex'
>;
export const getSinglePost = (
  params: GetSinglePostParams
): Promise<GetSinglePostResponse> => {
  return api.post('api/v0/get-single-post', params);
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-posts-for-public-key
 */
export type GetPostsForUserParams =
  | PartialWithRequiredFields<
      GetPostsForPublicKeyRequest,
      'PublicKeyBase58Check' | 'NumToFetch'
    >
  | PartialWithRequiredFields<
      GetPostsForPublicKeyRequest,
      'Username' | 'NumToFetch'
    >;
export const getPostsForUser = (
  params: GetPostsForUserParams
): Promise<GetPostsForPublicKeyResponse> => {
  return api.post('api/v0/get-posts-for-public-key', params);
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-hot-feed
 */
export type GetHotFeedParams = Partial<HotFeedPageRequest>;
export const getHotFeed = (
  params: GetHotFeedParams
): Promise<HotFeedPageResponse> => {
  return api.post('api/v0/get-hot-feed', params);
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-diamonded-posts
 */
export type GetDiamondedPostsParams =
  | PartialWithRequiredFields<
      GetPostsDiamondedBySenderForReceiverRequest,
      | 'SenderPublicKeyBase58Check'
      | 'ReceiverPublicKeyBase58Check'
      | 'NumToFetch'
    >
  | PartialWithRequiredFields<
      GetPostsDiamondedBySenderForReceiverRequest,
      'SenderUsername' | 'ReceiverUsername' | 'NumToFetch'
    >;
export const getDiamondedPosts = (params: GetDiamondedPostsParams) => {
  return api.post('api/v0/get-diamonded-posts', params);
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-likes-for-post
 */
export type GetLikesForPostParams = PartialWithRequiredFields<
  GetLikesForPostRequest,
  'PostHashHex' | 'Limit' | 'Offset'
>;
export const getLikesForPost = (
  params: GetLikesForPostParams
): Promise<GetLikesForPostResponse> => {
  return api.post('api/v0/get-likes-for-post', params);
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-diamonds-for-post
 */
export type GetDiamondsForPostParams = PartialWithRequiredFields<
  GetDiamondsForPostRequest,
  'PostHashHex' | 'Limit' | 'Offset'
>;
export const getDiamondsForPost = (
  params: GetDiamondsForPostParams
): Promise<GetDiamondsForPostResponse> => {
  return api.post('api/v0/get-diamonds-for-post', params);
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-reposts-for-post
 */
export type GetRepostsForPostParams = PartialWithRequiredFields<
  GetRepostsForPostRequest,
  'PostHashHex' | 'Limit' | 'Offset'
>;
export const getRepostsForPost = (
  params: GetRepostsForPostParams
): Promise<GetRepostsForPostResponse> => {
  return api.post('/api/v0/get-reposts-for-post', params);
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-quote-reposts-for-post
 */
type GetQuoteRepostsForPostParams = PartialWithRequiredFields<
  GetQuoteRepostsForPostRequest,
  'PostHashHex' | 'Limit' | 'Offset'
>;
export const getQuoteRepostsForPost = (
  params: GetQuoteRepostsForPostParams
): Promise<GetQuoteRepostsForPostResponse> => {
  return api.post('api/v0/get-reposts-for-post', params);
};

type GetPostsHashHexListParams = PartialWithRequiredFields<
  GetPostsHashHexListRequest,
  'PostsHashHexList'
>;
export const getPostsHashHexList = (
  params: GetPostsHashHexListParams
): Promise<GetPostsHashHexListResponse> => {
  return api.post('api/v0/get-posts-hashhexlist', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// User Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-users-stateless
 */
export type GetUsersStatelessParams = PartialWithRequiredFields<
  GetUsersStatelessRequest,
  'PublicKeysBase58Check'
>;
export const getUsersStateless = (
  params: GetUsersStatelessParams
): Promise<GetUsersResponse> => {
  return api.post('api/v0/get-users-stateless', params);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-single-profile-picture
 */
export const buildProfilePictureUrl = (
  PublicKeyBase58Check: string,
  options: { fallbackImageUrl?: string }
) => {
  return `${api.nodeURI.replace(
    /\/+$/,
    ''
  )}/api/v0/get-single-profile-picture/${PublicKeyBase58Check}${
    options.fallbackImageUrl ? `?fallback=${options.fallbackImageUrl}` : ''
  }`;
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-single-profile
 */
export type GetSingleProfileParams =
  | PartialWithRequiredFields<GetSingleProfileRequest, 'PublicKeyBase58Check'>
  | PartialWithRequiredFields<GetSingleProfileRequest, 'PublicKeyBase58Check'>;
export const getSingleProfile = (
  params: GetSingleProfileParams
): Promise<GetSingleProfileResponse> => {
  return api.post('api/v0/get-single-profile', params);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-profiles
 */
export type GetProfilesParams = Partial<GetProfilesRequest>;
export const getProfiles = (
  params: GetProfilesRequest
): Promise<GetProfilesResponse> => {
  return api.post('api/v0/get-profiles', params);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-user-metadata
 */
export const getUserMetadata = (
  params: GetUserMetadataRequest
): Promise<GetUserMetadataResponse> => {
  return api.get(`api/v0/get-user-metadata/${params.PublicKeyBase58Check}`);
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-user-derived-keys
 */
export const getUserDerivedKeys = (
  params: GetUserDerivedKeysRequest
): Promise<GetUserDerivedKeysResponse> => {
  return api.post('api/v0/get-user-derived-keys', params);
};

export const getAllMessagingGroupKeys = (
  params: GetAllMessagingGroupKeysRequest
): Promise<RegisterMessagingGroupKeyResponse> => {
  return api.post('api/v0/get-all-messaging-group-keys', params);
};

export type RegisterMessagingGroupKeyParams = PartialWithRequiredFields<
  RegisterMessagingGroupKeyRequest,
  | 'OwnerPublicKeyBase58Check'
  | 'MessagingGroupKeyName'
  | 'MessagingKeySignatureHex'
  | 'MessagingPublicKeyBase58Check'
  | 'MinFeeRateNanosPerKB'
>;
export const registerMessagingGroupKey = (
  params: RegisterMessagingGroupKeyParams
): Promise<RegisterMessagingGroupKeyResponse> => {
  return api.post('api/v0/register-messaging-group-key', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Messaging Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/messages-endpoints#get-all-user-message-threads
 */
export const getAllMessageThreads = (
  params: GetUserMessageThreadsRequest
): Promise<GetUserMessageThreadsResponse> => {
  return api.post('api/v0/get-all-user-message-threads', params);
};

/**
 * https://docs.deso.org/deso-backend/api/messages-endpoints#get-paginated-messages-for-group-chat-thread
 */
export type GetPaginatedMessagesForGroupThreadParams =
  | PartialWithRequiredFields<
      GetPaginatedMessagesForGroupChatThreadRequest,
      | 'UserPublicKeyBase58Check'
      | 'AccessGroupKeyName'
      | 'MaxMessagesToFetch'
      | 'StartTimeStamp'
    >
  | PartialWithRequiredFields<
      GetPaginatedMessagesForGroupChatThreadRequest,
      | 'UserPublicKeyBase58Check'
      | 'AccessGroupKeyName'
      | 'MaxMessagesToFetch'
      | 'StartTimeStampString'
    >;
export const getPaginatedGroupChatThread = (
  params: GetPaginatedMessagesForGroupThreadParams
): Promise<GetPaginatedMessagesForGroupChatThreadResponse> => {
  const actualParams = {
    ...params,
  } as GetPaginatedMessagesForGroupChatThreadRequest;
  if (
    typeof actualParams.StartTimeStampString === 'undefined' &&
    typeof actualParams.StartTimeStamp === 'number'
  ) {
    actualParams.StartTimeStampString = actualParams.StartTimeStamp.toString();
  }
  return api.post(
    'api/v0/get-paginated-messages-for-group-chat-thread',
    actualParams
  );
};

/**
 * https://docs.deso.org/deso-backend/api/messages-endpoints#get-paginated-messages-for-a-direct-message-thread
 */
export type GetPaginatedMessagesForDMThreadParams =
  | PartialWithRequiredFields<
      GetPaginatedMessagesForDmThreadRequest,
      | 'UserGroupOwnerPublicKeyBase58Check'
      | 'UserGroupKeyName'
      | 'PartyGroupOwnerPublicKeyBase58Check'
      | 'PartyGroupKeyName'
      | 'MaxMessagesToFetch'
      | 'StartTimeStamp'
    >
  | PartialWithRequiredFields<
      GetPaginatedMessagesForDmThreadRequest,
      | 'UserGroupOwnerPublicKeyBase58Check'
      | 'UserGroupKeyName'
      | 'PartyGroupOwnerPublicKeyBase58Check'
      | 'PartyGroupKeyName'
      | 'MaxMessagesToFetch'
      | 'StartTimeStampString'
    >;
export const getPaginatedDMThread = (
  params: GetPaginatedMessagesForDMThreadParams
): Promise<GetPaginatedMessagesForDmThreadResponse> => {
  const actualParams = {
    ...params,
  } as GetPaginatedMessagesForDmThreadRequest;
  if (
    typeof actualParams.StartTimeStampString === 'undefined' &&
    typeof actualParams.StartTimeStamp === 'number'
  ) {
    actualParams.StartTimeStampString = actualParams.StartTimeStamp.toString();
  }
  return api.post('api/v0/get-paginated-messages-for-dm-thread', actualParams);
};

/**
 * https://docs.deso.org/deso-backend/api/messages-endpoints#get-user-group-chat-threads-ordered-by-timestamp
 */
export const getGroupChatThreads = (
  params: GetUserMessageThreadsRequest
): Promise<GetUserMessageThreadsResponse> => {
  return api.post(
    'api/v0/get-user-group-chat-threads-ordered-by-timestamp',
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/messages-endpoints#get-user-direct-message-threads-ordered-by-timestamp
 */
export const getDMThreads = (
  params: GetUserMessageThreadsRequest
): Promise<GetUserMessageThreadsResponse> => {
  return api.post('api/v0/get-user-dm-threads-ordered-by-timestamp', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Access Group Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-all-user-access-groups
 */
export const getAllAccessGroups = (
  params: GetAccessGroupsRequest
): Promise<GetAccessGroupsResponse> => {
  return api.post('api/v0/get-all-user-access-groups', params);
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-all-access-groups-owned
 */
export const getAllAccessGroupsOwned = (
  params: GetAccessGroupsRequest
): Promise<GetAccessGroupsResponse> => {
  return api.post('api/v0/get-all-user-access-groups-owned', params);
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-all-access-groups-owned
 */
export const getAllAccessGroupsMemberOnly = (
  params: GetAccessGroupsRequest
): Promise<GetAccessGroupsResponse> => {
  return api.post('api/v0/get-all-user-access-groups-member-only', params);
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#check-party-access-groups
 */
export const checkPartyAccessGroups = (
  params: CheckPartyAccessGroupsRequest
): Promise<CheckPartyAccessGroupsResponse> => {
  return api.post('api/v0/check-party-access-groups', params);
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-access-group-information
 */
export const getAccessGroupInfo = (
  params: GetAccessGroupInfoRequest
): Promise<AccessGroupEntryResponse> => {
  return api.post('api/v0/get-access-group-info', params);
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-access-group-member-information
 */
export const getAccessGroupMemberInfo = (
  params: GetAccessGroupMemberRequest
): Promise<AccessGroupMemberEntryResponse> => {
  return api.post('api/v0/get-access-group-member-info', params);
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-paginated-access-group-members
 */
export const getPaginatedAccessGroupMembers = (
  params: PartialWithRequiredFields<
    GetPaginatedAccessGroupMembersRequest,
    | 'AccessGroupKeyName'
    | 'MaxMembersToFetch'
    | 'AccessGroupOwnerPublicKeyBase58Check'
  >
): Promise<GetPaginatedAccessGroupMembersResponse> => {
  return api.post('api/v0/get-paginated-access-group-members', params);
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-bulk-access-group-entries
 */
export const getBulkAccessGroups = (
  params: GetBulkAccessGroupEntriesRequest
): Promise<GetBulkAccessGroupEntriesResponse> => {
  return api.post('api/v0/get-bulk-access-group-entries', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Transaction Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
export const getTransaction = (
  params: GetTxnRequest
): Promise<GetTxnResponse> => {
  return api.post('api/v0/get-txn', params);
};

export const waitForTransactionFound = async (
  TxnHashHex: string
): Promise<void> => {
  // In the best case scenario we'll find the tx immediately
  const { TxnFound } = await getTransaction({ TxnHashHex });

  if (TxnFound) {
    return;
  }

  // Otherwise we'll poll for it with a 150ms interval and a 5 min timeout We
  // can adjust this timeout up or down depending, I've just chosen 5 minutes
  // somewhat arbitrarily...
  const timeout = 300000;
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const { TxnFound } = await getTransaction({ TxnHashHex });
        if (TxnFound) {
          clearInterval(interval);
          resolve();
        }
      } catch (e) {
        clearInterval(interval);
        reject(e);
      }
      if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error('Timed out waiting for transaction to be found'));
      }
    }, 150);
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Metadata Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/backend-api#health-check
 */
export const healthCheck = (): Promise<void> => {
  return api.get('api/v0/health-check');
};

/**
 * https://docs.deso.org/deso-backend/api/backend-api#get-exchange-rate
 */
export const getExchangeRates = (): Promise<GetExchangeRateResponse> => {
  return api.get('api/v0/get-exchange-rate');
};

/**
 * https://docs.deso.org/deso-backend/api/backend-api#get-app-state
 */
export const getAppState = (
  params: Partial<GetAppStateRequest> = {}
): Promise<GetAppStateResponse> => {
  return api.post('api/v0/get-app-state', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Tx Spending Limit endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/transaction-spending-limits-endpoints#get-transaction-spending-limit-response-from-hex
 */
export const getTransactionSpendingLimitFromHex = (
  hex: string
): Promise<TransactionSpendingLimitResponse> => {
  return api.get(
    `api/v0/get-transaction-spending-limit-response-from-hex/${hex}`
  );
};

/**
 * https://docs.deso.org/deso-backend/api/transaction-spending-limits-endpoints#get-transaction-spending-limit-hex-string
 */
export const getTransactionSpendingLimitHex = (
  params: GetTransactionSpendingLimitHexStringRequest
): Promise<GetTransactionSpendingLimitHexStringResponse> => {
  return api.post('api/v0/get-transaction-spending-limit-hex-string', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Notification endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/notification-endpoints#get-notifications
 */
export const getNotifications = (
  params: PartialWithRequiredFields<
    GetNotificationsRequest,
    'PublicKeyBase58Check' | 'NumToFetch'
  >
): Promise<GetNotificationsResponse> => {
  return api.post('api/v0/get-notifications', params);
};

/**
 * https://docs.deso.org/deso-backend/api/notification-endpoints#get-unread-notification-count
 */
export const getUnreadNotificationsCount = (
  params: GetNotificationsCountRequest
): Promise<GetNotificationsCountRequest> => {
  return api.post('api/v0/get-unread-notifications-count', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Miner endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/miner-endpoints#get-block-template
 */
export const getBlockTemplate = (
  params: GetBlockTemplateRequest
): Promise<GetBlockTemplateResponse> => {
  return api.post('api/v0/get-block-template', params);
};

/**
 * https://docs.deso.org/deso-backend/api/miner-endpoints#submit-block
 */
export const submitBlock = (
  params: SubmitBlockRequest
): Promise<SubmitBlockResponse> => {
  return api.post('api/v0/submit-block', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// NFT Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nfts-for-user
 */
export const getNFTsForUser = (
  params: PartialWithRequiredFields<
    GetNFTsForUserRequest,
    'UserPublicKeyBase58Check'
  >
): Promise<GetNFTsForUserResponse> => {
  return api.post('api/v0/get-nfts-for-user', params);
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-bids-for-nft-post
 */
export const getAllBidsForNFT = (
  params: GetNFTBidsForNFTPostRequest
): Promise<GetNFTBidsForNFTPostResponse> => {
  return api.post('api/v0/get-nft-bids-for-nft-post', params);
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-bids-for-user
 */
export const getNFTBidsForUser = (
  params: PartialWithRequiredFields<
    GetNFTBidsForUserRequest,
    'UserPublicKeyBase58Check'
  >
): Promise<GetNFTBidsForUserResponse> => {
  return api.post('api/v0/get-nft-bids-for-user', params);
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-showcase
 */
export const getNFTShowcase = (
  params: Partial<GetNFTShowcaseRequest> = {}
): Promise<GetNFTShowcaseResponse> => {
  return api.post('api/v0/get-nft-showcase', params);
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-next-nft-showcase
 */
export const getNextNFTShowcase = (): Promise<GetNextNFTShowcaseResponse> => {
  return api.post('api/v0/get-next-nft-showcase', {});
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-collection-summary
 */
export const getNFTCollectionSummary = (
  params: PartialWithRequiredFields<
    GetNFTCollectionSummaryRequest,
    'PostHashHex'
  >
): Promise<GetNFTCollectionSummaryResponse> => {
  return api.post('api/v0/get-nft-collection-summary', params);
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-entries-for-post-hash
 */
export const getNFTEntriesForPost = (
  params: PartialWithRequiredFields<
    GetNFTEntriesForPostHashRequest,
    'PostHashHex'
  >
): Promise<GetNFTEntriesForPostHashResponse> => {
  return api.post('api/v0/get-nft-entries-for-post-hash', params);
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Social endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/social-endpoints#get-hodlers-for-public-key
 */
export const getHodlersForUser = (
  params:
    | PartialWithRequiredFields<
        GetHodlersForPublicKeyRequest,
        'PublicKeyBase58Check'
      >
    | PartialWithRequiredFields<GetHodlersForPublicKeyRequest, 'Username'>
): Promise<GetHodlersForPublicKeyResponse> => {
  return api.post('api/v0/get-hodlers-for-public-key', params);
};

// Alias for getHodlers
export const getHolders = getHodlersForUser;

/**
 * https://docs.deso.org/deso-backend/api/social-endpoints#get-diamonds-for-public-key
 */
export const getDiamondsForUser = (
  params: PartialWithRequiredFields<
    GetDiamondsForPublicKeyRequest,
    'PublicKeyBase58Check'
  >
): Promise<GetDiamondsForPublicKeyResponse> => {
  return api.post('api/v0/get-diamonds-for-public-key', params);
};

/**
 * https://docs.deso.org/deso-backend/api/social-endpoints#get-follows-stateless
 */
export const getFollowersForUser = (
  params:
    | PartialWithRequiredFields<
        GetFollowsStatelessRequest,
        'PublicKeyBase58Check'
      >
    | PartialWithRequiredFields<GetFollowsStatelessRequest, 'Username'>
): Promise<GetFollowsResponse> => {
  return api.post('api/v0/get-follows-stateless', params);
};

/**
 * https://docs.deso.org/deso-backend/api/social-endpoints#is-following-public-key
 */
export const getIsFollowing = (
  params: IsFollowingPublicKeyRequest
): Promise<IsFolllowingPublicKeyResponse> => {
  return api.post('api/v0/is-following-public-key', params);
};

/**
 * https://docs.deso.org/deso-backend/api/social-endpoints#is-hodling-public-key
 */
export const getIsHodling = (
  params: PartialWithRequiredFields<
    IsHodlingPublicKeyRequest,
    'PublicKeyBase58Check' | 'IsHodlingPublicKeyBase58Check'
  >
): Promise<IsHodlingPublicKeyResponse> => {
  return api.post('api/v0/is-hodling-public-key', params);
};

// Alias for getIsHodling
export const getIsHolding = getIsHodling;

////////////////////////////////////////////////////////////////////////////////////////////////
// Media endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/media-endpoints#get-full-tiktok-url
 */
export const getFullTikTokURL = (
  params: GetFullTikTokURLRequest
): Promise<GetFullTikTokURLResponse> => {
  return api.post('api/v0/get-full-tiktok-url', params);
};

/**
 * https://docs.deso.org/deso-backend/api/media-endpoints#get-video-status
 */
export const getVideoStatus = (
  params: GetVideoStatusRequest
): Promise<GetVideoStatusResponse> => {
  return media.get(`api/v0/get-video-status/${params.videoId}`);
};

export const getLinkPreview = (url: string): Promise<LinkPreviewResponse> => {
  return media.get(`api/v0/link-preview?url=${encodeURIComponent(url)}`);
};

export const buildProxyImageURL = (imageURL: string): string => {
  return `${media.mediaURI}/api/v0/proxy-image?url=${encodeURIComponent(
    imageURL
  )}`;
};
