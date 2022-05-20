import Deso from 'deso-protocol';
import {
  CreateFollowTxnStatelessRequest,
  CreateLikeStatelessRequest,
  GetFollowsStatelessRequest,
  GetHodlersForPublicKeyRequest,
  GetMessagesStatelessRequest,
  IsFollowingPublicKeyRequest,
  IsHodlingPublicKeyRequest,
  SendDiamondsRequest,
  SendMessageStatelessRequest,
  UpdateProfileRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import {
  DEZO_DOG,
  DOGS_LOVE_DIAMONDS_POST,
  ParentRoutes,
  TYLER,
} from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { CommonPageSectionTitles, PageSection } from './PageSections';
const deso = new Deso();
export const socialChapter = {
  GET_FOLLOWS_STATELESS: {
    parentRoute: ParentRoutes.social,
    title: 'Get Follows Stateless',
    route: '/social/get-follows-stateless',
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
        NumToFetch: 20,
      } as GetFollowsStatelessRequest;
    },
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
                methodName: `deso.social.getFollowsStateless(request)`,
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
              demo={true}
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
    params: () => {
      return {
        NumToFetch: 25,
        PublicKeyBase58Check: localStorage.getItem('login_key'),
        FetchAfterPublicKeyBase58Check: '',
        HoldersOnly: false,
        FollowersOnly: false,
        FollowingOnly: false,
        HoldingsOnly: false,
        SortAlgorithm: 'time',
      } as GetMessagesStatelessRequest;
    },
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
                <div>Get private messages for a user account.</div>
              )}
              demo={true}
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
    params: () => {
      return {
        IsUnfollow: true,
        FollowedPublicKeyBase58Check: localStorage.getItem('login_key'),
        FollowerPublicKeyBase58Check: TYLER,
      } as CreateFollowTxnStatelessRequest;
    },
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
                <div>Follow or unfollow a specific user.</div>
              )}
              demo={true}
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
    params: () => {
      return {
        NumToFetch: 20,
        PublicKeyBase58Check: TYLER,
      } as GetHodlersForPublicKeyRequest;
    },
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
                <div>
                  Get users who are or who have had held a certain creator coin.
                </div>
              )}
              demo={true}
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
      'Get a list of objects representing all the diamonds a user has given or received.',
    ],
    params: () => {
      return {
        NumToFetch: 20,
        PublicKeyBase58Check: TYLER,
      } as GetHodlersForPublicKeyRequest;
    },
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
                <div>
                  Get a list of objects representing all the diamonds a user has
                  given or received.
                </div>
              )}
              demo={true}
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
    params: () => {
      return {
        PublicKeyBase58Check: TYLER,
        IsFollowingPublicKeyBase58Check: DEZO_DOG,
      } as IsFollowingPublicKeyRequest;
    },
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
                <div> Determines if a user is following another.</div>
              )}
              demo={true}
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
    params: () => {
      return {
        PublicKeyBase58Check: TYLER,
        IsHodlingPublicKeyBase58Check: DEZO_DOG,
        IsDAOCoin: false,
      } as IsHodlingPublicKeyRequest;
    },
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
                  Check if the user holds the creator coin of a public key. If
                  user is holding some amount of creator coin, we return the
                  BalanceEntryResponse representing how much the user holds.
                </div>
              )}
              demo={true}
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
    params: () => {
      return {
        RecipientPublicKeyBase58Check: DEZO_DOG,
        SenderPublicKeyBase58Check: localStorage.getItem('login_key'),
        MessageText: 'Ogres are like onions.',
      } as SendMessageStatelessRequest;
    },
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
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  UPDATE_PROFILE: {
    parentRoute: ParentRoutes.social,
    title: 'Update Profile',
    route: '/social/update-profile',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/social-transactions-api',
    ],
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: localStorage.getItem('login_key'),
        MinFeeRateNanosPerKB: 1000,
        NewDescription: 'WOOF WOOF',
      } as UpdateProfileRequest;
    },
    method: deso.social.updateProfile,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.updateProfile(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>Modify an accounts profile data</div>
              )}
              demo={false}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  SEND_DIAMONDS: {
    parentRoute: ParentRoutes.social,
    title: 'Send Diamonds',
    route: '/social/send-diamond',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/social-transactions-api#send-diamonds',
    ],
    params: () => {
      return {
        ReceiverPublicKeyBase58Check: DEZO_DOG,
        SenderPublicKeyBase58Check: localStorage.getItem('login_key'),
        DiamondPostHashHex: DOGS_LOVE_DIAMONDS_POST,
        DiamondLevel: 1,
        MinFeeRateNanosPerKB: 1000,
        InTutorial: false,
      } as SendDiamondsRequest;
    },
    method: deso.social.sendDiamonds,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.sendDiamonds(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>diamond a post.</div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  CREATE_LIKE_STATELESS: {
    parentRoute: ParentRoutes.social,
    title: 'Create Like Stateless',
    route: '/social/like',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/social-transactions-api#like',
    ],
    params: () => {
      return {
        ReaderPublicKeyBase58Check: localStorage.getItem('login_key'),
        LikedPostHashHex:
          'f7ea512c2435f233c948f761f7596d95190ed3c3c908fc21609535eca33e3a14',
        MinFeeRateNanosPerKB: 1000,
        IsUnlike: false,
      } as CreateLikeStatelessRequest;
    },
    method: deso.social.createLikeStateless,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.social.createLikeStateless(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>Like a post.</div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
