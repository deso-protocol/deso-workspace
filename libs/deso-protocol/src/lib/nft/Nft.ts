import axios from 'axios';
import {
  AcceptNFTBidRequest,
  AcceptNFTBidResponse,
  AcceptNFTTransferRequest,
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
  TransferNFTRequest,
  TransferNFTResponse,
  UpdateNFTRequest,
  UpdateNFTResponse,
} from 'deso-protocol-types';
import { Node } from '../node/Node';
import { Identity } from '../identity/Identity';

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
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getNftBidsForUser(
    request: Partial<GetNFTBidsForUserRequest>
  ): Promise<GetNFTBidsForUserResponse> {
    const endpoint = 'get-nft-bids-for-user';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getNftBidsForNftPost(
    request: Partial<GetNFTBidsForNFTPostRequest>
  ): Promise<GetNFTBidsForNFTPostResponse> {
    const endpoint = 'get-nft-bids-for-nft-post';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getNftShowcase(
    request: Partial<GetNFTShowcaseRequest>
  ): Promise<GetNFTShowcaseResponse> {
    const endpoint = 'get-nft-showcase';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getNextNftShowCase(
    request: Partial<GetNFTShowcaseRequest>
  ): Promise<GetNextNFTShowcaseResponse> {
    const endpoint = 'get-next-nft-showcase';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getNftCollectionSummary(
    request: Partial<GetNFTCollectionSummaryRequest>
  ): Promise<GetNFTCollectionSummaryResponse> {
    const endpoint = 'get-nft-collection-summary';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getNftEntriesForPostHash(
    request: Partial<GetNFTEntriesForPostHashRequest>
  ): Promise<GetNFTEntriesForPostHashResponse> {
    const endpoint = 'get-nft-entries-for-nft-post';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async createNft(
    request: Partial<CreateNFTRequest>
  ): Promise<CreateNFTResponse> {
    const endpoint = 'create-nft';
    const apiResponse: CreateNFTResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async updateNft(
    request: Partial<UpdateNFTRequest>
  ): Promise<UpdateNFTResponse> {
    const endpoint = 'update-nft';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async createNftBid(
    request: Partial<CreateNFTBidRequest>
  ): Promise<CreateNFTBidResponse> {
    const endpoint = 'create-nft-bid';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async acceptNftBid(
    request: Partial<AcceptNFTBidRequest>
  ): Promise<AcceptNFTBidResponse> {
    const endpoint = 'accept-nft-bid';
    const apiResponse = await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async transferNft(
    request: Partial<TransferNFTRequest>
  ): Promise<TransferNFTResponse> {
    const endpoint = 'transfer-nft';
    const apiResponse = await (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async acceptNftTransfer(
    request: Partial<AcceptNFTTransferRequest>
  ): Promise<TransferNFTResponse> {
    const endpoint = 'accept-nft-transfer';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async burnNft(
    request: Partial<BurnNFTRequest>
  ): Promise<BurnNFTResponse> {
    const endpoint = 'burn-nft';
    const apiResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }
}
