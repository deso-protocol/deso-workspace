import { MetaMaskInitResponse } from 'deso-protocol-types';
import { ec } from 'elliptic';
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
    console.log(deso);
    const metamaskResponse = await deso.metamask.signInWithMetamaskNewUser();
    metamaskResponse.derivedKeyPair = {
      hidden: 'note this object was truncated since its too long to print ',
    } as unknown as ec.KeyPair;
    setMetaMaskResponse(metamaskResponse);
  };

  const populateProfile = async () => {
    // if (metamaskResponse) {
    //   metamaskResponse
    //   const metamaskResponse = await deso.metamask.populateProfile(
    //     '0x8b9C35C79AF5319C70dd9A3E3850F368822ED64E'
    //   );
    // }
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
                    text={`const deso = new Deso()\nconst metamaskResponse = await deso.metamask.signInWithMetamaskNewUser();`}
                    language={'tsx'}
                    wrapLines={true}
                    theme={nord}
                  />
                  <ClickHereSnippet
                    toCallText="click here to generate an account from metamask"
                    onclick={signInWithMetamask}
                  />
                  <div className="max-h-[450px]  overflow-auto">
                    {/* <CopyBlock
                      codeBlock
                      text={JSON.stringify(metamaskResponse, null, 2)}
                      language={'tsx'}
                      wrapLines={true}
                      theme={nord}
                    /> */}
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
