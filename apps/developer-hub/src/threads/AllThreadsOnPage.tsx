import Deso from 'deso-protocol';
import { ReactElement, useEffect, useState } from 'react';
import { Statement, StatementTypeEnum } from './Statement';
import { Thread } from './Thread';

export interface AllThreadsONPage {
  title: string;
  publicKeyWhereThreadsLive: string;
  ParentPostHashHex?: string;
}

const deso = new Deso();
export const AllThreadsONPage = ({
  title,
  publicKeyWhereThreadsLive,
  ParentPostHashHex,
}: AllThreadsONPage) => {
  const [threads, setThreads] = useState<ReactElement[]>([]);
  const [createNewThreadPostHashHex, setCreateNewThreadPostHashHex] =
    useState('');
  const getThreads = async () => {
    const response = await deso.posts.getPostsForPublicKey({
      PublicKeyBase58Check: publicKeyWhereThreadsLive,
      ReaderPublicKeyBase58Check: deso.identity.getUserKey() as string,
      NumToFetch: 1000,
    });
    if (!response.Posts) return;

    const posts = response.Posts.filter(
      (p) => p.PostExtraData['Title'] === title
    );
    if (!posts) return;
    setCreateNewThreadPostHashHex(posts[0].PostHashHex);
    console.log(posts);
    const postsWithComments = await Promise.all(
      posts.map((p) => {
        return deso.posts.getSinglePost({
          PostHashHex: p.PostHashHex,
          CommentLimit: 1000,
          ReaderPublicKeyBase58Check: deso.identity.getUserKey() as string,
        });
      })
    );
    // deso.posts.getSinglePost({PostHashHex: posts})
    const threads = postsWithComments
      .map((p, i) => {
        if (!p.PostFound?.Comments) return [];
        return p.PostFound.Comments.sort((a, b) => {
          if (a.TimestampNanos && b.TimestampNanos) {
            return b.TimestampNanos - a.TimestampNanos;
          }
          return 0;
        }).map((c) => (
          <Thread key={c.PostHashHex} PostHashHex={c.PostHashHex} />
        ));
      })
      .flat();
    setThreads(threads);
  };
  useEffect(() => {
    setThreads([]);
    getThreads();
  }, [title]);
  return (
    <>
      <div className="flex justify-center">
        <Statement
          comments={[]}
          userName="You"
          body="Create a new Thread"
          onPostCallback={() => getThreads()}
          PostHashHex={createNewThreadPostHashHex as string}
          statementType={StatementTypeEnum.NewQuestion}
          posterKey={deso.identity.getUserKey() as string}
        />
      </div>
      {threads}
    </>
  );
};
