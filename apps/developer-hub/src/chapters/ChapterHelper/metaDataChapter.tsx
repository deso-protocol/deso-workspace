import { Route } from 'react-router-dom';
import { CHAPTERS } from './Chapter.models';
import { DEZO_DOG, ParentRoutes } from '../../services/utils';
import Deso from 'deso-protocol';
import { GetAppStateRequest } from 'deso-protocol-types';
import { Page } from '../Read/Page';
import { PageSection } from './PageSections';
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export const metaDataChapter = {
  HEALTH_CHECK: {
    parentRoute: ParentRoutes.metaData,
    title: 'Health Check',
    route: '/meta-data/health-check',
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/backend-api#health-check',
    ],
    githubSource: [],
    method: deso.metaData.healthCheck,
    params: () => {
      return {};
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.metaData.healthCheck()',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Check if your DeSo node is synced</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_EXCHANGE_RATE: {
    parentRoute: ParentRoutes.metaData,
    title: 'Get Exchange Rate',
    route: '/meta-data/get-exchange-rate',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/backend-api#get-exchange-rate',
    ],
    method: deso.metaData.getExchangeRate,
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
      } as GetAppStateRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.nft.getExchangeRate()',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get DeSo exchange rate, total amount of nanos sold, and
                  Bitcoin exchange rate.
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
  GET_APP_STATE: {
    parentRoute: ParentRoutes.metaData,
    title: 'Get App State',
    route: '/meta-data/get-app-state',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/backend-api#get-app-state',
    ],
    method: deso.metaData.getAppState,
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
      } as GetAppStateRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get state of DeSo App, such as cost of profile creation and
                  diamond level map
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
};
