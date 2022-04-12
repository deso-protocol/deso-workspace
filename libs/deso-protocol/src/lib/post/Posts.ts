import {
  GetDiamondsForPostRequest,
  AppendExtraDataRequest,
  GetDiamondsForPostResponse,
  GetLikesForPostRequest,
  GetLikesForPostResponse,
  GetPostsDiamondedBySenderForReceiverRequest,
  GetPostsDiamondedBySenderForReceiverResponse,
  GetPostsForPublicKeyRequest,
  GetPostsForPublicKeyResponse,
  GetPostsStatelessRequest,
  GetPostsStatelessResponse,
  GetQuoteRepostsForPostRequest,
  GetQuoteRepostsForPostResponse,
  GetRepostsForPostRequest,
  GetSinglePostRequest,
  GetSinglePostResponse,
  HotFeedPageRequest,
  HotFeedPageResponse,
  SubmitPostRequest,
  SubmitPostResponse,
} from 'deso-protocol-types';
import axios from 'axios';
import { Identity } from '../identity/Identity';
import { Node } from '../node/Node';
import { Transactions } from '../transaction/Transaction';
import { throwErrors } from '../../utils/utils';
export class Posts {
  static transaction: Transactions;
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async getPostsForPublicKey(
    ReaderPublicKeyBase58Check: string,
    Username: string
  ): Promise<GetPostsForPublicKeyResponse> {
    const request: Partial<GetPostsForPublicKeyRequest> = {
      PublicKeyBase58Check: '',
      Username,
      ReaderPublicKeyBase58Check,
      NumToFetch: 10,
    };
    return (
      await axios.post(
        `${this.node.getUri()}/get-posts-for-public-key`,
        request
      )
    ).data;
  }

  public async submitPost(
    request: Partial<SubmitPostRequest>,
    extraData?: Omit<AppendExtraDataRequest, 'TransactionHex'>
  ): Promise<SubmitPostResponse> {
    if (!request.UpdaterPublicKeyBase58Check) {
      throw Error('UpdaterPublicKeyBase58Check is required');
    }
    if (!request.BodyObj) {
      throw Error('BodyObj is required');
    }
    if (!request.MinFeeRateNanosPerKB) {
      request.MinFeeRateNanosPerKB = 1500;
    }

    const apiResponse: SubmitPostResponse = (
      await axios.post(`${this.node.getUri()}/submit-post`, request)
    ).data;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, extraData)
      .then((tnx) => {apiResponse.PostHashHex = tnx.data.TxnHashHex; return apiResponse })
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async getPostsStateless(
    request: Partial<GetPostsStatelessRequest>
  ): Promise<GetPostsStatelessResponse> {
    const endpoint = 'get-posts-stateless';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getSinglePost(
    request: Partial<GetSinglePostRequest>
  ): Promise<GetSinglePostResponse> {
    throwErrors(['PostHashHex'], request);
    const endpoint = 'get-single-post';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getHotFeed(
    request: Partial<HotFeedPageRequest>
  ): Promise<HotFeedPageResponse> {
    const endpoint = 'get-hot-feed';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getDiamondedPosts(
    request: Partial<GetPostsDiamondedBySenderForReceiverRequest>
  ): Promise<GetPostsDiamondedBySenderForReceiverResponse> {
    const endpoint = 'get-diamonded-posts';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getLikesForPost(
    request: Partial<GetLikesForPostRequest>
  ): Promise<GetLikesForPostResponse> {
    const endpoint = 'get-likes-for-post';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getDiamondsForPost(
    request: Partial<GetDiamondsForPostRequest>
  ): Promise<GetDiamondsForPostResponse> {
    const endpoint = 'get-diamonds-for-post';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getRepostsForPost(
    request: Partial<GetRepostsForPostRequest>
  ): Promise<HotFeedPageResponse> {
    const endpoint = 'get-reposts-for-post';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getQuoteRepostsForPost(
    request: Partial<GetQuoteRepostsForPostRequest>
  ): Promise<GetQuoteRepostsForPostResponse> {
    const endpoint = 'get-quote-reposts-for-post';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }
}
