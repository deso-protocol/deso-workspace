import axios from 'axios';
import {
  RequestOptions,
  SendDeSoRequest,
  SendDeSoResponse,
  TransferCreatorCoinRequest,
  TransferCreatorCoinResponse,
} from 'deso-protocol-types';
import { Identity } from '../identity/Identity';

import { Node } from '../Node/Node';

export class Wallet {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async sendDesoRequest(
    request: Partial<SendDeSoRequest>,
    options?: RequestOptions
  ): Promise<SendDeSoResponse> {
    const endpoint = 'send-deso';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async buyOrSellCreatorCoin(
    request: Partial<SendDeSoRequest>,
    options?: RequestOptions
  ): Promise<SendDeSoResponse> {
    const endpoint = 'buy-or-sell-creator-coin';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async transferCreatorCoin(
    request: Partial<TransferCreatorCoinRequest>,
    options?: RequestOptions
  ): Promise<TransferCreatorCoinResponse> {
    const endpoint = 'transfer-creator-coin';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }
}
