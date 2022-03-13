"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const axios_1 = require("axios");
class Tutorial {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getTutorialCreators(request) {
        const endpoint = 'get-tutorial-creators';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async startOrSkipTutorial(request) {
        const endpoint = 'start-or-skip-tutorial';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async updateTutorialStatus(request) {
        const endpoint = 'update-tutorial-status';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Tutorial = Tutorial;
//# sourceMappingURL=Tutorial.js.map