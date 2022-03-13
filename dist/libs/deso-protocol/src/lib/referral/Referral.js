"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Referral = void 0;
const axios_1 = require("axios");
class Referral {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getReferralInfoForUser(request) {
        const endpoint = 'get-referral-info-for-user';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getReferralInfoForReferralHash(request) {
        const endpoint = 'get-referral-info-for-referral-hash';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Referral = Referral;
//# sourceMappingURL=Referral.js.map