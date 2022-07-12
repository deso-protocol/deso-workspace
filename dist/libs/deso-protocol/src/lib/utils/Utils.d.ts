import { ec as EC } from 'elliptic';
export declare const uvarint64ToBuf: (uint: number) => Buffer;
export declare const getKeyPair: ({ mnemonic, }: {
    mnemonic: string;
}) => Promise<EC.KeyPair>;
