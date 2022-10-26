import { useState } from 'react';
import Deso from 'deso-protocol';
import {
  authorizeDerivedKey,
  decrypt,
  encrypt,
  generateDefaultKey,
  getEncryptedMessage,
  login,
  requestDerivedKey,
} from '../messaging.service';
import { truncateDesoHandle } from '../utils';
import { buttonClass } from '../styles';
import { DerivedPrivateUserInfo } from 'deso-protocol-types';
import { getDerivedKeyResponse, setDerivedKeyResponse } from '../store';
const deso = new Deso();
export const MessagingApp = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [derivedResponse, setDerivedResponse] = useState({});
  const [isSending, setIsSending] = useState(false);

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
    const conversation = conversations[conversationPublicKey] ?? [];
    return conversation.map((message: any, i: number) => {
      const messageToShow = message.DecryptedMessage || message.error;
      let colorToShow = 'bg-blue-500';
      if (!message.IsSender) {
        colorToShow = 'bg-green-500';
      }
      if (message.error) {
        colorToShow = 'bg-red-500';
      }

      return (
        <div className="ml-auto max-w-[350px]  mb-4">
          <div
            className={`${colorToShow} p-2 rounded-lg bg-blue-500 text-white mr-2 break-words`}
          >
            {/*TODO decryption needed then we can display */}
            {messageToShow}
          </div>
        </div>
      );
    });
  };

  const setupMessaging = async (): Promise<
    false | Partial<DerivedPrivateUserInfo>
  > => {
    if (!deso.identity.getUserKey()) {
      await login(deso);
    }
    let derivedResponse = getDerivedKeyResponse(
      deso.identity.getUserKey() as string
    );
    if (derivedResponse.derivedPublicKeyBase58Check === '') {
      const res = await requestDerivedKey(deso);
      if (res) {
        derivedResponse = res;
        setDerivedKeyResponse(
          derivedResponse,
          deso.identity.getUserKey() as string
        );
        await authorizeDerivedKey(deso, derivedResponse);
        await generateDefaultKey(deso, derivedResponse);
      }
    }
    if (!derivedResponse) {
      return false;
    }
    setDerivedResponse(derivedResponse);
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
    const decryptedMessages = await decrypt(deso, messages, derivedResponse);
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
    console.log(messageMap);
    return messageMap;
  };

  const getConversationsAsArray = () => {
    return Object.keys(conversations) ?? [];
  };

  const getListOfConversationsKeys = () => {
    return getConversationsAsArray().map((k, i) => {
      const selectedConversationStyle =
        k === selectedConversationPublicKey ? 'bg-slate-400' : '';
      const topLeftRounded = i === 0 ? 'rounded-tl-md' : '';
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
          className={`${topLeftRounded} border-b border-black py-2 px-8 ${selectedConversationStyle} hover:bg-slate-400 hover:pointer cursor-pointer`}
        >
          {truncateDesoHandle(k)}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="bg-[#0C2F62] min-h-full">
        <div className="text-center text-white mb-10 mt-4">
          Below you will find a table that encompasses the required steps to to
          send messages peer to peer on the deso blockchain.
          <div className="flex justify-center mt-5">
            <button
              className={buttonClass}
              onClick={async () => {
                const saidOk = window.confirm(
                  'click OK if you would like to setup messaging on this account. If you have already done so then it is not needed'
                );
                if (!saidOk) {
                  return;
                }
                const derivedResponse = await setupMessaging();
                if (!derivedResponse) {
                  alert('derived call failed');
                  return;
                }
                if (Object.keys(derivedResponse).length === 0) {
                  alert('Need to setup messaging for account first');
                  return;
                }

                const conversations = await getConversationsMap(
                  derivedResponse
                );
                const conversationsArray = Object.keys(conversations);
                if (conversationsArray.length > 0) {
                  setConversations(conversations ?? {});
                  setSelectedConversationPublicKey(conversationsArray[0]);
                }
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
              }}
            >
              Get Conversations
            </button>
          </div>
        </div>
        <div className="text-center mt-2 text-white"></div>
        {Object.keys(conversations).length !== 0 && (
          <div className="flex justify-center">
            <div className="bg-neutral-200 mx-auto ed-md flex  min-h-[600px] max-h-[600px]  rounded-md ">
              <div className="border-r border-black min-w-[300px] [max-h-500px]  rounded-md rounded-r-none overflow-y-auto">
                {getListOfConversationsKeys()}
              </div>
              <div className="">
                <div className="text-center bg-[#ffda59] border-b border-black py-2 min-w-[750px] mb-6 rounded-tr-md">
                  {selectedConversationPublicKey}
                </div>

                <div
                  className="min-h-[434px] max-h-[434px] overflow-auto"
                  id="message-container"
                >
                  {conversationComponent}
                </div>
                <div className="min-h-[100px]  border-t border-black flex justify-center">
                  <textarea
                    className=" min-h-[100px] min-w-[650px] p-2"
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
                      setIsSending(true);
                      try {
                        await encrypt(
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
                        setIsSending(false);

                        const messageContainer =
                          document.getElementById('message-container');
                        if (!messageContainer) {
                          return;
                        }
                        messageContainer.scrollTop =
                          messageContainer.scrollHeight;
                      } catch {
                        setIsSending(false);
                      }
                    }}
                    className={` min-w-[150px] bg-[#06f] text-white ${
                      isSending ? 'animate-spin' : ''
                    }`}
                  >
                    send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
