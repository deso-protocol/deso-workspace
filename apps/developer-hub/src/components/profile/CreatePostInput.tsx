import { Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PublicKey } from '../../chapters/ChapterHelper/Chapter.atom';
import { DesoContext } from '../../services/DesoContext';
export default function CreatePostInput() {
  const deso = useContext(DesoContext);
  const myPublicKey = useRecoilValue(PublicKey);
  const [postBody, setPostBody] = useState<string | null>(null);
  const createPost = () => {
    if (myPublicKey && postBody) {
      deso.posts.submitPost({
        UpdaterPublicKeyBase58Check: myPublicKey,
        BodyObj: {
          Body: postBody,
          ImageURLs: [],
          VideoURLs: [],
        },
      });
    }
  };
  return (
    <div>
      <TextField
        fullWidth
        onChange={(event) => {
          setPostBody(event.target.value);
        }}
      />
      <Button onClick={createPost}>Submit Post</Button>
    </div>
  );
}
