import { Statement } from './Statement';
import { ReactElement, useEffect, useState } from 'react';
import Deso from 'deso-protocol';
export interface ThreadProps {
  PostHashHex: string;
}
const deso = new Deso();
export const Thread = ({ PostHashHex }: ThreadProps) => {
  const [thread, setThread] = useState<ReactElement | null>(null);
  const [responses, setResponses] = useState<ReactElement[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);
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
    const thread = (
      <Statement
        setShowComments={setShowComments}
        userName={response.PostFound.ProfileEntryResponse?.Username as string}
        statementType="Question"
        body={response.PostFound.Body}
        PostHashHex={response.PostFound.PostHashHex}
        posterKey={response.PostFound.PosterPublicKeyBase58Check}
      />
    );
    setThread(thread ?? null);
    if (!response.PostFound?.Comments) return;

    const responses = response.PostFound?.Comments.map((c) => {
      return (
        <Statement
          userName={c.ProfileEntryResponse?.Username as string}
          body={c.Body}
          PostHashHex={c.PostHashHex}
          posterKey={c.PosterPublicKeyBase58Check}
        />
      );
    });

    setResponses(responses);
  };

  return (
    <div className="w-[800px] max-w-[800px] mx-auto mt-4">
      <div className="flex border-gray-400">
        <div>
          <div>{thread}</div>
          {showComments && responses}
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
