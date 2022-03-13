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
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async updateNft(request) {
        const endpoint = 'update-nft';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async createNftBid(request) {
        const endpoint = 'create-nft-request';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async acceptNftBid(request) {
        const endpoint = 'create-nft-request';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async transferNft(request) {
        const endpoint = 'transfer-nft';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async acceptNftTransfer(request) {
        const endpoint = 'accept-nft-transfer';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async burnNft(request) {
        const endpoint = 'burn-nft';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Nft = Nft;
//# sourceMappingURL=Nft.js.map