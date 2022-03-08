import { Node } from '../../index';
import { Identity } from '../identity/Identity';

export class Miner {
  node: Node;
  identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
}
