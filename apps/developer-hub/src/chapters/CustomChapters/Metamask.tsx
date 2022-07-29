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
export const Metamask = ({ selectedChapter, chapters }: MetamaskProps) => {
  const deso = useContext(DesoContext);
  const [metamaskResponseObject, setMetaMaskResponse] =
    useState<MetaMaskInitResponse | null>(null);
  const signInWithMetamask = async () => {
    console.log('oy?');
    const key = deso.identity.getUserKey();
    if (!key) return;
    deso.Metamask.desoKeyToEthereumKey(key);
    // const metamaskResponse = await deso.metamask.signInWithMetamaskNewUser();
    // metamaskResponse.derivedKeyPair = {
    //   hidden: 'note this object was truncated since its too long to print ',
    // } as unknown as ec.KeyPair;
    // setMetaMaskResponse(metamaskResponse);
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
                <div>
                  Allows a user with an ethereum account to sign into DeSo.{' '}
                </div>
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
                    onclick={signInWithMetamask}
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
