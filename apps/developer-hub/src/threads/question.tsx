import Deso from 'deso-protocol';
import { useEffect } from 'react';
import { ProfilePicture } from '../components/ProfilePicture';
import { ReplyOptions } from './ReplyOptions';
export interface QuestionProps {
  body: string;
  PostHashHex: string;
  posterKey: string;
  userName: string;
}
const deso = new Deso();
export const Question = ({
  body,
  PostHashHex,
  posterKey,
  userName,
}: QuestionProps) => {
  return (
    <div className="border-gray-400 ">
      <div className="flex  ml-2 flex-col bg-[#000000d5]"></div>
      <div className="my-auto rounded-b border border-gray-400  min-h-[75px]">
        {body}
      </div>
    </div>
  );
};
