import React from 'react';
import './App.css';
import { Header } from './components/layout/Header';
import DesoDrawer from './components/layout/Drawer';
import { CHAPTERS } from './chapters/ChapterHelper/Chapter.models';
import { HashRouter, Routes } from 'react-router-dom';
function App() {
  const routes = CHAPTERS.chaptersToArray().map((chapter) =>
    chapter.chapterContent.component()
  );
  return (
    <HashRouter>
      <div className="my-[50px] ">
        <div className="flex-grow">
          <Header />
        </div>
        <div className="flex-grow flex">
          {/* <DesoDrawer chapters={CHAPTERS} /> */}
          <div className="flex-grow">
            <Routes>{routes}</Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
