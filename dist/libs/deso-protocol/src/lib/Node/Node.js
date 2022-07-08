"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const BaseUri_1 = require("../state/BaseUri");
class Node {
    constructor(uri) {
        this.nodeURI = '';
        this.setUri(uri !== null && uri !== void 0 ? uri : BaseUri_1.BASE_URI);
    }
    getUri() {
        return this.nodeURI || BaseUri_1.BASE_URI;
    }
    setUri(uri) {
        this.nodeURI = uri;
    }
}
exports.Node = Node;
//# sourceMappingURL=Node.js.map