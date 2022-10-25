import Deso from 'deso-protocol';
import { useState } from 'react';
import {
  authorizeDerivedKey,
  encrypt,
  generateDefaultKey,
  getFreeDeso,
  login,
  requestDerivedKey,
  decrypt,
  getEncryptedMessage,
} from '../messaging.service';
import {
  getDefaultKey,
  getLoginResponse,
  getDerivedKeyResponse,
  clearAllState,
  getEncryptedResponse,
  getDecryptedResponse,
  setDerivedKeyResponse,
  setDefaultKey,
} from '../store';
import {
  buttonClass,
  containerClass,
  explainer,
  tileButtonClass,
} from '../styles';
import { StringifyObject } from '../utils';

export const MessagingExplainer = ({ deso }: { deso: Deso }) => {
  const [loginResponse, setLoginResponse] = useState(getLoginResponse());
  const [decryptedResponse, setDecryptedResponse] =
    useState(getDecryptedResponse);

  const [requestDeriveResponse, setRequestDeriveResponse] = useState<any>(
    getDerivedKeyResponse()
  );

  const [getGenerateDefaultKeyResponse, setGenerateDefaultKeyResponse] =
    useState(getDefaultKey());

  return (
    <div className="bg-[#0C2F62] pt-4">
      <div className="text-center text-white mx-auto max-w-[1050px] min-w-[1050px]">
        Below you will find a table that encompasses the required steps to to
        send messages peer to peer on the deso blockchain. You can see each step
        in the process is broken down into its own row where you can execute the
        call and see what the payload looks like. Since most of these steps have
        dependencies on a previous step you must go in chronological order, with
        the exception of being able to skip the get free deso step if your
        account already has funds.
        <div>
          <button
            className={`${buttonClass} mt-5`}
            onClick={() => {
              clearAllState();
              setLoginResponse({});
              setDecryptedResponse({});
              setRequestDeriveResponse({});
              setGenerateDefaultKeyResponse({});
            }}
          >
            Click here to restart
          </button>
        </div>
      </div>
      <div className="max-w-[1050px] rounded-md mx-auto ">
        <div className="flex flex-col">
          <div className={containerClass}>
            <button
              className={tileButtonClass}
              onClick={async () => {
                const response = await login(deso);
                setLoginResponse(response);
              }}
            >
              Login
            </button>
            <div className={explainer}>
              To get started a user must first login into the deso block chain.
              This can be done by calling Login on the window API{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://docs.deso.org/for-developers/identity/window-api/endpoints#log-in"
              >
                Window API Login Docs
              </a>
            </div>
            <StringifyObject obj={loginResponse} />
          </div>
          <div className={containerClass}>
            <button
              className={tileButtonClass}
              onClick={() => getFreeDeso(deso)}
            >
              Get Free Deso
            </button>

            <div className={explainer}>
              If a user does not have a balance in their DeSo account they will
              first need to get some before submitting any transactions{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://docs.deso.org/for-developers/identity/window-api/endpoints#get-free-deso"
              >
                Get Free Deso Docs
              </a>
            </div>
            <div className="p-2">N/A</div>
          </div>
          <div className={containerClass}>
            <button
              className={tileButtonClass}
              onClick={async () => {
                const response = await requestDerivedKey(deso);
                if (!response) {
                  alert('something went wrong with fetching your derived key');
                  return;
                }
                setDerivedKeyResponse(response);
                setRequestDeriveResponse(response);
              }}
            >
              Request Derived Key
            </button>
            <div className={explainer}>
              Now that we are logged in and our user has a balance we can
              request a new derived key from Identity{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://docs.deso.org/for-developers/identity/window-api/endpoints#derive"
              >
                Request Derived Key Docs
              </a>
            </div>
            <StringifyObject obj={requestDeriveResponse} />
          </div>

          <div className={containerClass}>
            <button
              className={tileButtonClass}
              onClick={async () => {
                await authorizeDerivedKey(deso, requestDeriveResponse);
              }}
            >
              Authorize The Requested Derived Key
            </button>

            <div className={explainer}>
              Before any signing can occur we must first authorize our newly
              generated derived key{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://docs.deso.org/for-developers/identity/mobile-integration#authorize-derived-key"
              >
                Authorize Derived Key Docs
              </a>
            </div>
            <div className="p-2">N/A</div>
          </div>

          <div className={containerClass}>
            <button
              className={tileButtonClass}
              onClick={async () => {
                const groupKey = await generateDefaultKey(
                  deso,
                  requestDeriveResponse
                );
                if (!groupKey) {
                  alert('unable to generate group key');
                  return;
                }

                setDefaultKey(groupKey);
                const defaultKey = getDefaultKey();
                if (defaultKey) {
                  setGenerateDefaultKeyResponse(defaultKey);
                }
              }}
            >
              Generate The Default Key
            </button>
            <div className={explainer}>
              In order to encrypt and decrypt messages between different keys
              they need to have a common key to encrypt and decrypt messages to{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://todo.com"
              >
                Generate The Default Key Docs
              </a>
            </div>

            <StringifyObject obj={getGenerateDefaultKeyResponse} />
          </div>

          <div className={containerClass}>
            <button
              className={tileButtonClass}
              onClick={async () => {
                await encrypt(
                  deso,
                  'message to be encrypted and sent',
                  requestDeriveResponse
                );
              }}
            >
              Encrypt
            </button>
            <div className={explainer}>
              Now that everything is set up we can take a message and encrypt it{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://docs.deso.org/for-developers/identity/iframe-api/endpoints#encrypt"
              >
                Encrypt Docs
              </a>
            </div>

            <div className="p-2">N/A</div>
          </div>

          <div className={containerClass}>
            <button
              className={tileButtonClass}
              onClick={async () => {
                const encryptedMessages = await getEncryptedMessage(deso);

                const decryptedMessages = await decrypt(
                  deso,
                  encryptedMessages,
                  requestDeriveResponse
                );

                setDecryptedResponse(decryptedMessages);
              }}
            >
              Decrypt
            </button>
            <div className={explainer}>
              And finally, the receiver can now decrypt their message{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://docs.deso.org/for-developers/identity/iframe-api/endpoints#decrypt"
              >
                Decrypt Docs
              </a>
            </div>
            <StringifyObject obj={decryptedResponse} />
          </div>
        </div>
      </div>
    </div>
  );
};
