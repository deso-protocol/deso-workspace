import { Deso } from 'deso-protocol';
import { useState } from 'react';
import { buttonClass } from '../styles';
import { MessagingApp } from './messaging-app';
import { MessagingExplainer } from './messaging-explainer';
export const MessagingRoot = () => {
  const [componentToShow, setComponentToShow] = useState('explainer');
  const deso = new Deso();

  return (
    <>
      <div className="flex justify-around bg-[#0C2F62] py-3">
        <button
          onClick={() => {
            setComponentToShow('explainer');
          }}
          className={buttonClass}
        >
          Read explanation{' '}
        </button>
        <button
          onClick={() => {
            setComponentToShow('sample-app');
          }}
          className={buttonClass}
        >
          Use sample app
        </button>
      </div>
      {componentToShow === 'explainer' ? (
        <MessagingExplainer deso={deso} />
      ) : (
        <MessagingApp />
      )}
    </>
  );
};
