/* eslint-disable @typescript-eslint/ban-types */
// this file was automatically generated, DO NOT EDIT
export type DB = any;

// struct2ts:sync.Mutex
export type Mutex = any;

// struct2ts:github.com/oleiade/lane.Deque
export type Deque = any;

// struct2ts:github.com/decred/dcrd/lru.KVCache
export type KVCache = any;

// struct2ts:types/generated/types.SnapshotOperationChannel
export interface SnapshotOperationChannel {
  OperationChannel: SnapshotOperation;
  StateSemaphore: number;
  StateSemaphoreLock: Mutex;
}

// struct2ts:types/generated/types.StateChecksum
export type StateChecksum = any;

// struct2ts:types/generated/types.EncoderMigration
export type EncoderMigration = any;

// struct2ts:types/generated/types.SnapshotEpochMetadata
export interface SnapshotEpochMetadata {
  SnapshotBlockHeight: number;
  FirstSnapshotBlockHeight: number;
  CurrentEpochChecksumBytes: number[] | null;
  CurrentEpochBlockHash: number[];
}

// struct2ts:types/generated/types.SnapshotStatus
export interface SnapshotStatus {
  MainDBSemaphore: number;
  AncestralDBSemaphore: number;
  CurrentBlockHeight: number;
  MemoryLock: Mutex;
}

// struct2ts:types/generated/types.Snapshot
export interface Snapshot {
  SnapshotDb: DB | null;
  SnapshotDbMutex: Mutex | null;
  AncestralMemory: Deque | null;
  DatabaseCache: KVCache;
  AncestralFlushCounter: number;
  SnapshotBlockHeightPeriod: number;
  OperationChannel: SnapshotOperationChannel | null;
  Checksum: StateChecksum | null;
  Migrations: EncoderMigration | null;
  CurrentEpochSnapshotMetadata: SnapshotEpochMetadata | null;
  Status: SnapshotStatus | null;
  ExitChannel: boolean;
}

// struct2ts:types/generated/types.DBEntry
export interface DBEntry {
  Key: number[] | null;
  Value: number[] | null;
}

// struct2ts:types/generated/types.AncestralRecordValue
export interface AncestralRecordValue {
  Value: number[] | null;
  Existed: boolean;
}

// struct2ts:types/generated/types.AncestralCache
export interface AncestralCache {
  AncestralRecordsMap: { [key: string]: AncestralRecordValue };
}

// struct2ts:types/generated/types.SnapshotOperation
export type SnapshotOperation = any;

// struct2ts:types/generated/types.EncoderMigrationChecksum
export interface EncoderMigrationChecksum {
  Checksum: StateChecksum | null;
  BlockHeight: number;
  Version: number;
  Completed: boolean;
}

// struct2ts:types/generated/types.Timer
export type Timer = any;

// struct2ts:types/generated/types.BitcoinUtxo
export interface BitcoinUtxo {
  TxID: number[];
  Index: number;
  AmountSatoshis: number;
}

// struct2ts:types/generated/types.BlockCypherAPIInputResponse
export interface BlockCypherAPIInputResponse {
  prev_hash: string;
  output_index: number;
  script: string;
  output_value: number;
  sequence: number;
  addresses: string[] | null;
  script_type: string;
  age: number;
}

// struct2ts:types/generated/types.BlockCypherAPIOutputResponse
export interface BlockCypherAPIOutputResponse {
  value: number;
  script: string;
  addresses: string[] | null;
  script_type: string;
  spent_by: string;
}

// struct2ts:types/generated/types.BlockCypherAPITxnResponse
export interface BlockCypherAPITxnResponse {
  block_hash: string;
  block_height: number;
  lock_time: number;
  hash: string;
  inputs: BlockCypherAPIInputResponse[] | null;
  outputs: BlockCypherAPIOutputResponse[] | null;
  confirmations: number;
  double_spend: boolean;
}

// struct2ts:types/generated/types.BlockCypherAPIFullAddressResponse
export interface BlockCypherAPIFullAddressResponse {
  address: string;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  txs: BlockCypherAPITxnResponse[] | null;
  hasMore: boolean;
  error: string;
}

// struct2ts:types/generated/types.BlockchainInfoAPIResponse
export interface BlockchainInfoAPIResponse {
  double_spend: boolean;
}

// struct2ts:types/generated/types.BlockonomicsRBFResponse
export interface BlockonomicsRBFResponse {
  rbf: number;
  status: string;
}

// struct2ts:types/generated/types.DeSoBlockProducer
export type DeSoBlockProducer = any;

// struct2ts:types/generated/types.BlockTemplateStats
export interface BlockTemplateStats {
  TxnCount: number;
  FailingTxnHash: string;
  FailingTxnError: string;
  FailingTxnOriginalTimeAdded: Date;
  FailingTxnMinutesSinceAdded: number;
}

// struct2ts:types/generated/types.UtxoKey
export interface UtxoKey {
  TxID: number[];
  Index: number;
}

// struct2ts:types/generated/types.UtxoEntry
export interface UtxoEntry {
  AmountNanos: number;
  PublicKey: number[] | null;
  BlockHeight: number;
  UtxoType: number;
  UtxoKey: UtxoKey | null;
}

// struct2ts:types/generated/types.GlobalParamsEntry
export interface GlobalParamsEntry {
  USDCentsPerBitcoin: number;
  CreateProfileFeeNanos: number;
  CreateNFTFeeNanos: number;
  MaxCopiesPerNFT: number;
  MinimumNetworkFeeNanosPerKB: number;
}

// struct2ts:types/generated/types.ForbiddenPubKeyEntry
export interface ForbiddenPubKeyEntry {
  PubKey: number[] | null;
}

