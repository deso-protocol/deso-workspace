import Deso from 'deso-protocol';
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
import {
  getDerivedKeyResponse,
  setAuthorizeDerivedKeyResponse,
  setDefaultKey,
  setLoginResponse,
  setDerivedKeyResponse,
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
  const { derivedSeedHex, messagingPublicKeyBase58Check } =
    getDerivedKeyResponse();
  if (groupKey) {
    alert('messaging key already exists');
    setDefaultKey(groupKey);
    console.log(groupKey);
    return;
  }

  const transaction = await deso.user.registerMessagingGroupKey({
    OwnerPublicKeyBase58Check: deso.identity.getUserKey() as string,
    MessagingPublicKeyBase58Check: messagingPublicKeyBase58Check,
    MessagingGroupKeyName: GROUP_NAME,
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

  const messageToDecrypt = {
    SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
    RecipientPublicKeyBase58Check: USER_TO_SEND_MESSAGE_TO,
    EncryptedText: encryptedMessage,
    TstampNanos: 1666641850492793600,
    IsSender: true,
    V2: false,
    Version: 3,
    SenderMessagingPublicKey: response.SenderMessagingPublicKeyBase58Check,
    SenderMessagingGroupKeyName: GROUP_NAME,
    RecipientMessagingPublicKey:
      response.RecipientMessagingPublicKeyBase58Check,
    RecipientMessagingGroupKeyName: GROUP_NAME,
  } as any;
  console.log(encryptedMessage);
  console.log(messageToDecrypt);
  const res = decryptMessageFromPrivateMessagingKey(
    messagingPrivateKey,
    messageToDecrypt
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

  const response = (await getEncryptedMessage(deso)) as any;

  if (response.length === 0) {
    alert('no messages found');
    return;
  }

  const { messagingPrivateKey } = getDerivedKeyResponse();
  console.log(response);
  const v3Messages = response.OrderedContactsWithMessages[0].Messages.filter(
    (m: any) => m.Version === 3
  )
    .filter((m: any) => (m as any).EncryptedText)
    .filter((m: any) => !(m as any).EncryptedHex);
  v3Messages.map((m: any, i: number) => {
    if (i < 15) return {};

    const DecryptedMessage = decryptMessageFromPrivateMessagingKey(
      messagingPrivateKey,
      m
    );
    console.log(DecryptedMessage.toString());
    return { ...m, DecryptedMessage };
  });
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
