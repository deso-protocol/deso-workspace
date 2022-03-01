import { atom } from "recoil";
import { User } from "../chapters/Interfaces/User";
import { FollowerInfoResponse } from "../chapters/Read/get-follows-stateless/GetFollowsStateless.service";
import { ProfileInfoResponse } from "../chapters/Read/get-single-profile/GetSingleProfile.service";
import { UserInfoResponse } from "../chapters/Read/get-users-stateless/GetUserStateless.service";
import {
  DesoIdentityDecryptedHexesactionResponse,
  DesoIdentityEncryptedResponse,
} from "../chapters/Interfaces/DesoIdentity.interface";

export enum AppStateEnum {
  MY_POST,
  MY_FOLLOWERS,
  MY_FOLLOWERS_POST,
}

export const SampleAppDecryptedHexes =
  atom<DesoIdentityDecryptedHexesactionResponse | null>({
    key: "decryptedHexes",
    default: null,
  });

export const SampleAppMyUserInfo = atom<MyUserInfoType>({
  key: "myUserInfo",
  default: null,
});

export const SampleAppMyFollowersInfo = atom<FollowerInfoResponse | null>({
  key: "myFollowersInfo",
  default: null,
});

export const SampleAppMyProfilePicture = atom<string | null>({
  key: "myProfilePicture",
  default: null,
});

export const SampleAppState = atom<AppStateEnum>({
  key: "appState",
  default: AppStateEnum.MY_POST,
});

export const SampleAppLoggedInUser = atom<User | null>({
  key: "loggedInUser",
  default: null,
});

export const SampleAppEncryptedMessage =
  atom<DesoIdentityEncryptedResponse | null>({
    key: "encryptMessage",
    default: null,
  });
export const SampleAppToggleDrawer = atom<boolean>({
  key: "toggleDrawer",
  default: false,
});

export type MyUserInfoType = {
  profileInfoResponse: ProfileInfoResponse | null;
  userInfoResponse: UserInfoResponse | null;
} | null;

export type FollowerInfoType = MyUserInfoType;
