import { IdentityDeriveParams, IdentityDeriveQueryParams, NFTKey } from "deso-protocol-types";

export const requestApproval = (transactionHex: string, uri: string): Window => {
  const prompt = window.open(
    `${uri}/approve?tx=${transactionHex}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};

export const requestLogin = (accessLevel = '4', uri: string): Window => {
  const prompt = window.open(
    `${uri}/log-in?accessLevelRequest=${accessLevel}&hideJumio=true`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};

export const requestLogout = (publicKey: string, uri: string): Window => {
  const prompt = window.open(
    `${uri}/logout?publicKey=${publicKey}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
};

export const requestDerive = (params: IdentityDeriveQueryParams, uri: string) => {
  const queryParams = Object.entries(params || {}).
    filter(([_, value]) => value !== null && value !== undefined).
    map(([key, value]) => `${key}=${value}`);
  const queryString = queryParams.length ? "?"+queryParams.join("&") : "";
  const prompt = window.open(
    `${uri}/derive${queryString}`,
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  ) as Window;
  return prompt;
}