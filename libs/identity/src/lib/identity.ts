import axios from 'axios';
import { TransactionSpendingLimitResponse } from 'deso-protocol-types';
import { generateMnemonic, keygen, sign } from './crypto-utils';
import { parseQueryParams } from './query-param-utils';
import {
  IdentityConfiguration,
  IdentityDerivePayload,
  IdentityResponse,
  Network,
} from './types';

const DEFAULT_IDENTITY_URI = 'https://identity.deso.org';
const DEFAULT_NODE_URI = 'https://node.deso.org';

// default is no permissions
const DEFAULT_PERMISSIONS = {
  IsUnlimited: true,
  GlobalDESOLimit: 0,
  TransactionCountLimitMap: {},
  CreatorCoinOperationLimitMap: {},
  DAOCoinOperationLimitMap: {},
  NFTOperationLimitMap: {},
  DAOCoinLimitOrderLimitMap: {},
};

interface IdentityConstructorOptions {
  windowFake: Window;
}

interface LoginOptions {
  permissions: TransactionSpendingLimitResponse;
}

type StoredUser = {
  primaryDerivedKey: IdentityDerivePayload & { mnemonic: string };
};

interface IdentityUser {
  accessLevel: number;
  accessLevelHmac: string;
  btcDepositAddress: string;
  encryptedSeedHex: string;
  ethDepositAddress: string;
  derivedPublicKeyBase58Check?: string;
  hasExtraText: boolean;
  network: string;
  version: number;
}

interface IdentityLoginPayload {
  users: Record<string, IdentityUser>;
  publicKeyAdded: string;
}

// Class is only exported for testing purposes
export class Identity {
  // used for DI in testing
  #window: Window;
  #identityURI: string = DEFAULT_IDENTITY_URI;
  #network: Network = 'mainnet';
  #nodeURI: string = DEFAULT_NODE_URI;
  #identityWindow?: Window | null;

  #redirectURI?: string;

  get activePublicKey() {
    return this.#window.localStorage.getItem('activePublicKey');
  }

  get users() {
    return JSON.parse(this.#window.localStorage.getItem('desoUsers') ?? '{}');
  }

  get currentUser() {
    const activePublicKey = this.activePublicKey;

    if (!activePublicKey) {
      throw new Error('Cannot get user without an active public key');
    }

    const currentUser = this.users[activePublicKey];

    if (!currentUser) {
      throw new Error(`No user found for public key: ${activePublicKey}`);
    }

    return currentUser as StoredUser;
  }

  constructor(options?: IdentityConstructorOptions) {
    this.#window = options?.windowFake ?? window;

    // Check if the URL contains identity query params at startup
    const queryParams = new URLSearchParams(this.#window.location.search);

    if (queryParams.get('service') === 'identity') {
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

  login({ permissions }: LoginOptions = { permissions: DEFAULT_PERMISSIONS }) {
    let derivedPublicKey: string;
    const loginKeyPair = this.#window.localStorage.getItem('desoLoginKeyPair');

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

    this.#launchIdentity('derive', {
      derivedPublicKey,
      transactionSpendingLimitResponse: permissions,
    });
  }

  logout() {
    const publicKey = this.activePublicKey;
    this.#launchIdentity('logout', { publicKey });
  }

  sign(txHex: string) {
    const { primaryDerivedKey } = this.currentUser;
    const { keyPair } = keygen(primaryDerivedKey.mnemonic, {
      network: this.#network,
    });
    return sign(txHex, keyPair, { isDerivedKey: true });
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
      return await this.submitTx(this.sign(tx.TransactionHex));
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

        await this.submitTx(this.sign(resp.data.TransactionHex));
        const tx = await constructTx();
        return this.submitTx(this.sign(tx.TransactionHex));
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
    throw new Error('Not implemented');
  }

  setActiveUser(publicKey: string) {
    if (!this.users[publicKey]) {
      throw new Error(
        `No user found for public key. Known users: ${JSON.stringify(
          this.users
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
    return null;
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
    }
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
    const desoLoginKeyPair =
      this.#window.localStorage.getItem('desoLoginKeyPair');
    let mnemonic = '';
    if (desoLoginKeyPair) {
      const parsedKeyPair = JSON.parse(desoLoginKeyPair);
      mnemonic = parsedKeyPair.mnemonic;
      this.#window.localStorage.removeItem('desoLoginKeyPair');
    }

    this.#updateUser(payload.publicKeyBase58Check, {
      primaryDerivedKey: { ...payload, mnemonic },
    });
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
      this.#openIdentityPopup(url);
    }
  }
}

// export an instance that can be imported and used immediately
export const identity = new Identity();
