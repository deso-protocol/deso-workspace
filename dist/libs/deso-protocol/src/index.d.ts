import { Identity, IdentityConfig } from './lib/identity/Identity';
import { Media } from './lib/media/Media';
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
import { DAO } from './lib/dao/dao';
export interface DesoConfig {
    nodeUri?: string;
    identityConfig?: IdentityConfig;
}
export declare class Deso {
    constructor(config?: DesoConfig);
    node: Node;
    identity: Identity;
    private admin;
    media: Media;
    metaData: MetaData;
    miner: Miner;
    nft: Nft;
    notification: Notification;
    user: User;
    social: Social;
    dao: DAO;
    posts: Posts;
    transaction: typeof Transactions;
    wallet: Wallet;
    referral: Referral;
    reinitialize(): void;
}
export default Deso;
