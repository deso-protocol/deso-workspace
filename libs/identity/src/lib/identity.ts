import axios from 'axios';
import { TransactionSpendingLimitResponse } from 'deso-protocol-types';
import {
  DEFAULT_IDENTITY_URI,
  DEFAULT_NODE_URI,
  DEFAULT_PERMISSIONS,
  IDENTITY_SERVICE_VALUE,
} from './constants';
import { generateMnemonic, keygen, signJWT, signTx } from './crypto-utils';
import { parseQueryParams } from './query-param-utils';
import {
  Deferred,
  IdentityConfiguration,
  IdentityConstructorOptions,
  IdentityDerivePayload,
  IdentityLoginPayload,
  IdentityResponse,
  LoginOptions,
  Network,
  StoredUser,
} from './types';

// Class is only exported for testing purposes
export class Identity {
  // used for DI in testing
  #window: Window;
  #identityURI: string = DEFAULT_IDENTITY_URI;
  #network: Network = 'mainnet';
  #nodeURI: string = DEFAULT_NODE_URI;
  #identityWindow?: Window | null;
  #redirectURI?: string;
  #pendingWindowRequest?: Deferred;
  #boundPostMessageListener?: (event: MessageEvent) => void;
  #subscriber?: (state: any) => void;

  get activePublicKey(): string | null {
    return this.#window.localStorage.getItem('activePublicKey');
  }

  get users(): Record<string, StoredUser> | null {
    const storedUsers = this.#window.localStorage.getItem('desoUsers');
    return storedUsers && JSON.parse(storedUsers);
  }

  get currentUser(): StoredUser {
    const activePublicKey = this.activePublicKey;

    if (!activePublicKey) {
      throw new Error('Cannot get user without an active public key');
    }

    const currentUser = this.users?.[activePublicKey];

    if (!currentUser) {
      throw new Error(`No user found for public key: ${activePublicKey}`);
    }

    return currentUser as StoredUser;
  }

