import { identity } from '@deso-core/identity';
import axios from 'axios';

identity.configure({
  identityURI: 'http://localhost:4201',
  redirectURI: `${window.location.origin}/devtest`,
});

const login = () => identity.login();

const submitPost = (e: any) => {
  e.preventDefault();
  const body = e.target[0].value;

  return axios
    .post('https://node.deso.org/api/v0/submit-post', {
      UpdaterPublicKeyBase58Check: identity.getActivePublicKey(),
      BodyObj: {
        Body: body,
        ImageURLs: [],
        VideoURLs: [],
      },
      MinFeeRateNanosPerKB: 1000,
    })
    .then((res) => {
      identity.signAndSubmitTx(res.data.TransactionHex);
    });
};

const submitTx = (TransactionHex: string) => {
  return axios.post('https://node.deso.org/api/v0/submit-transaction', {
    TransactionHex,
  });
};

export function BlankPage() {
  return (
    <div>
      <h1>Blank Page</h1>
      <button onClick={login}>Login</button>
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
