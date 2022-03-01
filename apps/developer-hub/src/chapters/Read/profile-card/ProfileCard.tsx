import { PageNavigation } from "../../../components/layout/PageNavigation";
import { Chapter, ChapterNavigation } from "../../ChapterHelper/Chapter.models";
import { ChapterTemplate } from "../../ChapterHelper/ChapterTemplate";
import { useEffect, useState } from "react";
import {
  getSingleProfile,
  ProfileInfoResponse,
} from "../get-single-profile/GetSingleProfile.service";
import {
  FollowerInfoResponse,
  getFollowsStateless,
} from "../get-follows-stateless/GetFollowsStateless.service";
import {
  getUserStateless,
  UserInfoResponse,
} from "../get-users-stateless/GetUserStateless.service";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../../ChapterHelper/Chapter.atom";
import DisplayUser from "../../../components/profile/DisplayUser";
import { Button, Link } from "@mui/material";
import { getSourceFromGithub } from "../../../services/utils";

export interface ProfileCardProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const ProfileAndFollowerCard = ({
  selectedChapter,
  chapters,
}: ProfileCardProps) => {
  const publicKey = useRecoilValue(PublicKey);
  const [profile, setProfile] = useState<ProfileInfoResponse | null>(null);
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [follows, setFollows] = useState<FollowerInfoResponse | null>(null);
  const [showSample, toggleSample] = useState<boolean>(false);
  const [code, setCode] = useState<any | null>(null);
  const getData = async () => {
    setProfile((await getSingleProfile(publicKey)).response);
    setUser((await getUserStateless(publicKey)).response);
    setFollows((await getFollowsStateless(publicKey)).response);
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
