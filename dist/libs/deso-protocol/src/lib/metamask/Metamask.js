"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metamask = void 0;
const axios_1 = require("axios");
const bs58check = require("bs58check");
const elliptic_1 = require("elliptic");
const ethers_1 = require("ethers");
const sha256 = require("sha256");
const Metamask_helper_1 = require("./Metamask.helper");
class Metamask {
    constructor(node, identity, social, user, transactions) {
        this.BLOCK = 999999999999;
        this.getProvider = () => {
            const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
            return provider;
        };
        this.node = node;
        this.identity = identity;
        this.social = social;
        this.user = user;
        this.transactions = transactions;
    }
    async getENS(EthereumAddress) {
        const provider = this.getProvider();
        const ens = await provider.lookupAddress(EthereumAddress);
        return ens;
    }
    async populateProfile(EthereumAddress) {
        const ens = await this.getENS(EthereumAddress);
        if (ens) {
            await this.social.updateProfile({
                UpdaterPublicKeyBase58Check: EthereumAddress,
                MinFeeRateNanosPerKB: 1000,
                NewUsername: ens,
            });
        }
    }
    async getFundsForNewUsers(signature, message, publicAddress) {
        return (await axios_1.default.post(`http://localhost:3000/send-funds`, {
            signature,
            message,
            publicAddress,
        })).data;
    }
    async testAPI() {
        await axios_1.default.get('http://localhost:3000/test');
    }
    /**
     * Flow for new deso users looking to sign in with metamask
     */
    async signInWithMetamaskNewUser() {
        // generate a random derived key
        const { derivedPublicKeyBase58Check, derivedKeyPair } = await this.generateDerivedKey();
        // fetch a spending limit hex string based off of the permissions you're allowing
        const spendingLimitHexString = await this.transactions.getTransactionSpendingLimitHexString((0, Metamask_helper_1.getSpendingLimitsForMetamask)());
        //  we can now generate the message and sign it
        const { signature, message } = await this.generateMessageAndSignature(derivedKeyPair, spendingLimitHexString.HexString);
        const publicEthAddress = await this.getProvider().getSigner().getAddress();
        this.getFundsForNewUsers(signature, message, publicEthAddress);
        // once we have the signature we can fetch the public key from it
        const publicDesoAddress = await this.getMetaMaskMasterPublicKeyFromSignature(signature, message);
        // we now have all the arguments to generate an authorize derived key transaction
        const response = await this.authorizeDerivedKeyBackEndRequest(publicDesoAddress, derivedPublicKeyBase58Check, signature, spendingLimitHexString);
        // convert it to a byte array, sign it, submit it
        const submissionResponse = await this.signAndSubmitTransactionBytes(response.TransactionHex, derivedKeyPair);
        const ethereumAddress = await this.getProvider()
            .getSigner()
            .getAddress();
        return {
            derivedKeyPair,
            derivedPublicKeyBase58Check,
            ethereumAddress,
            submissionResponse,
        };
        // const ens = await this.getENS('0xC99DF6B7A5130Dce61bA98614A2457DAA8d92d1c');
    }
    /**
     * @returns derivedPublicKeyBase58Check Base58 encoded derived public key
     * @returns derivedKeyPairKey pair object that handles the public private key logic for the derived key
     * Generates a new derived key
     */
    async generateDerivedKey() {
        const e = new elliptic_1.ec('secp256k1');
        const entropy = ethers_1.ethers.utils.randomBytes(16);
        const dMnemonic = ethers_1.ethers.utils.entropyToMnemonic(entropy);
        const dKeyChain = ethers_1.ethers.utils.HDNode.fromMnemonic(dMnemonic);
        const prefix = Metamask_helper_1.PUBLIC_KEY_PREFIXES.testnet.deso;
        const derivedKeyPair = e.keyFromPrivate(dKeyChain.privateKey); // gives us the keypair
        const desoKey = derivedKeyPair.getPublic().encode('array', true);
        const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
        const derivedPublicKeyBase58Check = bs58check.encode(prefixAndKey);
        return { derivedPublicKeyBase58Check, derivedKeyPair };
    }
    /**
     *
     * @param derivedKeyPair Key pair object that handles the public private key logic
     * @param spendingLimits determines what the derived key will be able to do for the user
     * @returns message: a byte array representation of the public key, expiration block for the derived key, and spending limits
     * @returns signature: the the signed message by the derivedKeyPair object
     * generates a spending limits message and signature for authorizing a derived key
     */
    async generateMessageAndSignature(derivedKeyPair, spendingLimits) {
        const numBlocksBeforeExpiration = this.BLOCK;
        const message = [
            ...ethers_1.ethers.utils.toUtf8Bytes(derivedKeyPair.getPublic().encode('hex', true)),
            ...ethers_1.ethers.utils.toUtf8Bytes((0, Metamask_helper_1.uint64ToBufBigEndian)(numBlocksBeforeExpiration).toString('hex')),
            ...ethers_1.ethers.utils.toUtf8Bytes(spendingLimits),
        ];
        const provider = this.getProvider();
        const signature = await provider.getSigner().signMessage(message);
        return { message, signature };
    }
    /**
     *
     * @param transactionHex transaction representation from the authorized derived key construction endpoint
     * @param keyPair
     * @returns a submit transaction response
     * submits the authorize derived key transaction, if successful the derived key will now be active.
     */
    async signAndSubmitTransactionBytes(transactionHex, derivedKeyPair) {
        const transactionBytes = new Buffer(transactionHex, 'hex');
        const transactionHash = new Buffer(sha256.x2(transactionBytes), 'hex');
        const sig = derivedKeyPair.sign(transactionHash);
        const signatureBytes = new Buffer(sig.toDER());
        const signatureLength = (0, Metamask_helper_1.uvarint64ToBuf)(signatureBytes.length);
        const signedTransactionBytes = Buffer.concat([
            transactionBytes.slice(0, -1),
            signatureLength,
            signatureBytes,
        ]);
        const submissionResponse = await this.transactions.submitTransaction(signedTransactionBytes.toString('hex'));
        return submissionResponse;
    }
    /**
     *
     * @param signature a signature from the metamask account that we can extract the public key from
     * @param message the raw message that's included in the signature, needed to pull out the public key
     * @returns
     * extracts the public key from a signature and then encodes it to base58 aka a deso public key
     */
    async getMetaMaskMasterPublicKeyFromSignature(signature, message) {
        const e = new elliptic_1.ec('secp256k1');
        const arrayify = ethers_1.ethers.utils.arrayify;
        const messageHash = arrayify(ethers_1.ethers.utils.hashMessage(message));
        const publicKeyUncompressedHexWith0x = ethers_1.ethers.utils.recoverPublicKey(messageHash, signature);
        const messagingPublicKey = e.keyFromPublic(publicKeyUncompressedHexWith0x.slice(2), 'hex');
        const prefix = Metamask_helper_1.PUBLIC_KEY_PREFIXES.testnet.deso;
        const key = messagingPublicKey.getPublic().encode('array', true);
        const desoKey = Uint8Array.from([...prefix, ...key]);
        const encodedDesoKey = bs58check.encode(desoKey);
        return encodedDesoKey;
    }
    /**
     *
     * @param OwnerPublicKeyBase58Check the master public deso key
     * @param DerivedPublicKeyBase58Check the derived deso key
     * @param AccessSignature  signature including public key, block expiration, and spending limits hex
     * @param TransactionSpendingLimits spending limits object
     * @returns a constructed authorize derived key transaction that can now be signed by the derived key
     * construct a authorize derived key transaction
     */
    async authorizeDerivedKeyBackEndRequest(OwnerPublicKeyBase58Check, DerivedPublicKeyBase58Check, AccessSignature, TransactionSpendingLimits) {
        const limits = {
            OwnerPublicKeyBase58Check,
            DerivedPublicKeyBase58Check,
            DerivedKeySignature: true,
            ExpirationBlock: this.BLOCK,
            MinFeeRateNanosPerKB: 1000,
            AccessSignature: AccessSignature.slice(2),
            TransactionSpendingLimitHex: TransactionSpendingLimits.HexString,
        };
        return this.user.authorizeDerivedKeyWithoutIdentity(limits);
    }
}
exports.Metamask = Metamask;
//# sourceMappingURL=Metamask.js.map