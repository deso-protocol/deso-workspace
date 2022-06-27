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
  PostEntryResponse
} from 'deso-protocol-types';
import axios from 'axios';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
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
    request: Partial<GetPostsForPublicKeyRequest>
  ): Promise<GetPostsForPublicKeyResponse> {
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
  ): Promise<SubmitPostResponse & { PostEntryResponse: PostEntryResponse }> {
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
      .then((txn) => {
        return {
          ...apiResponse,
          ...{
            PostHashHex: txn.data.TxnHashHex,
            PostEntryResponse: txn.data.PostEntryResponse,
          }
        };
      })
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async getPostsStateless(
    request: Partial<GetPostsStatelessRequest>
  ): Promise<GetPostsStatelessResponse> {
    const endpoint = 'get-posts-stateless';
    return await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }

  public async getSinglePost(
    request: Partial<GetSinglePostRequest>
  ): Promise<GetSinglePostResponse> {
    throwErrors(['PostHashHex'], request);
    const endpoint = 'get-single-post';
    return await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }

  public async getHotFeed(
    request: Partial<HotFeedPageRequest>
  ): Promise<HotFeedPageResponse> {
    const endpoint = 'get-hot-feed';
    return await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }

  public async getDiamondedPosts(
    request: Partial<GetPostsDiamondedBySenderForReceiverRequest>
  ): Promise<GetPostsDiamondedBySenderForReceiverResponse> {
    const endpoint = 'get-diamonded-posts';
    return await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }

  public async getLikesForPost(
    request: Partial<GetLikesForPostRequest>
  ): Promise<GetLikesForPostResponse> {
    const endpoint = 'get-likes-for-post';
    return await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }

  public async getDiamondsForPost(
    request: Partial<GetDiamondsForPostRequest>
  ): Promise<GetDiamondsForPostResponse> {
    const endpoint = 'get-diamonds-for-post';
    return await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }

  public async getRepostsForPost(
    request: Partial<GetRepostsForPostRequest>
  ): Promise<HotFeedPageResponse> {
    const endpoint = 'get-reposts-for-post';
    return await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }

  public async getQuoteRepostsForPost(
    request: Partial<GetQuoteRepostsForPostRequest>
  ): Promise<GetQuoteRepostsForPostResponse> {
    const endpoint = 'get-quote-reposts-for-post';
    return await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }
}
