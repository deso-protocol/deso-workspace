export declare type IframeMethods = 'sign' | 'encrypt' | 'decrypt' | 'jwt' | 'login' | 'logout';
export declare const callIdentityMethodAndExecute: (attributeValue: unknown, method: IframeMethods) => Promise<any>;
export declare const approveSignAndSubmit: (transactionHex: string) => Promise<any>;
export declare const getIframe: () => HTMLIFrameElement;
