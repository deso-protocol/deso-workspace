import { GetDiamondsForPostRequest, AppendExtraDataRequest, GetDiamondsForPostResponse, GetLikesForPostRequest, GetLikesForPostResponse, GetPostsDiamondedBySenderForReceiverRequest, GetPostsDiamondedBySenderForReceiverResponse, GetPostsForPublicKeyResponse, GetPostsStatelessRequest, GetPostsStatelessResponse, GetQuoteRepostsForPostRequest, GetQuoteRepostsForPostResponse, GetRepostsForPostRequest, GetSinglePostRequest, GetSinglePostResponse, HotFeedPageRequest, HotFeedPageResponse, SubmitPostRequest, SubmitPostResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../node/Node';
import { Transactions } from '../transaction/Transaction';
export declare class Posts {
    static transaction: Transactions;
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    getPostsForPublicKey(ReaderPublicKeyBase58Check: string, Username: string): Promise<GetPostsForPublicKeyResponse>;
    submitPost(request: Partial<SubmitPostRequest>, extraData?: Omit<AppendExtraDataRequest, 'TransactionHex'>): Promise<SubmitPostResponse>;
    getPostsStateless(request: Partial<GetPostsStatelessRequest>): Promise<GetPostsStatelessResponse>;
    getSinglePost(request: Partial<GetSinglePostRequest>): Promise<GetSinglePostResponse>;
    getHotFeed(request: Partial<HotFeedPageRequest>): Promise<HotFeedPageResponse>;
    getDiamondedPosts(request: Partial<GetPostsDiamondedBySenderForReceiverRequest>): Promise<GetPostsDiamondedBySenderForReceiverResponse>;
    getLikesForPost(request: Partial<GetLikesForPostRequest>): Promise<GetLikesForPostResponse>;
    getDiamondsForPost(request: Partial<GetDiamondsForPostRequest>): Promise<GetDiamondsForPostResponse>;
    getRepostsForPost(request: Partial<GetRepostsForPostRequest>): Promise<HotFeedPageResponse>;
    getQuoteRepostsForPost(request: Partial<GetQuoteRepostsForPostRequest>): Promise<GetQuoteRepostsForPostResponse>;
}