  get #state() {
    return {
      activePublicKey: this.activePublicKey,
      desoUsers: this.users,
    };
  }

  constructor(options?: IdentityConstructorOptions) {
    this.#window = options?.windowFake ?? window;

    // Check if the URL contains identity query params at startup
    const queryParams = new URLSearchParams(this.#window.location.search);

    if (queryParams.get('service') === IDENTITY_SERVICE_VALUE) {
      const initialResponse = parseQueryParams(queryParams);
      // Strip the identity query params from the URL. replaceState removes it from browser history
      this.#window.history.replaceState({}, '', this.#window.location.pathname);

      this.#handleIdentityResponse(initialResponse);
    }
  }

  configure({
    identityURI = DEFAULT_IDENTITY_URI,
    network = 'mainnet',
    nodeURI = 'https://node.deso.org',
    redirectURI,
  }: IdentityConfiguration) {
    this.#identityURI = identityURI;
    this.#network = network;
    this.#nodeURI = nodeURI;
    this.#redirectURI = redirectURI;
  }

  /**
   * Allows listening to changes to identity state. The subscriber will be
   * called with the new state any time a user logs in, logs out, approves a
   * derived key, etc.
   * @param subscriber
   * @returns
   */
  subscribe(subscriber: (state: any) => void) {
    this.#subscriber = subscriber;
    this.#subscriber(this.#state);
  }

  /**
   * @returns returns a promise that resolves to the payload
   */
  login(
    { permissions, getFreeDeso }: LoginOptions = {
      permissions: DEFAULT_PERMISSIONS,
      getFreeDeso: true,
    }
  ): Promise<IdentityDerivePayload> {
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject };
      let derivedPublicKey: string;
      const loginKeyPair =
        this.#window.localStorage.getItem('desoLoginKeyPair');

      if (loginKeyPair) {
        derivedPublicKey = JSON.parse(loginKeyPair).publicKey;
      } else {
        const mnemonic = generateMnemonic();
        const { publicKeyBase58Check } = keygen(mnemonic, {
          network: this.#network,
        });
        derivedPublicKey = publicKeyBase58Check;
        this.#window.localStorage.setItem(
          'desoLoginKeyPair',
          JSON.stringify({
            publicKey: publicKeyBase58Check,
            mnemonic,
          })
        );
      }

      const identityParams: {
        derivedPublicKey: string;
        transactionSpendingLimitResponse: TransactionSpendingLimitResponse;
        derive: boolean;
        getFreeDeso?: boolean;
      } = {
        derive: true,
        derivedPublicKey,
        transactionSpendingLimitResponse: permissions,
      };

      if (getFreeDeso) {
        identityParams.getFreeDeso = true;
      }

      this.#launchIdentity('derive', identityParams);
    });
  }

  logout(): Promise<IdentityLoginPayload> {
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject };
      const publicKey = this.activePublicKey;
      if (!publicKey) {
        this.#pendingWindowRequest.reject(
          new Error('cannot logout without an active public key')
        );
      } else {
        this.#launchIdentity('logout', { publicKey });
      }
    });
  }

  signTx(txHex: string) {
    const { primaryDerivedKey } = this.currentUser;
    const { keyPair } = keygen(primaryDerivedKey.mnemonic, {
      network: this.#network,
    });
    return signTx(txHex, keyPair, { isDerivedKey: true });
  }

  submitTx(TransactionHex: string) {
    return axios.post(`${this.#nodeURI}/api/v0/submit-transaction`, {
      TransactionHex,
    });
  }

  /**
   *
   * @param constructTx generic function for constructing a transaction. Should
   * return a promise that resolves to a transaction object.
   * @returns
   */
  async signAndSubmitTx(
    constructTx: () => Promise<{ TransactionHex: string }>
  ) {
    try {
      const tx = await constructTx();
      return await this.submitTx(this.signTx(tx.TransactionHex));
    } catch (e: any) {
      // if the derived key is not authorized, authorize it and try again
      if (
        e?.response?.data?.error?.includes('RuleErrorDerivedKeyNotAuthorized')
      ) {
        const { primaryDerivedKey } = this.currentUser;
        const resp = await this.#authorizeDerivedKey({
          OwnerPublicKeyBase58Check: primaryDerivedKey.publicKeyBase58Check,
          DerivedPublicKeyBase58Check:
            primaryDerivedKey.derivedPublicKeyBase58Check,
          ExpirationBlock: primaryDerivedKey.expirationBlock,
          AccessSignature: primaryDerivedKey.accessSignature,
          DeleteKey: false,
          DerivedKeySignature: false,
          MinFeeRateNanosPerKB: 1000,
          TransactionSpendingLimitHex:
            primaryDerivedKey.transactionSpendingLimitHex,
        });

        await this.submitTx(this.signTx(resp.data.TransactionHex));
        const tx = await constructTx();
        return this.submitTx(this.signTx(tx.TransactionHex));
      }

      // just rethrow unexpected errors
      throw e;
    }
  }

  encrypt() {
    throw new Error('Not implemented');
  }

  decrypt() {
    throw new Error('Not implemented');
  }

  jwt() {
    const { primaryDerivedKey } = this.currentUser;

    if (!primaryDerivedKey) {
      throw new Error('Cannot generate a jwt without a logged in user');
    }

    const { publicKeyBase58Check, keyPair } = keygen(
      primaryDerivedKey.mnemonic,
      { network: this.#network }
    );

    return signJWT(keyPair, {
      derivedPublicKeyBase58Check: publicKeyBase58Check,
      expiration: 60 * 10,
    });
  }

  /**
   * This wraps a request such that we can catch any derived key unauthorized
   * errors, authorize the key, and try the request again.  This is useful for
   * any requests that require a jwt but may be executed prior to any
   * transactions being submitted.
   * @param makeRequest function that takes a jwt and returns a promise that resolves to a response
   * @returns
   */
  async jwtRequest(makeRequest: (jwt: string) => Promise<any>): Promise<any> {
    const jwt = this.jwt();

    try {
      return await makeRequest(jwt);
    } catch (e: any) {
      if (
        e?.response?.data?.error?.includes('RuleErrorDerivedKeyNotAuthorized')
      ) {
        const { primaryDerivedKey } = this.currentUser;
        const resp = await this.#authorizeDerivedKey({
          OwnerPublicKeyBase58Check: primaryDerivedKey.publicKeyBase58Check,
          DerivedPublicKeyBase58Check:
            primaryDerivedKey.derivedPublicKeyBase58Check,
          ExpirationBlock: primaryDerivedKey.expirationBlock,
          AccessSignature: primaryDerivedKey.accessSignature,
          DeleteKey: false,
          DerivedKeySignature: false,
          MinFeeRateNanosPerKB: 1000,
          TransactionSpendingLimitHex:
            primaryDerivedKey.transactionSpendingLimitHex,
        });
        await this.submitTx(this.signTx(resp.data.TransactionHex));
        return makeRequest(jwt);
      }
    }
  }

  getDeso() {
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject };
      const activePublicKey = this.activePublicKey;

      if (!activePublicKey) {
        this.#pendingWindowRequest.reject(
          new Error('Cannot get free deso without a logged in user')
        );
        return;
      }

      this.#launchIdentity('get-deso', {
        publicKey: activePublicKey,
        getFreeDeso: true,
      });
    });
  }

  verifyPhoneNumber() {
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject };
      const activePublicKey = this.activePublicKey;

      if (!activePublicKey) {
        this.#pendingWindowRequest.reject(
          new Error('Cannon verify phone number without an active user')
        );
      }

      this.#launchIdentity('verify-phone-number', {
        public_key: activePublicKey,
      });
    });
  }

  setActiveUser(publicKey: string) {
    if (!this.users?.[publicKey]) {
      throw new Error(
        `No user found for public key. Known users: ${JSON.stringify(
          this.users ?? {}
        )}`
      );
    }
    this.#window.localStorage.setItem('activePublicKey', publicKey);
  }

  #authorizeDerivedKey(options: {
    OwnerPublicKeyBase58Check: string;
    DerivedPublicKeyBase58Check: string;
    ExpirationBlock: number;
    AccessSignature: string;
    DeleteKey: boolean;
    DerivedKeySignature: boolean;
    MinFeeRateNanosPerKB: number;
    TransactionSpendingLimitHex: string;
  }) {
    return axios.post(`${this.#nodeURI}/api/v0/authorize-derived-key`, options);
  }

  #handlePostMessage(ev: MessageEvent) {
    if (
      ev.origin !== this.#identityURI ||
      ev.data.service !== IDENTITY_SERVICE_VALUE ||
      ev.source === null
    ) {
      return;
    }

    if (ev.data.method === 'initialize') {
      ev.source.postMessage(
        {
          id: ev.data.id,
          service: IDENTITY_SERVICE_VALUE,
          payload: {},
        },
        this.#identityURI as WindowPostMessageOptions
      );
    } else {
      this.#handleIdentityResponse(ev.data);
      this.#identityWindow?.close();
      if (this.#boundPostMessageListener) {
        this.#window.removeEventListener(
          'message',
          this.#boundPostMessageListener
        );
      }
      this.#boundPostMessageListener = undefined;
    }
  }

  #handleIdentityResponse({ method, payload = {} }: IdentityResponse) {
    switch (method) {
      case 'derive':
        this.#handleDeriveMethod(payload as IdentityDerivePayload);
        break;
      case 'login':
        this.#handleLoginMethod(payload as IdentityLoginPayload);
        break;
      default:
        throw new Error(`Unknown method: ${method}`);
    }
    this.#subscriber?.(this.#state);
  }

  #handleLoginMethod(payload: IdentityLoginPayload) {
    // no publicKeyAdded means the user is logging out. We just remove their data from localStorage
    if (!payload.publicKeyAdded) {
      const publicKey = this.activePublicKey;

      if (!publicKey) {
        throw new Error('No active public key found');
      }

      this.#window.localStorage.removeItem('activePublicKey');
      this.#purgeUserDataForPublicKey(publicKey);
    } else {
      this.setActiveUser(payload.publicKeyAdded);
    }

    this.#pendingWindowRequest?.resolve(payload);
  }

  #purgeUserDataForPublicKey(publicKey: string) {
    const users = this.#window.localStorage.getItem('desoUsers');
    if (users) {
      const usersObj = JSON.parse(users);
      delete usersObj[publicKey];
      if (Object.keys(usersObj).length === 0) {
        this.#window.localStorage.removeItem('desoUsers');
      } else {
        this.#window.localStorage.setItem(
          'desoUsers',
          JSON.stringify(usersObj)
        );
      }
    }
  }

  #handleDeriveMethod(payload: IdentityDerivePayload) {
    const loginKeyPair = this.#window.localStorage.getItem('desoLoginKeyPair');

    if (this.users?.[payload.publicKeyBase58Check]) {
      this.setActiveUser(payload.publicKeyBase58Check);
    } else {
      let mnemonic = '';
      if (loginKeyPair) {
        const parsedKeyPair = JSON.parse(loginKeyPair);
        mnemonic = parsedKeyPair.mnemonic;
      }

      this.#updateUser(payload.publicKeyBase58Check, {
        primaryDerivedKey: { ...payload, mnemonic },
      });
    }

    if (loginKeyPair) {
      // in the case of a login, we want to remove the login key pair from localStorage and patch the
      // publicKeyAdded field onto the payload
      this.#window.localStorage.removeItem('desoLoginKeyPair');
      this.#pendingWindowRequest?.resolve({
        ...payload,
        publicKeyAdded: payload.publicKeyBase58Check,
      });
      // Attempt to authorize the new derived key. If it fails due
      // to no money we don't care. We'll try again the next time the user
      // attempts to submit a tx.
      this.#authorizeDerivedKey({
        OwnerPublicKeyBase58Check: payload.publicKeyBase58Check,
        DerivedPublicKeyBase58Check: payload.derivedPublicKeyBase58Check,
        ExpirationBlock: payload.expirationBlock,
        AccessSignature: payload.accessSignature,
        DeleteKey: false,
        DerivedKeySignature: false,
        MinFeeRateNanosPerKB: 1000,
        TransactionSpendingLimitHex: payload.transactionSpendingLimitHex,
      })
        .then((resp) => this.submitTx(this.signTx(resp.data.TransactionHex)))
        .catch(console.warn)
        .finally(() => {
          this.#pendingWindowRequest?.resolve({
            ...payload,
            publicKeyAdded: payload.publicKeyBase58Check,
          });
        });
    } else {
      this.#pendingWindowRequest?.resolve(payload);
    }
  }

  #updateUser(masterPublicKey: string, attributes: Record<string, any>) {
    const users = this.#window.localStorage.getItem('desoUsers');
    if (users) {
      const usersObj = JSON.parse(users);
      if (!usersObj[masterPublicKey]) {
        usersObj[masterPublicKey] = attributes;
      } else {
        usersObj[masterPublicKey] = {
          ...usersObj[masterPublicKey],
          ...attributes,
        };
      }
      this.#window.localStorage.setItem('desoUsers', JSON.stringify(usersObj));
    } else {
      this.#window.localStorage.setItem(
        'desoUsers',
        JSON.stringify({ [masterPublicKey]: attributes })
      );
    }
    this.#window.localStorage.setItem('activePublicKey', masterPublicKey);
  }

  #buildQueryParams(paramsPojo: Record<string, any>) {
    const qps = new URLSearchParams(
      Object.entries(paramsPojo).reduce((acc, [k, v]) => {
        acc[k] =
          typeof v === 'object' && v !== null
            ? encodeURIComponent(JSON.stringify(v))
            : v;
        return acc;
      }, {} as Record<string, any>)
    );

    if (this.#network === 'testnet') {
      qps.append('testnet', 'true');
    }

    if (this.#redirectURI) {
      qps.append('redirect_uri', this.#redirectURI);
    }

    return qps;
  }

  #openIdentityPopup(url: string) {
    if (this.#identityWindow) {
      this.#identityWindow.close();
    }

    const h = 1000;
    const w = 800;
    const y = window.outerHeight / 2 + window.screenY - h / 2;
    const x = window.outerWidth / 2 + window.screenX - w / 2;

    this.#identityWindow = this.#window.open(
      url,
      undefined,
      `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`
    );
  }

  #launchIdentity(path: string, params: Record<string, any>) {
    const qps = this.#buildQueryParams(params);
    const url = `${this.#identityURI}/${path.replace(/^\//, '')}?${qps}`;

    if (qps.get('redirect_uri')) {
      this.#window.location.href = url;
    } else {
      // if we had a previously attached listener, remove it and create a new one.
      if (this.#boundPostMessageListener) {
        this.#window.removeEventListener(
          'message',
          this.#boundPostMessageListener
        );
      }
      this.#boundPostMessageListener = this.#handlePostMessage.bind(this);
      this.#window.addEventListener('message', this.#boundPostMessageListener);
      this.#openIdentityPopup(url);
    }
  }
}

// export an instance that can be imported and used immediately
export const identity = new Identity();
