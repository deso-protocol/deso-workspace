import { useEffect, useState } from 'react';
import Deso from 'deso-protocol';
import { getDerivedKeyResponse } from '../services/store';
import { SendMessageButtonAndInput } from './messaging-send';
import {
  ConversationMap,
  getConversations,
  setupMessaging,
} from '../services/messaging-app.service';
import { MessagingSetupButton } from './messaging-setup-button';
import { MessagingSwitchUsers } from './messaging-switch-users';
import { MessagingConversationButton } from './messaging-conversation-button';
import { MessagingConversationAccount } from './messaging-conversation-accounts';
import { MessagingBubblesAndAvatar } from './messaging-bubbles';
import ClipLoader from 'react-spinners/ClipLoader';
import {
  ChatType,
  DecryptedMessageEntryResponse,
  DerivedPrivateUserInfo,
  DeSoNetwork,
} from 'deso-protocol-types';
export const MessagingApp: React.FC<{
  deso: Deso;
}> = ({ deso }) => {
  useEffect(() => {
    init();
  }, []);

  const rehydrateConversation = async (selectedKey = '') => {
    const key = deso.identity.getUserKey() as string;
    const res = await getConversations(
      // gives us all the conversations
      deso,
      getDerivedKeyResponse(key),
      setGetUsernameByPublicKeyBase58Check,
      setConversations,
      setSelectedConversationPublicKey
    );
    const conversations = res.Conversations || {};
    const keyToUse =
      selectedKey ||
      selectedConversationPublicKey ||
      Object.keys(conversations)[0];
    setSelectedConversationPublicKey(keyToUse);
    setConversations(conversations);
    await getConversation(
      conversations,
      keyToUse,
      setConversationAccounts,
      setConversations,
      getUsernameByPublicKeyBase58Check,
      setGetUsernameByPublicKeyBase58Check
    );
    // setConversationAccounts(
    //   // toss the conversations into the UI
    //   <MessagingBubblesAndAvatar
    //     deso={deso}
    //     conversationPublicKey={keyToUse}
    //     conversations={conversations}
    //   />
    // );
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
  const [derivedResponse, setDerivedResponse] = useState<
    Partial<DerivedPrivateUserInfo>
  >({});
  const [hasSetupAccount, setHasSetupAccount] = useState(false);
  const [autoFetchConversations, setAutoFetchConversations] = useState(false);
  const [conversationAccounts, setConversationAccounts] = useState<JSX.Element>(
    <div></div>
  );
  const [selectedConversationPublicKey, setSelectedConversationPublicKey] =
    useState('');
  const [conversations, setConversations] = useState<ConversationMap>({});

  // TODO: add support for group chats and pagination
  const getConversation = async (
    currentConversations: ConversationMap,
    pubKeyPlusGroupName: string,
    setConversationAccounts: (x: JSX.Element) => void,
    setConversations: (x: ConversationMap) => void,
    currentGetUsernameByPublicKeyBase58Check: { [k: string]: string },
    setGetUsernameByPublicKeyBase58Check: (x: { [k: string]: string }) => void
  ) => {
    const currentConvo = currentConversations[pubKeyPlusGroupName];
    if (!currentConvo) {
      return;
    }
    const convo = currentConvo.messages;
    if (!convo?.length) {
      return;
    }
    const firstMessage = convo[0];
    const myAccessGroups = await deso.accessGroup.GetAllUserAccessGroups({
      PublicKeyBase58Check: deso.identity.getUserKey() as string,
    });
    const allMyAccessGroups = Array.from(
      new Set([
        ...(myAccessGroups.AccessGroupsOwned || []),
        ...(myAccessGroups.AccessGroupsMember || []),
      ])
    );
    const derivedKeyResponse = getDerivedKeyResponse(
      deso.identity.getUserKey() as string
    );
    if (firstMessage.ChatType === ChatType.DM) {
      const messages = await deso.accessGroup.GetPaginatedMessagesForDmThread({
        UserGroupOwnerPublicKeyBase58Check:
          firstMessage.SenderInfo.OwnerPublicKeyBase58Check,
        UserGroupKeyName: firstMessage.SenderInfo.AccessGroupKeyName,
        PartyGroupOwnerPublicKeyBase58Check:
          firstMessage.RecipientInfo.OwnerPublicKeyBase58Check,
        PartyGroupKeyName: firstMessage.RecipientInfo.AccessGroupKeyName,
        MaxMessagesToFetch: 100,
        StartTimeStamp: firstMessage.MessageInfo.TimestampNanos * 10,
      });

      // TODO: get my access groups
      const decrypted = await deso.utils.decryptAccessGroupMessages(
        deso.identity.getUserKey() as string,
        messages.ThreadMessages,
        allMyAccessGroups,
        { decryptedKey: derivedKeyResponse.messagingPrivateKey as string }
      );
      console.log();
      setConversations({
        ...currentConversations,
        ...{
          [pubKeyPlusGroupName]: {
            firstMessagePublicKey: decrypted[0].IsSender
              ? decrypted[0].RecipientInfo.OwnerPublicKeyBase58Check
              : decrypted[0].SenderInfo.OwnerPublicKeyBase58Check,
            messages: decrypted,
            ChatType: ChatType.DM,
          },
        },
      });
      setConversationAccounts(
        // toss the conversations into the UI
        <MessagingBubblesAndAvatar
          deso={deso}
          conversationPublicKey={pubKeyPlusGroupName}
          conversations={conversations}
          getUsernameByPublicKey={getUsernameByPublicKeyBase58Check}
        />
      );
    } else {
      const messages =
        await deso.accessGroup.GetPaginatedMessagesForGroupChatThread({
          UserPublicKeyBase58Check:
            firstMessage.RecipientInfo.OwnerPublicKeyBase58Check,
          AccessGroupKeyName: firstMessage.RecipientInfo.AccessGroupKeyName,
          StartTimeStamp: firstMessage.MessageInfo.TimestampNanos * 10,
          MaxMessagesToFetch: 100,
        });

      const newPublicKeysToGet = new Set<string>();
      messages.GroupChatMessages.forEach((m) => {
        newPublicKeysToGet.add(m.RecipientInfo.OwnerPublicKeyBase58Check);
        newPublicKeysToGet.add(m.SenderInfo.OwnerPublicKeyBase58Check);
      });

      const usersStatelessResponse = await deso.user.getUserStateless({
        PublicKeysBase58Check: Array.from(newPublicKeysToGet),
        SkipForLeaderboard: true,
      });

      const newPublicKeyToUsernames: { [k: string]: string } = {};
      (usersStatelessResponse.UserList || []).forEach((u) => {
        if (u.ProfileEntryResponse?.Username) {
          newPublicKeyToUsernames[u.PublicKeyBase58Check] =
            u.ProfileEntryResponse.Username;
        }
      });

      setGetUsernameByPublicKeyBase58Check({
        ...currentGetUsernameByPublicKeyBase58Check,
        ...newPublicKeyToUsernames,
      });

      const decrypted = await deso.utils.decryptAccessGroupMessages(
        deso.identity.getUserKey() as string,
        messages.GroupChatMessages,
        allMyAccessGroups,
        { decryptedKey: derivedKeyResponse.messagingPrivateKey as string }
      );

      // TODO: how do we want to manage conversation - our unique identifier is owner + group key name
      setConversations({
        ...currentConversations,
        ...{
          [pubKeyPlusGroupName]: {
            firstMessagePublicKey:
              firstMessage.RecipientInfo.OwnerPublicKeyBase58Check,
            messages: decrypted,
            ChatType: ChatType.GROUPCHAT,
          },
        },
      });

      setConversationAccounts(
        <MessagingBubblesAndAvatar
          deso={deso}
          conversationPublicKey={pubKeyPlusGroupName}
          conversations={conversations}
          getUsernameByPublicKey={getUsernameByPublicKeyBase58Check}
        />
      );
    }
  };

  const AddMember = async (groupName: string) => {
    const { AccessGroupEntries, PairsNotFound } =
      await deso.accessGroup.GetBulkAccessGroupEntries({
        // TODO: slot in other public key here. Right now, we've hard coded in mr cool.
        GroupOwnerAndGroupKeyNamePairs: [
          'tBCKVv5H1Gz6RTRhjxJwdzcfwfwoUo8b4PYWSKkayG4dy76Jsjt2Ro',
        ].map((pubKey) => {
          return {
            GroupOwnerPublicKeyBase58Check: pubKey,
            GroupKeyName: 'default-key',
          };
        }),
      });

    if (PairsNotFound?.length) {
      alert('pair missing!!');
      return;
    }

    const accessGroupDerivation = deso.utils.getAccessGroupStandardDerivation(
      derivedResponse.messagingPublicKeyBase58Check as string,
      groupName,
      DeSoNetwork.testnet
    );

    const addMembersTxn = await deso.accessGroup.AddAccessGroupMembers(
      {
        AccessGroupOwnerPublicKeyBase58Check:
          deso.identity.getUserKey() as string,
        AccessGroupKeyName: groupName,
        AccessGroupMemberList: AccessGroupEntries.map((accessGroupEntry) => {
          return {
            AccessGroupMemberPublicKeyBase58Check:
              accessGroupEntry.AccessGroupOwnerPublicKeyBase58Check,
            AccessGroupMemberKeyName: accessGroupEntry.AccessGroupKeyName,
            EncryptedKey:
              deso.utils.encryptAccessGroupPrivateKeyToMemberDefaultKey(
                accessGroupEntry.AccessGroupPublicKeyBase58Check,
                accessGroupDerivation.AccessGroupPrivateKeyHex
              ),
          };
        }),
        MinFeeRateNanosPerKB: 1000,
      },
      {
        broadcast: false,
      }
    );

    const signedAddMembersTransaction = deso.utils.signTransaction(
      derivedResponse.derivedSeedHex as string,
      addMembersTxn.TransactionHex,
      true
    );

    await deso.transaction
      .submitTransaction(signedAddMembersTransaction)
      .catch(() => {
        throw 'something went wrong while submitting the transaction';
      });
  };

  return (
    <div>
      <div className="bg-[#0C2F62] min-h-full">
        <div className="text-center text-white mb-10 mt-4 ">
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
                      onClick={rehydrateConversation}
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
                rehydrateConversation={rehydrateConversation}
                onClick={async (key: string) => {
                  setSelectedConversationPublicKey(key);
                  getConversation(
                    conversations,
                    key,
                    setConversationAccounts,
                    setConversations,
                    getUsernameByPublicKeyBase58Check,
                    setGetUsernameByPublicKeyBase58Check
                  );
                  // await rehydrateConversation(key);
                }}
                deso={deso}
                conversations={conversations}
                getUsernameByPublicKeyBase58Check={
                  getUsernameByPublicKeyBase58Check
                }
                selectedConversationPublicKey={selectedConversationPublicKey}
                setSelectedConversationPublicKey={(selected) => {
                  setSelectedConversationPublicKey(selected);
                  getConversation(
                    conversations,
                    selected,
                    setConversationAccounts,
                    setConversations,
                    getUsernameByPublicKeyBase58Check,
                    setGetUsernameByPublicKeyBase58Check
                  );
                }}
                derivedResponse={derivedResponse}
                setConversationComponent={setConversationAccounts}
              />
              <div>
                <div className="text-center bg-[#ffda59] border-b border-black py-2 min-w-[750px]  rounded-tr-md min-h-[41px] flex justify-center">
                  {conversations[selectedConversationPublicKey]?.ChatType ===
                    ChatType.GROUPCHAT &&
                    conversations[selectedConversationPublicKey].messages[0]
                      .RecipientInfo.OwnerPublicKeyBase58Check ===
                      (deso.identity.getUserKey() as string) && (
                      <div
                        className="rounded-br-md min-w-[150px] max-h-[80px] bg-[#06f] text-white max-w-[200px]"
                        onClick={() =>
                          AddMember(
                            conversations[selectedConversationPublicKey]
                              .messages[0].RecipientInfo.AccessGroupKeyName
                          )
                        }
                      >
                        Add Member
                      </div>
                    )}
                </div>
                <div
                  className="min-h-[478px] max-h-[478px] overflow-auto border-l border-black pt-6"
                  id="message-container"
                >
                  {conversationAccounts}
                </div>
                <SendMessageButtonAndInput
                  onClick={async (messageToSend: string) => {
                    try {
                      const convo =
                        conversations[selectedConversationPublicKey];
                      // TODO: fix for group chat sends. need to use encrypted key
                      await deso.utils.encryptAndSendNewMessage(
                        deso,
                        messageToSend,
                        derivedResponse.derivedSeedHex as string,
                        derivedResponse.messagingPrivateKey as string,
                        convo.ChatType === ChatType.DM
                          ? convo.firstMessagePublicKey
                          : convo.messages[0].RecipientInfo
                              .OwnerPublicKeyBase58Check,
                        true,
                        convo.ChatType === ChatType.DM
                          ? 'default-key'
                          : convo.messages[0].RecipientInfo.AccessGroupKeyName
                        // recipient key name
                        // sender key name
                      );
                      // await deso.utils.encryptAndSendMessageV3(
                      //   deso,
                      //   messageToSend,
                      //   derivedResponse.derivedSeedHex as string,
                      //   derivedResponse.messagingPrivateKey as string,
                      //   selectedConversationPublicKey,
                      //   true
                      // );
                      // await rehydrateConversation();
                      getConversation(
                        conversations,
                        selectedConversationPublicKey,
                        setConversationAccounts,
                        setConversations,
                        getUsernameByPublicKeyBase58Check,
                        setGetUsernameByPublicKeyBase58Check
                      );
                      const messageContainer =
                        document.getElementById('message-container');
                      if (!messageContainer) {
                        return;
                      }
                      messageContainer.scrollTop =
                        messageContainer.scrollHeight;
                    } catch (e: any) {
                      alert(e);
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
