import {
  AppendExtraDataRequest,
  DerivedPrivateUserInfo,
  DeSoNetwork,
  GetDecryptMessagesRequest,
  GetDecryptMessagesResponse,
  IdentityDeriveParams,
  IdentityDeriveQueryParams,
  LoginUser,
  SendMessageStatelessRequest,
} from 'deso-protocol-types';
import { convertExtraDataToHex } from '../../utils/utils';
import { Node } from '../Node/Node';
import { BASE_IDENTITY_URI } from '../state/BaseUri';
import { Transactions } from '../transaction/Transaction';
import {
  approveSignAndSubmit,
  callIdentityMethodAndExecute,
  getIframe,
} from './IdentityHelper';
import { iFrameHandler } from './WindowHandler';
import { requestDerive, requestLogin, requestLogout } from './WindowPrompts';

export interface IdentityConfig {
  node: Node;
  uri?: string;
  network?: DeSoNetwork;
}

export class Identity {
  private node: Node;
  private network: DeSoNetwork;
  private identityUri = 'identity_uri';
  private loggedInUser: LoginUser | null = null;
  private loggedInKey = '';
  private transactions: Transactions;
  constructor(config: IdentityConfig, transactions: Transactions) {
    this.node = config.node;
    this.network = config.network || DeSoNetwork.mainnet;
    this.setUri(config.uri ?? BASE_IDENTITY_URI);
    this.transactions = transactions;
  }

  public getUri(): string {
    return this.identityUri;
  }

  public setUri(uri: string): void {
    this.identityUri = uri;
  }

  public getIframe(): HTMLIFrameElement {
    return getIframe();
  }

  public getUser(): LoginUser | null {
    return this.loggedInUser;
  }

  private setUser(user: LoginUser | null): void {
    this.loggedInUser = user;
  }

  public getUserKey(): string | null {
    return this.loggedInKey;
  }

  private setLoggedInKey(key: string) {
    this.loggedInKey = key;
  }
  //  end of getters/ setters

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
            this.getUri()
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
    const prompt = requestLogin(accessLevel, this.getUri(), this.isTestnet());
    const { key, user } = await iFrameHandler(
      {
        iFrameMethod: 'login',
        data: { prompt },
      },
      this.transactions
    );
    this.setUser(user);
    this.setLoggedInKey(key);
    return { user, key };
  }

  public async logout(publicKey: string): Promise<boolean> {
    if (typeof publicKey !== 'string') {
      throw Error('publicKey needs to be type of string');
    }
    const prompt = requestLogout(publicKey, this.getUri(), this.isTestnet());
    const successful = await iFrameHandler(
      {
        iFrameMethod: 'logout',
        data: { prompt },
      },
      this.transactions
    );
    this.setUser(null);
    this.setLoggedInKey('');
    return successful;
  }

  public async derive(
    params: IdentityDeriveParams
  ): Promise<DerivedPrivateUserInfo> {
    const queryParams: IdentityDeriveQueryParams = {
      callback: params.callback,
      webview: params.webview,
      publicKey: params.publicKey,
      transactionSpendingLimitResponse: params.transactionSpendingLimitResponse
        ? encodeURIComponent(
            JSON.stringify(params.transactionSpendingLimitResponse)
          )
        : undefined,
      derivedPublicKey: params.derivedPublicKey,
      deleteKey: params.deleteKey,
      expirationDays: params.expirationDays,
    };
    const prompt = requestDerive(queryParams, this.getUri(), this.isTestnet());
    const derivedPrivateUser: DerivedPrivateUserInfo = await iFrameHandler(
      {
        iFrameMethod: 'derive',
        data: { prompt },
      },

      this.transactions
    );
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
    frame.style.top = '0';
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
        await this.transactions.appendExtraData({
          TransactionHex: TransactionHex,
          ExtraData: convertExtraDataToHex(extraData).ExtraData,
        })
      ).TransactionHex;
    }
    const user = this.getUser();
    // user exists no need to approve
    if (user) {
      return callIdentityMethodAndExecute(
        TransactionHex,
        'sign',
        this.getUser(),
        this.transactions
      );
    } else {
      // user does not exist  get approval
      return approveSignAndSubmit(
        TransactionHex,
        this.getUri(),
        this.transactions,
        this.isTestnet()
      );
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
    return await callIdentityMethodAndExecute(
      encryptedMessages,
      'decrypt',
      this.getUser(),
      this.transactions
    );
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
    return await callIdentityMethodAndExecute(
      request,
      'encrypt',
      this.getUser(),
      this.transactions
    );
  }

  public async getJwt(): Promise<string> {
    let user = this.getUser();
    if (!user) {
      user = (await this.login()).user;
    }
    return await callIdentityMethodAndExecute(
      undefined,
      'jwt',
      this.getUser(),
      this.transactions
    );
  }
  private isTestnet(): boolean {
    return this.network === DeSoNetwork.testnet;
  }
}
