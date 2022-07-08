// import Deso from 'deso-protocol';
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
import DesoDrawer from '../../components/layout/Drawer/Drawer';
import { ParentRoutes } from '../../services/utils';
import Page from '../CustomChapters/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';
import Deso from 'deso-protocol';
const deso = new Deso();
export const daoChapter = {
  DAO_COIN: {
    parentRoute: ParentRoutes.dao,
    title: 'DAO Coin',
    route: '/dao/dao-coin',
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: deso.identity.getUserKey() as string,
        ProfilePublicKeyBase58CheckOrUsername:
          deso.identity.getUserKey() as string,
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
        SenderPublicKeyBase58Check: deso.identity.getUserKey() as string,
        ProfilePublicKeyBase58CheckOrUsername:
          deso.identity.getUserKey() as string,
        ReceiverPublicKeyBase58CheckOrUsername: 'lazynina', // TODO: what should we put in here?
        DAOCoinToTransferNanos: '0x5F5E100',
      } as Partial<TransferDAOCoinRequest>;
    },
    method: deso.dao.transferDAOCoin,
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
                methodName: `deso.dao.transferDAOCoin(request)`,
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
        TransactorPublicKeyBase58Check: deso.identity.getUserKey() as string,
        SellingDAOCoinCreatorPublicKeyBase58CheckOrUsername:
          deso.identity.getUserKey() as string, // TODO: what should we put in here?
        ExchangeRateCoinsToSellPerCoinToBuy: 0.1,
        QuantityToFill: 0.1,
        OperationType:
          DAOCoinLimitOrderOperationTypeString.DAOCoinLimitOrderOperationTypeStringASK,
      } as Partial<DAOCoinLimitOrderWithExchangeRateAndQuantityRequest>;
    },
    method: deso.dao.createDAOCoinLimitOrder,
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/dao-transactions-api#create-dao-coin-limit-order',
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
                methodName: `deso.dao.createDAOCoinLimitOrder(request)`,
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
        TransactorPublicKeyBase58Check: deso.identity.getUserKey() as string,
        CancelOrderID: '', // TODO: how do we want to show this working?
      } as Partial<DAOCoinLimitOrderWithCancelOrderIDRequest>;
    },
    method: deso.dao.cancelDAOCoinLimitOrder,
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/dao-transactions-api#cancel-dao-coin-limit-order',
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
                methodName: `deso.dao.cancelDAOCoinLimitOrder(request)`,
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
  GET_DAO_COIN_LIMIT_ORDERS: {
    parentRoute: ParentRoutes.dao,
    title: 'Get DAO Coin Limit Orders',
    route: '/dao/get-dao-coin-limit-orders',
    params: () => {
      return {
        DAOCoin1CreatorPublicKeyBase58CheckOrUsername:
          deso.identity.getUserKey() as string,
      } as Partial<GetDAOCoinLimitOrdersRequest>;
    },
    method: deso.dao.getDAOCoinLimitOrders,
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/dao-endpoints#gets-all-open-orders-on-order-book-for-a-dao-coin-market',
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
                methodName: `deso.dao.getDAOCoinLimitOrders(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get all open DAO Coin Limit Orders for a trading pair. If an
                  empty string or no value is provided for either request param,
                  it is interpreted as DESO instead of a DAO coin.
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
  GET_TRANSACTOR_DAO_COIN_LIMIT_ORDERS: {
    parentRoute: ParentRoutes.dao,
    title: 'Get Transactor DAO Coin Limit Orders',
    route: '/dao/get-transactor-dao-coin-limit-orders',
    params: () => {
      return {
        TransactorPublicKeyBase58CheckOrUsername:
          deso.identity.getUserKey() as string,
      } as Partial<GetTransactorDAOCoinLimitOrdersRequest>;
    },
    method: deso.dao.getTransactorDAOCoinLimitOrders,
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/dao-endpoints#gets-all-open-limit-orders-created-by-a-transactor',
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
                methodName: `deso.dao.getTransactorDAOCoinLimitOrders(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get all open DAO Coin Limit Orders for a user.</div>
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
  // uncomment this to enable it in the UI
  // Create_DAO_COIN_MARKET_ORDER: {
  //   parentRoute: ParentRoutes.dao,
  //   title: 'Create Dao Coin Market Order',
  //   route: 'create-dao-coin-market-order',
  //   params: () => {
  //     return {
  //       TransactorPublicKeyBase58CheckOrUsername:
  //         deso.identity.getUserKey() as string,
  //     } as Partial<DAOCoinMarketOrderWithQuantityRequest>;
  //   },
  //   method: deso.dao.getTransactorDAOCoinLimitOrders,
  //   documentation: [],
  //   githubSource: [],
  //   component: function () {
  //     return (
  //       <Route
  //         key={this.title}
  //         path={this.route}
  //         element={
  //           <Page
  //             method={{
  //               methodName: `deso.dao.createDaoCoinMarketOrder(request)`,
  //               params: this.params,
  //               method: this.method,
  //             }}
  //             pretext={PageSection(
  //               this.title,
  //               <div>Creates a dao coin market order</div>
  //             )}
  //             demo={true}
  //             chapters={CHAPTERS}
  //             selectedChapter={this}
  //             bind="dao"
  //           />
  //         }
  //       ></Route>
  //     );
  //   },
  // },
};
