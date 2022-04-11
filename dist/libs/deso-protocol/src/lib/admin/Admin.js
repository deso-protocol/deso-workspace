"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const axios_1 = require("axios");
class Admin {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async nodeControl(request) {
        const endpoint = 'node-control';
        const JWT = await this.identity.getJwt();
        request = { ...request, JWT };
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getMemPoolStats() {
        const endpoint = 'get-mempool-stats';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, {});
    }
    async getGlobalParams(request) {
        const endpoint = 'get-global-params';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async updateGlobalParams(request) {
        const endpoint = 'update-global-params';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async swapIdentity(request) {
        const endpoint = 'swap-identity';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async updateUserGlobalMetadata(request) {
        const endpoint = 'update-user-global-metadata';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getUserGlobalMetadata(request) {
        const endpoint = 'get-user-global-metadata';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getAllUserGlobalMetadata(request) {
        const endpoint = 'get-all-user-global-metadata';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async grantVerificationBadgeRequest(request) {
        const endpoint = 'grant-verification-badge';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async removeVerificationBadge(request) {
        const endpoint = 'remove-verification-badge';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getVerifiedUsers() {
        const endpoint = 'get-verified-users';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, {});
    }
    async getUsernameVerificationAuditLogs(request) {
        const endpoint = 'get-username-verification-audit-logs';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async updateGlobalFeed(request) {
        const endpoint = 'update-global-feed';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async pinPost(request) {
        const endpoint = 'pin-post';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async removeNilPosts(request) {
        const endpoint = 'remove-nil-posts';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Admin = Admin;
//# sourceMappingURL=Admin.js.map