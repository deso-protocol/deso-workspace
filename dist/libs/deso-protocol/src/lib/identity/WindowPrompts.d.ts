import { IdentityDeriveQueryParams } from 'deso-protocol-types';
export interface WindowFeatures {
    top: number;
    left: number;
    width: number;
    height: number;
}
export declare const requestApproval: (transactionHex: string, uri: string, testnet?: boolean, { top, left, width, height }?: WindowFeatures) => Window;
export declare const requestLogin: (accessLevel: string | undefined, uri: string, testnet?: boolean, { top, left, width, height }?: WindowFeatures, queryParams?: {
    [key: string]: string;
} | undefined) => Window;
export declare const requestLogout: (publicKey: string, uri: string, testnet?: boolean, { top, left, width, height }?: WindowFeatures) => Window;
export declare const requestDerive: (params: IdentityDeriveQueryParams, uri: string, testnet?: boolean, { top, left, width, height }?: WindowFeatures) => Window;
