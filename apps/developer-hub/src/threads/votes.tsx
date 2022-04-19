import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';
export interface VotesProps {
  PostHashHex: string;
}

const deso = new Deso();
export const Votes = ({ PostHashHex }: VotesProps) => {
  const [upVotes, setUpVotes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getVotes();
  }, []);

  const getVotes = async () => {
    const key = deso.identity.getUserKey();
    if (!key) return;
    const response = await deso.posts.getSinglePost({
      PostHashHex,
      ReaderPublicKeyBase58Check: key,
    });
    if (!response.PostFound) return;
    setUpVotes(response.PostFound.LikeCount);
    setLiked(response.PostFound.PostEntryReaderState.LikedByReader);
  };

  const vote = async (vote: 'up' | 'down') => {
    await deso.social
      .createLikeStateless({
        ReaderPublicKeyBase58Check: deso.identity.getUserKey() as string,
        LikedPostHashHex: PostHashHex,
        MinFeeRateNanosPerKB: 1000,
        IsUnlike: vote === 'down',
      })
      .then(() => {
        setLiked(vote === 'up');
        setUpVotes(vote === 'down' ? upVotes - 1 : upVotes + 1);
      })
      .catch(() => alert('unable to vote at this time'));
  };

  return (
    <div className="flex flex-col max-w-[20px] my-auto">
      <div onClick={() => vote('up')}>
        {!liked ? (
          <KeyboardArrowUpIcon
            fontSize="small"
            className="cursor-pointer hover:text-[#141674]"
          />
        ) : (
          <div className="min-h-[20px]"></div>
        )}
      </div>
      <div className="mx-auto text-sm cursor-default font-semibold max-h-[15px] my-auto align-middle">
        {upVotes}
      </div>
      <div onClick={() => vote('down')}>
        {liked ? (
          <KeyboardArrowDownIcon
            fontSize="small"
            className="cursor-pointer hover:text-[#3a0c0c]"
          />
        ) : (
          <div className="min-h-[20px]"></div>
        )}
      </div>
    </div>
  );
};
