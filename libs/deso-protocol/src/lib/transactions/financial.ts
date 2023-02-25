import { PartialWithRequiredFields } from '@deso-core/data';
import {
  BuyOrSellCreatorCoinRequest,
  BuyOrSellCreatorCoinResponse,
  SendDeSoRequest,
  SendDeSoResponse,
  TransferCreatorCoinRequest,
  TransferCreatorCoinResponse,
} from 'deso-protocol-types';
import {
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';
import { ConstructedAndSubmittedTx, TransactionOptions } from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/financial-transactions-api#send-deso
 */
export const sendDeso = (
  params: TxRequestWithOptionalFeesAndExtraData<SendDeSoRequest>,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<SendDeSoResponse>> => {
  return handleSignAndSubmit('api/v0/send-deso', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/financial-transactions-api#buy-or-sell-creator-coin
 */
export const buyCreatorCoin = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<
        BuyOrSellCreatorCoinRequest,
        'CreatorCoinToSellNanos' | 'OperationType'
      >,
      | 'UpdaterPublicKeyBase58Check'
      | 'CreatorPublicKeyBase58Check'
      | 'DeSoToSellNanos'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<BuyOrSellCreatorCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/buy-or-sell-creator-coin',
    {
      ...params,
      OperationType: 'buy',
    },
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/financial-transactions-api#buy-or-sell-creator-coin
 */
export const sellCreatorCoin = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<BuyOrSellCreatorCoinRequest, 'DesoToSellNanos' | 'OperationType'>,
      | 'UpdaterPublicKeyBase58Check'
      | 'CreatorPublicKeyBase58Check'
      | 'CreatorCoinToSellNanos'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<BuyOrSellCreatorCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/buy-or-sell-creator-coin',
    {
      ...params,
      OperationType: 'sell',
    },
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/financial-transactions-api#transfer-creator-coin
 */
export const transferCreatorCoin = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      TransferCreatorCoinRequest,
      | 'SenderPublicKeyBase58Check'
      | 'CreatorPublicKeyBase58Check'
      | 'ReceiverUsernameOrPublicKeyBase58Check'
      | 'CreatorCoinToTransferNanos'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<TransferCreatorCoinResponse>> => {
  return handleSignAndSubmit('api/v0/transfer-creator-coin', params, options);
};
