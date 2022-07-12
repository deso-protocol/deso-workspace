"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const axios_1 = require("axios");
const Utils_1 = require("../../utils/Utils");
const Media_Helper_1 = require("./Media.Helper");
class Media {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async uploadImage(request) {
        const JWT = await this.identity.getJwt();
        if (document && !request.file) {
            const file = await (0, Media_Helper_1.selectFile)();
            if (file) {
                request.file = file;
            }
        }
        (0, Utils_1.throwErrors)(['UserPublicKeyBase58Check', 'file'], request);
        if (request.file && request.file.type.startsWith('image/')) {
            return (0, Media_Helper_1.uploadImageHelper)(request, this.node, JWT);
        }
    }
    async uploadVideo(request = {}) {
        const endpoint = 'upload-video';
        if (!(request === null || request === void 0 ? void 0 : request.file)) {
            const file = (await (0, Media_Helper_1.selectFile)());
            request.file = file;
        }
        return (0, Media_Helper_1.uploadVideoToCloudFlare)(`${this.node.getUri()}/${endpoint}`, request.file);
    }
    async getVideoStatus(request) {
        (0, Utils_1.throwErrors)(['videoId'], request);
        const endpoint = 'get-video-status';
        return await axios_1.default.get(`${this.node.getUri()}/${endpoint}/${request.videoId}`);
    }
    async getFullTikTokUrl(request) {
        const endpoint = 'get-full-tiktok-url';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Media = Media;
//# sourceMappingURL=Media.js.map