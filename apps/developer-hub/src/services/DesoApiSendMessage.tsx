import axios from "axios";
import {
  SendIframeMessageRequest,
  SendMessageRequest,
} from "../chapters/Interfaces/MessageInfo.interface";
import { submitTransaction } from "./DesoApiSubmitTransaction";
import { User } from "../chapters/Interfaces/User";
import { BASE_URI } from "../chapters/ChapterHelper/BaseUri";

export const encryptMessage = async (
  request: SendIframeMessageRequest,
  messageToSend: string,
  user: User
) => {
  const req: {
    RecipientMessagingPublicKeyBase58Check: string;
    SenderMessagingKeyName: string;
  } = (await axios.post(`${BASE_URI}/check-party-messaging-keys`, request))
    .data;

  const { encryptedSeedHex, accessLevel, accessLevelHmac } = user;
  const iFrameRequest = {
    method: "encrypt",
    payload: {
      accessLevel,
      accessLevelHmac,
      encryptedSeedHex,
      senderGroupKeyName: req.SenderMessagingKeyName,
      recipientPublicKey: req.RecipientMessagingPublicKeyBase58Check,
      message: messageToSend,
    },
    service: "identity",
  };
};
export const sendMessage = async (request: SendMessageRequest) => {
  const response = (
    await axios.post(`${BASE_URI}/send-message-stateless`, request)
  ).data;
  if (response) {
    const TransactionHex = response.TransactionHex as string;
    submitTransaction(TransactionHex);
  }
};
