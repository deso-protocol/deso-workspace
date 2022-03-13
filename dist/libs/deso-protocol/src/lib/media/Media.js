"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const axios_1 = require("axios");
class Media {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async uploadImage(request) {
        const endpoint = 'upload-image';
        const formData = new FormData();
        formData.append('file', request.file);
        formData.append('UserPublicKeyBase58Check', request.UserPublicKeyBase58Check);
        formData.append('JWT', request.JWT);
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async uploadVideo(request) {
        const endpoint = 'get-nfts-for-user';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getVideoStatus(request) {
        const endpoint = 'get-video-status';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getFullTikTokUrl(request) {
        const endpoint = 'get-full-tik-tok-url';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Media = Media;
//# sourceMappingURL=Media.js.map