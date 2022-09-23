import {
  TransactionSpendingLimit,
  MessagingGroupOperation,
} from 'deso-protocol-types';

export interface IdentityQueryParams {
  publicKey?: string;
  tx?: string;
  referralCode?: string;
  public_key?: string;
  hideJumio?: boolean;
  accessLevelRequest?: number;
  transactionSpendingLimitResponse?: TransactionSpendingLimit;
  operation?: MessagingGroupOperation;
  applicationMessagingPublicKeyBase58Check?: string;
  updatedGroupOwnerPublicKeyBase58Check?: string;
  updatedGroupKeyName?: string;
  updatedMembersPublicKeysBase58Check?: string[];
  updatedMembersKeyNames?: string[];
}

export interface WindowFeatures {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

export interface OpenWindowConfigInterface {
  windowFeatures: WindowFeatures;
  queryParams: IdentityQueryParams;
  additionalQueryParams: AdditionalQueryParams; // add any random query param
}

export interface AdditionalQueryParams {
  [key: string]: string | boolean;
  // accessLevelRequest: '1' | '2' | '3' | '4';
  testnet: boolean;
}

export enum Endpoint {
  login = 'log-in',
  logout = 'logout',
  getFreeDeso = 'get-free-deso',
  approve = 'approve',
  messagingGroup = 'messaging-group',
  verifyPhoneNumber = 'verify-phone-number',
}

const DEFAULT_WINDOW_FEATURES: Readonly<WindowFeatures> = {
  top: 0,
  left: 0,
  width: 800,
  height: 1000,
};

// export const requestApproval = (
//   transactionHex: string,
//   uri: string,
//   testnet = false,
//   { top = 0, left = 0, width = 800, height = 1000 }: WindowFeatures = {
//     top: 0,
//     left: 0,
//     width: 800,
//     height: 1000,
//   }
// ): Window => {
//   const prompt = window.open(
//     `${uri}/approve?tx=${transactionHex}${getTestnetQueryParam(testnet)}`,
//     null as unknown as any,
//     `toolbar=no, width=${width}, height=${height}, top=${top}, left=${left}`
//   ) as Window;
//   return prompt;
// };

export const requestWindow = (request: {
  uri: string;
  windowFeatures?: WindowFeatures;
  queryParams?: { [key: string]: string | boolean };
}): Window => {
  //
  const defaultQueryParams: AdditionalQueryParams = {
    testnet: false,
  };

  const config = {
    additionalQueryParams: { ...defaultQueryParams, ...request.queryParams },
    windowFeatures: { ...DEFAULT_WINDOW_FEATURES, ...request.windowFeatures },
    uri: request.uri,
  };

  let queryString = '';
  if (config.additionalQueryParams) {
    queryString = Object.entries(config.additionalQueryParams)
      .map(([k, v], i) => {
        return `${i !== 0 ? '&' : ''}${k}=${v}`;
      })
      .join('');
  }

  const prompt = window.open(
    `${config.uri}?${queryString}`,
    null as unknown as any,
    `toolbar=no, width=${config.windowFeatures.width}, height=${config.windowFeatures.height}, top=${config.windowFeatures.top}, left=${config.windowFeatures.left}, popup=1`
  ) as Window;
  return prompt;
};

// export const requestLogout = (
//   publicKey: string,
//   uri: string,
//   testnet = false,
//   { top = 0, left = 0, width = 800, height = 1000 }: WindowFeatures = {
//     top: 0,
//     left: 0,
//     width: 800,
//     height: 1000,
//   }
// ): Window => {
// const prompt = window.open(
//   `${uri}/logout?publicKey=${publicKey}${getTestnetQueryParam(testnet)}`,
//   null as unknown as any,
//   `toolbar=no, width=${width}, height=${height}, top=${top}, left=${left}`
// ) as Window;
// return prompt;
// };

// export const requestDerive = (
//   params: IdentityDeriveQueryParams,
//   uri: string,
//   testnet = false,
//   { top = 0, left = 0, width = 800, height = 1000 }: WindowFeatures = {
//     top: 0,
//     left: 0,
//     width: 800,
//     height: 1000,
//   }
// ) => {
// const queryParams = Object.entries(params || {})
//   .filter(([_, value]) => value !== null && value !== undefined)
//   .map(([key, value]) => `${key}=${value}`);
// const queryString =
//   queryParams.length || !!testnet
//     ? `?${queryParams.join('&')}${getTestnetQueryParam(
//         testnet,
//         !queryParams.length
//       )}`
//     : '';
// const prompt = window.open(
//   `${uri}/derive${queryString}`,
//   null as unknown as any,
//   `toolbar=no, width=${width}, height=${height}, top=${top}, left=${left}`
// ) as Window;
// return prompt;
// };

// export const requestPhoneVerification = (
//   accessLevel = '4',
//   uri: string,
//   testnet = false,
//   { top = 0, left = 0, width = 800, height = 1000 }: WindowFeatures = {
//     top: 0,
//     left: 0,
//     width: 800,
//     height: 1000,
//   },
//   queryParams?: { [key: string]: string | boolean }
// ): Window => {
//   let queryString = '';
//   if (queryParams) {
//     queryString = Object.keys(queryParams)
//       .map((param, i) => {
//         return `&${param}=${queryParams[param]}`;
//       })
//       .join('');
//   }
//   const prompt = window.open(
//     `${uri}/get-deso?accessLevelRequest=${accessLevel}&hideJumio=true${queryString}${getTestnetQueryParam(
//       testnet
//     )}`,
//     null as unknown as any,
//     `toolbar=no, width=${width}, height=${height}, top=${top}, left=${left}, popup=1`
//   ) as Window;
//   return prompt;
// };
