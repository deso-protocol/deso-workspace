import {
  LoginUser,
  GetFollowsResponse,
  GetSingleProfileResponse,
  GetUsersResponse,
} from 'deso-protocol-types';
import { atom } from 'recoil';

export enum AppStateEnum {
  MY_POST,
  MY_FOLLOWERS,
  MY_FOLLOWERS_POST,
}

export const SampleAppDecryptedHexes = atom<any | null>({
  key: 'decryptedHexes',
  default: null,
});

export const SampleAppMyUserInfo = atom<MyUserInfoType | null>({
  key: 'myUserInfo',
  default: null,
});

export const SampleAppMyFollowersInfo = atom<GetFollowsResponse | null>({
  key: 'myFollowersInfo',
  default: null,
});

export const SampleAppMyProfilePicture = atom<string | null>({
  key: 'myProfilePicture',
  default: null,
});

export const SampleAppState = atom<AppStateEnum>({
  key: 'appState',
  default: AppStateEnum.MY_POST,
});

export const SampleAppLoggedInUser = atom<LoginUser | null>({
  key: 'loggedInUser',
  default: null,
});

export const SampleAppEncryptedMessage = atom<any | null>({
  key: 'encryptMessage',
  default: null,
});
export const SampleAppToggleDrawer = atom<boolean>({
  key: 'toggleDrawer',
  default: false,
});

export type MyUserInfoType = {
  profileInfoResponse: GetSingleProfileResponse;
  userInfoResponse: GetUsersResponse;
};

export type FollowerInfoType = MyUserInfoType;
