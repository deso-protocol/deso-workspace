import { Route } from 'react-router-dom';
import SampleApp from '../../components/layout/SampleApp';
import { Chapter1Section } from '../Read/ReadSection';
import { IdentityLoginPage } from '../Identity/identity-login/IdentitiyLoginPage';
import { ReactElement } from 'react';
import { IdentityLogoutPage } from '../Identity/identity-logout/IdentityLogoutPage';
import { GetMessageStatelessPage } from '../Write/decrypt/DecryptMessagesPage';
import { Link, Link as MaterialLink } from '@mui/material';
import { CommonPageSectionTitles, PageSection } from './PageSections';
import { ChapterTemplate } from './ChapterTemplate';
import { PageNavigation } from '../../components/layout/PageNavigation';
import { SubmitPostPage } from '../Write/submit-post/submit-post-page';
import { GetAppStatePage } from '../Read/get-app-state/GetAppStatePage';
import { CreateFollowTransactionPage } from '../Write/create-follow-txn-stateless/create-follow-transaction-page';
import deso from '@deso-workspace/deso-sdk';
export const CHAPTERS: Readonly<ChapterNavigation> = {
  ABOUT: {
    title: 'Welcome',
    route: '*',
    description: 'N/A',
    documentation: [],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <ChapterTemplate
              title="Welcome"
              tabs={[
                {
                  content: (
                    <>
                      {' '}
                      {PageSection(
                        'Welcome to the DeSo Developer Hub',
                        <div>
                          DeSo developer hub is rich in resources to help you
                          build your DeSo app. Currently the page supports
                          interactive endpoints that help you connect, read, and
                          write to the DeSo chain.
                        </div>
                      )}
                      {PageSection(
                        'Tabs',
                        <div>
                          While navigating through each page you'll see some
                          common tabs such as Overview, Code, and Documentation.
                          <div className="ml-2 my-2">
                            <span className="font-semibold">Overview:</span>{' '}
                            Provides context on what the calls does, and briefly
                            describes the steps required to execute the call.
                          </div>
                          <div className="ml-2 my-2">
                            <span className="font-semibold"> Code:</span>{' '}
                            Provides the source code to execute call. This means
                            you can easily copy these files into your own app or
                            just inspect them for inspiration.build
                          </div>
                          <div className="ml-2 mt-2">
                            <span className="font-semibold">
                              Documentation:
                            </span>{' '}
                            Provides links to formal Deso documentation to
                            provide a more in depth explanation.
                          </div>
                        </div>
                      )}
                      {PageSection(
                        'Starter App',
                        <div>
                          Looking for a bare bones react template to get started
                          on your DeSo app? Open your terminal and run <br />
                          <span className="font-semibold">git clone </span>
                          https://github.com/DeSoDog/deso-react-template.git
                        </div>
                      )}
                      {PageSection(
                        'About',
                        <>
                          <div>
                            The DeSo Developer Hub is under active development
                            so endpoints and other features will continue to be
                            added on a weekly basis. We are also open to
                            community suggestions on what additional
                            functionality could be built which could be anything
                            from an onchain comment threads for common issues
                            (similar to stack overflow), more useful utility
                            methods, etc. If you have any recommendations for
                            improvement or find any bugs, please leave feedback{' '}
                            <Link
                              target="_blank"
                              href="https://github.com/DeSoDog/deso-deep-dive/issues"
                            >
                              here
                            </Link>
                          </div>
                          <div className=" my-16 text-center">
                            Hit the{' '}
                            <span className="font-semibold">Arrow icon</span> in
                            the top right or the{' '}
                            <span className="font-semibold">Sandwich icon</span>{' '}
                            in the top left to get started.
                          </div>
                        </>
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
  GET_SINGLE_PROFILE: {
    title: 'Get Single Profile',
    route: '/get-single-profile',
    description: 'get-single-profile',
    documentation: [
      'https://docs.deso.org/backend/blockchain-data/api/user-endpoints#get-single-profile',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Read/get-single-profile/GetSingleProfile.service.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Chapter1Section
              tabs={[]}
              requestText="Then we Assembled our request object. PublicKeyBase58Check is the public key of the user you're requesting."
              responseText=""
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
              apiCall={deso.api.user.getSingleProfile}
            />
          }
        ></Route>
      );
    },
  },
  READ_GET_USERS_STATELESS: {
    title: 'Get Users Stateless',
    route: '/read/get-users-stateless',
    description: 'get-users-stateless',
    documentation: [
      'https://docs.deso.org/backend/blockchain-data/api/user-endpoints#get-users-stateless',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Read/get-users-stateless/GetUserStateless.service.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Chapter1Section
              pretext={PageSection(
                this.title,
                <div>
                  get-users-stateless will query all information on a user or
                  users.
                </div>
              )}
              requestText="Then we assembled our request object where PublicKeysBased58Check is an array of users that we want to query. SkipForLeaderboard is set to false which returns profile info only"
              responseText=""
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={deso.api.user.getUserStateless}
            />
          }
        ></Route>
      );
    },
  },
  READ_GET_FOLLOWS_STATELESS: {
    title: 'Get Follows Stateless',
    route: '/read/get-follows-stateless',
    description: 'get-followers-stateless',
    documentation: [
      'https://docs.deso.org/backend/blockchain-data/api/social-endpoints#get-follows-stateless',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Read/get-follows-stateless/GetFollowsStateless.service.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Chapter1Section
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>
                  Similar to the get-users-stateless, but Instead it will return
                  an array of followers for a specific account.{' '}
                </div>
              )}
              requestText="Then we provide PublicKeyBase58Check which tell the endpoint who's followers to query. GetEntriesFollowingUsername returns only followers who are also following the public key(s), numToFetch determines how many followers to return per user."
              responseText=""
              tabs={[]}
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={deso.api.user.getUserStateless}
            />
          }
        ></Route>
      );
    },
  },
  GET_MESSAGE_STATELESS: {
    title: 'Get Message Stateless',
    route: '/identity/get-message-stateless',
    documentation: [
      'https://docs.deso.org/identity/iframe-api/endpoints#decrypt',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Write/get-messages-stateless.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-decrypt/IdentityDecryption.service.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <GetMessageStatelessPage
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  IDENTITY_LOGIN: {
    title: 'Login',
    route: '/identity/identity-login',
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-login/IdentityLogin.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-initialize/GetIdentityFrame.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Interfaces/User.tsx',
    ],
    documentation: [
      'https://docs.deso.org/identity/window-api/endpoints#log-in',
      'https://docs.deso.org/identity/identity',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <IdentityLoginPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },
  IDENTITY_LOGOUT: {
    title: 'Logout',
    route: '/identity/identity-logout',
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-logout/IdentityLogout.service.tsx',
    ],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <IdentityLogoutPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },

  WRITE_SUBMIT_POST: {
    title: 'Submit Post',
    route: '/write/submit-post',
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/social-transactions-api#submit-post',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Write/submit-post.tsx',
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

  WRITE_CREATE_FOLLOW_TRANSACTION: {
    title: 'Create Follow Transaction',
    route: '/write/create-follow-transaction',
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/social-transactions-api#create-follow-txn-stateless',
    ],
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Write/create-follow-txn-stateless/create-follow-txn-stateless.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/ChapterHelper/BaseUri.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/services/utils.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/sign-transaction/IdentitySubmitTransaction.service.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Interfaces/User.tsx',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <CreateFollowTransactionPage
              selectedChapter={this}
              chapters={CHAPTERS}
            />
          }
        ></Route>
      );
    },
  },
  NODE_PAGE: {
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
        <div key={i}>
          <MaterialLink href={doc}>{doc}</MaterialLink>
        </div>
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
  GET_SINGLE_PROFILE: Chapter;
  READ_GET_USERS_STATELESS: Chapter;
  READ_GET_FOLLOWS_STATELESS: Chapter;
  // READ_PROFILE_CARD: Chapter;
  // IDENTITY_INITIALIZE: Chapter;
  IDENTITY_LOGIN: Chapter;
  IDENTITY_LOGOUT: Chapter;
  GET_MESSAGE_STATELESS: Chapter;
  WRITE_SUBMIT_POST: Chapter;
  WRITE_CREATE_FOLLOW_TRANSACTION: Chapter;
  NODE_PAGE: Chapter;
  SAMPLE_APP: Chapter;
  next: (currentChapter: Chapter) => Chapter | null;
  prev: (currentChapter: Chapter) => Chapter | null;
  chaptersToArray: () => { chapterName: string; chapterContent: Chapter }[];
  documentationToLink: (chapter: Chapter) => ReactElement[];
  //   CHAPTER_2: Chapter;
  //   CHAPTER_3: Chapter;
}
export interface Chapter {
  title: string;
  route: string;
  description?: string;
  documentation: string[];
  githubSource: string[];
  component: () => ReactElement;
}
