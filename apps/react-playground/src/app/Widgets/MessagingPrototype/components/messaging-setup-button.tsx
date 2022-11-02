import Deso from 'deso-protocol';
import { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { buttonClass } from '../consts/styles';
export interface SetupMessagingButtonProps {
  onClick: any;
}
export const MessagingSetupButton = ({
  onClick,
}: SetupMessagingButtonProps) => {
  const [isSending, setIsSending] = useState(false);
  return (
    <button
      className={`${buttonClass} border mx-auto`}
      onClick={async () => {
        setIsSending(true);
        try {
          const success = await onClick();
          if (!success) {
            alert('something went wrong when setting up the account');
          }
        } catch {
          alert('something went wrong when setting up the account');
        }
        setIsSending(false);
      }}
    >
      <div className="flex justify-center">
        {isSending ? (
          <ClipLoader color={'#6d4800'} loading={true} size={20} />
        ) : (
          <div className="mr-2">Setup account for messaging</div>
        )}
      </div>{' '}
    </button>
  );
};
