/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PageNavigation } from '../../components/layout/PageNavigation';
import { desoService, PublicKey } from '../ChapterHelper/Chapter.atom';
import { Chapter, ChapterNavigation } from '../ChapterHelper/Chapter.models';
import ChapterTemplate, { TabItem } from '../ChapterHelper/ChapterTemplate';
import { DEZO_DOG, IMPORT_CODE, jsonBlock } from '../../services/utils';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../ChapterHelper/PageSections';
import { CopyBlock, nord } from 'react-code-blocks';
export interface PageProps {
  selectedChapter: Chapter;
  method?: {
    methodName: string;
    method: Function;
    params: any;
    customResponse?: any;
  };
  chapters: ChapterNavigation;
  tabs: TabItem[];
  pretext?: ReactElement;
}
export const Page = ({
  method,
  selectedChapter,
  chapters,
  pretext,
}: PageProps) => {
  const deso = useRecoilValue(desoService);
  const [response, setResponse] = useState<any | null>(null);
  const [chapterTitle, setChapterTitle] = useState<null>(null);
  useEffect(() => {
    // clear out the page if they hit go to the next section
    if (chapterTitle !== selectedChapter.title) {
      setResponse(null);
      setChapterTitle(chapterTitle);
    }
  }, [selectedChapter, setResponse]);

  const executeApiCall = async () => {
    if (!method) {
      return;
    }
    const methodToCall = method.method.bind(deso);
    const response = await methodToCall(method.params);
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
                    text={`${IMPORT_CODE}const request = ${JSON.stringify(
                      method?.params,
                      null,
                      2
                    )};\n const response = await ${
                      method?.methodName as string
                    };`}
                    language={'tsx'}
                    wrapLines={true}
                    theme={nord}
                  />
                </>
              )}

              {PageSection(
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
                    method?.customResponse &&
                    method?.customResponse()) ||
                    jsonBlock(response || '')}
                </div>
              )}
            </>
          ),
        },
        // {
        //   content: PageSection(
        //     CommonPageSectionTitles.ADDITIONAL_DOCUMENTATION,
        //     <>{chapters.documentationToLink(selectedChapter)}</>
        //   ),
        //   title: CommonPageSectionTitles.DOCUMENTATION,
        // },
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
