"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyPair = exports.uvarint64ToBuf = void 0;
const bip39 = require("bip39");
const elliptic_1 = require("elliptic");
const hdkey_1 = require("hdkey");
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
const getKeyPair = async ({ mnemonic = 'weather noble barely volume bind lemon raven cruel diamond hover siren canvas', }) => {
    const ec = new elliptic_1.ec('secp256k1');
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdKey = hdkey_1.default.fromMasterSeed(seed).derive("m/44'/0'/0'/0/0");
    const seedHex = hdKey.privateKey.toString('hex');
    return ec.keyFromPrivate(seedHex);
};
exports.getKeyPair = getKeyPair;
//# sourceMappingURL=Utils.js.map