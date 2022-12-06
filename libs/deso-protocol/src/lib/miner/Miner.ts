import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import {
  GetBlockTemplateRequest,
  GetBlockTemplateResponse,
} from 'deso-protocol-types';
import axios from 'axios';

export class Miner {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async getBlockTemplate(
    request: GetBlockTemplateRequest
  ): Promise<GetBlockTemplateResponse> {
    const endpoint = 'get-block-template';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }

  public async submitBlock(
    request: Partial<GetBlockTemplateRequest>
  ): Promise<GetBlockTemplateResponse> {
    const endpoint = 'submit-block';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }
}