// struct2ts:types/generated/types.MessageEntry
export interface MessageEntry {
  SenderPublicKey: number[];
  RecipientPublicKey: number[];
  EncryptedText: number[] | null;
  TstampNanos: number;
  Version: number;
  SenderMessagingPublicKey: number[];
  SenderMessagingGroupKeyName: number[];
  RecipientMessagingPublicKey: number[];
  RecipientMessagingGroupKeyName: number[];
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.MessagingGroupMember
export interface MessagingGroupMember {
  GroupMemberPublicKey: number[];
  GroupMemberKeyName: number[];
  EncryptedKey: number[] | null;
}

// struct2ts:types/generated/types.MessagingGroupEntry
export interface MessagingGroupEntry {
  GroupOwnerPublicKey: number[];
  MessagingPublicKey: number[];
  MessagingGroupKeyName: number[];
  MessagingGroupMembers: MessagingGroupMember[] | null;
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.PGMessage
export interface PGMessage {
  MessageHash: number[];
  SenderPublicKey: number[] | null;
  RecipientPublicKey: number[] | null;
  EncryptedText: number[] | null;
  TimestampNanos: number;
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.FollowEntry
export interface FollowEntry {
  FollowerPKID: number[];
  FollowedPKID: number[];
}

// struct2ts:types/generated/types.NFTEntry
export interface NFTEntry {
  LastOwnerPKID: number[];
  OwnerPKID: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  IsForSale: boolean;
  MinBidAmountNanos: number;
  UnlockableText: number[] | null;
  LastAcceptedBidAmountNanos: number;
  IsPending: boolean;
  IsBuyNow: boolean;
  BuyNowPriceNanos: number;
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.NFTBidEntry
export interface NFTBidEntry {
  BidderPKID: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  BidAmountNanos: number;
  AcceptedBlockHeight: number | null;
}

// struct2ts:types/generated/types.DiamondEntry
export interface DiamondEntry {
  SenderPKID: number[];
  ReceiverPKID: number[];
  DiamondPostHash: number[];
  DiamondLevel: number;
}

// struct2ts:types/generated/types.LikeEntry
export interface LikeEntry {
  LikerPubKey: number[] | null;
  LikedPostHash: number[];
}

// struct2ts:types/generated/types.RepostEntry
export interface RepostEntry {
  ReposterPubKey: number[] | null;
  RepostPostHash: number[];
  RepostedPostHash: number[];
}

// struct2ts:types/generated/types.PostEntry
export interface PostEntry {
  PostHash: number[];
  PosterPublicKey: number[] | null;
  ParentStakeID: number[] | null;
  Body: number[] | null;
  RepostedPostHash: number[];
  IsQuotedRepost: boolean;
  CreatorBasisPoints: number;
  StakeMultipleBasisPoints: number;
  ConfirmationBlockHeight: number;
  TimestampNanos: number;
  IsHidden: boolean;
  LikeCount: number;
  RepostCount: number;
  QuoteRepostCount: number;
  DiamondCount: number;
  CommentCount: number;
  IsPinned: boolean;
  IsNFT: boolean;
  NumNFTCopies: number;
  NumNFTCopiesForSale: number;
  NumNFTCopiesBurned: number;
  HasUnlockable: boolean;
  NFTRoyaltyToCreatorBasisPoints: number;
  NFTRoyaltyToCoinBasisPoints: number;
  AdditionalNFTRoyaltiesToCreatorsBasisPoints: { [key: string]: number };
  AdditionalNFTRoyaltiesToCoinsBasisPoints: { [key: string]: number };
  PostExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.PKIDEntry
export interface PKIDEntry {
  PKID: number[];
  PublicKey: number[] | null;
}

// struct2ts:types/generated/types.CoinEntry
export interface CoinEntry {
  CreatorBasisPoints: number;
  DeSoLockedNanos: number;
  NumberOfHolders: number;
  CoinsInCirculationNanos: number[];
  CoinWatermarkNanos: number;
  MintingDisabled: boolean;
  TransferRestrictionStatus: number;
}

// struct2ts:types/generated/types.ProfileEntry
export interface ProfileEntry {
  PublicKey: number[] | null;
  Username: number[] | null;
  Description: number[] | null;
  ProfilePic: number[] | null;
  IsHidden: boolean;
  CreatorCoinEntry: CoinEntry;
  DAOCoinEntry: CoinEntry;
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.BalanceEntry
export interface BalanceEntry {
  HODLerPKID: number[];
  CreatorPKID: number[];
  BalanceNanos: number[];
  HasPurchased: boolean;
}

// struct2ts:types/generated/types.TransactionSpendingLimit
export interface TransactionSpendingLimit {
  GlobalDESOLimit: number;
  TransactionCountLimitMap: { [key: number]: number };
  CreatorCoinOperationLimitMap: { [key: string]: number };
  DAOCoinOperationLimitMap: { [key: string]: number };
  NFTOperationLimitMap: { [key: string]: number };
  DAOCoinLimitOrderLimitMap: { [key: string]: number };
}

// struct2ts:types/generated/types.DerivedKeyEntry
export interface DerivedKeyEntry {
  OwnerPublicKey: number[];
  DerivedPublicKey: number[];
  ExpirationBlock: number;
  OperationType: number;
  ExtraData: { [key: string]: number };
  TransactionSpendingLimitTracker: TransactionSpendingLimit | null;
  Memo: number[] | null;
}

// struct2ts:types/generated/types.DAOCoinLimitOrderEntry
export interface DAOCoinLimitOrderEntry {
  OrderID: number[];
  TransactorPKID: number[];
  BuyingDAOCoinCreatorPKID: number[];
  SellingDAOCoinCreatorPKID: number[];
  ScaledExchangeRateCoinsToSellPerCoinToBuy: number[];
  QuantityToFillInBaseUnits: number[];
  OperationType: number;
  FillType: number;
  BlockHeight: number;
}

// struct2ts:types/generated/types.Postgres
export type Postgres = any;

// struct2ts:github.com/btcsuite/btcd/chaincfg.DNSSeed
export interface DNSSeed {
  Host: string;
  HasFiltering: boolean;
}

// struct2ts:github.com/btcsuite/btcd/wire.BlockHeader
export interface BlockHeader {
  Version: number;
  PrevBlock: number[];
  MerkleRoot: number[];
  Timestamp: Date;
  Bits: number;
  Nonce: number;
}

// struct2ts:github.com/btcsuite/btcd/wire.OutPoint
export interface OutPoint {
  Hash: number[];
  Index: number;
}

// struct2ts:github.com/btcsuite/btcd/wire.TxIn
export interface TxIn {
  PreviousOutPoint: OutPoint;
  SignatureScript: number[] | null;
  Witness: number[] | null;
  Sequence: number;
}

// struct2ts:github.com/btcsuite/btcd/wire.TxOut
export interface TxOut {
  Value: number;
  PkScript: number[] | null;
}

// struct2ts:github.com/btcsuite/btcd/wire.MsgTx
export interface MsgTx {
  Version: number;
  TxIn: TxIn[] | null;
  TxOut: TxOut[] | null;
  LockTime: number;
}

// struct2ts:github.com/btcsuite/btcd/wire.MsgBlock
export interface MsgBlock {
  Header: BlockHeader;
  Transactions: MsgTx[] | null;
}

// struct2ts:math/big.Int
export type Int = number;

// struct2ts:github.com/btcsuite/btcd/chaincfg.Checkpoint
export interface Checkpoint {
  Height: number;
  Hash: number[];
}

// struct2ts:github.com/btcsuite/btcd/chaincfg.ConsensusDeployment
export interface ConsensusDeployment {
  BitNumber: number;
  StartTime: number;
  ExpireTime: number;
}

// struct2ts:github.com/btcsuite/btcd/chaincfg.Params
export interface Params {
  Name: string;
  Net: number;
  DefaultPort: string;
  DNSSeeds: DNSSeed[] | null;
  GenesisBlock: MsgBlock | null;
  GenesisHash: number[];
  PowLimit: Int | null;
  PowLimitBits: number;
  BIP0034Height: number;
  BIP0065Height: number;
  BIP0066Height: number;
  CoinbaseMaturity: number;
  SubsidyReductionInterval: number;
  TargetTimespan: number;
  TargetTimePerBlock: number;
  RetargetAdjustmentFactor: number;
  ReduceMinDifficulty: boolean;
  MinDiffReductionTime: number;
  GenerateSupported: boolean;
  Checkpoints: Checkpoint[] | null;
  RuleChangeActivationThreshold: number;
  MinerConfirmationWindow: number;
  Deployments: ConsensusDeployment[];
  RelayNonStdTxs: boolean;
  Bech32HRPSegwit: string;
  PubKeyHashAddrID: number;
  ScriptHashAddrID: number;
  PrivateKeyID: number;
  WitnessPubKeyHashAddrID: number;
  WitnessScriptHashAddrID: number;
  HDPrivateKeyID: number[];
  HDPublicKeyID: number[];
  HDCoinType: number;
}

// struct2ts:types/generated/types.MsgDeSoHeader
export interface MsgDeSoHeader {
  Version: number;
  PrevBlockHash: number[];
  TransactionMerkleRoot: number[];
  TstampSecs: number;
  Height: number;
  Nonce: number;
  ExtraNonce: number;
}

// struct2ts:types/generated/types.BlockNode
export interface BlockNode {
  Parent: BlockNode | null;
  Hash: number[];
  Height: number;
  DifficultyTarget: number[];
  CumWork: Int | null;
  Header: MsgDeSoHeader | null;
  Status: number;
}

// struct2ts:types/generated/types.DeSoInput
export interface DeSoInput {
  TxID: number[];
  Index: number;
}

// struct2ts:types/generated/types.DeSoOutput
export interface DeSoOutput {
  PublicKey: string | null;
  AmountNanos: number;
}

// struct2ts:github.com/btcsuite/btcd/btcec.Signature
export interface Signature {
  Sign: {
    R: Int | null;
    S: Int | null;
  } | null;
  RecoveryId: number;
  IsRecoverable: boolean;
}

// struct2ts:types/generated/types.MsgDeSoTxn
export interface MsgDeSoTxn {
  TxInputs: DeSoInput[] | null;
  TxOutputs: DeSoOutput[] | null;
  TxnMeta: any;
  PublicKey: string | null;
  ExtraData: { [key: string]: string };
  Signature: Signature | null;
  TxnTypeJSON: number;
}

// struct2ts:types/generated/types.BlockProducerInfo
export interface BlockProducerInfo {
  PublicKey: number[] | null;
  Signature: Signature | null;
}

// struct2ts:types/generated/types.MsgDeSoBlock
export interface MsgDeSoBlock {
  Header: MsgDeSoHeader | null;
  Txns: MsgDeSoTxn[] | null;
  BlockProducerInfo: BlockProducerInfo | null;
}

// struct2ts:math/big.Float
export type Float = number;

// struct2ts:types/generated/types.ForkHeights
export interface ForkHeights {
  DefaultHeight: number;
  DeflationBombBlockHeight: number;
  SalomonFixBlockHeight: number;
  DeSoFounderRewardBlockHeight: number;
  BuyCreatorCoinAfterDeletedBalanceEntryFixBlockHeight: number;
  ParamUpdaterProfileUpdateFixBlockHeight: number;
  UpdateProfileFixBlockHeight: number;
  BrokenNFTBidsFixBlockHeight: number;
  DeSoDiamondsBlockHeight: number;
  NFTTransferOrBurnAndDerivedKeysBlockHeight: number;
  DeSoV3MessagesBlockHeight: number;
  BuyNowAndNFTSplitsBlockHeight: number;
  DAOCoinBlockHeight: number;
  ExtraDataOnEntriesBlockHeight: number;
  DerivedKeySetSpendingLimitsBlockHeight: number;
  DerivedKeyTrackSpendingLimitsBlockHeight: number;
  DAOCoinLimitOrderBlockHeight: number;
}

// struct2ts:types/generated/types.MigrationHeight
export interface MigrationHeight {
  Height: number;
  Version: number;
  Name: string;
}

// struct2ts:types/generated/types.EncoderMigrationHeights
export interface EncoderMigrationHeights {
  DefaultMigration: MigrationHeight;
}

// struct2ts:types/generated/types.DeSoParams
export interface DeSoParams {
  NetworkType: number;
  ProtocolVersion: number;
  MinProtocolVersion: number;
  UserAgent: string;
  DNSSeeds: string[] | null;
  DNSSeedGenerators: string[] | null;
  BitcoinBtcdParams: Params | null;
  BitcoinStartBlockNode: BlockNode | null;
  BitcoinBurnAddress: string;
  BitcoinExchangeFeeBasisPoints: number;
  BitcoinDoubleSpendWaitSeconds: number;
  DeSoNanosPurchasedAtGenesis: number;
  DefaultSocketPort: number;
  DefaultJSONPort: number;
  DialTimeout: number;
  VersionNegotiationTimeout: number;
  GenesisBlock: MsgDeSoBlock | null;
  GenesisBlockHashHex: string;
  TimeBetweenBlocks: number;
  TimeBetweenDifficultyRetargets: number;
  MinDifficultyTargetHex: string;
  MinChainWorkHex: string;
  MaxTipAge: number;
  MaxDifficultyRetargetFactor: number;
  BlockRewardMaturity: number;
  V1DifficultyAdjustmentFactor: number;
  MaxTstampOffsetSeconds: number;
  MaxBlockSizeBytes: number;
  MinerMaxBlockSizeBytes: number;
  Base58PrefixPublicKey: number[];
  Base58PrefixPrivateKey: number[];
  MaxFetchBlocks: number;
  MiningIterationsPerCycle: number;
  MaxUsernameLengthBytes: number;
  MaxUserDescriptionLengthBytes: number;
  MaxProfilePicLengthBytes: number;
  MaxProfilePicDimensions: number;
  MaxPrivateMessageLengthBytes: number;
  StakeFeeBasisPoints: number;
  MaxPostBodyLengthBytes: number;
  MaxPostSubLengthBytes: number;
  MaxStakeMultipleBasisPoints: number;
  MaxCreatorBasisPoints: number;
  MaxNFTRoyaltyBasisPoints: number;
  ParamUpdaterPublicKeys: { [key: string]: boolean };
  SeedTxns: string[] | null;
  SeedBalances: DeSoOutput[] | null;
  CreatorCoinTradeFeeBasisPoints: number;
  CreatorCoinSlope: Float | null;
  CreatorCoinReserveRatio: Float | null;
  CreatorCoinAutoSellThresholdNanos: number;
  ForkHeights: ForkHeights;
  EncoderMigrationHeights: EncoderMigrationHeights | null;
  EncoderMigrationHeightsList: MigrationHeight[] | null;
}

// struct2ts:types/generated/types.UtxoView
export interface UtxoView {
  NumUtxoEntries: number;
  UtxoKeyToUtxoEntry: { [key: string]: UtxoEntry };
  PublicKeyToDeSoBalanceNanos: { [key: string]: number };
  NanosPurchased: number;
  USDCentsPerBitcoin: number;
  GlobalParamsEntry: GlobalParamsEntry | null;
  BitcoinBurnTxIDs: { [key: BlockHash]: boolean };
  ForbiddenPubKeyToForbiddenPubKeyEntry: {
    [key: PkMapKey]: ForbiddenPubKeyEntry;
  };
  MessageKeyToMessageEntry: { [key: string]: MessageEntry };
  MessagingGroupKeyToMessagingGroupEntry: {
    [key: string]: MessagingGroupEntry;
  };
  MessageMap: { [key: BlockHash]: PGMessage };
  FollowKeyToFollowEntry: { [key: string]: FollowEntry };
  NFTKeyToNFTEntry: { [key: string]: NFTEntry };
  NFTBidKeyToNFTBidEntry: { [key: string]: NFTBidEntry };
  NFTKeyToAcceptedNFTBidHistory: { [key: string]: NFTBidEntry };
  DiamondKeyToDiamondEntry: { [key: string]: DiamondEntry };
  LikeKeyToLikeEntry: { [key: string]: LikeEntry };
  RepostKeyToRepostEntry: { [key: string]: RepostEntry };
  PostHashToPostEntry: { [key: BlockHash]: PostEntry };
  PublicKeyToPKIDEntry: { [key: PkMapKey]: PKIDEntry };
  PKIDToPublicKey: { [key: string]: PKIDEntry };
  ProfilePKIDToProfileEntry: { [key: string]: ProfileEntry };
  ProfileUsernameToProfileEntry: { [key: UsernameMapKey]: ProfileEntry };
  HODLerPKIDCreatorPKIDToBalanceEntry: {
    [key: string]: BalanceEntry;
  };
  HODLerPKIDCreatorPKIDToDAOCoinBalanceEntry: {
    [key: string]: BalanceEntry;
  };
  DerivedKeyToDerivedEntry: { [key: string]: DerivedKeyEntry };
  DAOCoinLimitOrderMapKeyToDAOCoinLimitOrderEntry: {
    [key: string]: DAOCoinLimitOrderEntry;
  };
  TipHash: number[];
  Handle: DB | null;
  Postgres: Postgres | null;
  Params: DeSoParams | null;
  Snapshot: Snapshot | null;
}

// struct2ts:types/generated/types.HelpConnectNFTSoldStruct
export interface HelpConnectNFTSoldStruct {
  NFTPostHash: number[];
  SerialNumber: number;
  BidderPKID: number[];
  BidAmountNanos: number;
  UnlockableText: number[] | null;
  PrevNFTBidEntry: NFTBidEntry | null;
  BidderInputs: DeSoInput[] | null;
  BlockHeight: number;
  Txn: MsgDeSoTxn | null;
  TxHash: number[];
  VerifySignatures: boolean;
}

// struct2ts:types/generated/types.PublicKeyRoyaltyPair
export interface PublicKeyRoyaltyPair {
  PublicKey: number[] | null;
  RoyaltyAmountNanos: number;
}

// struct2ts:types/generated/types.FilledDAOCoinLimitOrder
export interface FilledDAOCoinLimitOrder {
  OrderID: number[];
  TransactorPKID: number[];
  BuyingDAOCoinCreatorPKID: number[];
  SellingDAOCoinCreatorPKID: number[];
  CoinQuantityInBaseUnitsBought: number[];
  CoinQuantityInBaseUnitsSold: number[];
  IsFulfilled: boolean;
}

// struct2ts:types/generated/types.UtxoOperation
export interface UtxoOperation {
  Type: number;
  Entry: UtxoEntry | null;
  Key: UtxoKey | null;
  PrevNanosPurchased: number;
  PrevUSDCentsPerBitcoin: number;
  PrevPostEntry: PostEntry | null;
  PrevParentPostEntry: PostEntry | null;
  PrevGrandparentPostEntry: PostEntry | null;
  PrevRepostedPostEntry: PostEntry | null;
  PrevProfileEntry: ProfileEntry | null;
  PrevLikeEntry: LikeEntry | null;
  PrevLikeCount: number;
  PrevDiamondEntry: DiamondEntry | null;
  PrevNFTEntry: NFTEntry | null;
  PrevNFTBidEntry: NFTBidEntry | null;
  DeletedNFTBidEntries: NFTBidEntry[] | null;
  NFTPaymentUtxoKeys: UtxoKey[] | null;
  NFTSpentUtxoEntries: UtxoEntry[] | null;
  PrevAcceptedNFTBidEntries: NFTBidEntry[] | null;
  PrevDerivedKeyEntry: DerivedKeyEntry | null;
  PrevMessagingKeyEntry: MessagingGroupEntry | null;
  PrevRepostEntry: RepostEntry | null;
  PrevRepostCount: number;
  PrevCoinEntry: CoinEntry | null;
  PrevCoinRoyaltyCoinEntries: { [key: string]: CoinEntry };
  PrevTransactorBalanceEntry: BalanceEntry | null;
  PrevCreatorBalanceEntry: BalanceEntry | null;
  FounderRewardUtxoKey: UtxoKey | null;
  PrevSenderBalanceEntry: BalanceEntry | null;
  PrevReceiverBalanceEntry: BalanceEntry | null;
  PrevGlobalParamsEntry: GlobalParamsEntry | null;
  PrevForbiddenPubKeyEntry: ForbiddenPubKeyEntry | null;
  ClobberedProfileBugDESOLockedNanos: number;
  CreatorCoinDESOLockedNanosDiff: number;
  SwapIdentityFromDESOLockedNanos: number;
  SwapIdentityToDESOLockedNanos: number;
  AcceptNFTBidCreatorPublicKey: number[] | null;
  AcceptNFTBidBidderPublicKey: number[] | null;
  AcceptNFTBidCreatorRoyaltyNanos: number;
  AcceptNFTBidCreatorDESORoyaltyNanos: number;
  AcceptNFTBidAdditionalCoinRoyalties: PublicKeyRoyaltyPair[] | null;
  AcceptNFTBidAdditionalDESORoyalties: PublicKeyRoyaltyPair[] | null;
  NFTBidCreatorPublicKey: number[] | null;
  NFTBidBidderPublicKey: number[] | null;
  NFTBidCreatorRoyaltyNanos: number;
  NFTBidCreatorDESORoyaltyNanos: number;
  NFTBidAdditionalCoinRoyalties: PublicKeyRoyaltyPair[] | null;
  NFTBidAdditionalDESORoyalties: PublicKeyRoyaltyPair[] | null;
  PrevTransactorDAOCoinLimitOrderEntry: DAOCoinLimitOrderEntry | null;
  PrevBalanceEntries: { [key: string]: string };
  PrevMatchingOrders: DAOCoinLimitOrderEntry[] | null;
  FilledDAOCoinLimitOrders: FilledDAOCoinLimitOrder[] | null;
}

// struct2ts:types/generated/types.UtxoOperationBundle
export interface UtxoOperationBundle {
  UtxoOpBundle: UtxoOperation[] | null;
}

// struct2ts:types/generated/types.MessageKey
export interface MessageKey {
  PublicKey: number[];
  BlockHeight: number;
  TstampNanos: number;
}

// struct2ts:types/generated/types.MessagingGroupKey
export interface MessagingGroupKey {
  OwnerPublicKey: number[];
  GroupKeyName: number[];
}

// struct2ts:types/generated/types.LikeKey
export interface LikeKey {
  LikerPubKey: number[];
  LikedPostHash: number[];
}

// struct2ts:types/generated/types.NFTKey
export interface NFTKey {
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/generated/types.NFTBidKey
export interface NFTBidKey {
  BidderPKID: number[];
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/generated/types.DerivedKeyMapKey
export interface DerivedKeyMapKey {
  OwnerPublicKey: number[];
  DerivedPublicKey: number[];
}

// struct2ts:types/generated/types.FollowKey
export interface FollowKey {
  FollowerPKID: number[];
  FollowedPKID: number[];
}

// struct2ts:types/generated/types.DiamondKey
export interface DiamondKey {
  SenderPKID: number[];
  ReceiverPKID: number[];
  DiamondPostHash: number[];
}

// struct2ts:types/generated/types.RepostKey
export interface RepostKey {
  ReposterPubKey: number[];
  RepostedPostHash: number[];
}

// struct2ts:types/generated/types.PostEntryReaderState
export interface PostEntryReaderState {
  LikedByReader: boolean;
  DiamondLevelBestowed: number;
  RepostedByReader: boolean;
  RepostPostHashHex: string;
}

// struct2ts:types/generated/types.BalanceEntryMapKey
export interface BalanceEntryMapKey {
  HODLerPKID: number[];
  CreatorPKID: number[];
}

// struct2ts:types/generated/types.DAOCoinLimitOrderMapKey
export interface DAOCoinLimitOrderMapKey {
  OrderID: number[];
}

// struct2ts:types/generated/types.OrphanBlock
export interface OrphanBlock {
  Block: MsgDeSoBlock | null;
  Hash: number[];
}

// struct2ts:github.com/deso-protocol/go-deadlock.RWMutex
export type RWMutex = any;

// struct2ts:types/generated/types.Blockchain
export interface Blockchain {
  MaxSyncBlockHeight: number;
  ChainLock: RWMutex;
}

// struct2ts:github.com/btcsuite/btcd/addrmgr.AddrManager
export type AddrManager = any;

// struct2ts:types/generated/types.ConnectionManager
export interface ConnectionManager {
  AddrMgr: AddrManager | null;
  HyperSync: boolean;
  DisableSlowSync: boolean;
}

// struct2ts:types/generated/types.DBPrefixes
export interface DBPrefixes {
  PrefixBlockHashToBlock: number[] | null;
  PrefixHeightHashToNodeInfo: number[] | null;
  PrefixBitcoinHeightHashToNodeInfo: number[] | null;
  PrefixBestDeSoBlockHash: number[] | null;
  PrefixBestBitcoinHeaderHash: number[] | null;
  PrefixUtxoKeyToUtxoEntry: number[] | null;
  PrefixPubKeyUtxoKey: number[] | null;
  PrefixUtxoNumEntries: number[] | null;
  PrefixBlockHashToUtxoOperations: number[] | null;
  PrefixNanosPurchased: number[] | null;
  PrefixUSDCentsPerBitcoinExchangeRate: number[] | null;
  PrefixGlobalParams: number[] | null;
  PrefixBitcoinBurnTxIDs: number[] | null;
  PrefixPublicKeyTimestampToPrivateMessage: number[] | null;
  PrefixTransactionIndexTip: number[] | null;
  PrefixTransactionIDToMetadata: number[] | null;
  PrefixPublicKeyIndexToTransactionIDs: number[] | null;
  PrefixPublicKeyToNextIndex: number[] | null;
  PrefixPostHashToPostEntry: number[] | null;
  PrefixPosterPublicKeyPostHash: number[] | null;
  PrefixTstampNanosPostHash: number[] | null;
  PrefixCreatorBpsPostHash: number[] | null;
  PrefixMultipleBpsPostHash: number[] | null;
  PrefixCommentParentStakeIDToPostHash: number[] | null;
  PrefixPKIDToProfileEntry: number[] | null;
  PrefixProfileUsernameToPKID: number[] | null;
  PrefixCreatorDeSoLockedNanosCreatorPKID: number[] | null;
  PrefixStakeIDTypeAmountStakeIDIndex: number[] | null;
  PrefixFollowerPKIDToFollowedPKID: number[] | null;
  PrefixFollowedPKIDToFollowerPKID: number[] | null;
  PrefixLikerPubKeyToLikedPostHash: number[] | null;
  PrefixLikedPostHashToLikerPubKey: number[] | null;
  PrefixHODLerPKIDCreatorPKIDToBalanceEntry: number[] | null;
  PrefixCreatorPKIDHODLerPKIDToBalanceEntry: number[] | null;
  PrefixPosterPublicKeyTimestampPostHash: number[] | null;
  PrefixPublicKeyToPKID: number[] | null;
  PrefixPKIDToPublicKey: number[] | null;
  PrefixMempoolTxnHashToMsgDeSoTxn: number[] | null;
  PrefixReposterPubKeyRepostedPostHashToRepostPostHash: number[] | null;
  PrefixDiamondReceiverPKIDDiamondSenderPKIDPostHash: number[] | null;
  PrefixDiamondSenderPKIDDiamondReceiverPKIDPostHash: number[] | null;
  PrefixForbiddenBlockSignaturePubKeys: number[] | null;
  PrefixRepostedPostHashReposterPubKey: number[] | null;
  PrefixRepostedPostHashReposterPubKeyRepostPostHash: number[] | null;
  PrefixDiamondedPostHashDiamonderPKIDDiamondLevel: number[] | null;
  PrefixPostHashSerialNumberToNFTEntry: number[] | null;
  PrefixPKIDIsForSaleBidAmountNanosPostHashSerialNumberToNFTEntry:
    | number[]
    | null;
  PrefixPostHashSerialNumberBidNanosBidderPKID: number[] | null;
  PrefixBidderPKIDPostHashSerialNumberToBidNanos: number[] | null;
  PrefixPublicKeyToDeSoBalanceNanos: number[] | null;
  PrefixPublicKeyBlockHashToBlockReward: number[] | null;
  PrefixPostHashSerialNumberToAcceptedBidEntries: number[] | null;
  PrefixHODLerPKIDCreatorPKIDToDAOCoinBalanceEntry: number[] | null;
  PrefixCreatorPKIDHODLerPKIDToDAOCoinBalanceEntry: number[] | null;
  PrefixMessagingGroupEntriesByOwnerPubKeyAndGroupKeyName: number[] | null;
  PrefixMessagingGroupMetadataByMemberPubKeyAndGroupMessagingPubKey:
    | number[]
    | null;
  PrefixAuthorizeDerivedKey: number[] | null;
  PrefixDAOCoinLimitOrder: number[] | null;
  PrefixDAOCoinLimitOrderByTransactorPKID: number[] | null;
  PrefixDAOCoinLimitOrderByOrderID: number[] | null;
}

// struct2ts:types/generated/types.DBStatePrefixes
export interface DBStatePrefixes {
  Prefixes: DBPrefixes | null;
  StatePrefixesMap: { [key: number]: boolean };
  StatePrefixesList: number[] | null;
  TxIndexPrefixes: number[] | null;
}

// struct2ts:types/generated/types.AffectedPublicKey
export interface AffectedPublicKey {
  PublicKeyBase58Check: string;
  Metadata: string;
}

// struct2ts:types/generated/types.BasicTransferTxindexMetadata
export interface BasicTransferTxindexMetadata {
  TotalInputNanos: number;
  TotalOutputNanos: number;
  FeeNanos: number;
  UtxoOpsDump: string;
  UtxoOps: UtxoOperation[] | null;
  DiamondLevel: number;
  PostHashHex: string;
}

// struct2ts:types/generated/types.BitcoinExchangeTxindexMetadata
export interface BitcoinExchangeTxindexMetadata {
  BitcoinSpendAddress: string;
  SatoshisBurned: number;
  NanosCreated: number;
  TotalNanosPurchasedBefore: number;
  TotalNanosPurchasedAfter: number;
  BitcoinTxnHash: string;
}

// struct2ts:types/generated/types.CreatorCoinTxindexMetadata
export interface CreatorCoinTxindexMetadata {
  OperationType: string;
  DeSoToSellNanos: number;
  CreatorCoinToSellNanos: number;
  DeSoToAddNanos: number;
  DESOLockedNanosDiff: number;
}

// struct2ts:types/generated/types.CreatorCoinTransferTxindexMetadata
export interface CreatorCoinTransferTxindexMetadata {
  CreatorUsername: string;
  CreatorCoinToTransferNanos: number;
  DiamondLevel: number;
  PostHashHex: string;
}

// struct2ts:types/generated/types.DAOCoinTransferTxindexMetadata
export interface DAOCoinTransferTxindexMetadata {
  CreatorUsername: string;
  DAOCoinToTransferNanos: number[];
}

// struct2ts:types/generated/types.DAOCoinTxindexMetadata
export interface DAOCoinTxindexMetadata {
  CreatorUsername: string;
  OperationType: string;
  CoinsToMintNanos: number[];
  CoinsToBurnNanos: number[];
  TransferRestrictionStatus: string;
}

// struct2ts:types/generated/types.FilledDAOCoinLimitOrderMetadata
export interface FilledDAOCoinLimitOrderMetadata {
  TransactorPublicKeyBase58Check: string;
  BuyingDAOCoinCreatorPublicKey: string;
  SellingDAOCoinCreatorPublicKey: string;
  CoinQuantityInBaseUnitsBought: number[];
  CoinQuantityInBaseUnitsSold: number[];
  IsFulfilled: boolean;
}

// struct2ts:types/generated/types.DAOCoinLimitOrderTxindexMetadata
export interface DAOCoinLimitOrderTxindexMetadata {
  BuyingDAOCoinCreatorPublicKey: string;
  SellingDAOCoinCreatorPublicKey: string;
  ScaledExchangeRateCoinsToSellPerCoinToBuy: number[];
  QuantityToFillInBaseUnits: number[];
  FilledDAOCoinLimitOrdersMetadata: FilledDAOCoinLimitOrderMetadata[] | null;
}

// struct2ts:types/generated/types.UpdateProfileTxindexMetadata
export interface UpdateProfileTxindexMetadata {
  ProfilePublicKeyBase58Check: string;
  NewUsername: string;
  NewDescription: string;
  NewProfilePic: string;
  NewCreatorBasisPoints: number;
  NewStakeMultipleBasisPoints: number;
  IsHidden: boolean;
}

// struct2ts:types/generated/types.SubmitPostTxindexMetadata
export interface SubmitPostTxindexMetadata {
  PostHashBeingModifiedHex: string;
  ParentPostHashHex: string;
}

// struct2ts:types/generated/types.LikeTxindexMetadata
export interface LikeTxindexMetadata {
  IsUnlike: boolean;
  PostHashHex: string;
}

// struct2ts:types/generated/types.FollowTxindexMetadata
export interface FollowTxindexMetadata {
  IsUnfollow: boolean;
}

// struct2ts:types/generated/types.PrivateMessageTxindexMetadata
export interface PrivateMessageTxindexMetadata {
  TimestampNanos: number;
}

// struct2ts:types/generated/types.SwapIdentityTxindexMetadata
export interface SwapIdentityTxindexMetadata {
  FromPublicKeyBase58Check: string;
  ToPublicKeyBase58Check: string;
  FromDeSoLockedNanos: number;
  ToDeSoLockedNanos: number;
}

// struct2ts:types/generated/types.NFTRoyaltiesMetadata
export interface NFTRoyaltiesMetadata {
  CreatorCoinRoyaltyNanos: number;
  CreatorRoyaltyNanos: number;
  CreatorPublicKeyBase58Check: string;
  AdditionalCoinRoyaltiesMap: { [key: string]: number };
  AdditionalDESORoyaltiesMap: { [key: string]: number };
}

// struct2ts:types/generated/types.NFTBidTxindexMetadata
export interface NFTBidTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
  BidAmountNanos: number;
  IsBuyNowBid: boolean;
  OwnerPublicKeyBase58Check: string;
  NFTRoyaltiesMetadata: NFTRoyaltiesMetadata | null;
}

// struct2ts:types/generated/types.AcceptNFTBidTxindexMetadata
export interface AcceptNFTBidTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
  BidAmountNanos: number;
  NFTRoyaltiesMetadata: NFTRoyaltiesMetadata | null;
}

// struct2ts:types/generated/types.NFTTransferTxindexMetadata
export interface NFTTransferTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
}

// struct2ts:types/generated/types.AcceptNFTTransferTxindexMetadata
export interface AcceptNFTTransferTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
}

// struct2ts:types/generated/types.BurnNFTTxindexMetadata
export interface BurnNFTTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
}

// struct2ts:types/generated/types.CreateNFTTxindexMetadata
export interface CreateNFTTxindexMetadata {
  NFTPostHashHex: string;
  AdditionalCoinRoyaltiesMap: { [key: string]: number };
  AdditionalDESORoyaltiesMap: { [key: string]: number };
}

// struct2ts:types/generated/types.UpdateNFTTxindexMetadata
export interface UpdateNFTTxindexMetadata {
  NFTPostHashHex: string;
  IsForSale: boolean;
}

// struct2ts:types/generated/types.TransactionMetadata
export interface TransactionMetadata {
  BlockHashHex: string;
  TxnIndexInBlock: number;
  TxnType: string;
  TransactorPublicKeyBase58Check: string;
  AffectedPublicKeys: AffectedPublicKey[] | null;
  TxnOutputs: DeSoOutput[] | null;
  BasicTransferTxindexMetadata: BasicTransferTxindexMetadata | null;
  BitcoinExchangeTxindexMetadata: BitcoinExchangeTxindexMetadata | null;
  CreatorCoinTxindexMetadata: CreatorCoinTxindexMetadata | null;
  CreatorCoinTransferTxindexMetadata: CreatorCoinTransferTxindexMetadata | null;
  UpdateProfileTxindexMetadata: UpdateProfileTxindexMetadata | null;
  SubmitPostTxindexMetadata: SubmitPostTxindexMetadata | null;
  LikeTxindexMetadata: LikeTxindexMetadata | null;
  FollowTxindexMetadata: FollowTxindexMetadata | null;
  PrivateMessageTxindexMetadata: PrivateMessageTxindexMetadata | null;
  SwapIdentityTxindexMetadata: SwapIdentityTxindexMetadata | null;
  NFTBidTxindexMetadata: NFTBidTxindexMetadata | null;
  AcceptNFTBidTxindexMetadata: AcceptNFTBidTxindexMetadata | null;
  NFTTransferTxindexMetadata: NFTTransferTxindexMetadata | null;
  AcceptNFTTransferTxindexMetadata: AcceptNFTTransferTxindexMetadata | null;
  BurnNFTTxindexMetadata: BurnNFTTxindexMetadata | null;
  DAOCoinTxindexMetadata: DAOCoinTxindexMetadata | null;
  DAOCoinTransferTxindexMetadata: DAOCoinTransferTxindexMetadata | null;
  CreateNFTTxindexMetadata: CreateNFTTxindexMetadata | null;
  UpdateNFTTxindexMetadata: UpdateNFTTxindexMetadata | null;
  DAOCoinLimitOrderTxindexMetadata: DAOCoinLimitOrderTxindexMetadata | null;
}

// struct2ts:types/generated/types.TransactionEvent
export interface TransactionEvent {
  Txn: MsgDeSoTxn | null;
  TxnHash: number[];
  UtxoView: UtxoView | null;
  UtxoOps: UtxoOperation[] | null;
}

// struct2ts:types/generated/types.BlockEvent
export interface BlockEvent {
  Block: MsgDeSoBlock | null;
  UtxoView: UtxoView | null;
  UtxoOps: UtxoOperation[] | null;
}

// struct2ts:types/generated/types.MempoolTx
export interface MempoolTx {
  Tx: MsgDeSoTxn | null;
  TxMeta: TransactionMetadata | null;
  Hash: number[];
  TxSizeBytes: number;
  Added: Date;
  Height: number;
  Fee: number;
  FeePerKB: number;
}

// struct2ts:types/generated/types.SummaryStats
export interface SummaryStats {
  Count: number;
  TotalBytes: number;
}

// struct2ts:github.com/btcsuite/btcd/btcec.PublicKey
export interface PublicKey {
  Curve: any;
  X: Int | null;
  Y: Int | null;
}

// struct2ts:types/generated/types.DeSoMiner
export interface DeSoMiner {
  PublicKeys: PublicKey[] | null;
  BlockProducer: DeSoBlockProducer | null;
}

// struct2ts:types/generated/types.MsgDeSoGetHeaders
export interface MsgDeSoGetHeaders {
  StopHash: number[];
  BlockLocator: BlockHash[] | null;
}

// struct2ts:types/generated/types.MsgDeSoHeaderBundle
export interface MsgDeSoHeaderBundle {
  Headers: MsgDeSoHeader[] | null;
  TipHash: number[];
  TipHeight: number;
}

// struct2ts:types/generated/types.MsgDeSoGetBlocks
export interface MsgDeSoGetBlocks {
  HashList: BlockHash[] | null;
}

// struct2ts:types/generated/types.DeSoBodySchema
export interface DeSoBodySchema {
  Body: string;
  ImageURLs: string[] | null;
  VideoURLs: string[] | null;
}

// struct2ts:types/generated/types.MsgDeSoGetTransactions
export interface MsgDeSoGetTransactions {
  HashList: BlockHash[] | null;
}

// struct2ts:types/generated/types.MsgDeSoTransactionBundle
export interface MsgDeSoTransactionBundle {
  Transactions: MsgDeSoTxn[] | null;
}

// struct2ts:types/generated/types.InvVect
export interface InvVect {
  Type: number;
  Hash: number[];
}

// struct2ts:types/generated/types.MsgDeSoInv
export interface MsgDeSoInv {
  InvList: InvVect[] | null;
  IsSyncResponse: boolean;
}

// struct2ts:types/generated/types.MsgDeSoPing
export interface MsgDeSoPing {
  Nonce: number;
}

// struct2ts:types/generated/types.MsgDeSoPong
export interface MsgDeSoPong {
  Nonce: number;
}

// struct2ts:types/generated/types.MsgDeSoVersion
export interface MsgDeSoVersion {
  Version: number;
  Services: number;
  TstampSecs: number;
  Nonce: number;
  UserAgent: string;
  StartBlockHeight: number;
  MinFeeRateNanosPerKB: number;
}

// struct2ts:types/generated/types.SingleAddr
export interface SingleAddr {
  Timestamp: Date;
  Services: number;
  IP: number[] | null;
  Port: number;
}

// struct2ts:types/generated/types.MsgDeSoAddr
export interface MsgDeSoAddr {
  AddrList: SingleAddr[] | null;
}

// struct2ts:types/generated/types.MsgDeSoVerack
export interface MsgDeSoVerack {
  Nonce: number;
}

// struct2ts:types/generated/types.MsgDeSoGetSnapshot
export interface MsgDeSoGetSnapshot {
  SnapshotStartKey: number[] | null;
}

// struct2ts:types/generated/types.MsgDeSoSnapshotData
export interface MsgDeSoSnapshotData {
  SnapshotMetadata: SnapshotEpochMetadata | null;
  SnapshotChunk: DBEntry[] | null;
  SnapshotChunkFull: boolean;
  Prefix: number[] | null;
}

// struct2ts:types/generated/types.BlockRewardMetadataa
export interface BlockRewardMetadataa {
  ExtraData: number[] | null;
}

// struct2ts:github.com/deso-protocol/go-merkle-tree.ProofPart
export interface ProofPart {
  IsRight: boolean;
  Hash: number[] | null;
}

// struct2ts:types/generated/types.BitcoinExchangeMetadata
export interface BitcoinExchangeMetadata {
  BitcoinTransaction: MsgTx | null;
  BitcoinBlockHash: number[];
  BitcoinMerkleRoot: number[];
  BitcoinMerkleProof: ProofPart[] | null;
}

// struct2ts:types/generated/types.PrivateMessageMetadata
export interface PrivateMessageMetadata {
  RecipientPublicKey: number[] | null;
  EncryptedText: number[] | null;
  TimestampNanos: number;
}

// struct2ts:types/generated/types.LikeMetadata
export interface LikeMetadata {
  LikedPostHash: number[];
  IsUnlike: boolean;
}

// struct2ts:types/generated/types.FollowMetadata
export interface FollowMetadata {
  FollowedPublicKey: number[] | null;
  IsUnfollow: boolean;
}

// struct2ts:types/generated/types.SubmitPostMetadata
export interface SubmitPostMetadata {
  PostHashToModify: number[] | null;
  ParentStakeID: number[] | null;
  Body: number[] | null;
  CreatorBasisPoints: number;
  StakeMultipleBasisPoints: number;
  TimestampNanos: number;
  IsHidden: boolean;
}

// struct2ts:types/generated/types.UpdateProfileMetadata
export interface UpdateProfileMetadata {
  ProfilePublicKey: number[] | null;
  NewUsername: number[] | null;
  NewDescription: number[] | null;
  NewProfilePic: number[] | null;
  NewCreatorBasisPoints: number;
  NewStakeMultipleBasisPoints: number;
  IsHidden: boolean;
}

// struct2ts:types/generated/types.UpdateBitcoinUSDExchangeRateMetadataa
export interface UpdateBitcoinUSDExchangeRateMetadataa {
  USDCentsPerBitcoin: number;
}

// struct2ts:types/generated/types.CreatorCoinMetadataa
export interface CreatorCoinMetadataa {
  ProfilePublicKey: number[] | null;
  OperationType: number;
  DeSoToSellNanos: number;
  CreatorCoinToSellNanos: number;
  DeSoToAddNanos: number;
  MinDeSoExpectedNanos: number;
  MinCreatorCoinExpectedNanos: number;
}

// struct2ts:types/generated/types.CreatorCoinTransferMetadataa
export interface CreatorCoinTransferMetadataa {
  ProfilePublicKey: number[] | null;
  CreatorCoinToTransferNanos: number;
  ReceiverPublicKey: number[] | null;
}

// struct2ts:types/generated/types.CreateNFTMetadata
export interface CreateNFTMetadata {
  NFTPostHash: number[];
  NumCopies: number;
  HasUnlockable: boolean;
  IsForSale: boolean;
  MinBidAmountNanos: number;
  NFTRoyaltyToCreatorBasisPoints: number;
  NFTRoyaltyToCoinBasisPoints: number;
}

// struct2ts:types/generated/types.UpdateNFTMetadata
export interface UpdateNFTMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
  IsForSale: boolean;
  MinBidAmountNanos: number;
}

// struct2ts:types/generated/types.AcceptNFTBidMetadata
export interface AcceptNFTBidMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
  BidderPKID: number[];
  BidAmountNanos: number;
  UnlockableText: number[] | null;
  BidderInputs: DeSoInput[] | null;
}

// struct2ts:types/generated/types.NFTBidMetadata
export interface NFTBidMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
  BidAmountNanos: number;
}

