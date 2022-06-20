"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const axios_1 = require("axios");
const utils_1 = require("../../utils/utils");
class User {
    constructor(node, identity) {
        this.node = node;
        this.identity = identity;
    }
    async getUserStateless(request) {
        return (await axios_1.default.post(`${this.node.getUri()}/get-users-stateless`, request)).data;
    }
    getSingleProfilePicture(PublicKeyBase58Check) {
        return `${this.node.getUri()}/get-single-profile-picture/${PublicKeyBase58Check}`;
    }
    async getSingleProfile(request) {
        const endpoint = 'get-single-profile';
        const response = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return response;
    }
    async getProfiles(request) {
        const endpoint = 'get-profiles';
        const response = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return response;
    }
    async getUserMetadata(request) {
        const endpoint = `get-user-metadata/${request.PublicKeyBase58Check}`;
        const response = (await axios_1.default.get(`${this.node.getUri()}/${endpoint}`))
            .data;
        return response;
    }
    async deletePii(request) {
        if (!request.PublicKeyBase58Check) {
            throw Error('PublicKeyBase58Check is undefined');
        }
        const endpoint = 'delete-pii';
        const JWT = await this.identity.getJwt();
        await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, {
            ...request,
            JWT,
        });
        return true;
    }
    async blockPublicKey(request) {
        if (!request.PublicKeyBase58Check) {
            throw Error('PublicKeyBase58Check is undefined');
        }
        if (!request.BlockPublicKeyBase58Check) {
            throw Error('BlockPublicKeyBase58Check is undefined');
        }
        const endpoint = 'block-public-key';
        const JWT = await this.identity.getJwt();
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, {
            ...request,
            JWT,
        });
    }
    async getUserDerivedKeys(request) {
        if (!request.PublicKeyBase58Check) {
            throw Error('PublicKeyBase58Check is undefined');
        }
        const endpoint = 'get-user-derived-keys';
        const JWT = await this.identity.getJwt();
        return await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, {
            ...request,
            JWT,
        });
    }
    async authorizeDerivedKeyWithoutIdentity(request) {
        const endpoint = 'authorize-derived-key';
        const apiResponse = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, request)).data;
        return apiResponse;
    }
    async authorizeDerivedKey(request, broadcast) {
        (0, utils_1.throwErrors)(['MinFeeRateNanosPerKB'], request);
        const derivedPrivateUser = await this.identity.derive({
            publicKey: this.identity.getUserKey() || undefined,
            transactionSpendingLimitResponse: request.TransactionSpendingLimitResponse,
            derivedPublicKey: request.DerivedPublicKeyBase58Check,
        });
        const authorizeDerivedKeyRequest = {
            OwnerPublicKeyBase58Check: derivedPrivateUser.publicKeyBase58Check,
            DerivedPublicKeyBase58Check: derivedPrivateUser.derivedPublicKeyBase58Check,
            ExpirationBlock: derivedPrivateUser.expirationBlock,
            AccessSignature: derivedPrivateUser.accessSignature,
            DeleteKey: request.DeleteKey,
            ExtraData: request.ExtraData,
            TransactionSpendingLimitHex: derivedPrivateUser.transactionSpendingLimitHex,
            Memo: request.Memo,
            AppName: request.AppName,
            TransactionFees: request.TransactionFees,
            MinFeeRateNanosPerKB: request.MinFeeRateNanosPerKB,
        };
        const endpoint = 'authorize-derived-key';
        const apiResponse = (await axios_1.default.post(`${this.node.getUri()}/${endpoint}`, authorizeDerivedKeyRequest)).data;
        if (!broadcast) {
            return apiResponse;
        }
        return await this.identity
            .submitTransaction(apiResponse.TransactionHex)
            .then(() => apiResponse)
            .catch(() => {
            throw Error('something went wrong while signing');
        });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map