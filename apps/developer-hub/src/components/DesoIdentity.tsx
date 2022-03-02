import { identity } from '@deso-workspace/deso-sdk';
import { Button, Link } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { PublicKey } from '../chapters/ChapterHelper/Chapter.atom';
import {
  SampleAppEncryptedMessage,
  SampleAppLoggedInUser,
} from '../recoil/AppState.atoms';
const Identity = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(SampleAppLoggedInUser);
  const [myPublicKey, setPublicKey] = useRecoilState(PublicKey);

  const [encryptedMessage, setEncryptedMessage] = useRecoilState(
    SampleAppEncryptedMessage
  );
  useEffect(() => {
    identity.initialize();
    window.addEventListener('message', (event) => {
      const execution = determineExecution(event);
      switch (execution) {
        case 'encryptMessage': {
          const data: any = event.data;
          setEncryptedMessage(data);
          break;
        }
        default: {
          break;
        }
      }
    });
  }, []);

  const approve = () => {
    const approve = window.open('https://identity.deso.org/approve');
  };

  const determineExecution = (
    event: any
  ): 'dismiss' | 'executeWindowCommand' | 'encryptMessage' => {
    if (!(event.origin === 'https://identity.deso.org' && event.source)) {
      // the event is coming from a different Iframe
      return 'dismiss';
    }
    if (event?.data?.payload?.encryptedMessage) {
      return 'encryptMessage';
    }
    return 'executeWindowCommand';
  };

  return (
    <>
      {!loggedInUser ? (
        <Link
          className="cursor-pointer"
          onClick={() => {
            identity.login().then(({ loggedInUser, publicKey }) => {
              setLoggedInUser(loggedInUser);
              setPublicKey(publicKey);
            });
          }}
        >
          Log In
        </Link>
      ) : (
        <Button
          className="cursor-pointer"
          variant="contained"
          onClick={() => {
            identity.logout(myPublicKey as string).then(() => {
              setLoggedInUser(null);
              setPublicKey('');
            });
          }}
        >
          Log out
        </Button>
      )}
    </>
  );
};
export default Identity;
