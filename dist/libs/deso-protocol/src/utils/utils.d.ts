import { AppendExtraDataRequest } from 'deso-protocol-types';
export declare const uuid: () => string;
export declare const convertToHex: (str: string) => string;
export declare const convertExtraDataToHex: (extraData: Omit<AppendExtraDataRequest, 'TransactionHex'>) => Omit<AppendExtraDataRequest, "TransactionHex">;
export declare const throwErrors: <G, K extends keyof G>(requiredAttributes: K[], request: G) => void;
export declare const assignDefaults: <G, K extends keyof G>(attributesWithDefaults: AssignDefaultsInterface<G, K>[], request: G) => G;
export interface AssignDefaultsInterface<G, K extends keyof G> {
    name: K;
    default: G[K];
}
