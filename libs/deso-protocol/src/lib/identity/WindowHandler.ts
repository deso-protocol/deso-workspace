/* eslint-disable @typescript-eslint/ban-types */
import {
  DerivedPrivateUserInfo,
  GetDecryptMessagesResponse,
} from 'deso-protocol-types';
import { Transactions } from '../transaction/Transaction';
import { IframeMethods } from './IdentityHelper';

export const iFrameHandler = (
  info: Payload,
  transactions: Transactions
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      handlers(
        event,
        windowHandler,
        {
          ...info,
          data: { ...info.data, resolve, reject },
        },
        transactions
      ).catch((e) => reject(e));
    };
    window.addEventListener('message', windowHandler);
  });
};

type Payload = {
  iFrameMethod: IframeMethods;
  data?: any;
};

export const handlers = async (
  event: any,
  windowHandler: any,
  info: Payload,
  transactions: Transactions
): Promise<any> => {
  if (info.iFrameMethod === 'sign') {
    if (event?.data?.payload?.signedTransactionHex) {
      return transactions
        .submitTransaction(event?.data?.payload?.signedTransactionHex)
        .then((res: any) => {
          if (info?.data?.prompt?.close) {
            info.data.prompt.close();
          }
          window.removeEventListener('message', windowHandler);
          info.data.resolve(res);
          return res;
        })
        .catch((e) => {
          window.removeEventListener('message', windowHandler);
          throw Error('something went wrong with submitting the transaction');
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

    window.removeEventListener('message', windowHandler);
  }

  if (info.iFrameMethod === 'login' && event.data.method === 'login') {
    const key = event?.data?.payload?.publicKeyAdded;
    const user = event.data.payload.users[key];
    info.data.prompt?.close();
    info.data.resolve({ key, user });
    window.removeEventListener('message', windowHandler);
  }

  if (info.iFrameMethod === 'logout' && event.data.method === 'login') {
    info.data.prompt?.close();
    info.data.resolve(true);
  }

  if (info.iFrameMethod === 'jwt') {
    if (event.data.payload?.jwt) {
      info.data.prompt?.close();
      info.data.resolve(event.data.payload.jwt);
      window.removeEventListener('message', windowHandler);
    }
  }

  if (info.iFrameMethod === 'encrypt') {
    if (event.data.payload.encryptedMessage) {
      info.data.resolve(event.data.payload.encryptedMessage);
      window.removeEventListener('message', windowHandler);
    }
  }

  if (info.iFrameMethod === 'derive' && event.data.method === 'derive') {
    info.data.prompt?.close();
    info.data.resolve(event.data.payload as DerivedPrivateUserInfo);
    window.removeEventListener('derive', windowHandler);
  }

  if (
    info.iFrameMethod === 'info' &&
    Object.keys(event.data.payload ?? {}).length > 0
  ) {
    info.data.resolve(event.data.payload);
    window.removeEventListener('info', windowHandler);
  }

  if (
    info.iFrameMethod === 'messagingGroup' &&
    event.data.method === 'messagingGroup'
  ) {
    info.data.prompt?.close();
    info.data.resolve(event.data.payload);
    window.removeEventListener('message', windowHandler);
  }

  if (
    info.iFrameMethod === 'storageGranted' &&
    event.data.method === 'storageGranted'
  ) {
    info.data.resolve(true);
    window.removeEventListener('storageGranted', windowHandler);
  }
};
