import {
  DEZO_DOG,
  ParentRoutes,
  SAMPLE_POST,
  TYLER,
} from '../../services/utils';
import Deso from 'deso-protocol';
import {
  AdminGetAllUserGlobalMetadataRequest,
  AdminGetMempoolStatsResponse,
  AdminGetUsernameVerificationAuditLogsRequest,
  AdminGetVerifiedUsersResponse,
  AdminGrantVerificationBadgeRequest,
  AdminPinPostRequest,
  AdminRemoveNilPostsRequest,
  AdminRemoveVerificationBadgeRequest,
  AdminUpdateGlobalFeedRequest,
  GetGlobalParamsRequest,
  GetUserGlobalMetadataRequest,
  NodeControlRequest,
  SwapIdentityRequest,
  UpdateGlobalParamsRequest,
  UpdateUserGlobalMetadataRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import Page from '../Read/Page';
import { PageSection } from './PageSections';
import { CHAPTERS } from './Chapter.models';
const deso = new Deso();
export const adminChapter = {
  NODE_CONTROL: {
    parentRoute: ParentRoutes.admin,
    title: 'Node Control',
    route: '/admin/node-control',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints#node-control',
    ],
    method: deso.admin.nodeControl,
    params: () => {
      return {
        MinerPublicKeys: `${DEZO_DOG},${TYLER}`,
        OperationType: 'connect_deso_node',
        Address: 'https://node.deso.org',
      } as NodeControlRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.nodeControl(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Connect a node, disconnect a node, get info on a node, or
                  update miners.{' '}
                </div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_MEMPOOL_STATS: {
    parentRoute: ParentRoutes.admin,
    title: 'Get Mempool Stats',
    route: '/admin/get-mempool-stats',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.getMemPoolStats,
    params: () => {
      return {
        TransactionSummaryStats: {
          [deso.identity.getUserKey() as string]: { Count: 1, TotalBytes: 1 },
        },
      } as AdminGetMempoolStatsResponse;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.adminGetMemPoolStats(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Gets Mempool data.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_GLOBAL_PARAMS: {
    parentRoute: ParentRoutes.admin,
    title: 'Get Global Params',
    route: '/admin/get-global-params',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.getGlobalParams,
    params: () => {
      return {} as GetGlobalParamsRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.getGlobalParams(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get global parameters from node.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  UPDATE_GLOBAL_PARAMS: {
    parentRoute: ParentRoutes.admin,
    title: 'Update Global Params',
    route: '/admin/update-global-params',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.updateGlobalParams,
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: deso.identity.getUserKey() as string,
        USDCentsPerBitcoin: 1,
        CreateProfileFeeNanos: 1,
        MinFeeRateNanosPerKB: 1,
        MaxCopiesPerNFT: 1,
        CreateNFTFeeNanos: 1,
        MinimumNetworkFeeNanosPerKB: 1,
      } as UpdateGlobalParamsRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.updateGlobalParams(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Set global parameters from node.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  SWAP_IDENTITY: {
    parentRoute: ParentRoutes.admin,
    title: 'Swap Identity',
    route: '/admin/swap-identity',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.swapIdentity,
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: deso.identity.getUserKey(),
        FromUsernameOrPublicKeyBase58Check: DEZO_DOG,
        ToUsernameOrPublicKeyBase58Check: deso.identity.getUserKey(),
        MinFeeRateNanosPerKB: 1,
      } as SwapIdentityRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.swapIdentity(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Swaps Identity.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  UPDATE_USER_GLOBAL_METADATA: {
    parentRoute: ParentRoutes.admin,
    title: 'Update User Global Metadata',
    route: '/admin/update-user-global-metadata',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.updateUserGlobalMetadata,
    params: async () => {
      const JWT = await deso.identity.getJwt();
      return {
        UserPublicKeyBase58Check: deso.identity.getUserKey(),
        JWT,
        Email: 'dezo_dog@woofmail.com',
        MessageReadStateUpdatesByContact: {
          [deso.identity.getUserKey() as string]: 1,
        },
      } as UpdateUserGlobalMetadataRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.updateUserGlobalMetadata(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Update Global Metadata.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_ALL_USER_GLOBAL_METADATA: {
    parentRoute: ParentRoutes.admin,
    title: 'Get All User Global Metadata',
    route: '/admin/get-all-user-global-metadata',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.getAllUserGlobalMetadata,
    params: () => {
      return { NumToFetch: 20 } as AdminGetAllUserGlobalMetadataRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.getAllUserGlobalMetadata(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Gets all user metadata up to a provided amount.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_USER_GLOBAL_METADATA: {
    parentRoute: ParentRoutes.admin,
    title: 'Get User Global Metadata',
    route: '/admin/get-user-global-metadata',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.getUserGlobalMetadata,
    params: async () => {
      const JWT: string = await deso.identity.getJwt();
      return {
        UserPublicKeyBase58Check: deso.identity.getUserKey() as string,
        JWT,
      } as GetUserGlobalMetadataRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.getUserGlobalMetadata(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Gets user global metadata.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GRANT_VERIFICATION_BADGE: {
    parentRoute: ParentRoutes.admin,
    title: 'Grant Verification Badge',
    route: '/admin/grant-verification-badge',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.grantVerificationBadgeRequest,
    params: () => {
      return {
        UsernameToVerify: 'DeZoDog',
        AdminPublicKey: deso.identity.getUserKey(),
      } as AdminGrantVerificationBadgeRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.grantVerificationBadgeRequest(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Grants verification to an account.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  REMOVE_VERIFICATION_BADGE: {
    parentRoute: ParentRoutes.admin,
    title: 'Remove verification Badge',
    route: '/admin/remove-verification-badge',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.removeVerificationBadge,
    params: () => {
      return {
        UsernameForWhomToRemoveVerification: 'DiamondHands',
        AdminPublicKey: deso.identity.getUserKey(),
      } as AdminRemoveVerificationBadgeRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.removeVerificationBadge(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Removes verification to an account.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_VERIFIED_USERS: {
    parentRoute: ParentRoutes.admin,
    title: 'Get Verified Users',
    route: '/admin/get-verified-users',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.getVerifiedUsers,
    params: () => {
      return undefined;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.getVerifiedUsers(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Gets verified users.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_USERNAME_VERIFICATION_AUDIT_LOGS: {
    parentRoute: ParentRoutes.admin,
    title: 'Get Username Verification Audit Logs',
    route: '/admin/get-username-verification-audit-logs',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.getUsernameVerificationAuditLogs,
    params: () => {
      return {
        Username: deso.identity.getUserKey(),
      } as AdminGetUsernameVerificationAuditLogsRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName:
                  'deso.admin.getUsernameVerificationAuditLogs(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Gets the verification audit logs for a user.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  UPDATE_GLOBAL_FEED: {
    parentRoute: ParentRoutes.admin,
    title: 'Update Global Feed',
    route: '/admin/update-global-feed',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.updateGlobalFeed,
    params: () => {
      return {
        PostHashHex: SAMPLE_POST,
        RemoveFromGlobalFeed: false,
      } as AdminUpdateGlobalFeedRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.updateGlobalFeed(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Update or remove posts in the feed.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  PIN_POST: {
    parentRoute: ParentRoutes.admin,
    title: 'Pin Post',
    route: '/admin/pin-post',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.pinPost,
    params: () => {
      return {
        PostHashHex: SAMPLE_POST,
        UnpinPost: true,
      } as AdminPinPostRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.pinPost(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Toggle pinning a post. </div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  REMOVE_NIL_POSTS: {
    parentRoute: ParentRoutes.admin,
    title: 'Remove Nil Posts',
    route: '/admin/remove-nil-posts',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/admin-endpoints',
    ],
    method: deso.admin.removeNilPosts,
    params: () => {
      return { NumPostsToSearch: 20 } as AdminRemoveNilPostsRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.admin.removeNilPosts(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Remove Nil Posts. </div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
