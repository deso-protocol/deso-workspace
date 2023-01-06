import { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { CHAPTERS } from './chapters/ChapterHelper/Chapter.models';
import ChapterTemplate from './chapters/ChapterHelper/ChapterTemplate';
import { BlankPage } from './components/BlankPage';
import DesoDrawer from './components/layout/Drawer/Drawer';
import { Header } from './components/layout/Header/Header';
import { PageNavigation } from './components/layout/PageNavigation';
import {
  forumRoute,
  getForumPosts,
  HUB,
  ThreadCategory,
} from './services/utils';
import { AllThreadsONPage } from './threads/AllThreadsOnPage';
function App() {
  const [forum, setForum] = useState<ReactElement[]>([]);
  useEffect(() => {
    getForumRoutes();
  }, []);

  const getForumRoutes = async () => {
    const posts = await getForumPosts();
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
                    title: p.Body,
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
    <BrowserRouter>
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
              <Route path="devtest" element={<BlankPage />} />
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
    </BrowserRouter>
  );
}

export default App;
