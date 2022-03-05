import {
  GetDiamondsForPostRequest,
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
  LoginUser,
  SubmitPostRequest,
  SubmitPostResponse,
} from '@deso-workspace/deso-types';
import axios from 'axios';
import { Identity } from '../identity/Identity';
import { Node } from '../../index';
import { throwErrors } from '../../utils/utils';
export class Posts {
  node: Node;
  identity: Identity;
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
      await axios.post(`${this.node.uri}/get-posts-for-public-key`, request)
    ).data;
  }

  public async submitPost(
    request: Partial<SubmitPostRequest>,
    user: LoginUser
  ): Promise<SubmitPostResponse> {
    if (!request.UpdaterPublicKeyBase58Check) {
      throw Error('UpdaterPublicKeyBase58Check is required');
    }
    if (!request.BodyObj?.Body) {
      throw Error('BodyObj.Body is required');
    }
    if (!request.MinFeeRateNanosPerKB) {
      request.MinFeeRateNanosPerKB = 2000;
    }

    const apiResponse: SubmitPostResponse = (
      await axios.post(`${this.node.uri}/submit-post`, request)
    ).data;

    if (!user) {
      return await this.identity
        .approve({ apiResponse })
        .then(() => apiResponse)
        .catch(() => {
          throw Error('something went wrong while signing');
        });
    } else {
      return this.identity
        .approve({ user, apiResponse })
        .then(() => apiResponse)
        .catch(() => {
          throw Error('something went wrong while signing');
        });
    }
  }
  public async getPostsStateless(
    request: Partial<GetPostsStatelessRequest>
  ): Promise<GetPostsStatelessResponse> {
    // throwErrors(['PublicKeyBase58Check'], request);
    const endpoint = 'get-posts-stateless';
    const JWT = await this.identity.getJwt();
    if (endpoint) {
      return await axios.post(`${this.node.uri}/${endpoint}`, request);
    } else {
      throw new Error('need to add endpoint value');
    }
  }
  public async getSinglePost(
    request: Partial<GetSinglePostRequest>
  ): Promise<GetSinglePostResponse> {
    throwErrors(['PostHashHex'], request);
    const endpoint = 'get-single-post';
    if (endpoint) {
      return await axios.post(`${this.node.uri}/${endpoint}`, request);
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async getHotFeed(
    request: Partial<HotFeedPageRequest>
  ): Promise<HotFeedPageResponse> {
    const endpoint = 'get-hot-feed';
    if (endpoint) {
      return await axios.post(`${this.node.uri}/${endpoint}`, request);
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async getDiamondedPosts(
    request: Partial<GetPostsDiamondedBySenderForReceiverRequest>
  ): Promise<GetPostsDiamondedBySenderForReceiverResponse> {
    const endpoint = 'get-diamonded-posts';
    if (endpoint) {
      return await axios.post(`${this.node.uri}/${endpoint}`, request);
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async getLikesForPost(
    request: Partial<GetLikesForPostRequest>
  ): Promise<GetLikesForPostResponse> {
    const endpoint = 'get-likes-for-post';
    if (endpoint) {
      return await axios.post(`${this.node.uri}/${endpoint}`, request);
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async getDiamondsForPost(
    request: Partial<GetDiamondsForPostRequest>
  ): Promise<GetDiamondsForPostResponse> {
    const endpoint = 'get-diamonds-for-post';
    if (endpoint) {
      return await axios.post(`${this.node.uri}/${endpoint}`, request);
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async getRepostsForPost(
    request: Partial<GetRepostsForPostRequest>
  ): Promise<HotFeedPageResponse> {
    const endpoint = 'get-reposts-for-post';
    if (endpoint) {
      return await axios.post(`${this.node.uri}/${endpoint}`, request);
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async getQuoteRepostsForPost(
    request: Partial<GetQuoteRepostsForPostRequest>
  ): Promise<GetQuoteRepostsForPostResponse> {
    const endpoint = 'get-quote-reposts-for-post';
    if (endpoint) {
      return await axios.post(`${this.node.uri}/${endpoint}`, request);
    } else {
      throw new Error('need to add endpoint value');
    }
  }
}
