import Deso from 'deso-protocol';
import { truncateDesoHandle } from '../utils';
import { getConversationsMap } from './messaging-app.service';
import { MessagingBubblesAndAvatar } from './messaging-bubbles';
export interface MessagingConversationAccountProps {
  deso: Deso;
  conversations: any;
  getUsernameByPublicKeyBase58Check: any;
  selectedConversationPublicKey: string;
  setSelectedConversationPublicKey: any;
  derivedResponse: any;
  setConversationComponent: any;
}
export const MessagingConversationAccount = ({
  deso,
  conversations,
  getUsernameByPublicKeyBase58Check,
  selectedConversationPublicKey,
  setSelectedConversationPublicKey,
  derivedResponse,
  setConversationComponent,
}: MessagingConversationAccountProps) => {
  const getConversationsAsArray = () => {
    return Object.keys(conversations) ?? [];
  };
  return (
    <div className=" border-black min-w-[300px] [max-h-500px]  rounded-md rounded-r-none overflow-y-auto">
      <div
        className={`border-r border-[#ffda59] py-2 px-4  bg-[#ffda59] min-h-[40px]`}
      >
        your key:{' '}
        {truncateDesoHandle(deso.identity.getUserKey() ?? '') ??
          'need to login in first'}
      </div>
      {getConversationsAsArray().map((k: string, i) => {
        const username = getUsernameByPublicKeyBase58Check[k] ?? null;
        const selectedConversationStyle =
          k === selectedConversationPublicKey ? 'bg-slate-400' : '';
        return (
          <div
            onClick={async () => {
              setSelectedConversationPublicKey(k);
              const conversations = await getConversationsMap(
                deso,
                derivedResponse
              );
              const conversationsArray = Object.keys(conversations);
              setConversationComponent(
                <MessagingBubblesAndAvatar
                  conversationPublicKey={k ?? conversationsArray[0]}
                  deso={deso}
                  conversations={conversations}
                />
              );
            }}
            className={`border-t border-black py-2 px-4 ${selectedConversationStyle} hover:bg-slate-400 hover:pointer cursor-pointer`}
          >
            {username ? username : truncateDesoHandle(k)}
          </div>
        );
      })}
    </div>
  );
};
