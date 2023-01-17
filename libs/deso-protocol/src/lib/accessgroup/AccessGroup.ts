import axios from 'axios';
import {
  AddAccessGroupMembersRequest,
  AddAccessGroupMembersResponse,
  CheckPartyAccessGroupsRequest,
  CheckPartyAccessGroupsResponse,
  CreateAccessGroupRequest,
  CreateAccessGroupResponse,
  GetAccessGroupsRequest,
  GetAccessGroupsResponse,
  GetPaginatedMessagesForDmThreadRequest,
  GetPaginatedMessagesForDmThreadResponse,
  GetPaginatedMessagesForGroupChatThreadRequest,
  GetPaginatedMessagesForGroupChatThreadResponse,
  GetUserMessageThreadsRequest,
  GetUserMessageThreadsResponse,
  RequestOptions,
  SendNewMessageRequest,
  SendNewMessageResponse,
  SubmitTransactionResponse,
} from 'deso-protocol-types';
import { throwErrors } from '../../utils/Utils';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';

export class AccessGroup {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async CreateAccessGroup(
    request: Partial<CreateAccessGroupRequest>,
    options?: RequestOptions
  ): Promise<CreateAccessGroupResponse & SubmitTransactionResponse> {
    // TODO: what needs to happen in identity
    const response: CreateAccessGroupResponse = (
      await axios.post(`${this.node.getUri()}/create-access-group`, request)
    ).data;
    return await this.identity
      .submitTransaction(response.TransactionHex, options)
      .then((stRes) => {
        return { ...response, ...stRes };
      })
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async AddAccessGroupMembers(
    request: Partial<AddAccessGroupMembersRequest>,
    options?: RequestOptions
  ): Promise<AddAccessGroupMembersResponse & SubmitTransactionResponse> {
    // TODO: what needs to happen in identity
    const response: AddAccessGroupMembersResponse = (
      await axios.post(
        `${this.node.getUri()}/add-access-group-members`,
        request
      )
    ).data;
    return await this.identity
      .submitTransaction(response.TransactionHex, options)
      .then((stRes) => {
        return { ...response, ...stRes };
      })
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async GetAllUserAccessGroups(
    request: Partial<GetAccessGroupsRequest>
  ): Promise<GetAccessGroupsResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-all-user-access-groups`,
        request
      )
    ).data;
  }

  public async GetAllUserAccessGroupsOwned(
    request: Partial<GetAccessGroupsRequest>
  ): Promise<Pick<GetAccessGroupsResponse, 'AccessGroupsOwned'>> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-all-user-access-groups-owned`,
        request
      )
    ).data;
  }

  public async GetAllUserAccessGroupsMemberOnly(
    request: Partial<GetAccessGroupsRequest>
  ): Promise<Pick<GetAccessGroupsResponse, 'AccessGroupsMember'>> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-all-user-access-groups-member-only`,
        request
      )
    ).data;
  }

  public async CheckPartyAccessGroups(
    request: Partial<CheckPartyAccessGroupsRequest>
  ): Promise<CheckPartyAccessGroupsResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/check-party-access-groups`,
        request
      )
    ).data;
  }

  public async SendDmMessage(
    request: Partial<SendNewMessageRequest>,
    options?: RequestOptions
  ): Promise<SendNewMessageResponse & SubmitTransactionResponse> {
    // TODO: what needs to happen in identity
    const response: SendNewMessageResponse = (
      await axios.post(`${this.node.getUri()}/send-dm-message`, request)
    ).data;

    return await this.identity
      .submitTransaction(response.TransactionHex, options)
      .then((stRes) => {
        return { ...response, ...stRes };
      })
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async SendGroupChatMessage(
    request: Partial<SendNewMessageRequest>,
    options?: RequestOptions
  ): Promise<SendNewMessageResponse & SubmitTransactionResponse> {
    // TODO: what needs to happen in identity
    const response: SendNewMessageResponse = (
      await axios.post(`${this.node.getUri()}/send-group-chat-message`, request)
    ).data;

    return await this.identity
      .submitTransaction(response.TransactionHex, options)
      .then((stRes) => {
        return { ...response, ...stRes };
      })
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async GetUserDmThreadsOrderedByTimeStamp(
    request: Partial<GetUserMessageThreadsRequest>
  ): Promise<GetUserMessageThreadsResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-user-dm-threads-ordered-by-timestamp`,
        request
      )
    ).data;
  }

  public async GetPaginatedMessagesForDmThread(
    request: Partial<GetPaginatedMessagesForDmThreadRequest>
  ): Promise<GetPaginatedMessagesForDmThreadResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-paginated-messages-for-dm-thread`,
        request
      )
    ).data;
  }

  public async GetUserGroupChatThreadsOrderedByTimestamp(
    request: Partial<GetUserMessageThreadsRequest>
  ): Promise<GetUserMessageThreadsResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-user-group-chat-threads-ordered-by-timestamp`,
        request
      )
    ).data;
  }

  public async GetPaginatedMessagesForGroupChatThread(
    request: Partial<GetPaginatedMessagesForGroupChatThreadRequest>
  ): Promise<GetPaginatedMessagesForGroupChatThreadResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-paginated-messages-for-group-chat-thread`,
        request
      )
    ).data;
  }

  public async GetAllUserMessageThreads(
    request: Partial<GetUserMessageThreadsRequest>
  ): Promise<GetUserMessageThreadsResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-all-user-message-threads`,
        request
      )
    ).data;
  }
}
