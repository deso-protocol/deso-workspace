import { GetTutorialCreatorResponse, GetTutorialCreatorsRequest, StartOrSkipTutorialRequest, UpdateTutorialStatusRequest } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../node/Node';
export declare class Tutorial {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    getTutorialCreators(request: Partial<GetTutorialCreatorsRequest>): Promise<GetTutorialCreatorResponse>;
    startOrSkipTutorial(request: Partial<StartOrSkipTutorialRequest>): Promise<void>;
    updateTutorialStatus(request: Partial<UpdateTutorialStatusRequest>): Promise<void>;
}
