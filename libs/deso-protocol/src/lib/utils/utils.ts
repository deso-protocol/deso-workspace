export const temp = () => {};
// import * as bip39 from 'bip39';
// import { ec as EC } from 'elliptic';
// import HDKey from 'hdkey';
// export const uvarint64ToBuf = (uint: number): Buffer => {
//   const result: number[] = [];

//   while (uint >= 0x80) {
//     result.push(Number((BigInt(uint) & BigInt(0xff)) | BigInt(0x80)));
//     uint = Number(BigInt(uint) >> BigInt(7));
//   }
//   result.push(uint | 0);

//   return Buffer.from(result);
// };

// export const getKeyPair = async ({
//   mnemonic = 'weather noble barely volume bind lemon raven cruel diamond hover siren canvas',
// }: {
//   mnemonic: string;
// }): Promise<EC.KeyPair> => {
//   const ec = new EC('secp256k1');
//   const seed = bip39.mnemonicToSeedSync(mnemonic);
//   const hdKey = HDKey.fromMasterSeed(seed).derive("m/44'/0'/0'/0/0");
//   const seedHex = hdKey.privateKey.toString('hex');
//   return ec.keyFromPrivate(seedHex);
// };
