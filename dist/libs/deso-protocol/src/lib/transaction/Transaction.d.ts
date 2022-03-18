import { AppendExtraDataRequest, AppendExtraDataResponse, GetTxnResponse, SubmitTransactionResponse } from 'deso-protocol-types';
export declare class Transactions {
    static submitTransaction(TransactionHex: string): Promise<SubmitTransactionResponse>;
    static getTransaction(TxnHashHex: string): Promise<GetTxnResponse>;
    static appendExtraData(request: AppendExtraDataRequest): Promise<AppendExtraDataResponse>;
    static getTransactionSpending(request: AppendExtraDataRequest): Promise<import("axios").AxiosResponse<any, any>>;
}
