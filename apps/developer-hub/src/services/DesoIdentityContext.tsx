import { IdentityState } from '@deso-core/identity';
import { createContext } from 'react';

export const DEFAULT_IDENTITY_STATE: IdentityState = {
  activePublicKey: null,
  users: null,
};

export const DesoIdentityContext = createContext<IdentityState>(
  DEFAULT_IDENTITY_STATE
);
