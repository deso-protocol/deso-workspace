import {
  GetTutorialCreatorResponse,
  GetTutorialCreatorsRequest,
  StartOrSkipTutorialRequest,
  UpdateTutorialStatusRequest,
} from '@deso-workspace/deso-types';
import axios from 'axios';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
export class Tutorial {
  node: Node;
  identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async getTutorialCreators(
    request: Partial<GetTutorialCreatorsRequest>
  ): Promise<GetTutorialCreatorResponse> {
    const endpoint = 'get-tutorial-creators';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async startOrSkipTutorial(
    request: Partial<StartOrSkipTutorialRequest>
  ): Promise<void> {
    const endpoint = 'start-or-skip-tutorial';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async updateTutorialStatus(
    request: Partial<UpdateTutorialStatusRequest>
  ): Promise<void> {
    const endpoint = 'update-tutorial-status';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }
}
