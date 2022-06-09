import { ThreadState } from '../services/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';
import { GetSinglePostResponse } from 'deso-protocol-types';
export interface ThreadStateProps {
  state: ThreadState;
  PostHashHex: string;
}
const bgColors = {
  [ThreadState.OPEN]: 'bg-[#007a2d]',
  [ThreadState.CLOSED]: 'bg-[#870000]',
  [ThreadState.PENDING]: 'bg-[#000]',
  [ThreadState.REMOVED]: 'bg-[#000]',
  [ThreadState.RESOLVED]: 'bg-[#5f5f5f] ',
};
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export const DisplayThreadState = ({
  state,
  PostHashHex,
}: ThreadStateProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bgColor, setBgColor] = useState<string>(bgColors[state]);

  const [stateToDisplay, setState] = useState<string>(state);
  const [post, setPost] = useState<GetSinglePostResponse | null>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    getPost();
  }, [PostHashHex]);
  const getPost = async () => {
    if (!PostHashHex) return;
    const postToUpdate = await deso.posts.getSinglePost({ PostHashHex });
    setPost(postToUpdate);
  };
  useEffect(() => {
    setBgColor(bgColors[state]);
    setState(state);
  }, [state]);
  if (!state || state === ThreadState.PENDING) {
    return <></>;
  }

  const updateThreadState = async (updatedState: ThreadState) => {
    if (!post?.PostFound) return;
    const extraData = post.PostFound.PostExtraData;
    const Body = post.PostFound.Body;
    await deso.posts
      .submitPost({
        UpdaterPublicKeyBase58Check: deso.identity.getUserKey() as string,
        BodyObj: {
          ImageURLs: [],
          VideoURLs: [],
          Body,
        },
        PostHashHexToModify: PostHashHex,
        PostExtraData: { ...extraData, state: updatedState },
      })
      .then(() => {
        setBgColor(bgColors[updatedState]);
        setState(updatedState);
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div
      className={`text-center border-x  border-white text-white flex justify-between border-b border-white p-1`}
    >
      <div className={`${bgColor} rounded-lg px-1`}>
        {stateToDisplay.toLowerCase()}
      </div>
      {post?.PostFound?.PosterPublicKeyBase58Check ===
        deso.identity.getUserKey() && (
        <div onClick={handleClick}>
          <MoreVertIcon className="float-right cursor-pointer" />
        </div>
      )}
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => updateThreadState(ThreadState.OPEN)}>
          Open thread
        </MenuItem>
        <MenuItem onClick={() => updateThreadState(ThreadState.RESOLVED)}>
          Resolve thread
        </MenuItem>
      </Menu>
    </div>
  );
};
