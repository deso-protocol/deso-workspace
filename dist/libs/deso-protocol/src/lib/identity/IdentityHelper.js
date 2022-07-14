"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIframe = exports.approveSignAndSubmit = exports.callIdentityMethodAndExecute = void 0;
const Utils_1 = require("../../utils/Utils");
const WindowHandler_1 = require("./WindowHandler");
const WindowPrompts_1 = require("./WindowPrompts");
const callIdentityMethodAndExecute = async (attributeValue, method, user, transactions) => {
    var _a;
    const userParams = user
        ? {
            accessLevelHmac: user.accessLevelHmac,
            encryptedSeedHex: user.encryptedSeedHex,
            accessLevel: user.accessLevel,
        }
        : {};
    const request = {
        id: (0, Utils_1.uuid)(),
        service: 'identity',
        method: method,
        payload: {
            ...userParams,
            ...getParams(method, attributeValue),
        },
    };
    (_a = (0, exports.getIframe)().contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(request, '*');
    return (0, WindowHandler_1.iFrameHandler)({
        iFrameMethod: method,
        data: getParams(method, attributeValue),
    }, transactions);
};
exports.callIdentityMethodAndExecute = callIdentityMethodAndExecute;
const approveSignAndSubmit = (transactionHex, uri, transactions, testnet, windowFeatures) => {
    const prompt = (0, WindowPrompts_1.requestApproval)(transactionHex, uri, testnet, windowFeatures);
    return (0, WindowHandler_1.iFrameHandler)({ iFrameMethod: 'sign', data: { prompt } }, transactions);
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