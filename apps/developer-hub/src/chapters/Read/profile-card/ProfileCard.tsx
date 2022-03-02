import { Chapter, ChapterNavigation } from '../../ChapterHelper/Chapter.models';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PublicKey } from '../../ChapterHelper/Chapter.atom';
import { getSourceFromGithub } from '../../../services/utils';
import deso from '@deso-workspace/deso-sdk';
import {
  GetFollowsResponse,
  GetSingleProfileResponse,
  GetUsersResponse,
} from '@deso-workspace/deso-types';

export interface ProfileCardProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const ProfileAndFollowerCard = ({
  selectedChapter,
  chapters,
}: ProfileCardProps) => {
  const publicKey = useRecoilValue(PublicKey);
  const [profile, setProfile] = useState<GetSingleProfileResponse | null>(null);
  const [user, setUser] = useState<GetUsersResponse | null>(null);
  const [follows, setFollows] = useState<GetFollowsResponse | null>(null);
  const [showSample, toggleSample] = useState<boolean>(false);
  const [code, setCode] = useState<any | null>(null);
  const getData = async () => {
    setProfile((await deso.api.user.getSingleProfile(publicKey)).response);
    setUser(await deso.api.user.getUserStateless([publicKey]));
    setFollows((await deso.api.social.getFollowsStateless(publicKey)).response);
  };

  useEffect(() => {
    deso.api.post.submitPost
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
