import { uuid } from '../../utils/utils';
import { iFrameHandler } from './WindowHandler';
import { requestApproval } from './WindowPrompts';

export type IframeMethods =
  | 'sign'
  | 'encrypt'
  | 'decrypt'
  | 'jwt'
  | 'login'
  | 'logout';

export const callIdentityMethodAndExecute = (
  attributeValue: unknown,
  method: IframeMethods
): Promise<any> => {
  const user = JSON.parse(localStorage.getItem('login_user') as string);
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
  return iFrameHandler({
    iFrameMethod: method,
    data: getParams,
  });
};

export const approveSignAndSubmit = (transactionHex: string): Promise<any> => {
  const prompt = requestApproval(transactionHex);
  return iFrameHandler({ iFrameMethod: 'sign', data: { prompt } });
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
