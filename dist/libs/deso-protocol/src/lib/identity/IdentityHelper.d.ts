export declare type IframeMethods = 'sign' | 'encrypt' | 'decrypt' | 'jwt' | 'login' | 'logout' | 'derive';
export declare const callIdentityMethodAndExecute: (attributeValue: unknown, method: IframeMethods) => Promise<any>;
export declare const approveSignAndSubmit: (transactionHex: string, uri: string) => Promise<any>;
export declare const getIframe: () => HTMLIFrameElement;
