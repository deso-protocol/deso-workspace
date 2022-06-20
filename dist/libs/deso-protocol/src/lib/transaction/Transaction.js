"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const axios_1 = require("axios");
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
        console.log(this);
        return (await axios_1.default.post(`${this.node.getUri()}/get-transaction-spending-limit-hex-string`, {
            TransactionSpendingLimit: request,
        })).data;
    }
    async getTransactionSpendingLimitResponseFromHex(transactionSpendingLimitHex) {
        return await axios_1.default.get(`${this.node.getUri()}/get-transaction-spending-limit-response-from-hex/${transactionSpendingLimitHex}`);
    }
}
exports.Transactions = Transactions;
//# sourceMappingURL=Transaction.js.map