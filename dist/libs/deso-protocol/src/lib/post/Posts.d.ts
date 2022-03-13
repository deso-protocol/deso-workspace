import { GetDiamondsForPostRequest, GetDiamondsForPostResponse, GetLikesForPostRequest, GetLikesForPostResponse, GetPostsDiamondedBySenderForReceiverRequest, GetPostsDiamondedBySenderForReceiverResponse, GetPostsForPublicKeyResponse, GetPostsStatelessRequest, GetPostsStatelessResponse, GetQuoteRepostsForPostRequest, GetQuoteRepostsForPostResponse, GetRepostsForPostRequest, GetSinglePostRequest, GetSinglePostResponse, HotFeedPageRequest, HotFeedPageResponse, SubmitPostRequest, SubmitPostResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
export declare class Posts {
    node: Node;
    identity: Identity;
    constructor(node: Node, identity: Identity);
    getPostsForPublicKey(ReaderPublicKeyBase58Check: string, Username: string): Promise<GetPostsForPublicKeyResponse>;
    submitPost(request: Partial<SubmitPostRequest>): Promise<SubmitPostResponse>;
    getPostsStateless(request: Partial<GetPostsStatelessRequest>): Promise<GetPostsStatelessResponse>;
    getSinglePost(request: Partial<GetSinglePostRequest>): Promise<GetSinglePostResponse>;
    getHotFeed(request: Partial<HotFeedPageRequest>): Promise<HotFeedPageResponse>;
    getDiamondedPosts(request: Partial<GetPostsDiamondedBySenderForReceiverRequest>): Promise<GetPostsDiamondedBySenderForReceiverResponse>;
    getLikesForPost(request: Partial<GetLikesForPostRequest>): Promise<GetLikesForPostResponse>;
    getDiamondsForPost(request: Partial<GetDiamondsForPostRequest>): Promise<GetDiamondsForPostResponse>;
    getRepostsForPost(request: Partial<GetRepostsForPostRequest>): Promise<HotFeedPageResponse>;
    getQuoteRepostsForPost(request: Partial<GetQuoteRepostsForPostRequest>): Promise<GetQuoteRepostsForPostResponse>;
}
