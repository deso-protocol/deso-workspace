import { AppBar, Toolbar, Tooltip, Typography } from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect';
import { GitBook } from './gitbook';
import { Github } from './github';
import { DesoNpm } from './DesoNpm';
import { HubButton } from './HubButton';

export const Header = () => {
  return (
    <>
      <BrowserView>
        <div
          className="mb-[60px]"
          style={{ position: 'relative', zIndex: 1301 }}
        >
          <AppBar position="fixed" sx={{ backgroundColor: '#000' }}>
            <Toolbar>
              <HubButton />
              <div className="flex-grow"></div>
              <DesoNpm />
              <Github />
              <GitBook />
            </Toolbar>
          </AppBar>
        </div>
      </BrowserView>
      <MobileView>
        <AppBar position="fixed" sx={{ backgroundColor: '#000' }}>
          <Toolbar className="flex justify-between min-w-max">
            <HubButton />
            <Github />
            <GitBook />
          </Toolbar>
        </AppBar>
      </MobileView>
    </>
  );
};