// struct2ts:types/generated/types.NFTTransferMetadata
export interface NFTTransferMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
  ReceiverPublicKey: number[] | null;
  UnlockableText: number[] | null;
}

// struct2ts:types/generated/types.AcceptNFTTransferMetadata
export interface AcceptNFTTransferMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/generated/types.BurnNFTMetadata
export interface BurnNFTMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/generated/types.SwapIdentityMetadataa
export interface SwapIdentityMetadataa {
  FromPublicKey: number[] | null;
  ToPublicKey: number[] | null;
}

// struct2ts:types/generated/types.AuthorizeDerivedKeyMetadata
export interface AuthorizeDerivedKeyMetadata {
  DerivedPublicKey: number[] | null;
  ExpirationBlock: number;
  OperationType: number;
  AccessSignature: number[] | null;
}

// struct2ts:types/generated/types.NFTOperationLimitKey
export interface NFTOperationLimitKey {
  BlockHash: number[];
  SerialNumber: number;
  Operation: number;
}

// struct2ts:types/generated/types.CreatorCoinOperationLimitKey
export interface CreatorCoinOperationLimitKey {
  CreatorPKID: number[];
  Operation: number;
}

// struct2ts:types/generated/types.DAOCoinOperationLimitKey
export interface DAOCoinOperationLimitKey {
  CreatorPKID: number[];
  Operation: number;
}

// struct2ts:types/generated/types.DAOCoinLimitOrderLimitKey
export interface DAOCoinLimitOrderLimitKey {
  BuyingDAOCoinCreatorPKID: number[];
  SellingDAOCoinCreatorPKID: number[];
}

// struct2ts:types/generated/types.DAOCoinMetadata
export interface DAOCoinMetadata {
  ProfilePublicKey: number[] | null;
  OperationType: number;
  CoinsToMintNanos: number[];
  CoinsToBurnNanos: number[];
  TransferRestrictionStatus: number;
}

// struct2ts:types/generated/types.DAOCoinTransferMetadata
export interface DAOCoinTransferMetadata {
  ProfilePublicKey: number[] | null;
  DAOCoinToTransferNanos: number[];
  ReceiverPublicKey: number[] | null;
}

// struct2ts:types/generated/types.DeSoInputsByTransactor
export interface DeSoInputsByTransactor {
  TransactorPublicKey: number[];
  Inputs: DeSoInput[] | null;
}

// struct2ts:types/generated/types.DAOCoinLimitOrderMetadata
export interface DAOCoinLimitOrderMetadata {
  BuyingDAOCoinCreatorPublicKey: number[];
  SellingDAOCoinCreatorPublicKey: number[];
  ScaledExchangeRateCoinsToSellPerCoinToBuy: number[];
  QuantityToFillInBaseUnits: number[];
  OperationType: number;
  FillType: number;
  CancelOrderID: number[];
  BidderInputs: DeSoInputsByTransactor[] | null;
  FeeNanos: number;
}

// struct2ts:types/generated/types.MessagingGroupMetadata
export interface MessagingGroupMetadata {
  MessagingPublicKey: number[] | null;
  MessagingGroupKeyName: number[] | null;
  GroupOwnerSignature: number[] | null;
  MessagingGroupMembers: MessagingGroupMember[] | null;
}

// struct2ts:types/generated/types.DeSoNode
export interface DeSoNode {
  Name: string;
  URL: string;
  Owner: string;
}

// struct2ts:types/generated/types.Notifier
export type Notifer = any;

// struct2ts:types/generated/types.ExpectedResponse
export interface ExpectedResponse {
  TimeExpected: Date;
  MessageTan: number;
}

// struct2ts:types/generated/types.DeSoMessageMeta
export interface DeSoMessageMeta {
  DeSoMessage: any;
  Inbound: boolean;
}

// struct2ts:github.com/deso-protocol/go-deadlock.Mutex

// struct2ts:types/generated/types.Peer
export interface Peer {
  StatsMtx: RWMutex;
  TimeOffsetSecs: number;
  TimeConnected: Date;
  ID: number;
  LastPingNonce: number;
  LastPingTime: Date;
  LastPingMicros: number;
  Conn: any;
  Params: DeSoParams | null;
  MessageChan: ServerMessage;
  PeerManuallyRemovedFromConnectionManager: boolean;
  VersionNonceSent: number;
  VersionNonceReceived: number;
  PeerInfoMtx: Mutex;
  VersionNegotiated: boolean;
}

// struct2ts:types/generated/types.PGChain
export interface PGChain {
  Name: string;
  TipHash: number[];
}

// struct2ts:types/generated/types.PGBlock
export interface PGBlock {
  Hash: number[];
  ParentHash: number[];
  Height: number;
  DifficultyTarget: number[];
  CumWork: number[];
  Status: number;
  TxMerkleRoot: number[];
  Version: number;
  Timestamp: number;
  Nonce: number;
  ExtraNonce: number;
  Notified: boolean;
}

// struct2ts:types/generated/types.PGTransactionOutput
export interface PGTransactionOutput {
  OutputHash: number[];
  OutputIndex: number;
  OutputType: number;
  Height: number;
  PublicKey: number[] | null;
  AmountNanos: number;
  Spent: boolean;
  InputHash: number[];
  InputIndex: number;
}

// struct2ts:types/generated/types.PGMetadataBlockReward
export interface PGMetadataBlockReward {
  TransactionHash: number[];
  ExtraData: number[] | null;
}

// struct2ts:types/generated/types.PGMetadataBitcoinExchange
export interface PGMetadataBitcoinExchange {
  TransactionHash: number[];
  BitcoinBlockHash: number[];
  BitcoinMerkleRoot: number[];
}

// struct2ts:types/generated/types.PGMetadataPrivateMessage
export interface PGMetadataPrivateMessage {
  TransactionHash: number[];
  RecipientPublicKey: number[] | null;
  EncryptedText: number[] | null;
  TimestampNanos: number;
}

// struct2ts:types/generated/types.PGMetadataSubmitPost
export interface PGMetadataSubmitPost {
  TransactionHash: number[];
  PostHashToModify: number[];
  ParentStakeID: number[];
  Body: number[] | null;
  TimestampNanos: number;
  IsHidden: boolean;
}

// struct2ts:types/generated/types.PGMetadataUpdateExchangeRate
export interface PGMetadataUpdateExchangeRate {
  TransactionHash: number[];
  USDCentsPerBitcoin: number;
}

// struct2ts:types/generated/types.PGMetadataUpdateProfile
export interface PGMetadataUpdateProfile {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  NewUsername: number[] | null;
  NewDescription: number[] | null;
  NewProfilePic: number[] | null;
  NewCreatorBasisPoints: number;
}

// struct2ts:types/generated/types.PGMetadataFollow
export interface PGMetadataFollow {
  TransactionHash: number[];
  FollowedPublicKey: number[] | null;
  IsUnfollow: boolean;
}

// struct2ts:types/generated/types.PGMetadataLike
export interface PGMetadataLike {
  TransactionHash: number[];
  LikedPostHash: number[];
  IsUnlike: boolean;
}

// struct2ts:types/generated/types.PGMetadataCreatorCoin
export interface PGMetadataCreatorCoin {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  OperationType: number;
  DeSoToSellNanos: number;
  CreatorCoinToSellNanos: number;
  DeSoToAddNanos: number;
  MinDeSoExpectedNanos: number;
  MinCreatorCoinExpectedNanos: number;
}

// struct2ts:types/generated/types.PGMetadataCreatorCoinTransfer
export interface PGMetadataCreatorCoinTransfer {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  CreatorCoinToTransferNanos: number;
  ReceiverPublicKey: number[] | null;
}

// struct2ts:types/generated/types.PGMetadataSwapIdentity
export interface PGMetadataSwapIdentity {
  TransactionHash: number[];
  FromPublicKey: number[] | null;
  ToPublicKey: number[] | null;
}

// struct2ts:types/generated/types.PGMetadataCreateNFT
export interface PGMetadataCreateNFT {
  TransactionHash: number[];
  NFTPostHash: number[];
  NumCopies: number;
  HasUnlockable: boolean;
  IsForSale: boolean;
  MinBidAmountNanos: number;
  CreatorRoyaltyBasisPoints: number;
  CoinRoyaltyBasisPoints: number;
}

// struct2ts:types/generated/types.PGMetadataUpdateNFT
export interface PGMetadataUpdateNFT {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  IsForSale: boolean;
  MinBidAmountNanos: number;
}

// struct2ts:types/generated/types.PGMetadataBidInput
export interface PGMetadataBidInput {
  TransactionHash: number[];
  InputHash: number[];
  InputIndex: number;
}

// struct2ts:types/generated/types.PGMetadataAcceptNFTBid
export interface PGMetadataAcceptNFTBid {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  BidderPKID: number[];
  BidAmountNanos: number;
  UnlockableText: number[] | null;
  BidderInputs: PGMetadataBidInput[] | null;
}

// struct2ts:types/generated/types.PGMetadataNFTBid
export interface PGMetadataNFTBid {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  BidAmountNanos: number;
}

// struct2ts:types/generated/types.PGMetadataNFTTransfer
export interface PGMetadataNFTTransfer {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  ReceiverPublicKey: number[] | null;
  UnlockableText: number[] | null;
}

