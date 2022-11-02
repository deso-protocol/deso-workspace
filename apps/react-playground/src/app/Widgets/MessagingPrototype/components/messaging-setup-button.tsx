import Deso from 'deso-protocol';
import ClipLoader from 'react-spinners/ClipLoader';
import { buttonClass } from '../styles';
export interface SetupMessagingButtonProps {
  onClick: any;
  isSending: string;
}
export const MessagingSetupButton = ({
  isSending,
  onClick,
}: SetupMessagingButtonProps) => {
  return (
    <button className={`${buttonClass} border mx-auto`} onClick={onClick}>
      <div className="flex justify-center">
        {isSending === 'setupMessaging' ? (
          <ClipLoader color={'#6d4800'} loading={true} size={20} />
        ) : (
          <div className="mr-2">Setup account for messaging</div>
        )}
      </div>{' '}
    </button>
  );
};
