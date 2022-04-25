import { Admin } from './lib/admin/Admin';
import { Identity, IdentityConfig } from './lib/identity/Identity';
import { Media } from './lib/media/Media';
import { MetaData } from './lib/meta-data/MetaData';
import { Miner } from './lib/miner/Miner';
import { Nft } from './lib/nft/Nft';
import { Notification } from './lib/notification/Notification';
import { Posts } from './lib/post/Posts';
import { Referral } from './lib/referral/Referral';
import { Social } from './lib/social/Social';
import { User } from './lib/user/User';
import { Node } from './lib/Node/Node';
import { Wallet } from './lib/wallet/Wallet';
import { Transactions } from './lib/transaction/Transaction';
import { DAO } from './lib/dao/dao';

export interface DesoConfig {
  nodeUri?: string;
  identityConfig?: IdentityConfig;
}

export class Deso {
  constructor(config?: DesoConfig) {
    this.node = new Node();
    this.identity = new Identity({
      ...config?.identityConfig,
      ...{ node: this.node },
    });
    this.identity.initialize();
    this.reinitialize();
  }
  public node = new Node();
  public identity = new Identity({ node: this.node });
  private admin = new Admin(this.node, this.identity);
  private media = new Media(this.node, this.identity);
  public metaData = new MetaData(this.node, this.identity);
  public miner = new Miner(this.node, this.identity);
  public nft = new Nft(this.node, this.identity);
  public notification = new Notification(this.node, this.identity);
  public user = new User(this.node, this.identity);
  public social = new Social(this.node, this.identity, this.user);
  public dao = new DAO(this.node, this.identity);
  public posts = new Posts(this.node, this.identity);
  public transaction = Transactions;
  public wallet = new Wallet(this.node, this.identity);
  public referral = new Referral(this.node, this.identity);
  // private tutorial = new Tutorial(this.node, this.identity);

  reinitialize(): void {
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
    this.transaction = Transactions;
    this.wallet = new Wallet(this.node, this.identity);
    this.referral = new Referral(this.node, this.identity);
  }
}
export default Deso;
