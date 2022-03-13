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
    async getAppState() {
        return (await axios_1.default.post(`${BaseUri_1.BASE_URI}/get-app-state`, {})).data;
    }
}
exports.MetaData = MetaData;
//# sourceMappingURL=MetaData.js.map