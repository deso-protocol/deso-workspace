import { Route } from 'react-router-dom';
import { CHAPTERS, TODOTemplate } from './Chapter.models';
import { SubmitPostPage } from '../Write/submit-post/submit-post-page';
import { ParentRoutes } from '../../services/utils';
export const postChapter = {
  SUBMIT_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Submit Post',
    route: '/post/submit-post',
    documentation: [],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Interfaces/Transaction.interface.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/services/utils.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/ChapterHelper/BaseUri.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/sign-transaction/IdentitySubmitTransaction.service.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Interfaces/User.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <SubmitPostPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },

  GET_POSTS_STATELESS: {
    parentRoute: ParentRoutes.posts,
    title: 'Get posts Stateless',
    route: '/post/get_posts_stateless',
    documentation: [],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <SubmitPostPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },
  GET_SINGLE_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Single Post',
    route: '/post/get_single_post',
    documentation: [],
    githubSource: [],
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
  GET_HOT_FEED: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Hot Feed',
    route: '/post/get_hot_feed',
    documentation: [],
    githubSource: [],
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
  GET_DIAMONDED_POSTS: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Diamonded Posts',
    route: '/post/get_diamonded_post',
    documentation: [],
    githubSource: [],
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
  GET_LIKES_FOR_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Likes For Post',
    route: '/post/get_likes_for_post',
    documentation: [],
    githubSource: [],
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
  GET_DIAMONDS_FOR_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Diamonds For Posts',
    route: '/post/get-diamonds-for-post',
    documentation: [],
    githubSource: [],
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
  GET_REPOSTS_FOR_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Posts Stateless',
    route: '/post/get_posts_stateless',
    documentation: [],
    githubSource: [],
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
  GET_QUOTE_REPOSTS_FOR_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Posts Stateless',
    route: '/post/get_posts_stateless',
    documentation: [],
    githubSource: [],
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
