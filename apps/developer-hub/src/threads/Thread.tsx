import { Statement, StatementTypeEnum } from './Statement';
import { ReactElement, useEffect, useState } from 'react';
import Deso from 'deso-protocol';
export interface ThreadProps {
  PostHashHex: string;
}
const deso = new Deso();
export const Thread = ({ PostHashHex }: ThreadProps) => {
  const [thread, setThread] = useState<ReactElement | null>(null);
  const [responses, setResponses] = useState<ReactElement[]>([]);
  useEffect(() => {
    getThreadAndResponses();
    // get thread data
  }, []);

  const getThreadAndResponses = async () => {
    const response = await deso.posts.getSinglePost({
      PostHashHex,
      CommentLimit: 100,
    });

    if (!response.PostFound) return;
    if (!response.PostFound?.Comments) return;

    const responses = response.PostFound?.Comments.map((c) => {
      return (
        <Statement
          comments={[]}
          statementType={StatementTypeEnum.Reply}
          userName={c.ProfileEntryResponse?.Username as string}
          body={c.Body}
          PostHashHex={c.PostHashHex}
          posterKey={c.PosterPublicKeyBase58Check}
        />
      );
    });

    setResponses(responses);

    const thread = (
      <Statement
        userName={response.PostFound.ProfileEntryResponse?.Username as string}
        statementType={StatementTypeEnum.Question}
        body={response.PostFound.Body}
        PostHashHex={response.PostFound.PostHashHex}
        posterKey={response.PostFound.PosterPublicKeyBase58Check}
        comments={response.PostFound.Comments ?? []}
      />
    );
    setThread(thread ?? null);
  };

  return (
    <div className="w-[800px] max-w-[800px] mx-auto">
      <div className="flex border-gray-400">
        <div>
          <div>{thread}</div>
          {/* {showComments && responses} */}
        </div>
      </div>
    </div>
  );
};

// export const arrowToggle = () => {
//   return (
//     <>
//       <ArrowDropDownIcon />
//       <ArrowRightIcon />
//     </>
//   );
// };
