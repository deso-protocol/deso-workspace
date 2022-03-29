import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CHAPTERS } from '../../../chapters/ChapterHelper/Chapter.models';
import Logo from '../../../assets/deso-logo.png';
export const HubButton = () => {
  return (
    <Link to={CHAPTERS.ABOUT.route} className="hover:text-[#ffc08c]">
      <Typography variant="h6" component="div">
        <img className="max-h-[15px] mr-2 inline" src={Logo} />
        <div className="inline mt-4 max-h-[32px] text-base font-semibold">
          Developer Hub (beta)
        </div>
      </Typography>
    </Link>
  );
};
