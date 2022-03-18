import { AppendExtraDataRequest } from 'deso-protocol-types';
export declare const uuid: () => string;
export declare const convertToHex: (str: string) => string;
export declare const convertExtraDataToHex: (extraData: Omit<AppendExtraDataRequest, 'TransactionHex'>) => Omit<AppendExtraDataRequest, "TransactionHex">;
export declare const throwErrors: (requiredAttributes: string[], request: Partial<any>) => void;
