import axios from 'axios';
import {
  AppendExtraDataRequest,
  AppendExtraDataResponse,
  GetTxnResponse,
  SubmitTransactionResponse,
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

  public static getTransactionSpending(request: AppendExtraDataRequest) {
    const uri = localStorage.getItem('node_uri');
    return axios.post(`${uri}/get-transaction-spending`, request);
  }
}
