"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIframe = exports.approveSignAndSubmit = exports.callIdentityMethodAndExecute = void 0;
const utils_1 = require("../../utils/utils");
const WindowHandler_1 = require("./WindowHandler");
const WindowPrompts_1 = require("./WindowPrompts");
const callIdentityMethodAndExecute = (attributeValue, method) => {
    var _a;
    const user = JSON.parse(localStorage.getItem('login_user'));
    const { accessLevelHmac, encryptedSeedHex, accessLevel } = user;
    const request = {
        id: (0, utils_1.uuid)(),
        service: 'identity',
        method: method,
        payload: {
            accessLevelHmac,
            encryptedSeedHex,
            accessLevel,
            ...getParams(method, attributeValue),
        },
    };
    (_a = (0, exports.getIframe)().contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(request, '*');
    return (0, WindowHandler_1.iFrameHandler)({
        iFrameMethod: method,
        data: getParams(method, attributeValue),
    });
};
exports.callIdentityMethodAndExecute = callIdentityMethodAndExecute;
const approveSignAndSubmit = (transactionHex) => {
    const prompt = (0, WindowPrompts_1.requestApproval)(transactionHex);
    return (0, WindowHandler_1.iFrameHandler)({ iFrameMethod: 'sign', data: { prompt } });
};
exports.approveSignAndSubmit = approveSignAndSubmit;
const getIframe = () => {
    const iframe = document.getElementById('identity');
    return iframe;
};
exports.getIframe = getIframe;
const getParams = (method, attributeValue) => {
    if (method === 'sign') {
        return { transactionHex: attributeValue };
    }
    if (method === 'encrypt') {
        return {
            message: attributeValue.MessageText,
            recipientPublicKey: attributeValue.RecipientPublicKeyBase58Check,
        };
    }
    if (method === 'decrypt') {
        return { encryptedMessages: attributeValue };
    }
    return undefined;
};
//# sourceMappingURL=IdentityHelper.js.map