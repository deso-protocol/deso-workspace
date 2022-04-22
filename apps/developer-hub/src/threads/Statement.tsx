/* eslint-disable @typescript-eslint/ban-types */
import {
  CreateThreadOnChain,
  ThreadCategory,
  ThreadState,
} from './CreateThreadOnChain';
import { ReplyOptions } from './ReplyOptions';
import { Votes } from './votes';

export interface ResponseProps {
  body: string;
  PostHashHex: string;
  posterKey: string;
  userName: string;
  statementType?: 'Question' | 'Reply';
  setShowComments?: Function;
}

export const Statement = ({
  body,
  PostHashHex,
  posterKey,
  userName,
  setShowComments,
  statementType = 'Reply',
}: ResponseProps) => {
  const style = `mt-4  w-[${statementType === 'Reply' ? '600' : '800'}px]`;
  return (
    <div className={`${style}`}>
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
        <div className="p-2"> {body}</div>
        {statementType === 'Question' && (
          <CreateThreadOnChain
            PostHashHex={PostHashHex}
            category={ThreadCategory.CLIENT}
            state={ThreadState.OPEN}
          />
        )}
      </div>
    </div>
  );
};
