import { DERIVED_SEED_HEX } from './utils';

export const setSecretPrivateUserInfo = (payload: {
  derivedPublicKeyBase58Check: string;
  derivedSeedHex: string;
  transactionSpendingLimitHex: string | undefined;
  accessSignature: string;
  expirationBlock: number;
}) => {
  localStorage.setItem(DERIVED_SEED_HEX, JSON.stringify(payload));
};
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
    localStorage.getItem('encryptedToApplicationGroupMessagingPrivateKey') ||
      '{}'
  );
  const keyNames = keys[publicKey];
  keys = {
    ...keys,
    [publicKey]: { ...keyNames, [keyName]: encryptedPrivateKey },
  };
  localStorage.setItem(
    'encryptedToApplicationGroupMessagingPrivateKey',
    JSON.stringify(keys)
  );
};

export const getSecretPrivateUserInfo = (): {
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