// struct2ts:types/generated/types.PGMetadataAcceptNFTTransfer
export interface PGMetadataAcceptNFTTransfer {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/generated/types.PGMetadataBurnNFT
export interface PGMetadataBurnNFT {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/generated/types.PGMetadataDerivedKey
export interface PGMetadataDerivedKey {
  TransactionHash: number[];
  DerivedPublicKey: number[];
  ExpirationBlock: number;
  OperationType: number;
  AccessSignature: number[] | null;
}

// struct2ts:types/generated/types.PGMetadataDAOCoin
export interface PGMetadataDAOCoin {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  OperationType: number;
  CoinsToMintNanos: string;
  CoinsToBurnNanos: string;
  TransferRestrictionStatus: number;
}

// struct2ts:types/generated/types.PGMetadataDAOCoinTransfer
export interface PGMetadataDAOCoinTransfer {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  DAOCoinToTransferNanos: string;
  ReceiverPublicKey: number[] | null;
}

// struct2ts:types/generated/types.PGMetadataDAOCoinLimitOrderBidderInputs
export interface PGMetadataDAOCoinLimitOrderBidderInputs {
  TransactionHash: number[];
  InputHash: number[];
  InputIndex: number;
}

// struct2ts:types/generated/types.PGMetadataDAOCoinLimitOrder
export interface PGMetadataDAOCoinLimitOrder {
  TransactionHash: number[];
  BuyingDAOCoinCreatorPublicKey: number[];
  SellingDAOCoinCreatorPublicKey: number[];
  ScaledExchangeRateCoinsToSellPerCoinToBuy: string;
  QuantityToFillInBaseUnits: string;
  OperationType: number;
  FillType: number;
  CancelOrderID: number[];
  FeeNanos: number;
  BidderInputs: PGMetadataDAOCoinLimitOrderBidderInputs[] | null;
}

// struct2ts:types/generated/types.PGTransaction
export interface PGTransaction {
  Hash: number[];
  BlockHash: number[];
  Type: number;
  PublicKey: number[] | null;
  ExtraData: { [key: string]: number };
  R: number[];
  S: number[];
  Outputs: PGTransactionOutput[] | null;
  MetadataBlockReward: PGMetadataBlockReward | null;
  MetadataBitcoinExchange: PGMetadataBitcoinExchange | null;
  MetadataPrivateMessage: PGMetadataPrivateMessage | null;
  MetadataSubmitPost: PGMetadataSubmitPost | null;
  MetadataUpdateExchangeRate: PGMetadataUpdateExchangeRate | null;
  MetadataUpdateProfile: PGMetadataUpdateProfile | null;
  MetadataFollow: PGMetadataFollow | null;
  MetadataLike: PGMetadataLike | null;
  MetadataCreatorCoin: PGMetadataCreatorCoin | null;
  MetadataCreatorCoinTransfer: PGMetadataCreatorCoinTransfer | null;
  MetadataSwapIdentity: PGMetadataSwapIdentity | null;
  MetadataCreateNFT: PGMetadataCreateNFT | null;
  MetadataUpdateNFT: PGMetadataUpdateNFT | null;
  MetadataAcceptNFTBid: PGMetadataAcceptNFTBid | null;
  MetadataNFTBid: PGMetadataNFTBid | null;
  MetadataNFTTransfer: PGMetadataNFTTransfer | null;
  MetadataAcceptNFTTransfer: PGMetadataAcceptNFTTransfer | null;
  MetadataBurnNFT: PGMetadataBurnNFT | null;
  MetadataDerivedKey: PGMetadataDerivedKey | null;
  MetadataDAOCoin: PGMetadataDAOCoin | null;
  MetadataDAOCoinTransfer: PGMetadataDAOCoinTransfer | null;
  MetadataDAOCoinLimitOrder: PGMetadataDAOCoinLimitOrder | null;
}

// struct2ts:types/generated/types.PGNotification
export interface PGNotification {
  TransactionHash: number[];
  Mined: boolean;
  ToUser: number[] | null;
  FromUser: number[] | null;
  OtherUser: number[] | null;
  Type: number;
  Amount: number;
  PostHash: number[];
  Timestamp: number;
}

// struct2ts:types/generated/types.PGProfile
export interface PGProfile {
  PKID: number[];
  PublicKey: number[];
  Username: string;
  Description: string;
  ProfilePic: number[] | null;
  CreatorBasisPoints: number;
  DeSoLockedNanos: number;
  NumberOfHolders: number;
  CoinsInCirculationNanos: number;
  CoinWatermarkNanos: number;
  MintingDisabled: boolean;
  DAOCoinNumberOfHolders: number;
  DAOCoinCoinsInCirculationNanos: string;
  DAOCoinMintingDisabled: boolean;
  DAOCoinTransferRestrictionStatus: number;
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.PGPost
export interface PGPost {
  PostHash: number[];
  PosterPublicKey: number[] | null;
  ParentPostHash: number[];
  Body: string;
  RepostedPostHash: number[];
  QuotedRepost: boolean;
  Timestamp: number;
  Hidden: boolean;
  LikeCount: number;
  RepostCount: number;
  QuoteRepostCount: number;
  DiamondCount: number;
  CommentCount: number;
  Pinned: boolean;
  NFT: boolean;
  NumNFTCopies: number;
  NumNFTCopiesForSale: number;
  NumNFTCopiesBurned: number;
  Unlockable: boolean;
  CreatorRoyaltyBasisPoints: number;
  CoinRoyaltyBasisPoints: number;
  AdditionalNFTRoyaltiesToCoinsBasisPoints: { [key: string]: number };
  AdditionalNFTRoyaltiesToCreatorsBasisPoints: { [key: string]: number };
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.PGLike
export interface PGLike {
  LikerPublicKey: number[] | null;
  LikedPostHash: number[];
}

// struct2ts:types/generated/types.PGFollow
export interface PGFollow {
  FollowerPKID: number[];
  FollowedPKID: number[];
}

// struct2ts:types/generated/types.PGDiamond
export interface PGDiamond {
  SenderPKID: number[];
  ReceiverPKID: number[];
  DiamondPostHash: number[];
  DiamondLevel: number;
}

// struct2ts:types/generated/types.PGMessagingGroup
export interface PGMessagingGroup {
  GroupOwnerPublicKey: number[];
  MessagingPublicKey: number[];
  MessagingGroupKeyName: number[];
  MessagingGroupMembers: number[] | null;
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.PGCreatorCoinBalance
export interface PGCreatorCoinBalance {
  HolderPKID: number[];
  CreatorPKID: number[];
  BalanceNanos: number;
  HasPurchased: boolean;
}

// struct2ts:types/generated/types.PGDAOCoinBalance
export interface PGDAOCoinBalance {
  HolderPKID: number[];
  CreatorPKID: number[];
  BalanceNanos: string;
  HasPurchased: boolean;
}

// struct2ts:types/generated/types.PGDAOCoinLimitOrder
export interface PGDAOCoinLimitOrder {
  OrderID: number[];
  TransactorPKID: number[];
  BuyingDAOCoinCreatorPKID: number[];
  SellingDAOCoinCreatorPKID: number[];
  ScaledExchangeRateCoinsToSellPerCoinToBuy: string;
  QuantityToFillInBaseUnits: string;
  OperationType: number;
  FillType: number;
  BlockHeight: number;
}

// struct2ts:types/generated/types.PGBalance
export interface PGBalance {
  PublicKey: number[];
  BalanceNanos: number;
}

// struct2ts:types/generated/types.PGGlobalParams
export interface PGGlobalParams {
  ID: number;
  USDCentsPerBitcoin: number;
  CreateProfileFeeNanos: number;
  CreateNFTFeeNanos: number;
  MaxCopiesPerNFT: number;
  MinNetworkFeeNanosPerKB: number;
}

// struct2ts:types/generated/types.PGRepost
export interface PGRepost {
  ReposterPublickey: number[];
  RepostedPostHash: number[];
  RepostPostHash: number[];
}

// struct2ts:types/generated/types.PGForbiddenKey
export interface PGForbiddenKey {
  PublicKey: number[];
}

// struct2ts:types/generated/types.PGNFT
export interface PGNFT {
  NFTPostHash: number[];
  SerialNumber: number;
  LastOwnerPKID: number[];
  OwnerPKID: number[];
  ForSale: boolean;
  MinBidAmountNanos: number;
  UnlockableText: string;
  LastAcceptedBidAmountNanos: number;
  IsPending: boolean;
  IsBuyNow: boolean;
  BuyNowPriceNanos: number;
  ExtraData: { [key: string]: number };
}

// struct2ts:types/generated/types.PGNFTBid
export interface PGNFTBid {
  BidderPKID: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  BidAmountNanos: number;
  Accepted: boolean;
  AcceptedBlockHeight: number | null;
}

// struct2ts:types/generated/types.PGDerivedKey
export interface PGDerivedKey {
  OwnerPublicKey: number[];
  DerivedPublicKey: number[];
  ExpirationBlock: number;
  OperationType: number;
  ExtraData: { [key: string]: number };
  TransactionSpendingLimitTracker: TransactionSpendingLimit | null;
  Memo: number[] | null;
}

// struct2ts:types/generated/types.ServerMessage
export interface ServerMessage {
  Peer: Peer | null;
  Msg: any;
  ReplyChan: ServerReply;
}

// struct2ts:types/generated/types.GetDataRequestInfo
export interface GetDataRequestInfo {
  PeerWhoSentInv: Peer | null;
  TimeRequested: Date;
}

// struct2ts:types/generated/types.ServerReply
export type ServerReply = any;

// struct2ts:types/generated/types.TXIndex
export interface TXIndex {
  TXIndexLock: RWMutex;
  TXIndexChain: Blockchain | null;
  CoreChain: Blockchain | null;
  Params: DeSoParams | null;
}

// struct2ts:types/generated/types.SyncPrefixProgress
export interface SyncPrefixProgress {
  PrefixSyncPeer: Peer | null;
  Prefix: number[] | null;
  LastReceivedKey: number[] | null;
  Completed: boolean;
}

// struct2ts:types/generated/types.SyncProgress
export interface SyncProgress {
  PrefixProgress: SyncPrefixProgress[] | null;
  SnapshotMetadata: SnapshotEpochMetadata | null;
  Completed: boolean;
}

// struct2ts:types/generated/types.Server
export interface Server {
  TxIndex: TXIndex | null;
  SyncPeer: Peer | null;
  HyperSyncProgress: SyncProgress;
  DisableNetworking: boolean;
  ReadOnlyMode: boolean;
  IgnoreInboundPeerInvMessages: boolean;
  Notifier: any | null;
}

// struct2ts:types/generated/types.MiningSupplyIntervalStart
export interface MiningSupplyIntervalStart {
  StartBlockHeight: number;
  BlockRewardNanos: number;
}

// struct2ts:types/generated/types.PurchaseSupplyIntervalStart
export interface PurchaseSupplyIntervalStart {
  SatoshisPerUnit: number;
  SupplyStartNanos: number;
}

// struct2ts:tNotifierypes/generated/types.SetUSDCentsToDeSoExchangeRateRequest
export interface SetUSDCentsToDeSoExchangeRateRequest {
  USDCentsPerDeSo: number;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.SetUSDCentsToDeSoExchangeRateResponse
export interface SetUSDCentsToDeSoExchangeRateResponse {
  USDCentsPerDeSo: number;
}

// struct2ts:types/generated/types.GetUSDCentsToDeSoExchangeRateResponse
export interface GetUSDCentsToDeSoExchangeRateResponse {
  USDCentsPerDeSo: number;
}

// struct2ts:types/generated/types.SetBuyDeSoFeeBasisPointsRequest
export interface SetBuyDeSoFeeBasisPointsRequest {
  BuyDeSoFeeBasisPoints: number;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.SetBuyDeSoFeeBasisPointsResponse
export interface SetBuyDeSoFeeBasisPointsResponse {
  BuyDeSoFeeBasisPoints: number;
}

// struct2ts:types/generated/types.GetBuyDeSoFeeBasisPointsResponse
export interface GetBuyDeSoFeeBasisPointsResponse {
  BuyDeSoFeeBasisPoints: number;
}

// struct2ts:types/generated/types.GetDAOCoinLimitOrdersRequest
export interface GetDAOCoinLimitOrdersRequest {
  DAOCoin1CreatorPublicKeyBase58CheckOrUsername: string;
  DAOCoin2CreatorPublicKeyBase58CheckOrUsername: string;
}

// struct2ts:types/generated/types.DAOCoinLimitOrderEntryResponse
export interface DAOCoinLimitOrderEntryResponse {
  TransactorPublicKeyBase58Check: string;
  BuyingDAOCoinCreatorPublicKeyBase58Check: string;
  SellingDAOCoinCreatorPublicKeyBase58Check: string;
  ExchangeRateCoinsToSellPerCoinToBuy: number;
  QuantityToFill: number;
  OperationType: string;
  OrderID: string;
}

// struct2ts:types/generated/types.GetDAOCoinLimitOrdersResponse
export interface GetDAOCoinLimitOrdersResponse {
  Orders: DAOCoinLimitOrderEntryResponse[] | null;
}

// struct2ts:types/generated/types.GetTransactorDAOCoinLimitOrdersRequest
export interface GetTransactorDAOCoinLimitOrdersRequest {
  TransactorPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.AdminPinPostRequest
export interface AdminPinPostRequest {
  PostHashHex: string;
  UnpinPost: boolean;
}

// struct2ts:types/generated/types.AdminUpdateGlobalFeedRequest
export interface AdminUpdateGlobalFeedRequest {
  PostHashHex: string;
  RemoveFromGlobalFeed: boolean;
}

// struct2ts:types/generated/types.AdminRemoveNilPostsRequest
export interface AdminRemoveNilPostsRequest {
  NumPostsToSearch: number;
}

// struct2ts:types/generated/types.PostEntryResponse
export interface PostEntryResponse {
  PostHashHex: string;
  PosterPublicKeyBase58Check: string;
  ParentStakeID: string;
  Body: string;
  ImageURLs: string[] | null;
  VideoURLs: string[] | null;
  RepostedPostEntryResponse: PostEntryResponse | null;
  CreatorBasisPoints: number;
  StakeMultipleBasisPoints: number;
  TimestampNanos: number;
  IsHidden: boolean;
  ConfirmationBlockHeight: number;
  InMempool: boolean;
  ProfileEntryResponse: ProfileEntryResponse | null;
  Comments: PostEntryResponse[] | null;
  LikeCount: number;
  DiamondCount: number;
  PostEntryReaderState: PostEntryReaderState;
  InGlobalFeed: boolean | null;
  InHotFeed: boolean | null;
  IsPinned: boolean | null;
  PostExtraData: { [key: string]: string };
  CommentCount: number;
  RepostCount: number;
  QuoteRepostCount: number;
  ParentPosts: PostEntryResponse[] | null;
  IsNFT: boolean;
  NumNFTCopies: number;
  NumNFTCopiesForSale: number;
  NumNFTCopiesBurned: number;
  HasUnlockable: boolean;
  NFTRoyaltyToCreatorBasisPoints: number;
  NFTRoyaltyToCoinBasisPoints: number;
  AdditionalDESORoyaltiesMap: { [key: string]: number };
  AdditionalCoinRoyaltiesMap: { [key: string]: number };
  DiamondsFromSender: number;
  HotnessScore: number;
  PostMultiplier: number;
  RecloutCount: number;
  QuoteRecloutCount: number;
  RecloutedPostEntryResponse: PostEntryResponse | null;
  IsFrozen: boolean;
}

// struct2ts:types/generated/types.CoinEntryResponse
export interface CoinEntryResponse {
  CreatorBasisPoints: number;
  DeSoLockedNanos: number;
  NumberOfHolders: number;
  CoinsInCirculationNanos: number;
  CoinWatermarkNanos: number;
  BitCloutLockedNanos: number;
}

// struct2ts:types/generated/types.DAOCoinEntryResponse
export interface DAOCoinEntryResponse {
  NumberOfHolders: number;
  CoinsInCirculationNanos: number[];
  MintingDisabled: boolean;
  TransferRestrictionStatus: string;
}

// struct2ts:types/generated/types.BalanceEntryResponse
export interface BalanceEntryResponse {
  HODLerPublicKeyBase58Check: string;
  CreatorPublicKeyBase58Check: string;
  HasPurchased: boolean;
  BalanceNanos: number;
  BalanceNanosUint256: string;
  NetBalanceInMempool: number;
  ProfileEntryResponse: ProfileEntryResponse | null;
}

// struct2ts:types/generated/types.ProfileEntryResponse
export interface ProfileEntryResponse {
  BestExchangeRateDESOPerDAOCoin: number;
  PublicKeyBase58Check: string;
  Username: string;
  Description: string;
  IsHidden: boolean;
  IsReserved: boolean;
  IsVerified: boolean;
  Comments: PostEntryResponse[] | null;
  Posts: PostEntryResponse[] | null;
  CoinEntry: CoinEntryResponse | null;
  DAOCoinEntry: DAOCoinEntryResponse | null;
  CoinPriceDeSoNanos: number;
  CoinPriceBitCloutNanos: number;
  DESOBalanceNanos: number;
  UsersThatHODL: BalanceEntryResponse[] | null;
  IsFeaturedTutorialWellKnownCreator: boolean;
  IsFeaturedTutorialUpAndComingCreator: boolean;
  ExtraData: { [key: string]: string };
}

// struct2ts:types/generated/types.TransactionFee
export interface TransactionFee {
  PublicKeyBase58Check: string;
  ProfileEntryResponse: ProfileEntryResponse | null;
  AmountNanos: number;
}

// struct2ts:types/generated/types.AdminSetTransactionFeeForTransactionTypeRequest
export interface AdminSetTransactionFeeForTransactionTypeRequest {
  TransactionType: string;
  NewTransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.AdminSetTransactionFeeForTransactionTypeResponse
export interface AdminSetTransactionFeeForTransactionTypeResponse {
  TransactionFeeMap: { [key: string]: TransactionFee };
}

// struct2ts:types/generated/types.AdminSetAllTransactionFeesRequest
export interface AdminSetAllTransactionFeesRequest {
  NewTransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.AdminSetAllTransactionFeesResponse
export interface AdminSetAllTransactionFeesResponse {
  TransactionFeeMap: { [key: string]: TransactionFee };
}

// struct2ts:types/generated/types.AdminGetTransactionFeeMapResponse
export interface AdminGetTransactionFeeMapResponse {
  TransactionFeeMap: { [key: string]: TransactionFee };
}

// struct2ts:types/generated/types.AdminAddExemptPublicKey
export interface AdminAddExemptPublicKey {
  PublicKeyBase58Check: string;
  IsRemoval: boolean;
}

// struct2ts:types/generated/types.AdminGetExemptPublicKeysResponse
export interface AdminGetExemptPublicKeysResponse {
  ExemptPublicKeyMap: { [key: string]: ProfileEntryResponse };
}

// struct2ts:types/generated/types.AdminResetJumioRequest
export interface AdminResetJumioRequest {
  PublicKeyBase58Check: string;
  Username: string;
  JWT: string;
}

// struct2ts:types/generated/types.AdminUpdateJumioDeSoRequest
export interface AdminUpdateJumioDeSoRequest {
  JWT: string;
  DeSoNanos: number;
}

// struct2ts:types/generated/types.AdminUpdateJumioDeSoResponse
export interface AdminUpdateJumioDeSoResponse {
  DeSoNanos: number;
}

// struct2ts:types/generated/types.AdminUpdateJumioUSDCentsRequest
export interface AdminUpdateJumioUSDCentsRequest {
  JWT: string;
  USDCents: number;
}

// struct2ts:types/generated/types.AdminUpdateJumioUSDCentsResponse
export interface AdminUpdateJumioUSDCentsResponse {
  USDCents: number;
}

// struct2ts:types/generated/types.AdminUpdateJumioKickbackUSDCentsRequest
export interface AdminUpdateJumioKickbackUSDCentsRequest {
  JWT: string;
  USDCents: number;
}

// struct2ts:types/generated/types.AdminUpdateJumioKickbackUSDCentsResponse
export interface AdminUpdateJumioKickbackUSDCentsResponse {
  USDCents: number;
}

// struct2ts:types/generated/types.AdminSetJumioVerifiedRequest
export interface AdminSetJumioVerifiedRequest {
  PublicKeyBase58Check: string;
  Username: string;
}

// struct2ts:types/generated/types.AdminJumioCallback
export interface AdminJumioCallback {
  PublicKeyBase58Check: string;
  Username: string;
  CountryAlpha3: string;
}

// struct2ts:types/generated/types.CountryLevelSignUpBonus
export interface CountryLevelSignUpBonus {
  AllowCustomReferralAmount: boolean;
  ReferralAmountOverrideUSDCents: number;
  AllowCustomKickbackAmount: boolean;
  KickbackAmountOverrideUSDCents: number;
}

// struct2ts:types/generated/types.AdminUpdateJumioCountrySignUpBonusRequest
export interface AdminUpdateJumioCountrySignUpBonusRequest {
  CountryCode: string;
  CountryLevelSignUpBonus: CountryLevelSignUpBonus;
}

// struct2ts:types/generated/types.Alpha3CountryCodeDetails
export interface Alpha3CountryCodeDetails {
  CountryCode: string;
  Name: string;
  Alpha3: string;
}

// struct2ts:types/generated/types.CountrySignUpBonusResponse
export interface CountrySignUpBonusResponse {
  CountryLevelSignUpBonus: CountryLevelSignUpBonus;
  CountryCodeDetails: Alpha3CountryCodeDetails;
}

// struct2ts:types/generated/types.GetAllCountryLevelSignUpBonusResponse
export interface GetAllCountryLevelSignUpBonusResponse {
  SignUpBonusMetadata: { [key: string]: CountrySignUpBonusResponse };
  DefaultSignUpBonusMetadata: CountryLevelSignUpBonus;
}

// struct2ts:types/generated/types.AdminGetNFTDropRequest
export interface AdminGetNFTDropRequest {
  DropNumber: number;
}

// struct2ts:types/generated/types.NFTDropEntry
export interface NFTDropEntry {
  IsActive: boolean;
  DropNumber: number;
  DropTstampNanos: number;
  NFTHashes: BlockHash[] | null;
}

// struct2ts:types/generated/types.AdminGetNFTDropResponse
export interface AdminGetNFTDropResponse {
  DropEntry: NFTDropEntry | null;
  Posts: PostEntryResponse[] | null;
}

// struct2ts:types/generated/types.AdminUpdateNFTDropRequest
export interface AdminUpdateNFTDropRequest {
  DropNumber: number;
  DropTstampNanos: number;
  IsActive: boolean;
  NFTHashHexToAdd: string;
  NFTHashHexToRemove: string;
}

// struct2ts:types/generated/types.AdminUpdateNFTDropResponse
export interface AdminUpdateNFTDropResponse {
  DropEntry: NFTDropEntry | null;
  Posts: PostEntryResponse[] | null;
}

// struct2ts:types/generated/types.NodeControlRequest
export interface NodeControlRequest {
  Address: string;
  MinerPublicKeys: string;
  OperationType: string;
  JWT: string;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.NodeStatusResponse
export interface NodeStatusResponse {
  State: string;
  LatestHeaderHeight: number;
  LatestHeaderHash: string;
  LatestHeaderTstampSecs: number;
  LatestBlockHeight: number;
  LatestBlockHash: string;
  LatestBlockTstampSecs: number;
  LatestTxIndexHeight: number;
  HeadersRemaining: number;
  BlocksRemaining: number;
}

// struct2ts:types/generated/types.PeerResponse
export interface PeerResponse {
  IP: string;
  ProtocolPort: number;
  IsSyncPeer: boolean;
}

// struct2ts:types/generated/types.NodeControlResponse
export interface NodeControlResponse {
  DeSoStatus: NodeStatusResponse | null;
  DeSoOutboundPeers: PeerResponse[] | null;
  DeSoInboundPeers: PeerResponse[] | null;
  DeSoUnconnectedPeers: PeerResponse[] | null;
  MinerPublicKeys: string[] | null;
}

// struct2ts:types/generated/types.AdminGetMempoolStatsResponse
export interface AdminGetMempoolStatsResponse {
  TransactionSummaryStats: { [key: string]: SummaryStats };
}

// struct2ts:types/generated/types.AdminCreateReferralHashRequest
export interface AdminCreateReferralHashRequest {
  UserPublicKeyBase58Check: string;
  Username: string;
  ReferrerAmountUSDCents: number;
  RefereeAmountUSDCents: number;
  MaxReferrals: number;
  RequiresJumio: boolean;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.ReferralInfo
export interface ReferralInfo {
  ReferralHashBase58: string;
  ReferrerPKID: number[];
  ReferrerAmountUSDCents: number;
  RefereeAmountUSDCents: number;
  MaxReferrals: number;
  RequiresJumio: boolean;
  NumJumioAttempts: number;
  NumJumioSuccesses: number;
  TotalReferrals: number;
  TotalReferrerDeSoNanos: number;
  TotalRefereeDeSoNanos: number;
  DateCreatedTStampNanos: number;
}

// struct2ts:types/generated/types.ReferralInfoResponse
export interface ReferralInfoResponse {
  IsActive: boolean;
  Info: ReferralInfo;
  ReferredUsers: ProfileEntryResponse[] | null;
}

// struct2ts:types/generated/types.AdminCreateReferralHashResponse
export interface AdminCreateReferralHashResponse {
  ReferralInfoResponse: ReferralInfoResponse;
}

// struct2ts:types/generated/types.AdminUpdateReferralHashRequest
export interface AdminUpdateReferralHashRequest {
  ReferralHashBase58: string;
  ReferrerAmountUSDCents: number;
  RefereeAmountUSDCents: number;
  MaxReferrals: number;
  RequiresJumio: boolean;
  IsActive: boolean;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.AdminUpdateReferralHashResponse
export interface AdminUpdateReferralHashResponse {
  ReferralInfoResponse: ReferralInfoResponse;
}

// struct2ts:types/generated/types.SimpleReferralInfo
export interface SimpleReferralInfo {
  ReferralHashBase58: string;
  RefereeAmountUSDCents: number;
  MaxReferrals: number;
  TotalReferrals: number;
}

// struct2ts:types/generated/types.SimpleReferralInfoResponse
export interface SimpleReferralInfoResponse {
  IsActive: boolean;
  Info: SimpleReferralInfo;
}

// struct2ts:types/generated/types.AdminGetAllReferralInfoForUserRequest
export interface AdminGetAllReferralInfoForUserRequest {
  UserPublicKeyBase58Check: string;
  Username: string;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.AdminGetAllReferralInfoForUserResponse
export interface AdminGetAllReferralInfoForUserResponse {
  ReferralInfoResponses: ReferralInfoResponse[] | null;
}

// struct2ts:types/generated/types.AdminDownloadReferralCSVResponse
export interface AdminDownloadReferralCSVResponse {
  CSVRows: string[] | null;
}

// struct2ts:types/generated/types.AdminUploadReferralCSVRequest
export interface AdminUploadReferralCSVRequest {
  CSVRows: string[] | null;
}

// struct2ts:types/generated/types.AdminUploadReferralCSVResponse
export interface AdminUploadReferralCSVResponse {
  LinksCreated: number;
  LinksUpdated: number;
}

// struct2ts:types/generated/types.AdminDownloadRefereeCSVResponse
export interface AdminDownloadRefereeCSVResponse {
  CSVRows: string[] | null;
}

// struct2ts:types/generated/types.GetGlobalParamsResponse
export interface GetGlobalParamsResponse {
  USDCentsPerBitcoin: number;
  CreateProfileFeeNanos: number;
  MinimumNetworkFeeNanosPerKB: number;
  CreateNFTFeeNanos: number;
  MaxCopiesPerNFT: number;
}

// struct2ts:types/generated/types.UpdateGlobalParamsRequest
export interface UpdateGlobalParamsRequest {
  UpdaterPublicKeyBase58Check: string;
  USDCentsPerBitcoin: number;
  CreateProfileFeeNanos: number;
  CreateNFTFeeNanos: number;
  MaxCopiesPerNFT: number;
  MinimumNetworkFeeNanosPerKB: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  Password: string;
  Sign: boolean;
  Validate: boolean;
  Broadcast: boolean;
}

// struct2ts:types/generated/types.UpdateGlobalParamsResponse
export interface UpdateGlobalParamsResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.SwapIdentityRequest
export interface SwapIdentityRequest {
  UpdaterPublicKeyBase58Check: string;
  FromUsernameOrPublicKeyBase58Check: string;
  ToUsernameOrPublicKeyBase58Check: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.SwapIdentityResponse
export interface SwapIdentityResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.TestSignTransactionWithDerivedKeyRequest
export interface TestSignTransactionWithDerivedKeyRequest {
  TransactionHex: string;
  DerivedKeySeedHex: string;
}

// struct2ts:types/generated/types.TestSignTransactionWithDerivedKeyResponse
export interface TestSignTransactionWithDerivedKeyResponse {
  TransactionHex: string;
}

// struct2ts:types/generated/types.AdminUpdateTutorialCreatorRequest
export interface AdminUpdateTutorialCreatorRequest {
  PublicKeyBase58Check: string;
  IsRemoval: boolean;
  IsWellKnown: boolean;
  JWT: string;
}

// struct2ts:types/generated/types.AdminResetTutorialStatusRequest
export interface AdminResetTutorialStatusRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.AdminUpdateUserGlobalMetadataRequest
export interface AdminUpdateUserGlobalMetadataRequest {
  UserPublicKeyBase58Check: string;
  Username: string;
  IsBlacklistUpdate: boolean;
  RemoveEverywhere: boolean;
  RemoveFromLeaderboard: boolean;
  IsWhitelistUpdate: boolean;
  WhitelistPosts: boolean;
  RemovePhoneNumberMetadata: boolean;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.AdminGetAllUserGlobalMetadataRequest
export interface AdminGetAllUserGlobalMetadataRequest {
  NumToFetch: number;
}

// struct2ts:types/generated/types.UserMetadata
export interface UserMetadata {
  PublicKey: number[] | null;
  RemoveEverywhere: boolean;
  RemoveFromLeaderboard: boolean;
  Email: string;
  EmailVerified: boolean;
  PhoneNumber: string;
  PhoneNumberCountryCode: string;
  MessageReadStateByContact: { [key: string]: number };
  NotificationLastSeenIndex: number;
  SatoshisBurnedSoFar: number;
  HasBurnedEnoughSatoshisToCreateProfile: boolean;
  BlockedPublicKeys: { [key: string]: string };
  WhitelistPosts: boolean;
  JumioInternalReference: string;
  JumioFinishedTime: number;
  JumioVerified: boolean;
  JumioReturned: boolean;
  JumioTransactionID: string;
  JumioDocumentKey: number[] | null;
  RedoJumio: boolean;
  JumioStarterDeSoTxnHashHex: string;
  JumioShouldCompProfileCreation: boolean;
  MustCompleteTutorial: boolean;
  IsFeaturedTutorialWellKnownCreator: boolean;
  IsFeaturedTutorialUpAndComingCreator: boolean;
  TutorialStatus: string;
  CreatorPurchasedInTutorialPKID: number[];
  CreatorCoinsPurchasedInTutorial: number;
  ReferralHashBase58Check: string;
  ReferrerDeSoTxnHash: string;
  UnreadNotifications: number;
  LatestUnreadNotificationIndex: number;
}

// struct2ts:types/generated/types.AdminGetAllUserGlobalMetadataResponse
export interface AdminGetAllUserGlobalMetadataResponse {
  PubKeyToUserGlobalMetadata: { [key: string]: UserMetadata };
  PubKeyToUsername: { [key: string]: string };
}

// struct2ts:types/generated/types.AdminGetUserGlobalMetadataRequest
export interface AdminGetUserGlobalMetadataRequest {
  UserPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.AdminGetUserGlobalMetadataResponse
export interface AdminGetUserGlobalMetadataResponse {
  UserMetadata: UserMetadata;
  UserProfileEntryResponse: ProfileEntryResponse | null;
}

// struct2ts:types/generated/types.VerifiedUsernameToPKID
export interface VerifiedUsernameToPKID {
  VerifiedUsernameToPKID: { [key: string]: PKID };
}

// struct2ts:types/generated/types.VerificationUsernameAuditLog
export interface VerificationUsernameAuditLog {
  TimestampNanos: number;
  VerifierUsername: string;
  VerifierPKID: number[];
  VerifiedUsername: string;
  VerifiedPKID: number[];
  IsRemoval: boolean;
}

// struct2ts:types/generated/types.FilterAuditLog
export interface FilterAuditLog {
  TimestampNanos: number;
  Filter: number;
  UpdaterUsername: string;
  UpdaterPKID: number[];
  UpdatedUsername: string;
  UpdatedPKID: number[];
  IsRemoval: boolean;
}

// struct2ts:types/generated/types.AdminGrantVerificationBadgeRequest
export interface AdminGrantVerificationBadgeRequest {
  UsernameToVerify: string;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.AdminGrantVerificationBadgeResponse
export interface AdminGrantVerificationBadgeResponse {
  Message: string;
}

// struct2ts:types/generated/types.AdminRemoveVerificationBadgeRequest
export interface AdminRemoveVerificationBadgeRequest {
  UsernameForWhomToRemoveVerification: string;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.AdminRemoveVerificationBadgeResponse
export interface AdminRemoveVerificationBadgeResponse {
  Message: string;
}

// struct2ts:types/generated/types.AdminGetVerifiedUsersResponse
export interface AdminGetVerifiedUsersResponse {
  VerifiedUsers: string[] | null;
}

// struct2ts:types/generated/types.VerificationUsernameAuditLogResponse
export interface VerificationUsernameAuditLogResponse {
  TimestampNanos: number;
  VerifierUsername: string;
  VerifierPublicKeyBase58Check: string;
  VerifiedUsername: string;
  VerifiedPublicKeyBase58Check: string;
  IsRemoval: boolean;
}

// struct2ts:types/generated/types.AdminGetUsernameVerificationAuditLogsRequest
export interface AdminGetUsernameVerificationAuditLogsRequest {
  Username: string;
}

// struct2ts:types/generated/types.AdminGetUsernameVerificationAuditLogsResponse
export interface AdminGetUsernameVerificationAuditLogsResponse {
  VerificationAuditLogs: VerificationUsernameAuditLogResponse[] | null;
}

// struct2ts:types/generated/types.AdminGetUserAdminDataRequest
export interface AdminGetUserAdminDataRequest {
  UserPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.AdminGetUserAdminDataResponse
export interface AdminGetUserAdminDataResponse {
  Username: string;
  IsVerified: boolean;
  LastVerifierPublicKey: string;
  LastVerifyRemoverPublicKey: string;
  IsWhitelisted: boolean;
  LastWhitelisterPublicKey: string;
  LastWhitelistRemoverPublicKey: string;
  IsGraylisted: boolean;
  LastGraylisterPublicKey: string;
  LastGraylistRemoverPublicKey: string;
  IsBlacklisted: boolean;
  LastBlacklisterPublicKey: string;
  LastBlacklistRemoverPublicKey: string;
  PhoneNumber: string;
  Email: string;
  ReferralHashBase58Check: string;
  JumioStarterDeSoTxnHashBase58Check: string;
  ReferrerDeSoTxnHashBase58Check: string;
}

// struct2ts:types/generated/types.GetExchangeRateResponse
export interface GetExchangeRateResponse {
  SatoshisPerDeSoExchangeRate: number;
  USDCentsPerBitcoinExchangeRate: number;
  NanosPerETHExchangeRate: number;
  USDCentsPerETHExchangeRate: number;
  NanosSold: number;
  USDCentsPerDeSoExchangeRate: number;
  USDCentsPerDeSoReserveExchangeRate: number;
  BuyDeSoFeeBasisPoints: number;
  SatoshisPerBitCloutExchangeRate: number;
  USDCentsPerBitCloutExchangeRate: number;
  USDCentsPerBitCloutReserveExchangeRate: number;
  USDCentsPerDeSoCoinbase: number;
  USDCentsPerDeSoBlockchainDotCom: number;
}

// struct2ts:types/generated/types.BlockchainDeSoTickerResponse
export interface BlockchainDeSoTickerResponse {
  symbol: string;
  price_24h: number;
  volume_24h: number;
  last_trade_price: number;
}

// struct2ts:types/generated/types.CoinbaseDeSoTickerResponse
export interface CoinbaseDeSoTickerResponse {
  data: any;
}

// struct2ts:types/generated/types.GetAppStateRequest
export interface GetAppStateRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetAppStateResponse
export interface GetAppStateResponse {
  MinSatoshisBurnedForProfileCreation: number;
  BlockHeight: number;
  IsTestnet: boolean;
  HasStarterDeSoSeed: boolean;
  HasTwilioAPIKey: boolean;
  CreateProfileFeeNanos: number;
  CompProfileCreation: boolean;
  DiamondLevelMap: { [key: number]: number };
  HasWyreIntegration: boolean;
  HasJumioIntegration: boolean;
  BuyWithETH: boolean;
  USDCentsPerDeSoExchangeRate: number;
  JumioDeSoNanos: number;
  JumioUSDCents: number;
  JumioKickbackUSDCents: number;
  CountrySignUpBonus: CountryLevelSignUpBonus;
  DefaultFeeRateNanosPerKB: number;
  TransactionFeeMap: { [key: string]: TransactionFee };
  BuyETHAddress: string;
  Nodes: { [key: number]: DeSoNode };
  USDCentsPerBitCloutExchangeRate: number;
  JumioBitCloutNanos: number;
}

// struct2ts:types/generated/types.BlockchainDotcomResponse
export interface BlockchainDotcomResponse {
  USD: any;
}

// struct2ts:types/generated/types.GeminiResponse
export interface GeminiResponse {
  last: string;
}

// struct2ts:types/generated/types.KrakenResponse
export interface KrakenResponse {
  result: any;
}

// struct2ts:types/generated/types.ETHTx
export interface ETHTx {
  nonce: string;
  value: string;
  chainId: string;
  to: string;
  r: string;
  s: string;
}

// struct2ts:types/generated/types.SubmitETHTxRequest
export interface SubmitETHTxRequest {
  PublicKeyBase58Check: string;
  Tx: ETHTx;
  TxBytes: string;
  ToSign: string[] | null;
  SignedHashes: string[] | null;
}

// struct2ts:types/generated/types.SubmitETHTxResponse
export interface SubmitETHTxResponse {
  DESOTxHash: string;
}

// struct2ts:types/generated/types.ETHTxLog
export interface ETHTxLog {
  PublicKey: number[] | null;
  DESOTxHash: string;
}

// struct2ts:types/generated/types.AdminProcessETHTxRequest
export interface AdminProcessETHTxRequest {
  ETHTxHash: string;
}

// struct2ts:types/generated/types.AdminProcessETHTxResponse
export interface AdminProcessETHTxResponse {
  DESOTxHash: string;
}

// struct2ts:types/generated/types.InfuraResponse
export interface InfuraResponse {
  id: number;
  jsonrpc: string;
  result: any;
  error: {
    code: number;
    message: string;
  };
}

// struct2ts:types/generated/types.InfuraTx
export interface InfuraTx {
  blockHash: string | null;
  blockNumber: string | null;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string | null;
  transactionIndex: string | null;
  value: string;
  v: string;
  r: string;
  s: string;
  maxPriorityFeePerGas: string | null;
  maxFeePerGas: string | null;
  chainId: string | null;
  type: string;
}

// struct2ts:types/generated/types.QueryETHRPCRequest
export interface QueryETHRPCRequest {
  Method: string;
  Params: any[];
  UseNetwork?: string;
}

// struct2ts:types/generated/types.HeaderResponse
export interface HeaderResponse {
  BlockHashHex: string;
  Version: number;
  PrevBlockHashHex: string;
  TransactionMerkleRootHex: string;
  TstampSecs: number;
  Height: number;
  Nonce: number;
  ExtraNonce: number;
}

// struct2ts:types/generated/types.InputResponse
export interface InputResponse {
  TransactionIDBase58Check: string;
  Index: number;
}

// struct2ts:types/generated/types.OutputResponse
export interface OutputResponse {
  PublicKeyBase58Check: string;
  AmountNanos: number;
}

// struct2ts:types/generated/types.TransactionResponse
export interface TransactionResponse {
  TransactionIDBase58Check: string;
  RawTransactionHex: string;
  Inputs: InputResponse[] | null;
  Outputs: OutputResponse[] | null;
  SignatureHex: string;
  TransactionType: string;
  BlockHashHex: string;
  TransactionMetadata: TransactionMetadata;
  ExtraData: { [key: string]: string };
}

// struct2ts:types/generated/types.APIBaseResponse
export interface APIBaseResponse {
  Error: string;
  Header: HeaderResponse | null;
  Transactions: TransactionResponse[] | null;
}

// struct2ts:types/generated/types.APIKeyPairRequest
export interface APIKeyPairRequest {
  Mnemonic: string;
  ExtraText: string;
  Index: number;
}

// struct2ts:types/generated/types.APIKeyPairResponse
export interface APIKeyPairResponse {
  Error: string;
  PublicKeyBase58Check: string;
  PublicKeyHex: string;
  PrivateKeyBase58Check: string;
  PrivateKeyHex: string;
}

// struct2ts:types/generated/types.APIBalanceRequest
export interface APIBalanceRequest {
  PublicKeyBase58Check: string;
  Confirmations: number;
}

// struct2ts:types/generated/types.UTXOEntryResponse
export interface UTXOEntryResponse {
  TransactionIDBase58Check: string;
  Index: number;
  AmountNanos: number;
  PublicKeyBase58Check: string;
  Confirmations: number;
  UtxoType: string;
  BlockHeight: number;
}

// struct2ts:types/generated/types.APIBalanceResponse
export interface APIBalanceResponse {
  Error: string;
  ConfirmedBalanceNanos: number;
  UnconfirmedBalanceNanos: number;
  UTXOs: UTXOEntryResponse[] | null;
}

// struct2ts:types/generated/types.TransactionInfoResponse
export interface TransactionInfoResponse {
  TotalInputNanos: number;
  SpendAmountNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  FeeRateNanosPerKB: number;
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.APITransferDeSoRequest
export interface APITransferDeSoRequest {
  SenderPrivateKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  AmountNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  DryRun: boolean;
}

// struct2ts:types/generated/types.APITransferDeSoResponse
export interface APITransferDeSoResponse {
  Error: string;
  Transaction: TransactionResponse | null;
  TransactionInfo: TransactionInfoResponse | null;
}

// struct2ts:types/generated/types.APITransactionInfoRequest
export interface APITransactionInfoRequest {
  IsMempool: boolean;
  TransactionIDBase58Check: string;
  PublicKeyBase58Check: string;
  IDsOnly: boolean;
  LastTransactionIDBase58Check: string;
  LastPublicKeyTransactionIndex: number;
  Limit: number;
}

// struct2ts:types/generated/types.APITransactionInfoResponse
export interface APITransactionInfoResponse {
  Error: string;
  Transactions: TransactionResponse[] | null;
  LastTransactionIDBase58Check: string;
  LastPublicKeyTransactionIndex: number;
  BalanceNanos: number;
}

// struct2ts:types/generated/types.APINodeInfoResponse
export interface APINodeInfoResponse {
  Error: string;
}

// struct2ts:types/generated/types.APIBlockRequest
export interface APIBlockRequest {
  Height: number;
  HashHex: string;
  FullBlock: boolean;
}

// struct2ts:types/generated/types.APIBlockResponse
export interface APIBlockResponse {
  Error: string;
  Header: HeaderResponse | null;
  Transactions: TransactionResponse[] | null;
}

// struct2ts:types/generated/types.ExtraDataEncoding
export interface ExtraDataEncoding {
  Decode: ExtraDataDecoderFunc;
  Encode: ExtraDataEncoderFunc;
}

// struct2ts:types/generated/types.GlobalState
export interface GlobalState {
  GlobalStateRemoteNode: string;
  GlobalStateRemoteSecret: string;
  GlobalStateDB: DB | null;
}

// struct2ts:types/generated/types.HotFeedApprovedPostOp
export interface HotFeedApprovedPostOp {
  IsRemoval: boolean;
  Multiplier: number;
}

// struct2ts:types/generated/types.HotFeedPKIDMultiplierOp
export interface HotFeedPKIDMultiplierOp {
  InteractionMultiplier: number;
  PostsMultiplier: number;
}

// struct2ts:types/generated/types.PhoneNumberMetadata
export interface PhoneNumberMetadata {
  PublicKey: number[] | null;
  PhoneNumber: string;
  PhoneNumberCountryCode: string;
  ShouldCompProfileCreation: boolean;
  PublicKeyDeleted: boolean;
}

// struct2ts:types/generated/types.WyreWalletOrderWebhookPayload
export interface WyreWalletOrderWebhookPayload {
  referenceId: string;
  accountId: string;
  orderId: string;
  orderStatus: string;
  transferId: string;
  failedReason: string;
}

// struct2ts:types/generated/types.WyreTrackOrderResponse
export interface WyreTrackOrderResponse {
  transferId: string;
  feeCurrency: string;
  fee: number;
  fees: any;
  sourceCurrency: string;
  destCurrency: string;
  sourceAmount: number;
  destAmount: number;
  destSrn: string;
  from: string;
  to: any;
  rate: number;
  customId: any;
  status: any;
  blockchainNetworkTx: any;
  message: any;
  transferHistoryEntryType: string;
  successTimeline: [] | null;
  failedTimeline: any;
  failureReason: any;
  reversalReason: any;
}

// struct2ts:types/generated/types.WyreWalletOrderMetadata
export interface WyreWalletOrderMetadata {
  LatestWyreWalletOrderWebhookPayload: WyreWalletOrderWebhookPayload;
  LatestWyreTrackWalletOrderResponse: WyreTrackOrderResponse | null;
  DeSoPurchasedNanos: number;
  BasicTransferTxnBlockHash: number[];
}

// struct2ts:types/generated/types.PutRemoteRequest
export interface PutRemoteRequest {
  Key: number[] | null;
  Value: number[] | null;
}

// struct2ts:types/generated/types.GetRemoteRequest
export interface GetRemoteRequest {
  Key: number[] | null;
}

// struct2ts:types/generated/types.GetRemoteResponse
export interface GetRemoteResponse {
  Value: number[] | null;
}

// struct2ts:types/generated/types.BatchGetRemoteRequest
export interface BatchGetRemoteRequest {
  KeyList: number[] | null;
}

// struct2ts:types/generated/types.BatchGetRemoteResponse
export interface BatchGetRemoteResponse {
  ValueList: number[] | null;
}

// struct2ts:types/generated/types.DeleteRemoteRequest
export interface DeleteRemoteRequest {
  Key: number[] | null;
}

// struct2ts:types/generated/types.SeekRemoteRequest
export interface SeekRemoteRequest {
  StartPrefix: number[] | null;
  ValidForPrefix: number[] | null;
  MaxKeyLen: number;
  NumToFetch: number;
  Reverse: boolean;
  FetchValues: boolean;
}

// struct2ts:types/generated/types.SeekRemoteResponse
export interface SeekRemoteResponse {
  KeysFound: number[] | null;
  ValsFound: number[] | null;
}

// struct2ts:types/generated/types.HotFeedEntry
export interface HotFeedEntry {
  PostHash: number[];
  PostHashHex: string;
  HotnessScore: number;
}

// struct2ts:types/generated/types.HotFeedEntryTimeSortable
export interface HotFeedEntryTimeSortable {
  PostHash: number[];
  PostHashHex: string;
  HotnessScore: number;
  PostBlockAge: number;
}

// struct2ts:types/generated/types.HotFeedInteractionKey
export interface HotFeedInteractionKey {
  InteractionPKID: number[];
  InteractionPostHash: number[];
}

// struct2ts:types/generated/types.HotFeedPKIDMultiplier
export interface HotFeedPKIDMultiplier {
  InteractionMultiplier: number;
  PostsMultiplier: number;
}

// struct2ts:types/generated/types.HotnessPostInfo
export interface HotnessPostInfo {
  PostBlockAge: number;
  HotnessScore: number;
}

// struct2ts:types/generated/types.HotFeedPageRequest
export interface HotFeedPageRequest {
  ReaderPublicKeyBase58Check: string;
  SeenPosts: string[] | null;
  ResponseLimit: number;
  Tag: string;
  SortByNew: boolean;
}

// struct2ts:types/generated/types.HotFeedPageResponse
export interface HotFeedPageResponse {
  HotFeedPage: PostEntryResponse[] | null;
}

// struct2ts:types/generated/types.AdminUpdateHotFeedAlgorithmRequest
export interface AdminUpdateHotFeedAlgorithmRequest {
  InteractionCap: number;
  InteractionCapTag: number;
  TimeDecayBlocks: number;
  TimeDecayBlocksTag: number;
  TxnTypeMultiplierMap: { [key: number]: number };
}

// struct2ts:types/generated/types.AdminGetHotFeedAlgorithmResponse
export interface AdminGetHotFeedAlgorithmResponse {
  InteractionCap: number;
  InteractionCapTag: number;
  TimeDecayBlocks: number;
  TimeDecayBlocksTag: number;
  TxnTypeMultiplierMap: { [key: number]: number };
}

// struct2ts:types/generated/types.AdminUpdateHotFeedPostMultiplierRequest
export interface AdminUpdateHotFeedPostMultiplierRequest {
  PostHashHex: string;
  Multiplier: number;
}

// struct2ts:types/generated/types.AdminUpdateHotFeedUserMultiplierRequest
export interface AdminUpdateHotFeedUserMultiplierRequest {
  Username: string;
  InteractionMultiplier: number;
  PostsMultiplier: number;
}

// struct2ts:types/generated/types.AdminGetHotFeedUserMultiplierRequest
export interface AdminGetHotFeedUserMultiplierRequest {
  Username: string;
}

// struct2ts:types/generated/types.AdminGetHotFeedUserMultiplierResponse
export interface AdminGetHotFeedUserMultiplierResponse {
  InteractionMultiplier: number;
  PostsMultiplier: number;
}

// struct2ts:types/generated/types.UploadImageResponse
export interface UploadImageResponse {
  ImageURL: string;
}

// struct2ts:types/generated/types.GetFullTikTokURLRequest
export interface GetFullTikTokURLRequest {
  TikTokShortVideoID: string;
}

// struct2ts:types/generated/types.GetFullTikTokURLResponse
export interface GetFullTikTokURLResponse {
  FullTikTokURL: string;
}

// struct2ts:types/generated/types.CFVideoDetailsResponse
export interface CFVideoDetailsResponse {
  result: { [key: string]: any };
  success: boolean;
  errors: any;
  messages: any;
}

export interface GetVideoDimensionsResponse {
  Height: number;
  Width: number;
}

export interface EnableVideoDownloadResponse {
  Default: { [k: string]: any };
}

// struct2ts:types/generated/types.GetMessagesStatelessRequest
export interface GetMessagesStatelessRequest {
  PublicKeyBase58Check: string;
  FetchAfterPublicKeyBase58Check: string;
  NumToFetch: number;
  HoldersOnly: boolean;
  HoldingsOnly: boolean;
  FollowersOnly: boolean;
  FollowingOnly: boolean;
  SortAlgorithm: string;
}

// struct2ts:types/generated/types.MessageEntryResponse
export interface MessageEntryResponse {
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
  ExtraData: { [key: string]: string };
}

// struct2ts:types/generated/types.MessageContactResponse
export interface MessageContactResponse {
  PublicKeyBase58Check: string;
  Messages: MessageEntryResponse[] | null;
  ProfileEntryResponse: ProfileEntryResponse | null;
  NumMessagesRead: number;
}

// struct2ts:types/generated/types.MessagingGroupMemberResponse
export interface MessagingGroupMemberResponse {
  GroupMemberPublicKeyBase58Check: string;
  GroupMemberKeyName: string;
  EncryptedKey: string;
}

// struct2ts:types/generated/types.MessagingGroupEntryResponse
export interface MessagingGroupEntryResponse {
  GroupOwnerPublicKeyBase58Check: string;
  MessagingPublicKeyBase58Check: string;
  MessagingGroupKeyName: string;
  MessagingGroupMembers: MessagingGroupMemberResponse[] | null;
  EncryptedKey: string;
  ExtraData: { [key: string]: string };
}

// struct2ts:types/generated/types.GetMessagesResponse
export interface GetMessagesResponse {
  PublicKeyToProfileEntry: { [key: string]: ProfileEntryResponse };
  OrderedContactsWithMessages: MessageContactResponse[] | null;
  UnreadStateByContact: { [key: string]: boolean };
  NumberOfUnreadThreads: number;
  MessagingGroups: MessagingGroupEntryResponse[] | null;
}

// struct2ts:types/generated/types.SendMessageStatelessRequest
export interface SendMessageStatelessRequest {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  MessageText: string;
  EncryptedMessageText: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingGroupKeyName: string;
  ExtraData: { [key: string]: string };
}

// struct2ts:types/generated/types.SendMessageStatelessResponse
export interface SendMessageStatelessResponse {
  TstampNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.MarkContactMessagesReadRequest
export interface MarkContactMessagesReadRequest {
  JWT: string;
  UserPublicKeyBase58Check: string;
  ContactPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.MarkAllMessagesReadRequest
export interface MarkAllMessagesReadRequest {
  JWT: string;
  UserPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.RegisterMessagingGroupKeyRequest
export interface RegisterMessagingGroupKeyRequest {
  OwnerPublicKeyBase58Check: string;
  MessagingPublicKeyBase58Check: string;
  MessagingGroupKeyName: string;
  MessagingKeySignatureHex: string;
  ExtraData: { [key: string]: string };
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.RegisterMessagingGroupKeyResponse
export interface RegisterMessagingGroupKeyResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/generated/types.GetAllMessagingGroupKeysRequest
export interface GetAllMessagingGroupKeysRequest {
  OwnerPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetAllMessagingGroupKeysResponse
export interface GetAllMessagingGroupKeysResponse {
  MessagingGroupEntries: MessagingGroupEntryResponse[] | null;
}

// struct2ts:types/generated/types.CheckPartyMessagingKeysRequest
export interface CheckPartyMessagingKeysRequest {
  SenderPublicKeyBase58Check: string;
  SenderMessagingKeyName: string;
  RecipientPublicKeyBase58Check: string;
  RecipientMessagingKeyName: string;
}

// struct2ts:types/generated/types.CheckPartyMessagingKeysResponse
export interface CheckPartyMessagingKeysResponse {
  SenderMessagingPublicKeyBase58Check: string;
  SenderMessagingKeyName: string;
  IsSenderMessagingKey: boolean;
  RecipientMessagingPublicKeyBase58Check: string;
  RecipientMessagingKeyName: string;
  IsRecipientMessagingKey: boolean;
}

// struct2ts:types/generated/types.GetBlockTemplateRequest
export interface GetBlockTemplateRequest {
  PublicKeyBase58Check: string;
  NumHeaders: number;
  HeaderVersion: number;
}

// struct2ts:types/generated/types.GetBlockTemplateResponse
export interface GetBlockTemplateResponse {
  Headers: number[] | null;
  ExtraNonces: number[] | null;
  BlockID: string;
  DifficultyTargetHex: string;
  LatestBlockTemplateStats: BlockTemplateStats;
}

// struct2ts:types/generated/types.SubmitBlockRequest
export interface SubmitBlockRequest {
  PublicKeyBase58Check: string;
  Header: string[] | null;
  ExtraNonce: number;
  BlockID: string;
}

// struct2ts:types/generated/types.SubmitBlockResponse
export interface SubmitBlockResponse {
  IsMainChain: boolean;
  IsOrphan: boolean;
}

// struct2ts:types/generated/types.NFTEntryResponse
export interface NFTEntryResponse {
  OwnerPublicKeyBase58Check: string;
  ProfileEntryResponse: ProfileEntryResponse | null;
  PostEntryResponse: PostEntryResponse | null;
  SerialNumber: number;
  IsForSale: boolean;
  IsPending: boolean;
  IsBuyNow: boolean;
  BuyNowPriceNanos: number;
  MinBidAmountNanos: number;
  LastAcceptedBidAmountNanos: number;
  HighestBidAmountNanos: number;
  LowestBidAmountNanos: number;
  LastOwnerPublicKeyBase58Check: string | null;
  EncryptedUnlockableText: string | null;
  ExtraData: { [key: string]: string };
}

// struct2ts:types/generated/types.NFTCollectionResponse
export interface NFTCollectionResponse {
  ProfileEntryResponse: ProfileEntryResponse | null;
  PostEntryResponse: PostEntryResponse | null;
  HighestBidAmountNanos: number;
  LowestBidAmountNanos: number;
  HighestBuyNowPriceNanos: number | null;
  LowestBuyNowPriceNanos: number | null;
  NumCopiesForSale: number;
  NumCopiesBuyNow: number;
  AvailableSerialNumbers: number[] | null;
}

// struct2ts:types/generated/types.NFTBidEntryResponse
export interface NFTBidEntryResponse {
  PublicKeyBase58Check: string;
  ProfileEntryResponse: ProfileEntryResponse | null;
  PostHashHex: string | null;
  PostEntryResponse: PostEntryResponse | null;
  SerialNumber: number;
  BidAmountNanos: number;
  HighestBidAmountNanos: number | null;
  LowestBidAmountNanos: number | null;
  AcceptedBlockHeight: number | null;
  BidderBalanceNanos: number;
}

// struct2ts:types/generated/types.CreateNFTRequest
export interface CreateNFTRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  NumCopies: number;
  NFTRoyaltyToCreatorBasisPoints: number;
  NFTRoyaltyToCoinBasisPoints: number;
  HasUnlockable: boolean;
  IsForSale: boolean;
  MinBidAmountNanos: number;
  IsBuyNow: boolean;
  BuyNowPriceNanos: number;
  AdditionalDESORoyaltiesMap: { [key: string]: number };
  AdditionalCoinRoyaltiesMap: { [key: string]: number };
  ExtraData: { [key: string]: string };
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.CreateNFTResponse
export interface CreateNFTResponse {
  NFTPostHashHex: string;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.UpdateNFTRequest
export interface UpdateNFTRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  IsForSale: boolean;
  MinBidAmountNanos: number;
  IsBuyNow: boolean;
  BuyNowPriceNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.UpdateNFTResponse
export interface UpdateNFTResponse {
  NFTPostHashHex: string;
  SerialNumber: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.CreateNFTBidRequest
export interface CreateNFTBidRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  BidAmountNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.CreateNFTBidResponse
export interface CreateNFTBidResponse {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  BidAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.AcceptNFTBidRequest
export interface AcceptNFTBidRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  BidderPublicKeyBase58Check: string;
  BidAmountNanos: number;
  EncryptedUnlockableText: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.AcceptNFTBidResponse
export interface AcceptNFTBidResponse {
  BidderPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  BidAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.GetNFTShowcaseRequest
export interface GetNFTShowcaseRequest {
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetNFTShowcaseResponse
export interface GetNFTShowcaseResponse {
  NFTCollections: NFTCollectionResponse[] | null;
}

// struct2ts:types/generated/types.GetNextNFTShowcaseResponse
export interface GetNextNFTShowcaseResponse {
  NextNFTShowcaseTstamp: number;
}

// struct2ts:types/generated/types.GetNFTsForUserRequest
export interface GetNFTsForUserRequest {
  UserPublicKeyBase58Check: string;
  ReaderPublicKeyBase58Check: string;
  IsForSale: boolean | null;
  IsPending: boolean | null;
}

// struct2ts:types/generated/types.NFTEntryAndPostEntryResponse
export interface NFTEntryAndPostEntryResponse {
  PostEntryResponse: PostEntryResponse | null;
  NFTEntryResponses: NFTEntryResponse[] | null;
}

// struct2ts:types/generated/types.GetNFTsForUserResponse
export interface GetNFTsForUserResponse {
  NFTsMap: { [key: string]: NFTEntryAndPostEntryResponse };
}

// struct2ts:types/generated/types.GetNFTBidsForUserRequest
export interface GetNFTBidsForUserRequest {
  UserPublicKeyBase58Check: string;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetNFTBidsForUserResponse
export interface GetNFTBidsForUserResponse {
  NFTBidEntries: NFTBidEntryResponse[] | null;
  PublicKeyBase58CheckToProfileEntryResponse: {
    [key: string]: ProfileEntryResponse;
  };
  PostHashHexToPostEntryResponse: { [key: string]: PostEntryResponse };
}

// struct2ts:types/generated/types.GetNFTBidsForNFTPostRequest
export interface GetNFTBidsForNFTPostRequest {
  ReaderPublicKeyBase58Check: string;
  PostHashHex: string;
}

// struct2ts:types/generated/types.GetNFTBidsForNFTPostResponse
export interface GetNFTBidsForNFTPostResponse {
  PostEntryResponse: PostEntryResponse | null;
  NFTEntryResponses: NFTEntryResponse[] | null;
  BidEntryResponses: NFTBidEntryResponse[] | null;
}

// struct2ts:types/generated/types.GetNFTCollectionSummaryRequest
export interface GetNFTCollectionSummaryRequest {
  PostHashHex: string;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetNFTCollectionSummaryResponse
export interface GetNFTCollectionSummaryResponse {
  NFTCollectionResponse: NFTCollectionResponse | null;
  SerialNumberToNFTEntryResponse: { [key: number]: NFTEntryResponse };
}

// struct2ts:types/generated/types.GetNFTEntriesForPostHashRequest
export interface GetNFTEntriesForPostHashRequest {
  PostHashHex: string;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetNFTEntriesForPostHashResponse
export interface GetNFTEntriesForPostHashResponse {
  NFTEntryResponses: NFTEntryResponse[] | null;
}

// struct2ts:types/generated/types.TransferNFTRequest
export interface TransferNFTRequest {
  SenderPublicKeyBase58Check: string;
  ReceiverPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  EncryptedUnlockableText: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.TransferNFTResponse
export interface TransferNFTResponse {
  SenderPublicKeyBase58Check: string;
  ReceiverPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.AcceptNFTTransferRequest
export interface AcceptNFTTransferRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.AcceptNFTTransferResponse
export interface AcceptNFTTransferResponse {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.BurnNFTRequest
export interface BurnNFTRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.BurnNFTResponse
export interface BurnNFTResponse {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.GetNFTsCreatedByPublicKeyRequest
export interface GetNFTsCreatedByPublicKeyRequest {
  PublicKeyBase58Check: string;
  Username: string;
  ReaderPublicKeyBase58Check: string;
  LastPostHashHex: string;
  NumToFetch: number;
}

// struct2ts:types/generated/types.NFTDetails
export interface NFTDetails {
  NFTEntryResponses: NFTEntryResponse[] | null;
  NFTCollectionResponse: NFTCollectionResponse | null;
}

// struct2ts:types/generated/types.GetNFTsCreatedByPublicKeyResponse
export interface GetNFTsCreatedByPublicKeyResponse {
  NFTs: NFTDetails[] | null;
  LastPostHashHex: string;
}

// struct2ts:types/generated/types.GetAcceptedBidHistoryResponse
export interface GetAcceptedBidHistoryResponse {
  AcceptedBidHistoryMap: { [key: number]: NFTBidEntryResponse };
}

// struct2ts:types/generated/types.GetPostsStatelessRequest
export interface GetPostsStatelessRequest {
  PostHashHex: string;
  ReaderPublicKeyBase58Check: string;
  OrderBy: string;
  StartTstampSecs: number;
  PostContent: string;
  NumToFetch: number;
  FetchSubcomments: boolean;
  GetPostsForFollowFeed: boolean;
  GetPostsForGlobalWhitelist: boolean;
  GetPostsByDESO: boolean;
  GetPostsByClout: boolean;
  MediaRequired: boolean;
  PostsByDESOMinutesLookback: number;
  AddGlobalFeedBool: boolean;
  OnlyNFTs: boolean;
  OnlyPosts: boolean;
}

// struct2ts:types/generated/types.GetPostsStatelessResponse
export interface GetPostsStatelessResponse {
  PostsFound: PostEntryResponse[] | null;
}

export interface GetPostsHashHexListRequest {
  PostsHashHexList: string[];
  ReaderPublicKeyBase58Check: string;
  OrderBy: string;
  OnlyNFTs: boolean;
  OnlyPosts: boolean;
}

export interface SkippedPostEntryResponse {
  PostHashHex: string;
  Error: string;
}

export interface GetPostsHashHexListResponse {
  PostsFound: PostEntryResponse[];
  PostsSkipped: SkippedPostEntryResponse[];
}

// struct2ts:types/generated/types.GetSinglePostRequest
export interface GetSinglePostRequest {
  PostHashHex: string;
  FetchParents: boolean;
  CommentOffset: number;
  CommentLimit: number;
  ReaderPublicKeyBase58Check: string;
  ThreadLevelLimit: number;
  ThreadLeafLimit: number;
  LoadAuthorThread: boolean;
  AddGlobalFeedBool: boolean;
}

// struct2ts:types/generated/types.GetSinglePostResponse
export interface GetSinglePostResponse {
  PostFound: PostEntryResponse | null;
}

// struct2ts:types/generated/types.CommentsPostEntryResponse
export interface CommentsPostEntryResponse {
  PostEntryResponse: PostEntryResponse | null;
  PosterPublicKeyBytes: number[] | null;
}

// struct2ts:types/generated/types.GetPostsForPublicKeyRequest
export interface GetPostsForPublicKeyRequest {
  PublicKeyBase58Check: string;
  Username: string;
  ReaderPublicKeyBase58Check: string;
  LastPostHashHex: string;
  NumToFetch: number;
  MediaRequired: boolean;
  OnlyNFTs: boolean;
  OnlyPosts: boolean;
}

// struct2ts:types/generated/types.GetPostsForPublicKeyResponse
export interface GetPostsForPublicKeyResponse {
  Posts: PostEntryResponse[] | null;
  LastPostHashHex: string;
}

// struct2ts:types/generated/types.GetPostsDiamondedBySenderForReceiverRequest
export interface GetPostsDiamondedBySenderForReceiverRequest {
  ReceiverPublicKeyBase58Check: string;
  ReceiverUsername: string;
  SenderPublicKeyBase58Check: string;
  SenderUsername: string;
  ReaderPublicKeyBase58Check: string;
  StartPostHashHex: string;
  NumToFetch: number;
}

// struct2ts:types/generated/types.GetPostsDiamondedBySenderForReceiverResponse
export interface GetPostsDiamondedBySenderForReceiverResponse {
  DiamondedPosts: PostEntryResponse[] | null;
  TotalDiamondsGiven: number;
  ReceiverProfileEntryResponse: ProfileEntryResponse | null;
  SenderProfileEntryResponse: ProfileEntryResponse | null;
}

// struct2ts:types/generated/types.GetLikesForPostRequest
export interface GetLikesForPostRequest {
  PostHashHex: string;
  Offset: number;
  Limit: number;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetLikesForPostResponse
export interface GetLikesForPostResponse {
  Likers: ProfileEntryResponse[] | null;
}

// struct2ts:types/generated/types.GetDiamondsForPostRequest
export interface GetDiamondsForPostRequest {
  PostHashHex: string;
  Offset: number;
  Limit: number;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.DiamondSenderResponse
export interface DiamondSenderResponse {
  DiamondSenderProfile: ProfileEntryResponse | null;
  DiamondLevel: number;
}

// struct2ts:types/generated/types.GetDiamondsForPostResponse
export interface GetDiamondsForPostResponse {
  DiamondSenders: DiamondSenderResponse[] | null;
}

// struct2ts:types/generated/types.GetRepostsForPostRequest
export interface GetRepostsForPostRequest {
  PostHashHex: string;
  Offset: number;
  Limit: number;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetRepostsForPostResponse
export interface GetRepostsForPostResponse {
  Reposters: ProfileEntryResponse[] | null;
  Reclouters: ProfileEntryResponse[] | null;
}

// struct2ts:types/generated/types.GetQuoteRepostsForPostRequest
export interface GetQuoteRepostsForPostRequest {
  PostHashHex: string;
  Offset: number;
  Limit: number;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetQuoteRepostsForPostResponse
export interface GetQuoteRepostsForPostResponse {
  QuoteReposts: PostEntryResponse[] | null;
  QuoteReclouts: PostEntryResponse[] | null;
}

// struct2ts:types/generated/types.GetReferralInfoForUserRequest
export interface GetReferralInfoForUserRequest {
  PublicKeyBase58Check: string;
  JWT: string;
}

// struct2ts:types/generated/types.GetReferralInfoForUserResponse
export interface GetReferralInfoForUserResponse {
  ReferralInfoResponses: ReferralInfoResponse[] | null;
}

// struct2ts:types/generated/types.GetReferralInfoForReferralHashRequest
export interface GetReferralInfoForReferralHashRequest {
  ReferralHash: string;
}

// struct2ts:types/generated/types.GetReferralInfoForReferralHashResponse
export interface GetReferralInfoForReferralHashResponse {
  ReferralInfoResponse: SimpleReferralInfoResponse | null;
  CountrySignUpBonus: CountryLevelSignUpBonus;
}

// struct2ts:honnef.co/go/tools/config.Config
export interface Config {
  Checks: string[] | null;
  Initialisms: string[] | null;
  DotImportWhitelist: string[] | null;
  HTTPStatusCodeWhitelist: string[] | null;
}

// struct2ts:net/http.Client

// struct2ts:github.com/kevinburke/twilio-go.ConferenceService
export type ConferenceService = any;

// struct2ts:github.com/kevinburke/twilio-go.NumberPurchasingService
export type NumberPurchasingService = any;

// struct2ts:github.com/kevinburke/twilio-go.IncomingNumberService
export interface IncomingNumberService {
  Local: NumberPurchasingService | null;
  TollFree: NumberPurchasingService | null;
}

// struct2ts:github.com/kevinburke/twilio-go.VoicePriceService

// struct2ts:github.com/kevinburke/twilio-go.MessagingPriceService

// struct2ts:github.com/kevinburke/twilio-go.CountryPhoneNumberPriceService

// struct2ts:github.com/kevinburke/twilio-go.Client

// struct2ts:types/generated/types.LastTradePriceHistoryItem
export interface LastTradePriceHistoryItem {
  LastTradePrice: number;
  Timestamp: number;
}

// struct2ts:types/generated/types.RichListEntryResponse
export interface RichListEntryResponse {
  PublicKeyBase58Check: string;
  BalanceNanos: number;
  BalanceDESO: number;
  Percentage: number;
  Value: number;
}

// struct2ts:types/generated/types.Route
export interface Route {
  Name: string;
  Method: string[] | null;
  Pattern: string;
  HandlerFunc: any;
  AccessLevel: number;
}

// struct2ts:types/generated/types.AdminRequest
export interface AdminRequest {
  JWT: string;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.AmplitudeEvent
export interface AmplitudeEvent {
  user_id: string;
  event_type: string;
  event_properties: { [key: string]: any };
}

// struct2ts:types/generated/types.AmplitudeUploadRequestBody
export interface AmplitudeUploadRequestBody {
  api_key: string;
  events: AmplitudeEvent[] | null;
}

// struct2ts:types/generated/types.TransactionInfo
export interface TransactionInfo {
  TotalInputNanos: number;
  SpendAmountNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  TransactionIDBase58Check: string;
  RecipientPublicKeys: string[] | null;
  RecipientAmountsNanos: number[] | null;
  TransactionHex: string;
  TimeAdded: number;
}

// struct2ts:types/generated/types.User
export interface User {
  PublicKeyBase58Check: string;
  ProfileEntryResponse: ProfileEntryResponse | null;
  Utxos: UTXOEntryResponse[] | null;
  BalanceNanos: number;
  UnminedBalanceNanos: number;
  PublicKeysBase58CheckFollowedByUser: string[] | null;
  UsersYouHODL: BalanceEntryResponse[] | null;
  UsersWhoHODLYouCount: number;
  HasPhoneNumber: boolean;
  CanCreateProfile: boolean;
  // https://github.com/deso-protocol/backend/blob/983c803c2f3f441fb49e13c73cc27a26ecf52375/routes/global_state.go#L333
  BlockedPubKeys: { [key: string]: {} };
  HasEmail: boolean;
  EmailVerified: boolean;
  JumioStartTime: number;
  JumioFinishedTime: number;
  JumioVerified: boolean;
  JumioReturned: boolean;
  IsAdmin: boolean;
  IsSuperAdmin: boolean;
  IsBlacklisted: boolean;
  IsGraylisted: boolean;
  TutorialStatus: string;
  CreatorPurchasedInTutorialUsername: string | null;
  CreatorCoinsPurchasedInTutorial: number;
  MustCompleteTutorial: boolean;
}

// struct2ts:types/generated/types.RichListEntry
export interface RichListEntry {
  KeyBytes: number[] | null;
  BalanceNanos: number;
}

// struct2ts:types/generated/types.GetTxnRequest
export interface GetTxnRequest {
  TxnHashHex: string;
}

// struct2ts:types/generated/types.GetTxnResponse
export interface GetTxnResponse {
  TxnFound: boolean;
}

// struct2ts:types/generated/types.SubmitTransactionRequest
export interface SubmitTransactionRequest {
  TransactionHex: string;
}

// struct2ts:types/generated/types.SubmitTransactionResponse
export interface SubmitTransactionResponse {
  Transaction: MsgDeSoTxn;
  TxnHashHex: string;
  PostEntryResponse: PostEntryResponse | null;
}

// struct2ts:types/generated/types.UpdateProfileRequest
export interface UpdateProfileRequest {
  UpdaterPublicKeyBase58Check: string;
  ProfilePublicKeyBase58Check: string;
  NewUsername: string;
  NewDescription: string;
  NewProfilePic: string;
  NewCreatorBasisPoints: number;
  NewStakeMultipleBasisPoints: number;
  IsHidden: boolean;
  ExtraData: { [key: string]: string };
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.UpdateProfileResponse
export interface UpdateProfileResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
  CompProfileCreationTxnHashHex: string;
}

// struct2ts:types/generated/types.ExchangeBitcoinRequest
export interface ExchangeBitcoinRequest {
  PublicKeyBase58Check: string;
  BurnAmountSatoshis: number;
  FeeRateSatoshisPerKB: number;
  LatestBitcionAPIResponse: BlockCypherAPIFullAddressResponse;
  BTCDepositAddress: string;
  Broadcast: boolean;
  SignedHashes: string[] | null;
}

// struct2ts:types/generated/types.ExchangeBitcoinResponse
export interface ExchangeBitcoinResponse {
  TotalInputSatoshis: number;
  BurnAmountSatoshis: number;
  ChangeAmountSatoshis: number;
  FeeSatoshis: number;
  BitcoinTransaction: MsgTx | null;
  SerializedTxnHex: string;
  TxnHashHex: string;
  DeSoTxnHashHex: string;
  UnsignedHashes: string[] | null;
}

// struct2ts:types/generated/types.SendDeSoRequest
export interface SendDeSoRequest {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyOrUsername: string;
  AmountNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.SendDeSoResponse
export interface SendDeSoResponse {
  TotalInputNanos: number;
  SpendAmountNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  TransactionIDBase58Check: string;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/generated/types.CreateLikeStatelessRequest
export interface CreateLikeStatelessRequest {
  ReaderPublicKeyBase58Check: string;
  LikedPostHashHex: string;
  IsUnlike: boolean;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.CreateLikeStatelessResponse
export interface CreateLikeStatelessResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.SubmitPostRequest
export interface SubmitPostRequest {
  UpdaterPublicKeyBase58Check: string;
  PostHashHexToModify: string;
  ParentStakeID: string;
  BodyObj: DeSoBodySchema;
  RepostedPostHashHex: string;
  PostExtraData: { [key: string]: string };
  IsHidden: boolean;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  InTutorial: boolean;
  IsFrozen: boolean;
}

// struct2ts:types/generated/types.SubmitPostResponse
export interface SubmitPostResponse {
  TstampNanos: number;
  PostHashHex: string;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.CreateFollowTxnStatelessRequest
export interface CreateFollowTxnStatelessRequest {
  FollowerPublicKeyBase58Check: string;
  FollowedPublicKeyBase58Check: string;
  IsUnfollow: boolean;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.CreateFollowTxnStatelessResponse
export interface CreateFollowTxnStatelessResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/generated/types.BuyOrSellCreatorCoinRequest
export interface BuyOrSellCreatorCoinRequest {
  UpdaterPublicKeyBase58Check: string;
  CreatorPublicKeyBase58Check: string;
  OperationType: string;
  DeSoToSellNanos: number;
  CreatorCoinToSellNanos: number;
  DeSoToAddNanos: number;
  MinDeSoExpectedNanos: number;
  MinCreatorCoinExpectedNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  InTutorial: boolean;
  BitCloutToSellNanos: number;
  BitCloutToAddNanos: number;
  MinBitCloutExpectedNanos: number;
}

// struct2ts:types/generated/types.BuyOrSellCreatorCoinResponse
export interface BuyOrSellCreatorCoinResponse {
  ExpectedDeSoReturnedNanos: number;
  ExpectedCreatorCoinReturnedNanos: number;
  FounderRewardGeneratedNanos: number;
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/generated/types.TransferCreatorCoinRequest
export interface TransferCreatorCoinRequest {
  SenderPublicKeyBase58Check: string;
  CreatorPublicKeyBase58Check: string;
  ReceiverUsernameOrPublicKeyBase58Check: string;
  CreatorCoinToTransferNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.TransferCreatorCoinResponse
export interface TransferCreatorCoinResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/generated/types.SendDiamondsRequest
export interface SendDiamondsRequest {
  SenderPublicKeyBase58Check: string;
  ReceiverPublicKeyBase58Check: string;
  DiamondPostHashHex: string;
  DiamondLevel: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  InTutorial: boolean;
}

// struct2ts:types/generated/types.SendDiamondsResponse
export interface SendDiamondsResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/generated/types.DAOCoinRequest
export interface DAOCoinRequest {
  UpdaterPublicKeyBase58Check: string;
  ProfilePublicKeyBase58CheckOrUsername: string;
  OperationType: string;
  CoinsToMintNanos: string;
  CoinsToBurnNanos: string;
  TransferRestrictionStatus: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.DAOCoinResponse
export interface DAOCoinResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/generated/types.TransferDAOCoinRequest
export interface TransferDAOCoinRequest {
  SenderPublicKeyBase58Check: string;
  ProfilePublicKeyBase58CheckOrUsername: string;
  ReceiverPublicKeyBase58CheckOrUsername: string;
  DAOCoinToTransferNanos: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/generated/types.TransferDAOCoinResponse
export interface TransferDAOCoinResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/generated/types.DAOCoinLimitOrderResponse
export interface DAOCoinLimitOrderResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// export interface DAOCoinLimitOrderWithExchangeRateAndQuantityRequest {
//   TransactorPublicKeyBase58Check: string;
//   BuyingDAOCoinCreatorPublicKeyBase58Check: string;
//   SellingDAOCoinCreatorPublicKeyBase58Check: string;
//   ExchangeRateCoinsToSellPerCoinToBuy: number;
//   QuantityToFill: number;
//   OperationType: string;
//   MinFeeRateNanosPerKB?: number;
//   TransactionFees: TransactionFee[] | null;
// }

// struct2ts:types/generated/types.DAOCoinLimitOrderWithCancelOrderIDRequest
export interface DAOCoinLimitOrderWithCancelOrderIDRequest {
  TransactorPublicKeyBase58Check: string;
  CancelOrderID: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

export interface DAOCoinLimitOrderSimulatedExecutionResult {
  BuyingCoinQuantityFilled: string;
  SellingCoinQuantityFilled: string;
}

export interface AssociationLimitMapItem {
  AssociationClass: 'Post' | 'User' | 'Undefined';
  AssociationType: string;
  AppScopeType: 'Any' | 'Scoped' | 'Undefined';
  AppPublicKeyBase58Check: string;
  AssociationOperation: 'Any' | 'Create' | 'Delete' | 'Undefined';
  OpCount: number;
}

export interface AccessGroupLimitMapItem {
  AccessGroupOwnerPublicKeyBase58Check: string;
  ScopeType: 'Any' | 'Scoped' | 'Undefined';
  AccessGroupKeyName: string;
  OperationType: 'Any' | 'Create' | 'Update' | 'Unknown';
  OpCount: number;
}

export interface AccessGroupMemberLimitMapItem {
  AccessGroupOwnerPublicKeyBase58Check: string;
  ScopeType: 'Any' | 'Scoped' | 'Undefined';
  AccessGroupKeyName: string;
  OperationType: 'Any' | 'Add' | 'Remove' | 'Update' | 'Unknown';
  OpCount: number;
}

// struct2ts:types/generated/types.TransactionSpendingLimitResponse
export interface TransactionSpendingLimitResponse {
  GlobalDESOLimit?: number;
  TransactionCountLimitMap?: { [key: string]: number };
  CreatorCoinOperationLimitMap?: { [key: string]: { [key: string]: number } };
  DAOCoinOperationLimitMap?: { [key: string]: { [key: string]: number } };
  NFTOperationLimitMap?: {
    [key: string]: { [key: number]: { [key: string]: number } };
  };
  DAOCoinLimitOrderLimitMap?: { [key: string]: { [key: string]: number } };
  AssociationLimitMap?: AssociationLimitMapItem[];
  AccessGroupLimitMap?: AccessGroupLimitMapItem[];
  AccessGroupMemberLimitMap?: AccessGroupMemberLimitMapItem[];
  IsUnlimited?: boolean;
}

// struct2ts:types/generated/types.AuthorizeDerivedKeyRequest
export interface AuthorizeDerivedKeyRequest {
  OwnerPublicKeyBase58Check: string;
  DerivedPublicKeyBase58Check: string;
  ExpirationBlock: number;
  AccessSignature: string;
  DeleteKey: boolean;
  DerivedKeySignature: boolean;
  ExtraData: { [key: string]: string };
  TransactionSpendingLimitHex: string;
  Memo: string;
  AppName: string;
  TransactionFees: TransactionFee[] | null;
  MinFeeRateNanosPerKB: number;
}

// struct2ts:types/generated/types.AuthorizeDerivedKeyResponse
export interface AuthorizeDerivedKeyResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/generated/types.AppendExtraDataRequest
export interface AppendExtraDataRequest {
  TransactionHex: string;
  ExtraData: { [key: string]: string };
}

// struct2ts:types/generated/types.AppendExtraDataResponse
export interface AppendExtraDataResponse {
  TransactionHex: string;
}

// struct2ts:types/generated/types.GetTransactionSpendingRequest
export interface GetTransactionSpendingRequest {
  TransactionHex: string;
}

// struct2ts:types/generated/types.GetTransactionSpendingResponse
export interface GetTransactionSpendingResponse {
  TotalSpendingNanos: number;
}

// struct2ts:types/generated/types.GetTutorialCreatorsRequest
export interface GetTutorialCreatorsRequest {
  ResponseLimit: number;
}

// struct2ts:types/generated/types.UpdateTutorialStatusRequest
export interface UpdateTutorialStatusRequest {
  PublicKeyBase58Check: string;
  TutorialStatus: string;
  CreatorPurchasedInTutorialPublicKey: string;
  ClearCreatorCoinPurchasedInTutorial: boolean;
  JWT: string;
}

// struct2ts:types/generated/types.GetTutorialCreatorResponse
export interface GetTutorialCreatorResponse {
  UpAndComingProfileEntryResponses: ProfileEntryResponse[] | null;
  WellKnownProfileEntryResponses: ProfileEntryResponse[] | null;
}

// struct2ts:types/generated/types.StartOrSkipTutorialRequest
export interface StartOrSkipTutorialRequest {
  PublicKeyBase58Check: string;
  JWT: string;
  IsSkip: boolean;
}

// struct2ts:types/generated/types.GetUsersStatelessRequest
export interface GetUsersStatelessRequest {
  PublicKeysBase58Check: string[] | null;
  SkipForLeaderboard: boolean;
  IncludeBalance: boolean;
  GetUnminedBalance: boolean;
}

// struct2ts:types/generated/types.GetUsersResponse
export interface GetUsersResponse {
  UserList: User[] | null;
  DefaultFeeRateNanosPerKB: number;
  ParamUpdaters: { [key: string]: boolean };
}

// struct2ts:types/generated/types.GetUserMetadataRequest
export interface GetUserMetadataRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetUserMetadataResponse
export interface GetUserMetadataResponse {
  HasPhoneNumber: boolean;
  CanCreateProfile: boolean;
  BlockedPubKeys: { [key: string]: any };
  HasEmail: boolean;
  EmailVerified: boolean;
  JumioFinishedTime: number;
  JumioVerified: boolean;
  JumioReturned: boolean;
}

// struct2ts:types/generated/types.GetProfilesRequest
export interface GetProfilesRequest {
  PublicKeyBase58Check: string;
  Username: string;
  UsernamePrefix: string;
  Description: string;
  OrderBy: string;
  NumToFetch: number;
  ReaderPublicKeyBase58Check: string;
  ModerationType: string;
  FetchUsersThatHODL: boolean;
  AddGlobalFeedBool: boolean;
}

// struct2ts:types/generated/types.GetProfilesResponse
export interface GetProfilesResponse {
  ProfilesFound: ProfileEntryResponse[] | null;
  NextPublicKey: string | null;
}

// struct2ts:types/generated/types.GetSingleProfileRequest
export interface GetSingleProfileRequest {
  PublicKeyBase58Check: string;
  Username: string;
  NoErrorOnMissing: boolean;
}

// struct2ts:types/generated/types.GetSingleProfileResponse
export interface GetSingleProfileResponse {
  Profile: ProfileEntryResponse | null;
  IsBlacklisted: boolean;
  IsGraylisted: boolean;
}

// struct2ts:types/generated/types.GetHodlersForPublicKeyRequest
export enum HodlersSortType {
  coin_balance = 'coin_balance', // default
  wealth = 'wealth',
}

// struct2ts:types/generated/types.GetHodlersForPublicKeyRequest
export interface GetHodlersForPublicKeyRequest {
  PublicKeyBase58Check: string;
  Username: string;
  LastPublicKeyBase58Check: string;
  NumToFetch: number;
  IsDAOCoin: boolean;
  FetchHodlings: boolean;
  FetchAll: boolean;
  SortType: HodlersSortType;
}

// struct2ts:types/generated/types.GetHodlersForPublicKeyResponse
export interface GetHodlersForPublicKeyResponse {
  Hodlers: BalanceEntryResponse[] | null;
  LastPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.DiamondSenderSummaryResponse
export interface DiamondSenderSummaryResponse {
  SenderPublicKeyBase58Check: string;
  ReceiverPublicKeyBase58Check: string;
  TotalDiamonds: number;
  HighestDiamondLevel: number;
  DiamondLevelMap: { [key: number]: number };
  ProfileEntryResponse: ProfileEntryResponse | null;
}

// struct2ts:types/generated/types.GetDiamondsForPublicKeyRequest
export interface GetDiamondsForPublicKeyRequest {
  PublicKeyBase58Check: string;
  FetchYouDiamonded: boolean;
}

// struct2ts:types/generated/types.GetDiamondsForPublicKeyResponse
export interface GetDiamondsForPublicKeyResponse {
  DiamondSenderSummaryResponses: DiamondSenderSummaryResponse[] | null;
  TotalDiamonds: number;
}

// struct2ts:types/generated/types.GetFollowsStatelessRequest
export interface GetFollowsStatelessRequest {
  PublicKeyBase58Check: string;
  Username: string;
  GetEntriesFollowingUsername: boolean;
  LastPublicKeyBase58Check: string;
  NumToFetch: number;
}

// struct2ts:types/generated/types.GetFollowsResponse
export interface GetFollowsResponse {
  PublicKeyToProfileEntry: { [key: string]: ProfileEntryResponse };
  NumFollowers: number;
}

// struct2ts:types/generated/types.GetUserGlobalMetadataRequest
export interface GetUserGlobalMetadataRequest {
  UserPublicKeyBase58Check: string;
  JWT: string;
}

// struct2ts:types/generated/types.GetUserGlobalMetadataResponse
export interface GetUserGlobalMetadataResponse {
  Email: string;
  PhoneNumber: string;
}

// struct2ts:types/generated/types.UpdateUserGlobalMetadataRequest
export interface UpdateUserGlobalMetadataRequest {
  UserPublicKeyBase58Check: string;
  JWT: string;
  Email: string;
  MessageReadStateUpdatesByContact: { [key: string]: number };
}

// struct2ts:types/generated/types.GetNotificationsCountRequest
export interface GetNotificationsCountRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetNotificationsCountResponse
export interface GetNotificationsCountResponse {
  NotificationsCount: number;
  LastUnreadNotificationIndex: number;
  UpdateMetadata: boolean;
}

// struct2ts:types/generated/types.GetNotificationsRequest
export interface GetNotificationsRequest {
  PublicKeyBase58Check: string;
  FetchStartIndex: number;
  NumToFetch: number;
  FilteredOutNotificationCategories: { [key: string]: boolean };
}

// struct2ts:types/generated/types.TransactionMetadataResponse
export interface TransactionMetadataResponse {
  Metadata: TransactionMetadata;
  TxnOutputResponses: OutputResponse[] | null;
  Txn: TransactionResponse | null;
  Index: number;
}

// struct2ts:types/generated/types.GetNotificationsResponse
export interface GetNotificationsResponse {
  Notifications: TransactionMetadataResponse[] | null;
  ProfilesByPublicKey: { [key: string]: ProfileEntryResponse };
  PostsByHash: { [key: string]: PostEntryResponse };
  LastSeenIndex: number;
}

// struct2ts:types/generated/types.SetNotificationMetadataRequest
export interface SetNotificationMetadataRequest {
  PublicKeyBase58Check: string;
  LastSeenIndex: number;
  LastUnreadNotificationIndex: number;
  UnreadNotifications: number;
  JWT: string;
}

// struct2ts:types/generated/types.BlockPublicKeyRequest
export interface BlockPublicKeyRequest {
  PublicKeyBase58Check: string;
  BlockPublicKeyBase58Check: string;
  Unblock: boolean;
  JWT: string;
}

// struct2ts:types/generated/types.BlockPublicKeyResponse
export interface BlockPublicKeyResponse {
  BlockedPublicKeys: { [key: string]: string };
}

// struct2ts:types/generated/types.IsFollowingPublicKeyRequest
export interface IsFollowingPublicKeyRequest {
  PublicKeyBase58Check: string;
  IsFollowingPublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.IsFolllowingPublicKeyResponse
export interface IsFolllowingPublicKeyResponse {
  IsFollowing: boolean;
}

// struct2ts:types/generated/types.IsHodlingPublicKeyRequest
export interface IsHodlingPublicKeyRequest {
  PublicKeyBase58Check: string;
  IsHodlingPublicKeyBase58Check: string;
  IsDAOCoin: boolean;
}

// struct2ts:types/generated/types.IsHodlingPublicKeyResponse
export interface IsHodlingPublicKeyResponse {
  IsHodling: boolean;
  BalanceEntry: BalanceEntryResponse | null;
}

// struct2ts:types/generated/types.GetUserDerivedKeysRequest
export interface GetUserDerivedKeysRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.UserDerivedKey
export interface UserDerivedKey {
  OwnerPublicKeyBase58Check: string;
  DerivedPublicKeyBase58Check: string;
  ExpirationBlock: number;
  IsValid: boolean;
  ExtraData: { [key: string]: string };
  TransactionSpendingLimit: TransactionSpendingLimitResponse | null;
  Memo: string;
}

// struct2ts:types/generated/types.GetUserDerivedKeysResponse
export interface GetUserDerivedKeysResponse {
  DerivedKeys: { [key: string]: UserDerivedKey };
}

// struct2ts:types/generated/types.GetTransactionSpendingLimitHexStringRequest
export interface GetTransactionSpendingLimitHexStringRequest {
  TransactionSpendingLimit: TransactionSpendingLimitResponse;
}

// struct2ts:types/generated/types.GetTransactionSpendingLimitHexStringResponse
export interface GetTransactionSpendingLimitHexStringResponse {
  HexString: string;
}

// struct2ts:types/generated/types.DeletePIIRequest
export interface DeletePIIRequest {
  PublicKeyBase58Check: string;
  JWT: string;
}

// struct2ts:types/generated/types.SendPhoneNumberVerificationTextRequest
export interface SendPhoneNumberVerificationTextRequest {
  PublicKeyBase58Check: string;
  PhoneNumber: string;
  JWT: string;
}

// struct2ts:types/generated/types.SubmitPhoneNumberVerificationCodeRequest
export interface SubmitPhoneNumberVerificationCodeRequest {
  JWT: string;
  PublicKeyBase58Check: string;
  PhoneNumber: string;
  VerificationCode: string;
}

// struct2ts:types/generated/types.SubmitPhoneNumberVerificationCodeResponse
export interface SubmitPhoneNumberVerificationCodeResponse {
  TxnHashHex: string;
}

// struct2ts:types/generated/types.ResendVerifyEmailRequest
export interface ResendVerifyEmailRequest {
  PublicKey: string;
  JWT: string;
}

// struct2ts:types/generated/types.VerifyEmailRequest
export interface VerifyEmailRequest {
  PublicKey: string;
  EmailHash: string;
}

// struct2ts:types/generated/types.JumioInitRequest
export interface JumioInitRequest {
  customerInternalReference: string;
  userReference: string;
  successUrl: string;
  errorUrl: string;
}

// struct2ts:types/generated/types.JumioInitResponse
export interface JumioInitResponse {
  redirectUrl: string;
  transactionReference: string;
}

// struct2ts:types/generated/types.JumioBeginRequest
export interface JumioBeginRequest {
  PublicKey: string;
  ReferralHashBase58: string;
  SuccessURL: string;
  ErrorURL: string;
  JWT: string;
}

// struct2ts:types/generated/types.JumioBeginResponse
export interface JumioBeginResponse {
  URL: string;
}

// struct2ts:types/generated/types.JumioFlowFinishedRequest
export interface JumioFlowFinishedRequest {
  PublicKey: string;
  JumioInternalReference: string;
  JWT: string;
}

// struct2ts:types/generated/types.JumioIdentityVerification
export interface JumioIdentityVerification {
  similarity: string;
  validity: boolean;
  reason: string;
}

// struct2ts:types/generated/types.JumioRejectReason
export interface JumioRejectReason {
  rejectReasonCode: string;
  rejectReasonDescription: string;
  rejectReasonDetails: any;
}

// struct2ts:types/generated/types.GetJumioStatusForPublicKeyRequest
export interface GetJumioStatusForPublicKeyRequest {
  JWT: string;
  PublicKeyBase58Check: string;
}

// struct2ts:types/generated/types.GetJumioStatusForPublicKeyResponse
export interface GetJumioStatusForPublicKeyResponse {
  JumioFinishedTime: number;
  JumioReturned: boolean;
  JumioVerified: boolean;
  BalanceNanos: number | null;
}

// struct2ts:types/generated/types.WyreWalletOrderFullDetails
export interface WyreWalletOrderFullDetails {
  id: string;
  createdAt: number;
  owner: string;
  status: string;
  orderType: string;
  sourceAmount: number;
  purchaseAmount: number;
  sourceCurrency: string;
  destCurrency: string;
  transferId: string;
  dest: string;
  authCodesRequested: boolean;
  errorCategory: string;
  errorCode: string;
  errorMessage: string;
  failureReason: string;
  accountId: string;
  paymentNetworkErrorCode: string;
  internalErrorCode: string;
}

// struct2ts:.

// struct2ts:types/generated/types.WyreTransferDetails
export interface WyreTransferDetails {
  owner: string;
  reversingSubStatus: any;
  source: string;
  pendingSubStatus: any;
  status: string;
  reversalReason: any;
  createdAt: number;
  sourceAmount: number;
  destCurrency: string;
  sourceCurrency: string;
  statusHistories: [] | null;
  blockchainTx: any;
  expiresAt: number;
  completedAt: number;
  cancelledAt: any;
  failureReason: any;
  updatedAt: number;
  exchangeRate: number;
  destAmount: number;
  fees: any;
  totalFees: number;
  customId: string;
  dest: string;
  message: any;
  id: string;
}

// struct2ts:types/generated/types.WalletOrderQuotationRequest
export interface WalletOrderQuotationRequest {
  SourceAmount: number;
  Country: string;
  SourceCurrency: string;
}

// struct2ts:types/generated/types.WyreWalletOrderQuotationPayload
export interface WyreWalletOrderQuotationPayload {
  sourceCurrency: string;
  dest: string;
  destCurrency: string;
  amountIncludeFees: boolean;
  country: string;
  sourceAmount: string;
  walletType: string;
  accountId: string;
}

// struct2ts:types/generated/types.WalletOrderReservationRequest
export interface WalletOrderReservationRequest {
  SourceAmount: number;
  ReferenceId: string;
  Country: string;
  SourceCurrency: string;
}

// struct2ts:types/generated/types.WyreWalletOrderReservationPayload
export interface WyreWalletOrderReservationPayload {
  sourceCurrency: string;
  dest: string;
  destCurrency: string;
  country: string;
  amount: string;
  referrerAccountId: string;
  lockFields: string[] | null;
  redirectUrl: string;
  referenceId: string;
}

// struct2ts:types/generated/types.GetWyreWalletOrderForPublicKeyRequest
export interface GetWyreWalletOrderForPublicKeyRequest {
  PublicKeyBase58Check: string;
  Username: string;
  AdminPublicKey: string;
}

// struct2ts:types/generated/types.WyreWalletOrderMetadataResponse
export interface WyreWalletOrderMetadataResponse {
  LatestWyreWalletOrderWebhookPayload: WyreWalletOrderWebhookPayload;
  LatestWyreTrackWalletOrderResponse: WyreTrackOrderResponse | null;
  DeSoPurchasedNanos: number;
  BitCloutPurchasedNanos: number;
  BasicTransferTxnHash: string;
  Timestamp: Date | null;
}

// struct2ts:types/generated/types.GetWyreWalletOrderForPublicKeyResponse
export interface GetWyreWalletOrderForPublicKeyResponse {
  WyreWalletOrderMetadataResponses: WyreWalletOrderMetadataResponse[] | null;
}

export type BlockHash = string;
export type PkMapKey = string;
export type UsernameMapKey = string;
export type PKID = string;
export type ExtraDataDecoderFunc = Function;
export type ExtraDataEncoderFunc = Function;

export interface CreateAccessGroupRequest {
  AccessGroupOwnerPublicKeyBase58Check: string;
  AccessGroupPublicKeyBase58Check: string;
  AccessGroupKeyName: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[];
  ExtraData: { [k: string]: string };
}

export interface CreateAccessGroupResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

export interface AccessGroupMember {
  AccessGroupMemberPublicKeyBase58Check: string;

