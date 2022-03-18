"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Social = void 0;
const axios_1 = require("axios");
class Social {
    constructor(node, identity, user) {
        this.user = user;
        this.node = node;
        this.identity = identity;
    }
    async sendMessage(request) {
        const encryptedMessage = await this.identity.encrypt(request);
        request.EncryptedMessageText = encryptedMessage;
        if (!request.MinFeeRateNanosPerKB) {
            request.MinFeeRateNanosPerKB = 1000;
        }
        const response = (await axios_1.default.post(`${this.node.getUri()}/send-message-stateless`, request)).data;
        return await this.identity.submitTransaction(response.TransactionHex);
    }
    async createFollowTxnStateless(request) {
        if (!request.FollowerPublicKeyBase58Check) {
            throw Error('FollowerPublicKeyBase58Check is undefined');
        }
        if (!request.FollowedPublicKeyBase58Check) {
            throw Error('FollowedPublicKeyBase58Check is undefined');
        }
        if (request.IsUnfollow instanceof Boolean) {
            throw Error('IsUnfollow is undefined');
        }
        request = { ...{ MinFeeRateNanosPerKB: 1000 }, ...request };
        const response = (await axios_1.default.post(`${this.node.getUri()}/create-follow-txn-stateless`, request)).data;
        return await this.identity.submitTransaction(response.TransactionHex);
    }
    async getFollowsStateless(request) {
        const endpoint = 'get-follows-stateless';
        const response = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return response;
    }
    async getMessagesStateless(request) {
        const response = (await axios_1.default.post(`${this.node.getUri()}/get-messages-stateless`, request)).data;
        const encryptedMessages = response.OrderedContactsWithMessages
            .map((thread) => {
            if (thread.Messages === null) {
                return [];
            }
            return thread.Messages.map((message) => ({
                EncryptedHex: message.EncryptedText,
                PublicKey: message.IsSender
                    ? message.RecipientPublicKeyBase58Check
                    : message.SenderPublicKeyBase58Check,
                IsSender: message.IsSender,
                Legacy: !message.V2 && (!message.Version || message.Version < 2),
                Version: message.Version,
                SenderMessagingPublicKey: message.SenderMessagingPublicKey,
                SenderMessagingGroupKeyName: message.SenderMessagingGroupKeyName,
                RecipientMessagingPublicKey: message.RecipientMessagingPublicKey,
                RecipientMessagingGroupKeyName: message.RecipientMessagingGroupKeyName,
            }));
        })
            .flat();
        return this.identity.decrypt(encryptedMessages);
    }
    async getHodlersForPublicKey(request) {
        const endpoint = 'get-hodlers-for-public-key';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async getDiamondsForPublicKey(request) {
        const endpoint = 'get-diamonds-for-public-key';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async isFollowingPublicKey(request) {
        const endpoint = 'is-following-public-key';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async isHodlingPublicKey(request) {
        const endpoint = 'is-hodling-public-key';
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request);
    }
    async updateProfile(request) {
        throw Error('todo');
        const endpoint = 'update-profile';
        const response = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        // const profile = (await this.user.getSingleProfile({
        //   PublicKeyBase58Check: request.ProfilePublicKeyBase58Check,
        // })).Profile;
        //   const oy = {
        // NewUsername: profile?.Username,
        // NewDescription: profile?.Description,
        // // NewProfilePic: profile.,
        // NewCreatorBasisPoints: profile.,
        // MinFeeRateNanosPerKB: 1000
        //   }
        response.TransactionHex;
        return await this.identity
            .submitTransaction(response.TransactionHex)
            .then(() => response)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async sendDiamonds(request) {
        const endpoint = 'send-diamonds';
        const response = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(response.TransactionHex)
            .then(() => response)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
    async createLikeStateless(request) {
        const endpoint = 'create-like-stateless';
        const response = await (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return await this.identity
            .submitTransaction(response.TransactionHex)
            .then(() => response)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
}
exports.Social = Social;
//# sourceMappingURL=Social.js.map