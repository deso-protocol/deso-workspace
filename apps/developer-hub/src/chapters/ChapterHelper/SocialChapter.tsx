import Deso from '@deso-workspace/deso-sdk';
import {
  CreateFollowTxnStatelessRequest,
  GetFollowsStatelessRequest,
  GetHodlersForPublicKeyRequest,
  GetMessagesStatelessRequest,
  IsFollowingPublicKeyRequest,
  IsHodlingPublicKeyRequest,
  SendMessageStatelessRequest,
} from '@deso-workspace/deso-types';
import { Route } from 'react-router-dom';
import { DEZO_DOG, ParentRoutes, TYLER } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
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
    githubSource: [],
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
    route: '/social/get-message-stateless',
    documentation: [],
    githubSource: [],
    params: {
      NumToFetch: 25,
      PublicKeyBase58Check: localStorage.getItem('login_key'),
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
    route: '/social/create-follow-transaction',
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/social-transactions-api#create-follow-txn-stateless',
    ],
    githubSource: [],
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
    route: '/social/get-hodlers-for-public-key',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/social-endpoints#get-hodlers-for-public-key',
    ],
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
    route: '/social/get_diamonds_for_public_key',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/social-endpoints#get-diamonds-for-public-key',
    ],
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
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/social-endpoints#is-following-public-key',
    ],
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
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/social-endpoints#is-hodling-public-key',
    ],
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
                methodName: `deso.social.isHodlingPublicKey(request)`,
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
  SEND_MESSAGE: {
    parentRoute: ParentRoutes.social,
    title: 'Send Message',
    route: '/social/send-message-stateless',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/social-transactions-api#send-message',
    ],
    params: {
      RecipientPublicKeyBase58Check: TYLER,
      SenderPublicKeyBase58Check: localStorage.getItem('login_key'),
      MessageText: 'Ogres are like onions.',
    } as SendMessageStatelessRequest,
    method: deso.social.sendMessage,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.sendMessage(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>Send a message from your account to another</div>
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
