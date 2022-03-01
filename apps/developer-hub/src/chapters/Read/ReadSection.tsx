import { ReactElement, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { PageNavigation } from "../../components/layout/PageNavigation";
import { PublicKey } from "../ChapterHelper/Chapter.atom";
import { Chapter, ChapterNavigation } from "../ChapterHelper/Chapter.models";
import { ChapterTemplate, TabItem } from "../ChapterHelper/ChapterTemplate";
import {
  ProfileInfoRequest,
  ProfileInfoResponse,
} from "./get-single-profile/GetSingleProfile.service";
import { getSourceFromGithub, jsonBlock } from "../../services/utils";
import {
  CommonPageSectionTitles,
  PageSection,
} from "../ChapterHelper/PageSections";
import { BASE_URI } from "../ChapterHelper/BaseUri";
export interface Chapter1SectionProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
  tabs: TabItem[];
  pretext?: ReactElement;
  responseText?: string;
  requestText?: string;
  apiCall: (params: any) => any;
}
export const Chapter1Section = ({
  selectedChapter,
  chapters,
  apiCall,
  tabs,
  pretext,
  responseText,
  requestText,
}: Chapter1SectionProps) => {
  const publicKey = useRecoilValue(PublicKey);
  const [response, setResponse] = useState<ProfileInfoResponse | null>(null);
  const [request, setRequest] = useState<ProfileInfoRequest | null>(null);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [chapterTitle, setChapterTitle] = useState<null>(null);
  const [code, setCode] = useState<ReactElement[]>([]);
  useEffect(() => {
    // clear out the page if they hit go to the next section
    if (chapterTitle !== selectedChapter.title) {
      setResponse(null);
      setEndpoint(null);
      setRequest(null);
      setChapterTitle(chapterTitle);
    }

    getSourceFromGithub(selectedChapter.githubSource).then(setCode);
  }, [selectedChapter]);
  const executeApiCall = async () => {
    const apiResponse = await apiCall(publicKey).catch((e: Error) =>
      alert(e.message)
    );
    if (apiResponse) {
      setResponse(apiResponse?.response);
      setEndpoint(`${BASE_URI}/${apiResponse.endpoint}`);
      setRequest(apiResponse.request);
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
                  Click{" "}
                  <span
                    className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                    onClick={executeApiCall}
                  >
                    here
                  </span>{" "}
                  to call {selectedChapter.title}.
                </div>
              )}
              {response &&
                PageSection(
                  CommonPageSectionTitles.WHAT_HAPPENED,
                  <div className="list-decimal">
                    <li className="mb-2">
                      First we pointed our http client to{" "}
                      {selectedChapter.description}.
                      {endpoint && jsonBlock(endpoint)}
                    </li>
                    <li className="mb-2">
                      {requestText}

                      {request && jsonBlock(request)}
                    </li>
                    <li className="mb-2">
                      Finally we get the response. See below to see what fields
                      are returned.
                      {response && jsonBlock(response)}
                    </li>
                  </div>
                )}
            </>
          ),
        },
        {
          content: PageSection("", <>{code}</>),
          title: CommonPageSectionTitles.CODE,
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
