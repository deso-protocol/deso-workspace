"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestDerive = exports.requestLogout = exports.requestLogin = exports.requestApproval = void 0;
const requestApproval = (transactionHex, uri) => {
    const prompt = window.open(`${uri}/approve?tx=${transactionHex}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestApproval = requestApproval;
const requestLogin = (accessLevel = '4', uri) => {
    const prompt = window.open(`${uri}/log-in?accessLevelRequest=${accessLevel}&hideJumio=true`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestLogin = requestLogin;
const requestLogout = (publicKey, uri) => {
    const prompt = window.open(`${uri}/logout?publicKey=${publicKey}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestLogout = requestLogout;
const requestDerive = (params, uri) => {
    const queryParams = Object.entries(params || {}).
        filter(([_, value]) => value !== null && value !== undefined).
        map(([key, value]) => `${key}=${value.toString()}`);
    const queryString = queryParams.length ? "?" + queryParams.join("&") : "";
    const prompt = window.open(`${uri}/derive${queryString}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestDerive = requestDerive;
//# sourceMappingURL=WindowPrompts.js.map