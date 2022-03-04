import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import { TODOTemplate } from './Chapter.models';

export const notificationChapter = {
  GET_NOTIFICATIONS: {
    parentRoute: ParentRoutes.notification,
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
  GET_UNREAD_NOTIFICATION_COUNT: {
    parentRoute: ParentRoutes.notification,
    title: 'Get Unread Notification Count',
    route: '/media/get_unread_notification_count',
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
  SET_NOTIFICATION_METADATA: {
    parentRoute: ParentRoutes.notification,
    title: 'Set Notification Metadata',
    route: '/media/set_notification_metadata',
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
