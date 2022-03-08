import { ReactElement, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { LoginUser } from '@deso-workspace/deso-types';

import { PageNavigation } from '../../../components/layout/PageNavigation';
import { getSourceFromGithub, jsonBlock } from '../../../services/utils';
import { desoService, LoggedInUser, PublicKey } from '../../ChapterHelper/Chapter.atom';
import { Chapter, ChapterNavigation } from '../../ChapterHelper/Chapter.models';
import ChapterTemplate from '../../ChapterHelper/ChapterTemplate';
import { CommonPageSectionTitles, PageSection } from '../../ChapterHelper/PageSections';
import { LoginCodeBlocks } from './CodeBlocks';

export interface IdentityLoginProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const IdentityLoginPage = ({
  selectedChapter,
  chapters,
}: IdentityLoginProps) => {
  const deso = useRecoilValue(desoService);
  const [code, setCode] = useState<ReactElement[]>([]);
  const [loggedInUser, setLoggedInUser] = useRecoilState<LoginUser | null>(
    LoggedInUser
  );
  const [publicKey, setPublicKey] = useRecoilState<string>(PublicKey);

  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then(setCode);
  }, [setLoggedInUser, loggedInUser, selectedChapter.githubSource]);
  return (
    <ChapterTemplate
      tabs={[
        {
          title: `${CommonPageSectionTitles.OVERVIEW} ${selectedChapter.title}`,
          content: (
            <>
              {PageSection(
                'Login',
                `Once a connection is created between our application and the Identity frame login 
                  becomes a trivial task. To do so we can take advantage of the existing login page, where users will
                  be prompted with different login options.`
              )}
              {PageSection(
                CommonPageSectionTitles.TRY_IT_OUT,
                <div>
                  Click{' '}
                  <span
                    className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                    onClick={() => {
                      console.log(deso);
                      deso.identity.login().then((response) => {
                        const publicKey = response.payload.publicKeyAdded;
                        setLoggedInUser(response.payload.users[publicKey]);
                        setPublicKey(publicKey);
                      });
                    }}
                  >
                    here
                  </span>{' '}
                  to call the login prompt.
                </div>
              )}
              {PageSection(
                <>
                  {loggedInUser && (
                    <div>{CommonPageSectionTitles.WHAT_HAPPENED}</div>
                  )}
                </>,
                <div>
                  {loggedInUser && (
                    <div className="list-decimal ">
                      <li>
                        We called the identity login page with window.open() to
                        prompt the user to login.
                        {LoginCodeBlocks.section1}
                      </li>
                      <li>
                        Then we created a new handler for the "message" event.
                        {LoginCodeBlocks.section2}
                      </li>
                      <li>
                        Once the user selects one of the login options our
                        Iframe will emit an event with our logged in user's
                        data. Note you will want to store this information
                        somewhere in your app for future use.
                        {loggedInUser && jsonBlock(loggedInUser)}
                      </li>
                    </div>
                  )}
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
