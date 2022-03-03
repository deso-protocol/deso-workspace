import axios from 'axios';
import { Identity } from '../identity/Identity';
import { BASE_URI } from '../state/BaseUri';
import { Node } from '../../index';
export class MetaData {
  node: Node;
  identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
  public async getAppState() {
    return (await axios.post(`${BASE_URI}/get-app-state`, {})).data;
  }
}
