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
} from './constants';
import {
  decrypt,
  encrypt,
  getSignedJWT,
  keygen,
  publicKeyToBase58Check,
  signTx,
} from './crypto-utils';
import { ERROR_TYPES } from './error-types';
import {
  buildTransactionSpendingLimitResponse,
  compareTransactionSpendingLimits,
} from './permissions-utils';
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
  NOTIFICATION_EVENTS,
  StoredUser,
  SubscriberNotification,
  TransactionSpendingLimitResponseOptions,
} from './types';

export class Identity {
  /**
   * @private
   */
  #window: Window;

  /**
   * @private
   */
  #api: APIProvider;

  /**
   * @private
   */
  #identityURI: string = DEFAULT_IDENTITY_URI;

  /**
   * @private
   */
  #network: Network = 'mainnet';

  /**
   * @private
   */
  #nodeURI: string = DEFAULT_NODE_URI;

  /**
   * @private
   */
  #identityPopupWindow?: Window | null;

  /**
   * @private
   */
  #redirectURI?: string;

  /**
   * @private
   */
  #pendingWindowRequest?: Deferred & { event: NOTIFICATION_EVENTS };

  /**
   * @private
   */
  #defaultTransactionSpendingLimit: TransactionSpendingLimitResponse =
    DEFAULT_TRANSACTION_SPENDING_LIMIT;

  /**
   * @private
   */
  #appName = 'unkown';

  /**
   * @private
   */
  #jwtAlgorithm: jwtAlgorithm = 'ES256';

  /**
   * @private
   */
  #boundPostMessageListener?: (event: MessageEvent) => void;

  /**
   * @private
   */
  #subscriber?: (state: any) => void;

  /**
   * @private
   */
  #didConfigure = false;

  /**
   * The current internal state of identity. This is a combination of the
   * current user and all other users stored in local storage.
   * @private
   */
  get #state() {
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

