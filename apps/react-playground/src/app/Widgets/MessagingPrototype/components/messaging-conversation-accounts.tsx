import Deso from 'deso-protocol';
import { DerivedPrivateUserInfo } from 'deso-protocol-types';
import { useEffect, useState } from 'react';
import { DecryptedResponse } from '../consts/constants';
import { truncateDesoHandle } from '../services/utils';
import { MessagingDisplayAvatar } from './messaging-display-avatar';
import { MessagingStartNewConversation } from './messaging-start-new-conversation';
export interface MessagingConversationAccountProps {
  deso: Deso;
  conversations: DecryptedResponse;
  getUsernameByPublicKeyBase58Check: { [key: string]: string };
  selectedConversationPublicKey: string;
  setSelectedConversationPublicKey: (selectedKey: string) => void;
  derivedResponse: Partial<DerivedPrivateUserInfo>;
  setConversationComponent: (conversationComponent: JSX.Element) => void;
  onClick: (publicKey: string) => void;
  rehydrateConversation: (publicKey: string) => void;
}
export const MessagingConversationAccount = ({
  deso,
  conversations,
  getUsernameByPublicKeyBase58Check,
  selectedConversationPublicKey,
  onClick,
  setSelectedConversationPublicKey,
  rehydrateConversation,
}: MessagingConversationAccountProps) => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    getLoggedInUsersUsername();
  }, []);
  const getLoggedInUsersUsername = async () => {
    try {
      const response = await deso.user.getSingleProfile({
        PublicKeyBase58Check: deso.identity.getUserKey() as string,
      });
      setUsername(
        response.Profile?.Username || (deso.identity.getUserKey() as string)
      );
    } catch (e) {
      console.error(e);
    }
  };
  const getConversationsAsArray = () => {
    return Object.keys(conversations) ?? [];
  };
  return (
    <div className="border-black min-w-[300px] [max-h-500px] rounded-md rounded-r-none overflow-y-auto">
      <div
        className={`border-r border-[#ffda59] py-2 px-4  bg-[#ffda59] min-h-[40px]`}
      >
        <div className="font-bold ml-2">
          Logged in as:{' '}
          {(username || truncateDesoHandle(deso.identity.getUserKey() ?? '')) ??
            'need to login in first'}
        </div>
      </div>
      <MessagingStartNewConversation
        deso={deso}
        setSelectedConversationPublicKey={setSelectedConversationPublicKey}
        rehydrateConversation={rehydrateConversation}
        selectedConversationPublicKey={selectedConversationPublicKey}
        conversations={conversations}
      />
      <div className="text-center p-2 border-t border-black bg-[#06f] text-white">
        Conversations{' '}
      </div>
      {getConversationsAsArray().map((publicKey: string) => {
        const username = getUsernameByPublicKeyBase58Check[publicKey] ?? null;
        const selectedConversationStyle =
          publicKey === selectedConversationPublicKey ? 'bg-slate-400' : '';
        return (
          <div
            onClick={() => {
              onClick(publicKey);
            }}
            className={`border-t border-black py-2 px-2 ${selectedConversationStyle} hover:bg-slate-400 hover:pointer cursor-pointer flex justify-start`}
            key={`message-thread-${publicKey}`}
          >
            <MessagingDisplayAvatar
              publicKey={publicKey}
              deso={deso}
              diameter={30}
            />
            {username || truncateDesoHandle(publicKey)}
          </div>
        );
      })}
    </div>
  );
};
