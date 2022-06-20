"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uvarint64ToBuf = exports.uint64ToBufBigEndian = exports.PUBLIC_KEY_PREFIXES = exports.getSpendingLimitsForMetamask = void 0;
const deso_protocol_types_1 = require("deso-protocol-types");
/**
 *
 * @returns a spending limit object for the metamask sign in flow
 */
const getSpendingLimitsForMetamask = () => {
    return {
        GlobalDESOLimit: 1000000000,
        TransactionCountLimitMap: {
            [deso_protocol_types_1.TxnString.TxnStringSubmitPost]: 120000,
            [deso_protocol_types_1.TxnString.TxnStringUpdateProfile]: 120000,
            [deso_protocol_types_1.TxnString.TxnStringAuthorizeDerivedKey]: 120000,
        },
    };
};
exports.getSpendingLimitsForMetamask = getSpendingLimitsForMetamask;
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
        result.push((uint & 0xff) | 0x80);
        uint >>>= 7;
    }
    result.push(uint | 0);
    return new Buffer(result);
};
exports.uvarint64ToBuf = uvarint64ToBuf;
//# sourceMappingURL=Metamask.helper.js.map