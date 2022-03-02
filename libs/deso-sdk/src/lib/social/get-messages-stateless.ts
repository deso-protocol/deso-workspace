import axios from 'axios';
import { decrypt } from '../../lib/identity/';
import { BASE_URI } from '../state/BaseUri';
import { uuid } from '../../utils/utils';
import {
  GetMessagesResponse,
  GetMessagesStatelessRequest,
} from '@deso-workspace/deso-types';

export const getMessages = async (
  request: GetMessagesStatelessRequest,
  user: any
): Promise<{ thread: any; response: any }> => {
  const response: GetMessagesResponse = (
    await axios.post(`${BASE_URI}/get-messages-stateless`, request)
  ).data;
  // temp any fix for compiler
  const encryptedMessages = (response.OrderedContactsWithMessages as any[]).map(
    (thread) => {
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
    }
  );
  // TODO reenable this
  // .flat();
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
  return decrypt(iFrameRequest, response);
};
