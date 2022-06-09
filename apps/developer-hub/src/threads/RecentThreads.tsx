import Deso from 'deso-protocol';
import { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { HUB } from '../services/utils';
import { Statement, StatementTypeEnum } from '../threads/Statement';
import { LoggedIn } from './Threads.state';

const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export const RecentThreads = () => {
  const [loggedIn, setLoggedIn] = useRecoilState(LoggedIn);
  const [threadsToDisplay, setThreads] = useState<ReactElement[]>();
  useEffect(() => {
    getRecentThreads(deso, HUB);
  }, [loggedIn, setLoggedIn]);

  const getRecentThreads = async (deso: Deso, PublicKeyBase58Check: string) => {
    const posts = await deso.posts.getPostsForPublicKey({
      PublicKeyBase58Check,
      NumToFetch: 1000,
    });
    if (!posts.Posts) return;

    Promise.all(
      posts.Posts.map((p) => {
        return deso.posts.getSinglePost({
          PostHashHex: p.PostHashHex,
          CommentLimit: 100,
        });
      })
    ).then((results) => {
      const threads = results
        .map((p) => {
          return p.PostFound?.Comments;
        })
        .flat()
        .filter((t) => t !== null)
        .sort((a, b) => {
          if (!a || !b) return 0;
          if (a.TimestampNanos && b.TimestampNanos) {
            return a.TimestampNanos - b.TimestampNanos;
          }
          return 0;
        });
      Promise.all(
        threads.slice(threads.length - 5).map((t) => {
          if (!t) return;
          return deso.posts.getSinglePost({
            PostHashHex: t.PostHashHex,
            CommentLimit: 100,
          });
        })
      ).then((threadsWithComments) => {
        const threadsToDisplay = threadsWithComments.map((t) => {
          if (!t?.PostFound) return <></>;
          return (
            <Statement
              userName={t.PostFound.ProfileEntryResponse?.Username as string}
              statementType={StatementTypeEnum.Question}
              body={t.PostFound.Body}
              PostHashHex={t.PostFound.PostHashHex}
              posterKey={t.PostFound.PosterPublicKeyBase58Check}
              comments={t.PostFound.Comments ?? []}
            />
          );
        });

        setThreads(threadsToDisplay ?? []);
      });
    });
  };
  return <div>{threadsToDisplay}</div>;
};
