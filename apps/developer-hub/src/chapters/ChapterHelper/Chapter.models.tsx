/* eslint-disable @typescript-eslint/ban-types */
import { Route } from 'react-router-dom';
import SampleApp from '../../components/layout/SampleApp';
import { ReactElement } from 'react';
import { Link, Link as MaterialLink } from '@mui/material';
import { PageSection } from './PageSections';
import { PageNavigation } from '../../components/layout/PageNavigation';
import { GetAppStatePage } from '../Read/get-app-state/GetAppStatePage';
import { postChapter } from './PostsChapter';
import { userChapter } from './UserChapter';
import { identityChapter } from './IdentityChapters';
import ChapterTemplate from './ChapterTemplate';
import { socialChapter } from './SocialChapter';
import { mediaChapter } from './mediaChapter';
import { notificationChapter } from './notificationChapter';
import { referralChapter } from './refferralChapter';
import { minerChapter } from './minerChapter';
import { adminChapter } from './adminChapter';
import { metaDataChapter } from './metaDataChapter';
import { nftChapter } from './nftChapter';
import { jsonBlock, ParentRoutes } from '../../services/utils';
import DesoDrawer from '../../components/layout/Drawer';
import { PageProps } from '../Read/Page';
export interface TODOProps {
  selectedChapter: any;
  chapters: ChapterNavigation;
}
export const TODOTemplate = ({ selectedChapter, chapters }: TODOProps) => {
  return (
    <div className="mt-[13px]  pb-2 w-full bg-[#fff] min-h-[800px]  rounded-lg flex justify-start">
      <div className="border-r border-[#00000025]">
        <DesoDrawer chapters={CHAPTERS} />
      </div>
      <div className="flex-grow-1 flex justify-around mx-auto w-full max-w-[1500px] ">
        <div></div>
        <div>Coming Soon!</div>
        <div>
          <PageNavigation
            previous={chapters.prev(selectedChapter) as Chapter}
            next={chapters.next(selectedChapter) as Chapter}
          />
        </div>
      </div>
    </div>
  );
};

export const CHAPTERS: Readonly<ChapterNavigation> = {
  ...adminChapter,
  ...identityChapter,
  ...mediaChapter,
  ...metaDataChapter,
  ...minerChapter,
  ...nftChapter,
  ...notificationChapter,
  ...postChapter,
  ...referralChapter,
  ...socialChapter,
  ...userChapter,

  ABOUT: {
    parentRoute: ParentRoutes.landing,
    title: 'Welcome',
    route: '*',
    method: 'N/A',
    documentation: [],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <ChapterTemplate
              tabs={[
                {
                  content: (
                    <>
                      {' '}
                      {PageSection(
                        'Welcome to the DeSo Developer Hub',
                        <div>
                          DeSo developer hub is rich in resources to help you
                          build your DeSo app. Currently the app can be used a
                          reference when implementing the deso sdk into your
                          application. We are also open to community suggestions
                          on what additional functionality could be built which
                          could be anything from an onchain comment threads for
                          common issues (similar to stack overflow), more useful
                          utility methods, etc. If you have any recommendations
                          for improvement or find any bugs, please leave
                          feedback{' '}
                          <Link
                            target="_blank"
                            href="https://github.com/DeSoDog/deso-deep-dive/issues"
                          >
                            here
                          </Link>
                        </div>
                      )}
                      {PageSection(
                        'Download',
                        jsonBlock('npm i deso-sdk deso-types')
                      )}
                    </>
                  ),
                  title: 'Welcome',
                },
              ]}
              navigation={
                <PageNavigation
                  previous={CHAPTERS.prev(this) as Chapter}
                  next={CHAPTERS.next(this) as Chapter}
                />
              }
            />
          }
        ></Route>
      );
    },
  },
  NODE_PAGE: {
    parentRoute: ParentRoutes.node,
    title: 'Node Page',
    route: '/node-page',
    documentation: [''],
    githubSource: ['N/A'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<GetAppStatePage />}
        ></Route>
      );
    },
  },
  SAMPLE_APP: {
    parentRoute: ParentRoutes.none,
    title: 'Sample App',
    route: '/sample-app',
    documentation: [],
    githubSource: ['N/A'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<SampleApp />}
        ></Route>
      );
    },
  },
  documentationToLink: (chapter: Chapter): ReactElement[] => {
    return chapter.documentation.map((doc, i) => {
      return (
        <MaterialLink target={'_blank'} key={i} href={doc}>
          here
        </MaterialLink>
      );
    });
  },

  chaptersToArray: function () {
    const chapterArray: { chapterName: string; chapterContent: Chapter }[] = [];
    for (const [chapterName, chapterContent] of Object.entries(this)) {
      if ('title' in chapterContent) {
        chapterArray.push({
          chapterName,
          chapterContent,
        });
      }
    }

    return chapterArray;
  },
  prev: function (currentChapter: Chapter) {
    const currentChapterIndex = this.chaptersToArray()
      .map((chapter, index) => {
        return { chapter, index };
      })
      .find((chapter) => {
        return chapter.chapter.chapterContent.title === currentChapter.title;
      });
    if (currentChapterIndex) {
      const nextChapter = this.chaptersToArray()[currentChapterIndex.index - 1];
      return nextChapter?.chapterContent ?? null;
    }
    return null;
  },
  next: function (currentChapter: Chapter) {
    const currentChapterIndex = this.chaptersToArray()
      .map((chapter, index) => {
        return { chapter, index };
      })
      .find((chapter) => {
        return chapter.chapter.chapterContent.title === currentChapter.title;
      });
    if (currentChapterIndex) {
      const nextChapter = this.chaptersToArray()[currentChapterIndex.index + 1];
      return nextChapter?.chapterContent ?? null;
    }
    return null;
  },
};

