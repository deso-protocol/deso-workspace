import Deso from 'deso-protocol';

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
  const avatarClasses =
    'w-12 h-12 bg-no-repeat bg-center bg-cover  rounded-full min-w-[50px] mx-2';
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
        className={`mx-2 ${
          message.IsSender
            ? 'ml-auto justify-end'
            : 'mr-auto items-start justify-start'
        }  max-w-[400px] mb-4 flex`}
      >
        {!message.IsSender && (
          <div
            style={{ backgroundImage: profilePicURL }}
            className={avatarClasses}
          ></div>
        )}
        <div
          className={`${senderStyles} p-2 rounded-lg bg-blue-500 text-white break-words`}
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
