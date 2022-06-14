import { Route } from 'react-router-dom';
import { ParentRoutes, TYLER } from '../../services/utils';
import Page from '../CustomChapters/Page';
import Deso from 'deso-protocol';
import { PageSection } from './PageSections';
import { CHAPTERS } from './Chapter.models';
import {
  CreatorCoinLimitOperationString,
  DAOCoinLimitOperationString,
  IdentityDeriveParams,
  NFTLimitOperationString,
} from 'deso-protocol-types';
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
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
    params: () => {
      return '3';
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              bind="identity"
              method={{
                methodName: `deso.identity.login(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Trigger a window prompt to let a user login.</div>
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
  IDENTITY_LOGOUT: {
    parentRoute: ParentRoutes.identity,
    title: 'Logout',
    route: '/identity/identity-logout',
    method: deso.identity.logout,
    params: () => {
      return deso.identity.getUserKey();
    },
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
              bind="identity"
              method={{
                methodName: `deso.identity.logout(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Trigger a window prompt to let a user logout.</div>
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
  IDENTITY_JWT: {
    parentRoute: ParentRoutes.identity,
    title: 'JWT',
    route: '/identity/jwt',
    method: deso.identity.getJwt,
    params: () => undefined,
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
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
              bind="identity"
            />
          }
        ></Route>
      );
    },
  },
  IDENTITY_DERIVE: {
    parentRoute: ParentRoutes.identity,
    title: 'Derive',
    route: '/identity/derive',
    method: deso.identity.derive,
    params: () => {
      return {
        publicKey: deso.identity.getUserKey(),
        transactionSpendingLimitResponse: {
          GlobalDESOLimit: 100 * 1e9,
          TransactionCountLimitMap: {
            SUBMIT_POST: 120948,
            FOLLOW: 82943,
          },
          CreatorCoinOperationLimitMap: {
            '': {
              [CreatorCoinLimitOperationString.ANY]: 2183,
            },
            BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
              [CreatorCoinLimitOperationString.BUY]: 123,
              [CreatorCoinLimitOperationString.SELL]: 4123,
              [CreatorCoinLimitOperationString.TRANSFER]: 9198,
            },
          },
          DAOCoinOperationLimitMap: {
            '': {
              [DAOCoinLimitOperationString.MINT]: 1,
            },
          },
          NFTOperationLimitMap: {
            '01855d9ca9c54d797e53df0954204ae7d744c98fe853bc846f5663459ac9cb7b':
              {
                0: {
                  [NFTLimitOperationString.UPDATE]: 10,
                  [NFTLimitOperationString.BID]: 501,
                },
              },
          },
          DAOCoinLimitOrderLimitMap: {
            DESO: {
              BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: 10,
            },
            BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
              DESO: 5,
            },
            [TYLER]: {
              BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: 1092,
            },
          },
        },
      } as Partial<IdentityDeriveParams>;
    },
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/identity/window-api/endpoints#derive',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.identity.derive(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Trigger a window prompt to let a user generate a derived key.
                </div>
              )}
              demo={true}
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
