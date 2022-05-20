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
        return await this.identity
            .submitTransaction(response.TransactionHex)
            .then(() => response);
    }
    async executePost(request, endpoint) {
        return (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async DAOCoin(request) {
        // TODO: validate partial
        return this.executeTransaction(request, 'dao-coin');
    }
    async transferDAOCoin(request) {
        // TODO: validate partial
        return this.executeTransaction(request, 'transfer-dao-coin');
    }
    async createDAOCoinLimitOrder(request) {
        if (!request.BuyingDAOCoinCreatorPublicKeyBase58Check) {
            request.BuyingDAOCoinCreatorPublicKeyBase58Check = '';
        }
        if (!request.SellingDAOCoinCreatorPublicKeyBase58Check) {
            request.SellingDAOCoinCreatorPublicKeyBase58Check = '';
        }
        // TODO: validate partial
        return this.executeTransaction(request, 'create-dao-coin-limit-order');
    }
    async cancelDAOCoinLimitOrder(request) {
        // TODO: validate partial
        return this.executeTransaction(request, 'cancel-dao-coin-limit-order');
    }
    async getDAOCoinLimitOrders(request) {
        if (!request.DAOCoin2CreatorPublicKeyBase58CheckOrUsername) {
            request.DAOCoin2CreatorPublicKeyBase58CheckOrUsername = '';
        }
        if (!request.DAOCoin1CreatorPublicKeyBase58CheckOrUsername) {
            request.DAOCoin1CreatorPublicKeyBase58CheckOrUsername = '';
        }
        // TODO: validate partial
        return this.executePost(request, 'get-dao-coin-limit-orders');
    }
    getTransactorDAOCoinLimitOrders(request) {
        // TODO: validate partial
        return this.executePost(request, 'get-transactor-dao-coin-limit-orders');
    }
    createDaoCoinMarketOrder(request) {
        // TODO: validate partial
        return this.executePost(request, 'create-dao-coin-market-order');
    }
}
exports.DAO = DAO;
//# sourceMappingURL=dao.js.map