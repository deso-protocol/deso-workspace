import axios from 'axios';
import { Node } from '../node/Node';
import { Identity } from '../identity/Identity';

export class Admin {
  node: Node;
  identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
  //   public async (
  //     request: Partial<>
  //   ): Promise<GetNFTsForUserResponse> {
  //     const endpoint = '';
  //     return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  //   }
}
