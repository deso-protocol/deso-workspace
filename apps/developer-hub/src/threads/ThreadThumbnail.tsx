/* eslint-disable @typescript-eslint/ban-types */
import CircleIcon from '@mui/icons-material/Circle';
import Deso from 'deso-protocol';
import { ReactElement, useEffect, useState } from 'react';
import { ProfilePicture } from '../components/ProfilePicture';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StatementTypeEnum } from './Statement';
import { Responses } from './Responses';
import { DisplayThreadState } from './DisplayThreadState';
import { ThreadState } from '../services/utils';
export interface ReplyOptionsProps {
  PostHashHex: string;
  posterKey: string;
  userName: string;
  setShowComments?: Function;
  statementType: StatementTypeEnum;
}
const deso = new Deso();
export const ThreadThumbnail = ({
  PostHashHex,
  posterKey,
  userName,
  statementType,
  setShowComments,
}: ReplyOptionsProps) => {
  const [poster, setPoster] = useState('');
  const [bannerText, setBannerText] = useState('');
  const [arrowOpened, setArrowOpened] = useState<boolean>(false);
  const [threadState, setThreadState] = useState<ThreadState>(
    ThreadState.PENDING
  );
  const [commentCount, setCommentCount] = useState(0);
  const [question, setQuestion] = useState('');
  const [toggleComments, setToggleComments] = useState<ReactElement | null>(
    null
  );
  useEffect(() => {
    getPoster();
    if (statementType === StatementTypeEnum.Question) {
      getToggle();
      setBannerText(`${userName}`);
    }
    if (statementType === StatementTypeEnum.Reply) {
      setBannerText(`${userName}`);
    }

    if (statementType === StatementTypeEnum.NewQuestion) {
      setBannerText('Ask a question:');
    }
  }, [arrowOpened, setArrowOpened, commentCount]);

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
        <div className="flex pl-1">
          {commentCount}
          {arrowOpened ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </div>
      </div>
    );
  };

  const getPoster = async () => {
    if (PostHashHex.length < 10) return;
    const post = await deso.posts.getSinglePost({ PostHashHex });
    setCommentCount(post.PostFound?.CommentCount ?? 0);
    if (!post.PostFound?.PosterPublicKeyBase58Check) return;
    setPoster(post.PostFound?.PosterPublicKeyBase58Check);
    setQuestion(post.PostFound.Body);
    setThreadState(post.PostFound.PostExtraData['state'] as ThreadState);
  };

  return (
    <>
      {<DisplayThreadState state={threadState} PostHashHex={PostHashHex} />}
      <div className="flex justify-between toggleComments  border-x border-b border-white bg-[#2e3440]">
        <div className="flex text-xl">
          <div className="mt-auto min-w-[150px] max-w-[150px] mx-auto text-white">
            <ProfilePicture
              publicKey={posterKey}
              className="max-h-[30px] mx-auto mt-2"
            />{' '}
            <div className="flex text-base">
              {toggleComments ?? <div className="min-w-[24px]"></div>}
              {bannerText}
            </div>
          </div>
          <div className="text-white border-l border-white p-2  max-w-[900px]">
            <div className="text text-base font-light text-gray-200">
              {question}
            </div>{' '}
          </div>
        </div>
        {statementType !== StatementTypeEnum.NewQuestion && (
          <Responses PostHashHex={PostHashHex} />
        )}
      </div>
    </>
  );
};
