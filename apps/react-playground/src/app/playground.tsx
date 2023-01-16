import { useEffect, useState } from 'react';
import { MessagingRoot } from './Widgets/MessagingPrototype/components/messaging-root';
// export const Playground = () => {
//   const [healthCheck, setHealthCheck] = useState(0);
//   const [exchangeRate, setExchangeRate] = useState<GetExchangeRateResponse>(
//     {} as GetExchangeRateResponse
//   );
//   const deso = new Deso();
import { act } from 'react-dom/test-utils';
import Deso from 'deso-protocol';

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
  const deso = new Deso({
    identityConfig: {
      uri: 'http://localhost:4201',
    },
  });

  useEffect(() => {
    deso.identity.login('4');
    deso.ethereum
      .ethAddressToDeSoPublicKey('0xcc509aaf3ea0b8002d784c5a5a312baeaecaa64a')
      .then((res) => {
        console.log(res);
      });
    deso.ethereum
      .recoverETHPublicKeyAndAddressFromTransaction(
        '0xe8ef2f9dc0f9b5b7c7a709ba1ae495046039b97eb488241afceb1eede7a5ec85'
      )
      .then((res) => {
        console.log(res);
      });
  }, []);

  const trySubmitTransaction = function () {
    deso.posts.submitPost({
      UpdaterPublicKeyBase58Check: deso.identity.getUserKey() as string,
      BodyObj: {
        ImageURLs: [],
        VideoURLs: [],
        Body: 'hello there - this is a another test',
      },
    });
  };
  //   act(() => {
  //     setHealthCheck(deso.metaData.healthCheck());
  //     setExchangeRate(deso.metaData.getExchangeRate());
  //   });
  // }, []);
  return (
    <>
      <MessagingRoot />
      {/* <div>Node health check: {healthCheck}</div> */}
      {/* <a onClick={trySubmitTransaction}> click me </a>
      <div>Node health check: {healthCheck}</div>
      {Object.entries(exchangeRate).map(([k, v]) => {
        return (
          <div key={k}>
            {k}: {v}
          </div>
        );
      })}
      {' '} */}
    </>
  );
};
