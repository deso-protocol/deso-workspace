import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { AdminGetAllUserGlobalMetadataRequest, AdminGetAllUserGlobalMetadataResponse, AdminGetMempoolStatsResponse, AdminGetVerifiedUsersResponse, AdminGrantVerificationBadgeRequest, AdminGrantVerificationBadgeResponse, AdminRemoveVerificationBadgeRequest, AdminRemoveVerificationBadgeResponse, AdminUpdateGlobalFeedRequest, GetGlobalParamsRequest, GetGlobalParamsResponse, GetUserGlobalMetadataRequest, GetUserGlobalMetadataResponse, NodeControlRequest, NodeControlResponse, SwapIdentityRequest, SwapIdentityResponse, UpdateGlobalParamsRequest, UpdateGlobalParamsResponse, UpdateUserGlobalMetadataRequest } from 'deso-protocol-types';
export declare class Admin {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    nodeControl(request: Partial<NodeControlRequest>): Promise<NodeControlResponse>;
    getMemPoolStats(): Promise<AdminGetMempoolStatsResponse>;
    getGlobalParams(request: Partial<GetGlobalParamsRequest>): Promise<GetGlobalParamsResponse>;
    updateGlobalParams(request: Partial<UpdateGlobalParamsRequest>): Promise<UpdateGlobalParamsResponse>;
    swapIdentity(request: Partial<SwapIdentityRequest>): Promise<SwapIdentityResponse>;
    updateUserGlobalMetadata(request: Partial<UpdateUserGlobalMetadataRequest>): Promise<void>;
    getUserGlobalMetadata(request: Partial<GetUserGlobalMetadataRequest>): Promise<GetUserGlobalMetadataResponse>;
    getAllUserGlobalMetadata(request: Partial<AdminGetAllUserGlobalMetadataRequest>): Promise<AdminGetAllUserGlobalMetadataResponse>;
    grantVerificationBadgeRequest(request: Partial<AdminGrantVerificationBadgeRequest>): Promise<AdminGrantVerificationBadgeResponse>;
    removeVerificationBadge(request: Partial<AdminRemoveVerificationBadgeRequest>): Promise<AdminRemoveVerificationBadgeResponse>;
    getVerifiedUsers(): Promise<AdminGetVerifiedUsersResponse>;
    getUsernameVerificationAuditLogs(request: Partial<AdminRemoveVerificationBadgeRequest>): Promise<AdminRemoveVerificationBadgeResponse>;
    updateGlobalFeed(request: Partial<AdminUpdateGlobalFeedRequest>): Promise<void>;
    pinPost(request: Partial<AdminUpdateGlobalFeedRequest>): Promise<void>;
    removeNilPosts(request: Partial<AdminUpdateGlobalFeedRequest>): Promise<void>;
}
