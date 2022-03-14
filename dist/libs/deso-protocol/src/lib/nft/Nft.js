"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nft = void 0;
const axios_1 = require("axios");
class Nft {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getNftsForUser(request) {
        const endpoint = 'get-nfts-for-user';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getNftBidsForUser(request) {
        const endpoint = 'get-nft-bids-for-user';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getNftBidsForNftPost(request) {
        const endpoint = 'get-nft-bids-for-nft-post';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getNftShowcase(request) {
        const endpoint = 'get-nft-showcase';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getNextNftShowCase(request) {
        const endpoint = 'get-next-nft-showcase';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getNftCollectionSummary(request) {
        const endpoint = 'get-nft-collection-summary';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getNftEntriesForPostHash(request) {
        const endpoint = 'get-nft-entries-for-nft-post';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async createNft(request) {
        const endpoint = 'create-nft';
        const apiResponse = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async updateNft(request) {
        const endpoint = 'update-nft';
        const apiResponse = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async createNftBid(request) {
        const endpoint = 'create-nft-bid';
        const apiResponse = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async acceptNftBid(request) {
        const endpoint = 'accept-nft-bid';
        const apiResponse = await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async transferNft(request) {
        const endpoint = 'transfer-nft';
        const apiResponse = await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async acceptNftTransfer(request) {
        const endpoint = 'accept-nft-transfer';
        const apiResponse = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async burnNft(request) {
        const endpoint = 'burn-nft';
        const apiResponse = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
}
exports.Nft = Nft;
//# sourceMappingURL=Nft.js.map