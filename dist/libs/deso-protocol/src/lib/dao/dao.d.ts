import { DAOCoinLimitOrderResponse, DAOCoinLimitOrderWithCancelOrderIDRequest, DAOCoinLimitOrderWithExchangeRateAndQuantityRequest, DAOCoinMarketOrderWithQuantityRequest, DAOCoinRequest, DAOCoinResponse, GetDAOCoinLimitOrdersRequest, GetDAOCoinLimitOrdersResponse, GetTransactorDAOCoinLimitOrdersRequest, TransferDAOCoinRequest, TransferDAOCoinResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
export declare class DAO {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    private executeTransaction;
    private executePost;
    DAOCoin(request: Partial<DAOCoinRequest>): Promise<DAOCoinResponse>;
    transferDAOCoin(request: Partial<TransferDAOCoinRequest>): Promise<TransferDAOCoinResponse>;
    createDAOCoinLimitOrder(request: Partial<DAOCoinLimitOrderWithExchangeRateAndQuantityRequest>): Promise<DAOCoinLimitOrderResponse>;
    cancelDAOCoinLimitOrder(request: Partial<DAOCoinLimitOrderWithCancelOrderIDRequest>): Promise<DAOCoinLimitOrderResponse>;
    getDAOCoinLimitOrders(request: Partial<GetDAOCoinLimitOrdersRequest>): Promise<GetDAOCoinLimitOrdersResponse>;
    getTransactorDAOCoinLimitOrders(request: Partial<GetTransactorDAOCoinLimitOrdersRequest>): Promise<GetDAOCoinLimitOrdersResponse>;
    createDaoCoinMarketOrder(request: Partial<DAOCoinMarketOrderWithQuantityRequest>): Promise<DAOCoinLimitOrderResponse>;
}
