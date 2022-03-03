import { Identity } from './lib/identity/Identity';
import { Social } from './lib/social/Social';
import { BASE_URI } from './lib/state';
import { Transaction } from './lib/transaction/Transaction';
import { User } from './lib/user/User';
import { Posts } from './lib/post/Posts';
import { MetaData } from './lib/meta-data/MetaData';
class Deso {
  uri: string = BASE_URI;
  constructor(uri?: string) {
    if (uri) {
      this.uri = uri;
    }
    this.identity.initialize();
  }

  public node = new Node(this.uri);
  private transaction = new Transaction();
  public identity = new Identity(this.transaction, this.node);
  public social = new Social(this.node, this.identity);
  public posts = new Posts(this.node, this.identity);
  public user = new User(this.node, this.identity);
  public metaData = new MetaData(this.node, this.identity);
}

export class Node {
  public uri: string = BASE_URI;
  constructor(uri: string) {
    this.uri = uri;
  }
}

export default Deso;
