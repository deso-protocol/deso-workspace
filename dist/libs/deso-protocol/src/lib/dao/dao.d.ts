import { DAOCoinLimitOrderResponse, DAOCoinLimitOrderWithCancelOrderIDRequest, DAOCoinLimitOrderWithExchangeRateAndQuantityRequest, DAOCoinRequest, DAOCoinResponse, GetDAOCoinLimitOrdersRequest, GetDAOCoinLimitOrdersResponse, GetTransactorDAOCoinLimitOrdersRequest, TransferDAOCoinRequest, TransferDAOCoinResponse } from '../../../../deso-protocol-types/src';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
export declare class DAO {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    private executeTransaction;
    private executePost;
    DAOCoin(request: Partial<DAOCoinRequest>): Promise<DAOCoinResponse>;
    TransferDAOCoin(request: Partial<TransferDAOCoinRequest>): Promise<TransferDAOCoinResponse>;
    CreateDAOCoinLimitOrder(request: Partial<DAOCoinLimitOrderWithExchangeRateAndQuantityRequest>): Promise<DAOCoinLimitOrderResponse>;
    CancelDAOCoinLimitOrder(request: Partial<DAOCoinLimitOrderWithCancelOrderIDRequest>): Promise<DAOCoinLimitOrderResponse>;
    GetDAOCoinLimitOrders(request: Partial<GetDAOCoinLimitOrdersRequest>): Promise<GetDAOCoinLimitOrdersResponse>;
    GetTransactorDAOCoinLimitOrders(request: Partial<GetTransactorDAOCoinLimitOrdersRequest>): Promise<GetDAOCoinLimitOrdersResponse>;
}
