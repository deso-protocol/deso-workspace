import Deso from 'deso-protocol';
import {
  DAOCoinLimitOrderOperationTypeString,
  DAOCoinLimitOrderWithCancelOrderIDRequest,
  DAOCoinLimitOrderWithExchangeRateAndQuantityRequest,
  DAOCoinRequest,
  GetDAOCoinLimitOrdersRequest,
  GetTransactorDAOCoinLimitOrdersRequest,
  TransferDAOCoinRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';
const deso = new Deso();
export const daoChapter = {
  DAO_COIN: {
    parentRoute: ParentRoutes.dao,
    title: 'DAO Coin',
    route: '/dao/dao-coin',
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: localStorage.getItem('login_key'),
        ProfilePublicKeyBase58CheckOrUsername:
          localStorage.getItem('login_key'),
        OperationType: 'mint',
        CoinsToMintNanos: '0x3B9ACA00',
      } as Partial<DAOCoinRequest>;
    },
    method: deso.dao.DAOCoin,
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/dao-transactions-api#dao-coin',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.dao.DAOCoin(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  DAO Coin is used to mint, burn, update transfer restriction
                  status, and disable minting
                </div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
              bind="dao"
            />
          }
        ></Route>
      );
    },
  },
  TRANSFER_DAO_COIN: {
    parentRoute: ParentRoutes.dao,
    title: 'Transfer DAO Coin',
    route: '/dao/transfer-dao-coin',
    params: () => {
      return {
        SenderPublicKeyBase58Check: localStorage.getItem('login_key'),
        ProfilePublicKeyBase58CheckOrUsername:
          localStorage.getItem('login_key'),
        ReceiverPublicKeyBase58CheckOrUsername: 'lazynina', // TODO: what should we put in here?
        DAOCoinToTransferNanos: '0x5F5E100',
      } as Partial<TransferDAOCoinRequest>;
    },
    method: deso.dao.TransferDAOCoin,
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/dao-transactions-api#transfer-dao-coin',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.dao.TransferDAOCoin(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Transfer DAO Coin is used to transfer DAO coins to another
                  public key.
                </div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
              bind="dao"
            />
          }
        ></Route>
      );
    },
  },
  CREATE_DAO_COIN_LIMIT_ORDER: {
    parentRoute: ParentRoutes.dao,
    title: 'Create DAO Coin Limit Order',
    route: '/dao/create-dao-coin-limit-order',
    params: () => {
      return {
        TransactorPublicKeyBase58Check: localStorage.getItem('login_key'),
        BuyingDAOCoinCreatorPublicKeyBase58CheckOrUsername: '', // "" means buying DESO
        SellingDAOCoinCreatorPublicKeyBase58CheckOrUsername:
          localStorage.getItem('login_key'), // TODO: what should we put in here?
        ExchangeRateCoinsToSellPerCoinToBuy: 0.1,
        QuantityToFill: 0.1,
        OperationType:
          DAOCoinLimitOrderOperationTypeString.DAOCoinLimitOrderOperationTypeStringASK,
      } as Partial<DAOCoinLimitOrderWithExchangeRateAndQuantityRequest>;
    },
    method: deso.dao.CreateDAOCoinLimitOrder,
    documentation: [
      // Link TBD: 'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/dao-transactions-api#transfer-dao-coin',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.dao.CreateDAOCoinLimitOrder(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Create a DAO Coin Limit Order</div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
              bind="dao"
            />
          }
        ></Route>
      );
    },
  },
  CANCEL_DAO_COIN_LIMIT_ORDER: {
    parentRoute: ParentRoutes.dao,
    title: 'Cancel DAO Coin Limit Order',
    route: '/dao/cancel-dao-coin-limit-order',
    params: () => {
      return {
        TransactorPublicKeyBase58Check: localStorage.getItem('login_key'),
        CancelOrderID: "", // TODO: how do we want to show this working?
      } as Partial<DAOCoinLimitOrderWithCancelOrderIDRequest>;
    },
    method: deso.dao.CancelDAOCoinLimitOrder,
    documentation: [
      // Link TBD: 'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/dao-transactions-api#transfer-dao-coin',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.dao.CancelDAOCoinLimitOrder(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Cancel a DAO Coin Limit Order</div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
              bind="dao"
            />
          }
        ></Route>
      );
    },
  },
  GET_DAO_COIN_LIMIT_ORDERS:  {
    parentRoute: ParentRoutes.dao,
    title: 'Get DAO Coin Limit Orders',
    route: '/dao/get-dao-coin-limit-orders',
    params: () => {
      return {
        DAOCoin1CreatorPublicKeyBase58CheckOrUsername: localStorage.getItem('login_key'),
        DAOCoin2CreatorPublicKeyBase58CheckOrUsername: "", // Empty string is for DESO.
      } as Partial<GetDAOCoinLimitOrdersRequest>;
    },
    method: deso.dao.GetDAOCoinLimitOrders,
    documentation: [
      // Link TBD: 'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/dao-transactions-api#transfer-dao-coin',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.dao.GetDAOCoinLimitOrders(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get all open DAO Coin Limit Orders for a trading pair. 
                  If an empty string is provided for either request param, it is interpreted as DESO instead of a DAO coin.
                </div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
              bind="dao"
            />
          }
        ></Route>
      );
    },
  },
  GET_TRANSACTOR_DAO_COIN_LIMIT_ORDERS:  {
    parentRoute: ParentRoutes.dao,
    title: 'Get Transactor DAO Coin Limit Orders',
    route: '/dao/get-transactor-dao-coin-limit-orders',
    params: () => {
      return {
        TransactorPublicKeyBase58CheckOrUsername: localStorage.getItem('login_key'),
      } as Partial<GetTransactorDAOCoinLimitOrdersRequest>;
    },
    method: deso.dao.GetTransactorDAOCoinLimitOrders,
    documentation: [
      // Link TBD: 'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/dao-transactions-api#transfer-dao-coin',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.dao.GetTransactorDAOCoinLimitOrders(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get all open DAO Coin Limit Orders for a user.
                </div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
              bind="dao"
            />
          }
        ></Route>
      );
    },
  },
};
