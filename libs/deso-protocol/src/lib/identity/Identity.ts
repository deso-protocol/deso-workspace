import { Node } from '../Node/Node';
import { requestDerive, requestLogin, requestLogout } from './WindowPrompts';
import {
  AppendExtraDataRequest,
  DerivedPrivateUserInfo,
  GetDecryptMessagesRequest,
  GetDecryptMessagesResponse,
  IdentityDeriveParams,
  IdentityDeriveQueryParams,
  LoginUser,
  SendMessageStatelessRequest,
} from 'deso-protocol-types';
import {
  approveSignAndSubmit,
  callIdentityMethodAndExecute,
  getIframe,
} from './IdentityHelper';
import { iFrameHandler } from './WindowHandler';
import { Transactions } from '../transaction/Transaction';
import { convertExtraDataToHex } from '../../utils/utils';
import { BASE_IDENTITY_URI } from '../state/BaseUri';

export interface IdentityConfig {
  node: Node;
  uri?: string;
}

export class Identity {
  private node: Node;
  constructor(config: IdentityConfig) {
    this.node = config.node;
    this.setUri(config.uri ?? BASE_IDENTITY_URI);
  }

  public getUri(): string {
    return localStorage.getItem('identity_url') || BASE_IDENTITY_URI;
  }

  public setUri(uri: string): void {
    localStorage.setItem('identity_uri', uri);
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
      return key;
    }
    return null;
  }

  public async initialize(): Promise<any> {
    if (this.getIframe()) {
      return;
    }
    return new Promise((resolve) => {
      const windowHandler = (event: any) => {
        if (event.origin !== this.getUri()) {
          return;
        }
        if (event.data.method === 'initialize') {
          event.source.postMessage(
            {
              id: event.data.id,
              service: 'identity',
              payload: {},
            },
            this.getUri(),
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
    const prompt = requestLogin(accessLevel, this.getUri());
    const { key, user } = await iFrameHandler({
      iFrameMethod: 'login',
      data: { prompt },
    });
    localStorage.setItem('login_user', user);
    localStorage.setItem('login_key', key);
    return { user: JSON.parse(user), key };
  }

  public async logout(publicKey: string): Promise<boolean> {
    if (typeof publicKey !== 'string') {
      throw Error('publicKey needs to be type of string');
    }
    const prompt = requestLogout(publicKey, this.getUri());
    const successful = await iFrameHandler({
      iFrameMethod: 'logout',
      data: { prompt },
    });
    return successful;
  }

  public async derive(params: IdentityDeriveParams): Promise<DerivedPrivateUserInfo> {
    const queryParams: IdentityDeriveQueryParams = {
      callback: params.callback,
      testnet: params.testnet,
      webview: params.webview,
      publicKey: params.publicKey,
      transactionSpendingLimitResponse: params.transactionSpendingLimitResponse ? encodeURIComponent(JSON.stringify(params.transactionSpendingLimitResponse)) : undefined,
      derivedPublicKey: params.derivedPublicKey,
    };
    const prompt = requestDerive(queryParams, this.getUri());
    const derivedPrivateUser: DerivedPrivateUserInfo = await iFrameHandler({
      iFrameMethod: 'derive',
      data: { prompt },
    });
    return derivedPrivateUser;
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
    frame.setAttribute('src', `${this.getUri()}/embed?v=2`);
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

  public async submitTransaction(
    TransactionHex: string,
    extraData?: Omit<AppendExtraDataRequest, 'TransactionHex'>
  ) {
    if (extraData?.ExtraData && Object.keys(extraData?.ExtraData).length > 0) {
      TransactionHex = (
        await Transactions.appendExtraData({
          TransactionHex: TransactionHex,
          ExtraData: convertExtraDataToHex(extraData).ExtraData,
        })
      ).TransactionHex;
    }
    const user = this.getUser();
    // user exists no need to approve
    if (user) {
      return callIdentityMethodAndExecute(TransactionHex, 'sign');
    } else {
      // user does not exist  get approval
      return approveSignAndSubmit(TransactionHex, this.getUri());
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
