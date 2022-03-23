import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ChapterNavigation } from '../../chapters/ChapterHelper/Chapter.models';
import { Link } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';

export interface DesoDrawerProps {
  chapters: ChapterNavigation;
}

export default function DesoDrawer({ chapters }: DesoDrawerProps) {
  const list = () => (
    <Box role="presentation">
      {Object.keys(ParentRoutes)
        .filter((p) =>
          // currently only showing finished sections
          [
            'social',
            'posts',
            'identity',
            'user',
            'nft',
            'landing',
            'notification',
            'transactions',
            'wallet',
          ].includes(p)
        )
        .map((parentRoute) => {
          return chapters
            .chaptersToArray()
            .filter((c) => c.chapterContent.parentRoute === parentRoute)
            .map((chapter, index) => {
              return (
                <div key={index}>
                  {index === 0 ? (
                    <>
                      <div className="py-3 px-4 text-xl bg-[#1976d2] text-[#fff]">
                        {parentRoute.toUpperCase()}{' '}
                      </div>
                      <Divider />
                    </>
                  ) : (
                    <></>
                  )}
                  <Link
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' } as any);
                    }}
                    to={`${chapter.chapterContent.route}`}
                    key={chapter.chapterName}
                  >
                    <div className="py-3 px-4 hover:bg-[#c8cddd]">{`${chapter.chapterContent.title}`}</div>
                    <Divider />
                  </Link>
                </div>
              );
            });
        })}
    </Box>
  );
  return (
    <div>
      <div className="bg-[#fff] min-w-[250px] rounded-lg">{list()}</div>
    </div>
  );
}
