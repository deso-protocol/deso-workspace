"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identity = void 0;
const WindowPrompts_1 = require("./WindowPrompts");
const IdentityHelper_1 = require("./IdentityHelper");
const WindowHandler_1 = require("./WindowHandler");
class Identity {
    constructor(node) {
        this.node = node;
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
                if (event.origin !== 'https://identity.deso.org') {
                    return;
                }
                if (event.data.method === 'initialize') {
                    event.source.postMessage({
                        id: event.data.id,
                        service: 'identity',
                        payload: {},
                    }, 'https://identity.deso.org');
                    resolve(event.data);
                }
            };
            window.addEventListener('message', windowHandler);
            this.setIdentityFrame(true);
        });
    }
    async login(accessLevel = '4') {
        const prompt = (0, WindowPrompts_1.requestLogin)(accessLevel);
        const { key, user } = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'login',
            data: { prompt },
        });
        localStorage.setItem('login_user', user);
        localStorage.setItem('login_key', key);
        return { user: JSON.parse(user), key };
    }
    async logout(publicKey) {
        const prompt = (0, WindowPrompts_1.requestLogout)(publicKey);
        const successful = await (0, WindowHandler_1.iFrameHandler)({
            iFrameMethod: 'logout',
            data: { prompt },
        });
        return successful;
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
        frame.setAttribute('src', 'https://identity.deso.org/embed?v=2');
        frame.setAttribute('id', 'identity');
        frame.style.width = '100vh';
        frame.style.height = '100vh';
        frame.style.position = 'fixed';
        frame.style.zIndex = '1000';
        frame.style.display = 'none';
        frame.style.left = '0';
        frame.style.right = '0';
        const root = document.getElementsByTagName('body')[0];
        if (root) {
            root.appendChild(frame);
        }
    }
    async submitTransaction(TransactionHex) {
        const user = this.getUser();
        // user exists no need to approve
        if (user) {
            return (0, IdentityHelper_1.callIdentityMethodAndExecute)(TransactionHex, 'sign');
        }
        else {
            // user does not exist  get approval
            return (0, IdentityHelper_1.approveSignAndSubmit)(TransactionHex);
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
}
exports.Identity = Identity;
//# sourceMappingURL=Identity.js.map