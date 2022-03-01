import { CoinEntry, DAOCoinEntry } from "./Coin.interface";

export interface GetMessageRequest {
  PublicKeyBase58Check: string;
  FetchAfterPublicKeyBase58Check: string;
  NumToFetch: number;
  HoldersOnly: boolean;
  HoldingsOnly: boolean;
  FollowersOnly: boolean;
  FollowingOnly: boolean;
  SortAlgorithm: string;
}

export interface Message {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  EncryptedText: string;
  TstampNanos: number;
  IsSender: boolean;
  V2: boolean;
  Version: number;
  SenderMessagingPublicKey: string;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingPublicKey: string;
  RecipientMessagingGroupKeyName: string;
}

export interface OrderedContactsWithMessages {
  PublicKeyBase58Check: string;
  Messages: Message[];
  ProfileEntryResponse: {
    PublicKeyBase58Check: string;
    Username: string;
    Description: string;
    IsHidden: boolean;
    IsReserved: boolean;
    IsVerified: boolean;
    Comments?: any;
    Posts?: any;
    CoinEntry: CoinEntry;
    DAOCoinEntry: DAOCoinEntry;
    CoinPriceDeSoNanos: number;
    CoinPriceBitCloutNanos: number;
    UsersThatHODL?: any;
    IsFeaturedTutorialWellKnownCreator: boolean;
    IsFeaturedTutorialUpAndComingCreator: boolean;
  };
  NumMessagesRead: number;
}

export interface SendIframeMessageRequest {
  SenderPublicKeyBase58Check: string;
  SenderMessagingKeyName: "default-key";
  RecipientPublicKeyBase58Check: string;
  RecipientMessagingKeyName: "default-key";
}
export interface SendMessageRequest {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  EncryptedMessageText: string;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingGroupKeyName: string;
  MinFeeRateNanosPerKB: number;
}