export interface ChapterNavigation {
  // GETTING_STARTED: Chapter;
  ABOUT: Chapter;
  //user
  GET_USERS_STATELESS: Chapter;
  GET_PROFILES: Chapter;
  GET_SINGLE_PROFILE: Chapter;
  GET_SINGLE_PROFILE_PICTURE: Chapter;
  GET_USER_METADATA: Chapter;
  DELETE_PII: Chapter;
  BLOCK_PUBLIC_KEY: Chapter;
  GET_USER_DERIVED_KEYS: Chapter;
  DELETE_IDENTITIES: Chapter;
  // posts
  GET_POSTS_STATELESS: Chapter;
  GET_SINGLE_POST: Chapter;
  GET_HOT_FEED: Chapter;
  GET_DIAMONDED_POSTS: Chapter;
  GET_LIKES_FOR_POST: Chapter;
  GET_DIAMONDS_FOR_POST: Chapter;
  GET_REPOSTS_FOR_POST: Chapter;
  GET_QUOTE_REPOSTS_FOR_POST: Chapter;
  // nft
  GET_NFTS_FOR_USER: Chapter;
  GET_NFT_BIDS_FOR_USER: Chapter;
  GET_NFT_BIDS_FOR_NFT_POST: Chapter;
  GET_NFT_SHOWCASE: Chapter;
  GET_NEXT_NFT_SHOWCASE: Chapter;
  GET_NFT_COLLECTION_SUMMARY: Chapter;
  GET_NFT_ENTRIES_FOR_POST_HASH: Chapter;
  // social
  GET_HODLERS_FOR_PUBLIC_KEY: Chapter;
  GET_DIAMONDS_FOR_PUBLIC_KEY: Chapter;
  GET_FOLLOWS_STATELESS: Chapter;
  IS_FOLLOWING_PUBLIC_KEY: Chapter;
  IS_HODLING_PUBLIC_KEY: Chapter;
  //_media
  UPLOAD_IMAGE: Chapter;
  UPLOAD_VIDEO: Chapter;
  GET_VIDEO_STATUS: Chapter;
  GET_FULL_TIKTOK_URL: Chapter;
  //_notifications
  GET_NOTIFICATIONS: Chapter;
  GET_UNREAD_NOTIFICATION_COUNT: Chapter;
  SET_NOTIFICATION_METADATA: Chapter;
  // Referral
  GET_REFERRAL_INFO_FOR_USER: Chapter;
  GET_REFERRAL_INFO_FOR_REFERRAL_HASH: Chapter;
  // Miner
  GET_BLOCK_TEMPLATE: Chapter;
  SUBMIT_BLOCK: Chapter;
  // Admin
  NODE_CONTROL: Chapter;
  REPROCESS_BITCOIN_BLOCK: Chapter;
  GET_MEMPOOL_STATS: Chapter;
  EVICT_UNMINED_BITCOIN_TXNS: Chapter;
  GET_GLOBAL_PARAMS: Chapter;
  UPDATE_GLOBAL_PARAMS: Chapter;
  SWAP_IDENTITY: Chapter;
  UPDATE_USER_GLOBAL_METADATA: Chapter;
  GET_ALL_USER_GLOBAL_METADATA: Chapter;
  GET_USER_GLOBAL_METADATA: Chapter;
  GRANT_VERIFICATION_BADGE: Chapter;
  REMOVE_VERIFICATION_BADGE: Chapter;
  GET_VERIFIED_USERS: Chapter;
  GET_USERNAME_VERIFICATION_AUDIT_LOGS: Chapter;
  UPDATE_GLOBAL_FEED: Chapter;
  PIN_POST: Chapter;
  REMOVE_NIL_POSTS: Chapter;

  // BuyDeso

  // MetaData
  HEALTH_CHECK: Chapter;
  GET_EXCHANGE_RATE: Chapter;
  GET_APP_STATE: Chapter;

  // READ_PROFILE_CARD: Chapter;
  // IDENTITY_INITIALIZE: Chapter;
  IDENTITY_LOGIN: Chapter;
  // IDENTITY_APPROVE: Chapter;
  IDENTITY_LOGOUT: Chapter;
  GET_MESSAGE_STATELESS: Chapter;
  SUBMIT_POST: Chapter;
  CREATE_FOLLOW_TRANSACTION: Chapter;
  NODE_PAGE: Chapter;
  SAMPLE_APP: Chapter;
  next: (currentChapter: Chapter) => Chapter | null;
  prev: (currentChapter: Chapter) => Chapter | null;
  chaptersToArray: () => { chapterName: string; chapterContent: Chapter }[];
  documentationToLink: (chapter: Chapter) => ReactElement[];
}
export interface Chapter {
  title: string;
  route: string;
  parentRoute: ParentRoutes;
  method?: PageProps | any;
  documentation: string[];
  githubSource: string[];
  component: () => ReactElement;
}
