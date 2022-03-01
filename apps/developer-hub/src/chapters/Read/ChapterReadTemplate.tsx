import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { CopyBlock, nord } from "react-code-blocks";
import { getSourceFromGithub } from "../../services/utils";
export interface ChapterApiTemplateProps {
  request: any;
  response: any;
  endpoint: string | null;
  onClick: () => void;
  title: string;
  githubSource: string[];
}
export const ChapterReadTemplate = ({
  request,
  response,
  endpoint,
  title,
  githubSource,
  onClick,
}: ChapterApiTemplateProps) => {
  const [code, setCode] = useState<ReactElement[]>([]);
  useEffect(() => {
    getSourceFromGithub(githubSource).then((response) => {
      setCode(response);
    });
  }, []);
  return (
    <div>
      <div className=" rounded-lg min-h-[300px] p-2">
        <div className="font-semibold text-lg">
          Click{" "}
          <span
            onClick={onClick}
            className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
          >
            here
          </span>{" "}
          to call {title}
        </div>
        <div className="font-lg font-semibold">EndPoint:</div>
        {endpoint && (
          <CopyBlock
            text={JSON.stringify(endpoint, null, 2)}
            language="json"
            wrapLines={true}
            theme={nord}
          />
        )}
        <div className="font-lg font-semibold">Request:</div>
        {request && (
          <CopyBlock
            text={JSON.stringify(request, null, 2)}
            language="json"
            wrapLines={true}
            theme={nord}
          />
        )}
        <div className="font-lg font-semibold">Response:</div>
        {response && (
          <CopyBlock
            text={JSON.stringify(response, null, 2)}
            language="json"
            wrapLines={true}
            theme={nord}
          />
        )}
        <div className="font-lg font-semibold">Github:</div>
        {response && code}
      </div>
    </div>
  );
};
