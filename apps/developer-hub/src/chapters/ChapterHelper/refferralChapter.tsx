import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import { CHAPTERS, TODOTemplate } from './Chapter.models';

export const referralChapter = {
  GET_REFERRAL_INFO_FOR_USER: {
    parentRoute: ParentRoutes.referral,
    title: 'Get Referral Info For User',
    route: '/referral/get_referral_info_for_user',
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
  GET_REFERRAL_INFO_FOR_REFERRAL_HASH: {
    parentRoute: ParentRoutes.referral,
    title: 'Get Referral Info For Referral Hash',
    route: '/referral/get_referral_info_for_referral_hash',
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
