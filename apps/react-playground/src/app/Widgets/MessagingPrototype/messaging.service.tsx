import Deso from 'deso-protocol';
import { MessagingGroupOperation } from 'deso-protocol-types';
import {
  getTransactionSpendingLimits,
  GROUP_NAME,
  LIMIT,
  USER_TO_SEND_MESSAGE_TO,
} from './constants';
import {
  decryptMessageFromEncryptedToApplicationGroupMessagingKey,
  encryptMessageFromEncryptedToApplicationGroupMessagingKey,
} from './cryptoUtils';
import {
  getDerivedKeyResponse,
  setAuthorizeDerivedKeyResponse,
  setDefaultKey,
  setLoginResponse,
  setDerivedKeyResponse,
  setEncryptedToApplicationGroupMessagingPrivateKey,
  getEncryptedToApplicationGroupMessagingPrivateKey,
} from './store';
import { alertUserIfNoFunds } from './utils';

export const login = async (deso: Deso) => {
  const response = await deso.identity.login();
  setLoginResponse(response.user);
};

export const getFreeDeso = async (deso: Deso) => {
  deso.identity.phoneVerification();
};
export const requestDerivedKey = async (deso: Deso) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }
  const {
    derivedSeedHex,
    derivedPublicKeyBase58Check,
    transactionSpendingLimitHex,
    accessSignature,
    expirationBlock,
  } =
    //  Switch this out for a callback api
    await deso.identity.derive({
      publicKey: deso.identity.getUserKey() || undefined,
      transactionSpendingLimitResponse: getTransactionSpendingLimits(),
      deleteKey: false,
      expirationDays: LIMIT,
    });

  setDerivedKeyResponse({
    derivedPublicKeyBase58Check,
    derivedSeedHex,
    transactionSpendingLimitHex,
    accessSignature,
    expirationBlock,
  });
};
export const authorizeDerivedKey = async (deso: Deso) => {
  const {
    derivedPublicKeyBase58Check,
    derivedSeedHex,
    transactionSpendingLimitHex,
    accessSignature,
    expirationBlock,
  } = getDerivedKeyResponse();
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
    derivedSeedHex,
    authorizeResponse.TransactionHex,
    true
  );

  deso.transaction.submitTransaction(signedSpendingLimits);
  setAuthorizeDerivedKeyResponse(authorizeResponse);
};

export const generateDefaultKey = async (deso: Deso) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  let messagingKeys = await deso.user.getAllMessagingGroupKeys({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
  });

  let groupKey = messagingKeys.MessagingGroupEntries?.find(
    (x) => x.MessagingGroupKeyName === GROUP_NAME
  );
  const { derivedPublicKeyBase58Check, derivedSeedHex } =
    getDerivedKeyResponse();

  if (groupKey) {
    alert('messaging key already exists');
    setDefaultKey(groupKey);
    console.log(groupKey);

    const messagingGroupPayload = await deso.identity.messagingGroups(
      deso.identity.getUserKey() as string,
      derivedPublicKeyBase58Check,
      MessagingGroupOperation.DEFAULT_KEY,
      GROUP_NAME
    );

    setEncryptedToApplicationGroupMessagingPrivateKey(
      deso.identity.getUserKey() as string,
      GROUP_NAME,
      messagingGroupPayload.encryptedToApplicationGroupMessagingPrivateKey
    );
    return;
  }

  const messagingGroupPayload = await deso.identity.messagingGroups(
    deso.identity.getUserKey() as string,
    derivedPublicKeyBase58Check,
    MessagingGroupOperation.DEFAULT_KEY,
    GROUP_NAME
  );

  setEncryptedToApplicationGroupMessagingPrivateKey(
    deso.identity.getUserKey() as string,
    GROUP_NAME,
    messagingGroupPayload.encryptedToApplicationGroupMessagingPrivateKey
  );

  const transaction = await deso.user.registerMessagingGroupKey({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
    MessagingPublicKeyBase58Check: derivedPublicKeyBase58Check,
    MessagingGroupKeyName: GROUP_NAME,
    MessagingKeySignatureHex: messagingGroupPayload.messagingKeySignature,
    MinFeeRateNanosPerKB: 1000,
  });

  const signedTransaction = deso.utils.signTransaction(
    derivedSeedHex,
    transaction.TransactionHex,
    true
  );

  await deso.transaction.submitTransaction(signedTransaction);
  // submit

  messagingKeys = await deso.user.getAllMessagingGroupKeys({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
  });

  groupKey = messagingKeys.MessagingGroupEntries?.find(
    (x) => x.MessagingGroupKeyName === GROUP_NAME
  );
  if (groupKey) {
    setDefaultKey(groupKey);
  }
};

