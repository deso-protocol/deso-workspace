import Deso from 'deso-protocol';
import { createContext } from 'react';
// const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
const deso = new Deso();
export const DesoContext = createContext(deso);
