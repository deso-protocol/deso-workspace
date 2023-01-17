import Deso from 'deso-protocol';
import {
  DerivedPrivateUserInfo,
  MessagingGroupEntryResponse,
  GetMessagesResponse,
  AccessGroupEntryResponse,
  GetUserMessageThreadsResponse,
} from 'deso-protocol-types';
import { access } from 'fs';
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
): Promise<AccessGroupEntryResponse | undefined> => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  let accessGroups = await deso.accessGroup.GetAllUserAccessGroupsOwned({
    PublicKeyBase58Check: deso.identity.getUserKey() as string,
  });

  const isDefaultKeyGroup = (x: AccessGroupEntryResponse) =>
    x.AccessGroupKeyName === DEFAULT_KEY_MESSAGING_GROUP_NAME;
  let defaultKey = accessGroups?.AccessGroupsOwned?.find(isDefaultKeyGroup);
  // let messagingKeys = await deso.user.getAllMessagingGroupKeys({
  //   OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
  // });
  // const isGroupKey = (x: MessagingGroupEntryResponse) =>
  //   x.MessagingGroupKeyName === DEFAULT_KEY_MESSAGING_GROUP_NAME;
  // let groupKey = messagingKeys.MessagingGroupEntries?.find(isGroupKey);

  const { derivedSeedHex, messagingPublicKeyBase58Check } = derivedKeyResponse;
  if (defaultKey) {
    return defaultKey;
  }

  const transaction = await deso.accessGroup.CreateAccessGroup(
    {
      AccessGroupOwnerPublicKeyBase58Check:
        deso.identity.getUserKey() as string,
      AccessGroupPublicKeyBase58Check: messagingPublicKeyBase58Check,
      AccessGroupKeyName: DEFAULT_KEY_MESSAGING_GROUP_NAME,
      MinFeeRateNanosPerKB: 1000,
    },
    {
      broadcast: false,
    }
  );

  const signedTransaction = deso.utils.signTransaction(
    derivedSeedHex as string,
    transaction.TransactionHex,
    true
  );

  await deso.transaction.submitTransaction(signedTransaction);

  accessGroups = await deso.accessGroup.GetAllUserAccessGroupsOwned({
    PublicKeyBase58Check: deso.identity.getUserKey() as string,
  });

  defaultKey = accessGroups?.AccessGroupsOwned?.find(isDefaultKeyGroup);
  return defaultKey;
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

export const getEncryptedNewMessages = async (deso: Deso) => {
  return await deso.accessGroup.GetAllUserMessageThreads({
    UserPublicKeyBase58Check: deso.identity.getUserKey() as string,
  });
};

// export const getAllThreads = async (deso: Deso) => {
//   const threads: GetAllUserMessageThreadResponse = await deso.accessGroup.GetAllUserMessageThreads({
//     UserPublicKeyBase58Check: deso.identity.getUserKey() as string,
//   });
//   return threads;
// }
