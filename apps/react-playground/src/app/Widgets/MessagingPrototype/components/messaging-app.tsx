import { useState } from 'react';
import Deso from 'deso-protocol';
import {
  authorizeDerivedKey,
  generateDefaultKey,
  getEncryptedMessage,
  login,
  requestDerivedKey,
} from '../messaging.service';
import { buttonClass } from '../styles';
import { DerivedPrivateUserInfo } from 'deso-protocol-types';
import { getDerivedKeyResponse, setDerivedKeyResponse } from '../store';
import { USER_TO_SEND_MESSAGE_TO_1 } from '../constants';
import { delay, truncateDesoHandle } from '../utils';
import { profile } from 'console';
const deso = new Deso();
export const MessagingApp = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [derivedResponse, setDerivedResponse] = useState({});
  const [isSending, setIsSending] = useState<
    'getConversation' | 'setupMessaging' | 'message' | 'none'
  >('none');
  const [hasSetupAccount, setHasSetupAccount] = useState(false);

  const [conversationComponent, setConversationComponent] = useState<any>(
    <></>
  );
  const [selectedConversationPublicKey, setSelectedConversationPublicKey] =
    useState('');
  const [conversations, setConversations] = useState<{ [key: string]: any[] }>(
    {}
  );
  const getConversationComponent = (
    conversations: any,
    conversationPublicKey: string
  ) => {
    if (
      Object.keys(conversations).length === 0 ||
      conversationPublicKey === ''
    ) {
      return [<div></div>];
    }
    const avatarClasses = 'w-12 h-12 bg-no-repeat bg-center bg-cover rounded';
    const conversation = conversations[conversationPublicKey] ?? [];
    return conversation.map((message: any, i: number) => {
      const messageToShow = message.DecryptedMessage || message.error;
      let senderStyles = 'bg-blue-500';
      if (!message.IsSender) {
        senderStyles = 'bg-green-500';
      }
      if (message.error) {
        senderStyles = 'bg-red-500 mx-auto';
      }
      const profilePicURL = `url('${deso.user.getSingleProfilePicture(
        message.SenderPublicKeyBase58Check,
        'https://node.deso.org/assets/img/default_profile_pic.png'
      )}')`;

      return (
        <div
          className={`${
            message.IsSender
              ? 'ml-auto justify-end'
              : 'mr-auto items-start justify-start'
          }  max-w-[350px] mb-4 flex`}
        >
          {!message.IsSender && (
            <div
              style={{ backgroundImage: profilePicURL }}
              className={avatarClasses}
            ></div>
          )}
          <div
            className={`${senderStyles} p-2 rounded-lg bg-blue-500 text-white mx-4 break-words`}
          >
            {messageToShow}
          </div>
          {message.IsSender && (
            <div
              style={{ backgroundImage: profilePicURL }}
              className={avatarClasses}
            ></div>
          )}
        </div>
      );
    });
  };

  const setupMessaging = async (): Promise<
    false | Partial<DerivedPrivateUserInfo>
  > => {
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

  const getConversationsMap = async (
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
    Object.keys(decryptedMessages)?.forEach((key: string) => {
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

  const getConversationsAsArray = () => {
    return Object.keys(conversations) ?? [];
  };

  const getListOfConversationsKeys = () => {
    return getConversationsAsArray().map((k, i) => {
      const selectedConversationStyle =
        k === selectedConversationPublicKey ? 'bg-slate-400' : '';
      return (
        <div
          onClick={async () => {
            setSelectedConversationPublicKey(k);
            const conversations = await getConversationsMap(derivedResponse);
            const conversationsArray = Object.keys(conversations);
            const conversation = getConversationComponent(
              conversations,
              k ?? conversationsArray[0]
            );
            if (conversation) {
              setConversationComponent(conversation);
            }
          }}
          className={`border-t border-black py-2 px-4 ${selectedConversationStyle} hover:bg-slate-400 hover:pointer cursor-pointer`}
        >
          {truncateDesoHandle(k)}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="bg-[#0C2F62] min-h-full">
        <div className="text-center text-white mb-10 mt-4 ">
          Below you will find a table that encompasses the required steps to to
          send messages peer to peer on the deso blockchain.
          <div className="flex justify-center mt-5">
            {Object.keys(conversations).length === 0 && (
              <div className="min-h-[600px] min-w-[1101px] bg-neutral-200 rounded-md mt-5">
                <div className="bg-[#ffda59] min-w-[1101px] min-h-[41px] border-b border-black rounded-t-md">
                  {' '}
                </div>
                <div className="flex flex-col justify-center min-h-[559px]">
                  {!hasSetupAccount && (
                    <button
                      className={`${buttonClass} border mx-auto
                      ${isSending === 'setupMessaging' ? 'animate-spin' : ''}
                      `}
                      onClick={async () => {
                        setIsSending('setupMessaging');
                        try {
                          const success = await setupMessaging();
                          if (!success) {
                            alert(
                              'something went wrong when setting up the account'
                            );
                          }
                        } catch {
                          setIsSending('none');
                        }
                      }}
                    >
                      {' '}
                      Setup account for messaging
                    </button>
                  )}

                  {hasSetupAccount && (
                    <button
                      className={`${buttonClass} border mx-auto 
                      ${isSending === 'getConversation' ? 'animate-spin' : ''}
`}
                      onClick={async () => {
                        setIsSending('getConversation');
                        try {
                          if (!derivedResponse) {
                            alert('derived call failed');
                            return;
                          }

                          let conversations = await getConversationsMap(
                            derivedResponse
                          );
                          let conversationsArray = Object.keys(conversations);
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
                          conversations = await getConversationsMap(
                            derivedResponse
                          );
                          setConversations(conversations ?? {});
                          conversationsArray = Object.keys(conversations);
                          setSelectedConversationPublicKey(
                            conversationsArray[0]
                          );
                          if (!derivedResponse) {
                            alert('need to setup messaging for account first');
                          }
                          const conversation = getConversationComponent(
                            conversations,
                            conversationsArray[0]
                          );
                          if (conversation) {
                            setConversationComponent(conversation);
                          }
                        } catch {
                          setIsSending('none');
                        }

                        setIsSending('none');
                      }}
                    >
                      Get Conversations
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {Object.keys(conversations).length !== 0 && (
          <div className="flex flex-col justify-center">
            <div className="bg-neutral-200 mx-auto ed-md flex  min-h-[600px] max-h-[600px] rounded-md">
              <div className=" border-black min-w-[300px] [max-h-500px]  rounded-md rounded-r-none overflow-y-auto">
                <div
                  className={`border-r border-[#ffda59] py-2 px-4  bg-[#ffda59] min-h-[40px]`}
                >
                  your key:{' '}
                  {truncateDesoHandle(deso.identity.getUserKey() ?? '') ??
                    'need to login in first'}
                </div>
                {getListOfConversationsKeys()}
              </div>
              <div>
                <div className="text-center bg-[#ffda59] border-b border-black py-2 min-w-[750px]  rounded-tr-md min-h-[41px]"></div>
                <div
                  className="min-h-[478px] max-h-[478px] overflow-auto border-l border-black pt-6"
                  id="message-container"
                >
                  {conversationComponent}
                </div>
                <div className="min-h-[80px] border-t border-l border-black flex justify-center ">
                  <textarea
                    className="min-h-[80px] max-h-[80px] min-w-[650px] p-2"
                    onChange={(e) => {
                      setMessageToSend(e.target.value);
                    }}
                    value={messageToSend}
                  />
                  <button
                    onClick={async () => {
                      if (messageToSend === '') {
                        alert('message is empty');
                        return;
                      }
                      setIsSending('message');
                      try {
                        await deso.utils.encryptMessage(
                          deso,
                          messageToSend,
                          derivedResponse,
                          selectedConversationPublicKey
                        );

                        const conversations = await getConversationsMap(
                          derivedResponse
                        );

                        const conversationsArray = Object.keys(conversations);
                        const conversation = getConversationComponent(
                          conversations,
                          selectedConversationPublicKey ?? conversationsArray[0]
                        );
                        if (conversation) {
                          setConversationComponent(conversation);
                        }
                        setMessageToSend('');
                        setIsSending('message');

                        const messageContainer =
                          document.getElementById('message-container');
                        if (!messageContainer) {
                          return;
                        }
                        messageContainer.scrollTop =
                          messageContainer.scrollHeight;

                        setIsSending('none');
                      } catch {
                        setIsSending('none');
                      }
                    }}
                    className={`rounded-br-md min-w-[150px] max-h-[80px] bg-[#06f] text-white ${
                      isSending === 'message' ? 'animate-spin' : ''
                    }`}
                  >
                    send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-5">
          <button
            className={buttonClass}
            onClick={async () => {
              await deso.identity.login();
              await window.location.reload();
            }}
          >
            switch users
          </button>
        </div>
      </div>
    </div>
  );
};
