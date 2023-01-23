import Deso from 'deso-protocol';
import { DecryptedMessageEntryResponse } from 'deso-protocol-types';
import { DecryptedResponse } from '../consts/constants';
import { ConversationMap } from '../services/messaging-app.service';
import { truncateDesoHandle } from '../services/utils';
import { MessagingDisplayAvatar } from './messaging-display-avatar';

export interface MessagingBubblesProps {
  conversations: ConversationMap;
  conversationPublicKey: string;
  deso: Deso;
  getUsernameByPublicKey: { [k: string]: string };
}
export const MessagingBubblesAndAvatar: React.FC<{
  conversations: ConversationMap;
  conversationPublicKey: string;
  deso: Deso;
  getUsernameByPublicKey: { [k: string]: string };
}> = ({
  conversations,
  conversationPublicKey,
  deso,
  getUsernameByPublicKey,
}: MessagingBubblesProps) => {
  if (Object.keys(conversations).length === 0 || conversationPublicKey === '') {
    return <div></div>;
  }
  // TODO: fetch rest of convo. Pagination
  const conversation = conversations[conversationPublicKey] ?? {};
  return (
    <div>
      {(conversation.messages || []).map((message, i: number) => {
        const messageToShow = message.DecryptedMessage || message.error;
        let senderStyles = 'bg-blue-500';
        // ugh we have to modify "isSender" in here because things are dumb.
        const IsSender =
          message.IsSender ||
          message.SenderInfo.OwnerPublicKeyBase58Check ===
            (deso.identity.getUserKey() as string);
        if (IsSender) {
          senderStyles = 'bg-green-500';
        }
        if (message.error) {
          senderStyles = 'bg-red-500';
        }
        return (
          <div
            className={`mx-2 ${
              IsSender ? 'ml-auto justify-end' : 'mr-auto justify-start'
            }  max-w-[400px] mb-4 flex`}
            key={`message-${i}`}
          >
            {!IsSender && (
              <div className="flex flex-col">
                <MessagingDisplayAvatar
                  publicKey={message.SenderInfo.OwnerPublicKeyBase58Check}
                  timeStamp={message.MessageInfo.TimestampNanos}
                  deso={deso}
                  diameter={50}
                />
                <div className="text-xs ml-2">
                  <i>
                    {getUsernameByPublicKey[
                      message.SenderInfo.OwnerPublicKeyBase58Check
                    ] ||
                      truncateDesoHandle(
                        message.SenderInfo.OwnerPublicKeyBase58Check
                      )}
                  </i>
                </div>
              </div>
            )}
            <div
              className={`${senderStyles}  mt-auto mb-5 p-2 rounded-lg bg-blue-500 text-white break-words max-w-[250px]`}
            >
              {messageToShow}
            </div>
            {IsSender && (
              <div className="flex flex-col">
                <MessagingDisplayAvatar
                  publicKey={message.SenderInfo.OwnerPublicKeyBase58Check}
                  timeStamp={message.MessageInfo.TimestampNanos}
                  deso={deso}
                  diameter={50}
                />
                <div className="text-xs ml-2">
                  <i>
                    {getUsernameByPublicKey[
                      message.SenderInfo.OwnerPublicKeyBase58Check
                    ] ||
                      truncateDesoHandle(
                        message.SenderInfo.OwnerPublicKeyBase58Check
                      )}
                  </i>
                </div>
              </div>
            )}
          </div>
        );
      })}
      ,
    </div>
  );
};
