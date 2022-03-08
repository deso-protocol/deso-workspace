import axios from 'axios';
import {
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
} from '@deso-workspace/deso-types';
import { Node } from '../../index';
import { Identity } from '../identity/Identity';

export class Nft {
  node: Node;
  identity: Identity;
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
}
