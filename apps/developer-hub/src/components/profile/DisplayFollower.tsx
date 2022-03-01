import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import { ReactElement, useEffect, useState } from "react";
import {
  getProfileInfo,
  getUserPicture,
  getFollowsStateless,
  getUserInfoStateless,
} from "../../services/DesoApiRead";
import { MyUserInfoType, FollowerInfoType } from "../../recoil/AppState.atoms";
import { getFollowerCount } from "../../services/utils";
import DisplayMessages from "./DisplayMessages";
import { ProfileInfoResponse } from "../../chapters/Read/get-single-profile/GetSingleProfile.service";
import { FollowerInfoResponse } from "../../chapters/Read/get-follows-stateless/GetFollowsStateless.service";
export interface DisplayUserProps {
  publicKey: string;
}

const DisplayFollower = ({ publicKey }: DisplayUserProps) => {
  const [profileDescriptionCard, setCard] = useState<ReactElement | null>(null);
  const [follower, setFollower] = useState<FollowerInfoType | null>(null);
  const [followerPicture, setFollowerPicture] = useState<string | null>(null);
  const [followerFollowers, setFollowerFollowers] =
    useState<FollowerInfoResponse | null>(null);

  useEffect(() => {
    getFollowerInfo(publicKey);
  }, []);

  useEffect(() => {
    if (followerPicture && follower) {
      setCard(generateCard(follower, followerPicture));
    }
  }, [
    followerPicture,
    follower,
    setFollower,
    setFollowerFollowers,
    followerFollowers,
  ]);

  const getFollowerInfo = async (publicKey: string) => {
    let profileInfoResponse: ProfileInfoResponse;
    if (publicKey !== null) {
      const userInfoResponse = await getUserInfoStateless([publicKey]);
      profileInfoResponse = await getProfileInfo(publicKey);
      const profilePictureSrc = getUserPicture(
        profileInfoResponse?.Profile?.PublicKeyBase58Check
      );
      setFollower({ profileInfoResponse, userInfoResponse });
      setFollowerPicture(profilePictureSrc);
      const followers = await getFollowsStateless(publicKey);
      setFollowerFollowers(followers);
    }
  };

  const generateCard = (
    myUserInfo: MyUserInfoType,
    profilePictureSrc: string
  ) => {
    const userInfoResponse = myUserInfo?.userInfoResponse;
    const profileInfoResponse = myUserInfo?.profileInfoResponse;
    if (!(userInfoResponse && profileInfoResponse)) {
      return <></>;
    }
    return (
      <Card variant="outlined" className="pb-2">
        <CardHeader
          avatar={<Avatar src={profilePictureSrc}></Avatar>}
          subheader={
            <div className="flex justify-start">
              <div className="font-bold">{`@${profileInfoResponse.Profile.Username}`}</div>
              <div className="ml-3 font-semibold">
                Followers: {followerFollowers?.NumFollowers}
              </div>
              <div className="ml-3 font-semibold">
                Following: {getFollowerCount(userInfoResponse)}
              </div>
            </div>
          }
        ></CardHeader>
        <div className="flex justify-around mx-3 my-3"></div>
        <div className="mx-4 mb-5 font-normal">
          {profileInfoResponse.Profile.Description}
        </div>

        <DisplayMessages
          key={`${publicKey}Messages`}
          publicKey={publicKey}
        ></DisplayMessages>
      </Card>
    );
  };
  return (
    <div className="flex flex-col w-[600px] mx-auto">
      <div className="text-center  font-bold text-lg mb-2 font-mono"></div>
      <div>{profileDescriptionCard}</div>
    </div>
  );
};
export default DisplayFollower;
