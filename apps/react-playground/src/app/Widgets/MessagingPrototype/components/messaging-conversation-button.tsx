import ClipLoader from 'react-spinners/ClipLoader';
import { buttonClass } from '../styles';

export interface MessagingConversationButtonProps {
  isSending: any;
  onClick: any;
}

export const MessagingConversationButton = ({
  isSending,
  onClick,
}: MessagingConversationButtonProps) => {
  return (
    <button className={`${buttonClass} border mx-auto `} onClick={onClick}>
      <div className="flex justify-center">
        {isSending === 'getConversation' ? (
          <ClipLoader color={'#6d4800'} loading={true} size={20} />
        ) : (
          <div className="mr-2">Get Conversations</div>
        )}
      </div>
    </button>
  );
};
