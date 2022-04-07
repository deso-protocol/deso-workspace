/* eslint-disable @typescript-eslint/ban-types */
import { Transactions } from '../transaction/Transaction';
import { IframeMethods } from './IdentityHelper';
import { DerivedPrivateUserInfo, GetDecryptMessagesResponse } from 'deso-protocol-types';

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
      return Transactions.submitTransaction(
        event?.data?.payload?.signedTransactionHex
      )
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

    window.removeEventListener('message', windowHandler);
  }

  if (info.iFrameMethod === 'login' && event.data.method === 'login') {
    const key = event?.data?.payload?.publicKeyAdded;
    const user = JSON.stringify(event.data.payload.users[key]);
    info.data.prompt?.close();
    info.data.resolve({ key, user });
    window.removeEventListener('message', windowHandler);
  }

  if (info.iFrameMethod === 'logout' && event.data.method === 'login') {
    info.data.prompt?.close();
    info.data.resolve(true);
    localStorage.setItem('login_user', '');
    localStorage.setItem('login_key', '');
  }

  if (info.iFrameMethod === 'jwt') {
    if (event.data.payload.jwt) {
      info.data.prompt?.close();
      info.data.resolve(event.data.payload.jwt);
      window.removeEventListener('message', windowHandler);
    }
  }

  if (info.iFrameMethod === 'encrypt') {
    if (event.data.payload.encryptedMessage) {
      console.log(event.data);
      info.data.resolve(event.data.payload.encryptedMessage);
      window.removeEventListener('message', windowHandler);
    }
  }
  if (info.iFrameMethod === 'derive' && event.data.method === 'derive') {
    info.data.prompt?.close();
    info.data.resolve(event.data.payload as DerivedPrivateUserInfo);
    window.removeEventListener('derive', windowHandler);
  }
};
