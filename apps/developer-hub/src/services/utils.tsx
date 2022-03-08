import { LoginUser } from '@deso-workspace/deso-types';
import axios from 'axios';
import { ReactElement } from 'react';
import { CopyBlock, nord } from 'react-code-blocks';
import { TransactionPost } from '../chapters/Interfaces/Transaction.interface';

export enum ParentRoutes {
  user = 'user',
  posts = 'posts',
  nft = 'nft',
  media = 'media',
  referral = 'referral',
  buyDeso = 'buy deso',
  notification = 'notification',
  miner = 'miner',
  admin = 'admin',
  social = 'social',
  metaData = 'metaData',
  identity = 'identity',
  node = 'node',
  none = 'none',
  landing = 'landing',
}
export const TYLER: Readonly<string> =
  'BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog';
export const RUSSIA: Readonly<string> =
  'BC1YLhxfpQ3SHhoJRbYpYdz1FS2CAxpymkPEGUoDZVYLXH1eGdW2pmY';
export const DEZO_DOG: Readonly<string> =
  'BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY';
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
export const IMPORT_CODE: Readonly<string> = `import Deso from '@deso-workspace/deso-sdk';
const deso = new Deso();
`;
