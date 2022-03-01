import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { PageNavigation } from '../../../components/layout/PageNavigation';
import {
  ClickHereSnippet,
  DEZO_DOG,
  getSourceFromGithub,
} from '../../../services/utils';
import { LoggedInUser, PublicKey } from '../../ChapterHelper/Chapter.atom';
import { Chapter, ChapterNavigation } from '../../ChapterHelper/Chapter.models';
import { ChapterTemplate } from '../../ChapterHelper/ChapterTemplate';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../../ChapterHelper/PageSections';
import { IdentityInitialize } from '../../Identity/identity-initialize/IdentityInitialize';
import { identityLogin } from '../../Identity/identity-login/IdentityLogin';
import { CreateFollowTxnStateless } from './create-follow-txn-stateless';
export interface CreateFollowTransactionPageProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const CreateFollowTransactionPage = ({
  chapters,
  selectedChapter,
}: CreateFollowTransactionPageProps) => {
  const [code, setCode] = useState<any | null>(null);
  const [follow, setFollow] = useState<boolean>(false);
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
                  await IdentityInitialize();
                  const loggedInUser = await identityLogin();
                  CreateFollowTxnStateless(
                    {
                      FollowedPublicKeyBase58Check: DEZO_DOG,
                      FollowerPublicKeyBase58Check: myPublicKey,
                      IsUnfollow: follow,
                    },
                    loggedInUser.loggedInUser
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
