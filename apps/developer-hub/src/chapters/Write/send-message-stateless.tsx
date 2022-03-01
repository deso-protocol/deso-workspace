import axios from "axios";
import { SendMessageRequest } from "../Interfaces/MessageInfo.interface";
import { submitTransaction } from "../../services/DesoApiSubmitTransaction";
import { BASE_URI } from "../ChapterHelper/BaseUri";

export const sendMessage = async (request: SendMessageRequest) => {
  const response = (
    await axios.post(`${BASE_URI}/send-message-stateless`, request)
  ).data;
  if (response) {
    const TransactionHex = response.TransactionHex as string;
    submitTransaction(TransactionHex);
  }
};
