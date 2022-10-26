import { useEffect, useState } from 'react';
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
const deso = new Deso();
export const MessagingApp = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [derivedResponse, setDerivedResponse] = useState({});

  const [conversationComponent, setConversationComponent] = useState<any>(
    <></>
  );
  const [selectedConversationPublicKey, setSelectedConversationPublicKey] =
    useState('');
  const [conversations, setConversations] = useState<{ [key: string]: any[] }>(
    {}
  );
  const getConversationComponent = (conversations: any) => {
    if (
      Object.keys(conversations).length === 0 ||
      selectedConversationPublicKey === ''
    ) {
      return [<div></div>];
    }
    const conversation = conversations[selectedConversationPublicKey] ?? [];
    console.log(
      'conversation =>',
      conversations[selectedConversationPublicKey]
    );
    return conversation.map((message: any, i: number) => {
      if (message.isSender) {
        return (
          <div className="ml-auto max-w-[350px]  mb-4">
            <div className="p-2 rounded-lg bg-blue-500 text-white mr-2 break-words">
              {/*TODO decryption needed then we can display */}
              {message.DecryptedMessage}
            </div>
          </div>
        );
      } else {
        return (
          <div className="mr-auto">
            <div className="p-2 rounded-lg bg-green-500 text-white  max-w-[350px] mb-4 ml-2 break-words">
              {/*TODO decryption needed then we can display */}
              {message.DecryptedMessage}
            </div>
          </div>
        );
      }
    });
  };

  useEffect(() => {
    console.log('init');
  }, [conversations, setConversations]);

  const setupMessaging = async (): Promise<
    false | Partial<DerivedPrivateUserInfo>
  > => {
    await login(deso);
    const derivedResponse = await requestDerivedKey(deso);
    if (!derivedResponse) {
      return false;
    }
    setDerivedResponse(derivedResponse);
    await authorizeDerivedKey(deso, derivedResponse);
    await generateDefaultKey(deso, derivedResponse);
    return derivedResponse;
  };

  const getConversationsMap = async (
    derivedResponse: Partial<DerivedPrivateUserInfo>
  ) => {
    if (!derivedResponse) {
      alert('no derived response found');
      return {};
    }
    console.log(derivedResponse);
    const messages = await getEncryptedMessage(deso);
    const decryptedMessages = await decrypt(deso, messages, derivedResponse);
    const messageMap: { [key: string]: any[] } = {};
    const userKey = deso.identity.getUserKey();
    decryptedMessages?.forEach((message: any) => {
      const otherUsersKey =
        userKey === message.RecipientMessagingPublicKey
          ? message.SenderMessagingPublicKey
          : message.RecipientMessagingPublicKey;
      if (!messageMap[otherUsersKey]) {
        messageMap[otherUsersKey] = [];
      }
      messageMap[otherUsersKey].push(message);
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
      const topLeftRounded = i === 0 ? 'rounded-tl-md' : '';
      return (
        <div
          onClick={() => {
            setSelectedConversationPublicKey(k);
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
                console.log('conversations =>', conversations);
                const conversationsArray = Object.keys(conversations);
                console.log('conversationsArray =>', conversationsArray);
                if (conversationsArray.length > 0) {
                  setConversations(conversations ?? {});
                  setSelectedConversationPublicKey(conversationsArray[0]);
                }
                if (!derivedResponse) {
                  alert('need to setup messaging for account first');
                }

                const conversation = getConversationComponent(conversations);
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

                <div className="min-h-[1000px] max-h-[1000px] overflow-auto">
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
                      encrypt(deso, messageToSend, derivedResponse);
                    }}
                    className=" min-w-[150px] bg-[#06f] text-white"
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
