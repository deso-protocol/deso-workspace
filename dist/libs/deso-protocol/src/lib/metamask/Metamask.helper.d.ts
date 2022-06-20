/**
 *
 * @returns a spending limit object for the metamask sign in flow
 */
export declare const getSpendingLimitsForMetamask: () => any;
export declare const PUBLIC_KEY_PREFIXES: {
    mainnet: {
        bitcoin: number[];
        deso: number[];
    };
    testnet: {
        bitcoin: number[];
        deso: number[];
    };
};
export declare const uint64ToBufBigEndian: (uint: number) => Buffer;
export declare const uvarint64ToBuf: (uint: number) => Buffer;
