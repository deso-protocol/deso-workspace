import { Button } from '@mui/material';
import Deso from 'deso-protocol';
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
  CLOSED = 'CLOSED'
  REMOVED = 'REMOVED'
}
const deso = new Deso();

export const CreateThreadOnChain = () => {
  const createPost = () => {
    deso.posts.submitPost({
      UpdaterPublicKeyBase58Check: deso.identity.getUserKey() as string,
      BodyObj: {
        Body: 'Comment thread test',
        VideoURLs: [],
        ImageURLs: [],
      },
      PostExtraData: {
        title: 'title',
        category: ThreadCategory.CLIENT,
        resolvedBy: 'N/A',
        state: 
      },
    });
  };
  return (
    <>
      <Button onClick={createPost}>Create Post</Button>
    </>
  );
};