  /**
   * @private
   */
  get #activePublicKey(): string | null {
    return this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.activePublicKey
    );
  }

  /**
   * @private
   */
  get #users(): Record<string, StoredUser> | null {
    const storedUsers = this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.identityUsers
    );
    return storedUsers && JSON.parse(storedUsers);
  }

  /**
   * @private
   */
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

  /**
   * Configures the identity instance. This should be called before any other
   * method calls, ideally before any app code is run.  The most important
   * configuration options are `spendingLimitOptions` and `appName`.
   * `spendingLimitOptions` is used to determine the default permissions that a
   * user will be asked to approve when logging into an app. `appName` is used
   * to identity derived keys issued by an app.
   *
   * See more about the spending limit options object here
   * https://docs.deso.org/for-developers/backend/blockchain-data/basics/data-types#transactionspendinglimitresponse
   *
   * And See an exhaustive list of transaction types here:
   * https://github.com/deso-protocol/core/blob/a836e4d2e92f59f7570c7a00f82a3107ec80dd02/lib/network.go#L244
   *
   * @example
   * ```typescript
   * import { identity } from '@deso/identity';
   *
   * identity.configure({
   *   spendingLimitOptions: {
   *     // NOTE: this value is in Deso nanos, 1000000000 nanos (or 1e9) = 1 Deso
   *     GlobalDESOLimit: 1 * 1e9 // 1 Deso
   *     // Map of transaction type to the number of times this derived key is
   *     // allowed to perform this operation on behalf of the owner public key
   *     TransactionCountLimitMap: {
   *       BASIC_TRANSFER: 2, // 2 basic transfer transactions are authorized
   *       SUBMIT_POST: 'UNLIMITED', // unlimited submit post transactions are authorized
   *     },
   *   }
   * });
   * ```
   */
  configure({
    identityURI = DEFAULT_IDENTITY_URI,
    network = 'mainnet',
    nodeURI = 'https://node.deso.org',
    spendingLimitOptions = DEFAULT_TRANSACTION_SPENDING_LIMIT,
    redirectURI,
    jwtAlgorithm = 'ES256',
  }: IdentityConfiguration) {
    this.#didConfigure = true;
    this.#identityURI = identityURI;
    this.#network = network;
    this.#nodeURI = nodeURI;
    this.#redirectURI = redirectURI;
    this.#jwtAlgorithm = jwtAlgorithm;
    this.#defaultTransactionSpendingLimit =
      buildTransactionSpendingLimitResponse(spendingLimitOptions);

    this.refreshDerivedKeyPermissions();
  }

  /**
   * Allows listening to changes to identity state. The subscriber will be
   * called with the new state any time a user logs in, logs out, approves a
   * derived key, etc. Apps can use this to sync their state with the identity
   * instance such that their application reacts to changes and re-renders
   * accordingly.
   *
   * NOTE: This method could be very chatty. Depending on the needs of your
   * application, you may want to implement some caching or memoization to
   * reduce any unnecessary re-renders or network calls.
   *
   * @example
   * ```typescript
   * identity.subscribe(({ event, currentUser, alternateUsers }) => {
   *   if (event === NOTIFICATION_EVENTS.AUTHORIZE_DERIVED_KEY_START) {
   *     // show a loading indicator while the underlying network call to authorize the derived key is made.
   *   }
   *
   *   if (event === NOTIFICATION_EVENTS.LOGIN_END) {
   *      // do something with currentUser
   *   }
   *
   *   // see and exhaustive list of events here: https://github.com/deso-protocol/deso-workspace/blob/a3c02742a342610bb6af8f2b1396d5430931cf41/libs/identity/src/lib/types.ts#L182
   * });
   * ```
   *
   * @param subscriber this is a callback that will be called with the current
   * state and the event that triggered the change.
   */
  subscribe(subscriber: (notification: SubscriberNotification) => void) {
    this.#subscriber = subscriber;
    this.#subscriber({ event: NOTIFICATION_EVENTS.SUBSCRIBE, ...this.#state });
  }

  /**
   * Returns the current underlying state of the identity instance. In general,
   * you should use the `subscribe` method to listen to changes to observe and
   * react to the state over time, but if you need a snapshot of the current
   * state you can use this method. Can be useful for debugging or setting up
   * initial state in your app.
   */
  snapshot(): {
    currentUser: StoredUser | null;
    alternateUsers: Record<string, StoredUser> | null;
  } {
    return this.#state;
  }

  /**
   * Starts a login flow. This will open a new window and prompt the user to
   * select an existing account or create a new account. If there is an error
   * during the login flow, the promise will reject with an error which you can
   * catch and handle in your app by showing some error feedback in the UI.
   *
   * @example
   * ```typescript
   * import { identity, ERROR_TYPES } from '@deso/identity';
   *
   *
   * await identity.login().catch((err) => {
   *   if (err.type === ERROR_TYPES.NO_MONEY) {
   *     // handle no money error
   *   } else {
   *     // handle other errors
   *   }
   * });
   * ```
   *
   * @returns returns a promise that resolves to the identity login
   * payload, or rejects if there was an error.
   */
  async login(
    { getFreeDeso }: LoginOptions = { getFreeDeso: true }
  ): Promise<IdentityDerivePayload> {
    const event = NOTIFICATION_EVENTS.LOGIN_START;
    this.#subscriber?.({
      event,
      ...this.#state,
    });

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
      this.#pendingWindowRequest = { resolve, reject, event };

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

  /**
   * Starts a logout flow. This will open a new window and prompt the user to
   * confirm they want to logout. Similar to the login flow, if there is an error
   * the returned promise will reject with an error which you can catch and handle.
   *
   * @example
   * ```typescript
   * import { identity } from '@deso/identity';
   *
   *
   * await identity.logout().catch((err) => {
   *   // handle errors
   * });
   * ```
   *
   * @returns returns a promise that resolves to undefined, or rejects if there
   * was an error.
   */
  logout(): Promise<undefined> {
    const event = NOTIFICATION_EVENTS.LOGOUT_START;
    this.#subscriber?.({ event, ...this.#state });
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject, event };
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

  /**
   * Signs a transaction hex using the derived key issued to the currently
   * active user when they logged into an application. The `TransactionHex`
   * parameter should come from a transaction object returned from a transaction
   * construction endpoint, such as the `submit-post` endpoint of the DeSo
   * backend api.
   *
   * We return a signed transaction hex value that can be used to submit a
   * transaction to the network for confirmation. This method is used internally
   * by the signAndSubmit method, which is a convenience method to sign and
   * submit a transaction in a single step. It can also be used as a standalone
   * method if you want to sign a transaction and submit it yourself.
   *
   *
   * @example
   * ```typescript
   * const signedTxHex = await identity.signTx(txHex);
   * ```
   */
  signTx(TransactionHex: string) {
    const { primaryDerivedKey } = this.#currentUser ?? {};

    if (!primaryDerivedKey?.derivedSeedHex) {
      // This *should* never happen, but just in case we throw here to surface any bugs.
      throw new Error('Cannot sign transaction without a derived seed hex');
    }

    return signTx(TransactionHex, primaryDerivedKey.derivedSeedHex, {
      isDerivedKey: true,
    });
  }

  /**
   * Submits a signed transaction to the network for confirmation. NOTE: you
   * must sign a transaction before submitting it. This method is used
   * internally by the `signAndSubmit` method, which is a convenience method to
   * sign and submit a transaction in a single step.
   *
   * @example
   * ```typescript
   * const submittedTx = await identity.submitTx(signedTxHex);
   * ```
   */
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
   * This is a convenience method to sign and submit a transaction in a single
   * step. It receives a transaction object and signs it using the derived key
   * issued to the currently logged in user. This can be chained with
   * transaction construction promises that return a transaction object such as
   * a promise that wraps the call to the `submit-post` endpoint of the DeSo
   * backend api.
   *
   * @example
   * ```typescript
   * const transactionObject = await myApiClient.post('https://node.deso.org/api/v0/submit-post', { ...data });
   *
   * await identity.signAndSubmit(transactionObject);
   * ```
   */
  async signAndSubmit(tx: { TransactionHex: string }) {
    return await this.submitTx(await this.signTx(tx.TransactionHex));
  }

  /**
   * @deprecated Use signAndSubmit instead. Since we don't support unauthorized
   * keys anymore, this is no longer necessary. It's only purpose was to
   * authorize a derived key if it wasn't already authorized and retry the
   * transaction.
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
        // if the derived key is not authorized
        // we try to authorize it and retry
        await this.#authorizePrimaryDerivedKey(
          primaryDerivedKey.publicKeyBase58Check
        );

        // reconstruct the original transaction and try again
        // this will throw if the previous authorization failed
        const tx = await constructTx();
        return this.submitTx(await this.signTx(tx.TransactionHex));
      }

      // just rethrow unexpected errors
      throw e;
    }
  }

  /**
   * Encrypt an arbitrary string using the sender's seed hex and the recipient's
   * public key. Typically this would make use of the sender's
   * messagingPrivateKey for building chat or messaging applications.
   *
   * @example
   * ```typescript
   * const message = "Hi, this is my first encrypted message!";
   *
   * const cipherText = await identity.encrypt(
   *   senderPrivateMessagingSeedHex,
   *   recipientPublicKeyBase58Check,
   *   message
   * );
   * ```
   */
  encrypt(
    senderSeedHex: string,
    recipientPublicKeyBase58Check: string,
    plaintext: string
  ): Promise<string> {
    return encrypt(senderSeedHex, recipientPublicKeyBase58Check, plaintext);
  }

  /**
   * Decrypt a hex encoded encrypted message using the recipient's private seed
   * hex and the sender's public key. Typically this would make use of the
   * recipient's messagingPrivateKey for building chat or messaging
   * applications.
   *
   * @example
   * ```typescript
   * const cipherTextHex = "df6f3ff4695edb569631af4494b9f05d86c7fb8572226a356e03678aa56b7875";
   *
   * const plaintext = await identity.decrypt(
   *   recipientPrivateMessagingSeedHex,
   *   senderPublicKeyBase58Check,
   *   cipherTextHex
   * );
   * ```
   */
  decrypt(
    recipientSeedHex: string,
    senderPublicKeyBase58Check: string,
    cipherTextHex: string
  ) {
    return decrypt(recipientSeedHex, senderPublicKeyBase58Check, cipherTextHex);
  }

  /**
   * Get a jwt token signed by the derived key issued to the currently active user. This can be used to pass to
   * authenticated endpoints on the DeSo backend api or to create authenticated endpoints on your own backend.
   * Typically this will be used to construct an Authorization header or pass as a parameter in a post body.
   *
   * @example
   * ```typescript
   * const token = await identity.jwt();
   *
   * const authHeaders = {
   *   Authorization: `Bearer ${token}`,
   * }
   *
   * myApiClient.post('https://myapi.com/some-authenticated-endpoint', { ...data }, { headers: authHeaders });
   * ```
   */
  async jwt() {
    const { primaryDerivedKey } = this.#currentUser ?? {};

    if (!primaryDerivedKey?.derivedSeedHex) {
      // This *should* never happen, but just in case we throw here to surface any bugs.
      throw new Error('Cannot sign jwt without a derived seed hex');
    }

    return getSignedJWT(primaryDerivedKey.derivedSeedHex, this.#jwtAlgorithm, {
      derivedPublicKeyBase58Check:
        primaryDerivedKey.derivedPublicKeyBase58Check,
      expiration: 60 * 10,
    });
  }

  /**
   * This method will open a new identity window with a options for getting deso
   * by verifying a phone number or buying/transferring deso anonymously for the
   * currently logged in user. NOTE: A user must already be logged in to use
   * this method.
   *
   * @example
   * ```typescript
   * await identity.getDeso();
   * ```
   */
  getDeso() {
    const event = NOTIFICATION_EVENTS.GET_FREE_DESO_START;
    this.#subscriber?.({ event, ...this.#state });
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject, event };
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

  /**
   * This method is very similar to getDeso, but it will only present the option
   * for verifying a phone number to get deso. Also requires a user to be logged in.
   *
   * @example
   * ```typescript
   * await identity.verifyPhoneNumber();
   * ```
   */
  verifyPhoneNumber() {
    const event = NOTIFICATION_EVENTS.VERIFY_PHONE_NUMBER_START;
    this.#subscriber?.({ event, ...this.#state });
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject, event };
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

  /**
   * This method will set the currently active user. This is useful for changing
   * accounts when a user has logged into an application with multiple accounts.
   * NOTE: This method will not trigger a login event, but, rather, it will do a
   * lookup on all the users that have already been logged in to find the user
   * with the matching public key.  If the key is not found, it will throw an
   * error. The users that are available to be set as active are provided via
   * the `alternateUsers` property on the state object.
   *
   * @example
   * ```typescript
   * identity.setActiveUser(someLoggedInPublicKey);
   * ```
   */
  setActiveUser(publicKey: string) {
    this.#setActiveUser(publicKey);
    this.#subscriber?.({
      event: NOTIFICATION_EVENTS.CHANGE_ACTIVE_USER,
      ...this.#state,
    });
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

  /**
   * Checks if a user's derived key has the permissions to perform a given
   * action or batch of actions. The permissions are passed in as an object with
   * the same shape as the `TransactionSpendingLimitResponseOptions` type, which
   * is the same as the `spendingLimitOptions` passed to the configure method.
   *
   * @example
   * Here we check if the user has the permissions to submit at least 1 post.
   *
   * ```typescript
   * const hasPermissions = identity.hasPermissions({
   *   TransactionCountLimitMap: {
   *     SUBMIT_POST: 1,
   *    },
   * });
   * ```
   */
  hasPermissions(
    permissionsToCheck: Partial<TransactionSpendingLimitResponseOptions>
  ): boolean {
    if (Object.keys(permissionsToCheck).length === 0)
      throw new Error('You must pass at least one permission to check');

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

  /**
   * This method will request permissions from the user to perform an action or
   * batch of actions. It will open an identity window and prompt the user to
   * approve the permissions requested. It also takes a
   * `TransactionSpendingLimitResponseOptions` object.
   *
   * @example
   *
   * ```typescript
   * await identity.requestPermissions({
   *   TransactionCountLimitMap: {
   *     SUBMIT_POST: 'UNLIMITED',
   *    },
   * });
   * ```
   */
  requestPermissions(
    transactionSpendingLimitResponse: Partial<TransactionSpendingLimitResponseOptions>
  ) {
    const { primaryDerivedKey } = this.#currentUser ?? {};
    if (!primaryDerivedKey) {
      throw new Error('Cannot request permissions without a logged in user');
    }

    const event = NOTIFICATION_EVENTS.REQUEST_PERMISSIONS_START;
    this.#subscriber?.({ event, ...this.#state });

    const { publicKeyBase58Check, derivedPublicKeyBase58Check } =
      primaryDerivedKey;
    return new Promise((resolve, reject) => {
      this.#pendingWindowRequest = { resolve, reject, event };

      const params = {
        derive: true,
        derivedPublicKey: derivedPublicKeyBase58Check,
        publicKey: publicKeyBase58Check,
        transactionSpendingLimitResponse: buildTransactionSpendingLimitResponse(
          transactionSpendingLimitResponse
        ),
      };

      this.#launchIdentity('derive', params);
    });
  }

  /**
   * @private
   */
  #authorizeDerivedKey(params: AuthorizeDerivedKeyRequest) {
    return this.#api.post(
      `${this.#nodeURI}/api/v0/authorize-derived-key`,
      params
    );
  }

  /**
   * @private
   */
  #setActiveUser(publicKey: string) {
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
  }

  /**
   * @private
   */
  #getErrorType(e: Error): ERROR_TYPES | undefined {
    if (
      e?.message?.indexOf(
        'Total input 0 is not sufficient to cover the spend amount'
      ) >= 0
    ) {
      return ERROR_TYPES.NO_MONEY;
    }

    return undefined;
  }

  /**
   * @private
   */
  async #authorizePrimaryDerivedKey(ownerPublicKey: string) {
    this.#subscriber?.({
      event: NOTIFICATION_EVENTS.AUTHORIZE_DERIVED_KEY_START,
      ...this.#state,
    });
    const users = this.#users;
    const primaryDerivedKey = users?.[ownerPublicKey]?.primaryDerivedKey;

    if (!primaryDerivedKey) {
      throw new Error(
        `No primary derived key found for user ${ownerPublicKey}`
      );
    }

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
      // TODO: figure out the best way to deal with these fields
      Memo: this.#window.location.hostname,
      AppName: this.#appName,
      TransactionFees: [],
      ExtraData: {},
    });

    const signedTx = await this.signTx(resp.TransactionHex);
    const result = await this.submitTx(signedTx);

    this.#subscriber?.({
      event: NOTIFICATION_EVENTS.AUTHORIZE_DERIVED_KEY_END,
      ...this.#state,
    });
    return result;
  }

  /**
   * @private
   */
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

  /**
   * @private
   */
  #handleIdentityResponse({ method, payload = {} }: IdentityResponse) {
    switch (method) {
      case 'derive':
        this.#handleDeriveMethod(payload as IdentityDerivePayload)
          .then((res) => {
            const state = this.#state;
            this.#subscriber?.({
              event:
                this.#pendingWindowRequest?.event ===
                NOTIFICATION_EVENTS.LOGIN_START
                  ? NOTIFICATION_EVENTS.LOGIN_END
                  : NOTIFICATION_EVENTS.REQUEST_PERMISSIONS_END,
              ...state,
            });
            this.#pendingWindowRequest?.resolve(res);
          })
          .catch((e) => {
            // if we're in a login flow just don't let the user log in if we
            // can't authorize their derived key.  we've already stored the user
            // in local storage before attempting to authorize, so we remove
            // their data.
            if (
              this.#pendingWindowRequest?.event ===
                NOTIFICATION_EVENTS.LOGIN_START &&
              this.#state.currentUser
            ) {
              this.#purgeUserDataForPublicKey(
                this.#state.currentUser.publicKey
              );
              this.#window.localStorage.removeItem(
                LOCAL_STORAGE_KEYS.activePublicKey
              );
            }
            this.#subscriber?.({
              event: NOTIFICATION_EVENTS.AUTHORIZE_DERIVED_KEY_FAIL,
              ...this.#state,
            });
            // propagate the error to the external caller
            this.#pendingWindowRequest?.reject(this.#getErrorInstance(e));
          });
        break;
      case 'login':
        this.#handleLoginMethod(payload as IdentityLoginPayload);
        break;
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  /**
   * @private
   */
  #handleLoginMethod(payload: IdentityLoginPayload) {
    // NOTE: this is a bit counterintuitive, but a missing publicKeyAdded
    // identifies this as a logout (even though the method is 'login'), and we
    // don't actually support login via the identity "login" method so don't
    // look for it here. We only support it via the "derive" method.
    if (!payload.publicKeyAdded) {
      const publicKey = this.#activePublicKey;

      if (!publicKey) {
        throw new Error('No active public key found');
      }

      this.#window.localStorage.removeItem(LOCAL_STORAGE_KEYS.activePublicKey);
      this.#purgeUserDataForPublicKey(publicKey);
      this.#subscriber?.({
        event: NOTIFICATION_EVENTS.LOGOUT_END,
        ...this.#state,
      });
      this.#pendingWindowRequest?.resolve(payload);

      // This condition identifies the "get deso" flow where a user did not
      // login, but was simply prompted to get some free deso. We really should
      // never get into this state since we now require a login to get free deso.
    } else if (
      payload.publicKeyAdded &&
      !payload.signedUp &&
      payload.publicKeyAdded === this.#activePublicKey
    ) {
      // const expectedEvent = NOTIFICATION_EVENTS.GET_FREE_DESO_START;
      let endEvent: NOTIFICATION_EVENTS;
      const startEvent = this.#pendingWindowRequest?.event;
      if (startEvent === NOTIFICATION_EVENTS.GET_FREE_DESO_START) {
        endEvent = NOTIFICATION_EVENTS.GET_FREE_DESO_END;
      } else if (startEvent === NOTIFICATION_EVENTS.VERIFY_PHONE_NUMBER_START) {
        endEvent = NOTIFICATION_EVENTS.VERIFY_PHONE_NUMBER_END;
      } else {
        throw new Error(`unexpected identity event: ${startEvent}`);
      }

      this.#authorizePrimaryDerivedKey(payload.publicKeyAdded)
        .then(() => {
          this.#pendingWindowRequest?.resolve(payload);
          this.#subscriber?.({
            event: endEvent,
            ...this.#state,
          });
        })
        .catch((e) => {
          this.#subscriber?.({
            event: NOTIFICATION_EVENTS.AUTHORIZE_DERIVED_KEY_FAIL,
            ...this.#state,
          });
          this.#pendingWindowRequest?.reject(this.#getErrorInstance(e));
        });
    } else {
      // not sure how we would get here, but lets log it just in case we haven't actually
      // handled all the cases.
      console.warn('unhandled identity login payload', payload);
    }
  }

  /**
   * @private
   */
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

  /**
   * @private
   */
  async #handleDeriveMethod(
    payload: IdentityDerivePayload
  ): Promise<IdentityDerivePayload> {
    const { primaryDerivedKey } = this.#currentUser ?? {};

    // NOTE: If we generated the keys and provided the derived public key,
    // identity will respond with an empty string in the derivedSeedHex field.
    // We don't want to inadvertently overwrite our derived seed hex with the
    // empty string, so we delete the field if it's empty.
    if (payload.derivedSeedHex === '') {
      delete payload.derivedSeedHex;
    }

    // we may or may not have a login key pair in localStorage. If we do, it means we
    // initiated a login flow.
    const maybeLoginKeyPair = this.#window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.loginKeyPair
    );
    // in the case of a login, we always clean up the login key pair from localStorage.
    this.#window.localStorage.removeItem(LOCAL_STORAGE_KEYS.loginKeyPair);

    // This means we're doing a derived key permissions upgrade for the current user (not a login).
    if (
      primaryDerivedKey &&
      primaryDerivedKey.publicKeyBase58Check === payload.publicKeyBase58Check &&
      primaryDerivedKey.derivedPublicKeyBase58Check ===
        payload.derivedPublicKeyBase58Check
    ) {
      this.#updateUser(payload.publicKeyBase58Check, {
        primaryDerivedKey: { ...primaryDerivedKey, ...payload },
      });

      return this.#authorizePrimaryDerivedKey(
        payload.publicKeyBase58Check
      ).then(() => payload);
    }

    // This means we're just switching to a user we already have in localStorage, we use the stored user bc they
    // may already have an authorized derived key that we can use.
    if (this.#users?.[payload.publicKeyBase58Check]) {
      this.#setActiveUser(payload.publicKeyBase58Check);
      // if the logged in user changes, we try to refresh the derived key permissions in the background
      // and just return the payload immediately.
      this.refreshDerivedKeyPermissions();
      return payload;

      // This means we're logging in a user we haven't seen yet
    } else if (maybeLoginKeyPair) {
      const { seedHex } = JSON.parse(maybeLoginKeyPair);
      this.#updateUser(payload.publicKeyBase58Check, {
        primaryDerivedKey: { ...payload, derivedSeedHex: seedHex },
      });

      return this.#authorizePrimaryDerivedKey(
        payload.publicKeyBase58Check
      ).then(() => ({
        ...payload,
        publicKeyAdded: payload.publicKeyBase58Check,
      }));
    }

    // NOTE: We should never get here since the previous conditions *should* be
    // exhaustive for current use cases. If we add use cases for alternate
    // derived keys besides the primary derived key, we'll need to add more
    // logic here.
    throw new Error(
      `unhandled derive flow with payload ${JSON.stringify(payload)}`
    );
  }

  /**
   * @private
   */
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

  /**
   * @private
   */
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

  /**
   * @private
   */
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

  /**
   * @private
   */
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

  /**
   * @private
   */
  #getErrorInstance(e: any): Error {
    const errorType = this.#getErrorType(e);
    if (!errorType) return e;

    return new DeSoCoreError(e.message, errorType, e);
  }
}

class DeSoCoreError extends Error {
  type: ERROR_TYPES;

  constructor(message: string, type: ERROR_TYPES, originalError: any = {}) {
    super(message);
    Object.assign(this, originalError);
    this.type = type;
    this.name = 'DeSoCoreError';
  }
}
