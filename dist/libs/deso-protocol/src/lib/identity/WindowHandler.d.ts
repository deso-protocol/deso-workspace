import { Transactions } from '../transaction/Transaction';
import { IframeMethods } from './IdentityHelper';
export declare const iFrameHandler: (info: Payload, transactions: Transactions) => Promise<any>;
declare type Payload = {
    iFrameMethod: IframeMethods;
    data?: any;
};
export declare const handlers: (event: any, windowHandler: any, info: Payload, transactions: Transactions) => Promise<any>;
export {};
