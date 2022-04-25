/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { PostEntryResponse } from 'deso-protocol-types';
import { useEffect, useState } from 'react';
import { ProfilePicture } from '../components/ProfilePicture';
import { ThreadCategory, ThreadState } from '../services/utils';
import { CreateThreadOnChain } from './CreateThreadOnChain';
import { ReplyOptions } from './ReplyOptions';
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
  onPostCallback?: Function;
}

export const Statement = ({
  body,
  PostHashHex,
  posterKey,
  userName,
  comments,
  onPostCallback = () => {},
  statementType = StatementTypeEnum.Reply,
}: ResponseProps) => {
  const [showComments, setShowComments] = useState<boolean>(false);
  useEffect(() => {}, []);
  const style = `w-[${
    statementType === StatementTypeEnum.Reply ? '600' : '800'
  }px]`;
  const getComments = () => {
    return (
      comments.map((c, i) => {
        // const style = i % 2 === 0 ?
        return (
          <div className="flex py-2 px-4 bg-[#ffffff94] text-white bg-gray-400 m-2 rounded-lg   overflow-auto">
            <div className="mr-4">
              <ProfilePicture
                publicKey={c.PosterPublicKeyBase58Check}
                className="bg-gray-400"
              />
            </div>
            <div className=" ">{c.Body}</div>
          </div>
        );
      }) ?? []
    );
  };
  return (
    <div className={`${style} mt-4`}>
      <div className={`pr-2 py-1 bg-[#000000d5] rounded-t-md`}>
        <ReplyOptions
          setShowComments={setShowComments}
          statementType={statementType}
          PostHashHex={PostHashHex}
          posterKey={posterKey}
          userName={userName}
        />
      </div>
      <div className="my-auto border border-gray-400  min-h-[75px] rounded-b shadow-md shadow-gray-200">
        {statementType !== StatementTypeEnum.NewQuestion && (
          <div className="p-2"> {body}</div>
        )}

        {statementType !== StatementTypeEnum.Reply && (
          <>
            {showComments && (
              <div className="border border-gray-400 m-4 rounded-lg min-h-[200px] max-h-[400px]">
                {getComments()}
              </div>
            )}
            <CreateThreadOnChain
              onPostCallback={onPostCallback}
              statementType={statementType}
              PostHashHex={PostHashHex}
              category={ThreadCategory.CLIENT}
              state={ThreadState.OPEN}
            />
          </>
        )}
      </div>
    </div>
  );
};
