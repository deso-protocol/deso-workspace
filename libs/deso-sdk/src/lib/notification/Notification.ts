import {
  GetNotificationsRequest,
  GetNotificationsResponse,
} from '@deso-workspace/deso-types';
import axios from 'axios';
import { Node } from '../../index';
import { Identity } from '../identity/Identity';

export class Notification {
  node: Node;
  identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
  public async getNotifications(
    request: Partial<GetNotificationsRequest>
  ): Promise<GetNotificationsResponse> {
    const endpoint = 'get-nfts-for-user';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }
}
// GetNotificationsCountRequest
// GetNotificationsCountResponse
