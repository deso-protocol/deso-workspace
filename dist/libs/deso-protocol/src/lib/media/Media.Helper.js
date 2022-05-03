"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageHelper = exports.selectFile = exports.uploadVideoToCloudFlare = void 0;
const axios_1 = require("axios");
const tus = require("tus-js-client");
const uploadVideoToCloudFlare = (path, file, callbackOverrides) => {
    if (!(file && file.type.startsWith('video/')))
        throw Error('invalid file or file type');
    let mediaId;
    const onResponse = new Promise((resolve, reject) => {
        const options = {
            endpoint: path,
            chunkSize: 50 * 1024 * 1024,
            uploadSize: file.size,
            onError: function (error) {
                throw new Error(error);
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                // const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            },
            onSuccess: function () {
                // Construct the url for the video based on the videoId and use the iframe url.
                if (!mediaId)
                    reject('no media id');
                const postVideoSrc = `https://iframe.videodelivery.net/${mediaId}`;
                resolve(postVideoSrc);
            },
            onAfterResponse: function (req, res) {
                const mediaIdHeader = res.getHeader('stream-media-id');
                if (!mediaId && mediaIdHeader) {
                    mediaId = mediaIdHeader;
                }
            },
        };
        if (callbackOverrides === null || callbackOverrides === void 0 ? void 0 : callbackOverrides.onAfterResponse) {
            options.onAfterResponse = callbackOverrides.onAfterResponse;
        }
        if (callbackOverrides === null || callbackOverrides === void 0 ? void 0 : callbackOverrides.onProgress) {
            options.onProgress = callbackOverrides.onProgress;
        }
        new tus.Upload(file, options).start();
    });
    return onResponse;
};
exports.uploadVideoToCloudFlare = uploadVideoToCloudFlare;
const selectFile = () => {
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
    return waitForSelection;
};
exports.selectFile = selectFile;
const uploadImageHelper = async (request, node, JWT) => {
    const endpoint = 'upload-image';
    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('UserPublicKeyBase58Check', request.UserPublicKeyBase58Check);
    formData.append('JWT', JWT);
    return await (await axios_1.default.post(`${node.getUri()}/${endpoint}`, formData)).data;
};
exports.uploadImageHelper = uploadImageHelper;
//# sourceMappingURL=Media.Helper.js.map