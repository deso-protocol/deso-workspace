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

export class Transactions {
  public static async submitTransaction(
    TransactionHex: string
  ): Promise<SubmitTransactionResponse> {
    const uri = localStorage.getItem('node_uri');
    return (await axios.post(`${uri}/submit-transaction`, { TransactionHex }))
      .data;
  }

  public static async getTransaction(
    TxnHashHex: string
  ): Promise<GetTxnResponse> {
    const uri = localStorage.getItem('node_uri');
    return (await axios.post(`${uri}/get-txn`, { TxnHashHex })).data;
  }

  public static async appendExtraData(
    request: AppendExtraDataRequest
  ): Promise<AppendExtraDataResponse> {
    const uri = localStorage.getItem('node_uri');
    return (await axios.post(`${uri}/append-extra-data`, request)).data;
  }

  public static async getTransactionSpending(
    request: AppendExtraDataRequest
  ): Promise<GetTransactionSpendingResponse> {
    const uri = localStorage.getItem('node_uri');
    return (await axios.post(`${uri}/get-transaction-spending`, request)).data;
  }

  public static async getTransactionSpendingLimitHexString(
    request: string
  ): Promise<GetTransactionSpendingLimitHexStringResponse> {
    const uri = localStorage.getItem('node_uri');
    return (
      await axios.post(`${uri}/get-transaction-spending-limit-hex-string`, {
        TransactionSpendingLimit: request,
      })
    ).data;
  }

  public static async getTransactionSpendingLimitResponseFromHex(
    transactionSpendingLimitHex: string
  ): Promise<TransactionSpendingLimitResponse> {
    const uri = localStorage.getItem('node_uri');
    return await axios.get(
      `${uri}/get-transaction-spending-limit-response-from-hex/${transactionSpendingLimitHex}`
    );
  }
}
