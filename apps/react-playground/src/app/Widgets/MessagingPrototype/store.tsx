import {
  AuthorizeDerivedKeyResponse,
  LoginUser,
  MessagingGroupEntryResponse,
} from 'deso-protocol-types';
import {
  DEFAULT_KEY,
  DERIVED_SEED_HEX,
  ENCRYPTED_APPLICATION_GROUP_MESSAGING_PRIVATE_KEY,
  localStorageKeys,
} from './constants';
//login
export const setLoginResponse = (defaultKey: LoginUser) => {
  localStorage.setItem(DEFAULT_KEY, JSON.stringify(defaultKey));
};
export const getLoginResponse = () => {
  return JSON.parse(localStorage.getItem(DEFAULT_KEY) || '{}');
};
//derive
export const setDerivedKeyResponse = (payload: {
  derivedPublicKeyBase58Check: string;
  derivedSeedHex: string;
  transactionSpendingLimitHex: string | undefined;
  accessSignature: string;
  expirationBlock: number;
}) => {
  localStorage.setItem(DERIVED_SEED_HEX, JSON.stringify(payload));
};
export const getDerivedKeyResponse = (): {
  derivedPublicKeyBase58Check: string;
  derivedSeedHex: string;
  transactionSpendingLimitHex: string;
  accessSignature: string;
  expirationBlock: number;
} => {
  return (
    JSON.parse(localStorage.getItem(DERIVED_SEED_HEX) as string) ?? {
      derivedPublicKeyBase58Check: '',
      derivedSeedHex: '',
      transactionSpendingLimitHex: '',
      accessSignature: '',
    }
  );
};
//authorize derive key
export const setAuthorizeDerivedKeyResponse = (
  payload: AuthorizeDerivedKeyResponse
) => {
  localStorage.setItem(DEFAULT_KEY, JSON.stringify(payload));
};

export const getAuthorizeDerivedKeyResponse =
  (): AuthorizeDerivedKeyResponse => {
    return JSON.parse(localStorage.getItem(DEFAULT_KEY) || '{}');
  };
//default key
export const setDefaultKey = (defaultKey: MessagingGroupEntryResponse) => {
  localStorage.setItem(DEFAULT_KEY, JSON.stringify(defaultKey));
};
export const getDefaultKey = () => {
  return JSON.parse(localStorage.getItem(DEFAULT_KEY) || '{}');
};
//
export const getEncryptedToApplicationGroupMessagingPrivateKey = () => {
  return JSON.parse(
    localStorage.getItem('encryptedToApplicationGroupMessagingPrivateKey') ||
      '{}'
  );
};
export const setEncryptedToApplicationGroupMessagingPrivateKey = (
  publicKey: string,
  keyName: string,
  encryptedPrivateKey: string
): void => {
  let keys = JSON.parse(
    localStorage.getItem(ENCRYPTED_APPLICATION_GROUP_MESSAGING_PRIVATE_KEY) ||
      '{}'
  );
  const keyNames = keys[publicKey];
  keys = {
    ...keys,
    [publicKey]: { ...keyNames, [keyName]: encryptedPrivateKey },
  };
  localStorage.setItem(
    ENCRYPTED_APPLICATION_GROUP_MESSAGING_PRIVATE_KEY,
    JSON.stringify(keys)
  );
};
//clear all
export const clearAllState = () => {
  localStorageKeys.forEach((key) => {
    localStorage.setItem(key, '{}');
  });
};
