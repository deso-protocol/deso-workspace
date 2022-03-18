"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const axios_1 = require("axios");
class Transactions {
    static submitTransaction(TransactionHex) {
        const uri = localStorage.getItem('node_uri');
        return axios_1.default.post(`${uri}/submit-transaction`, { TransactionHex });
    }
    static getTransaction(TxnHashHex) {
        const uri = localStorage.getItem('node_uri');
        return axios_1.default.post(`${uri}/get-txn`, { TxnHashHex });
    }
    static async appendExtraData(request) {
        const uri = localStorage.getItem('node_uri');
        return (await axios_1.default.post(`${uri}/append-extra-data`, request)).data;
    }
    static getTransactionSpending(request) {
        const uri = localStorage.getItem('node_uri');
        return axios_1.default.post(`${uri}/get-transaction-spending`, request);
    }
}
exports.Transactions = Transactions;
//# sourceMappingURL=Transaction.js.map