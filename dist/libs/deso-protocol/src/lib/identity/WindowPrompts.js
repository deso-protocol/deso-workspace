"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestDerive = exports.requestLogout = exports.requestLogin = exports.requestApproval = void 0;
const requestApproval = (transactionHex, uri, testnet) => {
    const prompt = window.open(`${uri}/approve?tx=${transactionHex}${getTestnetQueryParam(testnet)}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestApproval = requestApproval;
const requestLogin = (accessLevel = '4', uri, testnet) => {
    const prompt = window.open(`${uri}/log-in?accessLevelRequest=${accessLevel}&hideJumio=true${getTestnetQueryParam(testnet)}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestLogin = requestLogin;
const requestLogout = (publicKey, uri, testnet) => {
    const prompt = window.open(`${uri}/logout?publicKey=${publicKey}${getTestnetQueryParam(testnet)}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestLogout = requestLogout;
const requestDerive = (params, uri, testnet) => {
    const queryParams = Object.entries(params || {}).
        filter(([_, value]) => value !== null && value !== undefined).
        map(([key, value]) => `${key}=${value}`);
    const queryString = queryParams.length || !!testnet ? `?${queryParams.join("&")}${getTestnetQueryParam(testnet, !queryParams.length)}` : "";
    const prompt = window.open(`${uri}/derive${queryString}`, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    return prompt;
};
exports.requestDerive = requestDerive;
const getTestnetQueryParam = (testnet, excludeAmp) => {
    return `${!!testnet ? `${!!excludeAmp ? '' : '&'}testnet=true` : ''}`;
};
//# sourceMappingURL=WindowPrompts.js.map