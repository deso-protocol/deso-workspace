import Deso from 'deso-protocol';
import { MessagingDisplayAvatar } from './messaging-display-avatar';

export interface MessagingBubblesProps {
  conversations: any;
  conversationPublicKey: string;
  deso: Deso;
}
export const MessagingBubblesAndAvatar = ({
  conversations,
  conversationPublicKey,
  deso,
}: MessagingBubblesProps) => {
  if (Object.keys(conversations).length === 0 || conversationPublicKey === '') {
    return [<div></div>];
  }
  const conversation = conversations[conversationPublicKey] ?? [];
  return conversation.map((message: any, i: number) => {
    const messageToShow = message.DecryptedMessage || message.error;
    let senderStyles = 'bg-blue-500';
    if (!message.IsSender) {
      senderStyles = 'bg-green-500';
    }
    if (message.error) {
      senderStyles = 'bg-red-500';
    }
    return (
      <div
        className={`mx-2 ${
          message.IsSender
            ? 'ml-auto justify-end'
            : 'mr-auto items-start justify-start'
        }  max-w-[400px] mb-4 flex`}
      >
        {!message.IsSender && (
          <MessagingDisplayAvatar
            publicKey={message.SenderPublicKeyBase58Check}
            deso={deso}
            diameter={50}
          />
        )}
        <div
          className={`${senderStyles} p-2 rounded-lg bg-blue-500 text-white break-words max-w-[250px]`}
        >
          {messageToShow}
        </div>
        {message.IsSender && (
          <MessagingDisplayAvatar
            publicKey={message.SenderPublicKeyBase58Check}
            deso={deso}
            diameter={50}
          />
        )}
      </div>
    );
  });
};
