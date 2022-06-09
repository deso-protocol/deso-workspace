import {
  LoginUser,
  PostEntryResponse,
  SubmitPostRequest,
} from 'deso-protocol-types';
import axios from 'axios';
import { ReactElement } from 'react';
import { CopyBlock, nord } from 'react-code-blocks';

import Deso from 'deso-protocol';
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });

export enum ThreadCategory {
  GENERAL = 'GENERAL',
  NODE = 'NODE',
  CORE = 'CORE',
  BACKEND = 'BACKEND',
  CLIENT = 'CLIENT',
  HUB = 'HUB',
}
export enum ThreadState {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  REMOVED = 'REMOVED',
  OPEN = 'OPEN',
}
export enum ParentRoutes {
  identity = 'identity',
  admin = 'admin',
  buyDeso = 'buy deso',
  dao = 'dao',
  landing = 'landing',
  media = 'media',
  metaData = 'metaData',
  miner = 'miner',
  nft = 'nft',
  node = 'node',
  none = 'none',
  notification = 'notification',
  posts = 'posts',
  referral = 'referral',
  social = 'social',
  transactions = 'transactions',
  user = 'user',
  wallet = 'wallet',
  metamask = 'metamask',
}
export const TYLER: Readonly<string> =
  'BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog';
export const RUSSIA: Readonly<string> =
  'BC1YLhxfpQ3SHhoJRbYpYdz1FS2CAxpymkPEGUoDZVYLXH1eGdW2pmY';
export const DEZO_DOG: Readonly<string> =
  'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY';
export const DOGS_LOVE_DIAMONDS_POST =
  '6a30911a948dce54c00523daaa81a8b3c6323ed873880e8ff3e42bee5543c49a';
export const SAMPLE_POST =
  'd30d715dfdc59955ae239635833367dd6c367bb52771bc47f507ccfb4060d53a';
export const SAMPLE_NFT_POST =
  'be84338d248394f9ef194c01054039a51667420a7fb91fb838c2445f786432b6';
export const HUB: Readonly<string> =
  'BC1YLjF8fqTCWx5JHqH8tvqMGqrZpREdbLKRQptma15rjnGmZ1WGQT2';
export const getFollowerCount = (userInfoResponse: any): number => {
  const followers =
    userInfoResponse?.UserList[0]?.PublicKeysBase58CheckFollowedByUser?.length;
  return followers ? followers : 0;
};

type UserTransactionInfo = Pick<
  LoginUser,
  'accessLevelHmac' | 'encryptedSeedHex' | 'accessLevel'
> &
  any;

export const getSourceFromGithub = async (
  urls: string[]
): Promise<ReactElement[]> => {
  const blocks = Promise.all(
    urls.map(async (url, index) => {
      const blockName = url.split('/').pop();
      const response = await axios.get(url);
      return (
        <div key={index}>
          <div className=" font-semibold">{blockName}:</div>
          <CopyBlock
            codeBlock
            text={response.data}
            language="tsx"
            wrapLines={true}
            theme={nord}
          />
        </div>
      );
    })
  );
  return blocks;
};
export const jsonBlock = (
  json: string | any | HTMLElement | undefined,
  lang = 'json'
): ReactElement => {
  if (!json) {
    return <></>;
  }
  if (json instanceof String || lang === 'html') {
    return (
      <CopyBlock
        codeBlock
        text={json}
        language={lang}
        wrapLines={true}
        theme={nord}
      />
    );
  } else {
    return (
      <CopyBlock
        codeBlock
        text={JSON.stringify(json, null, 2)}
        language={lang}
        wrapLines={true}
        theme={nord}
      />
    );
  }
};
export const ClickHereSnippet = (
  onclick: (...params: any) => any,
  toCallText: string
) => {
  return (
    <div>
      Click{' '}
      <span
        className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
        onClick={() => {
          onclick();
        }}
      >
        here
      </span>{' '}
      {toCallText}
    </div>
  );
};

export function groupBy(array: any[], key: string) {
  return array.reduce((hash, obj) => {
    if (obj['props'][key] === undefined) return hash;
    return Object.assign(hash, {
      [obj['props'][key]]: (hash[obj['props'][key]] || []).concat(obj),
    });
  }, {});
}

export const IMPORT_CODE: Readonly<string> = `import Deso from 'deso-protocol';
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
`;

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export interface CreateNewThreadOnHub {
  Body: string;
  Title: string;
  Category: ThreadCategory;
}
export const createNewThread = ({
  Body,
  Category,
  Title,
}: CreateNewThreadOnHub) => {
  const request: Partial<SubmitPostRequest> = {
    UpdaterPublicKeyBase58Check: deso.identity.getUserKey() as string,
    BodyObj: {
      Body,
      VideoURLs: [],
      ImageURLs: [],
    },
    PostExtraData: {
      Title,
      Category,
      ResolvedBy: 'N/A',
      State: ThreadState.OPEN,
    },
  };
  deso.posts.submitPost(request);
};
export const getForumPosts = async () => {
  const response = await deso.posts.getPostsForPublicKey({
    PublicKeyBase58Check: HUB,
    NumToFetch: 1000,
  });

  return response.Posts?.filter(isForumThread) ?? [];
};

const isForumThread = (p: PostEntryResponse) => {
  const category = p.PostExtraData['Category'];
  return [
    ThreadCategory.CORE,
    ThreadCategory.BACKEND,
    ThreadCategory.GENERAL,
    ThreadCategory.NODE,
    ThreadCategory.HUB,
  ].includes(category as ThreadCategory);
};
export const forumRoute = (p: PostEntryResponse) => {
  return `/forum/${p.PostExtraData['Category']}/${p.Body}`
    .replace(' ', '')
    .toLowerCase();
};
