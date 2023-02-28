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
  GetBulkAccessGroupEntriesRequest,
  GetBulkAccessGroupEntriesResponse,
  GetDiamondsForPostRequest,
  GetDiamondsForPostResponse,
  GetExchangeRateResponse,
  GetLikesForPostRequest,
  GetLikesForPostResponse,
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
  RegisterMessagingGroupKeyRequest,
  RegisterMessagingGroupKeyResponse,
} from 'deso-protocol-types';
import { api } from './api';

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
// Exchange Rate Endpoints
////////////////////////////////////////////////////////////////////////////////////////////////
export const getExchangeRates = (): Promise<GetExchangeRateResponse> => {
  return api.get('api/v0/get-exchange-rate');
};
