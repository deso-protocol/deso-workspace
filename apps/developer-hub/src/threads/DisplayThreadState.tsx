import { ThreadState } from '../services/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import Deso from 'deso-protocol';
export interface ThreadStateProps {
  state: ThreadState;
  PostHashHex: string;
}
const deso = new Deso();
export const DisplayThreadState = ({
  state,
  PostHashHex,
}: ThreadStateProps) => {
  if (!state) {
    return <></>;
  }
  let bgColor = 'bg-[#007a2d]';
  if (state == ThreadState.CLOSED) {
    bgColor = 'bg-[#870000]';
  }
  const updateThreadState = (updatedState: ThreadState) => {
    deso.posts.submitPost({ PostHashHexToModify: PostHashHex });
  };
  return (
    <div className={`${bgColor} text-center`}>
      {state.toLowerCase()}
      <MoreVertIcon className="float-right cursor-pointer" />
      {/* <Menu>
        <MenuItem onClick={() => updateThreadState(ThreadState.CLOSED)}>
          Close Issue
        </MenuItem>
      </Menu> */}
    </div>
  );
};
