import { Votes } from './votes';
export interface QuestionProps {
  title: string;
  body: string;
}
export const Question = ({ title, body }: QuestionProps) => {
  return (
    <div>
      <div className="my-auto font-semibold text-lg ml-9">{title}</div>{' '}
      <div className="flex border-gray-400 ml-2">
        <Votes />
      </div>
      <div className="pb-5 mx-5 ml-9">{body}</div>
    </div>
  );
};
