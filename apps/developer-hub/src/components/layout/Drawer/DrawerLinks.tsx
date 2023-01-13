/* eslint-disable @typescript-eslint/ban-types */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getEnabledRoutes } from './EnabledRoutes';
import { LibraryLinks } from './LibraryLinks';
export interface DrawerLinksProps {
  openedPanels: any;
  parentRouteClick: Function;
}
export const DrawerLinks = ({
  openedPanels,
  parentRouteClick,
}: DrawerLinksProps) => {
  return (
    <>
      {getEnabledRoutes().map((parentRoute, index) => {
        return (
          <div key={index}>
            <div
              className="py-2 px-4 text-md font-medium  cursor-pointer hover:underline"
              onClick={() => parentRouteClick(parentRoute)}
            >
              <div key={index} className="inline flex justify-start mr-20">
                {openedPanels[parentRoute] ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowRightIcon />
                )}
                <div>{parentRoute.toLowerCase()}</div>
              </div>
            </div>
            <LibraryLinks
              parentRoute={parentRoute}
              openedPanels={openedPanels}
            />
          </div>
        );
      })}
    </>
  );
};
