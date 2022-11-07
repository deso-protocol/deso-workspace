import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';
import { MessagingDisplayAvatar } from './messaging-display-avatar';

export const MessagingStartNewConversation: React.FC<{
  deso: Deso;
  setSelectedConversationPublicKey: any;
  rehydrateConversation: any;
  selectedConversationPublicKey: string;
  conversations: any;
  setConversations: any;
}> = ({
  deso,
  setSelectedConversationPublicKey,
  rehydrateConversation,
  selectedConversationPublicKey,
  conversations,
  setConversations,
}) => {
  const [searchedUsers, setSearchedUsers] = useState<any[]>([]);
  const [searchPrefix, setSearchPrefix] = useState<string>('');
  const searchUsersByUsername = async (UsernamePrefix: string) => {
    if (!UsernamePrefix) {
      return [];
    }
    const response = await deso.user.getProfiles({
      NumToFetch: 4,
      UsernamePrefix,
    });
    if (response.ProfilesFound?.length === 0) {
      return [];
    }
    return response.ProfilesFound ?? [];
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

export const SearchResults: React.FC<{
  searchedUsers: any[];
  deso: Deso;
  searchPrefix: string;
  setSearchPrefix: any;
  setSearchedUsers: any;
  setSelectedConversationPublicKey: any;
  rehydrateConversation: any;
  selectedConversationPublicKey: string;
  conversations: any;
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
  useEffect(() => {
    if (Object.keys(conversations).includes(searchedPublicKey)) {
      setSearchPrefix('');
      setSearchedUsers([]);
    }
  }, [conversations]);
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
          setSelectedConversationPublicKey(user.PublicKeyBase58Check);
          setSearchedPublicKey(user.PublicKeyBase58Check);
          await rehydrateConversation(user.PublicKeyBase58Check);
          if (Object.keys(conversations).includes(user.PublicKeyBase58Check)) {
            // already an existing user in chat, filter them out
            setSearchPrefix('');
            setSearchedUsers([]);
          }
        }}
      >
        <div className="flex justify-start">
          <MessagingDisplayAvatar
            deso={deso}
            publicKey={user.PublicKeyBase58Check}
            diameter={50}
          />
          {user.Username}
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
