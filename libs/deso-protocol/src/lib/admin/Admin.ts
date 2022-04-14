import axios from 'axios';
import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import {
  AdminGetAllUserGlobalMetadataRequest,
  AdminGetAllUserGlobalMetadataResponse,
  AdminGetMempoolStatsResponse,
  AdminGetUsernameVerificationAuditLogsRequest,
  AdminGetUsernameVerificationAuditLogsResponse,
  AdminGetVerifiedUsersResponse,
  AdminGrantVerificationBadgeRequest,
  AdminGrantVerificationBadgeResponse,
  AdminPinPostRequest,
  AdminRemoveNilPostsRequest,
  AdminRemoveVerificationBadgeRequest,
  AdminRemoveVerificationBadgeResponse,
  AdminUpdateGlobalFeedRequest,
  GetGlobalParamsRequest,
  GetGlobalParamsResponse,
  GetUserGlobalMetadataRequest,
  GetUserGlobalMetadataResponse,
  NodeControlRequest,
  NodeControlResponse,
  SwapIdentityRequest,
  SwapIdentityResponse,
  UpdateGlobalParamsRequest,
  UpdateGlobalParamsResponse,
  UpdateUserGlobalMetadataRequest,
} from 'deso-protocol-types';

export class Admin {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
  public async nodeControl(
    request: Partial<NodeControlRequest>
  ): Promise<NodeControlResponse> {
    const endpoint = 'node-control';
    const JWT = await this.identity.getJwt();
    request = { ...request, JWT };
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getMemPoolStats(): Promise<AdminGetMempoolStatsResponse> {
    const endpoint = 'get-mempool-stats';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, {});
  }

  public async getGlobalParams(
    request: Partial<GetGlobalParamsRequest>
  ): Promise<GetGlobalParamsResponse> {
    const endpoint = 'get-global-params';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async updateGlobalParams(
    request: Partial<UpdateGlobalParamsRequest>
  ): Promise<UpdateGlobalParamsResponse> {
    const endpoint = 'update-global-params';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async swapIdentity(
    request: Partial<SwapIdentityRequest>
  ): Promise<SwapIdentityResponse> {
    const endpoint = 'swap-identity';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async updateUserGlobalMetadata(
    request: Partial<UpdateUserGlobalMetadataRequest>
  ): Promise<void> {
    const endpoint = 'update-user-global-metadata';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async getUserGlobalMetadata(
    request: Partial<GetUserGlobalMetadataRequest>
  ): Promise<GetUserGlobalMetadataResponse> {
    const endpoint = 'get-user-global-metadata';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getAllUserGlobalMetadata(
    request: Partial<AdminGetAllUserGlobalMetadataRequest>
  ): Promise<AdminGetAllUserGlobalMetadataResponse> {
    const endpoint = 'get-all-user-global-metadata';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async grantVerificationBadgeRequest(
    request: Partial<AdminGrantVerificationBadgeRequest>
  ): Promise<AdminGrantVerificationBadgeResponse> {
    const endpoint = 'grant-verification-badge';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async removeVerificationBadge(
    request: Partial<AdminRemoveVerificationBadgeRequest>
  ): Promise<AdminRemoveVerificationBadgeResponse> {
    const endpoint = 'remove-verification-badge';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async getVerifiedUsers(): Promise<AdminGetVerifiedUsersResponse> {
    const endpoint = 'get-verified-users';
    const JWT = await this.identity.getJwt();
    return await axios.post(`${this.node.getUri()}/${endpoint}`, { JWT });
  }

  public async getUsernameVerificationAuditLogs(
    request: Partial<AdminGetUsernameVerificationAuditLogsRequest>
  ): Promise<AdminGetUsernameVerificationAuditLogsResponse> {
    const endpoint = 'get-username-verification-audit-logs';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async updateGlobalFeed(
    request: Partial<AdminUpdateGlobalFeedRequest>
  ): Promise<void> {
    const endpoint = 'update-global-feed';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async pinPost(request: Partial<AdminPinPostRequest>): Promise<void> {
    const endpoint = 'pin-post';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async removeNilPosts(
    request: Partial<AdminRemoveNilPostsRequest>
  ): Promise<void> {
    const endpoint = 'remove-nil-posts';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }
}
