import { ReplyOptions } from './ReplyOptions';
import { Votes } from './votes';

export interface ResponseProps {
  body: string;
  PostHashHex: string;
}
export const Response = ({ body, PostHashHex }: ResponseProps) => {
  return (
    <div className="border border-gray-400 py-2 pl-4">
      <div className="flex  px-4 p-1 ">
        <div className="flex mr-2 pr-2  ml-2">
          <Votes PostHashHex={PostHashHex} />
        </div>
        <div className="my-auto">{body}</div>
      </div>
      <ReplyOptions PostHashHex={PostHashHex} />
    </div>
  );
};
