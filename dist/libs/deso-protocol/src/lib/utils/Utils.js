"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetaMaskMasterPublicKeyFromSignature = exports.desoAddressToECKeyPair = exports.PUBLIC_KEY_PREFIXES = exports.signMessageLocally = exports.generateKey = exports.generateKeyFromSource = exports.uvarint64ToBuf = exports.uint64ToBufBigEndian = void 0;
const bip39 = require("bip39");
const sha256 = require("sha256");
const bs58check = require("bs58check");
const elliptic_1 = require("elliptic");
const hdkey_1 = require("hdkey");
const elliptic_2 = require("elliptic");
const ethers_1 = require("ethers");
const uint64ToBufBigEndian = (uint) => {
    const result = [];
    while (BigInt(uint) >= BigInt(0xff)) {
        result.push(Number(BigInt(uint) & BigInt(0xff)));
        uint = Number(BigInt(uint) >> BigInt(8));
    }
    result.push(Number(BigInt(uint) | BigInt(0)));
    while (result.length < 8) {
        result.push(0);
    }
    return new Buffer(result.reverse());
};
exports.uint64ToBufBigEndian = uint64ToBufBigEndian;
const uvarint64ToBuf = (uint) => {
    const result = [];
    while (uint >= 0x80) {
        result.push(Number((BigInt(uint) & BigInt(0xff)) | BigInt(0x80)));
        uint = Number(BigInt(uint) >> BigInt(7));
    }
    result.push(uint | 0);
    return Buffer.from(result);
};
exports.uvarint64ToBuf = uvarint64ToBuf;
/**
 *
 * @param config determines how to generate the keypair, currently it only supports mnemonic
 * @returns  EC.keypair object
 */
const generateKeyFromSource = ({ mnemonic, }) => {
    const ec = new elliptic_1.ec('secp256k1');
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdKey = hdkey_1.default.fromMasterSeed(seed).derive("m/44'/0'/0'/0/0");
    const seedHex = hdKey.privateKey.toString('hex');
    return ec.keyFromPrivate(seedHex);
};
exports.generateKeyFromSource = generateKeyFromSource;
/**
 * @returns publicKeyBase58Check Base58 encoded public key
 * @returns keyPair object for signing
 * Generates a new derived key
 */
const generateKey = async (network = 'mainnet') => {
    const e = new elliptic_2.ec('secp256k1');
    const entropy = ethers_1.ethers.utils.randomBytes(16);
    const dMnemonic = ethers_1.ethers.utils.entropyToMnemonic(entropy);
    const dKeyChain = ethers_1.ethers.utils.HDNode.fromMnemonic(dMnemonic);
    const prefix = exports.PUBLIC_KEY_PREFIXES[network].deso;
    const keyPair = e.keyFromPrivate(dKeyChain.privateKey); // gives us the keypair
    const desoKey = keyPair.getPublic().encode('array', true);
    const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
    const publicKeyBase58Check = bs58check.encode(prefixAndKey);
    return { publicKeyBase58Check, keyPair };
};
exports.generateKey = generateKey;
/**
 *
 * @param transactionHex transaction representation from the construction endpoint
 * @param keyPair EC key object used to sign the transaction
 * @returns signed transaction bytes that can be submitted to the submitTransaction endpoint
 */
const signMessageLocally = ({ transactionHex, keyPair, }) => {
    const transactionBytes = new Buffer(transactionHex, 'hex');
    const transactionHash = new Buffer(sha256.x2(transactionBytes), 'hex');
    const sig = keyPair.sign(transactionHash);
    const signatureBytes = new Buffer(sig.toDER());
    const signatureLength = (0, exports.uvarint64ToBuf)(signatureBytes.length);
    const signedTransactionBytes = Buffer.concat([
        transactionBytes.slice(0, -1),
        signatureLength,
        signatureBytes,
    ]);
    return signedTransactionBytes.toString('hex');
};
exports.signMessageLocally = signMessageLocally;
exports.PUBLIC_KEY_PREFIXES = {
    mainnet: {
        bitcoin: [0x00],
        deso: [0xcd, 0x14, 0x0],
    },
    testnet: {
        bitcoin: [0x6f],
        deso: [0x11, 0xc2, 0x0],
    },
};
const desoAddressToECKeyPair = (publicKey) => {
    if (publicKey.length < 5) {
        throw new Error('Failed to decode public key');
    }
    const decoded = bs58check.decode(publicKey);
    const payload = Uint8Array.from(decoded).slice(3);
    const e = new elliptic_2.ec('secp256k1');
    return e.keyFromPublic(payload, 'array');
};
exports.desoAddressToECKeyPair = desoAddressToECKeyPair;
const getMetaMaskMasterPublicKeyFromSignature = (signature, message, network = 'mainnet') => {
    const e = new elliptic_2.ec('secp256k1');
    const arrayify = ethers_1.ethers.utils.arrayify;
    const messageHash = arrayify(ethers_1.ethers.utils.hashMessage(message));
    const publicKeyUncompressedHexWith0x = ethers_1.ethers.utils.recoverPublicKey(messageHash, signature);
    const messagingPublicKey = e.keyFromPublic(publicKeyUncompressedHexWith0x.slice(2), 'hex');
    const prefix = exports.PUBLIC_KEY_PREFIXES[network].deso;
    const key = messagingPublicKey.getPublic().encode('array', true);
    const desoKey = Uint8Array.from([...prefix, ...key]);
    const encodedDesoKey = bs58check.encode(desoKey);
    return encodedDesoKey;
};
exports.getMetaMaskMasterPublicKeyFromSignature = getMetaMaskMasterPublicKeyFromSignature;
//# sourceMappingURL=Utils.js.map