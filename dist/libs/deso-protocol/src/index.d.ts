<<<<<<< HEAD
import { Admin } from './lib/admin/Admin';
import { Identity } from './lib/identity/Identity';
=======
import { Identity, IdentityConfig } from './lib/identity/Identity';
>>>>>>> c4a93f1ae659b194f72dc702d7d17f90da8c2ed5
import { MetaData } from './lib/meta-data/MetaData';
import { Miner } from './lib/miner/Miner';
import { Nft } from './lib/nft/Nft';
import { Notification } from './lib/notification/Notification';
import { Posts } from './lib/post/Posts';
import { Referral } from './lib/referral/Referral';
import { Social } from './lib/social/Social';
import { User } from './lib/user/User';
import { Node } from './lib/Node/Node';
import { Wallet } from './lib/wallet/Wallet';
import { Transactions } from './lib/transaction/Transaction';
export interface DesoConfig {
    nodeUri?: string;
    identityConfig?: IdentityConfig;
}
export declare class Deso {
    constructor(config?: DesoConfig);
    node: Node;
    identity: Identity;
    admin: Admin;
    private media;
    metaData: MetaData;
    miner: Miner;
    nft: Nft;
    notification: Notification;
    user: User;
    social: Social;
    posts: Posts;
    transaction: typeof Transactions;
    wallet: Wallet;
    referral: Referral;
    reinitialize(): void;
}
export default Deso;
