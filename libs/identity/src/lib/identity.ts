import {
  AuthorizeDerivedKeyRequest,
  TransactionSpendingLimitResponse,
} from 'deso-protocol-types';
import {
  DEFAULT_IDENTITY_URI,
  DEFAULT_NODE_URI,
  DEFAULT_PERMISSIONS as DEFAULT_TRANSACTION_SPENDING_LIMIT,
  IDENTITY_SERVICE_VALUE,
  LOCAL_STORAGE_KEYS,
  NO_MONEY_ERROR,
} from './constants';
import {
  decrypt,
  encrypt,
  getSignedJWT,
  keygen,
  publicKeyToBase58Check,
  signTx,
} from './crypto-utils';
import { compareTransactionSpendingLimits } from './permissions-utils';
import { parseQueryParams } from './query-param-utils';
import {
  APIProvider,
  Deferred,
  IdentityConfiguration,
  IdentityDerivePayload,
  IdentityLoginPayload,
  IdentityResponse,
  jwtAlgorithm,
  LoginOptions,
  Network,
  StoredUser,
} from './types';

export class Identity {
  #window: Window;
  #api: APIProvider;
  #identityURI: string = DEFAULT_IDENTITY_URI;
  #network: Network = 'mainnet';
  #nodeURI: string = DEFAULT_NODE_URI;
  #identityPopupWindow?: Window | null;
  #redirectURI?: string;
  #pendingWindowRequest?: Deferred;
  #defaultTransactionSpendingLimit: TransactionSpendingLimitResponse =
    DEFAULT_TRANSACTION_SPENDING_LIMIT;
  #appName = 'unkown';
  #jwtAlgorithm: jwtAlgorithm = 'ES256';
  #boundPostMessageListener?: (event: MessageEvent) => void;
  #subscriber?: (state: any) => void;
  #didConfigure = false;

  /**
   * The current internal state of identity. This is a combination of the
   * current user and all other users stored in local storage.
   */
  get state() {
    const allStoredUsers = this.#users;
    const activePublicKey = this.#activePublicKey;
    const currentUser = this.#currentUser;

    return {
      currentUser: currentUser && {
        ...currentUser,
        publicKey: currentUser.primaryDerivedKey.publicKeyBase58Check,
      },
      alternateUsers:
        allStoredUsers &&
        Object.keys(allStoredUsers).reduce((res, publicKey) => {
          if (publicKey !== activePublicKey) {
            res[publicKey] = allStoredUsers[publicKey];
          }
          return res;
        }, {} as Record<string, StoredUser>),
    };
  }

