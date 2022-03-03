import {
  CreateFollowTxnStatelessRequest,
  LoginUser,
} from '@deso-workspace/deso-types';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PageNavigation } from '../../../components/layout/PageNavigation';
import {
  ClickHereSnippet,
  DEZO_DOG,
  getSourceFromGithub,
} from '../../../services/utils';
import {
  desoService,
  LoggedInUser,
  PublicKey,
} from '../../ChapterHelper/Chapter.atom';
import { Chapter, ChapterNavigation } from '../../ChapterHelper/Chapter.models';
import { ChapterTemplate } from '../../ChapterHelper/ChapterTemplate';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../../ChapterHelper/PageSections';
export interface CreateFollowTransactionPageProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const CreateFollowTransactionPage = ({
  chapters,
  selectedChapter,
}: CreateFollowTransactionPageProps) => {
  const deso = useRecoilValue(desoService);
  const [code, setCode] = useState<any | null>(null);
  const [follow, setFollow] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useRecoilState<LoginUser | null>(
    LoggedInUser
  );
  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then((res) => {
      console.log(selectedChapter.githubSource);
      console.log(res);
      // setCode(res);
    });
  }, []);
  const [myPublicKey, setMyPublicKey] = useRecoilState(PublicKey);
  return (
    <ChapterTemplate
      title={`${CommonPageSectionTitles.OVERVIEW}Create Follow Transaction`}
      tabs={[
        {
          title: 'Create Follow Transaction',
          content: (
            <>
              {PageSection(
                'Create Follow Transaction',
                <div>
                  create-follow-transaction-stateless allows a user to follow or
                  un-follow another account.
                </div>
              )}
              {PageSection(
                CommonPageSectionTitles.TRY_IT_OUT,
                ClickHereSnippet(async () => {
                  deso.social.createFollowTxnStateless(
                    {
                      FollowedPublicKeyBase58Check: DEZO_DOG,
                      FollowerPublicKeyBase58Check: myPublicKey,
                      IsUnfollow: follow,
                    } as CreateFollowTxnStatelessRequest,
                    loggedInUser as LoginUser
                  );
                  setFollow(!follow);
                }, 'to follow/un-follow @DeZoDog')
              )}
            </>
          ),
        },
        {
          title: CommonPageSectionTitles.CODE,
          content: PageSection('', code),
        },
        {
          title: 'Documentation',
          content: PageSection(
            CommonPageSectionTitles.ADDITIONAL_DOCUMENTATION,
            <>{chapters.documentationToLink(selectedChapter)}</>
          ),
        },
      ]}
      navigation={
        <PageNavigation
          previous={chapters.prev(selectedChapter) as Chapter}
          next={chapters.next(selectedChapter) as Chapter}
        />
      }
    />
  );
};
