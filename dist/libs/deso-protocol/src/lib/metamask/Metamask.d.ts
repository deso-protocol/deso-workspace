import { MetaMaskInitResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import { Social } from '../social/Social';
import { Transactions } from '../transaction/Transaction';
import { User } from '../user/User';
export declare class Metamask {
    private node;
    private BLOCK;
    private identity;
    private social;
    private user;
    private transactions;
    constructor(node: Node, identity: Identity, social: Social, user: User, transactions: Transactions);
    getENS(EthereumAddress: string): Promise<string | null>;
    populateProfile(EthereumAddress: string): Promise<void>;
    getFundsForNewUsers(signature: string, message: number[], publicAddress: string): Promise<any>;
    testAPI(): Promise<void>;
    /**
     * Flow for new deso users looking to sign in with metamask
     */
    signInWithMetamaskNewUser(): Promise<MetaMaskInitResponse>;
    /**
     * @returns derivedPublicKeyBase58Check Base58 encoded derived public key
     * @returns derivedKeyPairKey pair object that handles the public private key logic for the derived key
     * Generates a new derived key
     */
    private generateDerivedKey;
    /**
     *
     * @param derivedKeyPair Key pair object that handles the public private key logic
     * @param spendingLimits determines what the derived key will be able to do for the user
     * @returns message: a byte array representation of the public key, expiration block for the derived key, and spending limits
     * @returns signature: the the signed message by the derivedKeyPair object
     * generates a spending limits message and signature for authorizing a derived key
     */
    private generateMessageAndSignature;
    /**
     *
     * @param transactionHex transaction representation from the authorized derived key construction endpoint
     * @param keyPair
     * @returns a submit transaction response
     * submits the authorize derived key transaction, if successful the derived key will now be active.
     */
    private signAndSubmitTransactionBytes;
    /**
     *
     * @param signature a signature from the metamask account that we can extract the public key from
     * @param message the raw message that's included in the signature, needed to pull out the public key
     * @returns
     * extracts the public key from a signature and then encodes it to base58 aka a deso public key
     */
    getMetaMaskMasterPublicKeyFromSignature(signature: string, message: number[]): Promise<string>;
    /**
     *
     * @param OwnerPublicKeyBase58Check the master public deso key
     * @param DerivedPublicKeyBase58Check the derived deso key
     * @param AccessSignature  signature including public key, block expiration, and spending limits hex
     * @param TransactionSpendingLimits spending limits object
     * @returns a constructed authorize derived key transaction that can now be signed by the derived key
     * construct a authorize derived key transaction
     */
    private authorizeDerivedKeyBackEndRequest;
    private getProvider;
}
