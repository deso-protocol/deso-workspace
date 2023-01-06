import { TransactionSpendingLimitResponse } from 'deso-protocol-types';
import { generateMnemonic, keygen } from './crypto-utils';
import { parseQueryParams } from './query-param-utils';
import { IdentityDerivePayload, IdentityResponse } from './types';

const DEFAULT_IDENTITY_URI = 'https://identity.deso.org';

// default is no permissions
const DEFAULT_PERMISSIONS = {
  GlobalDESOLimit: 0,
  TransactionCountLimitMap: {},
  CreatorCoinOperationLimitMap: {},
  DAOCoinOperationLimitMap: {},
  NFTOperationLimitMap: {},
  DAOCoinLimitOrderLimitMap: {},
};

// Class is only exported for testing purposes
export class Identity {
  #identityURI: string = DEFAULT_IDENTITY_URI;

  // used for DI in testing
  #window: Window;

  constructor({ windowFake }: { windowFake?: Window } = {}) {
    this.#window = windowFake || window;

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
  }: { identityURI?: string } = {}) {
    this.#identityURI = identityURI;
  }

  loginWithRedirect({
    redirectURI,
    permissions = DEFAULT_PERMISSIONS,
  }: {
    redirectURI: string;
    permissions?: TransactionSpendingLimitResponse;
  }) {
    const transactionSpendingLimitResponse = encodeURIComponent(
      JSON.stringify(permissions)
    );

    let derivedPublicKey: string;
    const existingRedirectKey =
      this.#window.localStorage.getItem('redirectDerivedKey');

    if (!existingRedirectKey) {
      const mnemonic = generateMnemonic();
      const { publicKeyBase58Check } = keygen(mnemonic);
      derivedPublicKey = publicKeyBase58Check;
      this.#window.localStorage.setItem(
        'redirectDerivedKey',
        JSON.stringify({
          publicKey: publicKeyBase58Check,
          mnemonic,
        })
      );
    } else {
      derivedPublicKey = JSON.parse(existingRedirectKey).publicKey;
    }

    this.#window.location.href = `${
      this.#identityURI
    }/derive?${new URLSearchParams({
      transactionSpendingLimitResponse,
      derivedPublicKey,
      redirect_uri: redirectURI,
    })}`;
  }

  // TODO: Implement this
  loginWithPopup() {
    return null;
  }

  #handleIdentityResponse({ method, payload = {} }: IdentityResponse) {
    switch (method) {
      case 'derive':
        this.#handleDeriveMethod(payload as IdentityDerivePayload);
        break;
      default:
        throw new Error(`Unknown method: ${method}`);
    }
    return null;
  }

  #handleDeriveMethod(payload: IdentityDerivePayload) {
    const redirectDerivedKey =
      this.#window.localStorage.getItem('redirectDerivedKey');
    if (redirectDerivedKey) {
      this.#window.localStorage.removeItem('redirectDerivedKey');
      const loggedInMasterKey = payload.publicKeyBase58Check;
      const { publicKey, mnemonic } = JSON.parse(redirectDerivedKey);
      this.#updateUser(loggedInMasterKey, { [publicKey]: mnemonic });
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
  }
}

// export an instance that can be imported and used immediately
export const identity = new Identity();
