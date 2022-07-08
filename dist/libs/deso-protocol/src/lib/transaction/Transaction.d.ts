import { AppendExtraDataRequest, AppendExtraDataResponse, GetTransactionSpendingLimitHexStringResponse, GetTransactionSpendingResponse, GetTxnResponse, SubmitTransactionResponse, TransactionSpendingLimitResponse } from 'deso-protocol-types';
import { Node } from '../Node/Node';
export declare class Transactions {
    private node;
    constructor(node: Node);
    submitTransaction(TransactionHex: string): Promise<SubmitTransactionResponse>;
    getTransaction(TxnHashHex: string): Promise<GetTxnResponse>;
    appendExtraData(request: AppendExtraDataRequest): Promise<AppendExtraDataResponse>;
    getTransactionSpending(request: AppendExtraDataRequest): Promise<GetTransactionSpendingResponse>;
    getTransactionSpendingLimitHexString(request: string): Promise<GetTransactionSpendingLimitHexStringResponse>;
    getTransactionSpendingLimitResponseFromHex(transactionSpendingLimitHex: string): Promise<TransactionSpendingLimitResponse>;
    signWithLocalKey(): Promise<void>;
}