  AccessGroupMemberKeyName: string;

  EncryptedKey: string;
  ExtraData?: { [k: string]: string };
}

export interface AddAccessGroupMembersRequest {
  AccessGroupOwnerPublicKeyBase58Check: string;

  AccessGroupKeyName: string;

  AccessGroupMemberList: AccessGroupMember[];

  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[];
  ExtraData: { [k: string]: string };
}

export interface AddAccessGroupMembersResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

export interface AccessGroupMemberEntryResponse {
  AccessGroupMemberPublicKeyBase58Check: string;
  AccessGroupMemberKeyName: string;
  EncryptedKey: string;
  ExtraData?: { [k: string]: string };
}

export interface AccessGroupEntryResponse {
  AccessGroupOwnerPublicKeyBase58Check: string;
  AccessGroupKeyName: string;
  AccessGroupPublicKeyBase58Check: string;
  ExtraData?: { [k: string]: string };
  AccessGroupMemberEntryResponse: AccessGroupMemberEntryResponse | null;
}

export interface GetAccessGroupsRequest {
  PublicKeyBase58Check: string;
}

export interface GetAccessGroupsResponse {
  AccessGroupsOwned: AccessGroupEntryResponse[] | undefined;
  AccessGroupsMember: AccessGroupEntryResponse[] | undefined;
}

export interface CheckPartyAccessGroupsRequest {
  SenderPublicKeyBase58Check: string;
  SenderAccessGroupKeyName: string;

