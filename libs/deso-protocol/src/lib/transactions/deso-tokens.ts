import { hexToBytes } from '@noble/hashes/utils';
import {
  ConstructedTransactionResponse,
  DAOCoinLimitOrderResponse,
  DAOCoinLimitOrderWithCancelOrderIDRequest,
  DAOCoinLimitOrderWithExchangeRateAndQuantityRequest,
  DAOCoinRequest,
  DAOCoinResponse,
  RequestOptions,
  TransferDAOCoinRequest,
  TransferDAOCoinResponse,
  TxRequestWithOptionalFeesAndExtraData,
} from '../backend-types';
import { PartialWithRequiredFields } from '../data';
import {
  bs58PublicKeyToCompressedBytes,
  TransactionMetadataDAOCoin,
  TransactionMetadataTransferDAOCoin,
} from '../identity';
import {
  constructBalanceModelTx,
  handleSignAndSubmit,
  isMaybeDeSoPublicKey,
} from '../internal';
import { ConstructedAndSubmittedTx } from '../types';
/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin
 */
export type ConstructBurnDeSoTokenRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<DAOCoinRequest, 'OperationType'>,
      | 'UpdaterPublicKeyBase58Check'
      | 'ProfilePublicKeyBase58CheckOrUsername'
      | 'CoinsToBurnNanos'
    >
  >;
export const burnDeSoToken = (
  params: ConstructBurnDeSoTokenRequestParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/dao-coin',
    {
      ...params,
      OperationType: 'burn',
    },
    { ...options, constructionFunction: constructBurnDeSoTokenTransaction }
  );
};

