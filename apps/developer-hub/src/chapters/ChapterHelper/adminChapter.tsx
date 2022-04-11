import { DEZO_DOG, ParentRoutes, TYLER } from '../../services/utils';
import Deso from 'deso-protocol';
import {
  AdminGetMempoolStatsResponse,
  NodeControlRequest,
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.admin.getMemPoolStats,
    params: () => {
      return {} as AdminGetMempoolStatsResponse;
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
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
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
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    method: deso.nft.burnNft,
    params: () => {
      return {} as NodeControlRequest;
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
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
