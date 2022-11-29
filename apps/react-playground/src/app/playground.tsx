import { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';

const fakeDesoInstance = () => {
  return {
    metaData: {
      healthCheck() {
        return Math.random();
      },
      getExchangeRate() {
        return {
          SatoshisPerDeSoExchangeRate: Math.random(),
          USDCentsPerBitcoinExchangeRate: Math.random(),
          NanosPerETHExchangeRate: Math.random(),
          USDCentsPerETHExchangeRate: Math.random(),
          NanosSold: Math.random(),
          USDCentsPerDeSoExchangeRate: Math.random(),
          USDCentsPerDeSoReserveExchangeRate: Math.random(),
          BuyDeSoFeeBasisPoints: Math.random(),
          SatoshisPerBitCloutExchangeRate: Math.random(),
          USDCentsPerBitCloutExchangeRate: Math.random(),
          USDCentsPerBitCloutReserveExchangeRate: Math.random(),
        };
      },
    },
  };
};

export const Playground = () => {
  const [healthCheck, setHealthCheck] = useState(0);
  const [exchangeRate, setExchangeRate] = useState({});
  const deso = fakeDesoInstance();

  useEffect(() => {
    act(() => {
      setHealthCheck(deso.metaData.healthCheck());
      setExchangeRate(deso.metaData.getExchangeRate());
    });
  }, []);
  return (
    <>
      <div>Node health check: {healthCheck}</div>
      {Object.entries(exchangeRate).map(([k, v]) => {
        return (
          <div key={k}>
            {k}: {v}
          </div>
        );
      })}
    </>
  );
};
