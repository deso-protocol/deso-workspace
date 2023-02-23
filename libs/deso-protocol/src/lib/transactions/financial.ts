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
  ConstructedAndSubmittedTx,
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/financial-transactions-api#send-deso
 */
export const sendDeso = (
  params: TxRequestWithOptionalFeesAndExtraData<SendDeSoRequest>
): Promise<ConstructedAndSubmittedTx<SendDeSoResponse>> => {
  return handleSignAndSubmit('api/v0/send-deso', params);
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
  >
): Promise<ConstructedAndSubmittedTx<BuyOrSellCreatorCoinResponse>> => {
  return handleSignAndSubmit('api/v0/buy-or-sell-creator-coin', {
    ...params,
    OperationType: 'buy',
  });
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
  >
): Promise<ConstructedAndSubmittedTx<BuyOrSellCreatorCoinResponse>> => {
  return handleSignAndSubmit('api/v0/buy-or-sell-creator-coin', {
    ...params,
    OperationType: 'sell',
  });
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
  >
): Promise<ConstructedAndSubmittedTx<TransferCreatorCoinResponse>> => {
  return handleSignAndSubmit('api/v0/transfer-creator-coin', params);
};
