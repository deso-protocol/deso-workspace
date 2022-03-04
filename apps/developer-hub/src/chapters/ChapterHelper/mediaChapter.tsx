import { TODOTemplate } from './Chapter.models';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';

export const mediaChapter = {
  UPLOAD_IMAGE: {
    parentRoute: ParentRoutes.media,
    title: 'Upload Image',
    route: '/media/upload_image',
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
  UPLOAD_VIDEO: {
    parentRoute: ParentRoutes.media,
    title: 'Upload Video',
    route: '/media/upload_video',
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
  GET_VIDEO_STATUS: {
    parentRoute: ParentRoutes.media,
    title: 'Get Video Status',
    route: '/media/get_video_status',
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
  GET_FULL_TIKTOK_URL: {
    parentRoute: ParentRoutes.media,
    title: 'Get Full Tiktok Url',
    route: '/media/get_full_tiktok_url',
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
