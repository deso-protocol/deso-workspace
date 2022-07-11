"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = exports.Transactions = void 0;
const axios_1 = require("axios");
const sha256 = require("sha256");
const utils_1 = require("../utils/utils");
class Transactions {
    constructor(node) {
        this.node = node;
    }
    async submitTransaction(TransactionHex) {
        return (await axios_1.default.post(`${this.node.getUri()}/submit-transaction`, {
            TransactionHex,
        })).data;
    }
    async getTransaction(TxnHashHex) {
        return (await axios_1.default.post(`${this.node.getUri()}/get-txn`, { TxnHashHex }))
            .data;
    }
    async appendExtraData(request) {
        return (await axios_1.default.post(`${this.node.getUri()}/append-extra-data`, request)).data;
    }
    async getTransactionSpending(request) {
        return (await axios_1.default.post(`${this.node.getUri()}/get-transaction-spending`, request)).data;
    }
    async getTransactionSpendingLimitHexString(request) {
        return (await axios_1.default.post(`${this.node.getUri()}/get-transaction-spending-limit-hex-string`, {
            TransactionSpendingLimit: request,
        })).data;
    }
    async getTransactionSpendingLimitResponseFromHex(transactionSpendingLimitHex) {
        return await axios_1.default.get(`${this.node.getUri()}/get-transaction-spending-limit-response-from-hex/${transactionSpendingLimitHex}`);
    }
    async signWithLocalKey() { }
}
exports.Transactions = Transactions;
<<<<<<< HEAD
// export const signTransaction = async (
//   transactionHex: string
// ): Promise<string> => {
//   const privateKey = await getKeyPair({
//     mnemonic:
//       'weather noble barely volume bind lemon raven cruel diamond hover siren canvas',
//   });
//   const transactionBytes = Buffer.from(transactionHex, 'hex');
//   const transactionHash = Buffer.from(
//     sha256.x2(transactionBytes) as string,
//     'hex'
//   );
//   const signature = privateKey.sign(transactionHash, { canonical: true });
//   const signatureBytes = Buffer.from(signature.toDER());
//   const signatureLength = uvarint64ToBuf(signatureBytes.length);
//   // If transaction is signed with a derived key, use DeSo-DER recoverable signature encoding.
//   const signedTransactionBytes = Buffer.concat([
//     transactionBytes.slice(0, -1),
//     signatureLength,
//     signatureBytes,
//   ]);
//   return signedTransactionBytes.toString('hex');
// };
=======
const signTransaction = async (transactionHex) => {
    const privateKey = await (0, utils_1.getKeyPair)({
        mnemonic: 'weather noble barely volume bind lemon raven cruel diamond hover siren canvas',
    });
    const transactionBytes = Buffer.from(transactionHex, 'hex');
    const transactionHash = Buffer.from(sha256.x2(transactionBytes), 'hex');
    const signature = privateKey.sign(transactionHash, { canonical: true });
    const signatureBytes = Buffer.from(signature.toDER());
    const signatureLength = (0, utils_1.uvarint64ToBuf)(signatureBytes.length);
    // If transaction is signed with a derived key, use DeSo-DER recoverable signature encoding.
    const signedTransactionBytes = Buffer.concat([
        transactionBytes.slice(0, -1),
        signatureLength,
        signatureBytes,
    ]);
    return signedTransactionBytes.toString('hex');
};
exports.signTransaction = signTransaction;
>>>>>>> Guard browser storage access with tap to unlock wallet
//# sourceMappingURL=Transaction.js.map