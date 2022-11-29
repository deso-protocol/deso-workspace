import {
  AppendExtraDataRequest,
  DerivedPrivateUserInfo,
  DeSoNetwork,
  GetDecryptMessagesRequest,
  GetDecryptMessagesResponse,
  IdentityDeriveParams,
  IdentityDeriveQueryParams,
  LoginUser,
  RequestOptions,
  SendMessageStatelessRequest,
} from 'deso-protocol-types';
import { convertExtraDataToHex } from '../../utils/Utils';
import { Node } from '../Node/Node';
import { BASE_IDENTITY_URI } from '../state/BaseUri';
import { Transactions } from '../transaction/Transaction';
import {
  approveSignAndSubmit,
  callIdentityMethodAndExecute,
  getIframe,
} from './IdentityHelper';
import { iFrameHandler } from './WindowHandler';
import {
  requestDerive,
  requestLogin,
  requestLogout,
  requestPhoneVerification,
  WindowFeatures,
} from './WindowPrompts';
const SERVER_ERROR: Readonly<string> =
  'You cannot call identity Iframe in a sever application, in the options parameter set broadcast to false';
export interface IdentityConfig {
  node: Node;
  uri?: string;
  network?: DeSoNetwork;
  host?: 'browser' | 'server';
}

let deferredOnReady: (value: unknown) => void;
const onReady = new Promise((resolve) => {
  deferredOnReady = resolve;
});

export class Identity {
  private node: Node;
  private network: DeSoNetwork;
  private identityUri = BASE_IDENTITY_URI;
  private loggedInUser: LoginUser | null = null;
  private loggedInUsers: { [k: string]: LoginUser } = {};
  private loggedInKey = '';
  private transactions: Transactions;
  private storageGranted = false;
  public host: 'browser' | 'server';
  constructor(
    { host = 'browser', node, network, uri }: IdentityConfig,
    transactions: Transactions
  ) {
    this.host = host;
    this.node = node;
    this.network = network || DeSoNetwork.mainnet;
    this.transactions = transactions;
    if (this.host === 'browser') {
      const user = localStorage.getItem('deso_user');
      const users = localStorage.getItem('deso_users');
      const key = localStorage.getItem('deso_user_key');
      if (user) {
        this.setUser(JSON.parse(user));
      }
      if (users) {
        this.setUsers(JSON.parse(users));
      }
      if (key) {
        this.setLoggedInKey(key);
      }
    }
    this.setUri(uri ?? BASE_IDENTITY_URI);
  }

  public getUri(): string {
    return this.identityUri;
  }

  public setUri(uri: string): void {
    this.identityUri = uri;
    if (this.host === 'browser') {
      localStorage.setItem('deso_identity_uri', this.identityUri);
    }
  }

  // Returns a promise that resolves when deso identity is fully initialized and
  // granted the required storage access.  Useful for delaying work until after
  // it's known that the users browser is supported. Note that storage access is
  // only checked if their is a logged in user. Otherwise, we check it when the
  // user attempts to log in.
  public async onReady(): Promise<unknown> {
    return onReady;
  }

  public getIframe(): HTMLIFrameElement {
    return getIframe();
  }

  public getUser(): LoginUser | null {
    return this.loggedInUser;
  }

  private setUser(user: LoginUser | null): void {
    this.loggedInUser = user;
    if (this.host === 'browser') {
      localStorage.setItem('deso_user', JSON.stringify(user));
    }
  }

  public getUsers(): { [k: string]: LoginUser } | null {
    return this.loggedInUsers;
  }

  private setUsers(users: { [k: string]: LoginUser }): void {
    this.loggedInUsers = users;
    if (this.host === 'browser') {
      localStorage.setItem('deso_users', JSON.stringify(users));
    }
  }

  public getUserKey(): string | null {
    return this.loggedInKey;
  }

  private setLoggedInKey(key: string) {
    this.loggedInKey = key;
    if (this.host === 'browser') {
      localStorage.setItem('deso_user_key', key);
    }
  }
  //  end of getters/ setters

