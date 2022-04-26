/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Button } from '@mui/material';
import Deso from 'deso-protocol';
import { useState } from 'react';
import { ThreadCategory, ThreadState } from '../services/utils';
import { StatementTypeEnum } from './Statement';
import { CircularProgress } from '@mui/material';
import { timeout } from '../services/utils';

export interface CreateThreadOnChain {
  PostHashHex: string;
  category: ThreadCategory;
  state: ThreadState;
  statementType: StatementTypeEnum;
  onPostCallback: Function;
}
const deso = new Deso();
export const CreateThreadOnChain = ({
  PostHashHex,
  category,
  state,
  statementType,
  onPostCallback,
}: CreateThreadOnChain) => {
  const [commentText, setCommentText] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const replyToQuestion = async () => {
    if (!PostHashHex) return;
    setShowSpinner(true);
    await deso.posts
      .submitPost({
        UpdaterPublicKeyBase58Check: deso.identity.getUserKey() as string,
        ParentStakeID: PostHashHex,
        BodyObj: {
          Body: commentText,
          VideoURLs: [],
          ImageURLs: [],
        },
        PostExtraData: {
          title: 'title',
          category: category,
          resolvedBy: 'N/A',
          state: state,
        },
      })
      .finally(async () => {
        await timeout(2500);

        setShowSpinner(false);
        onPostCallback();
        setCommentText('');
      });
  };
  return (
    <div className="w-full mx-auto bg-[#2e3440]">
      <div className="min-h-[70px] p-4 ">
        {showSpinner ? (
          <div className="flex justify-center min-h-[125px] ">
            <CircularProgress className="my-auto" size="100px" />
          </div>
        ) : (
          <div>
            <textarea
              placeholder={`add your ${
                statementType === StatementTypeEnum.NewQuestion
                  ? StatementTypeEnum.Question.toLowerCase()
                  : StatementTypeEnum.Reply.toLowerCase()
              } here`}
              className="min-h-[125px] ml-[150px] max-w-[900px] border w-full border-white p-1 bg-[#ededed]"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
        )}
        <div className="flex justify-center mt-2">
          <Button
            style={{
              color: `${!commentText ? 'gray' : 'white'}`,
              borderColor: `${!commentText ? 'gray' : 'white'}`,
              borderWidth: `${commentText ? '2px' : '1px'}`,
              marginTop: `${commentText ? '0px' : '2px'}`,
            }}
            variant={'outlined'}
            disabled={!commentText}
            onClick={replyToQuestion}
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
