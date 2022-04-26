import Deso from 'deso-protocol';
import { ReactElement, useEffect, useReducer, useState } from 'react';
import { ThreadCategory, timeout } from '../services/utils';
import { Statement, StatementTypeEnum } from './Statement';
import { Thread } from './Thread';

export interface AllThreadsONPage {
  title: string;
  publicKeyWhereThreadsLive: string;
  ParentPostHashHex?: string;
  category?: ThreadCategory;
}

const deso = new Deso();
export const AllThreadsONPage = ({
  title,
  publicKeyWhereThreadsLive,
  ParentPostHashHex,
  category = ThreadCategory.CLIENT,
}: AllThreadsONPage) => {
  const [threads, setThreads] = useState<ReactElement[]>([]);
  const [createNewThreadPostHashHex, setCreateNewThreadPostHashHex] =
    useState<string>('');
  const [refresh, setRefresh] = useState(true);
  const getThreads = async () => {
    const response = await deso.posts.getPostsForPublicKey({
      PublicKeyBase58Check: publicKeyWhereThreadsLive,
      ReaderPublicKeyBase58Check: deso.identity.getUserKey() as string,
      NumToFetch: 1000,
    });
    if (!response.Posts) return;

    const posts = response.Posts.filter((p) => {
      if (p.PostExtraData['Title'] === title) {
        if (p.PostExtraData['Category'] === ThreadCategory.CLIENT) return true;
        console.log(category === p.PostExtraData['Category']);
        console.log(p.PostExtraData['Category']);
        console.log(category);
        return category === p.PostExtraData['Category'];
      }
      return false;
    });
    if (!posts) return;
    if (!posts[0]) return;
    setCreateNewThreadPostHashHex(posts[0].PostHashHex);
    const postsWithComments = await Promise.all(
      posts.map((p) => {
        return deso.posts.getSinglePost({
          PostHashHex: p.PostHashHex,
          CommentLimit: 1000,
          ReaderPublicKeyBase58Check: deso.identity.getUserKey() as string,
        });
      })
    );
    let comments = postsWithComments[0].PostFound?.Comments;
    if (!comments?.length) return;
    comments = comments.sort((a, b) => {
      if (a.TimestampNanos && b.TimestampNanos) {
        return a.TimestampNanos - b.TimestampNanos;
      }
      return 0;
    });
    const commentsToDisplay = comments.map((c) => {
      return <Thread key={c.PostHashHex} PostHashHex={c.PostHashHex} />;
    });
    console.log(commentsToDisplay);
    setThreads(commentsToDisplay);
  };
  useEffect(() => {
    setThreads([]);
    getThreads();
    setRefresh(false);
  }, [title, refresh, setRefresh, ParentPostHashHex, category]);

  return (
    <div className="mt-4 flex justify-center border-r ">
      <div>
        <Statement
          category={category}
          comments={[]}
          userName="You"
          body="Create a new Thread"
          parentOnPostCallback={async () => {
            // await timeout(2000);
            await getThreads();
            // document.getElementById('root')?.scrollIntoView(false);

            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            } as any);
          }}
          PostHashHex={createNewThreadPostHashHex as string}
          statementType={StatementTypeEnum.NewQuestion}
          posterKey={deso.identity.getUserKey() as string}
        />

        {threads}
      </div>
    </div>
  );
};
