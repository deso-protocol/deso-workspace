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

  const setupMessaging = async () => {
    await login(deso);
    const derivedResponse = await requestDerivedKey(deso);
    if (!derivedResponse) {
      return;
    }
    setDerivedResponse(derivedResponse);
    await authorizeDerivedKey(deso, derivedResponse);
    await generateDefaultKey(deso, derivedResponse);
  };

  const getConversations = async () => {
    if (!derivedResponse) {
      return {};
    }
    const messages = await getEncryptedMessage(deso);
    const decryptedMessages = await decrypt(deso, messages, derivedResponse);
    const messageMap: { [key: string]: any[] } = {};
    const userKey = deso.identity.getUserKey();
    if (
      !decryptedMessages?.OrderedContactsWithMessages?.[0]?.Messages?.length
    ) {
      return messageMap; // no message object found, return empty
    }
    decryptedMessages.OrderedContactsWithMessages?.[0].Messages.forEach(
      (message: any) => {
        const otherUsersKey =
          userKey === message.RecipientMessagingPublicKey
            ? message.SenderMessagingPublicKey
            : message.RecipientMessagingPublicKey;
        if (!messageMap[otherUsersKey]) {
          messageMap[otherUsersKey] = [];
        }
        console.log(message);

        messageMap[otherUsersKey].push(message);
      }
    );
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

  const getConversationComponent = () => {
    if (
      Object.keys(conversations).length === 0 ||
      selectedConversationPublicKey === ''
    ) {
      return <></>;
    }
    const conversation = conversations[selectedConversationPublicKey] ?? [];
    return conversation.map((message, i) => {
      if (message.isSender) {
        return (
          <div className="ml-auto max-w-[350px] mb-4">
            <div className="p-2 rounded-lg bg-blue-500 text-white mr-2 break-words">
              {/*TODO decryption needed then we can display */}
              {message.EncryptedHex}
            </div>
          </div>
        );
      } else {
        return (
          <div className="mr-auto">
            <div className="p-2 rounded-lg bg-green-500 text-white  max-w-[350px] mb-4 ml-2 break-words">
              {/*TODO decryption needed then we can display */}
              {message.EncryptedHex}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className="bg-[#0C2F62] min-h-full">
      <div className="text-center text-white mb-10 mt-4">
        Below you will find a table that encompasses the required steps to to
        send messages peer to peer on the deso blockchain.
        <div className="flex justify-around mt-5">
          <button
            className={buttonClass}
            onClick={() => {
              const saidOk = window.confirm(
                'click OK if you would like to setup messaging on this account. If you have already done so then it is not needed'
              );
              if (saidOk) {
                setupMessaging();
              }
            }}
          >
            Setup messaging for account
          </button>
          <button
            className={buttonClass}
            onClick={async () => {
              await getConversations().then((conversations) => {
                const conversationsArray = Object.keys(conversations);
                if (conversationsArray.length > 0) {
                  setConversations(conversations ?? {});
                  setSelectedConversationPublicKey(conversationsArray[0]);
                }
              });
              if (!derivedResponse) {
                alert('need to setup messaging for account first');
              }
              const conversation = getConversationComponent();
              console.log(conversation);
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
      <div className="flex justify-center">
        <div className="  bg-neutral-200 mx-auto ed-md flex  min-h-[600px] rounded-md">
          <div className="border-r border-black min-w-[300px]  rounded-md">
            {getListOfConversationsKeys()}
          </div>
          <div className="">
            <div className="text-center bg-[#06f] border-b border-black py-2 min-w-[750px] mb-6 text-white rounded-tr-md">
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
    </div>
  );
};
