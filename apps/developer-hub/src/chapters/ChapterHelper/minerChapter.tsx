import { Route } from 'react-router-dom';
import { TODOTemplate } from './Chapter.models';
import { ParentRoutes } from '../../services/utils';
export const minerChapter = {
  GET_BLOCK_TEMPLATE: {
    parentRoute: ParentRoutes.miner,
    title: 'get_block_template',
    route: '/miner/get_block_template',
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
  SUBMIT_BLOCK: {
    parentRoute: ParentRoutes.miner,
    title: 'submit_block',
    route: '/miner/submit_block',
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
