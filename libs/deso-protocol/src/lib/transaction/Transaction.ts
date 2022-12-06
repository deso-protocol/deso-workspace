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
    return (
      await axios.get(
        `${this.node.getUri()}/get-transaction-spending-limit-response-from-hex/${transactionSpendingLimitHex}`
      )
    ).data;
  }
  public async signWithLocalKey() {
    // TODO
  }
}

// export const signTransaction = async (
//   transactionHex: string
// ): Promise<string> => {
//   const privateKey = await getKeyPair({
//     mnemonic:
//       'weather noble barely volume bind lemon raven cruel diamond hover siren canvas',
//   });
//   const transactionBytes = Buffer.from(transactionHex, 'hex');
//   const transactionHash = Buffer.from(
//     sha256.x2(transactionBytes) as string,
//     'hex'
//   );
//   const signature = privateKey.sign(transactionHash, { canonical: true });
//   const signatureBytes = Buffer.from(signature.toDER());
//   const signatureLength = uvarint64ToBuf(signatureBytes.length);

//   // If transaction is signed with a derived key, use DeSo-DER recoverable signature encoding.

//   const signedTransactionBytes = Buffer.concat([
//     transactionBytes.slice(0, -1),
//     signatureLength,
//     signatureBytes,
//   ]);

//   return signedTransactionBytes.toString('hex');
// };
