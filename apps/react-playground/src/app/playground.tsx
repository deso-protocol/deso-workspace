import { Deso } from 'deso-protocol';
import { GetExchangeRateResponse } from 'deso-protocol-types';
import { useEffect, useState } from 'react';
import { MessagingRoot } from './Widgets/MessagingPrototype/components/messaging-root';
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
      <MessagingRoot />
    </>
  );
};
