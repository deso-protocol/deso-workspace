/* eslint-disable @typescript-eslint/ban-types */
import Deso from 'deso-protocol';
import { ReactElement, useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { ProfilePicture } from '../components/ProfilePicture';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StatementTypeEnum } from './Statement';
import { Responses } from './Responses';
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
  const [commentCount, setCommentCount] = useState(0);
  const [question, setQuestion] = useState('');
  const [toggleComments, setToggleComments] = useState<ReactElement | null>(
    null
  );
  useEffect(() => {
    if (statementType === StatementTypeEnum.Question) {
      setBannerText(`${userName}`);
      getToggle();
    }
    if (statementType === StatementTypeEnum.Reply) {
      setBannerText(`${userName}`);
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
    setPoster(post.PostFound?.PosterPublicKeyBase58Check);
    setQuestion(post.PostFound.Body);
    // setDiamondTotal
  };

  return (
    <div className="flex justify-between toggleComments  border-b border-white bg-[#2e3440]">
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
  );
};
