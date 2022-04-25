/* eslint-disable @typescript-eslint/ban-types */
import Deso from 'deso-protocol';
import { ReactElement, useEffect, useState } from 'react';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Tooltip } from '@mui/material';
import { Votes } from './votes';
import { ProfilePicture } from '../components/ProfilePicture';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StatementTypeEnum } from './Statement';
export interface ReplyOptionsProps {
  PostHashHex: string;
  posterKey: string;
  userName: string;
  setShowComments?: Function;
  statementType?: StatementTypeEnum;
}
const deso = new Deso();
export const ReplyOptions = ({
  PostHashHex,
  posterKey,
  userName,
  statementType,
  setShowComments,
}: ReplyOptionsProps) => {
  const [poster, setPoster] = useState('');
  const [bannerText, setBannerText] = useState('');
  const [gaveDiamonds, setGaveDiamonds] = useState(false);
  const [arrowOpened, setArrowOpened] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState(0);
  const [toggleComments, setToggleComments] = useState<ReactElement | null>(
    null
  );
  // const [toggleOpen, setToggleOpen] = useState(false);
  useEffect(() => {
    if (statementType === StatementTypeEnum.Question) {
      setBannerText(`${userName} asked:`);
      getToggle();
    }
    if (statementType === StatementTypeEnum.Reply) {
      setBannerText(`${userName} commented:`);
    }

    if (statementType === StatementTypeEnum.NewQuestion) {
      setBannerText('Ask a question:');
    }
    getPoster();
  }, [arrowOpened, setArrowOpened]);

  const getToggle = () => {
    setToggleComments(
      <div
        className="text-white hover:text-[#ffc08c] cursor-pointer"
        onClick={() => {
          if (setShowComments) {
            setShowComments((toggle: boolean) => {
              setArrowOpened(!toggle);
              return !toggle;
            });
          }
        }}
      >
        <Tooltip title={`${commentCount} comments`} placement="top">
          <div>{arrowOpened ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</div>
        </Tooltip>
      </div>
    );
  };
  const getPoster = async () => {
    if (PostHashHex.length < 10) return;
    const post = await deso.posts.getSinglePost({ PostHashHex });
    setCommentCount(post.PostFound?.CommentCount ?? 0);
    if (!post.PostFound?.PosterPublicKeyBase58Check) return;
    setGaveDiamonds(!!post.PostFound.PostEntryReaderState.DiamondLevelBestowed);
    setPoster(post.PostFound?.PosterPublicKeyBase58Check);
  };

  const submitPost = async () => {
    await deso.posts.submitPost({
      ParentStakeID: PostHashHex,
      UpdaterPublicKeyBase58Check: deso.identity.getUserKey() as string,
      BodyObj: {
        Body: 'replying to thread',
        VideoURLs: [],
        ImageURLs: [],
      },
    });
  };

  const giveDiamond = async () => {
    if (gaveDiamonds) return;
    await deso.social.sendDiamonds({
      ReceiverPublicKeyBase58Check: poster,
      SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
      DiamondPostHashHex: PostHashHex,
      DiamondLevel: 1,
      MinFeeRateNanosPerKB: 1000,
      InTutorial: false,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="flex text-xl py-1">
        {toggleComments ?? <div className="min-w-[24px]"></div>}
        <ProfilePicture publicKey={posterKey} />{' '}
        <div className=" text-white ml-2">{bannerText} </div>
      </div>
      <div className="flex my-auto">
        <div
          className={`cursor-pointer hover:text-[#ffc08c] text-white ${
            statementType === 'Reply' && 'hidden'
          }`}
          onClick={submitPost}
        ></div>{' '}
        <div
          className="cursor-pointer hover:text-[#ffc08c] text-white ml-2"
          onClick={giveDiamond}
        >
          <Tooltip title="Tip a diamond" placement="right">
            <LocalAtmIcon fontSize="small" />
          </Tooltip>
        </div>
        <div>
          <Votes PostHashHex={PostHashHex} />
        </div>
      </div>
    </div>
  );
};
