import { Route } from 'react-router-dom';
import { IdentityLoginPage } from '../Identity/identity-login/IdentitiyLoginPage';
import { IdentityLogoutPage } from '../Identity/identity-logout/IdentityLogoutPage';
import { CHAPTERS } from './Chapter.models';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import Deso from '@deso-workspace/deso-sdk';
import { PageSection } from './PageSections';
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
    params: {},
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
                <div>Will query information on an existing user or users.</div>
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
    params: { accessLevel: 3 },
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
                <div>Will query information on an existing user or users.</div>
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
