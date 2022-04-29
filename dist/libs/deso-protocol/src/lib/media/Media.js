"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const axios_1 = require("axios");
const utils_1 = require("../../utils/utils");
// import * as tus from 'tus-js-client';
// import { uploadVideo } from './Tus.config';
class Media {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async uploadImage(request) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const nodeRef = this.node;
        const JWT = await this.identity.getJwt();
        if (document && !request.file) {
            const input = document.createElement('input');
            input.type = 'file';
            input.click();
            const waitForSelection = new Promise((resolve, reject) => {
                input.onchange = () => {
                    input && input.files && input.files[0]
                        ? resolve(input.files[0])
                        : reject(new Error('No File selected'));
                };
            });
            return await waitForSelection.then(function (file) {
                if (file) {
                    request.file = file;
                    return uploadImageHelper(request, nodeRef, JWT);
                }
                return;
            });
        }
        else if (request.file) {
            return uploadImageHelper(request, nodeRef, JWT);
        }
        (0, utils_1.throwErrors)(['UserPublicKeyBase58Check', 'file'], request);
    }
    async uploadVideo(request) {
        // TODO
        const endpoint = '';
        // uploadVideo(`${this.node.getUri()}/${endpoint}`);
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
const uploadImageHelper = async (request, node, JWT) => {
    const endpoint = 'upload-image';
    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('UserPublicKeyBase58Check', request.UserPublicKeyBase58Check);
    formData.append('JWT', JWT);
    return await (await axios_1.default.post(`${node.getUri()}/${endpoint}`, formData)).data;
};
//# sourceMappingURL=Media.js.map