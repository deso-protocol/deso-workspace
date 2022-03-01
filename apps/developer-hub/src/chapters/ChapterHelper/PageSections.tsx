import { ReactElement } from "react";

export const PageSection = (
  title: string | ReactElement,
  content: string | ReactElement
) => {
  return (
    <>
      <div className="mt-2 font-semibold">{title}</div>
      <div className="mb-5">{content}</div>
    </>
  );
};

export enum CommonPageSectionTitles {
  OVERVIEW = "Overview",
  CODE = "Code",
  DOCUMENTATION = "Documentation ",
  TRY_IT_OUT = "Try It Out",
  WHAT_HAPPENED = "What Happened",
  ADDITIONAL_DOCUMENTATION = "Additional Documentation",
}
