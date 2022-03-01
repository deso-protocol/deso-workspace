import { ReactElement, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FollowerInfoResponse } from "../chapters/Read/get-follows-stateless/GetFollowsStateless.service";
import {
  SampleAppMyFollowersInfo,
  SampleAppMyUserInfo,
  MyUserInfoType,
} from "../recoil/AppState.atoms";
import DisplayFollower from "./profile/DisplayFollower";

const DisplayFollowerFeed = () => {
  const [user, setUser] = useRecoilState<MyUserInfoType>(SampleAppMyUserInfo);
  const [userFollowers, setUserFollowers] =
    useRecoilState<FollowerInfoResponse | null>(SampleAppMyFollowersInfo);
  const [followerCards, setFollowerCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    setFollowerCards(generateFollowerCards());
  }, []);

  const generateFollowerCards = (): ReactElement[] => {
    const followerCards: ReactElement[] = [];
    for (const publicKey in userFollowers?.PublicKeyToProfileEntry) {
      const follower: any | undefined =
        userFollowers?.PublicKeyToProfileEntry[publicKey];
      if (follower && publicKey !== "data") {
        followerCards.push(
          <DisplayFollower
              key={publicKey}
              publicKey={publicKey}
            ></DisplayFollower>
        );
      }
    }
    return followerCards;
  };
  return <>{followerCards}</>;
};
export default DisplayFollowerFeed;
