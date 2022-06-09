/* eslint-disable @typescript-eslint/ban-types */
import Deso from 'deso-protocol';
import {
  AppendExtraDataRequest,
  GetTransactionSpendingRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';

const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export const transactionChapter = {
  GET_TRANSACTION: {
    parentRoute: ParentRoutes.transactions,
    title: 'Get Transaction',
    route: '/Transactions/get-txn',
    method: deso.transaction.getTransaction,
    params: () => {
      return '4354315e08ce066e0487ef85d2476579bfe6a8c0c8d3979374085dcae753b04d';
    },
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/transaction-utilities#get-transaction',
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
                methodName: 'deso.transaction.getTransaction(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Check if transaction is currently in mempool. This is
                  particularly useful if you need to wait for a transaction to
                  be broadcasted before submitting a subsequent transaction.
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
  APPEND_EXTRA_DATA: {
    parentRoute: ParentRoutes.transactions,
    title: 'Append Extra Data',
    route: '/Transactions/append-extra-data',
    method: deso.transaction.appendExtraData,
    params: () => {
      return {
        TransactionHex:
          '018575e7540be9c4b833b78408aa06e7d386411ce28169e3b267fce3049d6a36b7000103037fe7f8102d08e0d1e007786d958aaee319b2f38f1e05c5057320a5c1373ffbe0bb02053a0000297b22426f6479223a22436865636b696e67206f75742074686520646576656c6f70657220687562227de807d4618083db88ebcee4ee16002103037fe7f8102d08e0d1e007786d958aaee319b2f38f1e05c5057320a5c1373ffb0000',
        ExtraData: {
          extra_data_that_was_added_afterwards: 'DeZo_Dog is the best dog',
        },
      } as AppendExtraDataRequest;
    },
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/transaction-utilities#append-extra-data',
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
                methodName: 'deso.transaction.getTransaction(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Check if transaction is currently in mempool. This is
                  particularly useful if you need to wait for a transaction to
                  be broadcasted before submitting a subsequent transaction.
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
  GET_TRANSACTION_SPENDING: {
    parentRoute: ParentRoutes.transactions,
    title: 'Get Transaction Spending',
    route: '/Transactions/get-transaction-spending',
    method: deso.transaction.getTransactionSpending,
    params: () => {
      return {
        TransactionHex:
          '018575e7540be9c4b833b78408aa06e7d386411ce28169e3b267fce3049d6a36b7000103037fe7f8102d08e0d1e007786d958aaee319b2f38f1e05c5057320a5c1373ffbe0bb02053a0000297b22426f6479223a22436865636b696e67206f75742074686520646576656c6f70657220687562227de807d4618083db88ebcee4ee16002103037fe7f8102d08e0d1e007786d958aaee319b2f38f1e05c5057320a5c1373ffb0000',
      } as GetTransactionSpendingRequest;
    },
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/transaction-utilities#get-transaction-spending',
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
                methodName: 'deso.transaction.getTransactionSpending(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Calculates the total transaction spending by subtracting
                  transaction output to sender from transaction inputs. This
                  allows a convenient way to display to users how much they will
                  spend if they submit a given transaction to the network.
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
};
