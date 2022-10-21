import { Deso } from 'deso-protocol';
import { GetExchangeRateResponse } from 'deso-protocol-types';
import { useEffect, useState } from 'react';
import { MessagingApp } from './Widgets/MessagingPrototype/components/messaging-app';
import { MessagingExplainer } from './Widgets/MessagingPrototype/components/messaging-explainer';
import { buttonClass } from './Widgets/MessagingPrototype/styles';
export const Playground = () => {
  const [healthCheck, setHealthCheck] = useState(0);
  const [exchangeRate, setExchangeRate] = useState<GetExchangeRateResponse>(
    {} as GetExchangeRateResponse
  );
  const [componentToShow, setComponentToShow] = useState('explainer');
  const deso = new Deso();

  useEffect(() => {
    (async () => {
      setHealthCheck(await deso.metaData.healthCheck());
      setExchangeRate(await deso.metaData.getExchangeRate());
    })();
  }, []);
  return (
    <>
      <div className="flex justify-around bg-[#0C2F62] py-3">
        <button
          onClick={() => {
            setComponentToShow('explainer');
          }}
          className={buttonClass}
        >
          read explanation{' '}
        </button>
        <button
          onClick={() => {
            setComponentToShow('sample-app');
          }}
          className={buttonClass}
        >
          use sample app
        </button>
      </div>
      {componentToShow === 'explainer' ? (
        <MessagingExplainer deso={deso} />
      ) : (
        <MessagingApp />
      )}

      {/* <div>Node health check: {healthCheck}</div>
      {Object.entries(exchangeRate).map((k, v) => {
        return (
          <div className="">
            {k}: {v}
          </div> */}
      {/* ); */}
      {/* })} */}
    </>
  );
};
