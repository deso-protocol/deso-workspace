import { GetPostsForPublicKeyResponse } from 'deso-protocol-types';
import { Avatar, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { desoService } from '../../chapters/ChapterHelper/Chapter.atom';
import {
  SampleAppMyUserInfo,
  MyUserInfoType,
} from '../../recoil/AppState.atoms';
export interface CreatePostProps {
  publicKey: string;
}
const DisplayPosts = ({ publicKey }: CreatePostProps) => {
  const deso = useRecoilValue(desoService);
  const [posts, setPosts] = useState<ReactElement[]>([]);
  const user = useRecoilValue<MyUserInfoType | null>(SampleAppMyUserInfo);
  useEffect(() => {
    getPosts();
  }, [user]);

  const getPosts = async (): Promise<void> => {
    if (user?.profileInfoResponse?.Profile?.Username) {
      const posts: GetPostsForPublicKeyResponse =
        await deso.posts.getPostsForPublicKey(
          publicKey,
          user?.profileInfoResponse?.Profile.Username
        );
      // TODO fix
      // setPosts(generatePosts(posts));
    }
  };

  const generatePosts = (postInfo: any): ReactElement[] => {
    if (user) {
      let postElements: ReactElement[] = [];
      if (postInfo.Posts) {
        postElements = postInfo.Posts.map((post: any, index: number) => {
          const profilePictureSrc = deso.user.getSingleProfilePicture(
            post.PosterPublicKeyBase58Check
          );
          return (
            <Card key={index} className="mb-5 pb-2">
              <CardHeader
                avatar={<Avatar src={profilePictureSrc}></Avatar>}
                title={`@${user?.profileInfoResponse?.Profile?.Username ?? ''}`}
              ></CardHeader>
              <div className="pl-4">{post.Body}</div>
            </Card>
          );
        });
      }
      if (postElements.length > 0) {
        return postElements;
      }
      return [];
    } else {
      return [];
    }
  };
  return <div className="flex flex-col">{posts}</div>;
};

export default DisplayPosts;
