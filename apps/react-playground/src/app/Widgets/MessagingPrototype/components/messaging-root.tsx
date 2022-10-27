import { Deso } from 'deso-protocol';
import { useState } from 'react';
import { buttonClass } from '../styles';
import { MessagingApp } from './messaging-app';
import { MessagingExplainer } from './messaging-explainer';
export const MessagingRoot = () => {
  const [componentToShow, setComponentToShow] = useState('sample-app');
  const deso = new Deso();

  return (
    <>
      <div className="flex justify-center bg-[#0C2F62] py-3">
        <button
          onClick={() => {
            setComponentToShow('sample-app');
          }}
          className={`${buttonClass} mr-2`}
        >
          Use sample app
        </button>
        <button
          onClick={() => {
            setComponentToShow('explainer');
          }}
          className={buttonClass}
        >
          Step breakdown{' '}
        </button>
      </div>
      {componentToShow === 'sample-app' ? (
        <MessagingApp />
      ) : (
        <MessagingExplainer deso={deso} />
      )}
    </>
  );
};
