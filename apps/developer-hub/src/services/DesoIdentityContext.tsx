import { IdentityState } from '@deso-core/identity';
import { createContext } from 'react';

export const DesoIdentityContext = createContext<IdentityState>({
  currentUser: null,
  alternateUsers: null,
});
