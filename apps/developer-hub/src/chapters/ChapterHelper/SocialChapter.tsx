import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import { CreateFollowTransactionPage } from '../Write/create-follow-txn-stateless/create-follow-transaction-page';
import { GetMessageStatelessPage } from '../Write/decrypt/DecryptMessagesPage';
import { CHAPTERS, TODOTemplate } from './Chapter.models';
import { CommonPageSectionTitles, PageSection } from './PageSections';

export const socialChapter = {
  GET_FOLLOWS_STATELESS: {
    parentRoute: ParentRoutes.social,
    title: 'Get Follows Stateless',
    route: '/read/get-follows-stateless',
    method: 'get-followers-stateless',
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
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>
                  Similar to the get-users-stateless, but Instead it will return
                  an array of followers for a specific account.{' '}
                </div>
              )}
              requestText="Then we provide PublicKeyBase58Check which tell the endpoint who's followers to query. GetEntriesFollowingUsername returns only followers who are also following the public key(s), numToFetch determines how many followers to return per user."
              responseText=""
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={'getFollowsStateless'}
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
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Write/get-messages-stateless.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-decrypt/IdentityDecryption.service.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <GetMessageStatelessPage
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
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <CreateFollowTransactionPage
              selectedChapter={this}
              chapters={CHAPTERS}
            />
          }
        ></Route>
      );
    },
  },

  GET_HODLERS_FOR_PUBLIC_KEY: {
    parentRoute: ParentRoutes.social,
    title: 'Get Hodlers For Public Key',
    route: '/user/get_hodlers_for_public_key',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
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
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
  IS_FOLLOWING_PUBLIC_KEY: {
    parentRoute: ParentRoutes.social,
    title: 'Is Following Public Key',
    route: '/user/is_following_public_key',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
  IS_HODLING_PUBLIC_KEY: {
    parentRoute: ParentRoutes.social,
    title: 'Is Hodling Public Key',
    route: '/user/is_hodling_public_key',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
};
