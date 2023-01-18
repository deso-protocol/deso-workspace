import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { buttonClass } from '../consts/styles';

export const MessagingConversationButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const [isSending, setIsSending] = useState(false);
  return (
    <button
      className={`${buttonClass} border mx-auto `}
      onClick={async () => {
        setIsSending(true);
        try {
          await onClick();
        } catch {
          setIsSending(false);
        }
        setIsSending(false);
      }}
    >
      <div className="flex justify-center">
        {isSending ? (
          <ClipLoader color={'#6d4800'} loading={true} size={20} />
        ) : (
          <div className="mr-2">Get Conversations</div>
        )}
      </div>
    </button>
  );
};
