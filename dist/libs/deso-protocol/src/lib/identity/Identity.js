"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identity = void 0;
const deso_protocol_types_1 = require("deso-protocol-types");
const utils_1 = require("../../utils/utils");
const BaseUri_1 = require("../state/BaseUri");
const IdentityHelper_1 = require("./IdentityHelper");
const WindowHandler_1 = require("./WindowHandler");
const WindowPrompts_1 = require("./WindowPrompts");
const SERVER_ERROR = 'You cannot call identity Iframe in a sever application';
class Identity {
    constructor({ host = 'browser', node, network, uri }, transactions) {
        this.identityUri = BaseUri_1.BASE_IDENTITY_URI;
        this.loggedInUser = null;
        this.loggedInKey = '';
        this.host = host;
        this.node = node;
        this.network = network || deso_protocol_types_1.DeSoNetwork.mainnet;
        this.setUri(uri !== null && uri !== void 0 ? uri : BaseUri_1.BASE_IDENTITY_URI);
        this.transactions = transactions;
    }
    getUri() {
        return this.identityUri;
    }
    setUri(uri) {
        this.identityUri = uri;
    }
    getIframe() {
        return (0, IdentityHelper_1.getIframe)();
    }
    getUser() {
        return this.loggedInUser;
    }
    setUser(user) {
        this.loggedInUser = user;
    }
    getUserKey() {
        return this.loggedInKey;
    }
    setLoggedInKey(key) {
        this.loggedInKey = key;
    }
    //  end of getters/ setters
    async initialize() {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
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
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        const prompt = (0, WindowPrompts_1.requestLogin)(accessLevel, this.getUri(), this.isTestnet());
        const { key, user } = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'login',
            data: { prompt },
        }, this.transactions);
        this.setUser(user);
        this.setLoggedInKey(key);
        return { user, key };
    }
    async logout(publicKey) {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        if (typeof publicKey !== 'string') {
            throw Error('publicKey needs to be type of string');
        }
        const prompt = (0, WindowPrompts_1.requestLogout)(publicKey, this.getUri(), this.isTestnet());
        const successful = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'logout',
            data: { prompt },
        }, this.transactions);
        this.setUser(null);
        this.setLoggedInKey('');
        return successful;
    }
    async derive(params) {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        const queryParams = {
            callback: params.callback,
            webview: params.webview,
            publicKey: params.publicKey,
            transactionSpendingLimitResponse: params.transactionSpendingLimitResponse
                ? encodeURIComponent(JSON.stringify(params.transactionSpendingLimitResponse))
                : undefined,
            derivedPublicKey: params.derivedPublicKey,
            deleteKey: params.deleteKey,
            expirationDays: params.expirationDays,
        };
        const prompt = (0, WindowPrompts_1.requestDerive)(queryParams, this.getUri(), this.isTestnet());
        const derivedPrivateUser = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'derive',
            data: { prompt },
        }, this.transactions);
        return derivedPrivateUser;
    }
    setIdentityFrame(createNewIdentityFrame = false) {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
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
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        if ((extraData === null || extraData === void 0 ? void 0 : extraData.ExtraData) && Object.keys(extraData === null || extraData === void 0 ? void 0 : extraData.ExtraData).length > 0) {
            TransactionHex = (await this.transactions.appendExtraData({
                TransactionHex: TransactionHex,
                ExtraData: (0, utils_1.convertExtraDataToHex)(extraData).ExtraData,
            })).TransactionHex;
        }
        const user = this.getUser();
        // user exists no need to approve
        if (user) {
            return (0, IdentityHelper_1.callIdentityMethodAndExecute)(TransactionHex, 'sign', this.getUser(), this.transactions);
        }
        else {
            // user does not exist  get approval
            return (0, IdentityHelper_1.approveSignAndSubmit)(TransactionHex, this.getUri(), this.transactions, this.isTestnet());
        }
    }
    async decrypt(encryptedMessages) {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        let user = this.getUser();
        if (!user) {
            await this.login();
            user = this.getUser();
        }
        return await (0, IdentityHelper_1.callIdentityMethodAndExecute)(encryptedMessages, 'decrypt', this.getUser(), this.transactions);
    }
    async encrypt(request) {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        request.RecipientPublicKeyBase58Check;
        let user = this.getUser();
        if (!user) {
            await this.login();
            user = this.getUser();
        }
        return await (0, IdentityHelper_1.callIdentityMethodAndExecute)(request, 'encrypt', this.getUser(), this.transactions);
    }
    async getJwt() {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        let user = this.getUser();
        if (!user) {
            user = (await this.login()).user;
        }
        return await (0, IdentityHelper_1.callIdentityMethodAndExecute)(undefined, 'jwt', this.getUser(), this.transactions);
    }
    isTestnet() {
        return this.network === deso_protocol_types_1.DeSoNetwork.testnet;
    }
}
exports.Identity = Identity;
//# sourceMappingURL=Identity.js.map