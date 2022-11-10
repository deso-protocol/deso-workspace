import Deso from 'deso-protocol';
import { DerivedPrivateUserInfo } from 'deso-protocol-types';
import {
  DecryptedResponse,
  USER_TO_SEND_MESSAGE_TO_1,
} from '../consts/constants';
import {
  authorizeDerivedKey,
  generateDefaultKey,
  getEncryptedMessages,
  login,
  requestDerivedKey,
} from '../services/messaging.service';
import {
  getDerivedKeyResponse,
  setDefaultKey,
  setDerivedKeyResponse,
} from '../services/store';
import { delay } from '../services/utils';
export const getConversationsMap = async (
  deso: Deso,
  derivedResponse: Partial<DerivedPrivateUserInfo>
): Promise<DecryptedResponse> => {
  if (!derivedResponse) {
    alert('no derived response found');
    return {};
  }
  const messages = await getEncryptedMessages(deso);
  const decryptedMessages = await deso.utils.decryptMessagesV3(
    messages,
    derivedResponse.messagingPrivateKey as string
  );
  const messageMap: { [key: string]: any[] } = {};
  const userKey = deso.identity.getUserKey();
  Object.keys(decryptedMessages)?.forEach(async (key: string) => {
    decryptedMessages[key].forEach((message) => {
      const otherUsersKey =
        userKey === message.RecipientPublicKeyBase58Check
          ? message.SenderPublicKeyBase58Check
          : message.RecipientPublicKeyBase58Check;
      if (!messageMap[otherUsersKey]) {
        messageMap[otherUsersKey] = [];
      }

      messageMap[otherUsersKey].push(message);
    });
  });
  return messageMap;
};

export const setupMessaging = async (
  deso: Deso,
  setDerivedResponse: any,
  setHasSetupAccount: any
): Promise<false | Partial<DerivedPrivateUserInfo>> => {
  let key = deso.identity.getUserKey();
  if (!key) {
    // are they already logged in? if not prompt them
    const res = await login(deso);
    key = res.key;
    if (!key) {
      alert('failed to login');
      return false;
    }
  }
  const userResponse = await deso.user.getUsersStateless({
    PublicKeysBase58Check: [key],
    // SkipForLeaderboard: true,
    // IncludeBalance: true,
  });
  console.log(userResponse);
  const user = userResponse?.UserList?.[0];
  if (user && user.BalanceNanos === 0) {
    // does the user have a balance? If not let them know since they will not be able to proceed
    const openFreeDeso = window.confirm(
      `no deso funds found for ${key}. click okay to add some through phone verification. Otherwise you can send deso from another account`
    );
    if (openFreeDeso) {
      await deso.identity.phoneVerification('4', undefined, {
        publicKey: deso.identity.getUserKey() as string,
      });
    } else {
      return false;
    }
  } else if (!user) {
    alert('unable to find user');
    return false;
  }
  let derivedResponse: any = getDerivedKeyResponse(key); // does the derived key exist in storage already?
  if (!derivedResponse.derivedPublicKeyBase58Check) {
    // if not request one
    derivedResponse = await requestDerivedKey(deso);
  }
  if (!derivedResponse.derivedPublicKeyBase58Check) {
    alert('failed to authorize derive key');
    return false;
  }
  setDerivedKeyResponse(derivedResponse, key);
  await authorizeDerivedKey(deso, derivedResponse);
  await delay(3000); // lazy way to make sure the transaction has had enough time to broadcast,
  // alternatively you call can the get-txn endpoint to verify it has been broadcasted;
  const messagingKey = await generateDefaultKey(deso, derivedResponse);
  if (messagingKey) {
    setDefaultKey(messagingKey);
  }
  setDerivedResponse(derivedResponse);
  setHasSetupAccount(true);

  return derivedResponse;
};

export const getConversations = async (
  deso: Deso,
  derivedResponse: Partial<DerivedPrivateUserInfo>,
  setGetUsernameByPublicKeyBase58Check: any,
  setConversations: any,
  setSelectedConversationPublicKey: any
) => {
  try {
    if (!derivedResponse) {
      alert('derived call failed');
      return {};
    }

    let conversations = await getConversationsMap(deso, derivedResponse);
    let conversationsArray = Object.keys(conversations);
    const res = await deso.user.getUsersStateless({
      PublicKeysBase58Check: conversationsArray,
    });
    const getUsernameByPublicKeyBase58Check: any = [];

    res?.UserList?.forEach((user) => {
      getUsernameByPublicKeyBase58Check[user.PublicKeyBase58Check] =
        user.ProfileEntryResponse?.Username;
    });
    if (getUsernameByPublicKeyBase58Check) {
      setGetUsernameByPublicKeyBase58Check(getUsernameByPublicKeyBase58Check);
    }
    if (conversationsArray.length === 0) {
      await deso.utils.encryptMessageV3(
        // submit a message so they can use the example
        deso,
        'Thanks for checking out the messaging app, here is an example of a sent message from your encryption call!',
        derivedResponse.derivedSeedHex as string,
        derivedResponse.messagingPrivateKey as string,
        USER_TO_SEND_MESSAGE_TO_1,
        true
      );
      await delay(3000);
      conversations = await getConversationsMap(deso, derivedResponse);
      setConversations(conversations ?? {});
      conversationsArray = Object.keys(conversations);
    }
    setSelectedConversationPublicKey(conversationsArray[0]);
    return conversations;
  } catch (e) {
    console.error(e);
    return {};
  }
};
