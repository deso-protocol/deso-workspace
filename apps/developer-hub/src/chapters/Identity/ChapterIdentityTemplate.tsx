import { ReactElement } from "react";

export interface ChapterIdentityTemplateProps {
  //   request: any;
  response: any;
  //   endpoint: string | null;
  onClick: () => void;
  title: string;
  textBody: ReactElement;
}
export const ChapterIdentityTemplate = ({
  title,
  onClick,
  response,
  textBody,
}: ChapterIdentityTemplateProps) => {
  return (
    <div>
      <div className="rounded-lg min-h-[300px] p-2">
        <div className="font-semibold text-lg">
          Click{" "}
          <span
            onClick={onClick}
            className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
          >
            here
          </span>{" "}
          to {title}
        </div>
        {response && textBody}
      </div>
    </div>
  );
};
