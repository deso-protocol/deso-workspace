import Deso from 'deso-protocol';
import {
  DerivedPrivateUserInfo,
  MessagingGroupEntryResponse,
  GetMessagesResponse,
} from 'deso-protocol-types';
import {
  getTransactionSpendingLimits,
  DEFAULT_KEY_MESSAGING_GROUP_NAME,
  LIMIT,
} from '../consts/constants';

import { alertUserIfNoFunds } from './utils';

export const login = async (deso: Deso) => {
  return await deso.identity.login();
};

export const requestDerivedKey = async (
  deso: Deso
): Promise<Partial<DerivedPrivateUserInfo>> => {
  if (await alertUserIfNoFunds(deso)) {
    return {};
  }
  const {
    derivedSeedHex,
    derivedPublicKeyBase58Check,
    transactionSpendingLimitHex,
    accessSignature,
    expirationBlock,
    messagingPublicKeyBase58Check,
    messagingPrivateKey,
    messagingKeyName,
  } = await deso.identity.derive({
    publicKey: deso.identity.getUserKey() || undefined,
    transactionSpendingLimitResponse: getTransactionSpendingLimits(),
    deleteKey: false,
    expirationDays: LIMIT,
  });

  return {
    derivedPublicKeyBase58Check,
    derivedSeedHex,
    transactionSpendingLimitHex,
    accessSignature,
    expirationBlock,
    messagingPublicKeyBase58Check,
    messagingPrivateKey,
    messagingKeyName,
  };
};

export const authorizeDerivedKey = async (
  deso: Deso,
  derivedKeyResponse: Partial<DerivedPrivateUserInfo>
): Promise<void> => {
  const {
    derivedPublicKeyBase58Check,
    derivedSeedHex,
    transactionSpendingLimitHex,
    accessSignature,
    expirationBlock,
  } = derivedKeyResponse;
  if (!derivedPublicKeyBase58Check) {
    alert('need to create derived key first');
    return;
  }

  const authorizeResponse = await deso.user.authorizeDerivedKeyWithoutIdentity({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
    DerivedPublicKeyBase58Check: derivedPublicKeyBase58Check,
    AppName: 'AppName',
    ExpirationBlock: expirationBlock,
    MinFeeRateNanosPerKB: 1000,
    TransactionSpendingLimitHex: transactionSpendingLimitHex,
    AccessSignature: accessSignature,
  });

  const signedAuthorizedDerivedKeyTxn = deso.utils.signTransaction(
    derivedSeedHex as string,
    authorizeResponse.TransactionHex,
    true
  );

  await deso.transaction.submitTransaction(signedAuthorizedDerivedKeyTxn);
};

export const generateDefaultKey = async (
  deso: Deso,
  derivedKeyResponse: Partial<DerivedPrivateUserInfo>
): Promise<MessagingGroupEntryResponse | undefined> => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  let messagingKeys = await deso.user.getAllMessagingGroupKeys({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
  });
  const isGroupKey = (x: MessagingGroupEntryResponse) =>
    x.MessagingGroupKeyName === DEFAULT_KEY_MESSAGING_GROUP_NAME;
  let groupKey = messagingKeys.MessagingGroupEntries?.find(isGroupKey);

  const { derivedSeedHex, messagingPublicKeyBase58Check } = derivedKeyResponse;
  if (groupKey) {
    return groupKey;
  }

  const transaction = await deso.user.registerMessagingGroupKey({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
    MessagingPublicKeyBase58Check: messagingPublicKeyBase58Check,
    MessagingGroupKeyName: DEFAULT_KEY_MESSAGING_GROUP_NAME,
    MinFeeRateNanosPerKB: 1000,
  });

  const signedTransaction = deso.utils.signTransaction(
    derivedSeedHex as string,
    transaction.TransactionHex,
    true
  );

  await deso.transaction.submitTransaction(signedTransaction);

  messagingKeys = await deso.user.getAllMessagingGroupKeys({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
  });

  groupKey = messagingKeys.MessagingGroupEntries?.find(isGroupKey);
  return groupKey;
};

export const getEncryptedMessages = async (deso: Deso) => {
  const messages: GetMessagesResponse =
    await deso.social.getMessagesStatelessUnmodified({
      PublicKeyBase58Check: deso.identity.getUserKey() as string,
      NumToFetch: 100,
      FetchAfterPublicKeyBase58Check: '',
      HoldersOnly: false,
      FollowersOnly: false,
      FollowingOnly: false,
      HoldingsOnly: false,
      SortAlgorithm: 'time',
    });
  return messages;
};
