import { ec } from 'elliptic';
import {
  DAOCoinLimitOrderSimulatedExecutionResult,
  MsgDeSoTxn,
  SubmitTransactionResponse,
  TransactionFee,
  TransactionSpendingLimitResponse,
} from './deso-types';

export interface GetApproveResponse {
  id?: string;
  service: 'identity';
  method: 'approve';
  payload: {
    users: {
      [key: string]: {
        accessLevel: number;
        accessLevelHmac: string;
        btcDepositAddress: string;
        encryptedSeedHex: string;
        hasExtraText: boolean;
        network: string;
      };
    };
    signedTransactionHex: string;
  };
}

export interface IdentityLoginResponse {
  id?: string;
  service: 'identity';
  method: string;
  payload: {
    users: LoginUsers;
    publicKeyAdded: string;
    signedUp: boolean;
  };
}

export interface UploadImageRequest {
  UserPublicKeyBase58Check: string;
  JWT: string;
  file: File;
}

export interface UploadVideoRequest {
  UserPublicKeyBase58Check: string;
  JWT: string;
  file: File;
}

export interface GetVideoStatusRequest {
  videoId: string;
}

export interface UploadVideoResponse {
  streamMediaId: string;
}

export interface LoginUser {
  accessLevel: number;
  accessLevelHmac: string;
  btcDepositAddress: string;
  encryptedSeedHex: string;
  hasExtraText: boolean;
  ethDepositAddress: string;
  network: string;
  encryptedMessagingKeyRandomness?: string;
  derivedPublicKeyBase58Check?: string;
}

export interface LoginUsers {
  [user: string]: LoginUser;
}

export interface IdentityApproveResponse {
  id?: string;
  service: 'identity';
  method: string;
  payload: {
    users: LoginUser;
    signedTransactionHex: string;
  };
}

export interface IdentityJwtResponse {
  id: string;
  service: 'identity';
  payload: {
    jwt: string;
  };
}

export interface IdentitySignRequest {
  id: string;
  service: string;
  method: string;
  payload: {
    accessLevel: number;
    accessLevelHmac: string;
    encryptedSeedHex: string;
    transactionHex?: string;
    signedTransactionHex?: string;
    encryptedMessage?: {
      EncryptedHex: string;
      PublicKey: string;
      IsSender: boolean;
      Legacy: boolean;
    }[];
  };
}

export interface GetDecryptMessagesRequest {
  EncryptedHex: string;
  PublicKey: string;
  IsSender: boolean;
  Legacy: boolean;
  Version: number;
  SenderMessagingPublicKey: string;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingPublicKey: string;
  RecipientMessagingGroupKeyName: string;
}

export interface GetDecryptMessagesResponse {
  EncryptedHex: string;
  PublicKey: string;
  IsSender: boolean;
  Legacy: boolean;
  Version: number;
  SenderMessagingPublicKey: string;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingPublicKey: string;
  RecipientMessagingGroupKeyName: string;
  decryptedMessage: string;
}

export enum DeSoNetwork {
  mainnet = 'mainnet',
  testnet = 'testnet',
}

export interface DerivedPrivateUserInfo {
  derivedSeedHex: string;
  derivedPublicKeyBase58Check: string;
  publicKeyBase58Check: string;
  btcDepositAddress: string;
  ethDepositAddress: string;
  expirationBlock: number;
  network: DeSoNetwork;
  accessSignature: string;
  jwt: string;
  derivedJwt: string;
  messagingPublicKeyBase58Check: string;
  messagingPrivateKey: string;
  messagingKeyName: string;
  messagingKeySignature: string;
  transactionSpendingLimitHex: string | undefined;
}

export enum CreatorCoinLimitOperationString {
  ANY = 'any',
  BUY = 'buy',
  SELL = 'sell',
  TRANSFER = 'transfer',
}