  get #activePublicKey(): string | null {
    return this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.activePublicKey
    );
  }

  get #users(): Record<string, StoredUser> | null {
    const storedUsers = this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.identityUsers
    );
    return storedUsers && JSON.parse(storedUsers);
  }

  get #currentUser(): StoredUser | null {
    const activePublicKey = this.#activePublicKey;

    if (!activePublicKey) {
      return null;
    }

    return (this.#users?.[activePublicKey] as StoredUser) ?? null;
  }

  constructor(windowProvider: Window, apiProvider: APIProvider) {
    this.#window = windowProvider;
    this.#api = apiProvider;

    // Check if the URL contains identity query params at startup
    const queryParams = new URLSearchParams(this.#window.location.search);

    if (queryParams.get('service') === IDENTITY_SERVICE_VALUE) {
      const initialResponse = parseQueryParams(queryParams);
      // Strip the identity query params from the URL. replaceState removes it from browser history
      this.#window.history.replaceState({}, '', this.#window.location.pathname);

      this.#handleIdentityResponse(initialResponse);
    }

    // TODO: figure out a better way to handle this. Maybe we have a separate .create method that
    // returns a new instance of Identity?
    setTimeout(() => {
      if (!this.#didConfigure) {
        this.refreshDerivedKeyPermissions();
      }
    }, 50);
  }

  configure({
    identityURI = DEFAULT_IDENTITY_URI,
    network = 'mainnet',
    nodeURI = 'https://node.deso.org',
    spendingLimitOptions = DEFAULT_TRANSACTION_SPENDING_LIMIT,
    redirectURI,
    jwtAlgorithm = 'ES256',
  }: IdentityConfiguration) {
    this.#identityURI = identityURI;
    this.#network = network;
    this.#nodeURI = nodeURI;
    this.#redirectURI = redirectURI;
    this.#jwtAlgorithm = jwtAlgorithm;
    const defaultOptions: TransactionSpendingLimitResponse = {
      ...DEFAULT_TRANSACTION_SPENDING_LIMIT,
    };

    // Add the AUTHORIZE_DERIVED_KEY permission if it's not already there
    // as a convenience
    if (
      typeof spendingLimitOptions.TransactionCountLimitMap?.[
        'AUTHORIZE_DERIVED_KEY'
      ] === 'undefined'
    ) {
      spendingLimitOptions.TransactionCountLimitMap = {
        AUTHORIZE_DERIVED_KEY: 1,
        ...spendingLimitOptions.TransactionCountLimitMap,
      };
    }

    if (spendingLimitOptions.IsUnlimited) {
      Object.keys(defaultOptions).forEach((key) => {
        const k = key as keyof TransactionSpendingLimitResponse;
        if (k === 'GlobalDESOLimit') {
          defaultOptions[k] = 0;
        } else {
          defaultOptions[k] = undefined;
        }
      });
    }
    this.#defaultTransactionSpendingLimit = {
      ...defaultOptions,
      ...spendingLimitOptions,
    };

    this.#didConfigure = true;
    this.refreshDerivedKeyPermissions();
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
    this.#subscriber(this.state);
  }

  /**
   * @returns returns a promise that resolves to the payload
   */
  async login(
    { getFreeDeso }: LoginOptions = { getFreeDeso: true }
  ): Promise<IdentityDerivePayload> {
    let derivedPublicKey: string;
    const loginKeyPair = this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.loginKeyPair
    );

    if (loginKeyPair) {
      derivedPublicKey = JSON.parse(loginKeyPair).publicKey;
    } else {
      const keys = keygen();
      derivedPublicKey = await publicKeyToBase58Check(keys.public, {
        network: this.#network,
      });
      this.#window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.loginKeyPair,
        JSON.stringify({
          publicKey: derivedPublicKey,
          seedHex: keys.seedHex,
        })
      );
    }

    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject };

      const identityParams: {
        derivedPublicKey: string;
        transactionSpendingLimitResponse: TransactionSpendingLimitResponse;
        derive: boolean;
        getFreeDeso?: boolean;
        expirationDays: number;
      } = {
        derive: true,
        derivedPublicKey,
        transactionSpendingLimitResponse: this.#defaultTransactionSpendingLimit,
        expirationDays: 3650, // 10 years. these login keys should essentially never expire.
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
      const publicKey = this.#activePublicKey;
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
    const { primaryDerivedKey } = this.#currentUser ?? {};

    if (!primaryDerivedKey?.derivedSeedHex) {
      // This *should* never happen, but just in case we throw here to surface any bugs.
      throw new Error('Cannot sign transaction without a derived seed hex');
    }

    return signTx(txHex, primaryDerivedKey.derivedSeedHex, {
      isDerivedKey: true,
    });
  }

  async submitTx(TransactionHex: string) {
    const res = await this.#api.post(
      `${this.#nodeURI}/api/v0/submit-transaction`,
      {
        TransactionHex,
      }
    );

    this.refreshDerivedKeyPermissions();

    return res;
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
      return await this.submitTx(await this.signTx(tx.TransactionHex));
    } catch (e: any) {
      // if the derived key is not authorized, authorize it and try again
      if (e?.message?.includes('RuleErrorDerivedKeyNotAuthorized')) {
        const { primaryDerivedKey } = this.#currentUser ?? {};
        if (!primaryDerivedKey) {
          throw new Error(
            'Cannot authorize derived key without a logged in user'
          );
        }
        await this.#authorizePrimaryDerivedKey(
          primaryDerivedKey.publicKeyBase58Check
        ).catch((e) => {
          throw e;
        });

        // reconstruct the original transaction and try again
        const tx = await constructTx();
        return this.submitTx(await this.signTx(tx.TransactionHex));
      }

      // just rethrow unexpected errors
      throw e;
    }
  }

  /**
   * @param senderSeedHex
   * @param recipientPublicKeyBase58Check
   * @param plaintext
   * @returns Hex encoded ciphertext
   */
  encrypt(
    senderSeedHex: string,
    recipientPublicKeyBase58Check: string,
    plaintext: string
  ): Promise<string> {
    return encrypt(senderSeedHex, recipientPublicKeyBase58Check, plaintext);
  }

  /**
   * @param recipientSeedHex
   * @param senderPublicKeyBase58Check
   * @param cipherTextHex
   * @returns plaintext
   */
  decrypt(
    recipientSeedHex: string,
    senderPublicKeyBase58Check: string,
    cipherTextHex: string
  ) {
    return decrypt(recipientSeedHex, senderPublicKeyBase58Check, cipherTextHex);
  }

  async jwt() {
    const { primaryDerivedKey } = this.#currentUser ?? {};

    if (!primaryDerivedKey?.derivedSeedHex) {
      // This *should* never happen, but just in case we throw here to surface any bugs.
      throw new Error('Cannot sign jwt without a derived seed hex');
    }

    // if the primary derived key is invalid this could mean several things (expired, revoked, unauthorized, etc).
    // we'll just try to authorize it and see if that fixes it. Is there a better way to handle this?
    if (!primaryDerivedKey.IsValid) {
      await this.#authorizePrimaryDerivedKey(
        primaryDerivedKey.publicKeyBase58Check
      ).catch((e) => {
        throw e;
      });
    }

    return getSignedJWT(primaryDerivedKey.derivedSeedHex, this.#jwtAlgorithm, {
      derivedPublicKeyBase58Check:
        primaryDerivedKey.derivedPublicKeyBase58Check,
      expiration: 60 * 10,
    });
  }

  getDeso() {
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject };
      const activePublicKey = this.#activePublicKey;

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
      const activePublicKey = this.#activePublicKey;

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
    if (!this.#users?.[publicKey]) {
      throw new Error(
        `No user found for public key. Known users: ${JSON.stringify(
          this.#users ?? {}
        )}`
      );
    }
    this.#window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.activePublicKey,
      publicKey
    );

    this.#subscriber?.(this.state);
  }

  authorizeDerivedKey(params: AuthorizeDerivedKeyRequest) {
    return this.#api.post(
      `${this.#nodeURI}/api/v0/authorize-derived-key`,
      params
    );
  }

  /**
   * Reloads the derived key permissions for the active user. NOTE: In general
   * consumers should not need to call this directly, but it is exposed for
   * advanced use cases. We call this internally any time derived key
   * permissions are updated, a transaction is submitted, or the logged in user
   * changes.
   * @returns void
   */
  async refreshDerivedKeyPermissions() {
    const { primaryDerivedKey } = this.#currentUser ?? {};

    if (!primaryDerivedKey) {
      // if we don't have a logged in user, we just bail
      return;
    }

    try {
      const resp = await this.#api.get(
        `${this.#nodeURI}/api/v0/get-single-derived-key/${
          primaryDerivedKey.publicKeyBase58Check
        }/${primaryDerivedKey.derivedPublicKeyBase58Check}`
      );

      this.#updateUser(primaryDerivedKey.publicKeyBase58Check, {
        primaryDerivedKey: {
          ...primaryDerivedKey,
          transactionSpendingLimits:
            resp.DerivedKey?.TransactionSpendingLimit ?? null,
          IsValid: !!resp.DerivedKey?.IsValid,
        },
      });
    } catch (e) {
      // TODO: handle this better?
      if (this.#window.location.hostname === 'localhost') {
        console.error(e);
      }
    }
  }

  hasPermissions(
    permissionsToCheck: Partial<TransactionSpendingLimitResponse>
  ): boolean {
    const { primaryDerivedKey } = this.#currentUser ?? {};

    // If the key is expired, unauthorized, or has no money we can't do anything with it
    if (!primaryDerivedKey?.IsValid) {
      return false;
    }

    // if the key has no spending limits, we can't do anything with it
    if (!primaryDerivedKey?.transactionSpendingLimits) {
      return false;
    }

    return compareTransactionSpendingLimits(
      permissionsToCheck,
      primaryDerivedKey.transactionSpendingLimits
    );
  }

  requestPermissions(
    transactionSpendingLimitResponse: Partial<TransactionSpendingLimitResponse>
  ) {
    const { primaryDerivedKey } = this.#currentUser ?? {};
    if (!primaryDerivedKey) {
      throw new Error('Cannot request permissions without a logged in user');
    }

    const { publicKeyBase58Check, derivedPublicKeyBase58Check } =
      primaryDerivedKey;
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject };

      if (
        typeof transactionSpendingLimitResponse.TransactionCountLimitMap?.[
          'AUTHORIZE_DERIVED_KEY'
        ] === 'undefined'
      ) {
        transactionSpendingLimitResponse.TransactionCountLimitMap = {
          AUTHORIZE_DERIVED_KEY: 1,
          ...transactionSpendingLimitResponse.TransactionCountLimitMap,
        };
      }

      const params = {
        derive: true,
        derivedPublicKey: derivedPublicKeyBase58Check,
        publicKey: publicKeyBase58Check,
        transactionSpendingLimitResponse,
      };

      this.#launchIdentity('derive', params);
    });
  }

  #parseDerivedKeyError(e: Error) {
    if (
      e?.message?.indexOf(
        'Total input 0 is not sufficient to cover the spend amount'
      ) >= 0
    ) {
      return NO_MONEY_ERROR;
    }
    return e.message;
  }

  async #authorizePrimaryDerivedKey(ownerPublicKey: string) {
    const users = this.#users;
    const primaryDerivedKey = users?.[ownerPublicKey]?.primaryDerivedKey;

    if (!primaryDerivedKey) {
      throw new Error(
        `No primary derived key found for user ${ownerPublicKey}`
      );
    }

    const resp = await this.authorizeDerivedKey({
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
      // TODO: figure out the best way to deal with these fields
      Memo: this.#window.location.hostname,
      AppName: this.#appName,
      TransactionFees: [],
      ExtraData: {},
    }).catch((e) => {
      throw new Error(this.#parseDerivedKeyError(e));
    });

    const signedTx = await this.signTx(resp.TransactionHex);
    const result = await this.submitTx(signedTx);

    return result;
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
      this.#identityPopupWindow?.close();
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
        this.#handleDeriveMethod(payload as IdentityDerivePayload).then(() => {
          this.#subscriber?.(this.state);
        });
        break;
      case 'login':
        this.#handleLoginMethod(payload as IdentityLoginPayload);
        this.#subscriber?.(this.state);
        break;
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  #handleLoginMethod(payload: IdentityLoginPayload) {
    // no publicKeyAdded means the user is logging out. We just remove their data from localStorage
    if (!payload.publicKeyAdded) {
      const publicKey = this.#activePublicKey;

      if (!publicKey) {
        throw new Error('No active public key found');
      }

      this.#window.localStorage.removeItem(LOCAL_STORAGE_KEYS.activePublicKey);
      this.#purgeUserDataForPublicKey(publicKey);
    } else {
      this.setActiveUser(payload.publicKeyAdded);
    }

    this.#pendingWindowRequest?.resolve(payload);
  }

  #purgeUserDataForPublicKey(publicKey: string) {
    const users = this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.identityUsers
    );
    if (users) {
      const usersObj = JSON.parse(users);
      delete usersObj[publicKey];
      if (Object.keys(usersObj).length === 0) {
        this.#window.localStorage.removeItem(LOCAL_STORAGE_KEYS.identityUsers);
      } else {
        this.#window.localStorage.setItem(
          LOCAL_STORAGE_KEYS.identityUsers,
          JSON.stringify(usersObj)
        );
      }
    }
  }

  #handleDeriveMethod(payload: IdentityDerivePayload): Promise<any> {
    const { primaryDerivedKey } = this.#currentUser ?? {};

    // NOTE: If we generated the keys and provided the derived public key,
    // identity will respond with an empty string in the derivedSeedHex field.
    // We don't want to inadvertently overwrite our derived seed hex with the
    // empty string, so we delete the field if it's empty.
    if (payload.derivedSeedHex === '') {
      delete payload.derivedSeedHex;
    }

    if (
      primaryDerivedKey &&
      primaryDerivedKey.publicKeyBase58Check === payload.publicKeyBase58Check &&
      primaryDerivedKey.derivedPublicKeyBase58Check ===
        payload.derivedPublicKeyBase58Check
    ) {
      this.#updateUser(payload.publicKeyBase58Check, {
        primaryDerivedKey: { ...primaryDerivedKey, ...payload },
      });
      // Attempt to authorize the derived key. If it fails due
      // to no money we don't care. We'll try again the next time the user
      // attempts to submit a tx.
      return this.#authorizePrimaryDerivedKey(payload.publicKeyBase58Check)
        .then(() => {
          this.#pendingWindowRequest?.resolve(payload);
        })
        .catch((e) => {
          if (this.#window.location.hostname === 'localhost') {
            this.#pendingWindowRequest?.reject(e);
          }
        });
    }

    const loginKeyPair = this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.loginKeyPair
    );
    // in the case of a login, we clean up the login key pair from localStorage.
    this.#window.localStorage.removeItem(LOCAL_STORAGE_KEYS.loginKeyPair);
    if (this.#users?.[payload.publicKeyBase58Check]) {
      this.setActiveUser(payload.publicKeyBase58Check);
      // if the logged in user changes, we try to refresh the derived key permissions.
      this.refreshDerivedKeyPermissions();
      return Promise.resolve();
    } else if (loginKeyPair) {
      const { seedHex } = JSON.parse(loginKeyPair);
      this.#updateUser(payload.publicKeyBase58Check, {
        primaryDerivedKey: { ...payload, derivedSeedHex: seedHex },
      });
      // Attempt to authorize the new derived key. If it fails due
      // to no money we don't care. We'll try again the next time the user
      // attempts to submit a tx.
      return this.#authorizePrimaryDerivedKey(payload.publicKeyBase58Check)
        .then(() => {
          this.#pendingWindowRequest?.resolve({
            ...payload,
            publicKeyAdded: payload.publicKeyBase58Check,
          });
        })
        .catch((e) => {
          if (this.#window.location.hostname === 'localhost') {
            this.#pendingWindowRequest?.reject(e);
          }
        });
    } else {
      this.#pendingWindowRequest?.resolve(payload);
      return Promise.resolve();
    }
  }

  #updateUser(masterPublicKey: string, attributes: Record<string, any>) {
    const users = this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.identityUsers
    );
    if (users) {
      const usersObj = JSON.parse(users);
      if (!usersObj[masterPublicKey]) {
        usersObj[masterPublicKey] = attributes;
      } else {
        usersObj[masterPublicKey] = {
          publicKey: masterPublicKey,
          ...usersObj[masterPublicKey],
          ...attributes,
        };
      }
      this.#window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify(usersObj)
      );
    } else {
      this.#window.localStorage.setItem(
        LOCAL_STORAGE_KEYS.identityUsers,
        JSON.stringify({
          [masterPublicKey]: { publicKey: masterPublicKey, ...attributes },
        })
      );
    }
    this.#window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.activePublicKey,
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
    if (this.#identityPopupWindow) {
      this.#identityPopupWindow.close();
    }

    const h = 1000;
    const w = 800;
    const y = window.outerHeight / 2 + window.screenY - h / 2;
    const x = window.outerWidth / 2 + window.screenX - w / 2;

    this.#identityPopupWindow = this.#window.open(
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
