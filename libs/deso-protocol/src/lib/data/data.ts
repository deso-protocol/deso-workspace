import {
  AccessGroupEntryResponse,
  AccessGroupMemberEntryResponse,
  AssociationCountsResponse,
  AssociationResponse,
  AssociationsCountResponse,
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
  GetGlobalParamsResponse,
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
  HotFeedPageRequest,
  HotFeedPageResponse,
  IsFolllowingPublicKeyResponse,
  IsFollowingPublicKeyRequest,
  IsHodlingPublicKeyRequest,
  IsHodlingPublicKeyResponse,
  PostAssociationQuery,
  PostAssociationsResponse,
  RegisterMessagingGroupKeyRequest,
  RegisterMessagingGroupKeyResponse,
  RequestOptions,
  SubmitBlockRequest,
  SubmitBlockResponse,
  TransactionSpendingLimitResponse,
  UserAssociationQuery,
  UserAssociationsResponse,
} from '../backend-types';
import { api, cleanURL } from './api';
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
  params: GetPostsStatelessParams,
  options?: RequestOptions
): Promise<GetPostsStatelessResponse> => {
  const endpoint = 'api/v0/get-posts-stateless';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-single-post
 */
export type GetSinglePostParams = PartialWithRequiredFields<
  GetSinglePostRequest,
  'PostHashHex'
>;
export const getSinglePost = (
  params: GetSinglePostParams,
  options?: RequestOptions
): Promise<GetSinglePostResponse> => {
  const endpoint = 'api/v0/get-single-post';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  params: GetPostsForUserParams,
  options?: RequestOptions
): Promise<GetPostsForPublicKeyResponse> => {
  const endpoint = 'api/v0/get-posts-for-public-key';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-hot-feed
 */
export type GetHotFeedParams = Partial<HotFeedPageRequest>;
export const getHotFeed = (
  params: GetHotFeedParams,
  options?: RequestOptions
): Promise<HotFeedPageResponse> => {
  const endpoint = 'api/v0/get-hot-feed';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
export const getDiamondedPosts = (
  params: GetDiamondedPostsParams,
  options?: RequestOptions
) => {
  const endpoint = 'api/v0/get-diamonded-posts';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-likes-for-post
 */
export type GetLikesForPostParams = PartialWithRequiredFields<
  GetLikesForPostRequest,
  'PostHashHex' | 'Limit' | 'Offset'
>;
export const getLikesForPost = (
  params: GetLikesForPostParams,
  options?: RequestOptions
): Promise<GetLikesForPostResponse> => {
  const endpoint = 'api/v0/get-likes-for-post';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-diamonds-for-post
 */
export type GetDiamondsForPostParams = PartialWithRequiredFields<
  GetDiamondsForPostRequest,
  'PostHashHex' | 'Limit' | 'Offset'
>;
export const getDiamondsForPost = (
  params: GetDiamondsForPostParams,
  options?: RequestOptions
): Promise<GetDiamondsForPostResponse> => {
  const endpoint = 'api/v0/get-diamonds-for-post';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-reposts-for-post
 */
export type GetRepostsForPostParams = PartialWithRequiredFields<
  GetRepostsForPostRequest,
  'PostHashHex' | 'Limit' | 'Offset'
>;
export const getRepostsForPost = (
  params: GetRepostsForPostParams,
  options?: RequestOptions
): Promise<GetRepostsForPostResponse> => {
  const endpoint = 'api/v0/get-reposts-for-post';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/post-endpoints#get-quote-reposts-for-post
 */
type GetQuoteRepostsForPostParams = PartialWithRequiredFields<
  GetQuoteRepostsForPostRequest,
  'PostHashHex' | 'Limit' | 'Offset'
>;
export const getQuoteRepostsForPost = (
  params: GetQuoteRepostsForPostParams,
  options?: RequestOptions
): Promise<GetQuoteRepostsForPostResponse> => {
  const endpoint = 'api/v0/get-quote-reposts-for-post';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

type GetPostsHashHexListParams = PartialWithRequiredFields<
  GetPostsHashHexListRequest,
  'PostsHashHexList'
>;
export const getPostsHashHexList = (
  params: GetPostsHashHexListParams,
  options?: RequestOptions
): Promise<GetPostsHashHexListResponse> => {
  const endpoint = 'api/v0/get-posts-hashhexlist';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  params: GetUsersStatelessParams,
  options?: RequestOptions
): Promise<GetUsersResponse> => {
  const endpoint = 'api/v0/get-users-stateless';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-single-profile-picture
 */
export const buildProfilePictureUrl = (
  PublicKeyBase58Check: string,
  options: { fallbackImageUrl?: string } & RequestOptions
) => {
  const nodeURI = options.nodeURI ?? api.nodeURI;
  return cleanURL(
    nodeURI,
    `/api/v0/get-single-profile-picture/${PublicKeyBase58Check}${
      options.fallbackImageUrl ? `?fallback=${options.fallbackImageUrl}` : ''
    }`
  );
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-single-profile
 */
export type GetSingleProfileParams =
  | PartialWithRequiredFields<GetSingleProfileRequest, 'PublicKeyBase58Check'>
  | PartialWithRequiredFields<GetSingleProfileRequest, 'Username'>;
export const getSingleProfile = (
  params: GetSingleProfileParams,
  options?: RequestOptions
): Promise<GetSingleProfileResponse> => {
  const endpoint = 'api/v0/get-single-profile';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-profiles
 */
export type GetProfilesParams = Partial<GetProfilesRequest>;
export const getProfiles = (
  params: GetProfilesRequest,
  options?: RequestOptions
): Promise<GetProfilesResponse> => {
  const endpoint = 'api/v0/get-profiles';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-user-metadata
 */
export const getUserMetadata = (
  params: GetUserMetadataRequest,
  options?: RequestOptions
): Promise<GetUserMetadataResponse> => {
  const endpoint = `api/v0/get-user-metadata/${params.PublicKeyBase58Check}`;
  return api.get(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint
  );
};

/**
 * https://docs.deso.org/deso-backend/api/user-endpoints#get-user-derived-keys
 */
export const getUserDerivedKeys = (
  params: GetUserDerivedKeysRequest,
  options?: RequestOptions
): Promise<GetUserDerivedKeysResponse> => {
  const endpoint = 'api/v0/get-user-derived-keys';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

export const getAllMessagingGroupKeys = (
  params: GetAllMessagingGroupKeysRequest,
  options?: RequestOptions
): Promise<RegisterMessagingGroupKeyResponse> => {
  const endpoint = 'api/v0/get-all-messaging-group-keys';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  params: RegisterMessagingGroupKeyParams,
  options?: RequestOptions
): Promise<RegisterMessagingGroupKeyResponse> => {
  const endpoint = 'api/v0/register-messaging-group-key';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Messaging Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/messages-endpoints#get-all-user-message-threads
 */
export const getAllMessageThreads = (
  params: GetUserMessageThreadsRequest,
  options?: RequestOptions
): Promise<GetUserMessageThreadsResponse> => {
  const endpoint = 'api/v0/get-all-user-message-threads';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  params: GetPaginatedMessagesForGroupThreadParams,
  options?: RequestOptions
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
  const endpoint = 'api/v0/get-paginated-messages-for-group-chat-thread';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
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
  params: GetPaginatedMessagesForDMThreadParams,
  options?: RequestOptions
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
  const endpoint = 'api/v0/get-paginated-messages-for-dm-thread';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    actualParams
  );
};

/**
 * https://docs.deso.org/deso-backend/api/messages-endpoints#get-user-group-chat-threads-ordered-by-timestamp
 */
export const getGroupChatThreads = (
  params: GetUserMessageThreadsRequest,
  options?: RequestOptions
): Promise<GetUserMessageThreadsResponse> => {
  const endpoint = 'api/v0/get-user-group-chat-threads-ordered-by-timestamp';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/messages-endpoints#get-user-direct-message-threads-ordered-by-timestamp
 */
export const getDMThreads = (
  params: GetUserMessageThreadsRequest,
  options?: RequestOptions
): Promise<GetUserMessageThreadsResponse> => {
  const endpoint = 'api/v0/get-user-dm-threads-ordered-by-timestamp';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Access Group Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-all-user-access-groups
 */
export const getAllAccessGroups = (
  params: GetAccessGroupsRequest,
  options?: RequestOptions
): Promise<GetAccessGroupsResponse> => {
  const endpoint = 'api/v0/get-all-user-access-groups';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-all-access-groups-owned
 */
export const getAllAccessGroupsOwned = (
  params: GetAccessGroupsRequest,
  options?: RequestOptions
): Promise<GetAccessGroupsResponse> => {
  const endpoint = 'api/v0/get-all-user-access-groups-owned';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-all-access-groups-owned
 */
export const getAllAccessGroupsMemberOnly = (
  params: GetAccessGroupsRequest,
  options?: RequestOptions
): Promise<GetAccessGroupsResponse> => {
  const endpoint = 'api/v0/get-all-user-access-groups-member-only';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#check-party-access-groups
 */
export const checkPartyAccessGroups = (
  params: CheckPartyAccessGroupsRequest,
  options?: RequestOptions
): Promise<CheckPartyAccessGroupsResponse> => {
  const endpoint = 'api/v0/check-party-access-groups';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-access-group-information
 */
export const getAccessGroupInfo = (
  params: GetAccessGroupInfoRequest,
  options?: RequestOptions
): Promise<AccessGroupEntryResponse> => {
  const endpoint = 'api/v0/get-access-group-info';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-access-group-member-information
 */
export const getAccessGroupMemberInfo = (
  params: GetAccessGroupMemberRequest,
  options?: RequestOptions
): Promise<AccessGroupMemberEntryResponse> => {
  const endpoint = 'api/v0/get-access-group-member-info';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  >,
  options?: RequestOptions
): Promise<GetPaginatedAccessGroupMembersResponse> => {
  const endpoint = 'api/v0/get-paginated-access-group-members';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/access-group-endpoints#get-bulk-access-group-entries
 */
export const getBulkAccessGroups = (
  params: GetBulkAccessGroupEntriesRequest,
  options?: RequestOptions
): Promise<GetBulkAccessGroupEntriesResponse> => {
  const endpoint = 'api/v0/get-bulk-access-group-entries';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Transaction Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
export const getTransaction = (
  params: GetTxnRequest,
  options?: RequestOptions
): Promise<GetTxnResponse> => {
  const endpoint = 'api/v0/get-txn';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * Waits for a transaction to be found in the mempool. If it is found before the
 * timeout, it resolves immediately. If it is not found before the timeout, it
 * rejects. Useful for sequencing transactions that depend on other
 * transactions.
 *
 * @param TxnHashHex - hex encoded transaction we are looking for in the mempool
 * @param options - options object
 * @param options.timeout - timeout in milliseconds, we'll wait 1 minute before
 * throwing an error by default.
 */
export const waitForTransactionFound = async (
  TxnHashHex: string,
  { timeout = 60000 }: { timeout?: number } = {}
): Promise<void> => {
  // In the best case scenario we'll find the tx immediately
  const { TxnFound } = await getTransaction({ TxnHashHex });

  if (TxnFound) {
    return;
  }

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
export const healthCheck = (options?: RequestOptions): Promise<void> => {
  const endpoint = 'api/v0/health-check';
  return api.get(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint
  );
};

/**
 * https://docs.deso.org/deso-backend/api/backend-api#get-exchange-rate
 */
export const getExchangeRates = (
  options?: RequestOptions
): Promise<GetExchangeRateResponse> => {
  const endpoint = 'api/v0/get-exchange-rate';
  return api.get(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint
  );
};

/**
 * https://docs.deso.org/deso-backend/api/backend-api#get-app-state
 */
export const getAppState = (
  params: Partial<GetAppStateRequest> = {},
  options?: RequestOptions
): Promise<GetAppStateResponse> => {
  const endpoint = 'api/v0/get-app-state';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

export const getGlobalParams = (
  options?: RequestOptions
): Promise<GetGlobalParamsResponse> => {
  const endpoint = 'api/v0/get-global-params';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    {}
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Tx Spending Limit endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/transaction-spending-limits-endpoints#get-transaction-spending-limit-response-from-hex
 */
export const getTransactionSpendingLimitFromHex = (
  hex: string,
  options?: RequestOptions
): Promise<TransactionSpendingLimitResponse> => {
  const endpoint = `api/v0/get-transaction-spending-limit-response-from-hex/${hex}`;
  return api.get(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint
  );
};

/**
 * https://docs.deso.org/deso-backend/api/transaction-spending-limits-endpoints#get-transaction-spending-limit-hex-string
 */
export const getTransactionSpendingLimitHex = (
  params: GetTransactionSpendingLimitHexStringRequest,
  options?: RequestOptions
): Promise<GetTransactionSpendingLimitHexStringResponse> => {
  const endpoint = 'api/v0/get-transaction-spending-limit-hex-string';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  >,
  options?: RequestOptions
): Promise<GetNotificationsResponse> => {
  const endpoint = 'api/v0/get-notifications';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/notification-endpoints#get-unread-notification-count
 */
export const getUnreadNotificationsCount = (
  params: GetNotificationsCountRequest,
  options?: RequestOptions
): Promise<GetNotificationsCountRequest> => {
  const endpoint = 'api/v0/get-unread-notifications-count';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Miner endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/miner-endpoints#get-block-template
 */
export const getBlockTemplate = (
  params: GetBlockTemplateRequest,
  options?: RequestOptions
): Promise<GetBlockTemplateResponse> => {
  const endpoint = 'api/v0/get-block-template';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/miner-endpoints#submit-block
 */
export const submitBlock = (
  params: SubmitBlockRequest,
  options?: RequestOptions
): Promise<SubmitBlockResponse> => {
  const endpoint = 'api/v0/submit-block';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  >,
  options?: RequestOptions
): Promise<GetNFTsForUserResponse> => {
  const endpoint = 'api/v0/get-nfts-for-user';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-bids-for-nft-post
 */
export const getAllBidsForNFT = (
  params: GetNFTBidsForNFTPostRequest,
  options?: RequestOptions
): Promise<GetNFTBidsForNFTPostResponse> => {
  const endpoint = 'api/v0/get-nft-bids-for-nft-post';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-bids-for-user
 */
export const getNFTBidsForUser = (
  params: PartialWithRequiredFields<
    GetNFTBidsForUserRequest,
    'UserPublicKeyBase58Check'
  >,
  options?: RequestOptions
): Promise<GetNFTBidsForUserResponse> => {
  const endpoint = 'api/v0/get-nft-bids-for-user';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-showcase
 */
export const getNFTShowcase = (
  params: Partial<GetNFTShowcaseRequest> = {},
  options?: RequestOptions
): Promise<GetNFTShowcaseResponse> => {
  const endpoint = 'api/v0/get-nft-showcase';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-next-nft-showcase
 */
export const getNextNFTShowcase = (
  options?: RequestOptions
): Promise<GetNextNFTShowcaseResponse> => {
  const endpoint = 'api/v0/get-next-nft-showcase';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    {}
  );
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-collection-summary
 */
export const getNFTCollectionSummary = (
  params: PartialWithRequiredFields<
    GetNFTCollectionSummaryRequest,
    'PostHashHex'
  >,
  options?: RequestOptions
): Promise<GetNFTCollectionSummaryResponse> => {
  const endpoint = 'api/v0/get-nft-collection-summary';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/nft-endpoints#get-nft-entries-for-post-hash
 */
export const getNFTEntriesForPost = (
  params: PartialWithRequiredFields<
    GetNFTEntriesForPostHashRequest,
    'PostHashHex'
  >,
  options?: RequestOptions
): Promise<GetNFTEntriesForPostHashResponse> => {
  const endpoint = 'api/v0/get-nft-entries-for-nft-post';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
    | PartialWithRequiredFields<GetHodlersForPublicKeyRequest, 'Username'>,
  options?: RequestOptions
): Promise<GetHodlersForPublicKeyResponse> => {
  const endpoint = 'api/v0/get-hodlers-for-public-key';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  >,
  options?: RequestOptions
): Promise<GetDiamondsForPublicKeyResponse> => {
  const endpoint = 'api/v0/get-diamonds-for-public-key';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
    | PartialWithRequiredFields<GetFollowsStatelessRequest, 'Username'>,
  options?: RequestOptions
): Promise<GetFollowsResponse> => {
  const endpoint = 'api/v0/get-follows-stateless';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/social-endpoints#is-following-public-key
 */
export const getIsFollowing = (
  params: IsFollowingPublicKeyRequest,
  options?: RequestOptions
): Promise<IsFolllowingPublicKeyResponse> => {
  const endpoint = 'api/v0/is-following-public-key';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/social-endpoints#is-hodling-public-key
 */
export const getIsHodling = (
  params: PartialWithRequiredFields<
    IsHodlingPublicKeyRequest,
    'PublicKeyBase58Check' | 'IsHodlingPublicKeyBase58Check'
  >,
  options?: RequestOptions
): Promise<IsHodlingPublicKeyResponse> => {
  const endpoint = 'api/v0/is-hodling-public-key';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
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
  params: GetFullTikTokURLRequest,
  options?: RequestOptions
): Promise<GetFullTikTokURLResponse> => {
  const endpoint = 'api/v0/get-full-tiktok-url';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////
// Associations endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * https://docs.deso.org/deso-backend/api/associations-endpoints#get-user-association-by-id
 */
export const getUserAssociation = (
  associationId: string,
  options?: RequestOptions
): Promise<AssociationResponse> => {
  const endpoint = `api/v0/user-associations/${associationId}`;
  return api.get(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint
  );
};

/**
 * https://docs.deso.org/deso-backend/api/associations-endpoints#count-user-associations
 */
export const countUserAssociation = (
  params: PartialWithRequiredFields<
    Omit<UserAssociationQuery, 'AssociationValues'>,
    'AssociationType' | 'AssociationValue'
  >,
  options?: RequestOptions
): Promise<AssociationsCountResponse> => {
  const endpoint = 'api/v0/user-associations/count';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/associations-endpoints#count-user-associations-by-multiple-values
 */
export const countUserAssociations = (
  params: PartialWithRequiredFields<
    Omit<UserAssociationQuery, 'AssociationValue'>,
    'AssociationType' | 'AssociationValues'
  >,
  options?: RequestOptions
): Promise<AssociationCountsResponse> => {
  const endpoint = 'api/v0/user-associations/counts';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/associations-endpoints#query-for-user-associations
 */
export const getUserAssociations = (
  params: Partial<UserAssociationQuery> = {},
  options?: RequestOptions
): Promise<UserAssociationsResponse> => {
  const endpoint = 'api/v0/user-associations/query';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/associations-endpoints#get-post-association-by-id
 */
export const getPostAssociation = (
  associationId: string,
  options?: RequestOptions
): Promise<AssociationResponse> => {
  const endpoint = `api/v0/post-associations/${associationId}`;
  return api.get(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint
  );
};

/**
 * https://docs.deso.org/deso-backend/api/associations-endpoints#count-post-associations
 */
export const countPostAssociation = (
  params: PartialWithRequiredFields<
    Omit<PostAssociationQuery, 'AssociationValues'>,
    'AssociationType' | 'AssociationValue'
  >,
  options?: RequestOptions
): Promise<AssociationsCountResponse> => {
  const endpoint = 'api/v0/post-associations/count';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/associations-endpoints#count-post-associations-by-multiple-values
 */
export const countPostAssociations = (
  params: PartialWithRequiredFields<
    Omit<PostAssociationQuery, 'AssociationValue'>,
    'AssociationType' | 'AssociationValues'
  >,
  options?: RequestOptions
): Promise<AssociationCountsResponse> => {
  const endpoint = 'api/v0/post-associations/counts';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};

/**
 * https://docs.deso.org/deso-backend/api/associations-endpoints#query-for-user-associations
 */
export const getPostAssociations = (
  params: Partial<PostAssociationQuery> = {},
  options?: RequestOptions
): Promise<PostAssociationsResponse> => {
  const endpoint = 'api/v0/post-associations/query';
  return api.post(
    options?.nodeURI ? cleanURL(options.nodeURI, endpoint) : endpoint,
    params
  );
};
