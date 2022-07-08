/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { CopyBlock, nord } from 'react-code-blocks';
import { PageNavigation } from '../../components/layout/PageNavigation';
import { DesoContext } from '../../services/DesoContext';
import { HUB, IMPORT_CODE, jsonBlock } from '../../services/utils';
import { AllThreadsONPage } from '../../threads/AllThreadsOnPage';
import { Chapter, ChapterNavigation } from '../ChapterHelper/Chapter.models';
import ChapterTemplate from '../ChapterHelper/ChapterTemplate';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../ChapterHelper/PageSections';
export interface PageProps {
  selectedChapter: Chapter;
  method?: {
    methodName: string;
    method: Function;
    params: Function;
    customResponse?: unknown;
  };
  chapters: ChapterNavigation;
  pretext?: ReactElement;
  bind?: string;
  demo: boolean;
  testnet?: boolean;
}

export const Page = ({
  method,
  selectedChapter,
  chapters,
  pretext,
  bind,
  demo = true,
  testnet = false,
}: PageProps) => {
  const filePicker = useRef(null);
  const deso = useContext(DesoContext);
  console.log('deso => ', deso);
  const [response, setResponse] = useState<any | null>(null);
  const [chapterTitle, setChapterTitle] = useState<string>('');
  useEffect(() => {
    if (chapterTitle !== selectedChapter.title) {
      setResponse(null);
      setChapterTitle(selectedChapter.title);
    }
  }, [chapterTitle, selectedChapter, setResponse]);
  const executeApiCall = async () => {
    if (!method) {
      return;
    }
    const methodToCall = method.method.bind(bind ? (deso as any)[bind] : deso);

    const response = await methodToCall(method.params());
    console.log(response);
    setResponse(response);
  };

  return (
    <ChapterTemplate
      tabs={[
        {
          title: `${CommonPageSectionTitles.OVERVIEW} ${selectedChapter.title}`,
          content: (
            <>
              {pretext}
              {PageSection(
                `Using ${selectedChapter.title}`,
                <>
                  <div>
                    See additional parameters{' '}
                    {chapters.documentationToLink(selectedChapter)}{' '}
                  </div>
                  <CopyBlock
                    codeBlock
                    text={`${IMPORT_CODE}const request = ${
                      typeof method?.params() === 'string'
                        ? method.params()
                        : JSON.stringify(method?.params(), null, 2)
                    };\n const response = await ${
                      method?.methodName as string
                    };`}
                    language={'tsx'}
                    wrapLines={true}
                    theme={nord}
                  />
                </>
              )}
              {(demo &&
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
                'Demo coming soon'}
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
export default Page;
