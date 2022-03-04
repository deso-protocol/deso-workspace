import {
  GetPostsForPublicKeyRequest,
  GetPostsForPublicKeyResponse,
} from '@deso-workspace/deso-types';
import axios from 'axios';
import { Identity } from '../identity/Identity';
import { Node } from '../../index';
import { getSignerInfo, uuid } from '../../utils/utils';
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
    publicKey: string,
    user: any,
    body: string,
    postExtraData?: any,
    ParentStakeID?: string,
    imageURL?: string[]
  ): Promise<{ response: any; data: any } | undefined> {
    if (!publicKey) {
      console.log('publicKey is required');
      return;
    }

    if (!body) {
      console.log('body is required');
      return;
    }

    // 1. verify they have a key and body everything else is optional
    const data = {
      UpdaterPublicKeyBase58Check: publicKey,
      PostHashHexToModify: '',
      ParentStakeID: ParentStakeID,
      Title: '',
      BodyObj: { Body: body, ImageURLs: imageURL },
      RecloutedPostHashHex: '',
      PostExtraData: postExtraData,
      Sub: '',
      IsHidden: false,
      MinFeeRateNanosPerKB: 2000,
    };
    // 2. Inform the blockchain that a post is on its way
    const response: any = (
      await axios.post(`${this.node.uri}/submit-post`, data)
    ).data;
    // 3. get some info for signing a transaction
    const payload = getSignerInfo(user, response);

    const request = {
      id: uuid(),
      method: 'sign',
      payload,
      service: 'identity',
    };
    return this.identity.sign(request);
  }
}
