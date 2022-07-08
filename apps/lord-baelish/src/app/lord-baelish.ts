import * as cors from 'cors';
import { Deso } from 'deso-protocol';
import * as express from 'express';
const app = express();

app.use(express.json());
app.use(cors());

const PORT: Readonly<number> = 3000;
const deso = new Deso({ identityConfig: { host: 'server' } });

app.get('/test', async (req, res) => {
  const oy = {
    UpdaterPublicKeyBase58Check:
      'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY',
    BodyObj: {
      Body: 'Checking out the developer hub',
      VideoURLs: [],
      ImageURLs: [],
    },
  };

  const response = await deso.posts.submitPost(oy).catch((e) => console.log(e));
  console.log(response);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export function lordBaelish(): string {
  return 'lord-baelish';
}
