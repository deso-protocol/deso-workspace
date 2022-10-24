import { messagePrefix } from '@ethersproject/hash';
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
  decryptMessageFromPrivateMessagingKey,
  encryptMessageFromEncryptedToApplicationGroupMessagingKey,
  encryptMessageFromPrivateMessagingKey,
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
    messagingPublicKeyBase58Check,
    messagingPrivateKey,
    messagingKeyName,
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
    messagingPublicKeyBase58Check,
    messagingPrivateKey,
    messagingKeyName,
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

  const { derivedSeedHex, messagingPrivateKey } = getDerivedKeyResponse();

  const encryptedToApplicationGroupMessagingPrivateKey =
    getEncryptedToApplicationGroupMessagingPrivateKey()?.[
      deso.identity.getUserKey() as string
    ]?.[GROUP_NAME];
  // get users messaging key
  const response = await deso.social.checkPartyMessagingKey({
    RecipientMessagingKeyName: 'default-key',
    RecipientPublicKeyBase58Check: USER_TO_SEND_MESSAGE_TO,
    SenderMessagingKeyName: 'default-key',
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
  });

  if (!encryptedToApplicationGroupMessagingPrivateKey || !derivedSeedHex) {
    alert(
      'either encryptedToApplicationGroupMessagingPrivateKey or derivedSeedHex is undefined'
    );
    return;
  }

  const encryptedMessage = encryptMessageFromPrivateMessagingKey(
    messagingPrivateKey,
    response.RecipientMessagingPublicKeyBase58Check,
    messageToSend
  );

  const messageToDecrypt = {
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
    RecipientPublicKeyBase58Check: USER_TO_SEND_MESSAGE_TO,
    EncryptedText: encryptedMessage,
    TstampNanos: 1666641850492793600,
    IsSender: true,
    V2: false,
    Version: 3,
    SenderMessagingPublicKey: response.SenderMessagingPublicKeyBase58Check,
    SenderMessagingGroupKeyName: 'default-key',
    RecipientMessagingPublicKey:
      response.RecipientMessagingPublicKeyBase58Check,
    RecipientMessagingGroupKeyName: 'default-key',
  } as any;
  console.log(encryptedMessage);
  console.log(messageToDecrypt);
  const res = decryptMessageFromPrivateMessagingKey(
    messagingPrivateKey,
    messageToDecrypt
  );
  console.log(res);
  // encryptMessageFromEncryptedToApplicationGroupMessagingKey(
  //   encryptedToApplicationGroupMessagingPrivateKey,
  //   derivedSeedHex,
  //   response.RecipientMessagingPublicKeyBase58Check,
  //   messageToSend
  // );

  if (!encryptedMessage) {
    alert('unable to encrypt message');
    return;
  }

  const transaction = await deso.social.sendMessageWithoutIdentity({
    EncryptedMessageText: encryptedMessage.toString('hex'),
    RecipientPublicKeyBase58Check: USER_TO_SEND_MESSAGE_TO,
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
    MinFeeRateNanosPerKB: 1000,
    SenderMessagingGroupKeyName: 'default-key',
    RecipientMessagingGroupKeyName: 'default-key',
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
  // if (!encryptedToApplicationGroupMessagingPrivateKey) {
  //   alert(
  //     'either encryptedToApplicationGroupMessagingPrivateKey or derivedSeedHex is undefined'
  //   );
  //   return;
  // }
  const messageToDecrypt = {
    SenderPublicKeyBase58Check:
      'BC1YLfiECJp52WjUGtdqo7rUxpWnYfqyxwL1CDRyDv2wddMxA1E4RtK',
    RecipientPublicKeyBase58Check:
      'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY',
    EncryptedText:
      '0437eb66680d6c3ff018694c778094085b9cccce8f9aab8e0af0b39894da4815881a5ec8d02b9a5b465fb4fd5a5fbfed48e33c91b5f5090aeca28e583b48dd9f0f7f5fb2f14644661fdb04c5152c4ae2bf820f7f8f7d9581f162729a01d4aec0cff1a1766ba39d296dc661b6dacbcdcf48',
    TstampNanos: 1666641850492793600,
    IsSender: true,
    V2: false,
    Version: 3,
    SenderMessagingPublicKey:
      'BC1YLgHUnVnHaHH5EPS7UASaX66E4DbX8aZ5TjPPfyAEidjZH9V99Lt',
    SenderMessagingGroupKeyName: 'default-key',
    RecipientMessagingPublicKey:
      'BC1YLguoLTyn7SembGCmFes79LGvWgCFKmYhJ2abq2esdyF3jAw2FWw',
    RecipientMessagingGroupKeyName: 'default-key',
    ExtraData: {
      RecipientMessagingGroupKeyName: 'default-key',
      RecipientMessagingPublicKey:
        'BC1YLguoLTyn7SembGCmFes79LGvWgCFKmYhJ2abq2esdyF3jAw2FWw',
      SenderMessagingGroupKeyName: 'default-key',
      SenderMessagingPublicKey:
        'BC1YLgHUnVnHaHH5EPS7UASaX66E4DbX8aZ5TjPPfyAEidjZH9V99Lt',
      V: '3',
    },
  } as any;
  const decryptedMessage =
    decryptMessageFromEncryptedToApplicationGroupMessagingKey(
      encryptedToApplicationGroupMessagingPrivateKey,

      derivedSeedHex,
      messageToDecrypt
    );
  console.log('made it here? ');
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
