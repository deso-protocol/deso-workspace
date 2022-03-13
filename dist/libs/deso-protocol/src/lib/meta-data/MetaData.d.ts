import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
export declare class MetaData {
    node: Node;
    identity: Identity;
    constructor(node: Node, identity: Identity);
    getAppState(): Promise<any>;
}
