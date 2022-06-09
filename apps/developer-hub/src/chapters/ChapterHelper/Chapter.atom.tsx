import Deso from 'deso-protocol';
import { LoginUser } from 'deso-protocol-types';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { DEZO_DOG } from '../../services/utils';
const { persistAtom } = recoilPersist();
export const PublicKey = atom<string>({
  key: 'publicKey',
  // deso dog in the scenario they dont have an account
  default: DEZO_DOG,
  effects_UNSTABLE: [persistAtom],
});

export const desoService = atom<Deso>({
  key: 'desoService',
  default: new Deso({ nodeUri: 'http://deso-seed-3.io:18501' }),
  effects_UNSTABLE: [persistAtom],
});

export const LoggedInUser = atom<LoginUser | null>({
  key: 'user',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
