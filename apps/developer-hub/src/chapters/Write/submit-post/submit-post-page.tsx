import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PageNavigation } from '../../../components/layout/PageNavigation';
import {
  ClickHereSnippet,
  getSourceFromGithub,
  jsonBlock,
} from '../../../services/utils';
import {
  desoService,
  LoggedInUser,
  PublicKey,
} from '../../ChapterHelper/Chapter.atom';
import { Chapter, ChapterNavigation } from '../../ChapterHelper/Chapter.models';
import { ChapterTemplate } from '../../ChapterHelper/ChapterTemplate';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../../ChapterHelper/PageSections';
export interface SubmitPostPageProps {
  chapters: ChapterNavigation;
  selectedChapter: Chapter;
}
const postMessage = 'I just made a post from the DeSo Developer Hub';
export const SubmitPostPage = ({
  chapters,
  selectedChapter,
}: SubmitPostPageProps) => {
  const deso = useRecoilValue(desoService);
  const [code, setCode] = useState<any | null>(null);
  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then(setCode);
  }, []);
  const [myPublicKey, setMyPublicKey] = useRecoilState(PublicKey);
  const [response, setResponse] = useState<any>(null);
  const [loggedInUser, setLoggedInUser] = useRecoilState(LoggedInUser);
  const createPost = () => {
    if (myPublicKey && loggedInUser) {
      deso.posts
        .submitPost(
          { BodyObj: { Body: postMessage, VideoURLs: [], ImageURLs: [] } },
          loggedInUser
        )
        .then((response) => {
          setResponse(response);
        });
    } else {
      deso.identity.login().then((response) => {
        const publicKey = response.payload.publicKeyAdded;
        setMyPublicKey(publicKey);
        setLoggedInUser(response.payload.users[publicKey]);
      });
    }
  };
  return (
    <ChapterTemplate
      title="Submit Post"
      tabs={[
        {
          title: `${CommonPageSectionTitles.OVERVIEW} Submit Post`,
          content: (
            <>
              {PageSection(
                'Submit Post',
                <div>
                  submit-post allows a user to create a post on their account.
                </div>
              )}
              {PageSection(
                CommonPageSectionTitles.TRY_IT_OUT,
                <>
                  {ClickHereSnippet(
                    createPost,
                    `to submit a post saying ${postMessage}`
                  )}
                </>
              )}
              {response &&
                PageSection(
                  CommonPageSectionTitles.WHAT_HAPPENED,
                  <div className="list-decimal">
                    <li>
                      First we send a post request to.
                      {jsonBlock('https://node.deso.org/api/v0/submit-message')}
                    </li>
                    <li>
                      The following payload is included on the post, where
                      UpdaterPublicKeyBase58Check is the owner of the post,
                      BodyObj.body is the content of the post. If you want to
                      know more about the other attributes check out the
                      documentation tab
                      {jsonBlock(response?.data)}
                    </li>
                    <li>
                      We then take the the transactionHex from the response and
                      assemble a message for the identity service. Assuming it
                      goes through our post will be written.
                      {jsonBlock({
                        id: '5aa98d59-a6f1-41e6-b322-8136cc954919',
                        method: 'sign',
                        payload: {
                          accessLevelHmac:
                            '0b370386ff95f7409c2d5dbfa5d0c29e0ebb96cae93cd30d323bbbf752b2d886',
                          encryptedSeedHex:
                            '599154d329883c999544d8da691fd2f6bf2c9332c6805a85dd4cbbea81525c701bb0cd222d716b632bc040808ba6812007066493a8da4356cade6ddf3a2d6613',
                          accessLevel: 4,
                          transactionHex:
                            '0108e8992890c6e1054a0bb70da5c1dfdd1909881d9f5b252c5683fb5236908b51000103037fe7f8102d08e0d1e007786d958aaee319b2f38f1e05c5057320a5c1373ffb8eb501054a0000397b22426f6479223a2249206a757374206d616465206120706f73742066726f6d20746865204465536f20446576656c6f70657220487562227de807d461fcb89ecc9fc9acea16002103037fe7f8102d08e0d1e007786d958aaee319b2f38f1e05c5057320a5c1373ffb0000',
                        },
                        service: 'identity',
                      })}
                    </li>
                  </div>
                )}
            </>
          ),
        },
        {
          title: CommonPageSectionTitles.CODE,
          content: PageSection('', code),
        },
        {
          title: 'Documentation',
          content: PageSection(
            CommonPageSectionTitles.ADDITIONAL_DOCUMENTATION,
            <>{chapters.documentationToLink(selectedChapter)}</>
          ),
        },
      ]}
      navigation={
        <PageNavigation
          previous={chapters.prev(selectedChapter) as Chapter}
          next={chapters.next(selectedChapter) as Chapter}
        />
      }
    ></ChapterTemplate>
  );
};
