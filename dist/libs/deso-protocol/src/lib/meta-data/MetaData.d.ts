import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import { GetAppStateRequest, GetAppStateResponse } from 'deso-protocol-types';
export declare class MetaData {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    getAppState(request: GetAppStateRequest): Promise<GetAppStateResponse>;
    getExchangeRate(): Promise<GetAppStateResponse>;
    healthCheck(): Promise<GetAppStateResponse>;
}
