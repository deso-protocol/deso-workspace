import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { GetBlockTemplateRequest, GetBlockTemplateResponse } from 'deso-protocol-types';
export declare class Miner {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    getBlockTemplate(request: GetBlockTemplateRequest): Promise<GetBlockTemplateResponse>;
    submitBlock(request: Partial<GetBlockTemplateRequest>): Promise<GetBlockTemplateResponse>;
}
