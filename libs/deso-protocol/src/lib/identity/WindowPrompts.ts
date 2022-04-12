import { IdentityDeriveParams, IdentityDeriveQueryParams, NFTKey } from "deso-protocol-types";

export const requestApproval = (transactionHex: string, uri: string, testnet?: boolean): Window => {
  const prompt = window.open(
    `${uri}/approve?tx=${transactionHex}${getTestnetQueryParam(testnet)}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};

export const requestLogin = (accessLevel = '4', uri: string, testnet?: boolean): Window => {
  const prompt = window.open(
    `${uri}/log-in?accessLevelRequest=${accessLevel}&hideJumio=true${getTestnetQueryParam(testnet)}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};

export const requestLogout = (publicKey: string, uri: string, testnet?: boolean): Window => {
  const prompt = window.open(
    `${uri}/logout?publicKey=${publicKey}${getTestnetQueryParam(testnet)}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};

export const requestDerive = (params: IdentityDeriveQueryParams, uri: string, testnet?: boolean) => {
  const queryParams = Object.entries(params || {}).
    filter(([_, value]) => value !== null && value !== undefined).
    map(([key, value]) => `${key}=${value}`);
  const queryString = queryParams.length || !!testnet ? `?${queryParams.join("&")}${getTestnetQueryParam(testnet, !queryParams.length)}` : "";
  const prompt = window.open(
    `${uri}/derive${queryString}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
}

const getTestnetQueryParam = (testnet?: boolean, excludeAmp?: boolean) => {
  return `${!!testnet ? `${!!excludeAmp ? '' : '&'}testnet=true` : ''}`;
}