  public async initialize(): Promise<any> {
    if (this.host === 'server') throw Error(SERVER_ERROR);

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
        }
      };
      window.addEventListener('message', windowHandler);
      resolve(deferredOnReady(this.setIdentityFrame(true)));
    });
  }

  public async phoneVerification(
    accessLevel = '4',
    windowFeatures?: WindowFeatures,
    queryParams?: { [key: string]: string | boolean }
  ): Promise<void> {
    if (this.host === 'server') throw Error(SERVER_ERROR);

    if (!this.storageGranted) {
      await this.guardFeatureSupport();
    }

    const prompt = requestPhoneVerification(
      accessLevel,
      this.getUri(),
      this.isTestnet(),
      windowFeatures,
      queryParams
    );
    // while not the login method the login event fires off after a user clicks skip
    // To let the app know when this case occurs we listen to the click and then close the window
    await iFrameHandler(
      {
        iFrameMethod: 'login',
        data: { prompt },
      },
      this.transactions
    );
  }
  public async login(
    accessLevel = '4',
    windowFeatures?: WindowFeatures,
    queryParams?: { [key: string]: string }
  ): Promise<{
    user: LoginUser;
    key: string;
    users: { [k: string]: LoginUser };
  }> {
    if (this.host === 'server') throw Error(SERVER_ERROR);

    if (!this.storageGranted) {
      await this.guardFeatureSupport();
    }

    const prompt = requestLogin(
      accessLevel,
      this.getUri(),
      this.isTestnet(),
      windowFeatures,
      queryParams
    );
    const { key, user, users } = await iFrameHandler(
      {
        iFrameMethod: 'login',
        data: { prompt },
      },
      this.transactions
    );
    this.setUser(user);
    this.setUsers(users);
    this.setLoggedInKey(key);
    return { user, key, users };
  }

  public async logout(
    publicKey: string,
    windowFeatures?: WindowFeatures
  ): Promise<boolean> {
    if (this.host === 'server') throw Error(SERVER_ERROR);
    if (typeof publicKey !== 'string') {
      throw Error('publicKey needs to be type of string');
    }
    const prompt = requestLogout(
      publicKey,
      this.getUri(),
      this.isTestnet(),
      windowFeatures
    );
    const { key, user, users } = await iFrameHandler(
      {
        iFrameMethod: 'logout',
        data: { prompt },
      },
      this.transactions
    );
    this.setUser(user);
    this.setUsers(users);
    this.setLoggedInKey(key);
    return !key;
  }

  public async derive(
    params: IdentityDeriveParams,
    windowFeatures?: WindowFeatures
  ): Promise<DerivedPrivateUserInfo> {
    if (this.host === 'server') throw Error(SERVER_ERROR);
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
    const prompt = requestDerive(
      queryParams,
      this.getUri(),
      this.isTestnet(),
      windowFeatures
    );
    const derivedPrivateUser: DerivedPrivateUserInfo = await iFrameHandler(
      {
        iFrameMethod: 'derive',
        data: { prompt },
      },

      this.transactions
    );
    return derivedPrivateUser;
  }

  private async setIdentityFrame(
    createNewIdentityFrame = false
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.host === 'server') throw Error(SERVER_ERROR);
      let frame = document.getElementById('identity');
      if (frame && createNewIdentityFrame) {
        frame.remove();
      }
      if (!createNewIdentityFrame) {
        resolve(true);
      }
      frame = document.createElement('iframe');
      frame.setAttribute('src', `${this.getUri()}/embed?v=2`);
      frame.setAttribute('id', 'identity');
      frame.style.width = '100%';
      frame.style.height = '100vh';
      frame.style.position = 'fixed';
      frame.style.zIndex = '1000';
      frame.style.display = 'none';
      frame.style.left = '0';
      frame.style.right = '0';
      frame.style.top = '0';

      frame.addEventListener('error', reject);

      frame.addEventListener('load', () => {
        if (this.getUserKey()) {
          resolve(this.guardFeatureSupport());
        } else {
          resolve(true);
        }
      });
      const root = document.getElementsByTagName('body')[0];
      if (root && frame) {
        root.appendChild(frame);
      }
    });
  }

  private async guardFeatureSupport(): Promise<boolean> {
    const payload = await callIdentityMethodAndExecute(
      undefined,
      'info',
      this.getUser(),
      this.transactions
    );
    if (!payload.hasStorageAccess || !payload.browserSupported) {
      const iframe = getIframe();
      iframe.style.display = 'block';
      const storageGranted = await iFrameHandler(
        {
          iFrameMethod: 'storageGranted',
        },
        this.transactions
      );

      if (storageGranted) {
        this.storageGranted = true;
        iframe.style.display = 'none';
      }
    }
    return true;
  }

  public async submitTransaction(
    TransactionHex: string,
    options: RequestOptions = { broadcast: this.host === 'browser' },
    extraData?: Omit<AppendExtraDataRequest, 'TransactionHex'>
  ) {
    // don't submit the transaction, instead just return the api response from the
    // previous call
    if (options?.broadcast === false) return;
    // server app? then you can't call the iframe
    if (this.host === 'server') throw Error(SERVER_ERROR);
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
        user,
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
    if (this.host === 'server') throw Error(SERVER_ERROR);
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
    if (this.host === 'server') throw Error(SERVER_ERROR);
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
    if (this.host === 'server') throw Error(SERVER_ERROR);
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

  public changeUser(key: string): void {
    if (!this.loggedInUsers[key]) {
      throw Error('public key is not found in logged in users');
    }

    this.setUser(this.loggedInUsers[key]);
    this.setLoggedInKey(key);
  }
}
