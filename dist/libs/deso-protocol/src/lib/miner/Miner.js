"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Miner = void 0;
const axios_1 = require("axios");
class Miner {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getBlockTemplate(request) {
        const endpoint = 'get-block-template';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async submitBlock(request) {
        const endpoint = 'submit-block';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Miner = Miner;
//# sourceMappingURL=Miner.js.map