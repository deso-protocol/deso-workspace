import axios from 'axios';
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
  GetNextNFTShowcaseResponse,
  GetNFTBidsForNFTPostRequest,
  GetNFTBidsForNFTPostResponse,
  GetNFTBidsForUserRequest,
  GetNFTBidsForUserResponse,
  GetNFTCollectionSummaryRequest,
  GetNFTCollectionSummaryResponse,
  GetNFTEntriesForPostHashRequest,
  GetNFTEntriesForPostHashResponse,
  GetNFTsForUserRequest,
  GetNFTsForUserResponse,
  GetNFTShowcaseRequest,
  GetNFTShowcaseResponse,
  RequestOptions,
  TransferNFTRequest,
  TransferNFTResponse,
  UpdateNFTRequest,
  UpdateNFTResponse,
} from 'deso-protocol-types';
import {
  DeSoProtocolSubmitTransactionResponse,
  Identity,
} from '../identity/Identity';
import { Node } from '../Node/Node';

export class Nft {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async getNftsForUser(
    request: Partial<GetNFTsForUserRequest>
  ): Promise<GetNFTsForUserResponse> {
    const endpoint = 'get-nfts-for-user';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }

  public async getNftBidsForUser(
    request: Partial<GetNFTBidsForUserRequest>
  ): Promise<GetNFTBidsForUserResponse> {
    const endpoint = 'get-nft-bids-for-user';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }

  public async getNftBidsForNftPost(
    request: Partial<GetNFTBidsForNFTPostRequest>
  ): Promise<GetNFTBidsForNFTPostResponse> {
    const endpoint = 'get-nft-bids-for-nft-post';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }

  public async getNftShowcase(
    request: Partial<GetNFTShowcaseRequest>
  ): Promise<GetNFTShowcaseResponse> {
    const endpoint = 'get-nft-showcase';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }

  public async getNextNftShowCase(
    request: Partial<GetNFTShowcaseRequest>
  ): Promise<GetNextNFTShowcaseResponse> {
    const endpoint = 'get-next-nft-showcase';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }

  public async getNftCollectionSummary(
    request: Partial<GetNFTCollectionSummaryRequest>
  ): Promise<GetNFTCollectionSummaryResponse> {
    const endpoint = 'get-nft-collection-summary';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }

  public async getNftEntriesForPostHash(
    request: Partial<GetNFTEntriesForPostHashRequest>
  ): Promise<GetNFTEntriesForPostHashResponse> {
    const endpoint = 'get-nft-entries-for-nft-post';
    return (await axios.post(`${this.node.getUri()}/${endpoint}`, request))
      .data;
  }

  public async createNft(
    request: Partial<CreateNFTRequest>,
    options?: RequestOptions
  ): Promise<CreateNFTResponse & DeSoProtocolSubmitTransactionResponse> {
    const endpoint = 'create-nft';
    const apiResponse: CreateNFTResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data as CreateNFTResponse;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then((stRes) => ({ ...apiResponse, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async updateNft(
    request: Partial<UpdateNFTRequest>,
    options?: RequestOptions
  ): Promise<UpdateNFTResponse & DeSoProtocolSubmitTransactionResponse> {
    const endpoint = 'update-nft';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data as UpdateNFTResponse;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then((stRes) => ({ ...apiResponse, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async createNftBid(
    request: Partial<CreateNFTBidRequest>,
    options?: RequestOptions
  ): Promise<CreateNFTBidResponse & DeSoProtocolSubmitTransactionResponse> {
    const endpoint = 'create-nft-bid';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data as CreateNFTBidResponse;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then((stRes) => ({ ...apiResponse, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async acceptNftBid(
    request: Partial<AcceptNFTBidRequest>,
    options?: RequestOptions
  ): Promise<AcceptNFTBidResponse & DeSoProtocolSubmitTransactionResponse> {
    const endpoint = 'accept-nft-bid';
    const apiResponse = (await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data) as AcceptNFTBidResponse;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then((stRes) => ({ ...apiResponse, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async transferNft(
    request: Partial<TransferNFTRequest>,
    options?: RequestOptions
  ): Promise<TransferNFTResponse & DeSoProtocolSubmitTransactionResponse> {
    const endpoint = 'transfer-nft';
    const apiResponse = (await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data) as TransferNFTResponse;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then((stRes) => ({ ...apiResponse, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async acceptNftTransfer(
    request: Partial<AcceptNFTTransferRequest>,
    options?: RequestOptions
  ): Promise<
    AcceptNFTTransferResponse & DeSoProtocolSubmitTransactionResponse
  > {
    const endpoint = 'accept-nft-transfer';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data as AcceptNFTTransferResponse;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then((stRes) => ({ ...apiResponse, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }
  public async burnNft(
    request: Partial<BurnNFTRequest>,
    options?: RequestOptions
  ): Promise<BurnNFTResponse & DeSoProtocolSubmitTransactionResponse> {
    const endpoint = 'burn-nft';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data as BurnNFTResponse;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then((stRes) => ({ ...apiResponse, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }
}
