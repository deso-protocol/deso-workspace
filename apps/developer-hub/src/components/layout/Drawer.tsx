/* eslint-disable react/jsx-no-useless-fragment */
import { ChapterNavigation } from '../../chapters/ChapterHelper/Chapter.models';
import { Link } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
const getEnabledRoutes = (): string[] => {
  return Object.keys(ParentRoutes).filter((p) =>
    [
      'identity',
      'miner',
      'metaData',
      'nft',
      'notification',
      'posts',
      'referral',
      'social',
      'transactions',
      'user',
      'wallet',
    ].includes(p)
  );
};

export const SideBar = (chapters: ChapterNavigation) => {
  const [openedPanels, setOpenedPanels] = useState<any>({});

  const Links = ({ chapters, parentRoute }: NewListItemProps) => {
    const sections = chapters
      .chaptersToArray()
      .filter((c) => c.chapterContent.parentRoute === parentRoute)
      .map((section, index) => {
        return (
          <>
            <Link
              className="pb-2 px-4 hover:underline cursor-pointer block ml-6"
              key={index}
              to={`${section.chapterContent.route}`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' } as any);
              }}
            >
              {section.chapterContent.title}
            </Link>
          </>
        );
      });
    return <>{openedPanels[parentRoute] ? sections : ''}</>;
  };
  return getEnabledRoutes().map((parentRoute, index) => {
    return (
      <>
        <div
          key={index}
          className="py-2 px-4 text-md font-medium  cursor-pointer hover:underline"
          onClick={() => {
            if (openedPanels[parentRoute] === true) {
              setOpenedPanels({
                ...openedPanels,
                [parentRoute]: false,
              });
            } else {
              setOpenedPanels({
                ...openedPanels,
                [parentRoute]: true,
              });
            }
          }}
        >
          <div className="inline flex justify-start mr-20 ">
            {openedPanels[parentRoute] ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowRightIcon />
            )}

            <div>{parentRoute.toLowerCase()}</div>
          </div>
        </div>
        <Links chapters={chapters} parentRoute={parentRoute} />
      </>
    );
  });
};
export interface DesoDrawerProps {
  chapters: ChapterNavigation;
}

export default function DesoDrawer({ chapters }: DesoDrawerProps) {
  return (
    <div>
      <div className="bg-[#fff] min-w-[250px] rounded-lg">
        {SideBar(chapters)}
      </div>
    </div>
  );
}
export interface NewListItemProps {
  chapters: ChapterNavigation;
  parentRoute: string;
}
