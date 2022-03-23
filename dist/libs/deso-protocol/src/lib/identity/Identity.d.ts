import { Node } from '../node/Node';
import { AppendExtraDataRequest, GetDecryptMessagesRequest, GetDecryptMessagesResponse, LoginUser, SendMessageStatelessRequest } from 'deso-protocol-types';
export declare class Identity {
    private node;
    constructor(node: Node);
    getIframe(): HTMLIFrameElement;
    getUser(): LoginUser | null;
    getUserKey(): string | null;
    initialize(): Promise<any>;
    login(accessLevel?: string): Promise<{
        user: LoginUser;
        key: string;
    }>;
    logout(publicKey: string): Promise<boolean>;
    private setIdentityFrame;
    submitTransaction(TransactionHex: string, extraData?: Omit<AppendExtraDataRequest, 'TransactionHex'>): Promise<any>;
    decrypt(encryptedMessages: GetDecryptMessagesRequest[]): Promise<GetDecryptMessagesResponse[]>;
    encrypt(request: Partial<SendMessageStatelessRequest>): Promise<string>;
    getJwt(): Promise<string>;
}
