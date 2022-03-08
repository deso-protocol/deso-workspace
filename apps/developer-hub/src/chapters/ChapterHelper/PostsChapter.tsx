import Deso from '@deso-workspace/deso-sdk';
import {
  GetDiamondsForPostRequest,
  GetLikesForPostRequest,
  GetPostsDiamondedBySenderForReceiverRequest,
  GetPostsStatelessRequest,
  GetQuoteRepostsForPostRequest,
  GetRepostsForPostRequest,
  HotFeedPageRequest,
  SubmitPostRequest,
} from '@deso-workspace/deso-types';
import { Route } from 'react-router-dom';
import {
  DEZO_DOG,
  ParentRoutes,
  RUSSIA,
  SAMPLE_POST,
} from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';

const deso = new Deso();
export const postChapter = {
  SUBMIT_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Submit Post',
    route: '/post/submit-post',
    documentation: [],
    githubSource: [],
    method: deso.posts.submitPost,
    params: {
      UpdaterPublicKeyBase58Check: localStorage.getItem('login_key'),
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
                methodName: `deso.posts.getProfiles(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Submit a post</div>)}
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
    route: '/post/get-posts-stateless',
    method: deso.posts.getPostsStateless,
    params: {} as Partial<GetPostsStatelessRequest>,
    documentation: [],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.posts.getPostsStateless(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Submit a post</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_SINGLE_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Single Post',
    route: '/post/get-single-post',
    method: deso.posts.getSinglePost,
    params: {
      PostHashHex: SAMPLE_POST,
    },
    documentation: [],
    githubSource: [],

    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.posts.getSinglePost(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Get a single Post</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_HOT_FEED: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Hot Feed',
    route: '/post/get_hot_feed',
    documentation: [],
    method: deso.posts.getHotFeed,
    params: { ResponseLimit: 20 } as HotFeedPageRequest,
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.posts.getHotFeed(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Get Hot Feed</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_DIAMONDED_POSTS: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Diamonded Posts',
    route: '/post/get-diamonded-post',

    method: deso.posts.getDiamondedPosts,
    params: {
      NumToFetch: 20,
      SenderPublicKeyBase58Check: DEZO_DOG,
      ReceiverPublicKeyBase58Check: RUSSIA,
    } as GetPostsDiamondedBySenderForReceiverRequest,
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/post-endpoints#get-diamonded-posts',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.posts.getDiamondedPosts(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Get diamonded posts.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_LIKES_FOR_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Likes For Post',
    route: '/post/get_likes_for_post',
    params: {
      Limit: 20,
      Offset: 0,
      PostHashHex: SAMPLE_POST,
    } as GetLikesForPostRequest,
    method: deso.posts.getLikesForPost,
    documentation: [],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.posts.getDiamondedPosts(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Get diamonded posts.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_DIAMONDS_FOR_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Diamonds For Posts',
    route: '/post/get-diamonds-for-post',
    method: deso.posts.getDiamondsForPost,
    params: {
      Limit: 20,
      Offset: 20,
      PostHashHex: SAMPLE_POST,
    } as GetDiamondsForPostRequest,
    documentation: [],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.posts.getDiamondsForPost(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get Profiles and number of diamonds for users who gave
                  diamonds to a given post.
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
  GET_REPOSTS_FOR_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Reposts For Post',
    route: '/post/get-reposts-for-post',
    method: deso.posts.getRepostsForPost,
    params: {
      Limit: 20,
      Offset: 20,
      PostHashHex: SAMPLE_POST,
    } as GetRepostsForPostRequest,
    documentation: [],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.posts.getRepostsForPost(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get Profiles and number of diamonds for users who gave
                  diamonds to a given post.
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
  GET_QUOTE_REPOSTS_FOR_POST: {
    parentRoute: ParentRoutes.posts,
    title: 'Get Quote Reposts FOR POST',
    route: '/post/get-quote-reposts-for-post',
    method: deso.posts.getQuoteRepostsForPost,
    params: {
      Limit: 20,
      Offset: 20,
      PostHashHex: SAMPLE_POST,
    } as GetQuoteRepostsForPostRequest,
    documentation: [],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: `deso.posts.getQuoteRepostsForPost(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get profiles of users who quote reposted a given post and the
                  content of the quote repost.
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
