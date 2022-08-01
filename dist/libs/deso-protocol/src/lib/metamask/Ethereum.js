"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ethereum = void 0;
const ethers_1 = require("ethers");
const sha3_1 = require("sha3");
const bs58check = require("bs58check");
const Utils_1 = require("../utils/Utils");
const elliptic_1 = require("elliptic");
class Ethereum {
    constructor(node, identity, social, user, transactions) {
        this.getProvider = () => {
            const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
            return provider;
        };
        this.publicKeyPairToEthAddress = (keyPair) => {
            const uncompressedKey = Buffer.from(keyPair.getPublic(false, 'array').slice(1));
            const ethAddress = new sha3_1.Keccak(256)
                .update(uncompressedKey)
                .digest('hex')
                .slice(24);
            // EIP-55 requires a checksum. Reference implementation: https://eips.ethereum.org/EIPS/eip-55
            const checksumHash = new sha3_1.Keccak(256).update(ethAddress).digest('hex');
            let ethAddressChecksum = '0x';
            for (let i = 0; i < ethAddress.length; i++) {
                if (parseInt(checksumHash[i], 16) >= 8) {
                    ethAddressChecksum += ethAddress[i].toUpperCase();
                }
                else {
                    ethAddressChecksum += ethAddress[i];
                }
            }
            return ethAddressChecksum;
        };
        this.identity = identity;
        this.social = social;
    }
    async getENS(EthereumAddress) {
        const provider = this.getProvider();
        const checkSumAddress = ethers_1.ethers.utils.getAddress(EthereumAddress);
        const ens = await provider.lookupAddress(checkSumAddress);
        return ens;
    }
    async updateProfileUserNameToEns() {
        const desoAddress = this.identity.getUserKey();
        if (!desoAddress)
            throw Error('unable to fetch public key');
        const ethereumAddress = this.desoAddressToEthereumAddress(desoAddress);
        const ens = await this.getENS(ethereumAddress);
        if (!ens)
            throw Error('unable to locate ENS');
        await this.social.updateProfile({
            UpdaterPublicKeyBase58Check: desoAddress,
            MinFeeRateNanosPerKB: 1000,
            NewUsername: ens,
        });
    }
    desoAddressToEthereumAddress(key) {
        if (!key)
            return '';
        const pub = (0, Utils_1.desoAddressToECKeyPair)(key);
        return this.publicKeyPairToEthAddress(pub);
    }
    async getDesoAddressFromSignature({ network = 'mainnet', }) {
        const message = 'arbitrary message which is required in order to extract the deso public address';
        const provider = this.getProvider();
        provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);
        const e = new elliptic_1.ec('secp256k1');
        const arrayify = ethers_1.ethers.utils.arrayify;
        const messageHash = arrayify(ethers_1.ethers.utils.hashMessage(message));
        const publicKeyUncompressedHexWith0x = ethers_1.ethers.utils.recoverPublicKey(messageHash, signature);
        const messagingPublicKey = e.keyFromPublic(publicKeyUncompressedHexWith0x.slice(2), 'hex');
        const prefix = Utils_1.PUBLIC_KEY_PREFIXES[network].deso;
        const key = messagingPublicKey.getPublic().encode('array', true);
        const desoKey = Uint8Array.from([...prefix, ...key]);
        const encodedDesoKey = bs58check.encode(desoKey);
        return encodedDesoKey;
    }
}
exports.Ethereum = Ethereum;
//# sourceMappingURL=Ethereum.js.map