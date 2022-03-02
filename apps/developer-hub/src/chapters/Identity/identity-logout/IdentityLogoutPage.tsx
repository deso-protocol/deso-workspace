import { identity } from '@deso-workspace/deso-sdk';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { PageNavigation } from '../../../components/layout/PageNavigation';
import { getSourceFromGithub } from '../../../services/utils';
import { PublicKey } from '../../ChapterHelper/Chapter.atom';
import { Chapter, ChapterNavigation } from '../../ChapterHelper/Chapter.models';
import { ChapterTemplate } from '../../ChapterHelper/ChapterTemplate';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../../ChapterHelper/PageSections';
import { LoginCodeBlocks } from '../identity-login/CodeBlocks';

export interface IdentityLogoutProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}

export const IdentityLogoutPage = ({
  selectedChapter,
  chapters,
}: IdentityLogoutProps) => {
  const [logoutResponse, setLogoutResponse] = useState<any | null>(null);

  const [myPublicKey, setPublicKey] = useRecoilState(PublicKey);
  const [response, setResponse] = useState<any | null>(null);
  const [code, setCode] = useState<any | null>(null);
  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then((response) => {
      setCode(response);
    });
  }, [setLogoutResponse, logoutResponse]);
  return (
    <ChapterTemplate
      title={selectedChapter.title}
      tabs={[
        {
          title: `${CommonPageSectionTitles.OVERVIEW} ${selectedChapter.title}`,
          content: (
            <>
              {PageSection(
                'Logout',
                'Similar to the login section we can make use of the window api to log a user out.'
              )}
              {PageSection(
                CommonPageSectionTitles.TRY_IT_OUT,
                <div>
                  Click{' '}
                  <span
                    className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                    onClick={() => {
                      identity.logout(myPublicKey).then((response) => {
                        setResponse(response);
                      });
                    }}
                  >
                    here
                  </span>{' '}
                  to call the logout prompt.
                </div>
              )}
              {response &&
                PageSection(
                  CommonPageSectionTitles.WHAT_HAPPENED,
                  <div className="list-decimal">
                    <li>
                      We called the identity logout page with window.open() to
                      prompt the user to logout.
                      {LoginCodeBlocks.section1}
                    </li>
                    <li>
                      Then we created a new handler for the "message" event. In
                      this case all it does is close the prompt.
                      {LoginCodeBlocks.section2}
                    </li>
                    <li>
                      Once a user logs out you should clear any user information
                      from your application.
                    </li>
                  </div>
                )}
            </>
          ),
        },
        {
          title: 'Code',
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
