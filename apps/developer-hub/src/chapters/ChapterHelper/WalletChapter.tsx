import { DEZO_DOG, ParentRoutes } from '../../services/utils';
import Deso from 'deso-protocol';
import {
  BuyOrSellCreatorCoinRequest,
  SendDeSoRequest,
  TransferCreatorCoinRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import { Page } from '../Read/Page';
import { PageSection } from './PageSections';
import { CHAPTERS } from './Chapter.models';
const deso = new Deso();
export const walletChapter = {
  SEND_DESO: {
    parentRoute: ParentRoutes.wallet,
    title: 'Send Deso',
    route: '/wallet/send-deso',
    method: deso.wallet.sendDesoRequest,
    params: () => {
      return {
        SenderPublicKeyBase58Check: localStorage.getItem('login_key') as string,
        RecipientPublicKeyOrUsername: DEZO_DOG,
        AmountNanos: 1,
        MinFeeRateNanosPerKB: 1000,
      } as SendDeSoRequest;
    },
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/financial-transactions-api#send-deso',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.wallet.sendDesoRequest(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Create a Basic transfer transaction. Basic transfer
                  transactions send DeSo from one used to another.
                </div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  BUY_OR_SELL_CREATOR_COIN: {
    parentRoute: ParentRoutes.wallet,
    title: 'Buy Or Sell Creator Coin',
    route: '/wallet/buy-or-sell-creator-coin',
    method: deso.wallet.buyOrSellCreatorCoin,
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: localStorage.getItem(
          'login_key'
        ) as string,
        CreatorPublicKeyBase58Check: DEZO_DOG,
        OperationType: 'buy',
        DeSoToSellNanos: 10001,
        MinFeeRateNanosPerKB: 1000,
      } as BuyOrSellCreatorCoinRequest;
    },
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/financial-transactions-api#buy-or-sell-creator-coin',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.wallet.buyOrSellCreatorCoin(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Create a buy/sell creator coin transaction. </div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  TRANSFER_CREATOR_COIN: {
    parentRoute: ParentRoutes.wallet,
    title: 'Transfer Creator Coin',
    route: '/wallet/transfer-creator-coin',
    method: deso.wallet.transferCreatorCoin,
    params: () => {
      return {
        SenderPublicKeyBase58Check: localStorage.getItem('login_key') as string,
        CreatorPublicKeyBase58Check: DEZO_DOG,
        CreatorCoinToTransferNanos: 10,
        ReceiverUsernameOrPublicKeyBase58Check: DEZO_DOG,
        MinFeeRateNanosPerKB: 1000,
      } as TransferCreatorCoinRequest;
    },
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/financial-transactions-api#transfer-creator-coin',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.wallet.transferCreatorCoin(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Create a transfer creator coin transaction.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
