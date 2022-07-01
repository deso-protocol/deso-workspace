import axios from 'axios';
import {
  AppendExtraDataRequest,
  AppendExtraDataResponse,
  GetTransactionSpendingLimitHexStringResponse,
  GetTransactionSpendingResponse,
  GetTxnResponse,
  SubmitTransactionResponse,
  TransactionSpendingLimitResponse,
} from 'deso-protocol-types';

import { Node } from '../Node/Node';

export class Transactions {
  private node: Node;
  constructor(node: Node) {
    this.node = node;
  }

  public async submitTransaction(
    TransactionHex: string
  ): Promise<SubmitTransactionResponse> {
    return (
      await axios.post(`${this.node.getUri()}/submit-transaction`, {
        TransactionHex,
      })
    ).data;
  }

  public async getTransaction(TxnHashHex: string): Promise<GetTxnResponse> {
    return (await axios.post(`${this.node.getUri()}/get-txn`, { TxnHashHex }))
      .data;
  }

  public async appendExtraData(
    request: AppendExtraDataRequest
  ): Promise<AppendExtraDataResponse> {
    return (
      await axios.post(`${this.node.getUri()}/append-extra-data`, request)
    ).data;
  }

  public async getTransactionSpending(
    request: AppendExtraDataRequest
  ): Promise<GetTransactionSpendingResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-transaction-spending`,
        request
      )
    ).data;
  }

  public async getTransactionSpendingLimitHexString(
    request: string
  ): Promise<GetTransactionSpendingLimitHexStringResponse> {
    return (
      await axios.post(
        `${this.node.getUri()}/get-transaction-spending-limit-hex-string`,
        {
          TransactionSpendingLimit: request,
        }
      )
    ).data;
  }

  public async getTransactionSpendingLimitResponseFromHex(
    transactionSpendingLimitHex: string
  ): Promise<TransactionSpendingLimitResponse> {
    return await axios.get(
      `${this.node.getUri()}/get-transaction-spending-limit-response-from-hex/${transactionSpendingLimitHex}`
    );
  }
}
