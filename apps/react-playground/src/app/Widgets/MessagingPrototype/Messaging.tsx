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
} from './messaging.service';
import {
  getAuthorizeDerivedKeyResponse,
  getDefaultKey,
  getLoginResponse,
  getDerivedKeyResponse,
  setDefaultKey,
} from './store';
import { buttonClass, containerClass, data, explainer } from './styles';
import { StringifyObject } from './utils';

export const Messaging = ({ deso }: { deso: Deso }) => {
  const [loginResponse, setLoginResponse] = useState(getLoginResponse());
  const [requestDeriveResponse, setRequestDeriveResponse] = useState(
    getDerivedKeyResponse()
  );
  const [authorizeDeriveKeyResponse, setAuthroizeDeriveKeyResponse] = useState(
    getAuthorizeDerivedKeyResponse()
  );
  const [getGenerateDefaultKeyResponse, setGenerateDefaultKeyResponse] =
    useState(getDefaultKey());
  return (
    <div className="max-w-[1050px] border border-black mx-auto my-10">
      <div className="bg-blue-400 flex text-white mx-auto">
        <div className="min-w-[250px] border-r border-black p-2 text-center">
          steps
        </div>
        <div className="min-w-[350px] border-r border-black p-2 text-center">
          explanation
        </div>
        <div className=" min-w-[450px] border-black p-2 text-center">data</div>
      </div>
      <div className="flex flex-col">
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
            This can be done by calling Login on the window API.{' '}
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
        </div>
        <div className={containerClass}>
          <button
            className={buttonClass}
            onClick={async () => {
              await requestDerivedKey(deso);
              setRequestDeriveResponse(getDerivedKeyResponse);
            }}
          >
            Request Derived Key
          </button>
          <div className={explainer}>
            Now that we are logged in and our user has a balance we can request
            a new derived key from Identity{' '}
            <a
              className="hover:underline text-blue-600"
              href="https://docs.deso.org/for-developers/identity/window-api/endpoints#derive"
            >
              Window API Derive Docs
            </a>
          </div>
          <StringifyObject obj={requestDeriveResponse} />
        </div>

        <div className={containerClass}>
          <button
            className={buttonClass}
            onClick={async () => {
              await authorizeDerivedKey(deso);
              setAuthroizeDeriveKeyResponse(getAuthorizeDerivedKeyResponse());
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
                setDefaultKey(defaultKey);
              }
            }}
          >
            generate the default key
          </button>
          <div className={explainer}>
            To get started a user must first login into the deso block chain.
            This can be done by calling Login on the window API.{' '}
            <a
              className="hover:underline text-blue-600"
              href="https://docs.deso.org/for-developers/identity/window-api/endpoints#log-in"
            >
              Window API Docs
            </a>
          </div>

          <StringifyObject obj={getGenerateDefaultKeyResponse} />
        </div>

        <div className={containerClass}>
          <button
            className={buttonClass}
            onClick={() => encrypt(deso, {} as any)}
          >
            Encrypt
          </button>
          <div className={explainer}>
            To get started a user must first login into the deso block chain.
            This can be done by calling Login on the window API.{' '}
            <a
              className="hover:underline text-blue-600"
              href="https://docs.deso.org/for-developers/identity/window-api/endpoints#log-in"
            >
              Window API Docs
            </a>
          </div>
        </div>

        <div className={containerClass}>
          <button
            className={buttonClass}
            onClick={() => decrypt(deso, {} as any)}
          >
            Decrypt
          </button>
          <div className={explainer}>
            To get started a user must first login into the deso block chain.
            This can be done by calling Login on the window API.{' '}
            <a
              className="hover:underline text-blue-600"
              href="https://docs.deso.org/for-developers/identity/window-api/endpoints#log-in"
            >
              Window API Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
