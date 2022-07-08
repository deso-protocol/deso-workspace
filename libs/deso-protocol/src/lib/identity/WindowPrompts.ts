import {
  IdentityDeriveParams,
  IdentityDeriveQueryParams,
  NFTKey,
} from 'deso-protocol-types';
export interface WindowFeatures {
  top: number;
  left: number;
  width: number;
  height: number;
}
export const requestApproval = (
  transactionHex: string,
  uri: string,
  testnet: boolean = false,
  { top = 0, left = 0, width = 800, height = 1000 }: WindowFeatures
): Window => {
  const prompt = window.open(
    `${uri}/approve?tx=${transactionHex}${getTestnetQueryParam(testnet)}`,
    null as unknown as any,
    `toolbar=no, width=${width}, height=${height}, top=${top}, left=${left}`
  ) as Window;
  return prompt;
};

export const requestLogin = (
  accessLevel = '4',
  uri: string,

  testnet: boolean = false,
  { top = 0, left = 0, width = 800, height = 1000 }: WindowFeatures
): Window => {
  const prompt = window.open(
    `${uri}/log-in?accessLevelRequest=${accessLevel}&hideJumio=true${getTestnetQueryParam(
      testnet
    )}`,
    null as unknown as any,
    `toolbar=no, width=${width}, height=${height}, top=${top}, left=${left}, popup=1`
  ) as Window;
  return prompt;
};

export const requestLogout = (
  publicKey: string,
  uri: string,
  testnet: boolean = false,
  { top = 0, left = 0, width = 800, height = 1000 }: WindowFeatures
): Window => {
  const prompt = window.open(
    `${uri}/logout?publicKey=${publicKey}${getTestnetQueryParam(testnet)}`,
    null as unknown as any,
    `toolbar=no, width=${width}, height=${height}, top=${top}, left=${left}`
  ) as Window;
  return prompt;
};

export const requestDerive = (
  params: IdentityDeriveQueryParams,
  uri: string,
  testnet: boolean = false,
  { top = 0, left = 0, width = 800, height = 1000 }: WindowFeatures
) => {
  const queryParams = Object.entries(params || {})
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}=${value}`);
  const queryString =
    queryParams.length || !!testnet
      ? `?${queryParams.join('&')}${getTestnetQueryParam(
          testnet,
          !queryParams.length
        )}`
      : '';
  const prompt = window.open(
    `${uri}/derive${queryString}`,
    null as unknown as any,
    `toolbar=no, width=${width}, height=${height}, top=${top}, left=${left}`
  ) as Window;
  return prompt;
};

const getTestnetQueryParam = (testnet?: boolean, excludeAmp?: boolean) => {
  return `${testnet ? `${excludeAmp ? '' : '&'}testnet=true` : ''}`;
};
