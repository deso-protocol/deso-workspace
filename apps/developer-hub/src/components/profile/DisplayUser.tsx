import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {
  GetFollowsResponse,
  GetSingleProfileResponse,
} from 'deso-protocol-types';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  MyUserInfoType,
  SampleAppMyFollowersInfo,
  SampleAppMyProfilePicture,
  SampleAppMyUserInfo,
} from '../../recoil/AppState.atoms';
import { DesoContext } from '../../services/DesoContext';
import { getFollowerCount } from '../../services/utils';
import UserActions from '../UserActions';
import CreatePostInput from './CreatePostInput';
export interface DisplayUserProps {
  publicKey: string;
  isMyAccount: boolean;
}
const DisplayUser = ({ publicKey, isMyAccount }: DisplayUserProps) => {
  const deso = useContext(DesoContext);
  const [user, setUser] = useRecoilState<MyUserInfoType | null>(
    SampleAppMyUserInfo
  );
  const [profilePicture, setProfilePicture] = useRecoilState<string | null>(
    SampleAppMyProfilePicture
  );
  const [userFollowers, setUserFollowers] =
    useRecoilState<GetFollowsResponse | null>(SampleAppMyFollowersInfo);
  const [profileDescriptionCard, setCard] = useState<ReactElement | null>(null);

  useEffect(() => {
    getMyInfo(publicKey);
  }, []);

  useEffect(() => {
    if (profilePicture && user) {
      setCard(generateCard(user, profilePicture));
    }
  }, [profilePicture, user, userFollowers]);

  const getMyInfo = async (publicKey: string) => {
    let profileInfoResponse: GetSingleProfileResponse;
    if (publicKey !== null) {
      const userInfoResponse = await deso.user.getUsersStateless({
        PublicKeysBase58Check: [publicKey as string],
      });

      profileInfoResponse = await await deso.user.getSingleProfile({
        PublicKeyBase58Check: publicKey,
      });
      const profilePictureSrc = deso.user.getSingleProfilePicture(
        profileInfoResponse?.Profile?.PublicKeyBase58Check as string
      );
      setUser({ profileInfoResponse, userInfoResponse });
      setProfilePicture(profilePictureSrc);
      const followers = await deso.social.getFollowsStateless({
        PublicKeyBase58Check: publicKey,
      });
      setUserFollowers(followers);
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
      <Card variant="outlined" className="mb-5 pb-2">
        <CardHeader
          avatar={<Avatar src={profilePictureSrc}></Avatar>}
          subheader={
            <div className="flex justify-start">
              <div className="font-bold">{`@${profileInfoResponse?.Profile?.Username}`}</div>
              <div className="ml-3 font-semibold">
                Followers: {userFollowers?.NumFollowers}
              </div>
              <div className="ml-3 font-semibold">
                Following: {getFollowerCount(userInfoResponse)}
              </div>
            </div>
          }
        ></CardHeader>
        <div className="flex justify-around mx-3 my-3"></div>
        <div className="mx-4 mb-5">
          {profileInfoResponse?.Profile?.Description}
        </div>
        {isMyAccount && (
          <div className=" ml-4 mr-20">
            <CreatePostInput></CreatePostInput>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="flex flex-col w-[600px] mx-auto ">
      {isMyAccount && (
        <div className="text-center text-[#fff]  font-bold text-lg mb-2 font-mono">
          You are viewing {user?.profileInfoResponse?.Profile?.Username}'s Page
        </div>
      )}
      <div className="w">{profileDescriptionCard}</div>
      <div>{isMyAccount && <UserActions></UserActions>}</div>
    </div>
  );
};
export default DisplayUser;
