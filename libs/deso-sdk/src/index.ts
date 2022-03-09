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
import { BASE_URI } from './lib/state';
import { User } from './lib/user/User';

class Deso {
  constructor() {
    this.identity.initialize();
  }
  public node = new Node();
  public identity = new Identity(this.node);
  public Admin = new Admin(this.node, this.identity);
  public media = new Media(this.node, this.identity);
  public metaData = new MetaData(this.node, this.identity);
  public miner = new Miner(this.node, this.identity);
  public nft = new Nft(this.node, this.identity);
  public notification = new Notification(this.node, this.identity);
  public posts = new Posts(this.node, this.identity);
  public social = new Social(this.node, this.identity);
  public user = new User(this.node, this.identity);
  public referral = new Referral(this.node, this.identity);
}
export class Node {
  public getUri(): string {
    return localStorage.getItem('node_uri') || BASE_URI;
  }
  public setUri(uri: string): void {
    localStorage.setItem('node_uri', uri);
  }
  constructor() {
    this.setUri(BASE_URI);
  }
}

export default Deso;
