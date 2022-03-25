import React from 'react';
import './App.css';
import { Header } from './components/layout/Header';
import { CHAPTERS } from './chapters/ChapterHelper/Chapter.models';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
function App() {
  const routes = CHAPTERS.chaptersToArray().map((chapter) => {
    return chapter.chapterContent.component();
  });
  return (
    <HashRouter>
      <div className="my-[50px] ">
        <div className="flex-grow">
          <Header />
        </div>
        <div className="flex-grow flex">
          <div className="flex-grow">
            <Routes>
              {routes}
              <Route
                key={'main'}
                path="*"
                element={<Navigate to="/main/welcome" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
