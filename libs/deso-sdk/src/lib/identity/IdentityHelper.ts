import { LoginUser } from '@deso-workspace/deso-types';
import { uuid } from '../../utils/utils';
import { iFrameHandler } from './WindowHandler';
import { requestApproval } from './WindowPrompts';

export type IframeMethods = 'sign' | 'encrypt' | 'decrypt' | 'jwt';

export const callIdentityMethodAndExecute = (
  attributeValue: any,
  method: IframeMethods
): Promise<any> => {
  const user = JSON.parse(localStorage.getItem('login_user') as string);
  const { accessLevelHmac, encryptedSeedHex, accessLevel } = user;
  const attribute = (signRequestMapping as any)[method];
  const request = {
    id: uuid(),
    service: 'identity',
    method: method,
    payload: {
      accessLevelHmac,
      encryptedSeedHex,
      accessLevel,
      [attribute]: attributeValue,
    },
  };
  getIframe().contentWindow?.postMessage(request, '*');
  return iFrameHandler({
    iFrameMethod: method,
    data: { [attribute]: attributeValue },
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

const signRequestMapping = {
  sign: 'transactionHex',
  encrypt: 'message',
  decrypt: 'encryptedMessages',
  jwt: undefined,
};
