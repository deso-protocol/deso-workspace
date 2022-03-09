import { Node } from '../../index';
import { requestLogin, requestLogout } from './WindowPrompts';
import {
  GetDecryptMessagesRequest,
  GetDecryptMessagesResponse,
  LoginUser,
  SendMessageStatelessRequest,
} from '@deso-workspace/deso-types';
import {
  approveSignAndSubmit,
  callIdentityMethodAndExecute,
  getIframe,
} from './IdentityHelper';
import { iFrameHandler } from './WindowHandler';

export class Identity {
  node: Node;
  constructor(node: Node) {
    this.node = node;
  }

  public getIframe(): HTMLIFrameElement {
    return getIframe();
  }

  public getUser(): LoginUser | null {
    const user = localStorage.getItem('login_user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public getUserKey(): string | null {
    const key = localStorage.getItem('login_key');
    if (key) {
      return JSON.parse(key);
    }
    return null;
  }

  public async initialize(): Promise<any> {
    if (this.getIframe()) {
      return;
    }
    return new Promise((resolve) => {
      const windowHandler = (event: any) => {
        if (event.origin !== 'https://identity.deso.org') {
          return;
        }
        if (event.data.method === 'initialize') {
          event.source.postMessage(
            {
              id: event.data.id,
              service: 'identity',
              payload: {},
            },
            'https://identity.deso.org' as WindowPostMessageOptions
          );
          resolve(event.data);
        }
      };
      window.addEventListener('message', windowHandler);
      this.setIdentityFrame(true);
    });
  }

  public async login(
    accessLevel = '4'
  ): Promise<{ user: LoginUser; key: string }> {
    const prompt = requestLogin(accessLevel);
    const { key, user } = await iFrameHandler({
      iFrameMethod: 'login',
      data: { prompt },
    });
    localStorage.setItem('login_user', user);
    localStorage.setItem('login_key', key);
    return { user: JSON.parse(user), key };
  }

  public async logout(publicKey: string): Promise<boolean> {
    const prompt = requestLogout(publicKey);
    const successful = await iFrameHandler({
      iFrameMethod: 'logout',
      data: { prompt },
    });
    return successful;
  }

  private setIdentityFrame(createNewIdentityFrame = false): void {
    let frame = document.getElementById('identity');
    if (frame && createNewIdentityFrame) {
      frame.remove();
    }
    if (!createNewIdentityFrame) {
      return;
    }
    frame = document.createElement('iframe');
    frame.setAttribute('src', 'https://identity.deso.org/embed?v=2');
    frame.setAttribute('id', 'identity');
    frame.style.width = '100vh';
    frame.style.height = '100vh';
    frame.style.position = 'fixed';
    frame.style.zIndex = '1000';
    frame.style.display = 'none';
    frame.style.left = '0';
    frame.style.right = '0';
    const root = document.getElementsByTagName('body')[0];
    if (root) {
      root.appendChild(frame);
    }
  }

  public async submitTransaction(TransactionHex: string) {
    const user = this.getUser();
    // user exists no need to approve
    if (user) {
      return callIdentityMethodAndExecute(TransactionHex, 'sign');
    } else {
      // user does not exist  get approval
      return approveSignAndSubmit(TransactionHex);
    }
  }

  public async decrypt(
    encryptedMessages: GetDecryptMessagesRequest[]
  ): Promise<GetDecryptMessagesResponse[]> {
    let user = this.getUser();
    if (!user) {
      await this.login();
      user = this.getUser();
    }
    return await callIdentityMethodAndExecute(encryptedMessages, 'decrypt');
  }

  public async encrypt(
    request: Partial<SendMessageStatelessRequest>
  ): Promise<string> {
    request.RecipientPublicKeyBase58Check;
    let user = this.getUser();
    if (!user) {
      await this.login();
      user = this.getUser();
    }
    return await callIdentityMethodAndExecute(request, 'encrypt');
  }

  public async getJwt(): Promise<string> {
    let user = this.getUser();
    if (!user) {
      user = (await this.login()).user;
    }
    return await callIdentityMethodAndExecute(undefined, 'jwt');
  }
}
