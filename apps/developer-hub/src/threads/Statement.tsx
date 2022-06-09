/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Tooltip } from '@mui/material';
import { PostEntryResponse } from 'deso-protocol-types';
import { ReactElement, useEffect, useState } from 'react';
import { ProfilePicture } from '../components/ProfilePicture';
import { ThreadCategory, ThreadState, timeout } from '../services/utils';
import { CreateThreadOnChain } from './CreateThreadOnChain';
import { ThreadThumbnail } from './ThreadThumbnail';
import { Responses } from './Responses';
import Deso from 'deso-protocol';

export enum StatementTypeEnum {
  Question = 'Question',
  Reply = 'Reply',
  NewQuestion = 'NewQuestion',
}

export interface ResponseProps {
  body: string;
  PostHashHex: string;
  posterKey: string;
  userName: string;
  comments: PostEntryResponse[];
  statementType?: StatementTypeEnum;
  parentOnPostCallback?: Function;
  category?: ThreadCategory;
}

const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export const Statement = ({
  PostHashHex,
  posterKey,
  userName,
  comments,
  statementType = StatementTypeEnum.Reply,
  parentOnPostCallback,
  category = ThreadCategory.CLIENT,
}: ResponseProps) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [commentsToDisplay, setCommentsToDisplay] = useState<ReactElement[]>();
  useEffect(() => {
    getComments(comments);
  }, []);

  useEffect(() => {}, [commentsToDisplay, setCommentsToDisplay]);

  const onPostCallback = async () => {
    const response = await deso.posts.getSinglePost({
      PostHashHex,
      ReaderPublicKeyBase58Check: deso.identity.getUserKey() as string,
      CommentLimit: 1000,
    });

    const updatedComments = response.PostFound?.Comments;
    if (updatedComments) {
      getComments(updatedComments);
    }
    if (parentOnPostCallback) {
      parentOnPostCallback();
    }
  };

  const getComments = (comments: PostEntryResponse[]) => {
    const commentsToDisplay =
      comments.map((c, i) => {
        const style = i % 2 === 0 ? 'bg-[#35476a]' : 'bg-[#1d2535]';
        return (
          <div
            className={`flex overflow-auto border-b border-white ${style} text-white`}
          >
            <div className="min-w-[150px] max-w-[150px] w-full border-l">
              <Tooltip
                placement="left"
                title={c.ProfileEntryResponse?.Username as string}
              >
                <div className="  pt-2">
                  <ProfilePicture
                    publicKey={c.PosterPublicKeyBase58Check}
                    className="bg-gray-400 mx-auto max-h-[30px] min-h-[30px]"
                  />
                  <div className="text-sm text-center">
                    {c.ProfileEntryResponse?.Username}
                  </div>
                </div>
              </Tooltip>
            </div>
            <div className="px-2 border-x border-white text-base font-light py-2 flex-grow">
              {c.Body}
            </div>
            <Responses PostHashHex={c.PostHashHex} />
          </div>
        );
      }) ?? [];
    setCommentsToDisplay(commentsToDisplay);
  };
  return (
    <div className={`w-full border border-white mb-[25px]`}>
      <ThreadThumbnail
        setShowComments={setShowComments}
        statementType={statementType}
        PostHashHex={PostHashHex}
        posterKey={posterKey}
        userName={userName}
      />
      {showComments && (
        // <div className="my-auto min-h-[75px]">
        <div className="">{commentsToDisplay}</div>
        // </div>
      )}
      {(statementType === StatementTypeEnum.NewQuestion || showComments) && (
        <CreateThreadOnChain
          onPostCallback={onPostCallback}
          statementType={statementType}
          PostHashHex={PostHashHex}
          category={category}
          state={ThreadState.OPEN}
        />
      )}
    </div>
  );
};
