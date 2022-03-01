import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { User } from "../../chapters/Interfaces/User";
import { SampleAppEncryptedMessage } from "../../recoil/AppState.atoms";
import { encryptMessage, sendMessage } from "../../services/DesoApiSendMessage";

export interface SendMessageProps {
  publicKey: string;
  myPublicKey: string;
  loggedInUser: User;
}
export const SendMessage = ({
  publicKey,
  myPublicKey,
  loggedInUser,
}: SendMessageProps) => {
  const [encryptedMessage, setEncryptedMessage] = useRecoilState(
    SampleAppEncryptedMessage
  );
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    if (encryptedMessage) {
      sendMessage({
        EncryptedMessageText: encryptedMessage?.payload
          .encryptedMessage as string,
        RecipientPublicKeyBase58Check: publicKey,
        SenderPublicKeyBase58Check: myPublicKey,
        MinFeeRateNanosPerKB: 1000,
        SenderMessagingGroupKeyName: "",
        RecipientMessagingGroupKeyName: "",
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
          encryptMessage(
            {
              RecipientMessagingKeyName: "default-key",
              SenderPublicKeyBase58Check: myPublicKey,
              RecipientPublicKeyBase58Check: publicKey,
              SenderMessagingKeyName: "default-key",
            },
            message,
            loggedInUser
          );
        }}
      >
        send message
      </Button>
    </>
  );
};
