import { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SampleAppMyFollowersInfo } from '../recoil/AppState.atoms';
import DisplayFollower from './profile/DisplayFollower';

const DisplayFollowerFeed = () => {
  const [userFollowers, setUserFollowers] = useRecoilState<any>(
    SampleAppMyFollowersInfo
  );
  const [followerCards, setFollowerCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    setFollowerCards(generateFollowerCards());
  }, []);

  const generateFollowerCards = (): ReactElement[] => {
    const followerCards: ReactElement[] = [];
    for (const publicKey in userFollowers?.PublicKeyToProfileEntry) {
      const follower: any | undefined =
        userFollowers?.PublicKeyToProfileEntry[publicKey];
      if (follower && publicKey !== 'data') {
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
