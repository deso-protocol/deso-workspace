"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deso = void 0;
const Admin_1 = require("./lib/admin/Admin");
const Identity_1 = require("./lib/identity/Identity");
const Media_1 = require("./lib/media/Media");
const MetaData_1 = require("./lib/meta-data/MetaData");
const Miner_1 = require("./lib/miner/Miner");
const Nft_1 = require("./lib/nft/Nft");
const Notification_1 = require("./lib/notification/Notification");
const Posts_1 = require("./lib/post/Posts");
const Referral_1 = require("./lib/referral/Referral");
const Social_1 = require("./lib/social/Social");
const User_1 = require("./lib/user/User");
const Node_1 = require("./lib/node/Node");
const Tutorial_1 = require("./lib/tutorial/Tutorial");
const Wallet_1 = require("./lib/wallet/Wallet");
const Transaction_1 = require("./lib/transaction/Transaction");
class Deso {
    constructor() {
        this.node = new Node_1.Node();
        this.identity = new Identity_1.Identity(this.node);
        this.admin = new Admin_1.Admin(this.node, this.identity);
        this.media = new Media_1.Media(this.node, this.identity);
        this.metaData = new MetaData_1.MetaData(this.node, this.identity);
        this.miner = new Miner_1.Miner(this.node, this.identity);
        this.nft = new Nft_1.Nft(this.node, this.identity);
        this.notification = new Notification_1.Notification(this.node, this.identity);
        this.user = new User_1.User(this.node, this.identity);
        this.social = new Social_1.Social(this.node, this.identity, this.user);
        this.posts = new Posts_1.Posts(this.node, this.identity);
        this.transaction = Transaction_1.Transactions;
        this.wallet = new Wallet_1.Wallet(this.node, this.identity);
        this.referral = new Referral_1.Referral(this.node, this.identity);
        this.tutorial = new Tutorial_1.Tutorial(this.node, this.identity);
        this.identity.initialize();
    }
}
exports.Deso = Deso;
exports.default = Deso;
//# sourceMappingURL=index.js.map