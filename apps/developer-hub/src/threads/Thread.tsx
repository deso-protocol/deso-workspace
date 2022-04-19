import { Banner } from './Banner';
import { CreateThreadOnChain } from './CreateThreadOnChain';
import { GetSinglePostResponse } from 'deso-protocol-types';
import { Question } from './Question';
import { Response } from './Response';
import { ReactElement, useEffect, useState } from 'react';
import { Votes } from './votes';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Deso from 'deso-protocol';
export interface ThreadProps {
  PostHashHex: string;
}
const deso = new Deso();
export const Thread = ({ PostHashHex }: ThreadProps) => {
  const [thread, setThread] = useState<GetSinglePostResponse | null>(null);
  const [responses, setResponses] = useState<ReactElement[]>([]);
  const [isCollasped, setIsCollapsed] = useState<boolean>(true);
  useEffect(() => {
    getThreadAndResponses();
    // get thread data
  }, []);
  const getThreadAndResponses = async () => {
    const response = await deso.posts.getSinglePost({
      PostHashHex,
      CommentLimit: 100,
    });

    if (!response) return;
    setThread(response);

    if (!response.PostFound?.Comments) return;
    const responses = response.PostFound?.Comments.map((c) => {
      return <Response body={c.Body} PostHashHex={c.PostHashHex} />;
    });
    console.log(responses);
    setResponses(responses);
  };
  return (
    <div className="min-h-[600px]">
      {thread?.PostFound && (
        <Banner
          userName={thread?.PostFound?.ProfileEntryResponse?.Username as string}
          timestamptNanos={thread.PostFound.TimestampNanos}
          title={thread.PostFound.PostExtraData['title']}
        />
      )}
      <div className="flex border-gray-400 py-2">
        <div>
          {/* <CreateThreadOnChain /> */}
          <div className="flex flex-col py-4">
            {thread?.PostFound?.Body && (
              <Question
                body={thread?.PostFound?.Body}
                PostHashHex={thread?.PostFound?.PostHashHex}
              />
            )}
          </div>
          {responses}
        </div>
      </div>
    </div>
  );
};

export const arrowToggle = () => {
  return (
    <>
      <ArrowDropDownIcon />
      <ArrowRightIcon />
    </>
  );
};
