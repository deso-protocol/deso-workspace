export interface CoinEntry {
  CreatorBasisPoints: number;
  DeSoLockedNanos: number;
  NumberOfHolders: number;
  CoinsInCirculationNanos: number;
  CoinWatermarkNanos: number;
  BitCloutLockedNanos: number;
}

export interface DAOCoinEntry {
  NumberOfHolders: number;
  CoinsInCirculationNanos: string;
  MintingDisabled: boolean;
  TransferRestrictionStatus: string;
}

export interface ExtraData {
  DerivedPublicKey: string;
  DiscordURL: string;
  DisplayName: string;
  FeaturedImageURL: string;
  LargeProfilePicURL: string;
  MarkdownDescription: string;
  TelegramURL: string;
  TwitterURL: string;
  WebsiteURL: string;
}

export interface BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY {
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
  ExtraData: ExtraData;
  DESOBalanceNanos: number;
  BestExchangeRateDESOPerDAOCoin: number;
}

export interface PublicKeyToProfileEntry {
  BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY: BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY;
}

export interface ExtraData2 {
  RecipientMessagingGroupKeyName: string;
  RecipientMessagingPublicKey: string;
  SenderMessagingGroupKeyName: string;
  SenderMessagingPublicKey: string;
  V: string;
}

export interface Message {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  EncryptedText: string;
  TstampNanos: any;
  IsSender: boolean;
  V2: boolean;
  Version: number;
  SenderMessagingPublicKey: string;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingPublicKey: string;
  RecipientMessagingGroupKeyName: string;
  ExtraData: ExtraData2;
}

export interface CoinEntry2 {
  CreatorBasisPoints: number;
  DeSoLockedNanos: number;
  NumberOfHolders: number;
  CoinsInCirculationNanos: number;
  CoinWatermarkNanos: number;
  BitCloutLockedNanos: number;
}

export interface DAOCoinEntry2 {
  NumberOfHolders: number;
  CoinsInCirculationNanos: string;
  MintingDisabled: boolean;
  TransferRestrictionStatus: string;
}

export interface ExtraData3 {
  DerivedPublicKey: string;
  DiscordURL: string;
  DisplayName: string;
  FeaturedImageURL: string;
  LargeProfilePicURL: string;
  MarkdownDescription: string;
  TelegramURL: string;
  TwitterURL: string;
  WebsiteURL: string;
}

export interface ProfileEntryResponse {
  PublicKeyBase58Check: string;
  Username: string;
  Description: string;
  IsHidden: boolean;
  IsReserved: boolean;
  IsVerified: boolean;
  Comments?: any;
  Posts?: any;
  CoinEntry: CoinEntry2;
  DAOCoinEntry: DAOCoinEntry2;
  CoinPriceDeSoNanos: number;
  CoinPriceBitCloutNanos: number;
  UsersThatHODL?: any;
  IsFeaturedTutorialWellKnownCreator: boolean;
  IsFeaturedTutorialUpAndComingCreator: boolean;
  ExtraData: ExtraData3;
  DESOBalanceNanos: number;
  BestExchangeRateDESOPerDAOCoin: number;
}

export interface OrderedContactsWithMessage {
  PublicKeyBase58Check: string;
  Messages: Message[];
  ProfileEntryResponse: ProfileEntryResponse;
  NumMessagesRead: number;
}

export interface UnreadStateByContact {
  BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY: boolean;
}

export interface MessagingGroup {
  GroupOwnerPublicKeyBase58Check: string;
  MessagingPublicKeyBase58Check: string;
  MessagingGroupKeyName: string;
  MessagingGroupMembers?: any;
  EncryptedKey: string;
  ExtraData?: any;
}

export interface MessagingGroupResponse {
  PublicKeyToProfileEntry: PublicKeyToProfileEntry;
  OrderedContactsWithMessages: OrderedContactsWithMessage[];
  UnreadStateByContact: UnreadStateByContact;
  NumberOfUnreadThreads: number;
  MessagingGroups: MessagingGroup[];
}
