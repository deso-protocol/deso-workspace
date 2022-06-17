import { Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SampleAppEncryptedMessage } from '../../recoil/AppState.atoms';
// import { encryptMessage, sendMessage } from "../../services/DesoApiSendMessage";
import { LoginUser } from 'deso-protocol-types';
import { DesoContext } from '../../services/DesoContext';
export interface SendMessageProps {
  publicKey: string;
  myPublicKey: string;
  loggedInUser: LoginUser;
}
export const SendMessage = ({
  publicKey,
  myPublicKey,
  loggedInUser,
}: SendMessageProps) => {
  const deso = useContext(DesoContext);
  const [encryptedMessage, setEncryptedMessage] = useRecoilState(
    SampleAppEncryptedMessage
  );
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    if (encryptedMessage) {
      deso.social.sendMessage({
        EncryptedMessageText: encryptedMessage?.payload
          .encryptedMessage as string,
        RecipientPublicKeyBase58Check: publicKey,
        SenderPublicKeyBase58Check: myPublicKey,
        MinFeeRateNanosPerKB: 1000,
        SenderMessagingGroupKeyName: '',
        RecipientMessagingGroupKeyName: '',
      });
    }
  }, [setEncryptedMessage, encryptedMessage]);
  return (
    <>
      <TextField
        fullWidth
        placeholder="Send Message"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button
        onClick={(event) => {
          // TODO add
          //   deso.identity.encrypt(
          //     {
          //       RecipientMessagingKeyName: 'default-key',
          //       SenderPublicKeyBase58Check: myPublicKey,
          //       RecipientPublicKeyBase58Check: publicKey,
          //       SenderMessagingKeyName: 'default-key',
          //     },
          //     message,
          //     loggedInUser
          //   );
        }}
      >
        send message
      </Button>
    </>
  );
};
