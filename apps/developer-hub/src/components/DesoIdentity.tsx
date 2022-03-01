import { Button, Link } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { PublicKey } from "../chapters/ChapterHelper/Chapter.atom";
import { IdentityInitialize } from "../chapters/Identity/identity-initialize/IdentityInitialize";
import { identityLogin } from "../chapters/Identity/identity-login/IdentityLogin";
import { IdentityLogout } from "../chapters/Identity/identity-logout/IdentityLogout.service";
import { DesoIdentityEncryptedResponse } from "../chapters/Interfaces/DesoIdentity.interface";
import {
  SampleAppEncryptedMessage,
  SampleAppLoggedInUser,
} from "../recoil/AppState.atoms";
const Identity = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(SampleAppLoggedInUser);
  const [myPublicKey, setPublicKey] = useRecoilState(PublicKey);

  const [encryptedMessage, setEncryptedMessage] = useRecoilState(
    SampleAppEncryptedMessage
  );
  useEffect(() => {
    IdentityInitialize();
    window.addEventListener("message", (event) => {
      const execution = determineExecution(event);
      switch (execution) {
        case "encryptMessage": {
          const data: DesoIdentityEncryptedResponse = event.data;
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
    const approve = window.open("https://identity.deso.org/approve");
  };

  const determineExecution = (
    event: any
  ): "dismiss" | "executeWindowCommand" | "encryptMessage" => {
    if (!(event.origin === "https://identity.deso.org" && event.source)) {
      // the event is coming from a different Iframe
      return "dismiss";
    }
    if (event?.data?.payload?.encryptedMessage) {
      return "encryptMessage";
    }
    return "executeWindowCommand";
  };

  return (
    <>
      {!loggedInUser ? (
        <Link
          className="cursor-pointer"
          onClick={() => {
            identityLogin().then(({ loggedInUser, publicKey }) => {
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
            IdentityLogout(myPublicKey as string).then(() => {
              setLoggedInUser(null);
              setPublicKey("");
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
