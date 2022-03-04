import { Route } from 'react-router-dom';
import { CHAPTERS, TODOTemplate } from './Chapter.models';
import { ParentRoutes } from '../../services/utils';
export const minerChapter = {
  GET_BLOCK_TEMPLATE: {
    parentRoute: ParentRoutes.miner,
    title: 'Get Block Template',
    route: '/miner/get_block_template',
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
  SUBMIT_BLOCK: {
    parentRoute: ParentRoutes.miner,
    title: 'Submit Block',
    route: '/miner/submit_block',
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
