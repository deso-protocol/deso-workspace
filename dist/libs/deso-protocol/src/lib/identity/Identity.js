"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identity = void 0;
const deso_protocol_types_1 = require("deso-protocol-types");
const Utils_1 = require("../../utils/Utils");
const BaseUri_1 = require("../state/BaseUri");
const IdentityHelper_1 = require("./IdentityHelper");
const WindowHandler_1 = require("./WindowHandler");
const WindowPrompts_1 = require("./WindowPrompts");
const SERVER_ERROR = 'You cannot call identity Iframe in a sever application, in the options parameter set broadcast to false';
class Identity {
    constructor({ host = 'browser', node, network, uri }, transactions) {
        this.identityUri = BaseUri_1.BASE_IDENTITY_URI;
        this.loggedInUser = null;
        this.loggedInKey = '';
        this.storageGranted = false;
        this.host = host;
        this.node = node;
        this.network = network || deso_protocol_types_1.DeSoNetwork.mainnet;
        this.transactions = transactions;
        if (this.host === 'browser') {
            const user = localStorage.getItem('deso_user');
            const key = localStorage.getItem('deso_user_key');
            if (user) {
                this.setUser(JSON.parse(user));
            }
            if (key) {
                this.setLoggedInKey(key);
            }
        }
        this.setUri(uri !== null && uri !== void 0 ? uri : BaseUri_1.BASE_IDENTITY_URI);
    }
    getUri() {
        return this.identityUri;
    }
    setUri(uri) {
        this.identityUri = uri;
        if (this.host === 'browser') {
            localStorage.setItem('deso_identity_uri', this.identityUri);
        }
    }
    getIframe() {
        return (0, IdentityHelper_1.getIframe)();
    }
    getUser() {
        return this.loggedInUser;
    }
    setUser(user, logout = false) {
        this.loggedInUser = user;
        if ((this.host === 'browser' && user) ||
            (this.host === 'browser' && logout)) {
            localStorage.setItem('deso_user', JSON.stringify(user));
        }
    }
    getUserKey() {
        return this.loggedInKey;
    }
    setLoggedInKey(key) {
        this.loggedInKey = key;
        if (this.host === 'browser') {
            localStorage.setItem('deso_user_key', key);
        }
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
                }
            };
            window.addEventListener('message', windowHandler);
            resolve(this.setIdentityFrame(true));
        });
    }
    async login(accessLevel = '4', windowFeatures, queryParams) {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        if (!this.storageGranted) {
            await this.guardFeatureSupport();
        }
        const prompt = (0, WindowPrompts_1.requestLogin)(accessLevel, this.getUri(), this.isTestnet(), windowFeatures, queryParams);
        const { key, user } = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'login',
            data: { prompt },
        }, this.transactions);
        this.setUser(user);
        this.setLoggedInKey(key);
        return { user, key };
    }
    async logout(publicKey, windowFeatures) {
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        if (typeof publicKey !== 'string') {
            throw Error('publicKey needs to be type of string');
        }
        const prompt = (0, WindowPrompts_1.requestLogout)(publicKey, this.getUri(), this.isTestnet(), windowFeatures);
        const successful = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'logout',
            data: { prompt },
        }, this.transactions);
        this.setUser(null, true);
        this.setLoggedInKey('');
        return successful;
    }
    async derive(params, windowFeatures) {
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
        const prompt = (0, WindowPrompts_1.requestDerive)(queryParams, this.getUri(), this.isTestnet(), windowFeatures);
        const derivedPrivateUser = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'derive',
            data: { prompt },
        }, this.transactions);
        return derivedPrivateUser;
    }
    async setIdentityFrame(createNewIdentityFrame = false) {
        return new Promise((resolve, reject) => {
            if (this.host === 'server')
                throw Error(SERVER_ERROR);
            let frame = document.getElementById('identity');
            if (frame && createNewIdentityFrame) {
                frame.remove();
            }
            if (!createNewIdentityFrame) {
                resolve(true);
            }
            frame = document.createElement('iframe');
            frame.setAttribute('src', `${this.getUri()}/embed?v=2`);
            frame.setAttribute('id', 'identity');
            frame.style.width = '100%';
            frame.style.height = '100vh';
            frame.style.position = 'fixed';
            frame.style.zIndex = '1000';
            frame.style.display = 'none';
            frame.style.left = '0';
            frame.style.right = '0';
            frame.style.top = '0';
            frame.addEventListener('error', reject);
            frame.addEventListener('load', () => {
                if (this.getUserKey()) {
                    resolve(this.guardFeatureSupport());
                }
                else {
                    resolve(true);
                }
            });
            const root = document.getElementsByTagName('body')[0];
            if (root && frame) {
                root.appendChild(frame);
            }
        });
    }
    async guardFeatureSupport() {
        const payload = await (0, IdentityHelper_1.callIdentityMethodAndExecute)(undefined, 'info', this.getUser(), this.transactions);
        if (!payload.hasStorageAccess || !payload.browserSupported) {
            const iframe = (0, IdentityHelper_1.getIframe)();
            iframe.style.display = 'block';
            const storageGranted = await (0, WindowHandler_1.iFrameHandler)({
                iFrameMethod: 'storageGranted',
            }, this.transactions);
            if (storageGranted) {
                this.storageGranted = true;
                iframe.style.display = 'none';
            }
        }
        return true;
    }
    async submitTransaction(TransactionHex, options = { broadcast: this.host === 'browser' }, extraData) {
        // don't submit the transaction, instead just return the api response from the
        // previous call
        if ((options === null || options === void 0 ? void 0 : options.broadcast) === false)
            return;
        // server app? then you can't call the iframe
        if (this.host === 'server')
            throw Error(SERVER_ERROR);
        if ((extraData === null || extraData === void 0 ? void 0 : extraData.ExtraData) && Object.keys(extraData === null || extraData === void 0 ? void 0 : extraData.ExtraData).length > 0) {
            TransactionHex = (await this.transactions.appendExtraData({
                TransactionHex: TransactionHex,
                ExtraData: (0, Utils_1.convertExtraDataToHex)(extraData).ExtraData,
            })).TransactionHex;
        }
        const user = this.getUser();
        // user exists no need to approve
        if (user) {
            return (0, IdentityHelper_1.callIdentityMethodAndExecute)(TransactionHex, 'sign', user, this.transactions);
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