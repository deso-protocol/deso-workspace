import { CreateFollowTxnStatelessRequest, CreateFollowTxnStatelessResponse, CreateLikeStatelessRequest, CreateLikeStatelessResponse, GetDecryptMessagesResponse, GetDiamondsForPublicKeyRequest, GetDiamondsForPublicKeyResponse, GetFollowsResponse, GetFollowsStatelessRequest, GetHodlersForPublicKeyRequest, GetHodlersForPublicKeyResponse, GetMessagesStatelessRequest, IsFolllowingPublicKeyResponse, IsFollowingPublicKeyRequest, IsHodlingPublicKeyRequest, IsHodlingPublicKeyResponse, RequestOptions, SendDiamondsRequest, SendDiamondsResponse, SendMessageStatelessRequest, UpdateProfileRequest, UpdateProfileResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import { User } from '../user/User';
export declare class Social {
    private node;
    private identity;
    user: User;
    constructor(node: Node, identity: Identity, user: User);
    sendMessage(request: Partial<SendMessageStatelessRequest>, options?: RequestOptions): Promise<any>;
    createFollowTxnStateless(request: CreateFollowTxnStatelessRequest, options?: RequestOptions): Promise<CreateFollowTxnStatelessResponse>;
    getFollowsStateless(request: Partial<GetFollowsStatelessRequest>): Promise<GetFollowsResponse>;
    getMessagesStateless(request: GetMessagesStatelessRequest): Promise<GetDecryptMessagesResponse[]>;
    getHodlersForPublicKey(request: Partial<GetHodlersForPublicKeyRequest>): Promise<GetHodlersForPublicKeyResponse>;
    getDiamondsForPublicKey(request: Partial<GetDiamondsForPublicKeyRequest>): Promise<GetDiamondsForPublicKeyResponse>;
    isFollowingPublicKey(request: Partial<IsFollowingPublicKeyRequest>): Promise<IsFolllowingPublicKeyResponse>;
    isHodlingPublicKey(request: Partial<IsHodlingPublicKeyRequest>): Promise<IsHodlingPublicKeyResponse>;
    updateProfile(request: Partial<UpdateProfileRequest>, options?: RequestOptions): Promise<UpdateProfileResponse>;
    sendDiamonds(request: Partial<SendDiamondsRequest>, options?: RequestOptions): Promise<SendDiamondsResponse>;
    createLikeStateless(request: Partial<CreateLikeStatelessRequest>, options?: RequestOptions): Promise<CreateLikeStatelessResponse>;
}
