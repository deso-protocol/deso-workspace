import { AppendExtraDataRequest, GetDiamondsForPostRequest, GetDiamondsForPostResponse, GetLikesForPostRequest, GetLikesForPostResponse, GetPostsDiamondedBySenderForReceiverRequest, GetPostsDiamondedBySenderForReceiverResponse, GetPostsForPublicKeyRequest, GetPostsForPublicKeyResponse, GetPostsStatelessRequest, GetPostsStatelessResponse, GetQuoteRepostsForPostRequest, GetQuoteRepostsForPostResponse, GetRepostsForPostRequest, GetSinglePostRequest, GetSinglePostResponse, HotFeedPageRequest, HotFeedPageResponse, RequestOptions, SubmitPostRequest, SubmitPostResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import { Transactions } from '../transaction/Transaction';
export declare class Posts {
    static transaction: Transactions;
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    getPostsForPublicKey(request: Partial<GetPostsForPublicKeyRequest>): Promise<GetPostsForPublicKeyResponse>;
    submitPost(request: Partial<SubmitPostRequest>, options?: RequestOptions, extraData?: Omit<AppendExtraDataRequest, 'TransactionHex'>): Promise<{
        constructedTransactionResponse: SubmitPostResponse;
        submittedTransactionResponse: any;
    }>;
    getPostsStateless(request: Partial<GetPostsStatelessRequest>): Promise<GetPostsStatelessResponse>;
    getSinglePost(request: Partial<GetSinglePostRequest>): Promise<GetSinglePostResponse>;
    getHotFeed(request: Partial<HotFeedPageRequest>): Promise<HotFeedPageResponse>;
    getDiamondedPosts(request: Partial<GetPostsDiamondedBySenderForReceiverRequest>): Promise<GetPostsDiamondedBySenderForReceiverResponse>;
    getLikesForPost(request: Partial<GetLikesForPostRequest>): Promise<GetLikesForPostResponse>;
    getDiamondsForPost(request: Partial<GetDiamondsForPostRequest>): Promise<GetDiamondsForPostResponse>;
    getRepostsForPost(request: Partial<GetRepostsForPostRequest>): Promise<HotFeedPageResponse>;
    getQuoteRepostsForPost(request: Partial<GetQuoteRepostsForPostRequest>): Promise<GetQuoteRepostsForPostResponse>;
}