export enum DAOCoinLimitOperationString {
  ANY = 'any',
  MINT = 'mint',
  BURN = 'burn',
  DISABLE_MINTING = 'disable_minting',
  UPDATE_TRANSFER_RESTRICTION_STATUS = 'update_transfer_restriction_status',
  TRANSFER = 'transfer',
}

export type CoinLimitOperationString =
  | DAOCoinLimitOperationString
  | CreatorCoinLimitOperationString;

export interface CoinOperationLimitMap<T extends CoinLimitOperationString> {
  [public_key: string]: OperationToCountMap<T>;
}

export type OperationToCountMap<T extends LimitOperationString> = {
  [operation in T]?: number;
};

export type LimitOperationString =
  | DAOCoinLimitOperationString
  | CreatorCoinLimitOperationString
  | NFTLimitOperationString;
export type CreatorCoinOperationLimitMap =
  CoinOperationLimitMap<CreatorCoinLimitOperationString>;
export type DAOCoinOperationLimitMap =
  CoinOperationLimitMap<DAOCoinLimitOperationString>;
export type DAOCoinLimitOrderLimitMap = {
  [buying_public_key: string]: { [selling_public_key: string]: number };
};

export enum NFTLimitOperationString {
  ANY = 'any',
  UPDATE = 'update',
  BID = 'nft_bid',
  ACCEPT_BID = 'accept_nft_bid',
  TRANSFER = 'transfer',
  BURN = 'burn',
  ACCEPT_TRANSFER = 'accept_nft_transfer',
}
export interface NFTOperationLimitMap {
  [post_hash_hex: string]: {
    [serial_number: number]: OperationToCountMap<NFTLimitOperationString>;
  };
}

export enum TransactionType {
  BasicTransfer = 'BASIC_TRANSFER',
  BitcoinExchange = 'BITCOIN_EXCHANGE',
  PrivateMessage = 'PRIVATE_MESSAGE',
  SubmitPost = 'SUBMIT_POST',
  UpdateProfile = 'UPDATE_PROFILE',
  UpdateBitcoinUSDExchangeRate = 'UPDATE_BITCOIN_USD_EXCHANGE_RATE',
  Follow = 'FOLLOW',
  Like = 'LIKE',
  CreatorCoin = 'CREATOR_COIN',
  SwapIdentity = 'SWAP_IDENTITY',
  UpdateGlobalParams = 'UPDATE_GLOBAL_PARAMS',
  CreatorCoinTransfer = 'CREATOR_COIN_TRANSFER',
  CreateNFT = 'CREATE_NFT',
  UpdateNFT = 'UPDATE_NFT',
  AcceptNFTBid = 'ACCEPT_NFT_BID',
  NFTBid = 'NFT_BID',
  NFTTransfer = 'NFT_TRANSFER',
  AcceptNFTTransfer = 'ACCEPT_NFT_TRANSFER',
  BurnNFT = 'BURN_NFT',
  AuthorizeDerivedKey = 'AUTHORIZE_DERIVED_KEY',
  MessagingGroup = 'MESSAGING_GROUP',
  DAOCoin = 'DAO_COIN',
  DAOCoinTransfer = 'DAO_COIN_TRANSFER',
  DAOCoinLimitOrder = 'DAO_COIN_LIMIT_ORDER',
  CreateUserAssociation = 'CREATE_USER_ASSOCIATION',
  DeleteUserAssociation = 'DELETE_USER_ASSOCIATION',
  CreatePostAssociation = 'CREATE_POST_ASSOCIATION',
  DeletePostAssociation = 'DELETE_POST_ASSOCIATION',
  AccessGroup = 'ACCESS_GROUP',
  AccessGroupMembers = 'ACCESS_GROUP_MEMBERS',
  NewMessage = 'NEW_MESSAGE',
}

export interface IdentityDeriveParams {
  callback?: string;
  webview?: boolean;
  publicKey?: string;
  transactionSpendingLimitResponse?: TransactionSpendingLimitResponse;
  derivedPublicKey?: string;
  deleteKey?: boolean;
  expirationDays?: number;
}

