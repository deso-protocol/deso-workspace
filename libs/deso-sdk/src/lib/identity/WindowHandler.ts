/* eslint-disable @typescript-eslint/ban-types */
import { submitTransaction } from './sign';
import { IframeMethods } from './IdentityHelper';
import { GetDecryptMessagesResponse } from '@deso-workspace/deso-types';

export const iFrameHandler = (info: Payload): Promise<any> => {
  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      handlers(event, windowHandler, {
        ...info,
        data: { ...info.data, resolve, reject },
      });
    };
    window.addEventListener('message', windowHandler);
  });
};

type Payload = { iFrameMethod: IframeMethods; data?: any };

export const handlers = async (
  event: any,
  windowHandler: any,
  info: Payload
): Promise<any> => {
  if (info.iFrameMethod === 'sign') {
    if (event?.data?.payload?.signedTransactionHex) {
      return submitTransaction(event?.data?.payload?.signedTransactionHex)
        .then((res) => {
          if (info?.data?.prompt?.close) {
            info.data.prompt.close();
          }
          window.removeEventListener('message', windowHandler);
          info.data.resolve(res);
          return res;
        })
        .catch(() => {
          window.removeEventListener('message', windowHandler);
        });
    }
  }
  if (info.iFrameMethod === 'decrypt') {
    if (!event?.data?.payload?.decryptedHexes) {
      return;
    }
    const decryptedHexes = event?.data?.payload?.decryptedHexes;
    const messages = info.data.encryptedMessages;
    const thread = (messages as GetDecryptMessagesResponse[])?.map((m) => {
      const DecryptedMessage = decryptedHexes[m.EncryptedHex];
      return { ...m, DecryptedMessage };
    });
    info.data.resolve(thread);
  }
};
