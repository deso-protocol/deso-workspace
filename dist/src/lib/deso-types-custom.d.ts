export interface GetApproveResponse {
    id?: string;
    service: 'identity';
    method: 'approve';
    payload: {
        users: {
            [key: string]: {
                accessLevel: number;
                accessLevelHmac: string;
                btcDepositAddress: string;
                encryptedSeedHex: string;
                hasExtraText: boolean;
                network: string;
            };
        };
        signedTransactionHex: string;
    };
}
export interface IdentityLoginResponse {
    id?: string;
    service: 'identity';
    method: string;
    payload: {
        users: LoginUsers;
        publicKeyAdded: string;
        signedUp: boolean;
    };
}
export interface UploadImageRequest {
    UserPublicKeyBase58Check: string;
    JWT: string;
    file: File;
}
export interface UploadVideoRequest {
    uploadLength: any;
    uploadMetaData: any;
    file: File;
}
export interface GetVideoStatusRequest {
    videoId: string;
}
export interface UploadVideoResponse {
    streamMediaId: string;
}
export interface LoginUser {
    accessLevel: number;
    accessLevelHmac: string;
    btcDepositAddress: string;
    encryptedSeedHex: string;
    hasExtraText: boolean;
    ethDepositAddress: string;
    network: string;
}
export interface LoginUsers {
    [user: string]: LoginUser;
}
export interface IdentityApproveResponse {
    id?: string;
    service: 'identity';
    method: string;
    payload: {
        users: LoginUser;
        signedTransactionHex: string;
    };
}
export interface IdentityJwtResponse {
    id: string;
    service: 'identity';
    payload: {
        jwt: string;
    };
}
export interface IdentitySignRequest {
    id: string;
    service: string;
    method: string;
    payload: {
        accessLevel: number;
        accessLevelHmac: string;
        encryptedSeedHex: string;
        transactionHex?: string;
        signedTransactionHex?: string;
        encryptedMessage?: {
            EncryptedHex: string;
            PublicKey: string;
            IsSender: boolean;
            Legacy: boolean;
        }[];
    };
}
export interface GetDecryptMessagesRequest {
    EncryptedHex: string;
    PublicKey: string;
    IsSender: boolean;
    Legacy: boolean;
    Version: number;
    SenderMessagingPublicKey: string;
    SenderMessagingGroupKeyName: string;
    RecipientMessagingPublicKey: string;
    RecipientMessagingGroupKeyName: string;
}
export interface GetDecryptMessagesResponse {
    EncryptedHex: string;
    PublicKey: string;
    IsSender: boolean;
    Legacy: boolean;
    Version: number;
    SenderMessagingPublicKey: string;
    SenderMessagingGroupKeyName: string;
    RecipientMessagingPublicKey: string;
    RecipientMessagingGroupKeyName: string;
    decryptedMessage: string;
}
