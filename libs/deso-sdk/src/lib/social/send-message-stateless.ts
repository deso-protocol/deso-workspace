import { SendMessageStatelessRequest } from '@deso-workspace/deso-types';
import axios from 'axios';
import { BASE_URI } from '../state';
import * as transaction from '../transaction/index';
export const sendMessage = async (request: SendMessageStatelessRequest) => {
  const response = (
    await axios.post(`${BASE_URI}/send-message-stateless`, request)
  ).data;
  if (response) {
    const TransactionHex = response.TransactionHex as string;
    transaction.submit(TransactionHex);
  }
};
