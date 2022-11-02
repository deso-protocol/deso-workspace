import { Deso } from 'deso-protocol';
import { useState } from 'react';
import { buttonClass } from '../consts/styles';
import { MessagingApp } from './messaging-app';
import { MessagingExplainer } from './messaging-explainer';
const deso = new Deso();
export const MessagingRoot = () => {
  const [componentToShow, setComponentToShow] = useState(
    <MessagingApp deso={deso} />
  );
  return (
    <>
      <div className="flex justify-center bg-[#0C2F62] py-3">
        <button
          onClick={() => {
            setComponentToShow(<MessagingApp deso={deso} />);
          }}
          className={`${buttonClass} mr-2`}
        >
          Use sample app
        </button>
        <button
          onClick={() => {
            setComponentToShow(<MessagingExplainer deso={deso} />);
          }}
          className={buttonClass}
        >
          Step breakdown{' '}
        </button>
      </div>
      {componentToShow}
    </>
  );
};
