import Deso from 'deso-protocol';
import {
  DerivedPrivateUserInfo,
  MessagingGroupEntryResponse,
} from 'deso-protocol-types';
import {
  getTransactionSpendingLimits,
  GROUP_NAME,
  LIMIT,
  USER_TO_SEND_MESSAGE_TO,
} from './constants';
import {
  decryptMessageFromPrivateMessagingKey,
  encryptMessageFromPrivateMessagingKey,
} from './cryptoUtils';

import { alertUserIfNoFunds } from './utils';

export const login = async (deso: Deso) => {
  const response = await deso.identity.login();
  return response;
};

export const getFreeDeso = async (deso: Deso) => {
  deso.identity.phoneVerification();
};

export const requestDerivedKey = async (
  deso: Deso
): Promise<Partial<DerivedPrivateUserInfo> | undefined> => {
  if (await alertUserIfNoFunds(deso)) {
    return;
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

  const signedSpendingLimits = deso.utils.signTransaction(
    derivedSeedHex as string,
    authorizeResponse.TransactionHex,
    true
  );

  deso.transaction.submitTransaction(signedSpendingLimits);
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

  let groupKey = messagingKeys.MessagingGroupEntries?.find(
    (x) => x.MessagingGroupKeyName === GROUP_NAME
  );

  const { derivedSeedHex, messagingPublicKeyBase58Check } = derivedKeyResponse;
  if (groupKey) {
    alert('messaging key already exists');
    return groupKey;
  }

  const transaction = await deso.user.registerMessagingGroupKey({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
    MessagingPublicKeyBase58Check: messagingPublicKeyBase58Check,
    MessagingGroupKeyName: GROUP_NAME,
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

  groupKey = messagingKeys.MessagingGroupEntries?.find(
    (x) => x.MessagingGroupKeyName === GROUP_NAME
  );
  return groupKey;
};

export const encrypt = async (
  deso: Deso,
  messageToSend: string,
  derivedKeyResponse: Partial<DerivedPrivateUserInfo>
): Promise<void> => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  const { derivedSeedHex, messagingPrivateKey } = derivedKeyResponse;

  const response = await deso.social.checkPartyMessagingKey({
    RecipientMessagingKeyName: GROUP_NAME,
    RecipientPublicKeyBase58Check: USER_TO_SEND_MESSAGE_TO,
    SenderMessagingKeyName: GROUP_NAME,
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
  });

  if (!messagingPrivateKey) {
    alert('messagingPrivateKey is undefined');
    return;
  }

  const encryptedMessage = encryptMessageFromPrivateMessagingKey(
    messagingPrivateKey,
    response.RecipientMessagingPublicKeyBase58Check,
    messageToSend
  );

  if (!encryptedMessage) {
    alert('unable to encrypt message');
    return;
  }

  const transaction = await deso.social.sendMessageWithoutIdentity({
    EncryptedMessageText: encryptedMessage.toString('hex'),
    RecipientPublicKeyBase58Check: USER_TO_SEND_MESSAGE_TO,
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
    MinFeeRateNanosPerKB: 1000,
    SenderMessagingGroupKeyName: GROUP_NAME,
    RecipientMessagingGroupKeyName: GROUP_NAME,
  });

  if (!transaction?.TransactionHex) {
    alert('failed to construct transaction');
    return;
  }

  const signedTransaction = deso.utils.signTransaction(
    derivedSeedHex as string,
    transaction.TransactionHex,
    true
  );

  await deso.transaction.submitTransaction(signedTransaction).catch(() => {
    alert('something went wrong while submitting the transaction');
  });
};

export const decrypt = async (
  deso: Deso,
  messages: any,
  derivedKeyResponse: Partial<DerivedPrivateUserInfo>
) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  if (messages.length === 0) {
    alert('no messages found');
    return;
  }

  const { messagingPrivateKey } = derivedKeyResponse;

  const v3Messages = messages.OrderedContactsWithMessages[0].Messages.filter(
    (m: any) => m.Version === 3 // needed if you're using an old account with v2 or v1 messages
  );

  const decryptedMessages = v3Messages.map((m: any, i: number) => {
    const DecryptedMessage = decryptMessageFromPrivateMessagingKey(
      messagingPrivateKey as string,
      m
    ).toString();
    return { ...m, DecryptedMessage };
  });

  return decryptedMessages;
};

export const getEncryptedMessage = (deso: Deso) => {
  return deso.social.getMessagesStatelessV3({
    PublicKeyBase58Check: deso.identity.getUserKey() as string,
    NumToFetch: 25,
    FetchAfterPublicKeyBase58Check: '',
    HoldersOnly: false,
    FollowersOnly: false,
    FollowingOnly: false,
    HoldingsOnly: false,
    SortAlgorithm: 'time',
  });
};
