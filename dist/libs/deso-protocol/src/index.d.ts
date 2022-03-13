import { Admin } from './lib/admin/Admin';
import { Identity } from './lib/identity/Identity';
import { MetaData } from './lib/meta-data/MetaData';
import { Nft } from './lib/nft/Nft';
import { Notification } from './lib/notification/Notification';
import { Posts } from './lib/post/Posts';
import { Social } from './lib/social/Social';
import { User } from './lib/user/User';
import { Node } from './lib/Node/Node';
export declare class Deso {
    constructor();
    node: Node;
    identity: Identity;
    admin: Admin;
    private media;
    metaData: MetaData;
    private miner;
    nft: Nft;
    notification: Notification;
    user: User;
    social: Social;
    posts: Posts;
    private referral;
    private tutorial;
}
export default Deso;
