import Deso from 'deso-protocol';
import {
  GetNotificationsCountRequest,
  GetNotificationsRequest,
  SetNotificationMetadataRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import { DEZO_DOG, ParentRoutes, TYLER } from '../../services/utils';
import Page from '../CustomChapters/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';
const deso = new Deso();

export const notificationChapter = {
  GET_NOTIFICATIONS: {
    parentRoute: ParentRoutes.notification,
    title: 'Get Notifications',
    route: '/notification/get-notifications',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/notification-endpoints#get-notifications',
    ],
    method: deso.notification.getNotifications,
    params: () => {
      return {
        NumToFetch: 50,
        PublicKeyBase58Check: TYLER,
        FetchStartIndex: 100,
      } as GetNotificationsRequest;
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
                methodName: 'deso.notifications.getNotifications(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Fetches notifications for an account.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_UNREAD_NOTIFICATION_COUNT: {
    parentRoute: ParentRoutes.notification,
    title: 'Get Unread Notification Count',
    route: '/notification/get-unread-notifications-count',
    method: deso.notification.getUnreadNotificationsCount,
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
      } as Partial<GetNotificationsCountRequest>;
    },
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/notification-endpoints#get-unread-notification-count',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.notification.getUnreadNotificationsCount(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get the number of unread notifications.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  SET_NOTIFICATION_METADATA: {
    parentRoute: ParentRoutes.notification,
    title: 'Set Notification Metadata',
    route: '/notification/set-notification-metadata',
    githubSource: [],
    documentation: [
      'http://localhost:4200/#/notification/set-notification-metadata',
    ],
    method: deso.notification.setNotificationMetadata,
    params: () => {
      return {
        PublicKeyBase58Check: localStorage.getItem('login_key'),
      } as Partial<SetNotificationMetadataRequest>;
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
                methodName: `deso.notification.setNotificationMetadata(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Update the number of unread notifications, the last
                  notification seen index, and the last unread notification
                  index.
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
