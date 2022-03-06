import axios from 'axios';

export const submitTransaction = (TransactionHex: string): Promise<any> => {
  const uri = localStorage.getItem('node_uri');
  return axios.post(`${uri}/submit-transaction`, { TransactionHex });
};