  RecipientPublicKeyBase58Check: string;
  RecipientAccessGroupKeyName: string;
}

export interface CheckPartyAccessGroupsResponse {
  SenderPublicKeyBase58Check: string;
  SenderAccessGroupPublicKeyBase58Check: string;
  SenderAccessGroupKeyName: string;
  IsSenderAccessGroupKey: boolean;

  RecipientPublicKeyBase58Check: string;
  RecipientAccessGroupPublicKeyBase58Check: string;
  RecipientAccessGroupKeyName: string;
  IsRecipientAccessGroupKey: boolean;
}

export interface GetAccessGroupInfoRequest {
  AccessGroupOwnerPublicKeyBase58Check: string;
  AccessGroupKeyName: string;
}

export interface GetAccessGroupMemberRequest {
  AccessGroupMemberPublicKeyBase58Check: string;
  AccessGroupOwnerPublicKeyBase58Check: string;
  AccessGroupKeyName: string;
}

export interface GetPaginatedAccessGroupMembersRequest {
  AccessGroupOwnerPublicKeyBase58Check: string;
  AccessGroupKeyName: string;
  StartingAccessGroupMemberPublicKeyBase58Check: string;
  MaxMembersToFetch: number;
}

export interface PublicKeyToProfileEntryResponseMap {
  [k: string]: ProfileEntryResponse | null;
}

export interface PostHashHexToPostEntryResponseMap {
  [k: string]: PostEntryResponse | null;
}

export interface GetPaginatedAccessGroupMembersResponse {
  AccessGroupMembersBase58Check: string[];
  PublicKeyToProfileEntryResponse: PublicKeyToProfileEntryResponseMap;
}

export interface GroupOwnerAndGroupKeyNamePair {
  GroupOwnerPublicKeyBase58Check: string;
  GroupKeyName: string;
}

export interface GetBulkAccessGroupEntriesRequest {
  GroupOwnerAndGroupKeyNamePairs: GroupOwnerAndGroupKeyNamePair[];
}

export interface GetBulkAccessGroupEntriesResponse {
  AccessGroupEntries: AccessGroupEntryResponse[];
  PairsNotFound: GroupOwnerAndGroupKeyNamePair[];
}

export interface SendNewMessageRequest {
  SenderAccessGroupOwnerPublicKeyBase58Check: string;
  SenderAccessGroupPublicKeyBase58Check: string;
  SenderAccessGroupKeyName: string;

