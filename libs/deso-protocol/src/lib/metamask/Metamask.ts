import * as bs58check from 'bs58check';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import { Social } from '../social/Social';
import { Transactions } from '../transaction/Transaction';
import { User } from '../user/User';
import { PUBLIC_KEY_PREFIXES } from '../utils/Utils';

export class Metamask {
  private node: Node;
  private BLOCK: Readonly<number> = 999999999999;
  private identity: Identity;
  private social: Social;
  private user: User;
  private transactions: Transactions;
  constructor(
    node: Node,
    identity: Identity,
    social: Social,
    user: User,
    transactions: Transactions
  ) {
    this.node = node;
    this.identity = identity;
    this.social = social;
    this.user = user;
    this.transactions = transactions;
  }

  public async getENS(EthereumAddress: string): Promise<string | null> {
    const provider = this.getProvider();
    const ens = await provider.lookupAddress(EthereumAddress);
    return ens;
  }

  public desoKeyToEthereumKey(key: string) {
    if (!key) return;
    const publicKey0 = Array.from(bs58check.decode(key));
    const publicKey = ethers.utils.base58.decode(key);
    const ethAddress = ethers.utils.keccak256(publicKey); // run it through the eth hash
    const ethAddress0 = ethers.utils.keccak256(publicKey0); // run it through the eth hash
  }

  public async getMetaMaskMasterPublicKeyFromSignature(
    signature: string,
    message: number[]
  ): Promise<string> {
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
    const prefix = PUBLIC_KEY_PREFIXES.testnet.deso;
    const key = messagingPublicKey.getPublic().encode('array', true);
    const desoKey = Uint8Array.from([...prefix, ...key]);
    const encodedDesoKey = bs58check.encode(desoKey);
    return encodedDesoKey;
  }

  private getProvider = (): ethers.providers.Web3Provider => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    return provider;
  };

  public async updateProfileUserNameToEns(): Promise<void> {
    // const desoAddress = this.identity.getUserKey();
    // ethers.utils.computePublicKey;
    // const ens = await this.getENS(EthereumAddress);
    // const extraData = {};
    // const message = 'ENS VERIFICATION SIGNATURE';
    // const provider = this.getProvider();
    // await provider.send('eth_requestAccounts', []);
    // const signer = provider.getSigner();
    // signer.signMessage(message);
    // const signature = await provider.getSigner().signMessage(message);
    // if (ens) {
    //   await this.social.updateProfile({
    //     UpdaterPublicKeyBase58Check: EthereumAddress,
    //     MinFeeRateNanosPerKB: 1000,
    //     NewUsername: ens,
    //     ExtraData: {},
    //   });
    // }
  }
}
