import { PartialWithRequiredFields } from '@deso-core/data';
import {
  DAOCoinLimitOrderResponse,
  DAOCoinLimitOrderWithCancelOrderIDRequest,
  DAOCoinLimitOrderWithExchangeRateAndQuantityRequest,
  DAOCoinRequest,
  DAOCoinResponse,
  TransferDAOCoinRequest,
  TransferDAOCoinResponse,
} from 'deso-protocol-types';
import {
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';
import { ConstructedAndSubmittedTx, TransactionOptions } from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin
 */
export const burnDeSoToken = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<DAOCoinRequest, 'OperationType'>,
      | 'UpdaterPublicKeyBase58Check'
      | 'ProfilePublicKeyBase58CheckOrUsername'
      | 'CoinsToBurnNanos'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/dao-coin',
    {
      ...params,
      OperationType: 'burn',
    },
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin
 */
export const mintDeSoToken = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<DAOCoinRequest, 'OperationType'>,
      | 'UpdaterPublicKeyBase58Check'
      | 'ProfilePublicKeyBase58CheckOrUsername'
      | 'CoinsToMintNanos'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/dao-coin',
    {
      ...params,
      OperationType: 'mint',
    },
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin
 */
export const updateDeSoTokenTransferRestrictionStatus = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<DAOCoinRequest, 'OperationType' | 'TransferRestrictionStatus'>,
      'UpdaterPublicKeyBase58Check' | 'ProfilePublicKeyBase58CheckOrUsername'
    > & {
      TransferRestrictionStatus:
        | 'unrestricted'
        | 'profile_owner_only'
        | 'dao_members_only'
        | 'permanently_unrestricted';
    }
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/dao-coin',
    {
      ...params,
      OperationType: 'update_transfer_restriction_status',
    },
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#transfer-deso-token-dao-coin
 */
export const transferDeSoToken = (
  params: TxRequestWithOptionalFeesAndExtraData<TransferDAOCoinRequest>,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<TransferDAOCoinResponse>> => {
  return handleSignAndSubmit('api/v0/transfer-dao-coin', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin-limit-order
 */
export const buyDeSoTokenLimitOrder = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<
        DAOCoinLimitOrderWithExchangeRateAndQuantityRequest,
        'SellingDAOCoinCreatorPublicKeyBase58Check' | 'OperationType'
      >,
      | 'TransactorPublicKeyBase58Check'
      | 'BuyingDAOCoinCreatorPublicKeyBase58Check'
      | 'ExchangeRateCoinsToSellPerCoinToBuy'
      | 'QuantityToFill'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinLimitOrderResponse>> => {
  return handleSignAndSubmit(
    'api/v0/create-dao-coin-limit-order',
    {
      ...params,
      SellingDAOCoinCreatorPublicKeyBase58Check: '',
      OperationType: 'BID',
    },
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin-limit-order
 */
export const sellDeSoTokenLimitOrder = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<
        DAOCoinLimitOrderWithExchangeRateAndQuantityRequest,
        'BuyingDAOCoinCreatorPublicKeyBase58Check' | 'OperationType'
      >,
      | 'TransactorPublicKeyBase58Check'
      | 'SellingDAOCoinCreatorPublicKeyBase58Check'
      | 'ExchangeRateCoinsToSellPerCoinToBuy'
      | 'QuantityToFill'
    >
  >,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinLimitOrderResponse>> => {
  return handleSignAndSubmit(
    'api/v0/create-dao-coin-limit-order',
    {
      ...params,
      SellingDAOCoinCreatorPublicKeyBase58Check: '',
      OperationType: 'ASK',
    },
    options
  );
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#cancel-deso-token-dao-coin-limit-order
 */
export const cancelDeSoTokenLimitOrder = (
  params: TxRequestWithOptionalFeesAndExtraData<DAOCoinLimitOrderWithCancelOrderIDRequest>,
  options?: TransactionOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinLimitOrderResponse>> => {
  return handleSignAndSubmit(
    'api/v0/cancel-dao-coin-limit-order',
    params,
    options
  );
};
