import Deso from 'deso-protocol';
import {
  ChatType,
  DecryptedMessageEntryResponse,
  DerivedPrivateUserInfo,
  DeSoNetwork,
} from 'deso-protocol-types';
import { access } from 'fs';
import { useEffect, useState } from 'react';
import { DecryptedResponse } from '../consts/constants';
import { ConversationMap } from '../services/messaging-app.service';
import { truncateDesoHandle } from '../services/utils';
import { MessagingDisplayAvatar } from './messaging-display-avatar';
import { MessagingStartNewConversation } from './messaging-start-new-conversation';

const ct_pubKey = 'tBCKVERmG9nZpHTk2AVPqknWc1Mw9HHAnqrTpW1RnXpXMQ4PsQgnmV';
const meowbeam_pubKey =
  'tBCKUvZnSitfCu8odocnPHoxZsZWpPZpmrc4vBJVtSzV6DQyKs9bYB';
const nina_pubKey = 'tBCKW665XZnvVZcCfcEmyeecSZGKAdaxwV2SH9UFab6PpSRikg4EJ2';

export const MessagingConversationAccount: React.FC<{
  deso: Deso;
  conversations: ConversationMap;
  getUsernameByPublicKeyBase58Check: { [key: string]: string };
  selectedConversationPublicKey: string;
  setSelectedConversationPublicKey: (selectedKey: string) => void;
  derivedResponse: Partial<DerivedPrivateUserInfo>;
  setConversationComponent: (conversationComponent: JSX.Element) => void;
  onClick: (publicKey: string) => void;
  rehydrateConversation: (publicKey: string) => void;
}> = ({
  deso,
  conversations,
  getUsernameByPublicKeyBase58Check,
  selectedConversationPublicKey,
  onClick,
  setSelectedConversationPublicKey,
  rehydrateConversation,
  derivedResponse,
}) => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    getLoggedInUsersUsername();
  }, []);
  const getLoggedInUsersUsername = async () => {
    try {
      const response = await deso.user.getSingleProfile({
        PublicKeyBase58Check: deso.identity.getUserKey() as string,
      });
      setUsername(
        response.Profile?.Username || (deso.identity.getUserKey() as string)
      );
    } catch (e) {
      console.error(e);
    }
  };
  const startGroupChat = async () => {
    // TODO: fill in some hardcoded stuff here for now just so we can get started.
    const r = (Math.random() + 1).toString(36).substring(2);
    const groupName = 'Group-' + r;
    const accessGroupDerivation = deso.utils.getAccessGroupStandardDerivation(
      derivedResponse.messagingPublicKeyBase58Check as string,
      groupName,
      DeSoNetwork.testnet
    );
    const txn = await deso.accessGroup.CreateAccessGroup(
      {
        AccessGroupKeyName: groupName,
        AccessGroupOwnerPublicKeyBase58Check:
          deso.identity.getUserKey() as string,
        AccessGroupPublicKeyBase58Check:
          accessGroupDerivation.AccessGroupPublicKeyBase58Check,
        MinFeeRateNanosPerKB: 1000,
      },
      {
        broadcast: false,
      }
    );

    const signedTransaction = deso.utils.signTransaction(
      derivedResponse.derivedSeedHex as string,
      txn.TransactionHex,
      true
    );

    await deso.transaction.submitTransaction(signedTransaction).catch(() => {
      throw 'something went wrong while submitting the transaction';
    });
    // For now, we'll hard code these things. Later, we'll have an UI to select members from a search
    // and we'll add the logged in user as well.
    const { AccessGroupEntries, PairsNotFound } =
      await deso.accessGroup.GetBulkAccessGroupEntries({
        GroupOwnerAndGroupKeyNamePairs: [
          ct_pubKey,
          meowbeam_pubKey,
          nina_pubKey,
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

    // And we'll send a message just so it pops up for convenience
    await deso.utils.encryptAndSendNewMessage(
      deso,
      `first message to ${groupName}`,
      derivedResponse.derivedSeedHex as string,
      derivedResponse.messagingPrivateKey as string,
      deso.identity.getUserKey() as string,
      true,
      accessGroupDerivation.AccessGroupKeyName
    );
  };
  return (
    <div className="border-black min-w-[300px] [max-h-500px] rounded-md rounded-r-none overflow-y-auto">
      <div
        className={`border-r border-[#ffda59] py-2 px-4  bg-[#ffda59] min-h-[40px]`}
      >
        <div className="font-bold ml-2">
          Logged in as:{' '}
          {(username || truncateDesoHandle(deso.identity.getUserKey() ?? '')) ??
            'need to login in first'}
        </div>
      </div>
      <div onClick={startGroupChat} className="px-2">
        Start Group Chat
      </div>
      <MessagingStartNewConversation
        deso={deso}
        setSelectedConversationPublicKey={setSelectedConversationPublicKey}
        rehydrateConversation={rehydrateConversation}
        selectedConversationPublicKey={selectedConversationPublicKey}
        conversations={conversations}
      />
      <div className="text-center p-2 border-t border-black bg-[#06f] text-white">
        Conversations{' '}
      </div>
      {Object.entries(conversations).map(([key, value]) => {
        const publicKey =
          value.ChatType === ChatType.DM
            ? value.firstMessagePublicKey
            : value.messages[0].RecipientInfo.OwnerPublicKeyBase58Check;
        const chatName =
          value.ChatType === ChatType.DM
            ? getUsernameByPublicKeyBase58Check[value.firstMessagePublicKey] ??
              null
            : value.messages[0].RecipientInfo.AccessGroupKeyName;
        const selectedConversationStyle =
          key === selectedConversationPublicKey ? 'bg-slate-400' : '';
        return (
          <div
            onClick={() => {
              onClick(key);
            }}
            className={`border-t border-black py-2 px-2 ${selectedConversationStyle} hover:bg-slate-400 hover:pointer cursor-pointer flex justify-start`}
            key={`message-thread-${key}`}
          >
            <MessagingDisplayAvatar
              publicKey={
                ChatType.DM === value.ChatType
                  ? value.firstMessagePublicKey
                  : ''
              } // TODO: what avatar for group chat
              deso={deso}
              diameter={30}
            />
            <div className="flex flex-col justify-start">
              <span>{chatName || truncateDesoHandle(publicKey)}</span>
              {value.ChatType === ChatType.DM && (
                <span>
                  <i>{deso.ethereum.desoAddressToEthereumAddress(publicKey)}</i>
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
