import { Admin } from './lib/admin/Admin';
import { Identity } from './lib/identity/Identity';
import { Media } from './lib/media/Media';
import { MetaData } from './lib/meta-data/MetaData';
import { Miner } from './lib/miner/Miner';
import { Nft } from './lib/nft/Nft';
import { Notification } from './lib/notification/Notification';
import { Posts } from './lib/post/Posts';
import { Referral } from './lib/referral/Referral';
import { Social } from './lib/social/Social';
import { User } from './lib/user/User';
import { Node } from './lib/node/Node';
import { Tutorial } from './lib/tutorial/Tutorial';
import { Wallet } from './lib/wallet/Wallet';
import { Transactions } from './lib/transaction/Transaction';
export class Deso {
  constructor() {
    this.identity.initialize();
  }
  public node = new Node();
  public identity = new Identity(this.node);
  private admin = new Admin(this.node, this.identity);
  private media = new Media(this.node, this.identity);
  public metaData = new MetaData(this.node, this.identity);
  public miner = new Miner(this.node, this.identity);
  public nft = new Nft(this.node, this.identity);
  public notification = new Notification(this.node, this.identity);
  public user = new User(this.node, this.identity);
  public social = new Social(this.node, this.identity, this.user);
  public posts = new Posts(this.node, this.identity);
  public transaction = Transactions;
  public wallet = new Wallet(this.node, this.identity);
  public referral = new Referral(this.node, this.identity);
  private tutorial = new Tutorial(this.node, this.identity);
}
export default Deso;
