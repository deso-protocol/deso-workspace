import { useEffect, useState } from "react";
import { PageNavigation } from "../../../components/layout/PageNavigation";
import { getSourceFromGithub, jsonBlock } from "../../../services/utils";
import { Chapter, ChapterNavigation } from "../../ChapterHelper/Chapter.models";
import { ChapterTemplate } from "../../ChapterHelper/ChapterTemplate";
import {
  CommonPageSectionTitles,
  PageSection,
} from "../../ChapterHelper/PageSections";
import { IdentityInitialize } from "./IdentityInitialize";

export interface IdentityInitializeProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}

export const IdentityInitializePage = ({
  selectedChapter,
  chapters,
}: IdentityInitializeProps) => {
  const [initializedResponse, setInitializedResponse] = useState<any | null>(
    null
  );

  const [code, setCode] = useState<any | null>(null);
  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then((response) => {
      setCode(response);
    });
  }, [setInitializedResponse, initializedResponse]);
  return (
    <ChapterTemplate
      title={selectedChapter.title}
      tabs={[
        {
          title: CommonPageSectionTitles.OVERVIEW,
          content: (
            <>
              {PageSection(
                selectedChapter.title,
                `In order to write data to the chain, decrypt personal
                  messages, or various other tasks, we must first login to the
                  DeSo chain. The simplest way to handle this is by making use
                  of the identity services window api, but before logging in we must first setup a connection with the Identity service.`
              )}
              {PageSection(
                CommonPageSectionTitles.TRY_IT_OUT,
                <div>
                  Click{" "}
                  <span
                    className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                    onClick={() => {
                      IdentityInitialize().then((response) => {
                        setInitializedResponse(response);
                      });
                    }}
                  >
                    here
                  </span>{" "}
                  to initialize an Identity session.
                </div>
              )}
              {initializedResponse &&
                PageSection(
                  <>
                    {initializedResponse && (
                      <div>{CommonPageSectionTitles.WHAT_HAPPENED}</div>
                    )}
                  </>,
                  <div className="list-decimal">
                    <li>
                      We Created the Identity Iframe and appended it to our
                      project. (Should be the last element in the body tag).
                      {jsonBlock(
                        document.getElementById("identity")?.outerHTML,
                        "html"
                      )}
                    </li>
                    <li>
                      Wait for Identity to emit an initialize message with a
                      unique id
                      {initializedResponse && jsonBlock(initializedResponse)}
                    </li>

                    <li>
                      Once received we send a message back to the Identity frame
                      to confirm the connection.
                      {jsonBlock({
                        id: initializedResponse.id,
                        service: "identity",
                        payload: {},
                      })}
                    </li>
                    <div> </div>
                  </div>
                )}
            </>
          ),
        },
        {
          title: "Code",
          content: PageSection("", code),
        },
        {
          title: "Documentation",
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

{
}
