import Deso from 'deso-protocol';
import { DeSoNetwork } from 'deso-protocol-types';
import { createContext } from 'react';
// const deso = new Deso();
// running identity and backend locally
const deso = new Deso({
  identityConfig: {
    uri: 'http://localhost:4201',
    network: DeSoNetwork.testnet,
  },
  nodeUri: 'http://localhost:18001',
});
export const DesoContext = createContext(deso);
