import { Button } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import { ReactElement, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  SampleAppDecryptedHexes,
  SampleAppLoggedInUser,
  SampleAppMyProfilePicture,
} from '../../recoil/AppState.atoms';
import { User } from '../../chapters/Interfaces/User';
import { PublicKey } from '../../chapters/ChapterHelper/Chapter.atom';
import deso from '@deso-workspace/deso-sdk';
import { SendMessage } from './SendMessage';

export interface DisplayMessagesProps {
  publicKey: string;
}

const DisplayMessages = ({ publicKey }: DisplayMessagesProps) => {
  const myPublicKey = useRecoilValue(PublicKey);
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [threadCard, setThreadCard] = useState<ReactElement[] | null>(null);
  const loggedInUser = useRecoilValue(SampleAppLoggedInUser);
  const profilePicture = useRecoilValue<string | null>(
    SampleAppMyProfilePicture
  );
  const [followerPicture, setFollowerPicture] = useState<any>(null);
  const [decryptedMessages, setDecryptedMessages] = useRecoilState(
    SampleAppDecryptedHexes
  );

  useEffect(() => {
    const followerProfilePic = deso.api.user.getSingleProfilePicture(publicKey);
    setFollowerPicture(followerProfilePic);
  }, []);

  const generateThread = (thread: any[]) => {
    if (thread) {
      return thread.map((x, index) => {
        return (
          <div
            key={index}
            className={`flex justify-start ${
              x.m.IsSender ? 'bg-[#484753]' : 'bg-[#88869b]'
            } py-2 px-2 rounded-lg mx-6 mb-3`}
          >
            <Avatar
              src={x.m.IsSender ? profilePicture : followerPicture}
            ></Avatar>
            <div className="my-auto px-2 text-[#fff] w-full text-left">
              {x.decryptedMessage}
            </div>
          </div>
        );
      });
    } else {
      return [];
    }
  };

  const getUserMessages = async () => {
    if (loggedInUser === null) {
      return;
    }
    const response = await deso.api.social.getMessages(
      {
        NumToFetch: 25,
        PublicKeyBase58Check: myPublicKey as string,
        FetchAfterPublicKeyBase58Check: '',
        HoldersOnly: false,
        FollowersOnly: false,
        FollowingOnly: false,
        HoldingsOnly: false,
        SortAlgorithm: 'time',
      },
      loggedInUser
    );
    setThreadCard(generateThread(response.thread));
  };

  return (
    <>
      <div className="display flex justify-start mt-2 py-2">
        <Button
          onClick={() => {
            if (showMessages === false) {
              getUserMessages();
            }
            setShowMessages(!showMessages);
          }}
        >
          {showMessages ? 'hide messages' : 'show messages'}
        </Button>
      </div>

      {showMessages ? (
        <>
          <div className="bg-[#4f4b6e] mx-6 mt-3 py-3 rounded-t-lg  max-h-[400px] overflow-auto">
            {threadCard}
          </div>
          <div className="px-7 ">
            <SendMessage
              publicKey={publicKey}
              myPublicKey={myPublicKey as string}
              loggedInUser={loggedInUser as User}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default DisplayMessages;
