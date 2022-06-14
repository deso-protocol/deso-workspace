import axios from 'axios';
import {
  AppendExtraDataRequest,
  AppendExtraDataResponse,
  GetTxnResponse,
  SubmitTransactionResponse,
  TransactionSpendingLimit,
  TransactionSpendingLimitResponse,
} from 'deso-protocol-types';

export class Transactions {
  public static submitTransaction(
    TransactionHex: string
  ): Promise<SubmitTransactionResponse> {
    const uri = localStorage.getItem('node_uri');
    return axios.post(`${uri}/submit-transaction`, { TransactionHex });
  }

  public static getTransaction(TxnHashHex: string): Promise<GetTxnResponse> {
    const uri = localStorage.getItem('node_uri');
    return axios.post(`${uri}/get-txn`, { TxnHashHex });
  }

  public static async appendExtraData(
    request: AppendExtraDataRequest
  ): Promise<AppendExtraDataResponse> {
    const uri = localStorage.getItem('node_uri');
    return (await axios.post(`${uri}/append-extra-data`, request)).data;
  }

  public static async getTransactionSpending(request: AppendExtraDataRequest) {
    const uri = localStorage.getItem('node_uri');
    return (await axios.post(`${uri}/get-transaction-spending`, request)).data;
  }
  public static async getTransactionSpendingLimitHexString(
    request: Partial<any>
  ): Promise<{ HexString: string }> {
    const uri = localStorage.getItem('node_uri');
    return (
      await axios.post(
        `https://node.deso.org/api/v0/get-transaction-spending-limit-hex-string`,
        { TransactionSpendingLimit: request }
      )
    ).data;
  }
  public static async getTransactionSpendingLimitResponseFromHex(
    transactionSpendingLimitHex: string
  ) {
    const uri = localStorage.getItem('node_uri');
    await axios.get(
      `${uri}/get-transaction-spending-limit-response-from-hex/${transactionSpendingLimitHex}`
    );
  }
}
