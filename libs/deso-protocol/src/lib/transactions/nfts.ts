import { PartialWithRequiredFields } from '@deso-core/data';
import {
  AcceptNFTBidRequest,
  AcceptNFTBidResponse,
  AcceptNFTTransferRequest,
  AcceptNFTTransferResponse,
  BurnNFTRequest,
  BurnNFTResponse,
  CreateNFTBidRequest,
  CreateNFTBidResponse,
  CreateNFTRequest,
  CreateNFTResponse,
  RequestOptions,
  TransferNFTRequest,
  TransferNFTResponse,
  UpdateNFTRequest,
  UpdateNFTResponse,
} from 'deso-protocol-types';
import {
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';
import { ConstructedAndSubmittedTx } from '../types';

/**
 * https://docs.deso.org/deso-backend/construct-transactions/nft-transactions-api#create-nft
 */
export const createNFT = async (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreateNFTRequest,
      | 'UpdaterPublicKeyBase58Check'
      | 'NFTPostHashHex'
      | 'NumCopies'
      | 'NFTRoyaltyToCoinBasisPoints'
      | 'NFTRoyaltyToCreatorBasisPoints'
      | 'HasUnlockable'
      | 'IsForSale'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<CreateNFTResponse>> => {
  return handleSignAndSubmit('api/v0/create-nft', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/nft-transactions-api#update-nft
 */
export const updateNFT = async (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      UpdateNFTRequest,
      | 'UpdaterPublicKeyBase58Check'
      | 'NFTPostHashHex'
      | 'SerialNumber'
      | 'MinBidAmountNanos'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<UpdateNFTResponse>> => {
  return handleSignAndSubmit('api/v0/update-nft', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/nft-transactions-api#create-nft-bid
 */
export const createNFTBid = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      CreateNFTBidRequest,
      | 'BidAmountNanos'
      | 'NFTPostHashHex'
      | 'SerialNumber'
      | 'UpdaterPublicKeyBase58Check'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<CreateNFTBidResponse>> => {
  return handleSignAndSubmit('api/v0/create-nft-bid', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/nft-transactions-api#accept-nft-bid
 */
export const acceptNFTBid = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      AcceptNFTBidRequest,
      | 'BidAmountNanos'
      | 'NFTPostHashHex'
      | 'SerialNumber'
      | 'UpdaterPublicKeyBase58Check'
      | 'BidderPublicKeyBase58Check'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<AcceptNFTBidResponse>> => {
  return handleSignAndSubmit('api/v0/accept-nft-bid', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/nft-transactions-api#transfer-nft
 */
export const transferNFT = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      TransferNFTRequest,
      | 'SenderPublicKeyBase58Check'
      | 'ReceiverPublicKeyBase58Check'
      | 'NFTPostHashHex'
      | 'SerialNumber'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<TransferNFTResponse>> => {
  return handleSignAndSubmit('api/v0/transfer-nft', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/nft-transactions-api#accept-nft-transfer
 */
export const acceptNFTTransfer = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      AcceptNFTTransferRequest,
      'UpdaterPublicKeyBase58Check' | 'NFTPostHashHex' | 'SerialNumber'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<AcceptNFTTransferResponse>> => {
  return handleSignAndSubmit('api/v0/accept-nft-transfer', params, options);
};

/**
 * https://docs.deso.org/deso-backend/construct-transactions/nft-transactions-api#burn-nft
 */
export const burnNFT = (
  params: TxRequestWithOptionalFeesAndExtraData<
    PartialWithRequiredFields<
      BurnNFTRequest,
      'UpdaterPublicKeyBase58Check' | 'NFTPostHashHex' | 'SerialNumber'
    >
  >,
  options?: RequestOptions
): Promise<ConstructedAndSubmittedTx<BurnNFTResponse>> => {
  return handleSignAndSubmit('api/v0/burn-nft', params, options);
};
