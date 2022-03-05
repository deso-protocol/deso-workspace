import {
  GetPostsForPublicKeyRequest,
  GetPostsForPublicKeyResponse,
  LoginUser,
  SubmitPostRequest,
  SubmitPostResponse,
} from '@deso-workspace/deso-types';
import axios from 'axios';
import { Identity } from '../identity/Identity';
import { Node } from '../../index';
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
}
