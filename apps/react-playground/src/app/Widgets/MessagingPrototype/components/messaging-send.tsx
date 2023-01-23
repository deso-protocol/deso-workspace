import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

export interface SendMessageButtonAndInputProps {
  onClick: (messageToSend: string) => void;
}

export const SendMessageButtonAndInput = ({
  onClick,
}: SendMessageButtonAndInputProps) => {
  const [isSending, setIsSending] = useState(false);
  const [messageToSend, setMessageToSend] = useState('');
  return (
    <div className="min-h-[80px] border-t border-l border-black flex justify-center ">
      <textarea
        className="min-h-[80px] max-h-[80px] min-w-[650px] p-2"
        onChange={(e) => {
          setMessageToSend(e.target.value);
        }}
        value={messageToSend}
      />
      <button
        onClick={async () => {
          if (messageToSend === '') {
            alert('message is empty');
            return;
          }
          setIsSending(true);
          try {
            await onClick(messageToSend);
          } catch (e: any) {
            setIsSending(false);
            alert(e);
            console.error(e);
            return;
          }
          setMessageToSend('');
          setIsSending(false);
        }}
        className={`rounded-br-md min-w-[150px] max-h-[80px] bg-[#06f] text-white`}
      >
        <div className="flex justify-center">
          {isSending ? (
            <ClipLoader color={'#fff'} loading={true} size={40} />
          ) : (
            <div className="mr-2">send message</div>
          )}
        </div>
      </button>
    </div>
  );
};
