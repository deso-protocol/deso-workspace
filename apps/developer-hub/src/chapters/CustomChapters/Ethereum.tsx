import { MetaMaskInitResponse } from 'deso-protocol-types';
import { useContext, useState } from 'react';
import { CopyBlock, nord } from 'react-code-blocks';
import { PageNavigation } from '../../components/layout/PageNavigation';
import { DesoContext } from '../../services/DesoContext';
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
export const Ethereum = ({ selectedChapter, chapters }: MetamaskProps) => {
  const deso = useContext(DesoContext);
  const [metamaskResponseObject, setMetaMaskResponse] =
    useState<MetaMaskInitResponse | null>(null);

  const updateUsernameToENS = async () => {
    const key = deso.identity.getUserKey();
    if (!key) return;
    deso.ethereum.updateProfileUserNameToEns();
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
                <div>Update a user's username to their ENS if it exists</div>
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
                    text={`const deso = new Deso()\nconst metamaskResponse = await deso.metamask.populateProfile();`}
                    language={'tsx'}
                    wrapLines={true}
                    theme={nord}
                  />
                  <ClickHereSnippet
                    toCallText="populate Profile with ENS"
                    onclick={updateUsernameToENS}
                  />
                </>
              )}
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
