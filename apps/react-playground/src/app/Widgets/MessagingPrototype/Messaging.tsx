import Deso from 'deso-protocol';
import {
  authorizeDerivedKey,
  encrypt,
  generateDefaultKey,
  getFreeDeso,
  login,
  requestDerivedKey,
  decrypt,
} from './messaging.service';
import { getSecretPrivateUserInfo } from './store';
import { buttonClass, containerClass, data, explainer } from './styles';

export const Messaging = ({ deso }: { deso: Deso }) => {
  return (
    <>
      <div className="bg-blue-400 flex text-white">
        <div className="min-w-[250px] border-r border-black p-2 text-center">
          steps
        </div>
        <div className="min-w-[450px] border-r border-black p-2 text-center">
          explanation
        </div>
        <div className=" flex-grow border-r border-black p-2 text-center">
          data
        </div>
      </div>
      <div className="flex flex-col">
        <div className={containerClass}>
          <button className={buttonClass} onClick={() => login(deso)}>
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
          <button className={buttonClass} onClick={(deso) => requestDerivedKey}>
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
          <div className={data}>
            required response data:
            <br />
            <pre>{JSON.stringify(getSecretPrivateUserInfo(), null, 2)}</pre>
          </div>
        </div>

        <div className={containerClass}>
          <button
            className={buttonClass}
            onClick={() => authorizeDerivedKey(deso)}
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
          <div className={data}>
            required response data:
            <br />
            <pre>{JSON.stringify(getSecretPrivateUserInfo(), null, 2)}</pre>
          </div>
        </div>

        <div className={containerClass}>
          <button
            className={buttonClass}
            onClick={() => generateDefaultKey(deso)}
          >
            step 4: generate the default key
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
            onClick={() => encrypt(deso, {} as any)}
          >
            step 5: encrypt
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
            step 6: decrypt
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
    </>
  );
};
