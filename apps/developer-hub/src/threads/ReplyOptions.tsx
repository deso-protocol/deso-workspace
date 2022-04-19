export interface ReplyOptionsProps {
  PostHashHex: string;
}
export const ReplyOptions = ({ PostHashHex }: ReplyOptionsProps) => {
  return (
    <div className="flex justify-around ">
      <div>reply</div> <div>tip</div>
    </div>
  );
};
