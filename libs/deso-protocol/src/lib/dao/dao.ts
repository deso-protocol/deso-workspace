import axios from 'axios';
import {
  DAOCoinLimitOrderResponse,
  DAOCoinLimitOrderWithCancelOrderIDRequest,
  DAOCoinLimitOrderWithExchangeRateAndQuantityRequest,
  DAOCoinMarketOrderWithQuantityRequest,
  DAOCoinRequest,
  DAOCoinResponse,
  GetDAOCoinLimitOrdersRequest,
  GetDAOCoinLimitOrdersResponse,
  GetTransactorDAOCoinLimitOrdersRequest,
  TransactionConstructionResponse,
  TransferDAOCoinRequest,
  TransferDAOCoinResponse,
} from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';

export class DAO {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  private async executeTransaction<
    REQUEST,
    RESPONSE extends TransactionConstructionResponse
  >(request: Partial<REQUEST>, endpoint: string): Promise<RESPONSE> {
    request = { ...{ MinFeeRateNanosPerKB: 1000 }, ...request };
    const response = (
      await axios.post<RESPONSE>(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return await this.identity
      .submitTransaction(response.TransactionHex)
      .then(() => response);
  }

  private async executePost<REQUEST, RESPONSE>(
    request: Partial<REQUEST>,
    endpoint: string
  ): Promise<RESPONSE> {
    return (
      await axios.post<RESPONSE>(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
  }

  public async DAOCoin(
    request: Partial<DAOCoinRequest>
  ): Promise<DAOCoinResponse> {
    // TODO: validate partial
    return this.executeTransaction<DAOCoinRequest, DAOCoinResponse>(
      request,
      'dao-coin'
    );
  }

  public async transferDAOCoin(
    request: Partial<TransferDAOCoinRequest>
  ): Promise<TransferDAOCoinResponse> {
    // TODO: validate partial
    return this.executeTransaction<
      TransferDAOCoinRequest,
      TransferDAOCoinResponse
    >(request, 'transfer-dao-coin');
  }

  public async createDAOCoinLimitOrder(
    request: Partial<DAOCoinLimitOrderWithExchangeRateAndQuantityRequest>
  ): Promise<DAOCoinLimitOrderResponse> {
    if (!request.BuyingDAOCoinCreatorPublicKeyBase58Check) {
      request.BuyingDAOCoinCreatorPublicKeyBase58Check = '';
    }
    if (!request.SellingDAOCoinCreatorPublicKeyBase58Check) {
      request.SellingDAOCoinCreatorPublicKeyBase58Check = '';
    }
    // TODO: validate partial
    return this.executeTransaction<
      DAOCoinLimitOrderWithExchangeRateAndQuantityRequest,
      DAOCoinLimitOrderResponse
    >(request, 'create-dao-coin-limit-order');
  }

  public async cancelDAOCoinLimitOrder(
    request: Partial<DAOCoinLimitOrderWithCancelOrderIDRequest>
  ): Promise<DAOCoinLimitOrderResponse> {
    // TODO: validate partial
    return this.executeTransaction<
      DAOCoinLimitOrderWithCancelOrderIDRequest,
      DAOCoinLimitOrderResponse
    >(request, 'cancel-dao-coin-limit-order');
  }

  public async getDAOCoinLimitOrders(
    request: Partial<GetDAOCoinLimitOrdersRequest>
  ): Promise<GetDAOCoinLimitOrdersResponse> {
    if (!request.DAOCoin2CreatorPublicKeyBase58CheckOrUsername) {
      request.DAOCoin2CreatorPublicKeyBase58CheckOrUsername = '';
    }
    if (!request.DAOCoin1CreatorPublicKeyBase58CheckOrUsername) {
      request.DAOCoin1CreatorPublicKeyBase58CheckOrUsername = '';
    }
    // TODO: validate partial
    return this.executePost<
      GetDAOCoinLimitOrdersRequest,
      GetDAOCoinLimitOrdersResponse
    >(request, 'get-dao-coin-limit-orders');
  }

  public getTransactorDAOCoinLimitOrders(
    request: Partial<GetTransactorDAOCoinLimitOrdersRequest>
  ): Promise<GetDAOCoinLimitOrdersResponse> {
    // TODO: validate partial
    return this.executePost<
      GetTransactorDAOCoinLimitOrdersRequest,
      GetDAOCoinLimitOrdersResponse
    >(request, 'get-transactor-dao-coin-limit-orders');
  }

  public createDaoCoinMarketOrder(
    request: Partial<DAOCoinMarketOrderWithQuantityRequest>
  ): Promise<DAOCoinLimitOrderResponse> {
    // TODO: validate partial
    return this.executePost<
      DAOCoinMarketOrderWithQuantityRequest,
      DAOCoinLimitOrderResponse
    >(request, 'create-dao-coin-market-order');
  }
}
