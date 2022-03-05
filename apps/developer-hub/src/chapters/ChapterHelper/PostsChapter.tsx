import { Route } from 'react-router-dom';
import { CHAPTERS, TODOTemplate } from './Chapter.models';
import { SubmitPostPage } from '../Write/submit-post/submit-post-page';
import { DEZO_DOG, ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import Deso from '@deso-workspace/deso-sdk';
import {
  GetProfilesRequest,
  SubmitPostRequest,
} from '@deso-workspace/deso-types';
import { PageSection } from './PageSections';
const deso = new Deso();
export const postChapter = {
  GET_PROFILES: {
    parentRoute: ParentRoutes.user,
    title: 'Get Profiles',
    route: '/user/get-profiles',
    params: { PublicKeyBase58Check: DEZO_DOG } as GetProfilesRequest,
    method: deso.user.getProfiles,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/user-endpoints#get-profiles',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.user.getProfiles(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  As it sounds get-single-profile, fetches various data around a
                  single profile. This call is useful if you want common display
                  data for a user.{' '}
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
  SUBMIT_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Submit Post',
    route: '/post/submit-post',
    documentation: [],
    githubSource: [],
    method: deso.posts.submitPost,
    params: {
      UpdaterPublicKeyBase58Check: DEZO_DOG,
      BodyObj: {
        Body: `Checking out the developer hub`,
        VideoURLs: [],
        ImageURLs: [],
      },
    } as unknown as Partial<SubmitPostRequest>,

    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.user.getProfiles(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  As it sounds get-single-profile, fetches various data around a
                  single profile. This call is useful if you want common display
                  data for a user.{' '}
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
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
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
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
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
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
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
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
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
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
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
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
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
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
};
