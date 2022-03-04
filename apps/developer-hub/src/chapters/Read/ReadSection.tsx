import { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PageNavigation } from '../../components/layout/PageNavigation';
import { desoService, PublicKey } from '../ChapterHelper/Chapter.atom';
import { Chapter, ChapterNavigation } from '../ChapterHelper/Chapter.models';
import { ChapterTemplate, TabItem } from '../ChapterHelper/ChapterTemplate';
import { jsonBlock } from '../../services/utils';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../ChapterHelper/PageSections';
export interface Chapter1SectionProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
  tabs: TabItem[];
  pretext?: ReactElement;
  responseText?: string;
  requestText?: string;
  apiCall: string;
}
export const Chapter1Section = ({
  selectedChapter,
  chapters,
  apiCall,
  pretext,
}: Chapter1SectionProps) => {
  const deso = useRecoilValue(desoService);
  const publicKey = useRecoilValue(PublicKey);
  const [response, setResponse] = useState<any | null>(null);
  const [request, setRequest] = useState<any | null>(null);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [chapterTitle, setChapterTitle] = useState<null>(null);
  useEffect(() => {
    // clear out the page if they hit go to the next section
    if (chapterTitle !== selectedChapter.title) {
      setResponse(null);
      setEndpoint(null);
      setRequest(null);
      setChapterTitle(chapterTitle);
    }
  }, [selectedChapter]);

  const executeApiCall = async () => {
    let apiResponse;
    if (apiCall === 'getUserStateless') {
      apiResponse = await deso.user
        .getUserStateless(publicKey)
        .catch((e: Error) => alert(e.message));
    }
    if (apiCall === 'getFollowsStateless') {
      apiResponse = await deso.social
        .getFollowsStateless(publicKey)
        .catch((e: Error) => alert(e.message));
    }
    if (apiCall === 'getSingleProfile') {
      apiResponse = await deso.user
        .getSingleProfile(publicKey)
        .catch((e: Error) => alert(e.message));
    }
    if (apiResponse) {
      setResponse(apiResponse);
      setEndpoint(`${deso.node.uri}/${selectedChapter.route}`);
      // setRequest(apiResponse);
    }
  };
  return (
    <ChapterTemplate
      title={selectedChapter.title}
      tabs={[
        {
          title: `${CommonPageSectionTitles.OVERVIEW} ${selectedChapter.title}`,
          content: (
            <>
              {pretext}
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
                  to call {selectedChapter.title}.
                </div>
              )}
              {response &&
                PageSection(
                  CommonPageSectionTitles.WHAT_HAPPENED,
                  <div className="list-decimal">
                    <li className="mb-2">
                      First we called
                      {/* {jsonBlock(
                        JSON.parse(selectedChapter.method as string),
                        'ts'
                      )} */}
                      .
                    </li>
                    <li className="mb-2">
                      Request:
                      {request && jsonBlock(request)}
                    </li>
                    <li className="mb-2">
                      Response:
                      {response && jsonBlock(response)}
                    </li>
                  </div>
                )}
            </>
          ),
        },
        {
          content: PageSection(
            CommonPageSectionTitles.ADDITIONAL_DOCUMENTATION,
            <>{chapters.documentationToLink(selectedChapter)}</>
          ),
          title: CommonPageSectionTitles.DOCUMENTATION,
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
export default Chapter1Section;