  RecipientAccessGroupOwnerPublicKeyBase58Check: string;
  RecipientAccessGroupPublicKeyBase58Check: string;
  RecipientAccessGroupKeyName: string;

  EncryptedMessageText: string;

  TimestampNanosString: string;

  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[];
  ExtraData: { [k: string]: string };
}

export interface SendNewMessageResponse {
  TstampNanos: number;

  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

export enum ChatType {
  DM = 'DM',
  GROUPCHAT = 'GroupChat',
}

export interface NewMessageEntryResponse {
  ChatType: ChatType;
  SenderInfo: AccessGroupInfo;
  RecipientInfo: AccessGroupInfo;
  MessageInfo: MessageInfo;
}

export interface AccessGroupInfo {
  OwnerPublicKeyBase58Check: string;
  AccessGroupPublicKeyBase58Check: string;
  AccessGroupKeyName: string;
}

export interface MessageInfo {
  EncryptedText: string;
  TimestampNanos: number;
  TimestampNanosString: string;
  ExtraData: { [k: string]: string };
}

export interface GetPaginatedMessagesForDmThreadRequest {
  UserGroupOwnerPublicKeyBase58Check: string;
  UserGroupKeyName: string;
  PartyGroupOwnerPublicKeyBase58Check: string;
  PartyGroupKeyName: string;
  StartTimeStamp: number;
  StartTimeStampString: string;
  MaxMessagesToFetch: number;
}

export interface GetPaginatedMessagesForDmThreadResponse {
  ThreadMessages: NewMessageEntryResponse[];

