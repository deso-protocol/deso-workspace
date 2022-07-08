import { LoginUser } from 'deso-protocol-types';
import { uuid } from '../../utils/utils';
import { Transactions } from '../transaction/Transaction';
import { iFrameHandler } from './WindowHandler';
import { requestApproval } from './WindowPrompts';

export type IframeMethods =
  | 'sign'
  | 'encrypt'
  | 'decrypt'
  | 'jwt'
  | 'login'
  | 'logout'
  | 'derive';

export const callIdentityMethodAndExecute = async (
  attributeValue: unknown,
  method: IframeMethods,
  user: LoginUser | null,
  transactions: Transactions
): Promise<any> => {
  if (!user) return;
  const { accessLevelHmac, encryptedSeedHex, accessLevel } = user;
  const request = {
    id: uuid(),
    service: 'identity',
    method: method,
    payload: {
      accessLevelHmac,
      encryptedSeedHex,
      accessLevel,
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
  testnet?: boolean
): Promise<any> => {
  const prompt = requestApproval(transactionHex, uri, testnet);
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
