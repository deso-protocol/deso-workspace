import Deso from 'deso-protocol';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import * as express from 'express';

export interface SendFundsRequest {
  signature: any;
}

const app = express();
app.use(express.json());
const PORT: Readonly<number> = 3000;
app.post('/send-funds', (req, res) => {
  console.log('hello?');
  console.log(req.body);
  res.send('hello');
});

export function lordBaelish(): string {
  const deso = new Deso();
  return 'lord-baelish';
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const getKeyFromSignature = (message: number[], signature: string) => {
  const e = new ec('secp256k1');
  const arrayify = ethers.utils.arrayify;
  const messageHash = arrayify(ethers.utils.hashMessage(message));
  const publicKeyUncompressedHexWith0x = ethers.utils.recoverPublicKey(
    messageHash,
    signature
  );

  const messagingPublicKey = e.keyFromPublic(
    publicKeyUncompressedHexWith0x.slice(2),
    'hex'
  );

  // const prefix = PUBLIC_KEY_PREFIXES.testnet.deso;
  // const key = messagingPublicKey.getPublic().encode('array', true);
  // const desoKey = Uint8Array.from([...prefix, ...key]);
  // const encodedDesoKey = bs58check.encode(desoKey);
  // return encodedDesoKey;
};
