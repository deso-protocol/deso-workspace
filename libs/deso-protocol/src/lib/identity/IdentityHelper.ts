import { LoginUser } from 'deso-protocol-types';
import { uuid } from '../../utils/Utils';
import { Transactions } from '../transaction/Transaction';
import { iFrameHandler } from './WindowHandler';
import {
  requestApproval,
  requestWindow,
  WindowFeatures,
} from './WindowPrompts';

export type IframeMethods =
  | 'decrypt'
  | 'derive'
  | 'encrypt'
  | 'info'
  | 'jwt'
  | 'login'
  | 'logout'
  | 'sign'
  | 'storageGranted';

export const callIdentityMethodAndExecute = async (
  attributeValue: unknown,
  method: IframeMethods,
  user: LoginUser | null,
  transactions: Transactions
): Promise<any> => {
  const userParams = user
    ? {
        accessLevelHmac: user.accessLevelHmac,
        encryptedSeedHex: user.encryptedSeedHex,
        accessLevel: user.accessLevel,
      }
    : {};
  const request = {
    id: uuid(),
    service: 'identity',
    method: method,
    payload: {
      ...userParams,
      ...getParams(method, attributeValue),
    },
  };
  getIframe().contentWindow?.postMessage(request, '*');
  return iFrameHandler(
    {
      iFrameMethod: method,
      data: getParams(method, attributeValue),
    },
    transactions
  );
};

export const approveSignAndSubmit = (
  transactionHex: string,
  uri: string,
  transactions: Transactions,
  testnet?: boolean,
  windowFeatures?: WindowFeatures
): Promise<any> => {
  requestWindow({
    uri,
    queryParams: { tx: transactionHex, testnet },
    windowFeatures,
  });
  return iFrameHandler(
    { iFrameMethod: 'sign', data: { prompt } },
    transactions
  );
};

export const getIframe = (): HTMLIFrameElement => {
  const iframe: HTMLIFrameElement | null = document.getElementById(
    'identity'
  ) as HTMLIFrameElement;
  return iframe;
};

const getParams = (method: string, attributeValue: any) => {
  if (method === 'sign') {
    return { transactionHex: attributeValue };
  }
  if (method === 'encrypt') {
    return {
      message: attributeValue.MessageText,
      recipientPublicKey: attributeValue.RecipientPublicKeyBase58Check,
    };
  }
  if (method === 'decrypt') {
    return { encryptedMessages: attributeValue };
  }
  return undefined;
};
