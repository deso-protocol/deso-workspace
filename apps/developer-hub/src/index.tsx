import { identity } from '@deso-core/identity';
import Deso from 'deso-protocol';
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { DesoContext } from './services/DesoContext';

identity.configure({
  identityURI: 'http://localhost:4201',
  //redirectURI: `${window.location.origin}/devtest`,
});

ReactDOM.render(
  <React.StrictMode>
    <DesoContext.Provider value={new Deso()}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </DesoContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
