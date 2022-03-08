import { Identity } from './lib/identity/Identity';
import { Social } from './lib/social/Social';
import { BASE_URI } from './lib/state';
import { User } from './lib/user/User';
import { Posts } from './lib/post/Posts';
import { MetaData } from './lib/meta-data/MetaData';
import { Nft } from './lib/nft/Nft';
class Deso {
  constructor() {
    this.identity.initialize();
  }
  public node = new Node();
  public identity = new Identity(this.node);
  public social = new Social(this.node, this.identity);
  public posts = new Posts(this.node, this.identity);
  public user = new User(this.node, this.identity);
  public metaData = new MetaData(this.node, this.identity);
  public nft = new Nft(this.node, this.identity);
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
