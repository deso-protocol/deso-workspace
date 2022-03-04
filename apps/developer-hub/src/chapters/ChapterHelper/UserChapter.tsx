import { Route } from 'react-router-dom';
import { CHAPTERS, TODOTemplate } from './Chapter.models';
import { Page } from '../Read/Page';
import { PageSection } from './PageSections';
import { DEZO_DOG, ParentRoutes } from '../../services/utils';
import Deso from '@deso-workspace/deso-sdk';
import { GetUsersStatelessRequest } from '@deso-workspace/deso-types';
const deso = new Deso();
// deso.user.getSingleProfile;
// deso.user.getSingleProfilePicture;
export const userChapter = {
  GET_USERS_STATELESS: {
    parentRoute: ParentRoutes.user,
    title: 'Get Users Stateless',
    route: '/user/get-users-stateless',
    method: 'get-users-stateless',
    params: {
      PublicKeysBase58Check: [DEZO_DOG],
    } as GetUsersStatelessRequest,
    documentation: [
      'https://docs.deso.org/backend/blockchain-data/api/user-endpoints#get-users-stateless',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Read/get-users-stateless/GetUserStateless.service.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.user.getUserStateless(${JSON.stringify(
                  this.params,
                  null,
                  2
                )});`,
                params: {
                  PublicKeysBase58Check: [DEZO_DOG],
                } as GetUsersStatelessRequest,

                method: deso.user.getUserStateless,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  get-users-stateless will query information on an existing user
                  or users.
                </div>
              )}
              requestText="Then we assembled our request object where PublicKeysBased58Check is an array of users that we want to query. SkipForLeaderboard is set to false which returns profile info only"
              responseText=""
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={'getUserStateless'}
            />
          }
        ></Route>
      );
    },
  },
  GET_SINGLE_PROFILE: {
    parentRoute: ParentRoutes.user,
    title: 'Get Single Profile',
    route: '/get-single-profile',
    method: 'deso.user.getSingleProfile',
    documentation: [
      'https://docs.deso.org/backend/blockchain-data/api/user-endpoints#get-single-profile',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Read/get-single-profile/GetSingleProfile.service.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              requestText="Then we Assembled our request object. PublicKeyBase58Check is the public key of the user you're requesting."
              responseText=""
              pretext={PageSection(
                this.title,
                <div>
                  As it sounds get-single-profile, fetches various data around a
                  single profile. This call is useful if you want common display
                  data for a user.{' '}
                </div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={'getSingleProfile'}
            />
          }
        ></Route>
      );
    },
  },
  GET_PROFILES: {
    parentRoute: ParentRoutes.user,
    title: 'Get Profiles',
    route: '/user/get-profiles',
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

  GET_SINGLE_PROFILE_PICTURE: {
    parentRoute: ParentRoutes.user,
    title: 'Get Single Profile Picture',
    route: '/user/get_single_profile_picture',
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

  GET_USER_METADATA: {
    parentRoute: ParentRoutes.user,
    title: 'Get User Metadata',
    route: '/user/get_user_metadata',
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
  DELETE_PII: {
    parentRoute: ParentRoutes.user,
    title: 'Delete Pii',
    route: '/user/delete_pii',
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

  BLOCK_PUBLIC_KEY: {
    parentRoute: ParentRoutes.user,
    title: 'Block Public Key',
    route: '/user/block-public-key',
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
  GET_USER_DERIVED_KEYS: {
    parentRoute: ParentRoutes.user,
    title: 'Get User Derived Keys',
    route: '/user/get_user_derived_keys',
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
  DELETE_IDENTITIES: {
    parentRoute: ParentRoutes.user,
    title: 'Delete Identities',
    route: '/user/delete_identities',
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
