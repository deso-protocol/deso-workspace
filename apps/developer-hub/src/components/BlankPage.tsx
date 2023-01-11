import { identity } from '@deso-core/identity';
import axios from 'axios';
import { useState } from 'react';

identity.configure({
  identityURI: 'http://localhost:4201',
  //redirectURI: `${window.location.origin}/devtest`,
});

const submitPost = (e: any) => {
  e.preventDefault();
  const body = e.target[0].value;

  identity.signAndSubmitTx(() =>
    axios
      .post('https://node.deso.org/api/v0/submit-post', {
        UpdaterPublicKeyBase58Check: identity.activePublicKey,
        BodyObj: {
          Body: body,
          ImageURLs: [],
          VideoURLs: [],
        },
        MinFeeRateNanosPerKB: 1000,
      })
      .then(({ data }) => data)
  );
};

export function BlankPage() {
  const [activeUserKey, setActiveUserKey] = useState<string | null>(
    identity.activePublicKey
  );

  return (
    <div>
      <h1>Blank Page</h1>
      <p>Current user: {activeUserKey}</p>
      <button onClick={() => identity.login().then(setActiveUserKey)}>
        Login
      </button>
      <button onClick={() => identity.logout()}>Logout</button>
      <form onSubmit={submitPost}>
        <textarea
          name="post-textarea"
          cols={30}
          rows={10}
          style={{ border: '1px solid black' }}
        ></textarea>
        <button>Post</button>
      </form>
    </div>
  );
}
