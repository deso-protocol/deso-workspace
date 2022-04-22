"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO = void 0;
const axios_1 = require("axios");
class DAO {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async executeTransaction(request, endpoint) {
        request = { ...{ MinFeeRateNanosPerKB: 1000 }, ...request };
        const response = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity.submitTransaction(response.TransactionHex).
            then(() => response);
    }
    async executePost(request, endpoint) {
        return (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async DAOCoin(request) {
        // TODO: validate partial
        return this.executeTransaction(request, "dao-coin");
    }
    async TransferDAOCoin(request) {
        // TODO: validate partial
        return this.executeTransaction(request, "transfer-dao-coin");
    }
    async CreateDAOCoinLimitOrder(request) {
        // TODO: validate partial
        return this.executeTransaction(request, "create-dao-coin-limit-order");
    }
    async CancelDAOCoinLimitOrder(request) {
        // TODO: validate partial
        return this.executeTransaction(request, "cancel-dao-coin-limit-order");
    }
    async GetDAOCoinLimitOrders(request) {
        // TODO: validate partial
        return this.executePost(request, "get-dao-coin-limit-orders");
    }
    GetTransactorDAOCoinLimitOrders(request) {
        // TODO: validate partial
        return this.executePost(request, "get-transactor-dao-coin-limit-orders");
    }
}
exports.DAO = DAO;
//# sourceMappingURL=dao.js.map