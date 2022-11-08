import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import {
  GetFollowsResponse,
  GetSingleProfileResponse,
} from 'deso-protocol-types';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { FollowerInfoType, MyUserInfoType } from '../../recoil/AppState.atoms';
import { DesoContext } from '../../services/DesoContext';
import { getFollowerCount } from '../../services/utils';
import DisplayMessages from './DisplayMessages';
export interface DisplayUserProps {
  publicKey: string;
}

const DisplayFollower = ({ publicKey }: DisplayUserProps) => {
  const deso = useContext(DesoContext);
  const [profileDescriptionCard, setCard] = useState<ReactElement | null>(null);
  const [follower, setFollower] = useState<FollowerInfoType | null>(null);
  const [followerPicture, setFollowerPicture] = useState<string | null>(null);
  const [followerFollowers, setFollowerFollowers] =
    useState<GetFollowsResponse | null>(null);

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
    let profileInfoResponse: GetSingleProfileResponse;
    if (publicKey !== null) {
      const userInfoResponse = await deso.user.getUsersStateless({
        PublicKeysBase58Check: [publicKey],
      });
      profileInfoResponse = await deso.user.getSingleProfile({
        PublicKeyBase58Check: publicKey,
      });
      const profilePictureSrc = deso.user.getSingleProfilePicture(
        profileInfoResponse?.Profile?.PublicKeyBase58Check as string
      );
      setFollower({ profileInfoResponse, userInfoResponse });
      setFollowerPicture(profilePictureSrc);
      const followers = await deso.social.getFollowsStateless({
        PublicKeyBase58Check: publicKey,
      });
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
              <div className="font-bold">{`@${profileInfoResponse?.Profile?.Username}`}</div>
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
          {profileInfoResponse?.Profile?.Description}
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