export const constructBurnDeSoTokenTransaction = (
  params: ConstructBurnDeSoTokenRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataDAOCoin();
  // TODO: I know we're passing hex strings representing uint256, but need
  // to figure out how they go to bytes.
  if (!isMaybeDeSoPublicKey(params.ProfilePublicKeyBase58CheckOrUsername)) {
    return Promise.reject(
      'must provide profile public key, not username for local transaction construction'
    );
  }
  metadata.coinsToBurnNanos = hexToBytes(
    params.CoinsToBurnNanos.replace('0x', 'x')
  );
  metadata.profilePublicKey = bs58PublicKeyToCompressedBytes(
    params.ProfilePublicKeyBase58CheckOrUsername
  );
  metadata.operationType = 1;
  return constructBalanceModelTx(params.UpdaterPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin
 */
export type MintDeSoTokenRequestParams = TxRequestWithOptionalFeesAndExtraData<
  PartialWithRequiredFields<
    Omit<DAOCoinRequest, 'OperationType'>,
    | 'UpdaterPublicKeyBase58Check'
    | 'ProfilePublicKeyBase58CheckOrUsername'
    | 'CoinsToMintNanos'
  >
>;
export const mintDeSoToken = (
  params: MintDeSoTokenRequestParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/dao-coin',
    {
      ...params,
      OperationType: 'mint',
    },
    { ...options, constructionFunction: constructMintDeSoTokenTransaction }
  );
};

export const constructMintDeSoTokenTransaction = (
  params: MintDeSoTokenRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataDAOCoin();
  // TODO: I know we're passing hex strings representing uint256, but need
  // to figure out how they go to bytes.
  if (!isMaybeDeSoPublicKey(params.ProfilePublicKeyBase58CheckOrUsername)) {
    return Promise.reject(
      'must provide profile public key, not username for local transaction construction'
    );
  }
  metadata.coinsToMintNanos = hexToBytes(
    params.CoinsToMintNanos.replace('0x', 'x')
  );
  metadata.profilePublicKey = bs58PublicKeyToCompressedBytes(
    params.ProfilePublicKeyBase58CheckOrUsername
  );
  metadata.operationType = 0;
  return constructBalanceModelTx(params.UpdaterPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin
 */
export type UpdateDeSoTokenTransferRestrictionStatusRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
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
  >;
export const updateDeSoTokenTransferRestrictionStatus = (
  params: UpdateDeSoTokenTransferRestrictionStatusRequestParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/dao-coin',
    {
      ...params,
      OperationType: 'update_transfer_restriction_status',
    },
    {
      ...options,
      constructionFunction:
        constructUpdateDeSoTokenTransferRestrictionStatusTransaction,
    }
  );
};

export const constructUpdateDeSoTokenTransferRestrictionStatusTransaction = (
  params: UpdateDeSoTokenTransferRestrictionStatusRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataDAOCoin();
  // TODO: I know we're passing hex strings representing uint256, but need
  // to figure out how they go to bytes.
  if (!isMaybeDeSoPublicKey(params.ProfilePublicKeyBase58CheckOrUsername)) {
    return Promise.reject(
      'must provide profile public key, not username for local transaction construction'
    );
  }
  metadata.profilePublicKey = bs58PublicKeyToCompressedBytes(
    params.ProfilePublicKeyBase58CheckOrUsername
  );
  metadata.operationType = 3;
  let transferRestrictionStatus: number;
  switch (params.TransferRestrictionStatus) {
    case 'dao_members_only':
      transferRestrictionStatus = 2;
      break;
    case 'permanently_unrestricted':
      transferRestrictionStatus = 3;
      break;
    case 'profile_owner_only':
      transferRestrictionStatus = 1;
      break;
    case 'unrestricted':
      transferRestrictionStatus = 0;
      break;
    default:
      return Promise.reject('invalid transfer restriction status value');
  }
  metadata.transferRestrictionStatus = transferRestrictionStatus;
  return constructBalanceModelTx(params.UpdaterPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};

export type DisableMintingDeSoTokenRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<DAOCoinRequest, 'OperationType'>,
      'UpdaterPublicKeyBase58Check' | 'ProfilePublicKeyBase58CheckOrUsername'
    >
  >;
export const disableMintingDeSoToken = (
  params: DisableMintingDeSoTokenRequestParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinResponse>> => {
  return handleSignAndSubmit(
    'api/v0/dao-coin',
    {
      ...params,
      OperationType: 'disable_minting',
    },
    { ...options, constructionFunction: constructDisableMintingDeSoToken }
  );
};

export const constructDisableMintingDeSoToken = (
  params: DisableMintingDeSoTokenRequestParams
): Promise<ConstructedTransactionResponse> => {
  const metadata = new TransactionMetadataDAOCoin();
  // TODO: I know we're passing hex strings representing uint256, but need
  // to figure out how they go to bytes.
  if (!isMaybeDeSoPublicKey(params.ProfilePublicKeyBase58CheckOrUsername)) {
    return Promise.reject(
      'must provide profile public key, not username for local transaction construction'
    );
  }
  metadata.profilePublicKey = bs58PublicKeyToCompressedBytes(
    params.ProfilePublicKeyBase58CheckOrUsername
  );
  metadata.operationType = 2;
  return constructBalanceModelTx(params.UpdaterPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#transfer-deso-token-dao-coin
 */
export const transferDeSoToken = (
  params: TxRequestWithOptionalFeesAndExtraData<TransferDAOCoinRequest>,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<TransferDAOCoinResponse>> => {
  return handleSignAndSubmit('api/v0/transfer-dao-coin', params, {
    ...options,
    constructionFunction: constructTransferDeSoToken,
  });
};

export const constructTransferDeSoToken = (
  params: TxRequestWithOptionalFeesAndExtraData<TransferDAOCoinRequest>
): Promise<ConstructedTransactionResponse> => {
  if (!isMaybeDeSoPublicKey(params.ProfilePublicKeyBase58CheckOrUsername)) {
    return Promise.reject(
      'must provide profile public key, not username for local transaction construction'
    );
  }
  const metadata = new TransactionMetadataTransferDAOCoin();
  metadata.daoCoinToTransferNanos = hexToBytes(
    params.DAOCoinToTransferNanos.replace('0x', 'x')
  );
  metadata.profilePublicKey = bs58PublicKeyToCompressedBytes(
    params.ProfilePublicKeyBase58CheckOrUsername
  );
  metadata.receiverPublicKey = bs58PublicKeyToCompressedBytes(
    params.ReceiverPublicKeyBase58CheckOrUsername
  );
  return constructBalanceModelTx(params.SenderPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};

// TODO: Balance model transaction construction for limit orders.
/**
 * https://docs.deso.org/deso-backend/construct-transactions/dao-transactions-api#create-deso-token-dao-coin-limit-order
 */
export const buyDeSoTokenLimitOrder = (
  params: PartialWithRequiredFields<
    Omit<
      DAOCoinLimitOrderWithExchangeRateAndQuantityRequest,
      'SellingDAOCoinCreatorPublicKeyBase58Check' | 'OperationType'
    >,
    | 'TransactorPublicKeyBase58Check'
    | 'BuyingDAOCoinCreatorPublicKeyBase58Check'
    | 'ExchangeRateCoinsToSellPerCoinToBuy'
    | 'QuantityToFill'
  >,
  options?: RequestOptions
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
  options?: RequestOptions
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
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<DAOCoinLimitOrderResponse>> => {
  return handleSignAndSubmit(
    'api/v0/cancel-dao-coin-limit-order',
    params,
    options
  );
};
