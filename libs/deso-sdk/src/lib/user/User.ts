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
  BlockPublicKeyRequest,
  GetUserDerivedKeysRequest,
  BlockPublicKeyResponse,
  GetUserDerivedKeysResponse,
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
    return (
      await axios.post(`${this.node.getUri()}/get-users-stateless`, request)
    ).data;
  }

  public getSingleProfilePicture(PublicKeyBase58Check: string) {
    return `${this.node.getUri()}/get-single-profile-picture/${PublicKeyBase58Check}`;
  }

  public async getSingleProfile(
    request: Partial<GetSingleProfileRequest>
  ): Promise<GetSingleProfileResponse> {
    const endpoint = 'get-single-profile';
    const response = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return response;
  }
  public async getProfiles(
    request: Partial<GetProfilesRequest>
  ): Promise<GetProfilesResponse> {
    const endpoint = 'get-profiles';
    const response = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return response;
  }

  public async getUserMetadata(
    request: Partial<GetUserMetadataRequest>
  ): Promise<GetUserMetadataResponse> {
    const endpoint = `get-user-metadata/${request.PublicKeyBase58Check}`;
    const response = (await axios.get(`${this.node.getUri()}/${endpoint}`))
      .data;
    return response;
  }

  public async deletePii(request: Partial<DeletePIIRequest>): Promise<boolean> {
    if (!request.PublicKeyBase58Check) {
      throw Error('PublicKeyBase58Check is undefined');
    }
    const endpoint = 'delete-pii';
    const JWT = await this.identity.getJwt();
    await axios.post(`${this.node.getUri()}/${endpoint}`, {
      ...request,
      JWT,
    });
    return true;
  }

  public async blockPublicKey(
    request: Partial<BlockPublicKeyRequest>
  ): Promise<BlockPublicKeyResponse> {
    if (!request.PublicKeyBase58Check) {
      throw Error('PublicKeyBase58Check is undefined');
    }

    if (!request.BlockPublicKeyBase58Check) {
      throw Error('BlockPublicKeyBase58Check is undefined');
    }
    const endpoint = 'block-public-key';
    const JWT = await this.identity.getJwt();
    return await axios.post(`${this.node.getUri()}/${endpoint}`, {
      ...request,
      JWT,
    });
  }
  public async getUserDerivedKeys(
    request: Partial<GetUserDerivedKeysRequest>
  ): Promise<GetUserDerivedKeysResponse> {
    if (!request.PublicKeyBase58Check) {
      throw Error('PublicKeyBase58Check is undefined');
    }
    const endpoint = 'get-user-derived-keys';
    const JWT = await this.identity.getJwt();
    return await axios.post(`${this.node.getUri()}/${endpoint}`, {
      ...request,
      JWT,
    });
  }
}
