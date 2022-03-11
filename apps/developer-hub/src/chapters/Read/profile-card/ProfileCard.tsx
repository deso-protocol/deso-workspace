import { Chapter, ChapterNavigation } from '../../ChapterHelper/Chapter.models';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { desoService, PublicKey } from '../../ChapterHelper/Chapter.atom';
import { getSourceFromGithub } from '../../../services/utils';
import {
  GetFollowsResponse,
  GetSingleProfileResponse,
  GetUsersResponse,
} from 'deso-protocol-types';

export interface ProfileCardProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const ProfileAndFollowerCard = ({
  selectedChapter,
  chapters,
}: ProfileCardProps) => {
  const deso = useRecoilValue(desoService);
  const publicKey = useRecoilValue(PublicKey);
  const [profile, setProfile] = useState<GetSingleProfileResponse | null>(null);
  const [user, setUser] = useState<GetUsersResponse | null>(null);
  const [follows, setFollows] = useState<GetFollowsResponse | null>(null);
  const [showSample, toggleSample] = useState<boolean>(false);
  const [code, setCode] = useState<any | null>(null);
  const getData = async () => {
    setProfile(
      await deso.user.getSingleProfile({ PublicKeyBase58Check: publicKey })
    );
    setUser(
      await deso.user.getUserStateless({ PublicKeysBase58Check: [publicKey] })
    );
    setFollows(
      await deso.social.getFollowsStateless({
        PublicKeyBase58Check: publicKey,
      })
    );
  };

  useEffect(() => {
    getData();
    getSourceFromGithub(selectedChapter.githubSource).then((response) => {
      setCode(response);
    });
  }, []);
  return (
    // <ChapterTemplate
    //   title="Profile And Follower Card"
    //   navigation={
    //     <PageNavigation
    //       previous={chapters.prev(selectedChapter) as Chapter}
    //       next={chapters.next(selectedChapter) as Chapter}
    //     />
    //   }
    // />
    <></>
  );
};
