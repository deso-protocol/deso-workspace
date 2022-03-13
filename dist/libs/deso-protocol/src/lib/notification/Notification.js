"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const axios_1 = require("axios");
// remove this later and figure out a better solution for the this binding issue
let Notifications;
class Notification {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
        Notifications = this;
    }
    async getNotifications(request) {
        const endpoint = 'get-notifications';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getUnreadNotificationsCount(request) {
        const endpoint = 'get-unread-notifications-count';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async setNotificationMetadata(request) {
        const jwt = await this.identity.getJwt();
        const unread = await Notifications.getUnreadNotificationsCount({
            PublicKeyBase58Check: request.PublicKeyBase58Check,
        });
        request.LastSeenIndex = unread.LastUnreadNotificationIndex;
        request.UnreadNotifications = 0;
        request.JWT = jwt;
        const endpoint = 'set-notification-metadata';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
}
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map