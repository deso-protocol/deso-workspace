/* eslint-disable react/jsx-no-useless-fragment */ import { useState } from 'react';
import { ChapterNavigation } from '../../../chapters/ChapterHelper/Chapter.models';
import { DrawerLinks } from './DrawerLinks';
import { ThreadLinks } from './ThreadLinks';

export interface DesoDrawerProps {
  chapters: ChapterNavigation;
}

export default function DesoDrawer() {
  const [openedPanels, setOpenedPanels] = useState<any>({});

  const parentRouteClick = (parentRoute: string) => {
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
  };
  return (
    <div>
      <div className="bg-[#fff] min-w-[250px] rounded-lg border-r border-neutral-300">
        <div className=" font-semibold ml-2">Library</div>
        <DrawerLinks
          openedPanels={openedPanels}
          parentRouteClick={parentRouteClick}
        />
        <div className=" font-semibold ml-2">Threads</div>
        <ThreadLinks
          openedPanels={openedPanels}
          parentRouteClick={parentRouteClick}
        />
      </div>
    </div>
  );
}
