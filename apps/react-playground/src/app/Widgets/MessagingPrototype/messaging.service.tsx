import Deso from 'deso-protocol';
import {
  DerivedPrivateUserInfo,
  MessagingGroupEntryResponse,
} from 'deso-protocol-types';
import { getTransactionSpendingLimits, GROUP_NAME, LIMIT } from './constants';
import {
  decryptMessageFromPrivateMessagingKey,
  encryptMessageFromPrivateMessagingKey,
} from './cryptoUtils';
import { Message, MessagingGroupResponse } from './types';

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
  derivedKeyResponse: Partial<DerivedPrivateUserInfo>,
  RecipientPublicKeyBase58Check: string
): Promise<void> => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  const { derivedSeedHex, messagingPrivateKey } = derivedKeyResponse;

  const response = await deso.social.checkPartyMessagingKey({
    RecipientMessagingKeyName: GROUP_NAME,
    RecipientPublicKeyBase58Check,
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
    RecipientPublicKeyBase58Check,
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
  messages: MessagingGroupResponse,
  derivedKeyResponse: Partial<DerivedPrivateUserInfo>
) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  if (Object.keys(messages).length === 0) {
    alert('no messages found');
    return;
  }

  const { messagingPrivateKey } = derivedKeyResponse;
  let v3Messages: any = {};
  messages.OrderedContactsWithMessages.forEach((m) => {
    v3Messages = {
      ...v3Messages,
      [m.PublicKeyBase58Check]: m.Messages.filter(
        (m: any) => m.Version === 3 // needed if you're using an old account with v2 or v1 messages
      ).map((m: any, i: number) => {
        try {
          const DecryptedMessage = decryptMessageFromPrivateMessagingKey(
            messagingPrivateKey as string,
            m
          ).toString();
          return { ...m, DecryptedMessage };
        } catch (e: any) {
          console.log(m);
          return {
            ...m,
            DecryptedMessage: '',
            error: `${e.message} ${m.IsSender}` ?? 'unknown error',
          };
        }
      }),
    };
  });
  return v3Messages;
};

export const getEncryptedMessage = async (deso: Deso) => {
  const messages: MessagingGroupResponse =
    await deso.social.getMessagesStatelessV3({
      PublicKeyBase58Check: deso.identity.getUserKey() as string,
      NumToFetch: 25,
      FetchAfterPublicKeyBase58Check: '',
      HoldersOnly: false,
      FollowersOnly: false,
      FollowingOnly: false,
      HoldingsOnly: false,
      SortAlgorithm: 'time',
    });
  console.log(messages);
  return messages;
};
