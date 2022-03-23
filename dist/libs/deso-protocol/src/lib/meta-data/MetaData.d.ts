import { Identity } from '../identity/Identity';
import { Node } from '../node/Node';
export declare class MetaData {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    getAppState(): Promise<any>;
}
