import {
  BuyOrSellCreatorCoinRequest,
  BuyOrSellCreatorCoinResponse,
  ConstructedTransactionResponse,
  RequestOptions,
  SendDeSoRequest,
  SendDeSoResponse,
  TransferCreatorCoinRequest,
  TransferCreatorCoinResponse,
  TxRequestWithOptionalFeesAndExtraData,
} from '../backend-types';
import { PartialWithRequiredFields } from '../data';
import {
  bs58PublicKeyToCompressedBytes,
  TransactionMetadataBasicTransfer,
  TransactionMetadataCreatorCoinTransfer,
  TransactionOutput,
} from '../identity';
import {
  constructBalanceModelTx,
  handleSignAndSubmit,
  isMaybeDeSoPublicKey,
} from '../internal';
import { ConstructedAndSubmittedTx } from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/financial-transactions-api#send-deso
 */
export const sendDeso = (
  params: TxRequestWithOptionalFeesAndExtraData<SendDeSoRequest>,
  options?: RequestOptions
): Promise<
  ConstructedAndSubmittedTx<SendDeSoResponse | ConstructedTransactionResponse>
> => {
  return handleSignAndSubmit('api/v0/send-deso', params, {
    ...options,
    constructionFunction: constructSendDeSoTransaction,
  });
};

export const constructSendDeSoTransaction = (
  params: TxRequestWithOptionalFeesAndExtraData<SendDeSoRequest>
): Promise<ConstructedTransactionResponse> => {
  const transactionOutput = new TransactionOutput();
  transactionOutput.amountNanos = params.AmountNanos;
  transactionOutput.publicKey = bs58PublicKeyToCompressedBytes(
    params.RecipientPublicKeyOrUsername
  );
  return constructBalanceModelTx(
    params.SenderPublicKeyBase58Check,
    new TransactionMetadataBasicTransfer(),
    {
      Outputs: [transactionOutput],
      ExtraData: params.ExtraData,
      MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
      TransactionFees: params.TransactionFees,
    }
  );
};

// TODO: BUY creator coins is hard. Need to move some
// big float math into js.
/**
 * https://docs.deso.org/deso-backend/construct-transactions/financial-transactions-api#buy-or-sell-creator-coin
 */
export type BuyCreatorCoinRequestParams = TxRequestWithOptionalFeesAndExtraData<
  PartialWithRequiredFields<
    Omit<
      BuyOrSellCreatorCoinRequest,
      'CreatorCoinToSellNanos' | 'OperationType'
    >,
    | 'UpdaterPublicKeyBase58Check'
    | 'CreatorPublicKeyBase58Check'
    | 'DeSoToSellNanos'
  >
>;
export const buyCreatorCoin = (
  params: BuyCreatorCoinRequestParams,
  options?: RequestOptions
): Promise<
  ConstructedAndSubmittedTx<
    BuyOrSellCreatorCoinResponse | ConstructedTransactionResponse
  >
> => {
  return handleSignAndSubmit(
    'api/v0/buy-or-sell-creator-coin',
    {
      ...params,
      OperationType: 'buy',
    },
    options
  );
};

// TODO: SELL creator coins is hard. Need to move some
// big float math into js.
/**
 * https://docs.deso.org/deso-backend/construct-transactions/financial-transactions-api#buy-or-sell-creator-coin
 */

export type SellCreatorCoinRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      Omit<BuyOrSellCreatorCoinRequest, 'DesoToSellNanos' | 'OperationType'>,
      | 'UpdaterPublicKeyBase58Check'
      | 'CreatorPublicKeyBase58Check'
      | 'CreatorCoinToSellNanos'
    >
  >;

export const sellCreatorCoin = (
  params: SellCreatorCoinRequestParams,
  options?: RequestOptions
): Promise<
  ConstructedAndSubmittedTx<
    BuyOrSellCreatorCoinResponse | ConstructedTransactionResponse
  >
> => {
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
export type TransferCreatorCoinRequestParams =
  TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      TransferCreatorCoinRequest,
      | 'SenderPublicKeyBase58Check'
      | 'CreatorPublicKeyBase58Check'
      | 'ReceiverUsernameOrPublicKeyBase58Check'
      | 'CreatorCoinToTransferNanos'
    >
  >;
export const transferCreatorCoin = (
  params: TransferCreatorCoinRequestParams,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<TransferCreatorCoinResponse>> => {
  return handleSignAndSubmit('api/v0/transfer-creator-coin', params, {
    ...options,
    constructionFunction: constructTransferCreatorCoinTransaction,
  });
};

export const constructTransferCreatorCoinTransaction = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      TransferCreatorCoinRequest,
      | 'SenderPublicKeyBase58Check'
      | 'CreatorPublicKeyBase58Check'
      | 'ReceiverUsernameOrPublicKeyBase58Check'
      | 'CreatorCoinToTransferNanos'
    >
  >
): Promise<ConstructedTransactionResponse> => {
  if (!isMaybeDeSoPublicKey(params.ReceiverUsernameOrPublicKeyBase58Check)) {
    return Promise.reject(
      'must provide public key, not user name for local construction'
    );
  }
  const metadata = new TransactionMetadataCreatorCoinTransfer();
  metadata.creatorCoinToTransferNanos = params.CreatorCoinToTransferNanos;
  metadata.profilePublicKey = bs58PublicKeyToCompressedBytes(
    params.CreatorPublicKeyBase58Check
  );
  metadata.receiverPublicKey = bs58PublicKeyToCompressedBytes(
    params.ReceiverUsernameOrPublicKeyBase58Check
  );
  return constructBalanceModelTx(params.SenderPublicKeyBase58Check, metadata, {
    ExtraData: params.ExtraData,
    MinFeeRateNanosPerKB: params.MinFeeRateNanosPerKB,
    TransactionFees: params.TransactionFees,
  });
};
