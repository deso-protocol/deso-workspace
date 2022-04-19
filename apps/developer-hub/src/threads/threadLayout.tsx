import { useEffect, useState } from 'react';
import { Votes } from '../threads/votes';
import { Response } from '../threads/response';
import { Question } from './question';
import Deso from 'deso-protocol';
import { GetSinglePostResponse } from 'deso-protocol-types';
import { CreateThreadOnChain } from './CreateThreadOnChain';
import { Banner } from './Banner';
export interface ThreadLayoutProps {
  PostHashHex: string;
}
const deso = new Deso();
export const ThreadLayout = ({ PostHashHex }: ThreadLayoutProps) => {
  const [thread, setThread] = useState<GetSinglePostResponse | null>(null);
  useEffect(() => {
    getThread();
    // get thread data
  }, []);
  const getThread = async () => {
    const response = await deso.posts.getSinglePost({ PostHashHex });

    if (!response) return;
    setThread(response);
  };
  return (
    <div className="min-h-[600px]">
      {thread?.PostFound && (
        <Banner
          userName={thread?.PostFound?.ProfileEntryResponse?.Username as string}
          timestamptNanos={thread.PostFound.TimestampNanos}
        />
      )}
      <div className="flex border-gray-400 py-5">
        <div>
          {/* <CreateThreadOnChain /> */}
          <div className="flex flex-col">
            {thread?.PostFound?.Body && (
              <Question
                title={thread.PostFound.PostExtraData['title']}
                body={thread?.PostFound?.Body}
              />
            )}
          </div>
          <div className="text-lg font-semibold pb-2 ml-9">Answers:</div>
          <Response />
          <Response />
          <Response />
        </div>
      </div>
    </div>
  );
};
