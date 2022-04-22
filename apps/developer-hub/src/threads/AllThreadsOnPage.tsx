import Deso from 'deso-protocol';
import { ReactElement, useEffect, useState } from 'react';
import { CreateThreadOnChain } from './CreateThreadOnChain';
import { Statement } from './Statement';
import { Thread } from './Thread';

export interface AllThreadsONPage {
  title: string;
  publicKeyWhereThreadsLive: string;
}
const deso = new Deso();
export const AllThreadsONPage = ({
  title,
  publicKeyWhereThreadsLive,
}: AllThreadsONPage) => {
  const [threads, setThreads] = useState<ReactElement[]>([]);
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
        console.log(p);
        if (!p.PostFound?.Comments) return [];
        return p.PostFound.Comments.map((c) => (
          <Thread key={c.PostHashHex} PostHashHex={c.PostHashHex} />
        ));
      })
      .flat();
    console.log(threads);
    setThreads(threads);
    // console.log(response);
  };
  useEffect(() => {
    setThreads([]);
    console.log('asdf');
    getThreads();
    // deso.posts.getSinglePost({ PostHashHex, CommentLimit: 500 });
  }, [title]);
  return (
    <>
      <Statement
        userName="You"
        body="Create a new Thread"
        PostHashHex="null"
        statementType="Question"
        setShowComments={() => {
          console.log('temp');
        }}
        posterKey={deso.identity.getUserKey() as string}
      />
      {threads}
    </>
  );
};
