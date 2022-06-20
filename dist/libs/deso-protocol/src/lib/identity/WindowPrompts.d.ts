import { IdentityDeriveQueryParams } from 'deso-protocol-types';
export declare const requestApproval: (transactionHex: string, uri: string, testnet?: boolean | undefined) => Window;
export declare const requestLogin: (accessLevel: string | undefined, uri: string, testnet?: boolean | undefined) => Window;
export declare const requestLogout: (publicKey: string, uri: string, testnet?: boolean | undefined) => Window;
export declare const requestDerive: (params: IdentityDeriveQueryParams, uri: string, testnet?: boolean | undefined) => Window;
