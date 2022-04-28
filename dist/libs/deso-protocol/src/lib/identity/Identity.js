"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identity = void 0;
const WindowPrompts_1 = require("./WindowPrompts");
const deso_protocol_types_1 = require("deso-protocol-types");
const IdentityHelper_1 = require("./IdentityHelper");
const WindowHandler_1 = require("./WindowHandler");
const Transaction_1 = require("../transaction/Transaction");
const utils_1 = require("../../utils/utils");
const BaseUri_1 = require("../state/BaseUri");
const identityUriStorageKey = 'identity_uri';
class Identity {
    constructor(config) {
        var _a;
        this.node = config.node;
        this.network = config.network || deso_protocol_types_1.DeSoNetwork.mainnet;
        this.setUri((_a = config.uri) !== null && _a !== void 0 ? _a : BaseUri_1.BASE_IDENTITY_URI);
    }
    getUri() {
        return localStorage.getItem(identityUriStorageKey) || BaseUri_1.BASE_IDENTITY_URI;
    }
    setUri(uri) {
        localStorage.setItem(identityUriStorageKey, uri);
    }
    getIframe() {
        return (0, IdentityHelper_1.getIframe)();
    }
    getUser() {
        const user = localStorage.getItem('login_user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }
    getUserKey() {
        const key = localStorage.getItem('login_key');
        if (key) {
            return key;
        }
        return null;
    }
    async initialize() {
        if (this.getIframe()) {
            return;
        }
        return new Promise((resolve) => {
            const windowHandler = (event) => {
                if (event.origin !== this.getUri()) {
                    return;
                }
                if (event.data.method === 'initialize') {
                    event.source.postMessage({
                        id: event.data.id,
                        service: 'identity',
                        payload: {},
                    }, this.getUri());
                    resolve(event.data);
                }
            };
            window.addEventListener('message', windowHandler);
            this.setIdentityFrame(true);
        });
    }
    async login(accessLevel = '4') {
        const prompt = (0, WindowPrompts_1.requestLogin)(accessLevel, this.getUri(), this.isTestnet());
        const { key, user } = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'login',
            data: { prompt },
        });
        localStorage.setItem('login_user', user);
        localStorage.setItem('login_key', key);
        return { user: JSON.parse(user), key };
    }
    async logout(publicKey) {
        if (typeof publicKey !== 'string') {
            throw Error('publicKey needs to be type of string');
        }
        const prompt = (0, WindowPrompts_1.requestLogout)(publicKey, this.getUri(), this.isTestnet());
        const successful = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'logout',
            data: { prompt },
        });
        return successful;
    }
    async derive(params) {
        const queryParams = {
            callback: params.callback,
            webview: params.webview,
            publicKey: params.publicKey,
            transactionSpendingLimitResponse: params.transactionSpendingLimitResponse ? encodeURIComponent(JSON.stringify(params.transactionSpendingLimitResponse)) : undefined,
            derivedPublicKey: params.derivedPublicKey,
        };
        const prompt = (0, WindowPrompts_1.requestDerive)(queryParams, this.getUri(), this.isTestnet());
        const derivedPrivateUser = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'derive',
            data: { prompt },
        });
        return derivedPrivateUser;
    }
    setIdentityFrame(createNewIdentityFrame = false) {
        let frame = document.getElementById('identity');
        if (frame && createNewIdentityFrame) {
            frame.remove();
        }
        if (!createNewIdentityFrame) {
            return;
        }
        frame = document.createElement('iframe');
        frame.setAttribute('src', `${this.getUri()}/embed?v=2`);
        frame.setAttribute('id', 'identity');
        frame.style.width = '100vh';
        frame.style.height = '100vh';
        frame.style.position = 'fixed';
        frame.style.zIndex = '1000';
        frame.style.display = 'none';
        frame.style.left = '0';
        frame.style.top = '0';
        const root = document.getElementsByTagName('body')[0];
        if (root) {
            root.appendChild(frame);
        }
    }
    async submitTransaction(TransactionHex, extraData) {
        if ((extraData === null || extraData === void 0 ? void 0 : extraData.ExtraData) && Object.keys(extraData === null || extraData === void 0 ? void 0 : extraData.ExtraData).length > 0) {
            TransactionHex = (await Transaction_1.Transactions.appendExtraData({
                TransactionHex: TransactionHex,
                ExtraData: (0, utils_1.convertExtraDataToHex)(extraData).ExtraData,
            })).TransactionHex;
        }
        const user = this.getUser();
        // user exists no need to approve
        if (user) {
            return (0, IdentityHelper_1.callIdentityMethodAndExecute)(TransactionHex, 'sign');
        }
        else {
            // user does not exist  get approval
            return (0, IdentityHelper_1.approveSignAndSubmit)(TransactionHex, this.getUri(), this.isTestnet());
        }
    }
    async decrypt(encryptedMessages) {
        let user = this.getUser();
        if (!user) {
            await this.login();
            user = this.getUser();
        }
        return await (0, IdentityHelper_1.callIdentityMethodAndExecute)(encryptedMessages, 'decrypt');
    }
    async encrypt(request) {
        request.RecipientPublicKeyBase58Check;
        let user = this.getUser();
        if (!user) {
            await this.login();
            user = this.getUser();
        }
        return await (0, IdentityHelper_1.callIdentityMethodAndExecute)(request, 'encrypt');
    }
    async getJwt() {
        let user = this.getUser();
        if (!user) {
            user = (await this.login()).user;
        }
        return await (0, IdentityHelper_1.callIdentityMethodAndExecute)(undefined, 'jwt');
    }
    isTestnet() {
        return this.network === deso_protocol_types_1.DeSoNetwork.testnet;
    }
}
exports.Identity = Identity;
//# sourceMappingURL=Identity.js.map