export const encrypt = async (deso: Deso, messageToSend: string) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  const { derivedSeedHex } = getDerivedKeyResponse();

  const encryptedToApplicationGroupMessagingPrivateKey =
    getEncryptedToApplicationGroupMessagingPrivateKey()?.[
      deso.identity.getUserKey() as string
    ]?.[GROUP_NAME];

  if (!encryptedToApplicationGroupMessagingPrivateKey || !derivedSeedHex) {
    alert(
      'either encryptedToApplicationGroupMessagingPrivateKey or derivedSeedHex is undefined'
    );
    return;
  }

  const encryptedMessage =
    encryptMessageFromEncryptedToApplicationGroupMessagingKey(
      encryptedToApplicationGroupMessagingPrivateKey,
      derivedSeedHex,
      USER_TO_SEND_MESSAGE_TO,
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
  });

  console.log(transaction);

  if (!transaction?.TransactionHex) {
    alert('failed to construct transaction');
    return;
  }

  const signedTransaction = deso.utils.signTransaction(
    derivedSeedHex,
    transaction.TransactionHex,
    true
  );

  await deso.transaction.submitTransaction(signedTransaction).catch(() => {
    alert('something went wrong while submitting the transaction');
  });
};

export const decrypt = async (deso: Deso) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  const response = await getEncryptedMessage(deso);

  if (response.length === 0) {
    alert('no messages found');
    return;
  }
  const { derivedSeedHex } = getDerivedKeyResponse();
  const encryptedToApplicationGroupMessagingPrivateKey =
    getEncryptedToApplicationGroupMessagingPrivateKey()?.[
      response[0].SenderMessagingPublicKey
    ]?.[GROUP_NAME];
  if (!encryptedToApplicationGroupMessagingPrivateKey) {
    alert(
      'either encryptedToApplicationGroupMessagingPrivateKey or derivedSeedHex is undefined'
    );
    return;
  }
  // const messageToDecrypt = response[0] // TODO  hook in all messages
  const messageToDecrypt = {
    EncryptedHex:
      '0460d8390dcae17c18b94ab23a2d64694c8d1f116306d4633f48981f806f2262312e55a3fb9efb98909063c65adf04353cfbf91d6aa36eb043b0570c2a0525450de557e9a76e629036619356a1ebc8e06ccf3a4948091cca0409fa436d4bc1fe2d6bf82e2b2dd93cafc44feae6227aa689',
    PublicKey: 'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY',
    IsSender: true,
    Legacy: false,
    Version: 3,
    SenderMessagingPublicKey:
      'BC1YLi7moxmi9TKhKf5CQ1JtuHF9sGZYymhXJY5xkjkuwhjYHsvLbcE',
    SenderMessagingGroupKeyName: '',
    RecipientMessagingPublicKey:
      'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY',
    RecipientMessagingGroupKeyName: GROUP_NAME,
  };

  const decryptedMessage =
    decryptMessageFromEncryptedToApplicationGroupMessagingKey(
      encryptedToApplicationGroupMessagingPrivateKey,

      derivedSeedHex,
      messageToDecrypt
    );

  console.log(decryptedMessage);
};
export const getEncryptedMessage = (deso: Deso) => {
  return deso.social.getMessagesStateless({
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
