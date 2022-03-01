import { ReactElement, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/system/Box";
export interface ChapterTemplateProps {
  title: string;
  tabs: TabItem[];
  navigation: ReactElement;
}

export const ChapterTemplate = ({ tabs, navigation }: ChapterTemplateProps) => {
  return <div>{tabs && <DeSoTabs tabs={tabs} navigation={navigation} />}</div>;
};

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
      {value === index && <div className="p-3">{children} </div>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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

export default function DeSoTabs({ tabs, navigation }: TabProps) {
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="mx-auto mt-20 max-w-[1160px] pb-2 w-full bg-[#fff] min-h-[800px] rounded-lg">
      <Box
        className="flex justify-between"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => {
            return <Tab label={tab.title} {...a11yProps(index)} />;
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
  );
}
