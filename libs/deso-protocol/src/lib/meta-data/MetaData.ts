import axios from 'axios';
import { Identity } from '../identity/Identity';
import { BASE_URI } from '../state/BaseUri';
import { Node } from '../Node/Node';
import { GetAppStateRequest, GetAppStateResponse } from 'deso-protocol-types';
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
    return (await axios.post(`${BASE_URI}/get-app-state`, request)).data;
  }

  public async getExchangeRate(): Promise<GetAppStateResponse> {
    return (await axios.get(`${BASE_URI}/get-exchange-rate`)).data;
  }
  public async healthCheck(): Promise<GetAppStateResponse> {
    return (await axios.get(`${BASE_URI}/health-check`)).data;
  }
}
export const asdf = () => {
  return;
};
