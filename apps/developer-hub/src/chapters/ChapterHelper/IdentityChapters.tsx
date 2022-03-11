import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import Deso from '@deso-workspace/deso-sdk';
import { PageSection } from './PageSections';
import { CHAPTERS } from './Chapter.models';
const deso = new Deso();
export const identityChapter = {
  IDENTITY_LOGIN: {
    parentRoute: ParentRoutes.identity,
    title: 'Login',
    route: '/identity/identity-login',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/identity/window-api/endpoints#log-in',
    ],
    method: deso.identity.login,
    params: '3',
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.identity.login(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Trigger a window prompt to let a user login.</div>
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
  IDENTITY_LOGOUT: {
    parentRoute: ParentRoutes.identity,
    title: 'Logout',
    route: '/identity/identity-logout',
    method: deso.identity.logout,
    params: {},
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/identity/window-api/endpoints#logout',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.identity.logout(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Trigger a window prompt to let a user logout.</div>
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
  IDENTITY_JWT: {
    parentRoute: ParentRoutes.identity,
    title: 'JWT',
    route: '/identity/jwt',
    method: deso.identity.getJwt,
    params: {},
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/identity/iframe-api/endpoints#jwt',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.identity.getJwt(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Trigger a window prompt to let a user logout.</div>
              )}
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
              bind="identity"
            />
          }
        ></Route>
      );
    },
  },
};
