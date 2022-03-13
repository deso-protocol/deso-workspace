import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { GetReferralInfoForReferralHashRequest, GetReferralInfoForReferralHashResponse, GetReferralInfoForUserRequest, GetReferralInfoForUserResponse } from 'deso-protocol-types';
export declare class Referral {
    node: Node;
    identity: Identity;
    constructor(node: Node, identity: Identity);
    getReferralInfoForUser(request: Partial<GetReferralInfoForUserRequest>): Promise<GetReferralInfoForUserResponse>;
    getReferralInfoForReferralHash(request: Partial<GetReferralInfoForReferralHashRequest>): Promise<GetReferralInfoForReferralHashResponse>;
}
