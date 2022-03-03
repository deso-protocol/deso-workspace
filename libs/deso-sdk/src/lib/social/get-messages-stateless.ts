import axios from 'axios';
import { BASE_URI } from '../state/BaseUri';
import { uuid } from '../../utils/utils';
import {
  GetDecryptMessagesResponse,
  GetMessagesResponse,
  GetMessagesStatelessRequest,
  GetApproveResponse,
} from '@deso-workspace/deso-types';

export const getMessagesStateless = async (
  request: GetMessagesStatelessRequest,
  user: any
): Promise<GetDecryptMessagesResponse[]> => {
  const response: GetMessagesResponse = (
    await axios.post(`${BASE_URI}/get-messages-stateless`, request)
  ).data;
  // temp any fix for compiler
  const encryptedMessages = (response.OrderedContactsWithMessages as any[])
    .map((thread) => {
      if (thread.Messages === null) {
        return [];
      }
      return thread.Messages.map((message: any) => ({
        EncryptedHex: message.EncryptedText,
        PublicKey: message.IsSender
          ? message.RecipientPublicKeyBase58Check
          : message.SenderPublicKeyBase58Check,
        IsSender: message.IsSender,
        Legacy: !message.V2 && (!message.Version || message.Version < 2),
        Version: message.Version,
        SenderMessagingPublicKey: message.SenderMessagingPublicKey,
        SenderMessagingGroupKeyName: message.SenderMessagingGroupKeyName,
        RecipientMessagingPublicKey: message.RecipientMessagingPublicKey,
        RecipientMessagingGroupKeyName: message.RecipientMessagingGroupKeyName,
      }));
    })
    .flat();
  const { encryptedSeedHex, accessLevel, accessLevelHmac } = user;
  const iFrameRequest = {
    id: uuid(),
    method: 'decrypt',
    payload: {
      accessLevel,
      accessLevelHmac,
      encryptedSeedHex,
      encryptedMessages,
    },
    service: 'identity',
  };
  return decrypt(iFrameRequest);
};

export function decrypt(request: any): Promise<GetDecryptMessagesResponse[]> {
  if (!request?.payload?.encryptedMessages) {
    throw Error('Encrypted Messages are were not Included');
  }

  const iframe: HTMLIFrameElement | null = document.getElementById(
    'identity'
  ) as HTMLIFrameElement;
  if (iframe === null) {
    throw Error('Iframe with id identity does not exist');
  }
  iframe.contentWindow?.postMessage(request, '*');
  return new Promise((resolve) => {
    const windowHandler = (event: any) => {
      if (!event?.data?.payload?.decryptedHexes) {
        return;
      }
      const decryptedHexes = event?.data?.payload?.decryptedHexes;
      const messages = request.payload?.encryptedMessages;
      const thread = (messages as GetDecryptMessagesResponse[])?.map((m) => {
        const DecryptedMessage = decryptedHexes[m.EncryptedHex];
        return { ...m, DecryptedMessage };
      });
      resolve(thread);
    };
    window.addEventListener('message', windowHandler);
  });
}
