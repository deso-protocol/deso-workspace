"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deso = void 0;
const Admin_1 = require("./lib/admin/Admin");
const dao_1 = require("./lib/dao/dao");
const Identity_1 = require("./lib/identity/Identity");
const Media_1 = require("./lib/media/Media");
const MetaData_1 = require("./lib/meta-data/MetaData");
const Metamask_1 = require("./lib/metamask/Metamask");
const Miner_1 = require("./lib/miner/Miner");
const Nft_1 = require("./lib/nft/Nft");
const Node_1 = require("./lib/Node/Node");
const Notification_1 = require("./lib/notification/Notification");
const Posts_1 = require("./lib/post/Posts");
const Referral_1 = require("./lib/referral/Referral");
const Social_1 = require("./lib/social/Social");
const Transaction_1 = require("./lib/transaction/Transaction");
const User_1 = require("./lib/user/User");
const Wallet_1 = require("./lib/wallet/Wallet");
const Utils = require("./lib/utils/Utils");
class Deso {
    constructor(config) {
        this.utils = Utils;
        this.node = new Node_1.Node(config === null || config === void 0 ? void 0 : config.nodeUri);
        this.transaction = new Transaction_1.Transactions(this.node);
        this.identity = new Identity_1.Identity({
            ...config === null || config === void 0 ? void 0 : config.identityConfig,
            ...{ node: this.node },
        }, this.transaction);
        this.admin = new Admin_1.Admin(this.node, this.identity);
        this.media = new Media_1.Media(this.node, this.identity);
        this.metaData = new MetaData_1.MetaData(this.node, this.identity);
        this.miner = new Miner_1.Miner(this.node, this.identity);
        this.nft = new Nft_1.Nft(this.node, this.identity);
        this.notification = new Notification_1.Notification(this.node, this.identity);
        this.user = new User_1.User(this.node, this.identity);
        this.social = new Social_1.Social(this.node, this.identity, this.user);
        this.dao = new dao_1.DAO(this.node, this.identity);
        this.posts = new Posts_1.Posts(this.node, this.identity);
        this.wallet = new Wallet_1.Wallet(this.node, this.identity);
        this.referral = new Referral_1.Referral(this.node, this.identity);
        this.Metamask = new Metamask_1.Metamask(this.node, this.identity, this.social, this.user, this.transaction);
        if (this.identity.host === 'browser') {
            this.identity.initialize();
        }
    }
    reinitialize() {
        this.transaction = new Transaction_1.Transactions(this.node);
        this.admin = new Admin_1.Admin(this.node, this.identity);
        this.media = new Media_1.Media(this.node, this.identity);
        this.metaData = new MetaData_1.MetaData(this.node, this.identity);
        this.miner = new Miner_1.Miner(this.node, this.identity);
        this.nft = new Nft_1.Nft(this.node, this.identity);
        this.notification = new Notification_1.Notification(this.node, this.identity);
        this.user = new User_1.User(this.node, this.identity);
        this.social = new Social_1.Social(this.node, this.identity, this.user);
        this.dao = new dao_1.DAO(this.node, this.identity);
        this.posts = new Posts_1.Posts(this.node, this.identity);
        this.wallet = new Wallet_1.Wallet(this.node, this.identity);
        this.referral = new Referral_1.Referral(this.node, this.identity);
        this.Metamask = new Metamask_1.Metamask(this.node, this.identity, this.social, this.user, this.transaction);
        if (this.identity.host === 'browser') {
            this.identity.initialize();
        }
    }
}
exports.Deso = Deso;
exports.default = Deso;
//# sourceMappingURL=index.js.map