export interface IdentityDeriveQueryParams {
  callback?: string;
  webview?: boolean;
  publicKey?: string;
  transactionSpendingLimitResponse?: string;
  derivedPublicKey?: string;
  deleteKey?: boolean;
  expirationDays?: number;
}

export interface AuthorizeDerivedKeyParams {
  OwnerPublicKeyBase58Check?: string;
  DerivedPublicKeyBase58Check?: string;
  ExpirationBlock?: number;
  DeleteKey: boolean;
  DerivedKeySignature?: boolean;
  TransactionFees: TransactionFee[] | null;
  MinFeeRateNanosPerKB: number;
  TransactionSpendingLimitResponse?: TransactionSpendingLimitResponse;
  Memo?: string;
  AppName?: string;
  ExtraData?: { [k: string]: string };
  ExpirationDays?: number;
}

// Temporary manual creation of classes for DAO coin limit orders

export enum DAOCoinLimitOrderOperationTypeString {
  DAOCoinLimitOrderOperationTypeStringASK = 'ASK',
  DAOCoinLimitOrderOperationTypeStringBID = 'BID',
}

export interface TransactionConstructionResponse {
  TransactionHex: string;
}

// issues with the converter lately so just going to add these to the custom types
export interface DAOCoinMarketOrderWithQuantityRequest {
  TransactorPublicKeyBase58Check: string;
  BuyingDAOCoinCreatorPublicKeyBase58Check: string;
  SellingDAOCoinCreatorPublicKeyBase58Check: string;
  QuantityToFill: number;
  OperationType: string;
  FillType: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[];
}

export interface DAOCoinLimitOrderWithExchangeRateAndQuantityRequest {
  TransactorPublicKeyBase58Check: string;
  BuyingDAOCoinCreatorPublicKeyBase58Check: string;
  SellingDAOCoinCreatorPublicKeyBase58Check: string;
  ExchangeRateCoinsToSellPerCoinToBuy: number;
  QuantityToFill: number;
  OperationType: string;
  MinFeeRateNanosPerKB?: number;
  TransactionFees: TransactionFee[] | null;
}
export enum TxnString {
  TxnStringUnset = 'UNSET',
  TxnStringBlockReward = 'BLOCK_REWARD',
  TxnStringBasicTransfer = 'BASIC_TRANSFER',
  TxnStringBitcoinExchange = 'BITCOIN_EXCHANGE',
  TxnStringPrivateMessage = 'PRIVATE_MESSAGE',
  TxnStringSubmitPost = 'SUBMIT_POST',
  TxnStringUpdateProfile = 'UPDATE_PROFILE',
  TxnStringUpdateBitcoinUSDExchangeRate = 'UPDATE_BITCOIN_USD_EXCHANGE_RATE',
  TxnStringFollow = 'FOLLOW',
  TxnStringLike = 'LIKE',
  TxnStringCreatorCoin = 'CREATOR_COIN',
  TxnStringSwapIdentity = 'SWAP_IDENTITY',
  TxnStringUpdateGlobalParams = 'UPDATE_GLOBAL_PARAMS',
  TxnStringCreatorCoinTransfer = 'CREATOR_COIN_TRANSFER',
  TxnStringCreateNFT = 'CREATE_NFT',
  TxnStringUpdateNFT = 'UPDATE_NFT',
  TxnStringAcceptNFTBid = 'ACCEPT_NFT_BID',
  TxnStringNFTBid = 'NFT_BID',
  TxnStringNFTTransfer = 'NFT_TRANSFER',
  TxnStringAcceptNFTTransfer = 'ACCEPT_NFT_TRANSFER',
  TxnStringBurnNFT = 'BURN_NFT',
  TxnStringAuthorizeDerivedKey = 'AUTHORIZE_DERIVED_KEY',
  TxnStringMessagingGroup = 'MESSAGING_GROUP',
  TxnStringDAOCoin = 'DAO_COIN',
  TxnStringDAOCoinTransfer = 'DAO_COIN_TRANSFER',
  TxnStringDAOCoinLimitOrder = 'DAO_COIN_LIMIT_ORDER',
  TxnStringUndefined = 'TXN_UNDEFINED',
}

