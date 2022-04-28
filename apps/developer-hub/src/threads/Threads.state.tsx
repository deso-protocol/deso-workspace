import { atom } from 'recoil';

export const LoggedIn = atom<boolean>({
  key: 'loggedIn',
  default: false,
});
