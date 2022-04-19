import { ReplyOptions } from './ReplyOptions';
import { Votes } from './votes';
export interface QuestionProps {
  body: string;
  PostHashHex: string;
}
export const Question = ({ body, PostHashHex }: QuestionProps) => {
  return (
    <div>
      {/* <div className="my-auto font-medium text-xl pl-3 border-b pb-2 border-gray-400"></div>{' '} */}
      <div className="flex justify-start ">
        <div className="flex border-gray-400 ml-2">
          <Votes PostHashHex={PostHashHex} />
        </div>
        <div className="pb-5 mx-2 ">{body}</div>
      </div>
      <ReplyOptions PostHashHex={PostHashHex} />
    </div>
  );
};
