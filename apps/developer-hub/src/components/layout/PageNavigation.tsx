import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import { Chapter } from '../../chapters/ChapterHelper/Chapter.models';
import { Link } from 'react-router-dom';
export interface PageNavigationProps {
  previous: Chapter;
  next: Chapter;
}
export const PageNavigation = ({ previous, next }: PageNavigationProps) => {
  return (
    <div className="flex justify-around  ml-auto my-auto text-[#a0a0a0] mr-4">
      {/* {previous && (
        <Tooltip title={previous?.title}>
          <Link to={previous?.route}>
            <ArrowBackIosNewIcon className="hover:text-[#2e2e2e]"></ArrowBackIosNewIcon>
          </Link>
        </Tooltip>
      )}
      <Tooltip title={next?.title}>
        <Link to={next.route}>
          <ArrowForwardIosIcon className="hover:text-[#2e2e2e]"></ArrowForwardIosIcon>
        </Link>
      </Tooltip> */}
    </div>
  );
};