export interface MetaMaskInitResponse {
  derivedKeyPair: ec.KeyPair;
  derivedPublicKeyBase58Check: string;
  submissionResponse: SubmitTransactionResponse;
  ethereumAddress: string;
}

export interface OptionalFeesAndExtraData {
  MinFeeRateNanosPerKB?: number;
  TransactionFees?: TransactionFee[] | null;
  ExtraData?: { [key: string]: string };
}

export type TxRequestWithOptionalFeesAndExtraData<T> = Omit<
  T,
  'MinFeeRateNanosPerKB' | 'TransactionFees' | 'ExtraData' | 'InTutorial'
> &
  OptionalFeesAndExtraData;

export interface RequestOptions {
  /**
   * This is only relevant for write operations that require a signed
   * transaction (submit-post, update-profile, etc). It determines whether to
   * broadcast the transaction to the network. Defaults to true. If set to
   * false, the transaction will be constructed but not signed or submitted
   * which is useful for constructing transactions to preview them without
   * broadcasting as a sort of "dry-run".
   */
  broadcast?: boolean;

  /**
   * The node to send the request to. If not provided, either the default node
   * or the configured node will be used.
   */
  nodeURI?: string;

  /**
   * Experimental param. When localConstruction is true, transactions will
   * be constructed locally. This only applies after the balance model fork.
   */
  localConstruction?: boolean;
  /**
   * Function to be used to construct the transaction locally.
   * @param params
   * @returns Promise with the ConstructedTransactionResponse
   */
  constructionFunction?: (
    params: any // TODO: I actually think we want any to be TxRequestWithOptionalFeesAndExtraData
  ) => Promise<ConstructedTransactionResponse>;
}

export type ConstructedTransactionResponse = {
  Transaction: MsgDeSoTxn;
  FeeNanos: number;
  TransactionHex: string;
  TxnHashHex: string;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  SpendAmountNanos: number;
  TransactionIDBase58Check?: string;
  // Buy or sell creator coins (server side only)
  ExpectedDeSoReturnedNanos?: number;
  ExpectedCreatorCoinReturnedNanos?: number;
  FounderRewardGeneratedNanos?: number;
  // SubmitPost (server side only)
  TstampNanos?: number;
  PostHashHex?: string;
  // UpdateProfile (server side only)
  CompProfileCreationTxnHashHex?: string;
  // DAO Coin Limit Order (server side only)
  SimulatedExecutionResult?: DAOCoinLimitOrderSimulatedExecutionResult;
  // Create/Update NFT, NFT Bid, Accept NFT Bid (server side only)
  NFTPostHashHex?: string;
  // Update NFT, NFT Bid, Accept NFT Bid (server side only)
  SerialNumber?: number;
  // NFT Bid (server side only)
  UpdaterPublicKeyBase58Check?: string;
  // NFT Bid, Accept NFT Bid (server side only)
  BidAmountNanos?: number;
  // Accept NFT Bid (server side only)
  BidderPublicKeyBase58Check?: string;
};

export type MessagingGroupPayload = {
  messagingKeySignature: string;
  encryptedToApplicationGroupMessagingPrivateKey: string;
  encryptedToMembersGroupMessagingPrivateKey: string[];
  messagingPublicKeyBase58Check: string;
  encryptedMessagingKeyRandomness: string | undefined;
};

export enum MessagingGroupOperation {
  DEFAULT_KEY = 'DefaultKey',
  CREATE_GROUP = 'CreateGroup',
  ADD_MEMBERS = 'AddMembers',
}

export interface DAOCoinEntry {
  NumberOfHolders: number;
  CoinsInCirculationNanos: string;
  MintingDisabled: boolean;
  TransferRestrictionStatus: string;
}

export interface UploadVideoV2Response {
  asset: {
    id: string;
    playbackId: string;
  };
  tusEndpoint: string;
  url: string;
}
