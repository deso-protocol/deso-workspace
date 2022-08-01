import { ec as EC } from 'elliptic';
import { ec } from 'elliptic';
export declare const uint64ToBufBigEndian: (uint: number) => Buffer;
export declare const uvarint64ToBuf: (uint: number) => Buffer;
/**
 *
 * @param config determines how to generate the keypair, currently it only supports mnemonic
 * @returns  EC.keypair object
 */
export declare const generateKeyFromSource: ({ mnemonic, }: {
    mnemonic: string;
}) => EC.KeyPair;
export declare type Network = 'mainnet' | 'testnet';
/**
 * @returns publicKeyBase58Check Base58 encoded public key
 * @returns keyPair object for signing
 * Generates a new derived key
 */
export declare const generateKey: (network?: Network) => Promise<{
    publicKeyBase58Check: string;
    keyPair: ec.KeyPair;
}>;
/**
 *
 * @param transactionHex transaction representation from the construction endpoint
 * @param keyPair EC key object used to sign the transaction
 * @returns signed transaction bytes that can be submitted to the submitTransaction endpoint
 */
export declare const signMessageLocally: ({ transactionHex, keyPair, }: {
    transactionHex: string;
    keyPair: ec.KeyPair;
}) => string;
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
export declare const desoAddressToECKeyPair: (publicKey: string) => ec.KeyPair;
export declare const getMetaMaskMasterPublicKeyFromSignature: (signature: string, message: number[], network?: 'mainnet' | 'testnet') => string;
