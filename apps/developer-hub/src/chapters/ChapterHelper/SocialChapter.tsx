import Deso from '@deso-workspace/deso-sdk';
import {
  CreateFollowTxnStatelessRequest,
  GetFollowsStatelessRequest,
  GetHodlersForPublicKeyRequest,
  GetMessagesStatelessRequest,
  IsFollowingPublicKeyRequest,
  IsHodlingPublicKeyRequest,
} from '@deso-workspace/deso-types';
import { Route } from 'react-router-dom';
import { DEZO_DOG, ParentRoutes, TYLER } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS, TODOTemplate } from './Chapter.models';
import { CommonPageSectionTitles, PageSection } from './PageSections';

const deso = new Deso();
export const socialChapter = {
  GET_FOLLOWS_STATELESS: {
    parentRoute: ParentRoutes.social,
    title: 'Get Follows Stateless',
    route: '/social/get-follows-stateless',
    params: {
      PublicKeyBase58Check: DEZO_DOG,
      NumToFetch: 20,
    } as GetFollowsStatelessRequest,
    method: deso.social.getFollowsStateless,
    documentation: [
      'https://docs.deso.org/backend/blockchain-data/api/social-endpoints#get-follows-stateless',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Read/get-follows-stateless/GetFollowsStateless.service.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.posts.getFollowsStateless(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>
                  Similar to the get-users-stateless, but Instead it will return
                  an array of followers for a specific account.{' '}
                </div>
              )}
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  GET_MESSAGE_STATELESS: {
    parentRoute: ParentRoutes.social,
    title: 'Get Message Stateless',
    route: '/identity/get-message-stateless',
    documentation: [
      'https://docs.deso.org/identity/iframe-api/endpoints#decrypt',
    ],
    githubSource: [],
    params: {
      NumToFetch: 25,
      PublicKeyBase58Check: DEZO_DOG,
      FetchAfterPublicKeyBase58Check: '',
      HoldersOnly: false,
      FollowersOnly: false,
      FollowingOnly: false,
      HoldingsOnly: false,
      SortAlgorithm: 'time',
    } as GetMessagesStatelessRequest,
    method: deso.social.getMessagesStateless,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.getMessagesStateless(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>
                  Similar to the get-users-stateless, but Instead it will return
                  an array of followers for a specific account.{' '}
                </div>
              )}
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  CREATE_FOLLOW_TRANSACTION: {
    parentRoute: ParentRoutes.social,
    title: 'Create Follow Transaction',
    route: '/write/create-follow-transaction',
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/social-transactions-api#create-follow-txn-stateless',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Write/create-follow-txn-stateless/create-follow-txn-stateless.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/ChapterHelper/BaseUri.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/services/utils.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/sign-transaction/IdentitySubmitTransaction.service.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Interfaces/User.tsx',
    ],
    params: {
      IsUnfollow: true,
      FollowedPublicKeyBase58Check: TYLER,
      FollowerPublicKeyBase58Check: DEZO_DOG,
    } as CreateFollowTxnStatelessRequest,
    method: deso.social.createFollowTxnStateless,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.createFollowTxnStateless(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>Follow or unfollow a specific user</div>
              )}
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  GET_HODLERS_FOR_PUBLIC_KEY: {
    parentRoute: ParentRoutes.social,
    title: 'Get Hodlers For Public Key',
    route: '/user/get-hodlers-for-public-key',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    params: {
      NumToFetch: 20,
      PublicKeyBase58Check: TYLER,
    } as GetHodlersForPublicKeyRequest,
    method: deso.social.getHodlersForPublicKey,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.getHodlersForPublicKey(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div></div>
              )}
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_DIAMONDS_FOR_PUBLIC_KEY: {
    parentRoute: ParentRoutes.social,
    title: 'Get Diamonds For Public Key',
    route: '/user/get_diamonds_for_public_key',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    params: {
      NumToFetch: 20,
      PublicKeyBase58Check: TYLER,
    } as GetHodlersForPublicKeyRequest,
    method: deso.social.getDiamondsForPublicKey,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.getDiamondsForPublicKey(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div></div>
              )}
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  IS_FOLLOWING_PUBLIC_KEY: {
    parentRoute: ParentRoutes.social,
    title: 'Is Following Public Key',
    route: '/social/is-following-public-key',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    params: {
      PublicKeyBase58Check: TYLER,
      IsFollowingPublicKeyBase58Check: DEZO_DOG,
    } as IsFollowingPublicKeyRequest,
    method: deso.social.isFollowingPublicKey,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.isFollowingPublicKey(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>
                  Similar to the get-users-stateless, but Instead it will return
                  an array of followers for a specific account.{' '}
                </div>
              )}
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  IS_HODLING_PUBLIC_KEY: {
    parentRoute: ParentRoutes.social,
    title: 'Is Hodling Public Key',
    route: '/social/is_hodling_public_key',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    params: {
      PublicKeyBase58Check: TYLER,
      IsHodlingPublicKeyBase58Check: DEZO_DOG,
      IsDAOCoin: false,
    } as IsHodlingPublicKeyRequest,
    method: deso.social.isHodlingPublicKey,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.isHodlingPublicKey,(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>
                  Similar to the get-users-stateless, but Instead it will return
                  an array of followers for a specific account.{' '}
                </div>
              )}
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