  PublicKeyToProfileEntryResponse: PublicKeyToProfileEntryResponseMap;
}

export interface GetPaginatedMessagesForGroupChatThreadRequest {
  UserPublicKeyBase58Check: string;
  AccessGroupKeyName: string;
  StartTimeStamp: number;
  StartTimeStampString: string;
  MaxMessagesToFetch: number;
}

export interface GetPaginatedMessagesForGroupChatThreadResponse {
  GroupChatMessages: NewMessageEntryResponse[];

  PublicKeyToProfileEntryResponse: PublicKeyToProfileEntryResponseMap;
}

export interface GetUserMessageThreadsRequest {
  UserPublicKeyBase58Check: string;
}

export interface GetUserMessageThreadsResponse {
  MessageThreads: NewMessageEntryResponse[];

  PublicKeyToProfileEntryResponse: PublicKeyToProfileEntryResponseMap;
}

export type DecryptedMessageEntryResponse = NewMessageEntryResponse & {
  DecryptedMessage: string;
  IsSender: boolean;
  error: string;
};

export interface GetSnapshotEpochMetadataResponse {
  SnapshotBlockHeight: number;
  CurrentEpochChecksumHex: string;
  CurrentEpochBlockHashHex: string;
}

export interface GetStateChecksumResponse {
  StateChecksumHex: string;
}

export interface AssociationQuery {
  TransactorPublicKeyBase58Check: string;
  AppPublicKeyBase58Check: string;
  AssociationType: string;
  AssociationTypePrefix: string;
  AssociationValue: string;
  AssociationValuePrefix: string;
  AssociationValues: string[];
  Limit: number;
  LastSeenAssociationID: string;
  SortDescending: boolean;
  IncludeTransactorProfile: boolean;
  IncludeAppProfile: boolean;
}

export interface UserAssociationQuery extends AssociationQuery {
  TargetUserPublicKeyBase58Check: string;
  IncludeTargetUserProfile: boolean;
}

export interface PostAssociationQuery extends AssociationQuery {
  PostHashHex: string;
  IncludePostEntry: boolean;
  IncludePostAuthorProfile: boolean;
}

export interface CreateAssociationRequest {
  TransactorPublicKeyBase58Check: string;
  AppPublicKeyBase58Check: string;
  AssociationType: string;
  AssociationValue: string;
  ExtraData: { [k: string]: string };
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[];
}

export interface CreateUserAssociationRequest extends CreateAssociationRequest {
  TargetUserPublicKeyBase58Check: string;
}

export interface CreatePostAssociationRequest extends CreateAssociationRequest {
  PostHashHex: string;
}

export interface AssociationResponse {
  AssociationID: string;
  TransactorPublicKeyBase58Check: string;
  AppPublicKeyBase58Check: string;
  AssociationType: string;
  AssociationValue: string;
  ExtraData: { [k: string]: string };
  BlockHeight: number;
  TransactorProfile: ProfileEntryResponse | null;
  AppProfile: ProfileEntryResponse | null;
}

export interface UserAssociationResponse extends AssociationResponse {
  TargetUserPublicKeyBase58Check: string;
  TargetUserProfile: ProfileEntryResponse | null;
}

export interface PostAssociationResponse extends AssociationResponse {
  PostHashHex: string;
  PostEntry: PostEntryResponse | null;
  PostAuthorProfile: ProfileEntryResponse | null;
}

export interface UserAssociationsResponse {
  Associations: UserAssociationResponse[];
  PublicKeyToProfileEntryResponse: PublicKeyToProfileEntryResponseMap;
  PostHashHexToPostEntryResponse: PostHashHexToPostEntryResponseMap;
}

export interface PostAssociationsResponse {
  Associations: PostAssociationResponse[];
  PublicKeyToProfileEntryResponse: PublicKeyToProfileEntryResponseMap;
  PostHashHexToPostEntryResponse: PostHashHexToPostEntryResponseMap;
}

export interface DeleteAssociationRequest {
  TransactorPublicKeyBase58Check: string;
  AssociationID: string;
  ExtraData: { [k: string]: string };
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[];
}

export interface AssociationTxnResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

export interface AssociationsCountResponse {
  Count: number;
}

export interface AssociationCountsResponse {
  Counts: { [k: string]: number };
  Total: number;
}

export interface LinkPreviewResponse {
  title: string;
  description: string;
  image: string;
  canonical: string;
  url: string;
}

export interface GetVideoStatusResponse {
  id: string;
  hash: {
    hash: string;
    algorithm: string;
  };
  name: string;
  size: number;
  source: {
    url: string;
    type: string;
  };
  status: {
    phase: string;
    updatedAt: number;
  };
  userID: string;
  createdAt: number;
  videoSpec: {
    format: string;
    tracks: {
      fps: number;
      type: string;
      codec: string;
      width: number;
      height: number;
      bitrate: number;
      duration: number;
      pixelFormat: string;
    }[];
    duration: number;
  };
  playbackID: string;
  playbackURL: string;
  downloadURL: string;
}
