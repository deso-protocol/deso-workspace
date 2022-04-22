import { Button } from '@mui/material';
import Deso from 'deso-protocol';
import { useState } from 'react';

export enum ThreadCategory {
  GENERAL = 'GENERAL',
  NODE = 'NODE',
  CORE = 'CORE',
  BACKEND = 'BACKEND',
  CLIENT = 'CLIENT',
}
export enum ThreadState {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  REMOVED = 'REMOVED',
  OPEN = 'OPEN',
}
export interface CreateThreadOnChain {
  PostHashHex: string;
  category: ThreadCategory;
  state: ThreadState;
}
const deso = new Deso();
export const CreateThreadOnChain = ({
  PostHashHex,
  category,
  state,
}: CreateThreadOnChain) => {
  const [commentText, setCommentText] = useState('');
  const replyToQuestion = () => {
    deso.posts.submitPost({
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
    });
  };
  return (
    <div className="w-full mx-auto mt-4 border-t border-gray-400">
      <div className="min-h-[70px] p-4 border">
        <textarea
          placeholder="add your comment here"
          className="min-h-[70px] border w-full"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          color="success"
          variant="outlined"
          disabled={!commentText}
          onClick={replyToQuestion}
        >
          Reply
        </Button>
      </div>
    </div>
  );
};
