"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaData = void 0;
const axios_1 = require("axios");
const BaseUri_1 = require("../state/BaseUri");
class MetaData {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getAppState(request) {
        return (await axios_1.default.post(`${BaseUri_1.BASE_URI}/get-app-state`, request)).data;
    }
    async getExchangeRate() {
        return (await axios_1.default.get(`${BaseUri_1.BASE_URI}/get-exchange-rate`)).data;
    }
    async healthCheck() {
        return (await axios_1.default.get(`${BaseUri_1.BASE_URI}/health-check`)).data;
    }
}
exports.MetaData = MetaData;
//# sourceMappingURL=MetaData.js.map