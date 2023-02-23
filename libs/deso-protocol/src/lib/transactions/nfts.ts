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
  TransferNFTRequest,
  TransferNFTResponse,
  UpdateNFTRequest,
  UpdateNFTResponse,
} from 'deso-protocol-types';
import {
  handleSignAndSubmit,
  TxRequestWithOptionalFeesAndExtraData,
} from '../internal';
import { SubmitResponse } from '../types';

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
  >
): Promise<SubmitResponse<CreateNFTResponse>> => {
  return handleSignAndSubmit('api/v0/create-nft', params);
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
  >
): Promise<SubmitResponse<UpdateNFTResponse>> => {
  return handleSignAndSubmit('api/v0/update-nft', params);
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
  >
): Promise<SubmitResponse<CreateNFTBidResponse>> => {
  return handleSignAndSubmit('api/v0/create-nft-bid', params);
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
  >
): Promise<SubmitResponse<AcceptNFTBidResponse>> => {
  return handleSignAndSubmit('api/v0/create-nft-bid', params);
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
  >
): Promise<SubmitResponse<TransferNFTResponse>> => {
  return handleSignAndSubmit('api/v0/transfer-nft', params);
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
  >
): Promise<SubmitResponse<AcceptNFTTransferResponse>> => {
  return handleSignAndSubmit('api/v0/accept-nft-transfer', params);
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
  >
): Promise<SubmitResponse<BurnNFTResponse>> => {
  return handleSignAndSubmit('api/v0/burn-nft', params);
};
