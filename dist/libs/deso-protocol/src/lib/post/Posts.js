"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const axios_1 = require("axios");
const utils_1 = require("../../utils/utils");
class Posts {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getPostsForPublicKey(ReaderPublicKeyBase58Check, Username) {
        const request = {
            PublicKeyBase58Check: '',
            Username,
            ReaderPublicKeyBase58Check,
            NumToFetch: 10,
        };
        return (await axios_1.default.post(`${this.node.getUri()}/get-posts-for-public-key`, request)).data;
    }
    async submitPost(request) {
        var _a;
        if (!request.UpdaterPublicKeyBase58Check) {
            throw Error('UpdaterPublicKeyBase58Check is required');
        }
        if (!((_a = request.BodyObj) === null || _a === void 0 ? void 0 : _a.Body)) {
            throw Error('BodyObj.Body is required');
        }
        if (!request.MinFeeRateNanosPerKB) {
            request.MinFeeRateNanosPerKB = 1000;
        }
        const apiResponse = (await axios_1.default.post(`${this.node.getUri()}/submit-post`, request)).data;
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async getPostsStateless(request) {
        const endpoint = 'get-posts-stateless';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getSinglePost(request) {
        (0, utils_1.throwErrors)(['PostHashHex'], request);
        const endpoint = 'get-single-post';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getHotFeed(request) {
        const endpoint = 'get-hot-feed';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getDiamondedPosts(request) {
        const endpoint = 'get-diamonded-posts';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getLikesForPost(request) {
        const endpoint = 'get-likes-for-post';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getDiamondsForPost(request) {
        const endpoint = 'get-diamonds-for-post';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getRepostsForPost(request) {
        const endpoint = 'get-reposts-for-post';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getQuoteRepostsForPost(request) {
        const endpoint = 'get-quote-reposts-for-post';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Posts = Posts;
//# sourceMappingURL=Posts.js.map