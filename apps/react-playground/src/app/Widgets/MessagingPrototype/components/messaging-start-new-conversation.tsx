import Deso from 'deso-protocol';
import {
  DecryptedMessageEntryResponse,
  DeSoNetwork,
  ProfileEntryResponse,
} from 'deso-protocol-types';
import { useEffect, useState } from 'react';
import { DecryptedResponse } from '../consts/constants';
import { ConversationMap } from '../services/messaging-app.service';
import { MessagingDisplayAvatar } from './messaging-display-avatar';

export const MessagingStartNewConversation: React.FC<{
  deso: Deso;
  setSelectedConversationPublicKey: (selectedKey: string) => void;
  rehydrateConversation: (publicKey: string) => void;
  selectedConversationPublicKey: string;
  conversations: ConversationMap;
}> = ({
  deso,
  setSelectedConversationPublicKey,
  rehydrateConversation,
  selectedConversationPublicKey,
  conversations,
}) => {
  const [searchedUsers, setSearchedUsers] = useState<ProfileEntryResponse[]>(
    []
  );
  const [searchPrefix, setSearchPrefix] = useState<string>('');
  const searchUsersByUsername = async (UsernamePrefix: string) => {
    if (!UsernamePrefix) {
      return [];
    }
    if (/^0x[a-fA-F0-9]{40}$/g.test(UsernamePrefix)) {
      // If it barks like an ETH address, give it a shot.
      const desoPublicKey = await deso.ethereum.ethAddressToDeSoPublicKey(
        UsernamePrefix,
        DeSoNetwork.testnet // TODO: parameterize this somehow
      );
      const user = await deso.user.getUsersStateless({
        PublicKeysBase58Check: [desoPublicKey],
        SkipForLeaderboard: true,
      });
      // TODO: we probably want to just jam the ETH address in there.
      if (user?.UserList) {
        return user.UserList.map((u) => {
          if (u.ProfileEntryResponse) {
            return {
              ...u.ProfileEntryResponse,
              ...{
                ETHAddress: UsernamePrefix,
              },
            };
          }
          return {
            PublicKeyBase58Check: u.PublicKeyBase58Check,
            ETHAddress: UsernamePrefix,
          };
        }) as ProfileEntryResponseWithETHAddress[];
      }
      return [];
    } else {
      const response = await deso.user.getProfiles({
        NumToFetch: 10,
        UsernamePrefix,
      });
      return response.ProfilesFound ?? [];
    }
  };
  return (
    <div>
      <input
        className="min-h-[65px] max-h-[65px] min-w-[450px] py-2 px-4 border-t border-black"
        placeholder="Search For Users"
        onChange={async (e) => {
          setSearchPrefix(e.target.value);
          const userNames = await searchUsersByUsername(e.target.value);
          setSearchedUsers(userNames);
        }}
        value={searchPrefix}
      />
      <SearchResults
        searchedUsers={searchedUsers}
        deso={deso}
        searchPrefix={searchPrefix}
        setSearchPrefix={setSearchPrefix}
        setSearchedUsers={setSearchedUsers}
        setSelectedConversationPublicKey={setSelectedConversationPublicKey}
        selectedConversationPublicKey={selectedConversationPublicKey}
        rehydrateConversation={rehydrateConversation}
        conversations={conversations}
      />
    </div>
  );
};

export type ProfileEntryResponseWithETHAddress = ProfileEntryResponse & {
  ETHAddress?: string;
};

export const SearchResults: React.FC<{
  searchedUsers: ProfileEntryResponseWithETHAddress[];
  deso: Deso;
  searchPrefix: string;
  setSearchPrefix: (prefix: string) => void;
  setSearchedUsers: (
    searchedUsers: ProfileEntryResponseWithETHAddress[]
  ) => void;
  setSelectedConversationPublicKey: (publicKey: string) => void;
  rehydrateConversation: (publicKey: string) => void;
  selectedConversationPublicKey: string;
  conversations: ConversationMap;
}> = ({
  searchedUsers,
  deso,
  searchPrefix,
  setSearchPrefix,
  setSearchedUsers,
  setSelectedConversationPublicKey,
  rehydrateConversation,
  selectedConversationPublicKey,
  conversations,
}) => {
  const [searchedPublicKey, setSearchedPublicKey] = useState('');
  // I think we can get rid of this?
  // useEffect(() => {
  //   if (Object.keys(conversations).includes(searchedPublicKey)) {
  //     setSearchPrefix('');
  //     setSearchedUsers([]);
  //   }
  // }, [conversations]);
  const results = searchedUsers.map((user, i) => {
    let isSelected = false;
    return (
      <div
        key={i}
        className={`min-h-[65px] py-2 px-2 border-t border-black cursor-pointer hover:bg-slate-400 ${
          user.PublicKeyBase58Check === selectedConversationPublicKey
            ? 'bg-slate-400'
            : ''
        }`}
        onClick={async () => {
          isSelected = !isSelected;
          setSearchedUsers([user]);
          setSelectedConversationPublicKey(
            user.PublicKeyBase58Check + 'default-key'
          ); // for now, searching only does DMs
          setSearchedPublicKey(user.PublicKeyBase58Check);
          await rehydrateConversation(
            user.PublicKeyBase58Check + 'default-key'
          ); // for now, searching only does DMs
          // if (Object.keys(conversations).includes(user.PublicKeyBase58Check)) {
          //   // already an existing user in chat, filter them out
          //   setSearchPrefix('');
          //   setSearchedUsers([]);
          // }
        }}
      >
        <div className="flex justify-start">
          <MessagingDisplayAvatar
            deso={deso}
            publicKey={user.PublicKeyBase58Check}
            diameter={50}
          />
          {user?.ETHAddress || user.Username || user.PublicKeyBase58Check}
        </div>
      </div>
    );
  });
  return (
    <div>
      {searchPrefix && searchedUsers.length > 0 && (
        <div>
          {results.length > 0 && (
            <div className="text-center p-2 border-t border-black bg-[#06f] text-white">
              <span
                className="float-left cursor-pointer hover:text-[#ffd5a9] font-bold"
                onClick={() => {
                  setSearchPrefix('');
                  setSearchedUsers([]);
                }}
              >
                X
              </span>
              Search Results
            </div>
          )}
          {results}
        </div>
      )}
    </div>
  );
};
