import { Identity } from '../identity/Identity';
import { Node } from '../../index';
import axios from 'axios';
import {
  GetUsersResponse,
  GetUsersStatelessRequest,
  GetSingleProfileResponse,
  GetSingleProfileRequest,
  GetProfilesRequest,
  GetProfilesResponse,
  GetUserMetadataRequest,
  GetUserMetadataResponse,
  DeletePIIRequest,
} from '@deso-workspace/deso-types';
export class User {
  node: Node;
  identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
  public async getUserStateless(
    request: Partial<GetUsersStatelessRequest>
    // PublicKeysBase58Check: string | string[]
  ): Promise<GetUsersResponse> {
    return (await axios.post(`${this.node.uri}/get-users-stateless`, request))
      .data;
  }

  public getSingleProfilePicture(PublicKeyBase58Check: string) {
    return `${this.node.uri}/get-single-profile-picture/${PublicKeyBase58Check}`;
  }

  public async getSingleProfile(
    request: Partial<GetSingleProfileRequest>
  ): Promise<GetSingleProfileResponse> {
    const endpoint = 'get-single-profile';
    if (endpoint) {
      const response = (
        await axios.post(`${this.node.uri}/${endpoint}`, request)
      ).data;
      return response;
    } else {
      throw new Error('need to add endpoint value');
    }
  }
  public async getProfiles(
    request: Partial<GetProfilesRequest>
  ): Promise<GetProfilesResponse> {
    const endpoint = 'get-profiles';
    if (endpoint) {
      const response = (
        await axios.post(`${this.node.uri}/${endpoint}`, request)
      ).data;
      return response;
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async getUserMetadata(
    request: Partial<GetUserMetadataRequest>
  ): Promise<GetUserMetadataResponse> {
    const endpoint = `get-user-metadata/${request.PublicKeyBase58Check}`;
    if (endpoint) {
      const response = (await axios.get(`${this.node.uri}/${endpoint}`)).data;
      return response;
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async deletePii(request: Partial<DeletePIIRequest>): Promise<boolean> {
    if (!request.PublicKeyBase58Check) {
      throw Error('PublicKeyBase58Check is undefined');
    }
    const endpoint = 'delete-pii';
    const JWT = await this.identity.getJwt();
    if (endpoint) {
      await axios.post(`${this.node.uri}/${endpoint}`, { ...request, JWT });
      return true;
    } else {
      throw new Error('need to add endpoint value');
    }
  }
}
