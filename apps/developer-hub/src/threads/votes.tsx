import ThumbUpIcon from '@mui/icons-material/ThumbUp';
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
    // not sure if PostHashHex is getting set as a string as null somewhere or
    // if the api returns it that way, but a temp fix checks for a certain greater than length
    if (PostHashHex.length < 10) return;
    let response;
    if (key) {
      response = await deso.posts.getSinglePost({
        PostHashHex,
        ReaderPublicKeyBase58Check: key,
      });
    } else {
      response = await deso.posts.getSinglePost({
        PostHashHex,
      });
    }
    if (!response.PostFound) return;
    setUpVotes(response.PostFound.LikeCount);
    setLiked(response.PostFound.PostEntryReaderState.LikedByReader);
  };

  const vote = async (vote: 'up' | 'down') => {
    if (vote === 'up' && liked) return;
    if (vote === 'down' && !liked) return;
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
    <div className="flex text-white ml-2">
      <div className=" mx-auto text-sm cursor-default font-semibold max-h-[15px] my-auto align-middle text-[23px] mr-2">
        {upVotes}
      </div>
      <div
        onClick={() => {
          liked ? vote('down') : vote('up');
        }}
      >
        <ThumbUpIcon
          sx={{ fontSize: '24px' }}
          htmlColor={liked ? 'orange' : ''}
          className="cursor-pointer hover:text-[#ffc08c]"
        />
      </div>
    </div>
  );
};
