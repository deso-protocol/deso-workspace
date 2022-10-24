import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';
import {
  authorizeDerivedKey,
  encrypt,
  generateDefaultKey,
  getFreeDeso,
  login,
  requestDerivedKey,
  decrypt,
} from '../messaging.service';
import {
  getAuthorizeDerivedKeyResponse,
  getDefaultKey,
  getLoginResponse,
  getDerivedKeyResponse,
  clearAllState,
} from '../store';
import { buttonClass, containerClass, explainer } from '../styles';
import { StringifyObject } from '../utils';

export const MessagingExplainer = ({ deso }: { deso: Deso }) => {
  useEffect(() => {
    clearAllState();
  }, []);

  const [loginResponse, setLoginResponse] = useState(getLoginResponse());
  const [requestDeriveResponse, setRequestDeriveResponse] = useState(
    getDerivedKeyResponse()
  );

  const [authorizeDeriveKeyResponse, setAuthorizeDeriveKeyResponse] = useState(
    getAuthorizeDerivedKeyResponse()
  );

  const [getGenerateDefaultKeyResponse, setGenerateDefaultKeyResponse] =
    useState(getDefaultKey());
  return (
    <div className="bg-[#0C2F62] pt-4">
      <div className="text-center text-white">
        Below you will find a table that encompasses the required steps to to
        send messages peer to peer on the deso blockchain.
      </div>
      <div className="max-w-[1050px] border-black  border rounded-md mx-auto my-10">
        <div className="bg-[#06f] flex text-white mx-auto rounded-t-md">
          <div className="min-w-[250px] border-r border-black p-2 text-center">
            steps
          </div>
          <div className="min-w-[350px] border-r border-black p-2 text-center">
            explanation
          </div>
          <div className=" min-w-[450px] border-black p-2 text-center">
            data
          </div>
        </div>
        <div className="flex flex-col bg-slate-200 ">
          <div className={containerClass}>
            <button
              className={buttonClass}
              onClick={async () => {
                await login(deso);
                setLoginResponse(getLoginResponse());
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
            <button className={buttonClass} onClick={() => getFreeDeso(deso)}>
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
            <div>N/A</div>
          </div>
          <div className={containerClass}>
            <button
              className={buttonClass}
              onClick={async () => {
                await requestDerivedKey(deso);
                setRequestDeriveResponse(getDerivedKeyResponse());
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
              className={buttonClass}
              onClick={async () => {
                await authorizeDerivedKey(deso);
                setAuthorizeDeriveKeyResponse(getAuthorizeDerivedKeyResponse());
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
            <StringifyObject obj={authorizeDeriveKeyResponse} />
          </div>

          <div className={containerClass}>
            <button
              className={buttonClass}
              onClick={async () => {
                await generateDefaultKey(deso);
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
              they need to have a common key to encrypt and decrypt messages{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://todo.com"
              >
                Generate The Default Key Docs // these docs need to be added
              </a>
            </div>

            <StringifyObject obj={getGenerateDefaultKeyResponse} />
          </div>

          <div className={containerClass}>
            <button
              className={buttonClass}
              onClick={() => encrypt(deso, 'message to be encrypted and sent')}
            >
              Encrypt
            </button>
            <div className={explainer}>
              To get started a user must first login into the deso block chain.
              This can be done by calling Login on the window API.{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://docs.deso.org/for-developers/identity/iframe-api/endpoints#encrypt"
              >
                Window API Docs
              </a>
            </div>
            <div>N/A</div>
          </div>

          <div className={containerClass}>
            <button className={buttonClass} onClick={() => decrypt(deso)}>
              Decrypt
            </button>
            <div className={explainer}>
              To get started a user must first login into the deso block chain.
              This can be done by calling Login on the window API.{' '}
              <a
                className="hover:underline text-blue-600"
                href="https://docs.deso.org/for-developers/identity/iframe-api/endpoints#decrypt"
              >
                Window API Docs
              </a>
            </div>
            <div>N/A</div>
          </div>
        </div>
      </div>
    </div>
  );
};
