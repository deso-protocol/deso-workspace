import axios from 'axios';
import { BASE_URI } from '../state/BaseUri';
export const submit = async (TransactionHex: string) => {
  await axios.post(`${BASE_URI}/submit-transaction`, { TransactionHex });
};
