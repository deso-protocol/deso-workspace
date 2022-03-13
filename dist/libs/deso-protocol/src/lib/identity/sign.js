"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitTransaction = void 0;
const axios_1 = require("axios");
const submitTransaction = (TransactionHex) => {
    const uri = localStorage.getItem('node_uri');
    return axios_1.default.post(`${uri}/submit-transaction`, { TransactionHex });
};
exports.submitTransaction = submitTransaction;
//# sourceMappingURL=sign.js.map