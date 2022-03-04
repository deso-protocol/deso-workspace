import { Route } from 'react-router-dom';
import { TODOTemplate } from './Chapter.models';
import { ParentRoutes } from '../../services/utils';

export const metaDataChapter = {
  HEALTH_CHECK: {
    parentRoute: ParentRoutes.metaData,
    title: 'Health Check',
    route: '/meta-data/health-check',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate />}
        ></Route>
      );
    },
  },
  GET_EXCHANGE_RATE: {
    parentRoute: ParentRoutes.metaData,
    title: 'Get Exchange Rate',
    route: '/meta-data/get-exchange_rate',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate />}
        ></Route>
      );
    },
  },
  GET_APP_STATE: {
    parentRoute: ParentRoutes.metaData,
    title: 'Get App State',
    route: '/meta-data/get-app-state',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate />}
        ></Route>
      );
    },
  },
};
