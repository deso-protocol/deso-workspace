import { AcceptNFTBidRequest, AcceptNFTBidResponse, AcceptNFTTransferRequest, BurnNFTRequest, BurnNFTResponse, CreateNFTBidRequest, CreateNFTBidResponse, CreateNFTRequest, CreateNFTResponse, GetNextNFTShowcaseResponse, GetNFTBidsForNFTPostRequest, GetNFTBidsForNFTPostResponse, GetNFTBidsForUserRequest, GetNFTBidsForUserResponse, GetNFTCollectionSummaryRequest, GetNFTCollectionSummaryResponse, GetNFTEntriesForPostHashRequest, GetNFTEntriesForPostHashResponse, GetNFTsForUserRequest, GetNFTsForUserResponse, GetNFTShowcaseRequest, GetNFTShowcaseResponse, RequestOptions, TransferNFTRequest, TransferNFTResponse, UpdateNFTRequest, UpdateNFTResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
export declare class Nft {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    getNftsForUser(request: Partial<GetNFTsForUserRequest>): Promise<GetNFTsForUserResponse>;
    getNftBidsForUser(request: Partial<GetNFTBidsForUserRequest>): Promise<GetNFTBidsForUserResponse>;
    getNftBidsForNftPost(request: Partial<GetNFTBidsForNFTPostRequest>): Promise<GetNFTBidsForNFTPostResponse>;
    getNftShowcase(request: Partial<GetNFTShowcaseRequest>): Promise<GetNFTShowcaseResponse>;
    getNextNftShowCase(request: Partial<GetNFTShowcaseRequest>): Promise<GetNextNFTShowcaseResponse>;
    getNftCollectionSummary(request: Partial<GetNFTCollectionSummaryRequest>): Promise<GetNFTCollectionSummaryResponse>;
    getNftEntriesForPostHash(request: Partial<GetNFTEntriesForPostHashRequest>): Promise<GetNFTEntriesForPostHashResponse>;
    createNft(request: Partial<CreateNFTRequest>, options?: RequestOptions): Promise<CreateNFTResponse>;
    updateNft(request: Partial<UpdateNFTRequest>, options?: RequestOptions): Promise<UpdateNFTResponse>;
    createNftBid(request: Partial<CreateNFTBidRequest>, options?: RequestOptions): Promise<CreateNFTBidResponse>;
    acceptNftBid(request: Partial<AcceptNFTBidRequest>, options?: RequestOptions): Promise<AcceptNFTBidResponse>;
    transferNft(request: Partial<TransferNFTRequest>, options?: RequestOptions): Promise<TransferNFTResponse>;
    acceptNftTransfer(request: Partial<AcceptNFTTransferRequest>, options?: RequestOptions): Promise<TransferNFTResponse>;
    burnNft(request: Partial<BurnNFTRequest>, options?: RequestOptions): Promise<BurnNFTResponse>;
}
