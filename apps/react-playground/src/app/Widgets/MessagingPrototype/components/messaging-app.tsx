import { useEffect, useState } from 'react';
import Deso from 'deso-protocol';
import { getDerivedKeyResponse } from '../services/store';
import { SendMessageButtonAndInput } from './messaging-send';
import {
  getConversationsMap,
  getConversations,
  setupMessaging,
} from './messaging-app.service';
import { MessagingSetupButton } from './messaging-setup-button';
import { MessagingSwitchUsers } from './messaging-switch-users';
import { MessagingConversationButton } from './messaging-conversation-button';
import { MessagingConversationAccount } from './messaging-conversation-accounts';
import { MessagingBubblesAndAvatar } from './messaging-bubbles';
import ClipLoader from 'react-spinners/ClipLoader';
export interface MessagingAppProps {
  deso: Deso;
}
export const MessagingApp = ({ deso }: MessagingAppProps) => {
  useEffect(() => {
    init();
  }, []);
  const rehydrateConversation = async () => {
    const key = deso.identity.getUserKey() as string;
    const conversations = await getConversations(
      // gives us all the conversations
      deso,
      getDerivedKeyResponse(key),
      setGetUsernameByPublicKeyBase58Check,
      setConversations,
      setSelectedConversationPublicKey
    );

    const keyToUse =
      selectedConversationPublicKey || Object.keys(conversations)[0];
    setSelectedConversationPublicKey(keyToUse);
    setConversationAccounts(
      // toss the conversations into the UI
      <MessagingBubblesAndAvatar
        deso={deso}
        conversationPublicKey={keyToUse}
        conversations={conversations}
      />
    );
    setConversations(conversations);

    setAutoFetchConversations(false);
  };
  const init = async () => {
    const key = deso.identity.getUserKey();
    if (key) {
      const derivedResponse = getDerivedKeyResponse(key); //have they set a derived key before?
      const hasSetupMessagingAlready =
        !!derivedResponse.derivedPublicKeyBase58Check;
      setHasSetupAccount(hasSetupMessagingAlready);
      if (hasSetupMessagingAlready) {
        setAutoFetchConversations(true);
        setDerivedResponse(derivedResponse);
        await rehydrateConversation();
      }
    }
  };

  const [
    getUsernameByPublicKeyBase58Check,
    setGetUsernameByPublicKeyBase58Check,
  ] = useState<{ [key: string]: string }>({});
  const [derivedResponse, setDerivedResponse] = useState({});
  const [hasSetupAccount, setHasSetupAccount] = useState(false);
  const [autoFetchConversations, setAutoFetchConversations] = useState(false);
  const [conversationAccounts, setConversationAccounts] = useState<any>(<></>);
  const [selectedConversationPublicKey, setSelectedConversationPublicKey] =
    useState('');
  const [conversations, setConversations] = useState<{ [key: string]: any[] }>(
    {}
  );
  return (
    <div>
      <div className="bg-[#0C2F62] min-h-full">
        <div className="text-center text-white mb-10 mt-4 ">
          Below you will find a table that encompasses the required steps to to
          send messages peer to peer on the deso blockchain.
          <div className="flex justify-center mt-5">
            {Object.keys(conversations).length === 0 && (
              <div className="min-h-[600px] min-w-[1101px] bg-neutral-200 rounded-md mt-5">
                <div className="bg-[#ffda59] min-w-[1101px] min-h-[41px] border-b border-black rounded-t-md">
                  {' '}
                </div>
                <div className="flex flex-col justify-center min-h-[559px]">
                  {autoFetchConversations && (
                    <div>
                      <ClipLoader color={'#6d4800'} loading={true} size={20} />
                    </div>
                  )}
                  {!autoFetchConversations && !hasSetupAccount && (
                    <MessagingSetupButton
                      onClick={async () => {
                        const success = await setupMessaging(
                          deso,
                          setDerivedResponse,
                          setHasSetupAccount
                        );
                        return success;
                      }}
                    />
                  )}

                  {!autoFetchConversations && hasSetupAccount && (
                    <MessagingConversationButton
                      onClick={() =>
                        getConversations(
                          deso,
                          derivedResponse,
                          setGetUsernameByPublicKeyBase58Check,
                          setConversations,
                          setSelectedConversationPublicKey
                        )
                      }
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {Object.keys(conversations).length !== 0 && (
          <div className="flex flex-col justify-center">
            <div className="bg-neutral-200 mx-auto ed-md flex  min-h-[600px] max-h-[600px] rounded-md">
              <MessagingConversationAccount
                onClick={async (key: string) => {
                  setSelectedConversationPublicKey(key);
                  const conversations = await getConversationsMap(
                    deso,
                    derivedResponse
                  );
                  const conversationsArray = Object.keys(conversations);
                  setConversationAccounts(
                    <MessagingBubblesAndAvatar
                      conversationPublicKey={key ?? conversationsArray[0]}
                      deso={deso}
                      conversations={conversations}
                    />
                  );
                }}
                deso={deso}
                conversations={conversations}
                getUsernameByPublicKeyBase58Check={
                  getUsernameByPublicKeyBase58Check
                }
                selectedConversationPublicKey={selectedConversationPublicKey}
                setSelectedConversationPublicKey={
                  setSelectedConversationPublicKey
                }
                derivedResponse={derivedResponse}
                setConversationComponent={setConversationAccounts}
              />
              <div>
                <div className="text-center bg-[#ffda59] border-b border-black py-2 min-w-[750px]  rounded-tr-md min-h-[41px]"></div>
                <div
                  className="min-h-[478px] max-h-[478px] overflow-auto border-l border-black pt-6"
                  id="message-container"
                >
                  {conversationAccounts}
                </div>
                <SendMessageButtonAndInput
                  onClick={async (messageToSend: string) => {
                    try {
                      await deso.utils.encryptMessage(
                        deso,
                        messageToSend,
                        derivedResponse,
                        selectedConversationPublicKey
                      );
                      rehydrateConversation();
                      const messageContainer =
                        document.getElementById('message-container');
                      if (!messageContainer) {
                        return;
                      }
                      messageContainer.scrollTop =
                        messageContainer.scrollHeight;
                    } catch {
                      //
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <MessagingSwitchUsers deso={deso} />
      </div>
    </div>
  );
};
