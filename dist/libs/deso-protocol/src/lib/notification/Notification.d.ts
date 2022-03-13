import { GetNotificationsCountRequest, GetNotificationsCountResponse, GetNotificationsRequest, GetNotificationsResponse, SetNotificationMetadataRequest } from 'deso-protocol-types';
import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
export declare class Notification {
    node: Node;
    identity: Identity;
    constructor(node: Node, identity: Identity);
    getNotifications(request: Partial<GetNotificationsRequest>): Promise<GetNotificationsResponse>;
    getUnreadNotificationsCount(request: Partial<GetNotificationsCountRequest>): Promise<GetNotificationsCountResponse>;
    setNotificationMetadata(request: Partial<SetNotificationMetadataRequest>): Promise<void>;
}
