"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const encrypt = () => {
    const iframe = document.getElementById('identity');
    if (iframe === null) {
        throw Error('Iframe with id identity does not exist');
    }
    //   iframe.contentWindow?.postMessage(request, "*");
    return new Promise((resolve, reject) => {
        const windowHandler = (event) => {
            var _a, _b, _c, _d;
            if (!((_b = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.encryptedMessage)) {
                return;
            }
            resolve((_d = (_c = event === null || event === void 0 ? void 0 : event.data) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.encryptedMessage);
        };
    });
    // event?.data?.payload?.encryptedMessage
};
exports.encrypt = encrypt;
//# sourceMappingURL=encrypt.js.map