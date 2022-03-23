import { CreateFollowTxnStatelessRequest, CreateFollowTxnStatelessResponse, CreateLikeStatelessRequest, CreateLikeStatelessResponse, GetDecryptMessagesResponse, GetDiamondsForPublicKeyRequest, GetDiamondsForPublicKeyResponse, GetFollowsResponse, GetFollowsStatelessRequest, GetHodlersForPublicKeyRequest, GetHodlersForPublicKeyResponse, GetMessagesStatelessRequest, IsFolllowingPublicKeyResponse, IsFollowingPublicKeyRequest, IsHodlingPublicKeyRequest, IsHodlingPublicKeyResponse, SendDiamondsRequest, SendDiamondsResponse, SendMessageStatelessRequest, UpdateProfileRequest, UpdateProfileResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../node/Node';
import { User } from '../user/User';
export declare class Social {
    private node;
    private identity;
    user: User;
    constructor(node: Node, identity: Identity, user: User);
    sendMessage(request: Partial<SendMessageStatelessRequest>): Promise<any>;
    createFollowTxnStateless(request: CreateFollowTxnStatelessRequest): Promise<CreateFollowTxnStatelessResponse>;
    getFollowsStateless(request: Partial<GetFollowsStatelessRequest>): Promise<GetFollowsResponse>;
    getMessagesStateless(request: GetMessagesStatelessRequest): Promise<GetDecryptMessagesResponse[]>;
    getHodlersForPublicKey(request: Partial<GetHodlersForPublicKeyRequest>): Promise<GetHodlersForPublicKeyResponse>;
    getDiamondsForPublicKey(request: Partial<GetDiamondsForPublicKeyRequest>): Promise<GetDiamondsForPublicKeyResponse>;
    isFollowingPublicKey(request: Partial<IsFollowingPublicKeyRequest>): Promise<IsFolllowingPublicKeyResponse>;
    isHodlingPublicKey(request: Partial<IsHodlingPublicKeyRequest>): Promise<IsHodlingPublicKeyResponse>;
    updateProfile(request: Partial<UpdateProfileRequest>): Promise<UpdateProfileResponse>;
    sendDiamonds(request: Partial<SendDiamondsRequest>): Promise<SendDiamondsResponse>;
    createLikeStateless(request: Partial<CreateLikeStatelessRequest>): Promise<CreateLikeStatelessResponse>;
}
