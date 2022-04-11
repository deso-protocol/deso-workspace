import { IdentityDeriveQueryParams } from "deso-protocol-types";
export declare const requestApproval: (transactionHex: string, uri: string) => Window;
export declare const requestLogin: (accessLevel: string | undefined, uri: string) => Window;
export declare const requestLogout: (publicKey: string, uri: string) => Window;
export declare const requestDerive: (params: IdentityDeriveQueryParams, uri: string) => Window;
