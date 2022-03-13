import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
export declare class Miner {
    node: Node;
    identity: Identity;
    constructor(node: Node, identity: Identity);
}
