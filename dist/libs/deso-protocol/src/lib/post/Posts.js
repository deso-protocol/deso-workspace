"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const axios_1 = require("axios");
const Utils_1 = require("../../utils/Utils");
class Posts {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getPostsForPublicKey(request) {
        return (await axios_1.default.post(`${this.node.getUri()}/get-posts-for-public-key`, request)).data;
    }
    async submitPost(request, options, extraData) {
        if (!request.UpdaterPublicKeyBase58Check) {
            throw Error('UpdaterPublicKeyBase58Check is required');
        }
        if (!request.BodyObj) {
            throw Error('BodyObj is required');
        }
        if (!request.MinFeeRateNanosPerKB) {
            request.MinFeeRateNanosPerKB = 1500;
        }
        const constructedTransactionResponse = (await axios_1.default.post(`${this.node.getUri()}/submit-post`, request)).data;
        return await this.identity
            .submitTransaction(constructedTransactionResponse.TransactionHex, options, extraData)
            .then((submittedTransactionResponse) => {
            return {
                constructedTransactionResponse,
                submittedTransactionResponse,
            };
        })
            .catch((e) => {
            throw Error(`something went wrong while signing ${e.message}`);
        });
    }
    async getPostsStateless(request) {
        const endpoint = 'get-posts-stateless';
        return await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async getSinglePost(request) {
        (0, Utils_1.throwErrors)(['PostHashHex'], request);
        const endpoint = 'get-single-post';
        return await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async getHotFeed(request) {
        const endpoint = 'get-hot-feed';
        return await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async getDiamondedPosts(request) {
        const endpoint = 'get-diamonded-posts';
        return await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async getLikesForPost(request) {
        const endpoint = 'get-likes-for-post';
        return await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async getDiamondsForPost(request) {
        const endpoint = 'get-diamonds-for-post';
        return await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async getRepostsForPost(request) {
        const endpoint = 'get-reposts-for-post';
        return await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
    async getQuoteRepostsForPost(request) {
        const endpoint = 'get-quote-reposts-for-post';
        return await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
    }
}
exports.Posts = Posts;
//# sourceMappingURL=Posts.js.map