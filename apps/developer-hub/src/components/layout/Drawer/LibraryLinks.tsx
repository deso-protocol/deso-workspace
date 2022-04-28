import { DrawerLink } from './DrawerLink';
import { CHAPTERS } from '../../../chapters/ChapterHelper/Chapter.models';

export interface LibraryLinksProps {
  parentRoute: string;
  openedPanels: any;
}
export const LibraryLinks = ({
  parentRoute,
  openedPanels,
}: LibraryLinksProps) => {
  const links = CHAPTERS.chaptersToArray()
    .filter((c) => c.chapterContent.parentRoute === parentRoute)
    .map((section, index) => {
      return (
        <DrawerLink
          index={`${index}`}
          to={section.chapterContent.route}
          title={section.chapterContent.title}
        />
      );
    });
  return <>{openedPanels[parentRoute] ? links : ''}</>;
};
