import React, { ReactElement, useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/layout/Header/Header';
import { CHAPTERS } from './chapters/ChapterHelper/Chapter.models';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  forumRoute,
  getForumPosts,
  HUB,
  ThreadCategory,
} from './services/utils';
import Deso from 'deso-protocol';
import { AllThreadsONPage } from './threads/AllThreadsOnPage';
import DesoDrawer from './components/layout/Drawer/Drawer';
import ChapterTemplate from './chapters/ChapterHelper/ChapterTemplate';
import { PageNavigation } from './components/layout/PageNavigation';
function App() {
  const [forum, setForum] = useState<ReactElement[]>([]);
  useEffect(() => {
    getForumRoutes();
  }, []);

  const getForumRoutes = async () => {
    const posts = await getForumPosts();
    console.log(posts);
    const forum = posts.map((p) => {
      return (
        <Route
          key={p.Body}
          path={forumRoute(p)}
          element={
            <div className="flex justify-start">
              <ChapterTemplate
                tabs={[
                  {
                    title: 'General',
                    content: (
                      <AllThreadsONPage
                        category={p.PostExtraData['Category'] as ThreadCategory}
                        title={p.Body}
                        publicKeyWhereThreadsLive={HUB}
                        ParentPostHashHex={p.PostHashHex}
                      />
                    ),
                  },
                  {
                    title: 'Foundation Questions',
                    content: (
                      <AllThreadsONPage
                        category={p.PostExtraData['Category'] as ThreadCategory}
                        title={p.Body}
                        publicKeyWhereThreadsLive={HUB}
                        ParentPostHashHex={p.PostHashHex}
                      />
                    ),
                  },
                ]}
                navigation={<PageNavigation />}
              />
            </div>
          }
        />
      );
    });
    setForum(forum);
  };
  const routes = CHAPTERS.chaptersToArray().map((chapter) => {
    return chapter.chapterContent.component();
  });
  return (
    <HashRouter>
      <div className="my-[50px] ">
        <div className="flex-grow mb-[70px]">
          <Header />
        </div>
        <div className="flex-grow flex">
          <DesoDrawer />
          <div className="flex-grow">
            <Routes>
              {routes}
              {forum}
              <Route
                key={'main'}
                path="*"
                element={<Navigate to="/main/welcome" />}
              />
            </Routes>
          </div>
          {/* <div></di> */}
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
