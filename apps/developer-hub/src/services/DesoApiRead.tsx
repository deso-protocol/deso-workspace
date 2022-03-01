import axios from "axios";
import { BASE_URI } from "../chapters/ChapterHelper/BaseUri";
import {
  PostInfoRequest,
  PostInfoResponse,
} from "../chapters/Interfaces/Post.interface";
import {
  FollowerInfoRequest,
  FollowerInfoResponse,
} from "../chapters/Read/get-follows-stateless/GetFollowsStateless.service";
import { ProfileInfoResponse } from "../chapters/Read/get-single-profile/GetSingleProfile.service";
import {
  UserInfoRequest,
  UserInfoResponse,
} from "../chapters/Read/get-users-stateless/GetUserStateless.service";

export const getProfileInfo = async (
  PublicKeyBase58Check: string
): Promise<ProfileInfoResponse> => {
  const userInfoRequest = {
    PublicKeyBase58Check,
  };
  return (await axios.post(`${BASE_URI}/get-single-profile`, userInfoRequest))
    .data;
};

export const getUserInfoStateless = async (
  PublicKeysBase58Check: string[]
): Promise<UserInfoResponse> => {
  const userInfoRequest: UserInfoRequest = {
    PublicKeysBase58Check,
    SkipForLeaderboard: false,
  };
  return (await axios.post(`${BASE_URI}/get-users-stateless`, userInfoRequest))
    .data;
};

export const getUserPicture = (PublicKeyBase58Check: string) => {
  return `${BASE_URI}/get-single-profile-picture/${PublicKeyBase58Check}`;
};

export const getFollowsStateless = async (
  PublicKeyBase58Check: string
): Promise<FollowerInfoResponse> => {
  const request: FollowerInfoRequest = {
    PublicKeyBase58Check,
    GetEntriesFollowingUsername: true,
    NumToFetch: 10,
  };
  const followerResponse: FollowerInfoResponse = (
    await axios.post(`${BASE_URI}/get-follows-stateless`, request)
  ).data;
  // wasn't a huge fan of the attribute coming back as a dynamic key
  // makes it hard to work with in the components and it messes with
  // typescript.
  // to fix this i added a data attribute to the response interface
  //  and then applied the same object to it as the dynamic hash
  const keys = Object.keys(followerResponse.PublicKeyToProfileEntry);
  if (keys.length > 0) {
    const data = followerResponse.PublicKeyToProfileEntry[keys[0]];
    followerResponse.PublicKeyToProfileEntry = {
      ...followerResponse.PublicKeyToProfileEntry,
      data,
    };
  }
  return followerResponse;
};

export const getPostsForPublicKey = async (
  ReaderPublicKeyBase58Check: string,
  Username: string
): Promise<PostInfoResponse> => {
  const request: PostInfoRequest = {
    PublicKeyBase58Check: "",
    Username,
    ReaderPublicKeyBase58Check,
    NumToFetch: 10,
  };
  return (await axios.post(`${BASE_URI}/get-posts-for-public-key`, request))
    .data;
};
