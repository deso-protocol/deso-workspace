import axios from 'axios';
import {
  SendDeSoRequest,
  SendDeSoResponse,
  TransferCreatorCoinRequest,
  TransferCreatorCoinResponse,
} from 'deso-protocol-types';
import { Identity } from '../identity/Identity';

import { Node } from '../node/Node';

export class Wallet {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async sendDesoRequest(
    request: Partial<SendDeSoRequest>
  ): Promise<SendDeSoResponse> {
    const endpoint = 'send-deso';
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

  public async buyOrSellCreatorCoin(
    request: Partial<SendDeSoRequest>
  ): Promise<SendDeSoResponse> {
    const endpoint = 'buy-or-sell-creator-coin';
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

  public async transferCreatorCoin(
    request: Partial<TransferCreatorCoinRequest>
  ): Promise<TransferCreatorCoinResponse> {
    const endpoint = 'transfer-creator-coin';
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
