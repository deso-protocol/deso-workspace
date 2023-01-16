import { Admin } from './lib/admin/Admin';
import { DAO } from './lib/dao/dao';
import { Identity, IdentityConfig } from './lib/identity/Identity';
import { Media } from './lib/media/Media';
import { MetaData } from './lib/meta-data/MetaData';
import { Ethereum } from './lib/metamask/Ethereum';
import { Miner } from './lib/miner/Miner';
import { Nft } from './lib/nft/Nft';
import { Node } from './lib/Node/Node';
import { Notification } from './lib/notification/Notification';
import { Posts } from './lib/post/Posts';
import { Referral } from './lib/referral/Referral';
import { Social } from './lib/social/Social';
import { Transactions } from './lib/transaction/Transaction';
import { User } from './lib/user/User';
import * as Utils from './lib/utils/Utils';
import { Wallet } from './lib/wallet/Wallet';

export { Ethereum as Metamask } from './lib/metamask/Ethereum';
// export * as Utils from './lib/utils/Utils';
export interface DesoConfig {
  nodeUri?: string;
  identityConfig?: Partial<IdentityConfig>;
}

// test if job runs
export class Deso {
  constructor(config?: Partial<DesoConfig>) {
    this.node = new Node(config?.nodeUri);
    this.transaction = new Transactions(this.node);
    this.identity = new Identity(
      {
        ...config?.identityConfig,
        ...{ node: this.node },
      },
      this.transaction
    );

    this.admin = new Admin(this.node, this.identity);
    this.media = new Media(this.node, this.identity);
    this.metaData = new MetaData(this.node, this.identity);
    this.miner = new Miner(this.node, this.identity);
    this.nft = new Nft(this.node, this.identity);
    this.notification = new Notification(this.node, this.identity);
    this.user = new User(this.node, this.identity);
    this.social = new Social(this.node, this.identity, this.user);
    this.dao = new DAO(this.node, this.identity);
    this.posts = new Posts(this.node, this.identity);
    this.wallet = new Wallet(this.node, this.identity);
    this.referral = new Referral(this.node, this.identity);
    this.ethereum = new Ethereum(
      this.node,
      this.identity,
      this.social,
      this.user,
      this.transaction
    );

    if (this.identity.isBrowser()) {
      this.identity.initialize();
    }
  }
  public node: Node;
  public transaction: Transactions;
  public identity: Identity;
  private admin: Admin;
  public media: Media;
  public metaData: MetaData;
  public miner: Miner;
  public nft: Nft;
  public notification: Notification;
  public user: User;
  public social: Social;
  public dao: DAO;
  public posts: Posts;
  public wallet: Wallet;
  public referral: Referral;
  public ethereum: Ethereum;
  public utils = Utils;

  reinitialize(): void {
    this.transaction = new Transactions(this.node);
    this.admin = new Admin(this.node, this.identity);
    this.media = new Media(this.node, this.identity);
    this.metaData = new MetaData(this.node, this.identity);
    this.miner = new Miner(this.node, this.identity);
    this.nft = new Nft(this.node, this.identity);
    this.notification = new Notification(this.node, this.identity);
    this.user = new User(this.node, this.identity);
    this.social = new Social(this.node, this.identity, this.user);
    this.dao = new DAO(this.node, this.identity);
    this.posts = new Posts(this.node, this.identity);
    this.wallet = new Wallet(this.node, this.identity);
    this.referral = new Referral(this.node, this.identity);
    this.ethereum = new Ethereum(
      this.node,
      this.identity,
      this.social,
      this.user,
      this.transaction
    );

    if (this.identity.isBrowser()) {
      this.identity.initialize();
    }
  }
}
export default Deso;
