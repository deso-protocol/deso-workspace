import axios from 'axios';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import {
  GetAppStateRequest,
  GetAppStateResponse,
  GetExchangeRateResponse,
} from 'deso-protocol-types';
export class MetaData {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
  public async getAppState(
    request: GetAppStateRequest
  ): Promise<GetAppStateResponse> {
    return (await axios.post(`${this.node.getUri()}/get-app-state`, request))
      .data;
  }

  public async getExchangeRate(): Promise<GetExchangeRateResponse> {
    return (await axios.get(`${this.node.getUri()}/get-exchange-rate`)).data;
  }
  public async healthCheck(): Promise<number> {
    return (await axios.get(`${this.node.getUri()}/health-check`)).data;
  }
}
