import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PageNavigation } from '../../../components/layout/PageNavigation';
import { getSourceFromGithub, jsonBlock } from '../../../services/utils';
import { LoggedInUser, PublicKey } from '../../ChapterHelper/Chapter.atom';
import { Chapter, ChapterNavigation } from '../../ChapterHelper/Chapter.models';
import { ChapterTemplate } from '../../ChapterHelper/ChapterTemplate';
import {
  CommonPageSectionTitles,
  PageSection,
} from '../../ChapterHelper/PageSections';
import { User } from '../../Interfaces/User';
import deso from '@deso-workspace/deso-sdk';
import { GetMessagesStatelessRequest } from '@deso-workspace/deso-types';

export interface DecryptMessagesProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const DecryptMessagesPage = ({
  selectedChapter,
  chapters,
}: DecryptMessagesProps) => {
  const [code, setCode] = useState<any | null>(null);
  const [loggedInUser, setLoggedInUser] = useRecoilState<User | null>(
    LoggedInUser
  );

  const [myPublicKey, setPublicKey] = useRecoilState<string>(PublicKey);
  const [request, setRequest] = useState<GetMessagesStatelessRequest>({
    NumToFetch: 25,
    PublicKeyBase58Check: myPublicKey as string,
    FetchAfterPublicKeyBase58Check: '',
    HoldersOnly: false,
    FollowersOnly: false,
    FollowingOnly: false,
    HoldingsOnly: false,
    SortAlgorithm: 'time',
  });

  const [messageResponse, setMessageResponse] = useState<any>();
  const [finalResponse, setFinalResponse] = useState<any>();
  const loginInit = async () => {
    await deso.identity.initialize();
    return await deso.identity.login();
  };

  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then(setCode);
  }, []);

  return (
    <ChapterTemplate
      title={selectedChapter.title}
      tabs={[
        {
          title: CommonPageSectionTitles.OVERVIEW,
          content: (
            <>
              {PageSection(
                'Decrypt',
                `One use case of the DeSo chain is storing private data. Since
                the chain is public, all data can be read by anyone with an internet connection. Fortunately data can remain
                private by encrypting it first.`
              )}
              {PageSection(
                CommonPageSectionTitles.TRY_IT_OUT,
                <div>
                  Click{' '}
                  <span
                    className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                    onClick={async () => {
                      let user = loggedInUser;
                      if (!user) {
                        user = (await loginInit()).loggedInUser;
                        setLoggedInUser(user);
                      }
                      deso.api.social
                        .getMessages(request, user as User)
                        .then((response: any) => {
                          response.response.OrderedContactsWithMessages.slice(
                            0,
                            4
                          );
                          setMessageResponse(response.response);
                          setFinalResponse(response.thread);
                        });
                    }}
                  >
                    here
                  </span>{' '}
                  to get messages and then decrypt messages.
                </div>
              )}
              {PageSection(
                <>
                  {loggedInUser && (
                    <div>{CommonPageSectionTitles.WHAT_HAPPENED}</div>
                  )}
                </>,
                <div>
                  {loggedInUser && (
                    <div className="list-decimal">
                      <li>
                        First we sent a post request to:
                        {jsonBlock(`${deso.node.uri}/get-messages-stateless`)}
                      </li>
                      <li>
                        The following payload is included on the post, where
                        numToFetch is how many conversations to grab,
                        PublicKeyBase58Check is the owner of the messages,
                        sortAlgorithm determines how they comeback, and then
                        HoldersOnly, FollowersOnly, HoldingsOnly, are all filter
                        options.
                        {jsonBlock(request)}
                      </li>
                      <li>
                        The Api will respond with our messages, but the content
                        is still encrypted.{' '}
                        <div className="overflow-auto max-h-[500px]">
                          {messageResponse && jsonBlock(messageResponse)}
                        </div>
                      </li>
                      <li>
                        Now we can take our encrypted response and send a
                        request to the IdentityFrame to decrypt it. After
                        decrypting the data and mapping the response to
                        something easy to work with we get the following.
                        <div className="overflow-auto max-h-[500px]">
                          {finalResponse && jsonBlock(finalResponse)}
                        </div>
                      </li>
                    </div>
                  )}
                </div>
              )}
            </>
          ),
        },

        {
          title: 'Code',
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
    />
  );
};
