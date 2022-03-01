import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Drawer, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SampleAppToggleDrawer } from "../../recoil/AppState.atoms";
import { ChapterNavigation } from "../../chapters/ChapterHelper/Chapter.models";
export interface DesoDrawerProps {
  chapters: ChapterNavigation;
}
export default function DesoDrawer({ chapters }: DesoDrawerProps) {
  const [toggleState, setToggleDrawer] = useRecoilState(SampleAppToggleDrawer);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const toggle =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setToggleDrawer(open);
    };

  const handleListItemClick = (event: any, index: number) => {
    setSelectedIndex(index);
  };

  const list = () => (
    <Box role="presentation" onClick={toggle(false)} onKeyDown={toggle(false)}>
      <div className="min-h-[64px]"></div>
      {/* <List> */}
      {chapters.chaptersToArray().map((chapter, index) => {
        return (
          <Link
            to={`${chapter.chapterContent.route}`}
            onClick={(event) => handleListItemClick(event, index)}
            key={chapter.chapterName}
          >
            <div className="py-3 px-4 hover:bg-[#c8cddd]">{`${chapter.chapterContent.title}`}</div>
            <Divider />
          </Link>
        );
      })}
      {/* </List> */}
    </Box>
  );

  return (
    <Drawer open={toggleState} variant="temporary" anchor="left">
      {list()}
    </Drawer>
  );
}
