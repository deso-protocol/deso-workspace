import {
  AuthorizeDerivedKeyResponse,
  DerivedPrivateUserInfo,
  LoginUser,
  MessagingGroupEntryResponse,
} from 'deso-protocol-types';
import {
  DECRYPT_RESPONSE,
  DEFAULT_KEY,
  DERIVED_SEED_HEX,
  ENCRYPTED_APPLICATION_GROUP_MESSAGING_PRIVATE_KEY,
  ENCRYPT_RESPONSE,
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
export const setDerivedKeyResponse = (
  payload: Partial<DerivedPrivateUserInfo>,
  ownerPublicKey: string
) => {
  localStorage.setItem(
    `${DERIVED_SEED_HEX}_${ownerPublicKey}`,
    JSON.stringify(payload)
  );
  console.log(`${DERIVED_SEED_HEX}_${ownerPublicKey}`);
};
export const getDerivedKeyResponse = (
  ownerPublicKey: string
): Partial<DerivedPrivateUserInfo> => {
  return (
    JSON.parse(
      localStorage.getItem(`${DERIVED_SEED_HEX}_${ownerPublicKey}`) as string
    ) ?? {
      derivedPublicKeyBase58Check: '',
      derivedSeedHex: '',
      transactionSpendingLimitHex: '',
      accessSignature: '',
      messagingPublicKeyBase58Check: '',
      messagingPrivateKey: '',
      messagingKeyName: '',
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
// records for group messaging private key
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

// encrypt
export const setEncryptedResponse = (encryptedResponse: any) => {
  localStorage.setItem(ENCRYPT_RESPONSE, JSON.stringify(encryptedResponse));
};
export const getEncryptedResponse = () => {
  return JSON.parse(localStorage.getItem(ENCRYPT_RESPONSE) || '{}');
};
// decrypt
export const setDecryptedResponse = (decryptedResponse: any) => {
  localStorage.setItem(DECRYPT_RESPONSE, JSON.stringify(decryptedResponse));
};
export const getDecryptedResponse = () => {
  return JSON.parse(localStorage.getItem(DECRYPT_RESPONSE) || '{}');
};
//clear all
export const clearAllState = () => {
  // lazy way of waiting for useStates to finish first
  localStorageKeys.forEach((key) => {
    localStorage.setItem(key, '{}');
  });
};
