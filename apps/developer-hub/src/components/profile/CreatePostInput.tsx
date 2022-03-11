import * as React from 'react';
import { Button, TextField, Tooltip } from '@mui/material';
import { LoginUser } from 'deso-protocol-types';
import { SampleAppLoggedInUser } from '../../recoil/AppState.atoms';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import {
  desoService,
  PublicKey,
} from '../../chapters/ChapterHelper/Chapter.atom';
export default function CreatePostInput() {
  const deso = useRecoilValue(desoService);
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
