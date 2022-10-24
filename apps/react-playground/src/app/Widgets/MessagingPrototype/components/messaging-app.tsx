import { useEffect, useState } from 'react';
import Deso from 'deso-protocol';
import { encrypt, getEncryptedMessage } from '../messaging.service';
import { truncateDesoHandle } from '../utils';
const deso = new Deso();
export const MessagingApp = () => {
  const [messageToSend, setMessageToSend] = useState('');
  const [selectedConversationPublicKey, setSelectedConversationPublicKey] =
    useState('');
  const [conversations, setConversations] = useState<{ [key: string]: any[] }>(
    {}
  );

  useEffect(() => {
    const userKey = deso.identity.getUserKey();
    if (!userKey) {
      alert('you need to login first');
      deso.identity.login();
      return;
    }

    getConversations().then((conversations) => {
      const conversationsArray = Object.keys(conversations);
      if (conversationsArray.length > 0) {
        setConversations(conversations ?? {});
        setSelectedConversationPublicKey(conversationsArray[0]);
      }
    });
  }, []);

  const getConversations = async () => {
    const messages = await getEncryptedMessage(deso);
    const messageMap: { [key: string]: any[] } = {};
    const userKey = deso.identity.getUserKey();
    messages.forEach((message) => {
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

  const getConversation = () => {
    if (
      Object.keys(conversations).length === 0 ||
      selectedConversationPublicKey === ''
    ) {
      return;
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
              {getConversation()}
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
                  // TODO probably need to do all the checks incase the user didn't click on the explainer buttons
                  encrypt(deso, messageToSend);
                  // TODO reload comments
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
