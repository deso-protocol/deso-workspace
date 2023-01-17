import axios from 'axios';
import { TransactionSpendingLimitResponse } from 'deso-protocol-types';
import {
  DEFAULT_IDENTITY_URI,
  DEFAULT_NODE_URI,
  DEFAULT_PERMISSIONS as DEFAULT_TRANSACTION_SPENDING_LIMIT,
  IDENTITY_SERVICE_VALUE,
} from './constants';
import {
  getPublicKeyBase58Check,
  keygen,
  signJWT,
  signTx,
} from './crypto-utils';
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

const localStorageKeys = Object.freeze({
  lastLoggedInUser: 'deso_active_public_key',
  identityUsers: 'deso_identity_users',
  loginKeyPair: 'deso_login_key_pair',
});

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
  #defaultTransactionSpendingLimit: TransactionSpendingLimitResponse =
    DEFAULT_TRANSACTION_SPENDING_LIMIT;
  #boundPostMessageListener?: (event: MessageEvent) => void;
  #subscriber?: (state: any) => void;

  get activePublicKey(): string | null {
    return this.#window.localStorage.getItem(localStorageKeys.lastLoggedInUser);
  }

  get users(): Record<string, StoredUser> | null {
    const storedUsers = this.#window.localStorage.getItem(
      localStorageKeys.identityUsers
    );
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
    spendingLimitOptions = DEFAULT_TRANSACTION_SPENDING_LIMIT,
    redirectURI,
  }: IdentityConfiguration) {
    this.#identityURI = identityURI;
    this.#network = network;
    this.#nodeURI = nodeURI;
    this.#redirectURI = redirectURI;
    this.#defaultTransactionSpendingLimit = {
      ...DEFAULT_TRANSACTION_SPENDING_LIMIT,
      ...spendingLimitOptions,
    };
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
      permissions: DEFAULT_TRANSACTION_SPENDING_LIMIT,
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
        const keys = keygen();
        derivedPublicKey = getPublicKeyBase58Check(keys, {
          network: this.#network,
        });
        this.#window.localStorage.setItem(
          'desoLoginKeyPair',
          JSON.stringify({
            publicKey: derivedPublicKey,
            seedHex: keys.getPrivate().toString('hex'),
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
    return signTx(txHex, primaryDerivedKey.derivedSeedHex, {
      isDerivedKey: true,
    });
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
        await this.#authorizePrimaryDerivedKey(
          primaryDerivedKey.publicKeyBase58Check
        );

        // reconstruct the original transaction and try again
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

  async jwt() {
    const { primaryDerivedKey } = this.currentUser;

    if (!primaryDerivedKey) {
      throw new Error(
        'Cannot generate a jwt without a primary derived key. Is a user logged in?'
      );
    }

    // if the primary derived key has not been authorized, authorize it before we generate the jwt.
    if (!primaryDerivedKey.isAuthorized) {
      await this.#authorizePrimaryDerivedKey(
        primaryDerivedKey.publicKeyBase58Check
      );
    }

    return signJWT(primaryDerivedKey.derivedSeedHex, {
      derivedPublicKeyBase58Check:
        primaryDerivedKey.derivedPublicKeyBase58Check,
      expiration: 60 * 10,
    });
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
    this.#window.localStorage.setItem(
      localStorageKeys.lastLoggedInUser,
      publicKey
    );
  }

  authorizeDerivedKey(options: {
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

  #authorizePrimaryDerivedKey(ownerPublicKey: string) {
    const users = this.users;
    const primaryDerivedKey = users?.[ownerPublicKey]?.primaryDerivedKey;

    if (!primaryDerivedKey) {
      throw new Error(
        `No primary derived key found for user ${ownerPublicKey}`
      );
    }

    if (primaryDerivedKey.isAuthorized) {
      return Promise.resolve();
    }

    return this.authorizeDerivedKey({
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
    })
      .then((resp) => this.submitTx(this.signTx(resp.data.TransactionHex)))
      .then(() => {
        // mark the key as authorized
        if (users?.[ownerPublicKey]?.primaryDerivedKey) {
          users[ownerPublicKey].primaryDerivedKey.isAuthorized = true;
        }
        this.#window.localStorage.setItem(
          localStorageKeys.identityUsers,
          JSON.stringify(users)
        );
      });
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

      this.#window.localStorage.removeItem(localStorageKeys.lastLoggedInUser);
      this.#purgeUserDataForPublicKey(publicKey);
    } else {
      this.setActiveUser(payload.publicKeyAdded);
    }

    this.#pendingWindowRequest?.resolve(payload);
  }

  #purgeUserDataForPublicKey(publicKey: string) {
    const users = this.#window.localStorage.getItem(
      localStorageKeys.identityUsers
    );
    if (users) {
      const usersObj = JSON.parse(users);
      delete usersObj[publicKey];
      if (Object.keys(usersObj).length === 0) {
        this.#window.localStorage.removeItem(localStorageKeys.identityUsers);
      } else {
        this.#window.localStorage.setItem(
          localStorageKeys.identityUsers,
          JSON.stringify(usersObj)
        );
      }
    }
  }

  #handleDeriveMethod(payload: IdentityDerivePayload) {
    const loginKeyPair = this.#window.localStorage.getItem(
      localStorageKeys.loginKeyPair
    );

    if (this.users?.[payload.publicKeyBase58Check]) {
      this.setActiveUser(payload.publicKeyBase58Check);
      this.#window.localStorage.removeItem(localStorageKeys.loginKeyPair);
    } else if (loginKeyPair) {
      const { seedHex } = JSON.parse(loginKeyPair);
      this.#updateUser(payload.publicKeyBase58Check, {
        primaryDerivedKey: { ...payload, derivedSeedHex: seedHex },
      });
      // in the case of a login, we want to remove the login key pair from localStorage and patch the
      // publicKeyAdded field onto the payload
      this.#window.localStorage.removeItem(localStorageKeys.loginKeyPair);
      this.#pendingWindowRequest?.resolve({
        ...payload,
        publicKeyAdded: payload.publicKeyBase58Check,
      });
      // Attempt to authorize the new derived key. If it fails due
      // to no money we don't care. We'll try again the next time the user
      // attempts to submit a tx.
      this.#authorizePrimaryDerivedKey(payload.publicKeyBase58Check)
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
    const users = this.#window.localStorage.getItem(
      localStorageKeys.identityUsers
    );
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
      this.#window.localStorage.setItem(
        localStorageKeys.identityUsers,
        JSON.stringify(usersObj)
      );
    } else {
      this.#window.localStorage.setItem(
        localStorageKeys.identityUsers,
        JSON.stringify({ [masterPublicKey]: attributes })
      );
    }
    this.#window.localStorage.setItem(
      localStorageKeys.lastLoggedInUser,
      masterPublicKey
    );
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
