"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const BaseUri_1 = require("../state/BaseUri");
class Node {
    getUri() {
        return localStorage.getItem('node_uri') || BaseUri_1.BASE_URI;
    }
    setUri(uri) {
        localStorage.setItem('node_uri', uri);
    }
    constructor(uri) {
        this.setUri(uri !== null && uri !== void 0 ? uri : BaseUri_1.BASE_URI);
    }
}
exports.Node = Node;
//# sourceMappingURL=Node.js.map