import { LoginUser } from 'deso-protocol-types';
import axios from 'axios';
import { ReactElement } from 'react';
import { CopyBlock, nord } from 'react-code-blocks';

export enum ParentRoutes {
  landing = 'landing',
  admin = 'admin',
  buyDeso = 'buy deso',
  identity = 'identity',
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
  user = 'user',
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
    if (obj['chapterContent'][key] === undefined) return hash;
    return Object.assign(hash, {
      [obj['chapterContent'][key]]: (
        hash[obj['chapterContent'][key]] || []
      ).concat(obj),
    });
  }, {});
}

export const IMPORT_CODE: Readonly<string> = `import Deso from 'deso-protocol';
const deso = new Deso();
`;
