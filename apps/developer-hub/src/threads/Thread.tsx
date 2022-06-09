import { Statement, StatementTypeEnum } from './Statement';
import { ReactElement, useEffect, useState } from 'react';
import Deso from 'deso-protocol';
export interface ThreadProps {
  PostHashHex: string;
}
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
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
    const thread = (
      <Statement
        userName={response.PostFound.ProfileEntryResponse?.Username as string}
        statementType={StatementTypeEnum.Question}
        body={response.PostFound.Body}
        PostHashHex={response.PostFound.PostHashHex}
        posterKey={response.PostFound.PosterPublicKeyBase58Check}
        comments={response?.PostFound?.Comments ?? []}
      />
    );
    setThread(thread ?? null);
  };

  return <div>{thread}</div>;
};
