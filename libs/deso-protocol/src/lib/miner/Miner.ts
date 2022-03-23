import { Node } from '../node/Node';
import { Identity } from '../identity/Identity';

export class Miner {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
}
