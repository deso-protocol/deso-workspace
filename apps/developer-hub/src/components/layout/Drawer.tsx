import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { ChapterNavigation } from '../../chapters/ChapterHelper/Chapter.models';
import { ParentRoutes } from '../../services/utils';
export interface DesoDrawerProps {
  chapters: ChapterNavigation;
}

export default function DesoDrawer({ chapters }: DesoDrawerProps) {
  const list = () => (
    <Box role="presentation">
      {Object.keys(ParentRoutes).map((parentRoute) => {
        return chapters
          .chaptersToArray()
          .filter((c) => c.chapterContent.parentRoute === parentRoute)
          .map((chapter, index) => {
            return (
              <>
                {index === 0 ? (
                  <>
                    <div className="py-3 px-4 text-xl bg-[#1976d2] text-[#fff]">
                      {parentRoute.toUpperCase()}
                    </div>
                    <Divider />
                  </>
                ) : (
                  <></>
                )}
                <Link
                  to={`${chapter.chapterContent.route}`}
                  key={chapter.chapterName}
                >
                  <div className="py-3 px-4 hover:bg-[#c8cddd]">{`${chapter.chapterContent.title}`}</div>
                  <Divider />
                </Link>
              </>
            );
          });
      })}
    </Box>
  );

  return (
    <div>
      <div className="bg-[#fff] max-w-[250px] rounded-lg">{list()}</div>
    </div>
  );
}
