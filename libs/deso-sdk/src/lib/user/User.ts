import { Identity } from '../identity/Identity';
import { Node } from '../../index';
import axios from 'axios';
import {
  GetUsersResponse,
  GetUsersStatelessRequest,
  GetSingleProfileResponse,
  GetSingleProfileRequest,
} from '@deso-workspace/deso-types';
export class User {
  node: Node;
  identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
    console.log(this);
  }
  public async getUserStateless(
    PublicKeysBase58Check: string | string[]
  ): Promise<GetUsersResponse> {
    if (typeof PublicKeysBase58Check === 'string') {
      PublicKeysBase58Check = [PublicKeysBase58Check];
    }
    const userInfoRequest: Partial<GetUsersStatelessRequest> = {
      PublicKeysBase58Check: PublicKeysBase58Check,
      SkipForLeaderboard: false,
    };

    return (
      await axios.post(`${this.node.uri}/get-users-stateless`, userInfoRequest)
    ).data;
  }

  public getSingleProfilePicture(PublicKeyBase58Check: string) {
    return `${this.node.uri}/get-single-profile-picture/${PublicKeyBase58Check}`;
  }

  public getSingleProfile = async (
    PublicKeyBase58Check: string
  ): Promise<{
    response: GetSingleProfileResponse;
    endpoint: string;
    request: Partial<GetSingleProfileRequest>;
  }> => {
    const endpoint = 'get-single-profile';
    const request: Partial<GetSingleProfileRequest> = {
      PublicKeyBase58Check,
    };
    if (endpoint) {
      const response = (
        await axios.post(`${this.node.uri}/${endpoint}`, request)
      ).data;
      return { response, endpoint, request };
    } else {
      throw new Error('need to add endpoint value');
    }
  };
}
