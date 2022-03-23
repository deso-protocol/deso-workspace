import { AcceptNFTBidRequest, AcceptNFTBidResponse, AcceptNFTTransferRequest, BurnNFTRequest, BurnNFTResponse, CreateNFTBidRequest, CreateNFTBidResponse, CreateNFTRequest, CreateNFTResponse, GetNextNFTShowcaseResponse, GetNFTBidsForNFTPostRequest, GetNFTBidsForNFTPostResponse, GetNFTBidsForUserRequest, GetNFTBidsForUserResponse, GetNFTCollectionSummaryRequest, GetNFTCollectionSummaryResponse, GetNFTEntriesForPostHashRequest, GetNFTEntriesForPostHashResponse, GetNFTsForUserRequest, GetNFTsForUserResponse, GetNFTShowcaseRequest, GetNFTShowcaseResponse, TransferNFTRequest, TransferNFTResponse, UpdateNFTRequest, UpdateNFTResponse } from 'deso-protocol-types';
import { Node } from '../node/Node';
import { Identity } from '../identity/Identity';
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
    createNft(request: Partial<CreateNFTRequest>): Promise<CreateNFTResponse>;
    updateNft(request: Partial<UpdateNFTRequest>): Promise<UpdateNFTResponse>;
    createNftBid(request: Partial<CreateNFTBidRequest>): Promise<CreateNFTBidResponse>;
    acceptNftBid(request: Partial<AcceptNFTBidRequest>): Promise<AcceptNFTBidResponse>;
    transferNft(request: Partial<TransferNFTRequest>): Promise<TransferNFTResponse>;
    acceptNftTransfer(request: Partial<AcceptNFTTransferRequest>): Promise<TransferNFTResponse>;
    burnNft(request: Partial<BurnNFTRequest>): Promise<BurnNFTResponse>;
}
