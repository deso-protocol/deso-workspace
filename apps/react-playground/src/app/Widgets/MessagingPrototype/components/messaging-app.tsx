import { useEffect, useState } from 'react';
import Deso from 'deso-protocol';
import { getDerivedKeyResponse } from '../store';
import { SendMessageButtonAndInput } from './messaging-send';
import {
  loadPageAndConversations,
  setupMessaging,
} from './messaging-app.service';
import { MessagingSetupButton } from './messaging-setup-button';
import { MessagingSwitchUsers } from './messaging-switch-users';
import { MessagingConversationButton } from './messaging-conversation-button';
import { MessagingConversationAccount } from './messaging-conversation-accounts';
export interface MessagingAppProps {
  deso: Deso;
}
export const MessagingApp = ({ deso }: MessagingAppProps) => {
  useEffect(() => {
    const key = deso.identity.getUserKey();
    if (key) {
      const hasSetupMessagingAlready = !!getDerivedKeyResponse(key);
      if (hasSetupMessagingAlready) {
        loadPageAndConversations(
          deso,
          derivedResponse,
          setGetUsernameByPublicKeyBase58Check,
          setConversations,
          setSelectedConversationPublicKey,
          setConversationAccounts
        );
      }
    }
  }, []);

  const [
    getUsernameByPublicKeyBase58Check,
    setGetUsernameByPublicKeyBase58Check,
  ] = useState<{ [key: string]: string }>({});
  const [derivedResponse, setDerivedResponse] = useState({});
  const [isSending, setIsSending] = useState<
    'getConversation' | 'setupMessaging' | 'message' | 'none'
  >('none');
  const [hasSetupAccount, setHasSetupAccount] = useState(false);

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
                  {!hasSetupAccount && (
                    <MessagingSetupButton
                      onClick={async () => {
                        setIsSending('setupMessaging');
                        try {
                          const success = await setupMessaging(
                            deso,
                            setDerivedResponse,
                            setHasSetupAccount
                          );
                          if (!success) {
                            alert(
                              'something went wrong when setting up the account'
                            );
                          }
                        } catch {
                          setIsSending('none');
                        }
                      }}
                      isSending={isSending}
                    />
                  )}

                  {hasSetupAccount && (
                    <MessagingConversationButton
                      isSending={isSending}
                      onClick={() =>
                        loadPageAndConversations(
                          deso,
                          derivedResponse,
                          setGetUsernameByPublicKeyBase58Check,
                          setConversations,
                          setSelectedConversationPublicKey,
                          {}
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
                  onClick={() => {
                    //
                  }}
                  deso={deso}
                  setIsSending={setIsSending}
                  selectedConversationPublicKey={selectedConversationPublicKey}
                  derivedResponse={derivedResponse}
                  isSending={isSending}
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
