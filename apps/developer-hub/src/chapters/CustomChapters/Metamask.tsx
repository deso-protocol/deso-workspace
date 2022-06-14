import Deso from 'deso-protocol';
import { CopyBlock, nord } from 'react-code-blocks';
import { PageNavigation } from '../../components/layout/PageNavigation';
import { ClickHereSnippet, HUB } from '../../services/utils';
import { AllThreadsONPage } from '../../threads/AllThreadsOnPage';
import { Chapter, ChapterNavigation } from '../ChapterHelper/Chapter.models';
import ChapterTemplate from '../ChapterHelper/ChapterTemplate';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../ChapterHelper/PageSections';

export interface MetamaskProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export const Metamask = ({ selectedChapter, chapters }: MetamaskProps) => {
  const signInWithMetamask = async () => {
    const metamaskResponse = await deso.metamask.signInWithMetamaskNewUser();
    console.log(metamaskResponse);
  };
  return (
    <ChapterTemplate
      tabs={[
        {
          title: `${CommonPageSectionTitles.OVERVIEW} ${selectedChapter.title}`,
          content: (
            <>
              {PageSection(
                `${selectedChapter.title}`,
                <>
                  <div>
                    Allows a user with an ethereum account to sign into DeSo.{' '}
                  </div>
                </>
              )}

              {PageSection(
                `Using ${selectedChapter.title}`,
                <>
                  <div>
                    See additional parameters{' '}
                    {chapters.documentationToLink(selectedChapter)}{' '}
                  </div>
                  <CopyBlock
                    codeBlock
                    text={'import deso from deso'}
                    language={'tsx'}
                    wrapLines={true}
                    theme={nord}
                  />
                  <ClickHereSnippet
                    toCallText="click here to generate an account from metamask"
                    onclick={signInWithMetamask}
                  />
                </>
              )}
              {/* {(demo &&
                PageSection(
                  CommonPageSectionTitles.TRY_IT_OUT,
                  <div>
                    Click{' '}
                    <span
                      className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                      onClick={executeApiCall}
                    >
                      here
                    </span>{' '}
                    to call {selectedChapter.title}.{' '}
                    {(response &&
                      typeof method?.customResponse === 'function' &&
                      method?.customResponse()) ||
                      jsonBlock(response || '')}
                  </div>
                )) ||
                'Demo coming soon'} */}
            </>
          ),
        },
        {
          title: 'Threads',
          content: (
            <>
              <AllThreadsONPage
                title={selectedChapter.title}
                publicKeyWhereThreadsLive={HUB}
              />
            </>
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
