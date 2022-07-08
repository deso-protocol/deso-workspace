import { AppendExtraDataRequest, DerivedPrivateUserInfo, DeSoNetwork, GetDecryptMessagesRequest, GetDecryptMessagesResponse, IdentityDeriveParams, LoginUser, RequestOptions, SendMessageStatelessRequest } from 'deso-protocol-types';
import { Node } from '../Node/Node';
import { Transactions } from '../transaction/Transaction';
export interface IdentityConfig {
    node: Node;
    uri?: string;
    network?: DeSoNetwork;
    host?: 'browser' | 'server';
}
export declare class Identity {
    private node;
    private network;
    private identityUri;
    private loggedInUser;
    private loggedInKey;
    private transactions;
    host: 'browser' | 'server';
    constructor({ host, node, network, uri }: IdentityConfig, transactions: Transactions);
    getUri(): string;
    setUri(uri: string): void;
    getIframe(): HTMLIFrameElement;
    getUser(): LoginUser | null;
    private setUser;
    getUserKey(): string | null;
    private setLoggedInKey;
    initialize(): Promise<any>;
    login(accessLevel?: string): Promise<{
        user: LoginUser;
        key: string;
    }>;
    logout(publicKey: string): Promise<boolean>;
    derive(params: IdentityDeriveParams): Promise<DerivedPrivateUserInfo>;
    private setIdentityFrame;
    submitTransaction(TransactionHex: string, options?: RequestOptions, extraData?: Omit<AppendExtraDataRequest, 'TransactionHex'>): Promise<any>;
    decrypt(encryptedMessages: GetDecryptMessagesRequest[]): Promise<GetDecryptMessagesResponse[]>;
    encrypt(request: Partial<SendMessageStatelessRequest>): Promise<string>;
    getJwt(): Promise<string>;
    private isTestnet;
}
