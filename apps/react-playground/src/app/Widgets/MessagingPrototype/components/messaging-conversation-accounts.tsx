import Deso from 'deso-protocol';
import { truncateDesoHandle } from '../services/utils';
import { MessagingDisplayAvatar } from './messaging-display-avatar';
export interface MessagingConversationAccountProps {
  deso: Deso;
  conversations: any;
  getUsernameByPublicKeyBase58Check: any;
  selectedConversationPublicKey: string;
  setSelectedConversationPublicKey: any;
  derivedResponse: any;
  setConversationComponent: any;
  onClick: any;
}
export const MessagingConversationAccount = ({
  deso,
  conversations,
  getUsernameByPublicKeyBase58Check,
  selectedConversationPublicKey,
  onClick,
}: MessagingConversationAccountProps) => {
  const getConversationsAsArray = () => {
    return Object.keys(conversations) ?? [];
  };
  return (
    <div className="border-black min-w-[300px] [max-h-500px] rounded-md rounded-r-none overflow-y-auto">
      <div
        className={`border-r border-[#ffda59] py-2 px-4  bg-[#ffda59] min-h-[40px]`}
      >
        your key:{' '}
        {truncateDesoHandle(deso.identity.getUserKey() ?? '') ??
          'need to login in first'}
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
          >
            <MessagingDisplayAvatar
              publicKey={publicKey}
              deso={deso}
              diameter={30}
            />
            {username ? username : truncateDesoHandle(publicKey)}
          </div>
        );
      })}
    </div>
  );
};
