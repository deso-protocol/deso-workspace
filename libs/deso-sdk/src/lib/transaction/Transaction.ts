import axios from 'axios';
export class Transaction {
  public async submit(TransactionHex: string, uri: string) {
    await axios.post(`${uri}/submit-transaction`, { TransactionHex });
  }
}
