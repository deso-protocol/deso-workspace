import axios from 'axios';
import { SendMessageRequest } from '../Interfaces/MessageInfo.interface';
import { BASE_URI } from '../ChapterHelper/BaseUri';
import { transaction } from '@deso-workspace/deso-sdk';
export const sendMessage = async (request: SendMessageRequest) => {
  const response = (
    await axios.post(`${BASE_URI}/send-message-stateless`, request)
  ).data;
  if (response) {
    const TransactionHex = response.TransactionHex as string;
    transaction.submit(TransactionHex);
  }
};
