import * as cors from 'cors';
import { Deso } from 'deso-protocol';
import { RequestFundsFromLordBaelish } from 'deso-protocol-types';
import { ethers } from 'ethers';
import * as express from 'express';
const app = express();

app.use(express.json());
app.use(cors());

const PORT: Readonly<number> = 3000;
const deso = new Deso({ identityConfig: { host: 'server' } });

app.post('/send-funds', async (req, res) => {
  const body: RequestFundsFromLordBaelish = req.body;
  const response = await getKeyFromSignature(body.message, body.signature);
  const provider = ethers.getDefaultProvider();
  let balance = await (
    await provider.getBalance(body.publicAddress)
  ).toString();
  balance = ethers.utils.formatEther(balance);
  res.send({ response, balance });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const getKeyFromSignature = async (message: number[], signature: string) => {
  const response = await deso.metamask.getMetaMaskMasterPublicKeyFromSignature(
    signature,
    message
  );
  return response;
};

export function lordBaelish(): string {
  return 'lord-baelish';
}
