import Deso from 'deso-protocol';
import {
  MessagingGroupOperation,
  MessagingGroupPayload,
} from 'deso-protocol-types';
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
  getSecretPrivateUserInfo,
  setEncryptedToApplicationGroupMessagingPrivateKey,
  setSecretPrivateUserInfo,
} from './store';
import { alertUserIfNoFunds } from './utils';

export const login = async (deso: Deso) => {
  deso.identity.login();
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

  setSecretPrivateUserInfo({
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
  } = getSecretPrivateUserInfo();
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
};

export const generateDefaultKey = async (deso: Deso) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }

  const { derivedPublicKeyBase58Check, derivedSeedHex } =
    getSecretPrivateUserInfo();
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

  deso.transaction.submitTransaction(signedTransaction);
  // submit
  console.log(messagingGroupPayload);
};

export const encrypt = async (
  deso: Deso,
  messagingGroupPayload: MessagingGroupPayload
) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }
  console.log('encrypt');

  // encryptedApplicationGroupMessagingKey: string,
  // applicationSeedHex: string,
  // recipientPublicKey: string,
  // message: string
  if (messagingGroupPayload) {
    const encryptedMessage =
      encryptMessageFromEncryptedToApplicationGroupMessagingKey(
        messagingGroupPayload.encryptedToApplicationGroupMessagingPrivateKey,
        '', //derived seed hex ,
        USER_TO_SEND_MESSAGE_TO,
        'message to encrypt'
      );
    // const submit message, sign with derived key
    console.log(encryptedMessage);
  }
};

export const decrypt = async (
  deso: Deso,
  messagingGroupPayload: MessagingGroupPayload
) => {
  if (await alertUserIfNoFunds(deso)) {
    return;
  }
  // show how to pull encrypted messages and then run it through the decryption
  // add inbox similar to node.deso.org
  if (messagingGroupPayload) {
    decryptMessageFromEncryptedToApplicationGroupMessagingKey(
      messagingGroupPayload.encryptedToApplicationGroupMessagingPrivateKey,
      '', //derived
      {
        // update to v3
        EncryptedHex:
          '04dc277d8ba1ad4116ea9143d27a92be5d520de5f5c9d4645f85fe5f6b5791e5be8c8a06bd563c86e557e870ef8c94124102df17ab16548476336c6769cde095cf2758eefc56f9d1cdccf8a6d1b0a5dc6d09054067306a99666783ea36df93d03e81cd2d2ab3a32112c3a5db0630d3bed806a647',
        IsSender: false,
        Version: 2,
        SenderMessagingPublicKey:
          'BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog',
        SenderMessagingGroupKeyName: '',
        RecipientMessagingPublicKey:
          'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY',
        RecipientMessagingGroupKeyName: '',
        PublicKey: deso.identity.getUserKey() as string,
        Legacy: false,
      }
    );
  }
  console.log('decrypt');
};
