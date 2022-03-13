import { IframeMethods } from './IdentityHelper';
export declare const iFrameHandler: (info: Payload) => Promise<any>;
declare type Payload = {
    iFrameMethod: IframeMethods;
    data?: any;
};
export declare const handlers: (event: any, windowHandler: any, info: Payload) => Promise<any>;
export {};
