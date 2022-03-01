export interface Post {
  PostHashHex: string;
  PosterPublicKeyBase58Check: string;
  ParentStakeID: string;
  Body: string;
  ImageURLs?: any;
  VideoURLs?: any;
  RepostedPostEntryResponse?: any;
  CreatorBasisPoints: number;
  StakeMultipleBasisPoints: number;
  TimestampNanos: any;
  IsHidden: boolean;
  ConfirmationBlockHeight: number;
  InMempool: boolean;
  ProfileEntryResponse?: any;
  Comments?: any;
  LikeCount: number;
  DiamondCount: number;
  PostEntryReaderState: PostEntryReaderState;
  InGlobalFeed: boolean;
  InHotFeed: boolean;
  IsPinned: boolean;
  PostExtraData: PostExtraData;
  CommentCount: number;
  RepostCount: number;
  QuoteRepostCount: number;
  ParentPosts?: any;
  IsNFT: boolean;
  NumNFTCopies: number;
  NumNFTCopiesForSale: number;
  NumNFTCopiesBurned: number;
  HasUnlockable: boolean;
  NFTRoyaltyToCreatorBasisPoints: number;
  NFTRoyaltyToCoinBasisPoints: number;
  AdditionalDESORoyaltiesMap: AdditionalDESORoyaltiesMap;
  AdditionalCoinRoyaltiesMap: AdditionalCoinRoyaltiesMap;
  DiamondsFromSender: number;
  HotnessScore: number;
  PostMultiplier: number;
  RecloutCount: number;
  QuoteRecloutCount: number;
  RecloutedPostEntryResponse?: any;
}

export interface PostInfoResponse {
  Posts: Post[];
  LastPostHashHex: string;
}

export interface PostInfoRequest {
  PublicKeyBase58Check?: string;
  Username?: string;
  ReaderPublicKeyBase58Check?: string;
  LastPostHashHex?: string;
  NumToFetch?: number;
  MediaRequired?: boolean;
}

export interface PostEntryReaderState {
  LikedByReader: boolean;
  DiamondLevelBestowed: number;
  RepostedByReader: boolean;
  RepostPostHashHex: string;
}

export interface PostExtraData {
  Language: string;
  Node: string;
}

export interface AdditionalDESORoyaltiesMap {}

export interface AdditionalCoinRoyaltiesMap {}
