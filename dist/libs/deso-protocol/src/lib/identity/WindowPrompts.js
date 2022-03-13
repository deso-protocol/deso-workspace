"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogout = exports.requestLogin = exports.requestApproval = void 0;
const requestApproval = (transactionHex) => {
    const prompt = window.open(`https://identity.deso.org/approve?tx=${transactionHex}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestApproval = requestApproval;
const requestLogin = (accessLevel = '4') => {
    const prompt = window.open(`https://identity.deso.org/log-in?accessLevelRequest=${accessLevel}&hideJumio=true`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestLogin = requestLogin;
const requestLogout = (publicKey) => {
    const prompt = window.open(`https://identity.deso.org/logout?publicKey=${publicKey}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestLogout = requestLogout;
//# sourceMappingURL=WindowPrompts.js.map