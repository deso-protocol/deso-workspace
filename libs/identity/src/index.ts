import { api } from './lib/api';
import { Identity } from './lib/identity';

export const identity = new Identity(window, api);
export * from './lib/types';