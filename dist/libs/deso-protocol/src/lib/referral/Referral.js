"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Referral = void 0;
const axios_1 = require("axios");
const utils_1 = require("../../utils/utils");
class Referral {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getReferralInfoForUser(request) {
        (0, utils_1.throwErrors)(['PublicKeyBase58Check'], request);
        if (!request.JWT) {
            const JWT = await this.identity.getJwt();
            request.JWT = JWT;
        }
        const endpoint = 'get-referral-info-for-user';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getReferralInfoForReferralHash(request) {
        (0, utils_1.throwErrors)(['ReferralHash'], request);
        const endpoint = 'get-referral-info-for-referral-hash';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Referral = Referral;
//# sourceMappingURL=Referral.js.map