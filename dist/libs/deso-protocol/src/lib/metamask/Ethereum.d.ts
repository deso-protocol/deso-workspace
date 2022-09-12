import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import { Social } from '../social/Social';
import { Transactions } from '../transaction/Transaction';
import { User } from '../user/User';
import { Network } from '../utils/Utils';
import { ec } from 'elliptic';
export declare class Ethereum {
    private identity;
    private social;
    constructor(node: Node, identity: Identity, social: Social, user: User, transactions: Transactions);
    getENS(EthereumAddress: string): Promise<string | null>;
    private getProvider;
    updateProfileUserNameToEns(): Promise<void>;
    desoAddressToEthereumAddress(key: string): string;
    publicKeyPairToEthAddress: (keyPair: ec.KeyPair) => string;
    getDesoAddressFromSignature({ network, }: {
        network: Network;
    }): Promise<string>;
}
