/* eslint-disable @typescript-eslint/ban-types */
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Tooltip } from '@mui/material';
import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';
import { StatementTypeEnum } from './Statement';
import { Votes } from './votes';

const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export interface ResponsesProps {
  PostHashHex: string;
}
export const Responses = ({ PostHashHex }: ResponsesProps) => {
  const [diamondCount, setDiamondCount] = useState(0);
  const [diamondsBestowed, setDiamondsBestowed] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [poster, setPoster] = useState('');
  useEffect(() => {
    getPoster();
  }, []);
  const giveDiamond = async () => {
    if (diamondsBestowed > 0) {
      alert('already tipped');
      return;
    }
    if (deso.identity.getUserKey() === poster) {
      alert('cannot tip yourself');
      return;
    }
    await deso.social
      .sendDiamonds({
        ReceiverPublicKeyBase58Check: poster,
        SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
        DiamondPostHashHex: PostHashHex,
        DiamondLevel: 1,
        MinFeeRateNanosPerKB: 1000,
        InTutorial: false,
      })
      .then(() => {
        if (diamondsBestowed === 0) {
          setDiamondsBestowed(1);
          setDiamondCount(diamondCount + 1);
        }
      });
  };

  const getPoster = async () => {
    const post = await deso.posts.getSinglePost({
      PostHashHex,
      ReaderPublicKeyBase58Check: deso.identity.getUserKey() as string,
    });
    setCommentCount(post.PostFound?.CommentCount ?? 0);
    if (!post.PostFound?.PosterPublicKeyBase58Check) return;
    setPoster(post.PostFound?.PosterPublicKeyBase58Check);
    setDiamondCount(post.PostFound.DiamondCount);
    setDiamondsBestowed(
      post.PostFound.PostEntryReaderState.DiamondLevelBestowed
    );
  };
  return (
    <div className="flex flex-col py-auto border-white border-l p-2 min-w-[120px] max-w-[120px]">
      <div className="mx-auto">
        <div>
          <Votes PostHashHex={PostHashHex} />
        </div>
        <div className="cursor-pointer  text-white ml-2" onClick={giveDiamond}>
          <div className="flex  my-auto align-middle text-[24px] justify-end text-[24px] font-semibold">
            <div className="mr-2">{diamondCount}</div>
            <div className="my-auto hover:text-[#ffc08c]">
              <Tooltip title="Tip a diamond" placement="right">
                <LocalAtmIcon
                  htmlColor={diamondsBestowed > 0 ? 'orange' : ''}
                  sx={{ fontSize: '24px' }}
                  fontSize="small"
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
