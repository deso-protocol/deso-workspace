/* eslint-disable react/jsx-no-useless-fragment */
import { ReactElement, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/system/Box';
import DesoDrawer from '../../components/layout/Drawer';
import { CHAPTERS } from './Chapter.models';
export interface ChapterTemplateProps {
  title: string;
  tabs: TabItem[];
  navigation: ReactElement;
}

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {' '}
      {value === index && <div className="p-3">{children} </div>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export interface TabItem {
  title: string;
  subTitle?: ReactElement;
  content: ReactElement;
}

export interface TabProps {
  tabs: TabItem[];
  navigation: ReactElement;
}

export default function ChapterTemplate({ tabs, navigation }: TabProps) {
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {tabs && (
        <div className="mt-[13px] pb-2 w-full  flex justify-start ">
          <div className=" border-[#00000025]">
            <DesoDrawer chapters={CHAPTERS} />
          </div>
          <div className="flex-grow-1 mx-auto w-full max-w-[1500px] border-l border-r border-neutral-300">
            <Box
              className="flex justify-evenly"
              sx={{ borderBottom: 1, borderColor: 'black' }}
            >
              <Tabs
                TabIndicatorProps={{ style: { backgroundColor: '#000' } }}
                textColor="inherit"
                sx={{ color: 'black' }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {tabs.map((tab, index) => {
                  return (
                    <Tab
                      sx={{ width: '1000px' }}
                      key={index}
                      label={tab.title}
                      {...a11yProps(index)}
                    />
                  );
                })}
              </Tabs>

              {navigation}
            </Box>
            {tabs.map((tab, index) => {
              return (
                <TabPanel key={index} value={value} index={index}>
                  {tab.subTitle}
                  {tab.content}
                </TabPanel>
              );
            })}
          </div>

          <div className="w-[270px]"></div>
        </div>
      )}
    </>
  );
}
