import { Node } from '../Node/Node';
import { AppendExtraDataRequest, DerivedPrivateUserInfo, GetDecryptMessagesRequest, GetDecryptMessagesResponse, IdentityDeriveParams, LoginUser, SendMessageStatelessRequest } from 'deso-protocol-types';
export interface IdentityConfig {
    node: Node;
    uri?: string;
}
export declare class Identity {
    private node;
    constructor(config: IdentityConfig);
    getUri(): string;
    setUri(uri: string): void;
    getIframe(): HTMLIFrameElement;
    getUser(): LoginUser | null;
    getUserKey(): string | null;
    initialize(): Promise<any>;
    login(accessLevel?: string): Promise<{
        user: LoginUser;
        key: string;
    }>;
    logout(publicKey: string): Promise<boolean>;
    derive(params: IdentityDeriveParams): Promise<DerivedPrivateUserInfo>;
    private setIdentityFrame;
    submitTransaction(TransactionHex: string, extraData?: Omit<AppendExtraDataRequest, 'TransactionHex'>): Promise<any>;
    decrypt(encryptedMessages: GetDecryptMessagesRequest[]): Promise<GetDecryptMessagesResponse[]>;
    encrypt(request: Partial<SendMessageStatelessRequest>): Promise<string>;
    getJwt(): Promise<string>;
}
