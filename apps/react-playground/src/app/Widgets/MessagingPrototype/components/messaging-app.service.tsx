import Deso from 'deso-protocol';
import { DerivedPrivateUserInfo } from 'deso-protocol-types';
import { USER_TO_SEND_MESSAGE_TO_1 } from '../constants';
import {
  authorizeDerivedKey,
  generateDefaultKey,
  getEncryptedMessage,
  login,
  requestDerivedKey,
} from '../messaging.service';
import { getDerivedKeyResponse, setDerivedKeyResponse } from '../store';
import { delay } from '../utils';
import { MessagingBubblesAndAvatar } from './messaging-bubbles';
export const getConversationsMap = async (
  deso: Deso,
  derivedResponse: Partial<DerivedPrivateUserInfo>
) => {
  if (!derivedResponse) {
    alert('no derived response found');
    return {};
  }
  const messages = await getEncryptedMessage(deso);
  const decryptedMessages = await deso.utils.decryptMessage(
    messages,
    derivedResponse
  );
  const messageMap: { [key: string]: any[] } = {};
  const userKey = deso.identity.getUserKey();
  Object.keys(decryptedMessages)?.forEach(async (key: string) => {
    decryptedMessages[key].forEach((message: any) => {
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
    const res = await login(deso);
    key = res.key;
    if (!key) {
      alert('failed to login');
      return false;
    }
  }
  const userResponse = await deso.user.getUserStateless({
    PublicKeysBase58Check: [key],
  });
  const user = userResponse?.UserList?.[0];
  if (user && user.BalanceNanos === 0) {
    const openFreeDeso = window.confirm(
      `no deso funds found for ${key}. click okay to add some through phone verification. Otherwise you can send deso from another account`
    );
    if (openFreeDeso) {
      await deso.identity.phoneVerification();
    } else {
      return false;
    }
  }
  let derivedResponse: any = getDerivedKeyResponse(key);
  if (!derivedResponse.derivedPublicKeyBase58Check) {
    derivedResponse = await requestDerivedKey(deso);
  }
  if (!derivedResponse.derivedPublicKeyBase58Check) {
    alert('failed to authorize derive key');
    return false;
  }
  setDerivedKeyResponse(derivedResponse, key);
  await authorizeDerivedKey(deso, derivedResponse);
  await delay(3000);
  await generateDefaultKey(deso, derivedResponse);
  setDerivedResponse(derivedResponse);
  setHasSetupAccount(true);

  return derivedResponse;
};

export const loadPageAndConversations = async (
  deso: Deso,
  derivedResponse: Partial<DerivedPrivateUserInfo>,
  setGetUsernameByPublicKeyBase58Check: any,
  setConversations: any,
  setSelectedConversationPublicKey: any,
  setConversationComponent: any
) => {
  try {
    if (!derivedResponse) {
      alert('derived call failed');
      return;
    }

    let conversations = await getConversationsMap(deso, derivedResponse);
    let conversationsArray = Object.keys(conversations);
    const res = await deso.user.getUserStateless({
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
      await deso.utils.encryptMessage(
        // submit a message so they can use the example
        deso,
        'thanks for checking out this messaging app!',
        derivedResponse,
        USER_TO_SEND_MESSAGE_TO_1
      );
    }
    await delay(3000);
    conversations = await getConversationsMap(deso, derivedResponse);
    setConversations(conversations ?? {});
    conversationsArray = Object.keys(conversations);
    setSelectedConversationPublicKey(conversationsArray[0]);
    if (!derivedResponse) {
      alert('need to setup messaging for account first');
    }
    setConversationComponent(
      <MessagingBubblesAndAvatar
        conversationPublicKey={conversationsArray[0]}
        deso={deso}
        conversations={conversations}
      />
    );
  } catch {
    console.log('');
  }
};
