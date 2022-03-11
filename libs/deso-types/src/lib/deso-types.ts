/* eslint-disable @typescript-eslint/no-empty-interface */
// this file was automatically generated, DO NOT EDIT

// helpers

// structs
// struct2ts:types/dist/generated.BitcoinUtxo
export interface BitcoinUtxo {
  TxID: number[];
  Index: number;
  AmountSatoshis: number;
}

// struct2ts:types/dist/generated.BlockCypherAPIInputResponse
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

// struct2ts:types/dist/generated.BlockCypherAPIOutputResponse
export interface BlockCypherAPIOutputResponse {
  value: number;
  script: string;
  addresses: string[] | null;
  script_type: string;
  spent_by: string;
}

// struct2ts:types/dist/generated.BlockCypherAPITxnResponse
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

// struct2ts:types/dist/generated.BlockCypherAPIFullAddressResponse
export interface BlockCypherAPIFullAddressResponse {
  address: string;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  txs: BlockCypherAPITxnResponse[] | null;
  hasMore: boolean;
  error: string;
}

// struct2ts:types/dist/generated.BlockchainInfoAPIResponse
export interface BlockchainInfoAPIResponse {
  double_spend: boolean;
}

// struct2ts:types/dist/generated.BlockonomicsRBFResponse
export interface BlockonomicsRBFResponse {
  rbf: number;
  status: string;
}

// struct2ts:types/dist/generated.DeSoBlockProducer
export interface DeSoBlockProducer {}

// struct2ts:types/dist/generated.BlockTemplateStats
export interface BlockTemplateStats {
  TxnCount: number;
  FailingTxnHash: string;
  FailingTxnError: string;
  FailingTxnOriginalTimeAdded: Date;
  FailingTxnMinutesSinceAdded: number;
}

// struct2ts:types/dist/generated.UtxoKey
export interface UtxoKey {
  TxID: number[];
  Index: number;
}

// struct2ts:types/dist/generated.UtxoEntry
export interface UtxoEntry {
  AmountNanos: number;
  PublicKey: number[] | null;
  BlockHeight: number;
  UtxoType: number;
  UtxoKey: UtxoKey | null;
}

// struct2ts:types/dist/generated.GlobalParamsEntry
export interface GlobalParamsEntry {
  USDCentsPerBitcoin: number;
  CreateProfileFeeNanos: number;
  CreateNFTFeeNanos: number;
  MaxCopiesPerNFT: number;
  MinimumNetworkFeeNanosPerKB: number;
}

// struct2ts:types/dist/generated.ForbiddenPubKeyEntry
export interface ForbiddenPubKeyEntry {
  PubKey: number[] | null;
}

// struct2ts:types/dist/generated.MessageEntry
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
}

// struct2ts:types/dist/generated.MessagingGroupMember
export interface MessagingGroupMember {
  GroupMemberPublicKey: number[];
  GroupMemberKeyName: number[];
  EncryptedKey: number[] | null;
}

// struct2ts:types/dist/generated.MessagingGroupEntry
export interface MessagingGroupEntry {
  GroupOwnerPublicKey: number[];
  MessagingPublicKey: number[];
  MessagingGroupKeyName: number[];
  MessagingGroupMembers: MessagingGroupMember[] | null;
}

// struct2ts:types/dist/generated.PGMessage
export interface PGMessage {
  MessageHash: number[];
  SenderPublicKey: number[] | null;
  RecipientPublicKey: number[] | null;
  EncryptedText: number[] | null;
  TimestampNanos: number;
}

// struct2ts:types/dist/generated.FollowEntry
export interface FollowEntry {
  Followerany: number[];
  Followedany: number[];
}

// struct2ts:types/dist/generated.NFTEntry
export interface NFTEntry {
  LastOwnerany: number[];
  Ownerany: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  IsForSale: boolean;
  MinBidAmountNanos: number;
  UnlockableText: number[] | null;
  LastAcceptedBidAmountNanos: number;
  IsPending: boolean;
  IsBuyNow: boolean;
  BuyNowPriceNanos: number;
}

// struct2ts:types/dist/generated.NFTBidEntry
export interface NFTBidEntry {
  Bidderany: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  BidAmountNanos: number;
  AcceptedBlockHeight: number | null;
}

// struct2ts:types/dist/generated.DiamondEntry
export interface DiamondEntry {
  Senderany: number[];
  Receiverany: number[];
  DiamondPostHash: number[];
  DiamondLevel: number;
}

// struct2ts:types/dist/generated.LikeEntry
export interface LikeEntry {
  LikerPubKey: number[] | null;
  LikedPostHash: number[];
}

// struct2ts:types/dist/generated.RepostEntry
export interface RepostEntry {
  ReposterPubKey: number[] | null;
  RepostPostHash: number[];
  RepostedPostHash: number[];
}

// struct2ts:types/dist/generated.PostEntry
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
  PostExtraData: { [key: string]: number[] };
}

// struct2ts:types/dist/generated.anyEntry
export interface anyEntry {
  any: number[];
  PublicKey: number[] | null;
}

// struct2ts:types/dist/generated.CoinEntry
export interface CoinEntry {
  CreatorBasisPoints: number;
  DeSoLockedNanos: number;
  NumberOfHolders: number;
  CoinsInCirculationNanos: number[];
  CoinWatermarkNanos: number;
  MintingDisabled: boolean;
  TransferRestrictionStatus: number;
}

// struct2ts:types/dist/generated.ProfileEntry
export interface ProfileEntry {
  PublicKey: number[] | null;
  Username: number[] | null;
  Description: number[] | null;
  ProfilePic: number[] | null;
  IsHidden: boolean;
  CreatorCoinEntry: CoinEntry;
  DAOCoinEntry: CoinEntry;
}

// struct2ts:types/dist/generated.BalanceEntry
export interface BalanceEntry {
  HODLerany: number[];
  Creatorany: number[];
  BalanceNanos: number[];
  HasPurchased: boolean;
}

// struct2ts:types/dist/generated.DerivedKeyEntry
export interface DerivedKeyEntry {
  OwnerPublicKey: number[];
  DerivedPublicKey: number[];
  ExpirationBlock: number;
  OperationType: number;
}

// struct2ts:github.com/dgraph-io/badger/v3.DB
export interface DB {}

// struct2ts:types/dist/generated.Postgres
export interface Postgres {}

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
export interface Int {}

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

// struct2ts:types/dist/generated.MsgDeSoHeader
export interface MsgDeSoHeader {
  Version: number;
  PrevBlockHash: number[];
  TransactionMerkleRoot: number[];
  TstampSecs: number;
  Height: number;
  Nonce: number;
  ExtraNonce: number;
}

// struct2ts:types/dist/generated.BlockNode
export interface BlockNode {
  Parent: BlockNode | null;
  Hash: number[];
  Height: number;
  DifficultyTarget: number[];
  CumWork: Int | null;
  Header: MsgDeSoHeader | null;
  Status: number;
}

// struct2ts:types/dist/generated.DeSoInput
export interface DeSoInput {
  TxID: number[];
  Index: number;
}

// struct2ts:types/dist/generated.DeSoOutput
export interface DeSoOutput {
  PublicKey: number[] | null;
  AmountNanos: number;
}

// struct2ts:github.com/btcsuite/btcd/btcec.Signature
export interface Signature {
  R: Int | null;
  S: Int | null;
}

// struct2ts:types/dist/generated.MsgDeSoTxn
export interface MsgDeSoTxn {
  TxInputs: DeSoInput[] | null;
  TxOutputs: DeSoOutput[] | null;
  TxnMeta: any;
  PublicKey: number[] | null;
  ExtraData: { [key: string]: number[] };
  Signature: Signature | null;
  TxnTypeJSON: number;
}

// struct2ts:types/dist/generated.BlockProducerInfo
export interface BlockProducerInfo {
  PublicKey: number[] | null;
  Signature: Signature | null;
}

// struct2ts:types/dist/generated.MsgDeSoBlock
export interface MsgDeSoBlock {
  Header: MsgDeSoHeader | null;
  Txns: MsgDeSoTxn[] | null;
  BlockProducerInfo: BlockProducerInfo | null;
}

// struct2ts:math/big.Float
export interface Float {}

// struct2ts:types/dist/generated.ForkHeights
export interface ForkHeights {
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
}

// struct2ts:types/dist/generated.DeSoParams
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
}

// struct2ts:types/dist/generated.UtxoView
export interface UtxoView {
  NumUtxoEntries: number;
  UtxoKeyToUtxoEntry: { [key: string]: UtxoEntry };
  PublicKeyToDeSoBalanceNanos: { [key: string]: number };
  NanosPurchased: number;
  USDCentsPerBitcoin: number;
  GlobalParamsEntry: GlobalParamsEntry | null;
  BitcoinBurnTxIDs: { [key: string]: boolean };
  ForbiddenPubKeyToForbiddenPubKeyEntry: {
    [key: string]: ForbiddenPubKeyEntry;
  };
  MessageKeyToMessageEntry: { [key: string]: MessageEntry };
  MessagingGroupKeyToMessagingGroupEntry: {
    [key: string]: MessagingGroupEntry;
  };
  MessageMap: { [key: string]: PGMessage };
  FollowKeyToFollowEntry: { [key: string]: FollowEntry };
  NFTKeyToNFTEntry: { [key: string]: NFTEntry };
  NFTBidKeyToNFTBidEntry: { [key: string]: NFTBidEntry };
  NFTKeyToAcceptedNFTBidHistory: { [key: string]: NFTBidEntry };
  DiamondKeyToDiamondEntry: { [key: string]: DiamondEntry };
  LikeKeyToLikeEntry: { [key: string]: LikeEntry };
  RepostKeyToRepostEntry: { [key: string]: RepostEntry };
  PostHashToPostEntry: { [key: string]: PostEntry };
  PublicKeyToanyEntry: { [key: string]: anyEntry };
  anyToPublicKey: { [key: string]: anyEntry };
  ProfileanyToProfileEntry: { [key: string]: ProfileEntry };
  ProfileUsernameToProfileEntry: { [key: string]: ProfileEntry };
  HODLeranyCreatoranyToBalanceEntry: {
    [key: string]: BalanceEntry;
  };
  HODLeranyCreatoranyToDAOCoinBalanceEntry: {
    [key: string]: BalanceEntry;
  };
  DerivedKeyToDerivedEntry: { [key: string]: DerivedKeyEntry };
  TipHash: number[];
  Handle: DB | null;
  Postgres: Postgres | null;
  Params: DeSoParams | null;
}

// struct2ts:types/dist/generated.HelpConnectNFTSoldStruct
export interface HelpConnectNFTSoldStruct {
  NFTPostHash: number[];
  SerialNumber: number;
  Bidderany: number[];
  BidAmountNanos: number;
  UnlockableText: number[] | null;
  PrevNFTBidEntry: NFTBidEntry | null;
  BidderInputs: DeSoInput[] | null;
  BlockHeight: number;
  Txn: MsgDeSoTxn | null;
  TxHash: number[];
  VerifySignatures: boolean;
}

// struct2ts:types/dist/generated.PublicKeyRoyaltyPair
export interface PublicKeyRoyaltyPair {
  PublicKey: number[] | null;
  RoyaltyAmountNanos: number;
}

// struct2ts:types/dist/generated.UtxoOperation
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
}

// struct2ts:types/dist/generated.MessageKey
export interface MessageKey {
  PublicKey: number[];
  BlockHeight: number;
  TstampNanos: number;
}

// struct2ts:types/dist/generated.MessagingGroupKey
export interface MessagingGroupKey {
  OwnerPublicKey: number[];
  GroupKeyName: number[];
}

// struct2ts:types/dist/generated.LikeKey
export interface LikeKey {
  LikerPubKey: number[];
  LikedPostHash: number[];
}

// struct2ts:types/dist/generated.NFTKey
export interface NFTKey {
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/dist/generated.NFTBidKey
export interface NFTBidKey {
  Bidderany: number[];
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/dist/generated.DerivedKeyMapKey
export interface DerivedKeyMapKey {
  OwnerPublicKey: number[];
  DerivedPublicKey: number[];
}

// struct2ts:types/dist/generated.FollowKey
export interface FollowKey {
  Followerany: number[];
  Followedany: number[];
}

// struct2ts:types/dist/generated.DiamondKey
export interface DiamondKey {
  Senderany: number[];
  Receiverany: number[];
  DiamondPostHash: number[];
}

// struct2ts:types/dist/generated.RepostKey
export interface RepostKey {
  ReposterPubKey: number[];
  RepostedPostHash: number[];
}

// struct2ts:types/dist/generated.PostEntryReaderState
export interface PostEntryReaderState {
  LikedByReader: boolean;
  DiamondLevelBestowed: number;
  RepostedByReader: boolean;
  RepostPostHashHex: string;
}

// struct2ts:types/dist/generated.BalanceEntryMapKey
export interface BalanceEntryMapKey {
  HODLerany: number[];
  Creatorany: number[];
}

// struct2ts:types/dist/generated.OrphanBlock
export interface OrphanBlock {
  Block: MsgDeSoBlock | null;
  Hash: number[];
}

// struct2ts:github.com/deso-protocol/go-deadlock.RWMutex
export interface RWMutex {}

// struct2ts:types/dist/generated.Blockchain
export interface Blockchain {
  ChainLock: RWMutex;
}

// struct2ts:types/dist/generated.ConnectionManager
export interface ConnectionManager {}

// struct2ts:types/dist/generated.AffectedPublicKey
export interface AffectedPublicKey {
  PublicKeyBase58Check: string;
  Metadata: string;
}

// struct2ts:types/dist/generated.BasicTransferTxindexMetadata
export interface BasicTransferTxindexMetadata {
  TotalInputNanos: number;
  TotalOutputNanos: number;
  FeeNanos: number;
  UtxoOpsDump: string;
  UtxoOps: UtxoOperation[] | null;
  DiamondLevel: number;
  PostHashHex: string;
}

// struct2ts:types/dist/generated.BitcoinExchangeTxindexMetadata
export interface BitcoinExchangeTxindexMetadata {
  BitcoinSpendAddress: string;
  SatoshisBurned: number;
  NanosCreated: number;
  TotalNanosPurchasedBefore: number;
  TotalNanosPurchasedAfter: number;
  BitcoinTxnHash: string;
}

// struct2ts:types/dist/generated.CreatorCoinTxindexMetadata
export interface CreatorCoinTxindexMetadata {
  OperationType: string;
  DeSoToSellNanos: number;
  CreatorCoinToSellNanos: number;
  DeSoToAddNanos: number;
  DESOLockedNanosDiff: number;
}

// struct2ts:types/dist/generated.CreatorCoinTransferTxindexMetadata
export interface CreatorCoinTransferTxindexMetadata {
  CreatorUsername: string;
  CreatorCoinToTransferNanos: number;
  DiamondLevel: number;
  PostHashHex: string;
}

// struct2ts:types/dist/generated.DAOCoinTransferTxindexMetadata
export interface DAOCoinTransferTxindexMetadata {
  CreatorUsername: string;
  DAOCoinToTransferNanos: number[];
}

// struct2ts:types/dist/generated.DAOCoinTxindexMetadata
export interface DAOCoinTxindexMetadata {
  CreatorUsername: string;
  OperationType: string;
  CoinsToMintNanos: number[];
  CoinsToBurnNanos: number[];
  TransferRestrictionStatus: string;
}

// struct2ts:types/dist/generated.UpdateProfileTxindexMetadata
export interface UpdateProfileTxindexMetadata {
  ProfilePublicKeyBase58Check: string;
  NewUsername: string;
  NewDescription: string;
  NewProfilePic: string;
  NewCreatorBasisPoints: number;
  NewStakeMultipleBasisPoints: number;
  IsHidden: boolean;
}

// struct2ts:types/dist/generated.SubmitPostTxindexMetadata
export interface SubmitPostTxindexMetadata {
  PostHashBeingModifiedHex: string;
  ParentPostHashHex: string;
}

// struct2ts:types/dist/generated.LikeTxindexMetadata
export interface LikeTxindexMetadata {
  IsUnlike: boolean;
  PostHashHex: string;
}

// struct2ts:types/dist/generated.FollowTxindexMetadata
export interface FollowTxindexMetadata {
  IsUnfollow: boolean;
}

// struct2ts:types/dist/generated.PrivateMessageTxindexMetadata
export interface PrivateMessageTxindexMetadata {
  TimestampNanos: number;
}

// struct2ts:types/dist/generated.SwapIdentityTxindexMetadata
export interface SwapIdentityTxindexMetadata {
  FromPublicKeyBase58Check: string;
  ToPublicKeyBase58Check: string;
  FromDeSoLockedNanos: number;
  ToDeSoLockedNanos: number;
}

// struct2ts:types/dist/generated.NFTRoyaltiesMetadata
export interface NFTRoyaltiesMetadata {
  CreatorCoinRoyaltyNanos: number;
  CreatorRoyaltyNanos: number;
  CreatorPublicKeyBase58Check: string;
  AdditionalCoinRoyaltiesMap: { [key: string]: number };
  AdditionalDESORoyaltiesMap: { [key: string]: number };
}

// struct2ts:types/dist/generated.NFTBidTxindexMetadata
export interface NFTBidTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
  BidAmountNanos: number;
  IsBuyNowBid: boolean;
  OwnerPublicKeyBase58Check: string;
  CreatorCoinRoyaltyNanos: number;
  CreatorRoyaltyNanos: number;
  CreatorPublicKeyBase58Check: string;
  AdditionalCoinRoyaltiesMap: { [key: string]: number };
  AdditionalDESORoyaltiesMap: { [key: string]: number };
}

// struct2ts:types/dist/generated.AcceptNFTBidTxindexMetadata
export interface AcceptNFTBidTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
  BidAmountNanos: number;
  CreatorCoinRoyaltyNanos: number;
  CreatorRoyaltyNanos: number;
  CreatorPublicKeyBase58Check: string;
  AdditionalCoinRoyaltiesMap: { [key: string]: number };
  AdditionalDESORoyaltiesMap: { [key: string]: number };
}

// struct2ts:types/dist/generated.NFTTransferTxindexMetadata
export interface NFTTransferTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
}

// struct2ts:types/dist/generated.AcceptNFTTransferTxindexMetadata
export interface AcceptNFTTransferTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
}

// struct2ts:types/dist/generated.BurnNFTTxindexMetadata
export interface BurnNFTTxindexMetadata {
  NFTPostHashHex: string;
  SerialNumber: number;
}

// struct2ts:types/dist/generated.CreateNFTTxindexMetadata
export interface CreateNFTTxindexMetadata {
  NFTPostHashHex: string;
  AdditionalCoinRoyaltiesMap: { [key: string]: number };
  AdditionalDESORoyaltiesMap: { [key: string]: number };
}

// struct2ts:types/dist/generated.UpdateNFTTxindexMetadata
export interface UpdateNFTTxindexMetadata {
  NFTPostHashHex: string;
  IsForSale: boolean;
}

// struct2ts:types/dist/generated.TransactionMetadata
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
}

// struct2ts:types/dist/generated.TransactionEvent
export interface TransactionEvent {
  Txn: MsgDeSoTxn | null;
  TxnHash: number[];
  UtxoView: UtxoView | null;
  UtxoOps: UtxoOperation[] | null;
}

// struct2ts:types/dist/generated.BlockEvent
export interface BlockEvent {
  Block: MsgDeSoBlock | null;
  UtxoView: UtxoView | null;
  UtxoOps: UtxoOperation[] | null;
}

// struct2ts:types/dist/generated.EventManager
export interface EventManager {}

// struct2ts:types/dist/generated.MempoolTx
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

// struct2ts:types/dist/generated.SummaryStats
export interface SummaryStats {
  Count: number;
  TotalBytes: number;
}

// struct2ts:types/dist/generated.UnconnectedTx
export interface UnconnectedTx {}

// struct2ts:types/dist/generated.DeSoMempool
export interface DeSoMempool {}

// struct2ts:github.com/btcsuite/btcd/btcec.PublicKey
export interface PublicKey {
  Curve: any;
  X: Int | null;
  Y: Int | null;
}

// struct2ts:types/dist/generated.DeSoMiner
export interface DeSoMiner {
  PublicKeys: PublicKey[] | null;
  BlockProducer: DeSoBlockProducer | null;
}

// struct2ts:types/dist/generated.MsgDeSoQuit
export interface MsgDeSoQuit {}

// struct2ts:types/dist/generated.MsgDeSoNewPeer
export interface MsgDeSoNewPeer {}

// struct2ts:types/dist/generated.MsgDeSoDonePeer
export interface MsgDeSoDonePeer {}

// struct2ts:types/dist/generated.MsgDeSoBitcoinManagerUpdate
export interface MsgDeSoBitcoinManagerUpdate {
  TransactionsFound: MsgDeSoTxn[] | null;
}

// struct2ts:types/dist/generated.MsgDeSoGetHeaders
export interface MsgDeSoGetHeaders {
  StopHash: number[];
  BlockLocator: any[] | null;
}

// struct2ts:types/dist/generated.MsgDeSoHeaderBundle
export interface MsgDeSoHeaderBundle {
  Headers: MsgDeSoHeader[] | null;
  TipHash: number[];
  TipHeight: number;
}

// struct2ts:types/dist/generated.MsgDeSoGetBlocks
export interface MsgDeSoGetBlocks {
  HashList: any[] | null;
}

// struct2ts:types/dist/generated.DeSoBodySchema
export interface DeSoBodySchema {
  Body: string;
  ImageURLs: string[] | null;
  VideoURLs: string[] | null;
}

// struct2ts:types/dist/generated.MsgDeSoGetTransactions
export interface MsgDeSoGetTransactions {
  HashList: any[] | null;
}

// struct2ts:types/dist/generated.MsgDeSoTransactionBundle
export interface MsgDeSoTransactionBundle {
  Transactions: MsgDeSoTxn[] | null;
}

// struct2ts:types/dist/generated.MsgDeSoMempool
export interface MsgDeSoMempool {}

// struct2ts:types/dist/generated.InvVect
export interface InvVect {
  Type: number;
  Hash: number[];
}

// struct2ts:types/dist/generated.MsgDeSoInv
export interface MsgDeSoInv {
  InvList: InvVect[] | null;
  IsSyncResponse: boolean;
}

// struct2ts:types/dist/generated.MsgDeSoPing
export interface MsgDeSoPing {
  Nonce: number;
}

// struct2ts:types/dist/generated.MsgDeSoPong
export interface MsgDeSoPong {
  Nonce: number;
}

// struct2ts:types/dist/generated.MsgDeSoVersion
export interface MsgDeSoVersion {
  Version: number;
  Services: number;
  TstampSecs: number;
  Nonce: number;
  UserAgent: string;
  StartBlockHeight: number;
  MinFeeRateNanosPerKB: number;
}

// struct2ts:types/dist/generated.SingleAddr
export interface SingleAddr {
  Timestamp: Date;
  Services: number;
  IP: number[] | null;
  Port: number;
}

// struct2ts:types/dist/generated.MsgDeSoAddr
export interface MsgDeSoAddr {
  AddrList: SingleAddr[] | null;
}

// struct2ts:types/dist/generated.MsgDeSoGetAddr
export interface MsgDeSoGetAddr {}

// struct2ts:types/dist/generated.MsgDeSoVerack
export interface MsgDeSoVerack {
  Nonce: number;
}

// struct2ts:types/dist/generated.BasicTransferMetadata
export interface BasicTransferMetadata {}

// struct2ts:types/dist/generated.BlockRewardMetadataa
export interface BlockRewardMetadataa {
  ExtraData: number[] | null;
}

// struct2ts:github.com/deso-protocol/go-merkle-tree.ProofPart
export interface ProofPart {
  IsRight: boolean;
  Hash: number[] | null;
}

// struct2ts:types/dist/generated.BitcoinExchangeMetadata
export interface BitcoinExchangeMetadata {
  BitcoinTransaction: MsgTx | null;
  BitcoinBlockHash: number[];
  BitcoinMerkleRoot: number[];
  BitcoinMerkleProof: ProofPart[] | null;
}

// struct2ts:types/dist/generated.PrivateMessageMetadata
export interface PrivateMessageMetadata {
  RecipientPublicKey: number[] | null;
  EncryptedText: number[] | null;
  TimestampNanos: number;
}

// struct2ts:types/dist/generated.LikeMetadata
export interface LikeMetadata {
  LikedPostHash: number[];
  IsUnlike: boolean;
}

// struct2ts:types/dist/generated.FollowMetadata
export interface FollowMetadata {
  FollowedPublicKey: number[] | null;
  IsUnfollow: boolean;
}

// struct2ts:types/dist/generated.SubmitPostMetadata
export interface SubmitPostMetadata {
  PostHashToModify: number[] | null;
  ParentStakeID: number[] | null;
  Body: number[] | null;
  CreatorBasisPoints: number;
  StakeMultipleBasisPoints: number;
  TimestampNanos: number;
  IsHidden: boolean;
}

// struct2ts:types/dist/generated.UpdateProfileMetadata
export interface UpdateProfileMetadata {
  ProfilePublicKey: number[] | null;
  NewUsername: number[] | null;
  NewDescription: number[] | null;
  NewProfilePic: number[] | null;
  NewCreatorBasisPoints: number;
  NewStakeMultipleBasisPoints: number;
  IsHidden: boolean;
}

// struct2ts:types/dist/generated.UpdateGlobalParamsMetadata
export interface UpdateGlobalParamsMetadata {}

// struct2ts:types/dist/generated.UpdateBitcoinUSDExchangeRateMetadataa
export interface UpdateBitcoinUSDExchangeRateMetadataa {
  USDCentsPerBitcoin: number;
}

// struct2ts:types/dist/generated.CreatorCoinMetadataa
export interface CreatorCoinMetadataa {
  ProfilePublicKey: number[] | null;
  OperationType: number;
  DeSoToSellNanos: number;
  CreatorCoinToSellNanos: number;
  DeSoToAddNanos: number;
  MinDeSoExpectedNanos: number;
  MinCreatorCoinExpectedNanos: number;
}

// struct2ts:types/dist/generated.CreatorCoinTransferMetadataa
export interface CreatorCoinTransferMetadataa {
  ProfilePublicKey: number[] | null;
  CreatorCoinToTransferNanos: number;
  ReceiverPublicKey: number[] | null;
}

// struct2ts:types/dist/generated.CreateNFTMetadata
export interface CreateNFTMetadata {
  NFTPostHash: number[];
  NumCopies: number;
  HasUnlockable: boolean;
  IsForSale: boolean;
  MinBidAmountNanos: number;
  NFTRoyaltyToCreatorBasisPoints: number;
  NFTRoyaltyToCoinBasisPoints: number;
}

// struct2ts:types/dist/generated.UpdateNFTMetadata
export interface UpdateNFTMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
  IsForSale: boolean;
  MinBidAmountNanos: number;
}

// struct2ts:types/dist/generated.AcceptNFTBidMetadata
export interface AcceptNFTBidMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
  Bidderany: number[];
  BidAmountNanos: number;
  UnlockableText: number[] | null;
  BidderInputs: DeSoInput[] | null;
}

// struct2ts:types/dist/generated.NFTBidMetadata
export interface NFTBidMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
  BidAmountNanos: number;
}

// struct2ts:types/dist/generated.NFTTransferMetadata
export interface NFTTransferMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
  ReceiverPublicKey: number[] | null;
  UnlockableText: number[] | null;
}

// struct2ts:types/dist/generated.AcceptNFTTransferMetadata
export interface AcceptNFTTransferMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/dist/generated.BurnNFTMetadata
export interface BurnNFTMetadata {
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/dist/generated.SwapIdentityMetadataa
export interface SwapIdentityMetadataa {
  FromPublicKey: number[] | null;
  ToPublicKey: number[] | null;
}

// struct2ts:types/dist/generated.AuthorizeDerivedKeyMetadata
export interface AuthorizeDerivedKeyMetadata {
  DerivedPublicKey: number[] | null;
  ExpirationBlock: number;
  OperationType: number;
  AccessSignature: number[] | null;
}

// struct2ts:types/dist/generated.DAOCoinMetadata
export interface DAOCoinMetadata {
  ProfilePublicKey: number[] | null;
  OperationType: number;
  CoinsToMintNanos: number[];
  CoinsToBurnNanos: number[];
  TransferRestrictionStatus: number;
}

// struct2ts:types/dist/generated.DAOCoinTransferMetadata
export interface DAOCoinTransferMetadata {
  ProfilePublicKey: number[] | null;
  DAOCoinToTransferNanos: number[];
  ReceiverPublicKey: number[] | null;
}

// struct2ts:types/dist/generated.MessagingGroupMetadata
export interface MessagingGroupMetadata {
  MessagingPublicKey: number[] | null;
  MessagingGroupKeyName: number[] | null;
  GroupOwnerSignature: number[] | null;
  MessagingGroupMembers: MessagingGroupMember[] | null;
}

// struct2ts:types/dist/generated.Notifier
export interface Notifier {}

// struct2ts:types/dist/generated.ExpectedResponse
export interface ExpectedResponse {
  TimeExpected: Date;
  MessageType: number;
}

// struct2ts:types/dist/generated.DeSoMessageMeta
export interface DeSoMessageMeta {
  DeSoMessage: any;
  Inbound: boolean;
}

// struct2ts:github.com/deso-protocol/go-deadlock.Mutex
export interface Mutex {}

// struct2ts:types/dist/generated.Peer
export interface Peer {
  StatsMtx: RWMutex;
  ID: number;
  LastPingNonce: number;
  LastPingTime: Date;
  LastPingMicros: number;
  Params: DeSoParams | null;
  MessageChan: ServerMessage;
  PeerManuallyRemovedFromConnectionManager: boolean;
  PeerInfoMtx: Mutex;
}

// struct2ts:types/dist/generated.PGChain
export interface PGChain {
  Name: string;
  TipHash: number[];
}

// struct2ts:types/dist/generated.PGBlock
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

// struct2ts:types/dist/generated.PGTransactionOutput
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

// struct2ts:types/dist/generated.PGMetadataBlockReward
export interface PGMetadataBlockReward {
  TransactionHash: number[];
  ExtraData: number[] | null;
}

// struct2ts:types/dist/generated.PGMetadataBitcoinExchange
export interface PGMetadataBitcoinExchange {
  TransactionHash: number[];
  BitcoinBlockHash: number[];
  BitcoinMerkleRoot: number[];
}

// struct2ts:types/dist/generated.PGMetadataPrivateMessage
export interface PGMetadataPrivateMessage {
  TransactionHash: number[];
  RecipientPublicKey: number[] | null;
  EncryptedText: number[] | null;
  TimestampNanos: number;
}

// struct2ts:types/dist/generated.PGMetadataSubmitPost
export interface PGMetadataSubmitPost {
  TransactionHash: number[];
  PostHashToModify: number[];
  ParentStakeID: number[];
  Body: number[] | null;
  TimestampNanos: number;
  IsHidden: boolean;
}

// struct2ts:types/dist/generated.PGMetadataUpdateExchangeRate
export interface PGMetadataUpdateExchangeRate {
  TransactionHash: number[];
  USDCentsPerBitcoin: number;
}

// struct2ts:types/dist/generated.PGMetadataUpdateProfile
export interface PGMetadataUpdateProfile {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  NewUsername: number[] | null;
  NewDescription: number[] | null;
  NewProfilePic: number[] | null;
  NewCreatorBasisPoints: number;
}

// struct2ts:types/dist/generated.PGMetadataFollow
export interface PGMetadataFollow {
  TransactionHash: number[];
  FollowedPublicKey: number[] | null;
  IsUnfollow: boolean;
}

// struct2ts:types/dist/generated.PGMetadataLike
export interface PGMetadataLike {
  TransactionHash: number[];
  LikedPostHash: number[];
  IsUnlike: boolean;
}

// struct2ts:types/dist/generated.PGMetadataCreatorCoin
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

// struct2ts:types/dist/generated.PGMetadataCreatorCoinTransfer
export interface PGMetadataCreatorCoinTransfer {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  CreatorCoinToTransferNanos: number;
  ReceiverPublicKey: number[] | null;
}

// struct2ts:types/dist/generated.PGMetadataSwapIdentity
export interface PGMetadataSwapIdentity {
  TransactionHash: number[];
  FromPublicKey: number[] | null;
  ToPublicKey: number[] | null;
}

// struct2ts:types/dist/generated.PGMetadataCreateNFT
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

// struct2ts:types/dist/generated.PGMetadataUpdateNFT
export interface PGMetadataUpdateNFT {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  IsForSale: boolean;
  MinBidAmountNanos: number;
}

// struct2ts:types/dist/generated.PGMetadataBidInput
export interface PGMetadataBidInput {
  TransactionHash: number[];
  InputHash: number[];
  InputIndex: number;
}

// struct2ts:types/dist/generated.PGMetadataAcceptNFTBid
export interface PGMetadataAcceptNFTBid {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  Bidderany: number[];
  BidAmountNanos: number;
  UnlockableText: number[] | null;
  BidderInputs: PGMetadataBidInput[] | null;
}

// struct2ts:types/dist/generated.PGMetadataNFTBid
export interface PGMetadataNFTBid {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  BidAmountNanos: number;
}

// struct2ts:types/dist/generated.PGMetadataNFTTransfer
export interface PGMetadataNFTTransfer {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  ReceiverPublicKey: number[] | null;
  UnlockableText: number[] | null;
}

// struct2ts:types/dist/generated.PGMetadataAcceptNFTTransfer
export interface PGMetadataAcceptNFTTransfer {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/dist/generated.PGMetadataBurnNFT
export interface PGMetadataBurnNFT {
  TransactionHash: number[];
  NFTPostHash: number[];
  SerialNumber: number;
}

// struct2ts:types/dist/generated.PGMetadataDerivedKey
export interface PGMetadataDerivedKey {
  TransactionHash: number[];
  DerivedPublicKey: number[];
  ExpirationBlock: number;
  OperationType: number;
  AccessSignature: number[] | null;
}

// struct2ts:types/dist/generated.PGMetadataDAOCoin
export interface PGMetadataDAOCoin {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  OperationType: number;
  CoinsToMintNanos: string;
  CoinsToBurnNanos: string;
  TransferRestrictionStatus: number;
}

// struct2ts:types/dist/generated.PGMetadataDAOCoinTransfer
export interface PGMetadataDAOCoinTransfer {
  TransactionHash: number[];
  ProfilePublicKey: number[] | null;
  DAOCoinToTransferNanos: string;
  ReceiverPublicKey: number[] | null;
}

// struct2ts:types/dist/generated.PGTransaction
export interface PGTransaction {
  Hash: number[];
  any: number[];
  Type: number;
  PublicKey: number[] | null;
  ExtraData: { [key: string]: number[] };
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
}

// struct2ts:types/dist/generated.PGNotification
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

// struct2ts:types/dist/generated.PGProfile
export interface PGProfile {
  any: number[];
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
}

// struct2ts:types/dist/generated.PGPost
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
  ExtraData: { [key: string]: number[] };
}

// struct2ts:types/dist/generated.PGLike
export interface PGLike {
  LikerPublicKey: number[] | null;
  LikedPostHash: number[];
}

// struct2ts:types/dist/generated.PGFollow
export interface PGFollow {
  Followerany: number[];
  Followedany: number[];
}

// struct2ts:types/dist/generated.PGDiamond
export interface PGDiamond {
  Senderany: number[];
  Receiverany: number[];
  DiamondPostHash: number[];
  DiamondLevel: number;
}

// struct2ts:types/dist/generated.PGMessagingGroup
export interface PGMessagingGroup {
  GroupOwnerPublicKey: number[];
  MessagingPublicKey: number[];
  MessagingGroupKeyName: number[];
  MessagingGroupMembers: number[] | null;
}

// struct2ts:types/dist/generated.PGCreatorCoinBalance
export interface PGCreatorCoinBalance {
  Holderany: number[];
  Creatorany: number[];
  BalanceNanos: number;
  HasPurchased: boolean;
}

// struct2ts:types/dist/generated.PGDAOCoinBalance
export interface PGDAOCoinBalance {
  Holderany: number[];
  Creatorany: number[];
  BalanceNanos: string;
  HasPurchased: boolean;
}

// struct2ts:types/dist/generated.PGBalance
export interface PGBalance {
  PublicKey: number[];
  BalanceNanos: number;
}

// struct2ts:types/dist/generated.PGGlobalParams
export interface PGGlobalParams {
  ID: number;
  USDCentsPerBitcoin: number;
  CreateProfileFeeNanos: number;
  CreateNFTFeeNanos: number;
  MaxCopiesPerNFT: number;
  MinNetworkFeeNanosPerKB: number;
}

// struct2ts:types/dist/generated.PGRepost
export interface PGRepost {
  ReposterPublickey: number[];
  RepostedPostHash: number[];
  RepostPostHash: number[];
}

// struct2ts:types/dist/generated.PGForbiddenKey
export interface PGForbiddenKey {
  PublicKey: number[];
}

// struct2ts:types/dist/generated.PGNFT
export interface PGNFT {
  NFTPostHash: number[];
  SerialNumber: number;
  LastOwnerany: number[];
  Ownerany: number[];
  ForSale: boolean;
  MinBidAmountNanos: number;
  UnlockableText: string;
  LastAcceptedBidAmountNanos: number;
  IsPending: boolean;
  IsBuyNow: boolean;
  BuyNowPriceNanos: number;
}

// struct2ts:types/dist/generated.PGNFTBid
export interface PGNFTBid {
  Bidderany: number[];
  NFTPostHash: number[];
  SerialNumber: number;
  BidAmountNanos: number;
  Accepted: boolean;
  AcceptedBlockHeight: number | null;
}

// struct2ts:types/dist/generated.PGDerivedKey
export interface PGDerivedKey {
  OwnerPublicKey: number[];
  DerivedPublicKey: number[];
  ExpirationBlock: number;
  OperationType: number;
}

// struct2ts:types/dist/generated.ServerMessage
export interface ServerMessage {
  Peer: Peer | null;
  Msg: any;
  ReplyChan: ServerReply;
}

// struct2ts:types/dist/generated.GetDataRequestInfo
export interface GetDataRequestInfo {
  PeerWhoSentInv: Peer | null;
  TimeRequested: Date;
}

// struct2ts:types/dist/generated.CountryLevelSignUpBonus
export interface CountryLevelSignUpBonus {
  AllowCustomReferralAmount: boolean;
  ReferralAmountOverrideUSDCents: number;
  AllowCustomKickbackAmount: boolean;
  KickbackAmountOverrideUSDCents: number;
}

// struct2ts:types/dist/generated.Alpha3CountryCodeDetails
export interface Alpha3CountryCodeDetails {
  CountryCode: string;
  Name: string;
  Alpha3: string;
}

// struct2ts:types/dist/generated.CountrySignUpBonusResponse
export interface CountrySignUpBonusResponse {
  CountryLevelSignUpBonus: CountryLevelSignUpBonus;
  CountryCodeDetails: Alpha3CountryCodeDetails;
}

// struct2ts:types/dist/generated.ServerReply
export interface ServerReply {
  GraylistedResponseMap: { [key: string]: number[] };
  GlobalFeedPostHashes: any[] | null;
  TotalSupplyNanos: number;
  TotalSupplyDESO: number;
  CountKeysWithDESO: number;
  AllCountryLevelSignUpBonuses: { [key: string]: CountrySignUpBonusResponse };
  USDCentsToDESOReserveExchangeRate: number;
  BuyDESOFeeBasisPoints: number;
  JumioUSDCents: number;
  JumioKickbackUSDCents: number;
}

// struct2ts:types/dist/generated.Server
export interface Server {
  SyncPeer: Peer | null;
  Notifier: Notifier | null;
}

// struct2ts:types/dist/generated.MiningSupplyIntervalStart
export interface MiningSupplyIntervalStart {
  StartBlockHeight: number;
  BlockRewardNanos: number;
}

// struct2ts:types/dist/generated.PurchaseSupplyIntervalStart
export interface PurchaseSupplyIntervalStart {
  SatoshisPerUnit: number;
  SupplyStartNanos: number;
}

// struct2ts:types/dist/generated.TXIndex
export interface TXIndex {
  TXIndexLock: RWMutex;
  TXIndexChain: Blockchain | null;
  CoreChain: Blockchain | null;
  Params: DeSoParams | null;
}

// struct2ts:types/dist/generated.SetUSDCentsToDeSoExchangeRateRequest
export interface SetUSDCentsToDeSoExchangeRateRequest {
  USDCentsPerDeSo: number;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.SetUSDCentsToDeSoExchangeRateResponse
export interface SetUSDCentsToDeSoExchangeRateResponse {
  USDCentsPerDeSo: number;
}

// struct2ts:types/dist/generated.GetUSDCentsToDeSoExchangeRateResponse
export interface GetUSDCentsToDeSoExchangeRateResponse {
  USDCentsPerDeSo: number;
}

// struct2ts:types/dist/generated.SetBuyDeSoFeeBasisPointsRequest
export interface SetBuyDeSoFeeBasisPointsRequest {
  BuyDeSoFeeBasisPoints: number;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.SetBuyDeSoFeeBasisPointsResponse
export interface SetBuyDeSoFeeBasisPointsResponse {
  BuyDeSoFeeBasisPoints: number;
}

// struct2ts:types/dist/generated.GetBuyDeSoFeeBasisPointsResponse
export interface GetBuyDeSoFeeBasisPointsResponse {
  BuyDeSoFeeBasisPoints: number;
}

// struct2ts:types/dist/generated.AdminPinPostRequest
export interface AdminPinPostRequest {
  PostHashHex: string;
  UnpinPost: boolean;
}

// struct2ts:types/dist/generated.AdminUpdateGlobalFeedRequest
export interface AdminUpdateGlobalFeedRequest {
  PostHashHex: string;
  RemoveFromGlobalFeed: boolean;
}

// struct2ts:types/dist/generated.AdminRemoveNilPostsRequest
export interface AdminRemoveNilPostsRequest {
  NumPostsToSearch: number;
}

// struct2ts:types/dist/generated.PostEntryResponse
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
}

// struct2ts:types/dist/generated.CoinEntryResponse
export interface CoinEntryResponse {
  CreatorBasisPoints: number;
  DeSoLockedNanos: number;
  NumberOfHolders: number;
  CoinsInCirculationNanos: number;
  CoinWatermarkNanos: number;
  BitCloutLockedNanos: number;
}

// struct2ts:types/dist/generated.DAOCoinEntryResponse
export interface DAOCoinEntryResponse {
  NumberOfHolders: number;
  CoinsInCirculationNanos: number[];
  MintingDisabled: boolean;
  TransferRestrictionStatus: string;
}

// struct2ts:types/dist/generated.BalanceEntryResponse
export interface BalanceEntryResponse {
  HODLerPublicKeyBase58Check: string;
  CreatorPublicKeyBase58Check: string;
  HasPurchased: boolean;
  BalanceNanos: number;
  BalanceNanosUint256: number[];
  NetBalanceInMempool: number;
  ProfileEntryResponse: ProfileEntryResponse | null;
}

// struct2ts:types/dist/generated.ProfileEntryResponse
export interface ProfileEntryResponse {
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
  UsersThatHODL: BalanceEntryResponse[] | null;
  IsFeaturedTutorialWellKnownCreator: boolean;
  IsFeaturedTutorialUpAndComingCreator: boolean;
}

// struct2ts:types/dist/generated.TransactionFee
export interface TransactionFee {
  PublicKeyBase58Check: string;
  ProfileEntryResponse: ProfileEntryResponse | null;
  AmountNanos: number;
}

// struct2ts:types/dist/generated.AdminSetTransactionFeeForTransactionTypeRequest
export interface AdminSetTransactionFeeForTransactionTypeRequest {
  TransactionType: string;
  NewTransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.AdminSetTransactionFeeForTransactionTypeResponse
export interface AdminSetTransactionFeeForTransactionTypeResponse {
  TransactionFeeMap: { [key: string]: TransactionFee };
}

// struct2ts:types/dist/generated.AdminSetAllTransactionFeesRequest
export interface AdminSetAllTransactionFeesRequest {
  NewTransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.AdminSetAllTransactionFeesResponse
export interface AdminSetAllTransactionFeesResponse {
  TransactionFeeMap: { [key: string]: TransactionFee };
}

// struct2ts:types/dist/generated.AdminGetTransactionFeeMapResponse
export interface AdminGetTransactionFeeMapResponse {
  TransactionFeeMap: { [key: string]: TransactionFee };
}

// struct2ts:types/dist/generated.AdminAddExemptPublicKey
export interface AdminAddExemptPublicKey {
  PublicKeyBase58Check: string;
  IsRemoval: boolean;
}

// struct2ts:types/dist/generated.AdminGetExemptPublicKeysResponse
export interface AdminGetExemptPublicKeysResponse {
  ExemptPublicKeyMap: { [key: string]: ProfileEntryResponse };
}

// struct2ts:types/dist/generated.AdminResetJumioRequest
export interface AdminResetJumioRequest {
  PublicKeyBase58Check: string;
  Username: string;
  JWT: string;
}

// struct2ts:types/dist/generated.AdminUpdateJumioDeSoRequest
export interface AdminUpdateJumioDeSoRequest {
  JWT: string;
  DeSoNanos: number;
}

// struct2ts:types/dist/generated.AdminUpdateJumioDeSoResponse
export interface AdminUpdateJumioDeSoResponse {
  DeSoNanos: number;
}

// struct2ts:types/dist/generated.AdminUpdateJumioUSDCentsRequest
export interface AdminUpdateJumioUSDCentsRequest {
  JWT: string;
  USDCents: number;
}

// struct2ts:types/dist/generated.AdminUpdateJumioUSDCentsResponse
export interface AdminUpdateJumioUSDCentsResponse {
  USDCents: number;
}

// struct2ts:types/dist/generated.AdminUpdateJumioKickbackUSDCentsRequest
export interface AdminUpdateJumioKickbackUSDCentsRequest {
  JWT: string;
  USDCents: number;
}

// struct2ts:types/dist/generated.AdminUpdateJumioKickbackUSDCentsResponse
export interface AdminUpdateJumioKickbackUSDCentsResponse {
  USDCents: number;
}

// struct2ts:types/dist/generated.AdminSetJumioVerifiedRequest
export interface AdminSetJumioVerifiedRequest {
  PublicKeyBase58Check: string;
  Username: string;
}

// struct2ts:types/dist/generated.AdminJumioCallback
export interface AdminJumioCallback {
  PublicKeyBase58Check: string;
  Username: string;
  CountryAlpha3: string;
}

// struct2ts:types/dist/generated.AdminUpdateJumioCountrySignUpBonusRequest
export interface AdminUpdateJumioCountrySignUpBonusRequest {
  CountryCode: string;
  CountryLevelSignUpBonus: CountryLevelSignUpBonus;
}

// struct2ts:types/dist/generated.GetAllCountryLevelSignUpBonusResponse
export interface GetAllCountryLevelSignUpBonusResponse {
  SignUpBonusMetadata: { [key: string]: CountrySignUpBonusResponse };
  DefaultSignUpBonusMetadata: CountryLevelSignUpBonus;
}

// struct2ts:types/dist/generated.AdminGetNFTDropRequest
export interface AdminGetNFTDropRequest {
  DropNumber: number;
}

// struct2ts:types/dist/generated.NFTDropEntry
export interface NFTDropEntry {
  IsActive: boolean;
  DropNumber: number;
  DropTstampNanos: number;
  NFTHashes: any[] | null;
}

// struct2ts:types/dist/generated.AdminGetNFTDropResponse
export interface AdminGetNFTDropResponse {
  DropEntry: NFTDropEntry | null;
  Posts: PostEntryResponse[] | null;
}

// struct2ts:types/dist/generated.AdminUpdateNFTDropRequest
export interface AdminUpdateNFTDropRequest {
  DropNumber: number;
  DropTstampNanos: number;
  IsActive: boolean;
  NFTHashHexToAdd: string;
  NFTHashHexToRemove: string;
}

// struct2ts:types/dist/generated.AdminUpdateNFTDropResponse
export interface AdminUpdateNFTDropResponse {
  DropEntry: NFTDropEntry | null;
  Posts: PostEntryResponse[] | null;
}

// struct2ts:types/dist/generated.NodeControlRequest
export interface NodeControlRequest {
  Address: string;
  MinerPublicKeys: string;
  OperationType: string;
  JWT: string;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.NodeStatusResponse
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

// struct2ts:types/dist/generated.PeerResponse
export interface PeerResponse {
  IP: string;
  ProtocolPort: number;
  IsSyncPeer: boolean;
}

// struct2ts:types/dist/generated.NodeControlResponse
export interface NodeControlResponse {
  DeSoStatus: NodeStatusResponse | null;
  DeSoOutboundPeers: PeerResponse[] | null;
  DeSoInboundPeers: PeerResponse[] | null;
  DeSoUnconnectedPeers: PeerResponse[] | null;
  MinerPublicKeys: string[] | null;
}

// struct2ts:types/dist/generated.AdminGetMempoolStatsResponse
export interface AdminGetMempoolStatsResponse {
  TransactionSummaryStats: { [key: string]: SummaryStats };
}

// struct2ts:types/dist/generated.AdminCreateReferralHashRequest
export interface AdminCreateReferralHashRequest {
  UserPublicKeyBase58Check: string;
  Username: string;
  ReferrerAmountUSDCents: number;
  RefereeAmountUSDCents: number;
  MaxReferrals: number;
  RequiresJumio: boolean;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.ReferralInfo
export interface ReferralInfo {
  ReferralHashBase58: string;
  Referrerany: number[];
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

// struct2ts:types/dist/generated.ReferralInfoResponse
export interface ReferralInfoResponse {
  IsActive: boolean;
  Info: ReferralInfo;
  ReferredUsers: ProfileEntryResponse[] | null;
}

// struct2ts:types/dist/generated.AdminCreateReferralHashResponse
export interface AdminCreateReferralHashResponse {
  ReferralInfoResponse: ReferralInfoResponse;
}

// struct2ts:types/dist/generated.AdminUpdateReferralHashRequest
export interface AdminUpdateReferralHashRequest {
  ReferralHashBase58: string;
  ReferrerAmountUSDCents: number;
  RefereeAmountUSDCents: number;
  MaxReferrals: number;
  RequiresJumio: boolean;
  IsActive: boolean;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.AdminUpdateReferralHashResponse
export interface AdminUpdateReferralHashResponse {
  ReferralInfoResponse: ReferralInfoResponse;
}

// struct2ts:types/dist/generated.SimpleReferralInfo
export interface SimpleReferralInfo {
  ReferralHashBase58: string;
  RefereeAmountUSDCents: number;
  MaxReferrals: number;
  TotalReferrals: number;
}

// struct2ts:types/dist/generated.SimpleReferralInfoResponse
export interface SimpleReferralInfoResponse {
  IsActive: boolean;
  Info: SimpleReferralInfo;
}

// struct2ts:types/dist/generated.AdminGetAllReferralInfoForUserRequest
export interface AdminGetAllReferralInfoForUserRequest {
  UserPublicKeyBase58Check: string;
  Username: string;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.AdminGetAllReferralInfoForUserResponse
export interface AdminGetAllReferralInfoForUserResponse {
  ReferralInfoResponses: ReferralInfoResponse[] | null;
}

// struct2ts:types/dist/generated.AdminDownloadReferralCSVResponse
export interface AdminDownloadReferralCSVResponse {
  CSVRows: string[] | null;
}

// struct2ts:types/dist/generated.AdminUploadReferralCSVRequest
export interface AdminUploadReferralCSVRequest {
  CSVRows: string[] | null;
}

// struct2ts:types/dist/generated.AdminUploadReferralCSVResponse
export interface AdminUploadReferralCSVResponse {
  LinksCreated: number;
  LinksUpdated: number;
}

// struct2ts:types/dist/generated.AdminDownloadRefereeCSVResponse
export interface AdminDownloadRefereeCSVResponse {
  CSVRows: string[] | null;
}

// struct2ts:types/dist/generated.GetGlobalParamsRequest
export interface GetGlobalParamsRequest {}

// struct2ts:types/dist/generated.GetGlobalParamsResponse
export interface GetGlobalParamsResponse {
  USDCentsPerBitcoin: number;
  CreateProfileFeeNanos: number;
  MinimumNetworkFeeNanosPerKB: number;
  CreateNFTFeeNanos: number;
  MaxCopiesPerNFT: number;
}

// struct2ts:types/dist/generated.UpdateGlobalParamsRequest
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

// struct2ts:types/dist/generated.UpdateGlobalParamsResponse
export interface UpdateGlobalParamsResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/dist/generated.SwapIdentityRequest
export interface SwapIdentityRequest {
  UpdaterPublicKeyBase58Check: string;
  FromUsernameOrPublicKeyBase58Check: string;
  ToUsernameOrPublicKeyBase58Check: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.SwapIdentityResponse
export interface SwapIdentityResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/dist/generated.TestSignTransactionWithDerivedKeyRequest
export interface TestSignTransactionWithDerivedKeyRequest {
  TransactionHex: string;
  DerivedKeySeedHex: string;
}

// struct2ts:types/dist/generated.TestSignTransactionWithDerivedKeyResponse
export interface TestSignTransactionWithDerivedKeyResponse {
  TransactionHex: string;
}

// struct2ts:types/dist/generated.AdminUpdateTutorialCreatorRequest
export interface AdminUpdateTutorialCreatorRequest {
  PublicKeyBase58Check: string;
  IsRemoval: boolean;
  IsWellKnown: boolean;
  JWT: string;
}

// struct2ts:types/dist/generated.AdminResetTutorialStatusRequest
export interface AdminResetTutorialStatusRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.AdminUpdateUserGlobalMetadataRequest
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

// struct2ts:types/dist/generated.AdminGetAllUserGlobalMetadataRequest
export interface AdminGetAllUserGlobalMetadataRequest {
  NumToFetch: number;
}

// struct2ts:.

// struct2ts:types/dist/generated.UserMetadata
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
  BlockedPublicKeys: { [key: string]: any };
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
  CreatorPurchasedInTutorialany: number[];
  CreatorCoinsPurchasedInTutorial: number;
  ReferralHashBase58Check: string;
  ReferrerDeSoTxnHash: string;
  UnreadNotifications: number;
  LatestUnreadNotificationIndex: number;
}

// struct2ts:types/dist/generated.AdminGetAllUserGlobalMetadataResponse
export interface AdminGetAllUserGlobalMetadataResponse {
  PubKeyToUserGlobalMetadata: { [key: string]: UserMetadata };
  PubKeyToUsername: { [key: string]: string };
}

// struct2ts:types/dist/generated.AdminGetUserGlobalMetadataRequest
export interface AdminGetUserGlobalMetadataRequest {
  UserPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.AdminGetUserGlobalMetadataResponse
export interface AdminGetUserGlobalMetadataResponse {
  UserMetadata: UserMetadata;
  UserProfileEntryResponse: ProfileEntryResponse | null;
}

// struct2ts:types/dist/generated.VerifiedUsernameToany
export interface VerifiedUsernameToany {
  VerifiedUsernameToany: { [key: string]: any };
}

// struct2ts:types/dist/generated.VerificationUsernameAuditLog
export interface VerificationUsernameAuditLog {
  TimestampNanos: number;
  VerifierUsername: string;
  Verifierany: number[];
  VerifiedUsername: string;
  Verifiedany: number[];
  IsRemoval: boolean;
}

// struct2ts:types/dist/generated.FilterAuditLog
export interface FilterAuditLog {
  TimestampNanos: number;
  Filter: number;
  UpdaterUsername: string;
  Updaterany: number[];
  UpdatedUsername: string;
  Updatedany: number[];
  IsRemoval: boolean;
}

// struct2ts:types/dist/generated.AdminGrantVerificationBadgeRequest
export interface AdminGrantVerificationBadgeRequest {
  UsernameToVerify: string;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.AdminGrantVerificationBadgeResponse
export interface AdminGrantVerificationBadgeResponse {
  Message: string;
}

// struct2ts:types/dist/generated.AdminRemoveVerificationBadgeRequest
export interface AdminRemoveVerificationBadgeRequest {
  UsernameForWhomToRemoveVerification: string;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.AdminRemoveVerificationBadgeResponse
export interface AdminRemoveVerificationBadgeResponse {
  Message: string;
}

// struct2ts:types/dist/generated.AdminGetVerifiedUsersResponse
export interface AdminGetVerifiedUsersResponse {
  VerifiedUsers: string[] | null;
}

// struct2ts:types/dist/generated.VerificationUsernameAuditLogResponse
export interface VerificationUsernameAuditLogResponse {
  TimestampNanos: number;
  VerifierUsername: string;
  VerifierPublicKeyBase58Check: string;
  VerifiedUsername: string;
  VerifiedPublicKeyBase58Check: string;
  IsRemoval: boolean;
}

// struct2ts:types/dist/generated.AdminGetUsernameVerificationAuditLogsRequest
export interface AdminGetUsernameVerificationAuditLogsRequest {
  Username: string;
}

// struct2ts:types/dist/generated.AdminGetUsernameVerificationAuditLogsResponse
export interface AdminGetUsernameVerificationAuditLogsResponse {
  VerificationAuditLogs: VerificationUsernameAuditLogResponse[] | null;
}

// struct2ts:types/dist/generated.AdminGetUserAdminDataRequest
export interface AdminGetUserAdminDataRequest {
  UserPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.AdminGetUserAdminDataResponse
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

// struct2ts:types/dist/generated.GetExchangeRateResponse
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
}

// struct2ts:types/dist/generated.BlockchainDeSoTickerResponse
export interface BlockchainDeSoTickerResponse {
  symbol: string;
  price_24h: number;
  volume_24h: number;
  last_trade_price: number;
}

// struct2ts:.

// struct2ts:types/dist/generated.CoinbaseDeSoTickerResponse
export interface CoinbaseDeSoTickerResponse {
  data: any;
}

// struct2ts:types/dist/generated.GetAppStateRequest
export interface GetAppStateRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:github.com/deso-protocol/core/lib.DeSoNode
export interface DeSoNode {
  Name: string;
  URL: string;
  Owner: string;
}

// struct2ts:types/dist/generated.GetAppStateResponse
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

// struct2ts:.

// struct2ts:types/dist/generated.CoinbaseResponse
export interface CoinbaseResponse {
  data: any;
}

// struct2ts:types/dist/generated.CoingeckoResponse
export interface CoingeckoResponse {
  bitcoin: any;
}

// struct2ts:.

// struct2ts:types/dist/generated.BlockchainDotcomResponse
export interface BlockchainDotcomResponse {
  USD: any;
}

// struct2ts:types/dist/generated.GeminiResponse
export interface GeminiResponse {
  last: string;
}

// struct2ts:.

// struct2ts:types/dist/generated.KrakenResponse
export interface KrakenResponse {
  result: any;
}

// struct2ts:types/dist/generated.ETHTx
export interface ETHTx {
  nonce: string;
  value: string;
  chainId: string;
  to: string;
  r: string;
  s: string;
}

// struct2ts:types/dist/generated.SubmitETHTxRequest
export interface SubmitETHTxRequest {
  PublicKeyBase58Check: string;
  Tx: ETHTx;
  TxBytes: string;
  ToSign: string[] | null;
  SignedHashes: string[] | null;
}

// struct2ts:types/dist/generated.SubmitETHTxResponse
export interface SubmitETHTxResponse {
  DESOTxHash: string;
}

// struct2ts:types/dist/generated.ETHTxLog
export interface ETHTxLog {
  PublicKey: number[] | null;
  DESOTxHash: string;
}

// struct2ts:types/dist/generated.AdminProcessETHTxRequest
export interface AdminProcessETHTxRequest {
  ETHTxHash: string;
}

// struct2ts:types/dist/generated.AdminProcessETHTxResponse
export interface AdminProcessETHTxResponse {
  DESOTxHash: string;
}

// struct2ts:types/dist/generated.InfuraRequest
export interface InfuraRequest {
  jsonrpc: string;
  method: string;
  params: any[] | null;
  id: number;
}

// struct2ts:types/dist/generated.InfuraResponse
export interface InfuraResponse {
  id: number;
  jsonrpc: string;
  result: any;
  error: any;
}

// struct2ts:types/dist/generated.InfuraTx
export interface InfuraTx {
  any: string | null;
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
}

// struct2ts:types/dist/generated.QueryETHRPCRequest
export interface QueryETHRPCRequest {
  Method: string;
}

// struct2ts:types/dist/generated.HeaderResponse
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

// struct2ts:types/dist/generated.InputResponse
export interface InputResponse {
  TransactionIDBase58Check: string;
  Index: number;
}

// struct2ts:types/dist/generated.OutputResponse
export interface OutputResponse {
  PublicKeyBase58Check: string;
  AmountNanos: number;
}

// struct2ts:types/dist/generated.TransactionResponse
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

// struct2ts:types/dist/generated.APIBaseResponse
export interface APIBaseResponse {
  Error: string;
  Header: HeaderResponse | null;
  Transactions: TransactionResponse[] | null;
}

// struct2ts:types/dist/generated.APIKeyPairRequest
export interface APIKeyPairRequest {
  Mnemonic: string;
  ExtraText: string;
  Index: number;
}

// struct2ts:types/dist/generated.APIKeyPairResponse
export interface APIKeyPairResponse {
  Error: string;
  PublicKeyBase58Check: string;
  PublicKeyHex: string;
  PrivateKeyBase58Check: string;
  PrivateKeyHex: string;
}

// struct2ts:types/dist/generated.APIBalanceRequest
export interface APIBalanceRequest {
  PublicKeyBase58Check: string;
  Confirmations: number;
}

// struct2ts:types/dist/generated.UTXOEntryResponse
export interface UTXOEntryResponse {
  TransactionIDBase58Check: string;
  Index: number;
  AmountNanos: number;
  PublicKeyBase58Check: string;
  Confirmations: number;
  UtxoType: string;
  BlockHeight: number;
}

// struct2ts:types/dist/generated.APIBalanceResponse
export interface APIBalanceResponse {
  Error: string;
  ConfirmedBalanceNanos: number;
  UnconfirmedBalanceNanos: number;
  UTXOs: UTXOEntryResponse[] | null;
}

// struct2ts:types/dist/generated.TransactionInfoResponse
export interface TransactionInfoResponse {
  TotalInputNanos: number;
  SpendAmountNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  FeeRateNanosPerKB: number;
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.APITransferDeSoRequest
export interface APITransferDeSoRequest {
  SenderPrivateKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  AmountNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  DryRun: boolean;
}

// struct2ts:types/dist/generated.APITransferDeSoResponse
export interface APITransferDeSoResponse {
  Error: string;
  Transaction: TransactionResponse | null;
  TransactionInfo: TransactionInfoResponse | null;
}

// struct2ts:types/dist/generated.APITransactionInfoRequest
export interface APITransactionInfoRequest {
  IsMempool: boolean;
  TransactionIDBase58Check: string;
  PublicKeyBase58Check: string;
  IDsOnly: boolean;
  LastTransactionIDBase58Check: string;
  LastPublicKeyTransactionIndex: number;
  Limit: number;
}

// struct2ts:types/dist/generated.APITransactionInfoResponse
export interface APITransactionInfoResponse {
  Error: string;
  Transactions: TransactionResponse[] | null;
  LastTransactionIDBase58Check: string;
  LastPublicKeyTransactionIndex: number;
  BalanceNanos: number;
}

// struct2ts:types/dist/generated.APINodeInfoRequest
export interface APINodeInfoRequest {}

// struct2ts:types/dist/generated.APINodeInfoResponse
export interface APINodeInfoResponse {
  Error: string;
}

// struct2ts:types/dist/generated.APIBlockRequest
export interface APIBlockRequest {
  Height: number;
  HashHex: string;
  FullBlock: boolean;
}

// struct2ts:types/dist/generated.APIBlockResponse
export interface APIBlockResponse {
  Error: string;
  Header: HeaderResponse | null;
  Transactions: TransactionResponse[] | null;
}

// struct2ts:types/dist/generated.GlobalState
export interface GlobalState {
  GlobalStateRemoteNode: string;
  GlobalStateRemoteSecret: string;
  GlobalStateDB: DB | null;
}

// struct2ts:types/dist/generated.HotFeedApprovedPostOp
export interface HotFeedApprovedPostOp {
  IsRemoval: boolean;
  Multiplier: number;
}

// struct2ts:types/dist/generated.HotFeedanyMultiplierOp
export interface HotFeedanyMultiplierOp {
  InteractionMultiplier: number;
  PostsMultiplier: number;
}

// struct2ts:types/dist/generated.PhoneNumberMetadata
export interface PhoneNumberMetadata {
  PublicKey: number[] | null;
  PhoneNumber: string;
  PhoneNumberCountryCode: string;
  ShouldCompProfileCreation: boolean;
  PublicKeyDeleted: boolean;
}

// struct2ts:types/dist/generated.WyreWalletOrderWebhookPayload
export interface WyreWalletOrderWebhookPayload {
  referenceId: string;
  accountId: string;
  orderId: string;
  orderStatus: string;
  transferId: string;
  failedReason: string;
}

// struct2ts:types/dist/generated.WyreTrackOrderResponse
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
  failedTimeline: any[] | null;
  failureReason: any;
  reversalReason: any;
}

// struct2ts:types/dist/generated.WyreWalletOrderMetadata
export interface WyreWalletOrderMetadata {
  LatestWyreWalletOrderWebhookPayload: WyreWalletOrderWebhookPayload;
  LatestWyreTrackWalletOrderResponse: WyreTrackOrderResponse | null;
  DeSoPurchasedNanos: number;
  BasicTransferTxnBlockHash: number[];
}

// struct2ts:types/dist/generated.PutRemoteRequest
export interface PutRemoteRequest {
  Key: number[] | null;
  Value: number[] | null;
}

// struct2ts:types/dist/generated.PutRemoteResponse
export interface PutRemoteResponse {}

// struct2ts:types/dist/generated.GetRemoteRequest
export interface GetRemoteRequest {
  Key: number[] | null;
}

// struct2ts:types/dist/generated.GetRemoteResponse
export interface GetRemoteResponse {
  Value: number[] | null;
}

// struct2ts:types/dist/generated.BatchGetRemoteRequest
export interface BatchGetRemoteRequest {
  KeyList: number[] | null;
}

// struct2ts:types/dist/generated.BatchGetRemoteResponse
export interface BatchGetRemoteResponse {
  ValueList: number[] | null;
}

// struct2ts:types/dist/generated.DeleteRemoteRequest
export interface DeleteRemoteRequest {
  Key: number[] | null;
}

// struct2ts:types/dist/generated.DeleteRemoteResponse
export interface DeleteRemoteResponse {}

// struct2ts:types/dist/generated.SeekRemoteRequest
export interface SeekRemoteRequest {
  StartPrefix: number[] | null;
  ValidForPrefix: number[] | null;
  MaxKeyLen: number;
  NumToFetch: number;
  Reverse: boolean;
  FetchValues: boolean;
}

// struct2ts:types/dist/generated.SeekRemoteResponse
export interface SeekRemoteResponse {
  KeysFound: number[] | null;
  ValsFound: number[] | null;
}

// struct2ts:types/dist/generated.HotFeedEntry
export interface HotFeedEntry {
  PostHash: number[];
  PostHashHex: string;
  HotnessScore: number;
}

// struct2ts:types/dist/generated.HotFeedInteractionKey
export interface HotFeedInteractionKey {
  Interactionany: number[];
  InteractionPostHash: number[];
}

// struct2ts:types/dist/generated.HotFeedanyMultiplier
export interface HotFeedanyMultiplier {
  InteractionMultiplier: number;
  PostsMultiplier: number;
}

// struct2ts:types/dist/generated.HotnessPostInfo
export interface HotnessPostInfo {
  PostBlockAge: number;
  HotnessScore: number;
}

// struct2ts:types/dist/generated.HotFeedPageRequest
export interface HotFeedPageRequest {
  ReaderPublicKeyBase58Check: string;
  SeenPosts: string[] | null;
  ResponseLimit: number;
}

// struct2ts:types/dist/generated.HotFeedPageResponse
export interface HotFeedPageResponse {
  HotFeedPage: PostEntryResponse[] | null;
}

// struct2ts:types/dist/generated.AdminUpdateHotFeedAlgorithmRequest
export interface AdminUpdateHotFeedAlgorithmRequest {
  InteractionCap: number;
  TimeDecayBlocks: number;
}

// struct2ts:types/dist/generated.AdminGetHotFeedAlgorithmResponse
export interface AdminGetHotFeedAlgorithmResponse {
  InteractionCap: number;
  TimeDecayBlocks: number;
}

// struct2ts:types/dist/generated.AdminUpdateHotFeedPostMultiplierRequest
export interface AdminUpdateHotFeedPostMultiplierRequest {
  PostHashHex: string;
  Multiplier: number;
}

// struct2ts:types/dist/generated.AdminUpdateHotFeedUserMultiplierRequest
export interface AdminUpdateHotFeedUserMultiplierRequest {
  Username: string;
  InteractionMultiplier: number;
  PostsMultiplier: number;
}

// struct2ts:types/dist/generated.AdminGetHotFeedUserMultiplierRequest
export interface AdminGetHotFeedUserMultiplierRequest {
  Username: string;
}

// struct2ts:types/dist/generated.AdminGetHotFeedUserMultiplierResponse
export interface AdminGetHotFeedUserMultiplierResponse {
  InteractionMultiplier: number;
  PostsMultiplier: number;
}

// struct2ts:types/dist/generated.UploadImageResponse
export interface UploadImageResponse {
  ImageURL: string;
}

// struct2ts:types/dist/generated.GetFullTikTokURLRequest
export interface GetFullTikTokURLRequest {
  TikTokShortVideoID: string;
}

// struct2ts:types/dist/generated.GetFullTikTokURLResponse
export interface GetFullTikTokURLResponse {
  FullTikTokURL: string;
}

// struct2ts:types/dist/generated.CFVideoDetailsResponse
export interface CFVideoDetailsResponse {
  result: { [key: string]: any };
  success: boolean;
  errors: any[] | null;
  messages: any[] | null;
}

// struct2ts:types/dist/generated.GetVideoStatusResponse
export interface GetVideoStatusResponse {
  ReadyToStream: boolean;
  Duration: number;
  Dimensions: { [key: string]: any };
}

// struct2ts:types/dist/generated.GetMessagesStatelessRequest
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

// struct2ts:types/dist/generated.MessageEntryResponse
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
}

// struct2ts:types/dist/generated.MessageContactResponse
export interface MessageContactResponse {
  PublicKeyBase58Check: string;
  Messages: MessageEntryResponse[] | null;
  ProfileEntryResponse: ProfileEntryResponse | null;
  NumMessagesRead: number;
}

// struct2ts:types/dist/generated.MessagingGroupMemberResponse
export interface MessagingGroupMemberResponse {
  GroupMemberPublicKeyBase58Check: string;
  GroupMemberKeyName: string;
  EncryptedKey: string;
}

// struct2ts:types/dist/generated.MessagingGroupEntryResponse
export interface MessagingGroupEntryResponse {
  GroupOwnerPublicKeyBase58Check: string;
  MessagingPublicKeyBase58Check: string;
  MessagingGroupKeyName: string;
  MessagingGroupMembers: MessagingGroupMemberResponse[] | null;
  EncryptedKey: string;
}

// struct2ts:types/dist/generated.GetMessagesResponse
export interface GetMessagesResponse {
  PublicKeyToProfileEntry: { [key: string]: ProfileEntryResponse };
  OrderedContactsWithMessages: MessageContactResponse[] | null;
  UnreadStateByContact: { [key: string]: boolean };
  NumberOfUnreadThreads: number;
  MessagingGroups: MessagingGroupEntryResponse[] | null;
}

// struct2ts:types/dist/generated.SendMessageStatelessRequest
export interface SendMessageStatelessRequest {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  MessageText: string;
  EncryptedMessageText: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingGroupKeyName: string;
}

// struct2ts:types/dist/generated.SendMessageStatelessResponse
export interface SendMessageStatelessResponse {
  TstampNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/dist/generated.MarkContactMessagesReadRequest
export interface MarkContactMessagesReadRequest {
  JWT: string;
  UserPublicKeyBase58Check: string;
  ContactPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.MarkAllMessagesReadRequest
export interface MarkAllMessagesReadRequest {
  JWT: string;
  UserPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.RegisterMessagingGroupKeyRequest
export interface RegisterMessagingGroupKeyRequest {
  OwnerPublicKeyBase58Check: string;
  MessagingPublicKeyBase58Check: string;
  MessagingGroupKeyName: string;
  MessagingKeySignatureHex: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.RegisterMessagingGroupKeyResponse
export interface RegisterMessagingGroupKeyResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/dist/generated.GetAllMessagingGroupKeysRequest
export interface GetAllMessagingGroupKeysRequest {
  OwnerPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetAllMessagingGroupKeysResponse
export interface GetAllMessagingGroupKeysResponse {
  MessagingGroupEntries: MessagingGroupEntryResponse[] | null;
}

// struct2ts:types/dist/generated.CheckPartyMessagingKeysRequest
export interface CheckPartyMessagingKeysRequest {
  SenderPublicKeyBase58Check: string;
  SenderMessagingKeyName: string;
  RecipientPublicKeyBase58Check: string;
  RecipientMessagingKeyName: string;
}

// struct2ts:types/dist/generated.CheckPartyMessagingKeysResponse
export interface CheckPartyMessagingKeysResponse {
  SenderMessagingPublicKeyBase58Check: string;
  SenderMessagingKeyName: string;
  IsSenderMessagingKey: boolean;
  RecipientMessagingPublicKeyBase58Check: string;
  RecipientMessagingKeyName: string;
  IsRecipientMessagingKey: boolean;
}

// struct2ts:types/dist/generated.NFTEntryResponse
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
}

// struct2ts:types/dist/generated.NFTCollectionResponse
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

// struct2ts:types/dist/generated.NFTBidEntryResponse
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

// struct2ts:types/dist/generated.CreateNFTRequest
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
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.CreateNFTResponse
export interface CreateNFTResponse {
  NFTPostHashHex: string;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/dist/generated.UpdateNFTRequest
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

// struct2ts:types/dist/generated.UpdateNFTResponse
export interface UpdateNFTResponse {
  NFTPostHashHex: string;
  SerialNumber: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/dist/generated.CreateNFTBidRequest
export interface CreateNFTBidRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  BidAmountNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.CreateNFTBidResponse
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

// struct2ts:types/dist/generated.AcceptNFTBidRequest
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

// struct2ts:types/dist/generated.AcceptNFTBidResponse
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

// struct2ts:types/dist/generated.GetNFTShowcaseRequest
export interface GetNFTShowcaseRequest {
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetNFTShowcaseResponse
export interface GetNFTShowcaseResponse {
  NFTCollections: NFTCollectionResponse[] | null;
}

// struct2ts:types/dist/generated.GetNextNFTShowcaseResponse
export interface GetNextNFTShowcaseResponse {
  NextNFTShowcaseTstamp: number;
}

// struct2ts:types/dist/generated.GetNFTsForUserRequest
export interface GetNFTsForUserRequest {
  UserPublicKeyBase58Check: string;
  ReaderPublicKeyBase58Check: string;
  IsForSale: boolean | null;
  IsPending: boolean | null;
}

// struct2ts:types/dist/generated.NFTEntryAndPostEntryResponse
export interface NFTEntryAndPostEntryResponse {
  PostEntryResponse: PostEntryResponse | null;
  NFTEntryResponses: NFTEntryResponse[] | null;
}

// struct2ts:types/dist/generated.GetNFTsForUserResponse
export interface GetNFTsForUserResponse {
  NFTsMap: { [key: string]: NFTEntryAndPostEntryResponse };
}

// struct2ts:types/dist/generated.GetNFTBidsForUserRequest
export interface GetNFTBidsForUserRequest {
  UserPublicKeyBase58Check: string;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetNFTBidsForUserResponse
export interface GetNFTBidsForUserResponse {
  NFTBidEntries: NFTBidEntryResponse[] | null;
  PublicKeyBase58CheckToProfileEntryResponse: {
    [key: string]: ProfileEntryResponse;
  };
  PostHashHexToPostEntryResponse: { [key: string]: PostEntryResponse };
}

// struct2ts:types/dist/generated.GetNFTBidsForNFTPostRequest
export interface GetNFTBidsForNFTPostRequest {
  ReaderPublicKeyBase58Check: string;
  PostHashHex: string;
}

// struct2ts:types/dist/generated.GetNFTBidsForNFTPostResponse
export interface GetNFTBidsForNFTPostResponse {
  PostEntryResponse: PostEntryResponse | null;
  NFTEntryResponses: NFTEntryResponse[] | null;
  BidEntryResponses: NFTBidEntryResponse[] | null;
}

// struct2ts:types/dist/generated.GetNFTCollectionSummaryRequest
export interface GetNFTCollectionSummaryRequest {
  PostHashHex: string;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetNFTCollectionSummaryResponse
export interface GetNFTCollectionSummaryResponse {
  NFTCollectionResponse: NFTCollectionResponse | null;
  SerialNumberToNFTEntryResponse: { [key: number]: NFTEntryResponse };
}

// struct2ts:types/dist/generated.GetNFTEntriesForPostHashRequest
export interface GetNFTEntriesForPostHashRequest {
  PostHashHex: string;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetNFTEntriesForPostHashResponse
export interface GetNFTEntriesForPostHashResponse {
  NFTEntryResponses: NFTEntryResponse[] | null;
}

// struct2ts:types/dist/generated.TransferNFTRequest
export interface TransferNFTRequest {
  SenderPublicKeyBase58Check: string;
  ReceiverPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  EncryptedUnlockableText: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.TransferNFTResponse
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

// struct2ts:types/dist/generated.AcceptNFTTransferRequest
export interface AcceptNFTTransferRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.AcceptNFTTransferResponse
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

// struct2ts:types/dist/generated.BurnNFTRequest
export interface BurnNFTRequest {
  UpdaterPublicKeyBase58Check: string;
  NFTPostHashHex: string;
  SerialNumber: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.BurnNFTResponse
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

// struct2ts:types/dist/generated.GetNFTsCreatedByPublicKeyRequest
export interface GetNFTsCreatedByPublicKeyRequest {
  PublicKeyBase58Check: string;
  Username: string;
  ReaderPublicKeyBase58Check: string;
  LastPostHashHex: string;
  NumToFetch: number;
}

// struct2ts:types/dist/generated.NFTDetails
export interface NFTDetails {
  NFTEntryResponses: NFTEntryResponse[] | null;
  NFTCollectionResponse: NFTCollectionResponse | null;
}

// struct2ts:types/dist/generated.GetNFTsCreatedByPublicKeyResponse
export interface GetNFTsCreatedByPublicKeyResponse {
  NFTs: NFTDetails[] | null;
  LastPostHashHex: string;
}

// struct2ts:types/dist/generated.GetAcceptedBidHistoryResponse
export interface GetAcceptedBidHistoryResponse {
  AcceptedBidHistoryMap: { [key: number]: NFTBidEntryResponse };
}

// struct2ts:types/dist/generated.GetPostsStatelessRequest
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
}

// struct2ts:types/dist/generated.GetPostsStatelessResponse
export interface GetPostsStatelessResponse {
  PostsFound: PostEntryResponse[] | null;
}

// struct2ts:types/dist/generated.GetSinglePostRequest
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

// struct2ts:types/dist/generated.GetSinglePostResponse
export interface GetSinglePostResponse {
  PostFound: PostEntryResponse | null;
}

// struct2ts:types/dist/generated.CommentsPostEntryResponse
export interface CommentsPostEntryResponse {
  PostEntryResponse: PostEntryResponse | null;
  PosterPublicKeyBytes: number[] | null;
}

// struct2ts:types/dist/generated.GetPostsForPublicKeyRequest
export interface GetPostsForPublicKeyRequest {
  PublicKeyBase58Check: string;
  Username: string;
  ReaderPublicKeyBase58Check: string;
  LastPostHashHex: string;
  NumToFetch: number;
  MediaRequired: boolean;
}

// struct2ts:types/dist/generated.GetPostsForPublicKeyResponse
export interface GetPostsForPublicKeyResponse {
  Posts: PostEntryResponse[] | null;
  LastPostHashHex: string;
}

// struct2ts:types/dist/generated.GetPostsDiamondedBySenderForReceiverRequest
export interface GetPostsDiamondedBySenderForReceiverRequest {
  ReceiverPublicKeyBase58Check: string;
  ReceiverUsername: string;
  SenderPublicKeyBase58Check: string;
  SenderUsername: string;
  ReaderPublicKeyBase58Check: string;
  StartPostHashHex: string;
  NumToFetch: number;
}

// struct2ts:types/dist/generated.GetPostsDiamondedBySenderForReceiverResponse
export interface GetPostsDiamondedBySenderForReceiverResponse {
  DiamondedPosts: PostEntryResponse[] | null;
  TotalDiamondsGiven: number;
  ReceiverProfileEntryResponse: ProfileEntryResponse | null;
  SenderProfileEntryResponse: ProfileEntryResponse | null;
}

// struct2ts:types/dist/generated.GetLikesForPostRequest
export interface GetLikesForPostRequest {
  PostHashHex: string;
  Offset: number;
  Limit: number;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetLikesForPostResponse
export interface GetLikesForPostResponse {
  Likers: ProfileEntryResponse[] | null;
}

// struct2ts:types/dist/generated.GetDiamondsForPostRequest
export interface GetDiamondsForPostRequest {
  PostHashHex: string;
  Offset: number;
  Limit: number;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.DiamondSenderResponse
export interface DiamondSenderResponse {
  DiamondSenderProfile: ProfileEntryResponse | null;
  DiamondLevel: number;
}

// struct2ts:types/dist/generated.GetDiamondsForPostResponse
export interface GetDiamondsForPostResponse {
  DiamondSenders: DiamondSenderResponse[] | null;
}

// struct2ts:types/dist/generated.GetRepostsForPostRequest
export interface GetRepostsForPostRequest {
  PostHashHex: string;
  Offset: number;
  Limit: number;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetRepostsForPostResponse
export interface GetRepostsForPostResponse {
  Reposters: ProfileEntryResponse[] | null;
  Reclouters: ProfileEntryResponse[] | null;
}

// struct2ts:types/dist/generated.GetQuoteRepostsForPostRequest
export interface GetQuoteRepostsForPostRequest {
  PostHashHex: string;
  Offset: number;
  Limit: number;
  ReaderPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetQuoteRepostsForPostResponse
export interface GetQuoteRepostsForPostResponse {
  QuoteReposts: PostEntryResponse[] | null;
  QuoteReclouts: PostEntryResponse[] | null;
}

// struct2ts:types/dist/generated.GetReferralInfoForUserRequest
export interface GetReferralInfoForUserRequest {
  PublicKeyBase58Check: string;
  JWT: string;
}

// struct2ts:types/dist/generated.GetReferralInfoForUserResponse
export interface GetReferralInfoForUserResponse {
  ReferralInfoResponses: ReferralInfoResponse[] | null;
}

// struct2ts:types/dist/generated.GetReferralInfoForReferralHashRequest
export interface GetReferralInfoForReferralHashRequest {
  ReferralHash: string;
}

// struct2ts:types/dist/generated.GetReferralInfoForReferralHashResponse
export interface GetReferralInfoForReferralHashResponse {
  ReferralInfoResponse: SimpleReferralInfoResponse | null;
  CountrySignUpBonus: CountryLevelSignUpBonus;
}

// struct2ts:types/dist/generated.LastTradePriceHistoryItem
export interface LastTradePriceHistoryItem {
  LastTradePrice: number;
  Timestamp: number;
}

// struct2ts:types/dist/generated.Route
export interface Route {
  Name: string;
  Method: string[] | null;
  Pattern: string;
  any: any;
  AccessLevel: number;
}

// struct2ts:types/dist/generated.AdminRequest
export interface AdminRequest {
  JWT: string;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.AmplitudeEvent
export interface AmplitudeEvent {
  user_id: string;
  event_type: string;
  event_properties: { [key: string]: any };
}

// struct2ts:types/dist/generated.AmplitudeUploadRequestBody
export interface AmplitudeUploadRequestBody {
  api_key: string;
  events: AmplitudeEvent[] | null;
}

// struct2ts:types/dist/generated.TransactionInfo
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

// struct2ts:types/dist/generated.User
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
  BlockedPubKeys: { [key: string]: any };
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

// struct2ts:types/dist/generated.GetTxnRequest
export interface GetTxnRequest {
  TxnHashHex: string;
}

// struct2ts:types/dist/generated.GetTxnResponse
export interface GetTxnResponse {
  TxnFound: boolean;
}

// struct2ts:types/dist/generated.SubmitTransactionRequest
export interface SubmitTransactionRequest {
  TransactionHex: string;
}

// struct2ts:types/dist/generated.SubmitTransactionResponse
export interface SubmitTransactionResponse {
  Transaction: MsgDeSoTxn;
  TxnHashHex: string;
  PostEntryResponse: PostEntryResponse | null;
}

// struct2ts:types/dist/generated.UpdateProfileRequest
export interface UpdateProfileRequest {
  UpdaterPublicKeyBase58Check: string;
  ProfilePublicKeyBase58Check: string;
  NewUsername: string;
  NewDescription: string;
  NewProfilePic: string;
  NewCreatorBasisPoints: number;
  NewStakeMultipleBasisPoints: number;
  IsHidden: boolean;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.UpdateProfileResponse
export interface UpdateProfileResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
  CompProfileCreationTxnHashHex: string;
}

// struct2ts:types/dist/generated.ExchangeBitcoinRequest
export interface ExchangeBitcoinRequest {
  PublicKeyBase58Check: string;
  BurnAmountSatoshis: number;
  FeeRateSatoshisPerKB: number;
  LatestBitcionAPIResponse: BlockCypherAPIFullAddressResponse;
  BTCDepositAddress: string;
  Broadcast: boolean;
  SignedHashes: string[] | null;
}

// struct2ts:types/dist/generated.ExchangeBitcoinResponse
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

// struct2ts:types/dist/generated.SendDeSoRequest
export interface SendDeSoRequest {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyOrUsername: string;
  AmountNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.SendDeSoResponse
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

// struct2ts:types/dist/generated.CreateLikeStatelessRequest
export interface CreateLikeStatelessRequest {
  ReaderPublicKeyBase58Check: string;
  LikedPostHashHex: string;
  IsUnlike: boolean;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.CreateLikeStatelessResponse
export interface CreateLikeStatelessResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/dist/generated.SubmitPostRequest
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
}

// struct2ts:types/dist/generated.SubmitPostResponse
export interface SubmitPostResponse {
  TstampNanos: number;
  PostHashHex: string;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/dist/generated.CreateFollowTxnStatelessRequest
export interface CreateFollowTxnStatelessRequest {
  FollowerPublicKeyBase58Check: string;
  FollowedPublicKeyBase58Check: string;
  IsUnfollow: boolean;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.CreateFollowTxnStatelessResponse
export interface CreateFollowTxnStatelessResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
}

// struct2ts:types/dist/generated.BuyOrSellCreatorCoinRequest
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

// struct2ts:types/dist/generated.BuyOrSellCreatorCoinResponse
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

// struct2ts:types/dist/generated.TransferCreatorCoinRequest
export interface TransferCreatorCoinRequest {
  SenderPublicKeyBase58Check: string;
  CreatorPublicKeyBase58Check: string;
  ReceiverUsernameOrPublicKeyBase58Check: string;
  CreatorCoinToTransferNanos: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.TransferCreatorCoinResponse
export interface TransferCreatorCoinResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/dist/generated.SendDiamondsRequest
export interface SendDiamondsRequest {
  SenderPublicKeyBase58Check: string;
  ReceiverPublicKeyBase58Check: string;
  DiamondPostHashHex: string;
  DiamondLevel: number;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
  InTutorial: boolean;
}

// struct2ts:types/dist/generated.SendDiamondsResponse
export interface SendDiamondsResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/dist/generated.DAOCoinRequest
export interface DAOCoinRequest {
  UpdaterPublicKeyBase58Check: string;
  ProfilePublicKeyBase58CheckOrUsername: string;
  OperationType: string;
  CoinsToMintNanos: number[];
  CoinsToBurnNanos: number[];
  TransferRestrictionStatus: string;
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.DAOCoinResponse
export interface DAOCoinResponse {
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/dist/generated.TransferDAOCoinRequest
export interface TransferDAOCoinRequest {
  SenderPublicKeyBase58Check: string;
  ProfilePublicKeyBase58CheckOrUsername: string;
  ReceiverPublicKeyBase58CheckOrUsername: string;
  DAOCoinToTransferNanos: number[];
  MinFeeRateNanosPerKB: number;
  TransactionFees: TransactionFee[] | null;
}

// struct2ts:types/dist/generated.TransferDAOCoinResponse
export interface TransferDAOCoinResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/dist/generated.AuthorizeDerivedKeyRequest
export interface AuthorizeDerivedKeyRequest {
  OwnerPublicKeyBase58Check: string;
  DerivedPublicKeyBase58Check: string;
  ExpirationBlock: number;
  AccessSignature: string;
  DeleteKey: boolean;
  DerivedKeySignature: boolean;
  TransactionFees: TransactionFee[] | null;
  MinFeeRateNanosPerKB: number;
}

// struct2ts:types/dist/generated.AuthorizeDerivedKeyResponse
export interface AuthorizeDerivedKeyResponse {
  SpendAmountNanos: number;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  FeeNanos: number;
  Transaction: MsgDeSoTxn;
  TransactionHex: string;
  TxnHashHex: string;
}

// struct2ts:types/dist/generated.AppendExtraDataRequest
export interface AppendExtraDataRequest {
  TransactionHex: string;
  ExtraData: { [key: string]: string };
}

// struct2ts:types/dist/generated.AppendExtraDataResponse
export interface AppendExtraDataResponse {
  TransactionHex: string;
}

// struct2ts:types/dist/generated.GetTransactionSpendingRequest
export interface GetTransactionSpendingRequest {
  TransactionHex: string;
}

// struct2ts:types/dist/generated.GetTransactionSpendingResponse
export interface GetTransactionSpendingResponse {
  TotalSpendingNanos: number;
}

// struct2ts:types/dist/generated.GetTutorialCreatorsRequest
export interface GetTutorialCreatorsRequest {
  ResponseLimit: number;
}

// struct2ts:types/dist/generated.UpdateTutorialStatusRequest
export interface UpdateTutorialStatusRequest {
  PublicKeyBase58Check: string;
  TutorialStatus: string;
  CreatorPurchasedInTutorialPublicKey: string;
  ClearCreatorCoinPurchasedInTutorial: boolean;
  JWT: string;
}

// struct2ts:types/dist/generated.GetTutorialCreatorResponse
export interface GetTutorialCreatorResponse {
  UpAndComingProfileEntryResponses: ProfileEntryResponse[] | null;
  WellKnownProfileEntryResponses: ProfileEntryResponse[] | null;
}

// struct2ts:types/dist/generated.StartOrSkipTutorialRequest
export interface StartOrSkipTutorialRequest {
  PublicKeyBase58Check: string;
  JWT: string;
  IsSkip: boolean;
}

// struct2ts:types/dist/generated.GetUsersStatelessRequest
export interface GetUsersStatelessRequest {
  PublicKeysBase58Check: string[] | null;
  SkipForLeaderboard: boolean;
  GetUnminedBalance: boolean;
}

// struct2ts:types/dist/generated.GetUsersResponse
export interface GetUsersResponse {
  UserList: User[] | null;
  DefaultFeeRateNanosPerKB: number;
  ParamUpdaters: { [key: string]: boolean };
}

// struct2ts:types/dist/generated.GetUserMetadataRequest
export interface GetUserMetadataRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetUserMetadataResponse
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

// struct2ts:types/dist/generated.GetProfilesRequest
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

// struct2ts:types/dist/generated.GetProfilesResponse
export interface GetProfilesResponse {
  ProfilesFound: ProfileEntryResponse[] | null;
  NextPublicKey: string | null;
}

// struct2ts:types/dist/generated.GetSingleProfileRequest
export interface GetSingleProfileRequest {
  PublicKeyBase58Check: string;
  Username: string;
  NoErrorOnMissing: boolean;
}

// struct2ts:types/dist/generated.GetSingleProfileResponse
export interface GetSingleProfileResponse {
  Profile: ProfileEntryResponse | null;
  IsBlacklisted: boolean;
  IsGraylisted: boolean;
}

// struct2ts:types/dist/generated.GetHodlersForPublicKeyRequest
export interface GetHodlersForPublicKeyRequest {
  PublicKeyBase58Check: string;
  Username: string;
  LastPublicKeyBase58Check: string;
  NumToFetch: number;
  IsDAOCoin: boolean;
  FetchHodlings: boolean;
  FetchAll: boolean;
}

// struct2ts:types/dist/generated.GetHodlersForPublicKeyResponse
export interface GetHodlersForPublicKeyResponse {
  Hodlers: BalanceEntryResponse[] | null;
  LastPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.DiamondSenderSummaryResponse
export interface DiamondSenderSummaryResponse {
  SenderPublicKeyBase58Check: string;
  ReceiverPublicKeyBase58Check: string;
  TotalDiamonds: number;
  HighestDiamondLevel: number;
  DiamondLevelMap: { [key: number]: number };
  ProfileEntryResponse: ProfileEntryResponse | null;
}

// struct2ts:types/dist/generated.GetDiamondsForPublicKeyRequest
export interface GetDiamondsForPublicKeyRequest {
  PublicKeyBase58Check: string;
  FetchYouDiamonded: boolean;
}

// struct2ts:types/dist/generated.GetDiamondsForPublicKeyResponse
export interface GetDiamondsForPublicKeyResponse {
  DiamondSenderSummaryResponses: DiamondSenderSummaryResponse[] | null;
  TotalDiamonds: number;
}

// struct2ts:types/dist/generated.GetFollowsStatelessRequest
export interface GetFollowsStatelessRequest {
  PublicKeyBase58Check: string;
  Username: string;
  GetEntriesFollowingUsername: boolean;
  LastPublicKeyBase58Check: string;
  NumToFetch: number;
}

// struct2ts:types/dist/generated.GetFollowsResponse
export interface GetFollowsResponse {
  PublicKeyToProfileEntry: { [key: string]: ProfileEntryResponse };
  NumFollowers: number;
}

// struct2ts:types/dist/generated.GetUserGlobalMetadataRequest
export interface GetUserGlobalMetadataRequest {
  UserPublicKeyBase58Check: string;
  JWT: string;
}

// struct2ts:types/dist/generated.GetUserGlobalMetadataResponse
export interface GetUserGlobalMetadataResponse {
  Email: string;
  PhoneNumber: string;
}

// struct2ts:types/dist/generated.UpdateUserGlobalMetadataRequest
export interface UpdateUserGlobalMetadataRequest {
  UserPublicKeyBase58Check: string;
  JWT: string;
  Email: string;
  MessageReadStateUpdatesByContact: { [key: string]: number };
}

// struct2ts:types/dist/generated.GetNotificationsCountRequest
export interface GetNotificationsCountRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetNotificationsCountResponse
export interface GetNotificationsCountResponse {
  NotificationsCount: number;
  LastUnreadNotificationIndex: number;
  UpdateMetadata: boolean;
}

// struct2ts:types/dist/generated.GetNotificationsRequest
export interface GetNotificationsRequest {
  PublicKeyBase58Check: string;
  FetchStartIndex: number;
  NumToFetch: number;
  FilteredOutNotificationCategories: { [key: string]: boolean };
}

// struct2ts:types/dist/generated.TransactionMetadataResponse
export interface TransactionMetadataResponse {
  Metadata: TransactionMetadata;
  TxnOutputResponses: OutputResponse[] | null;
  Txn: TransactionResponse | null;
  Index: number;
}

// struct2ts:types/dist/generated.GetNotificationsResponse
export interface GetNotificationsResponse {
  Notifications: TransactionMetadataResponse[] | null;
  ProfilesByPublicKey: { [key: string]: ProfileEntryResponse };
  PostsByHash: { [key: string]: PostEntryResponse };
  LastSeenIndex: number;
}

// struct2ts:types/dist/generated.SetNotificationMetadataRequest
export interface SetNotificationMetadataRequest {
  PublicKeyBase58Check: string;
  LastSeenIndex: number;
  LastUnreadNotificationIndex: number;
  UnreadNotifications: number;
  JWT: string;
}

// struct2ts:types/dist/generated.BlockPublicKeyRequest
export interface BlockPublicKeyRequest {
  PublicKeyBase58Check: string;
  BlockPublicKeyBase58Check: string;
  Unblock: boolean;
  JWT: string;
}

// struct2ts:types/dist/generated.BlockPublicKeyResponse
export interface BlockPublicKeyResponse {
  BlockedPublicKeys: { [key: string]: any };
}

// struct2ts:types/dist/generated.IsFollowingPublicKeyRequest
export interface IsFollowingPublicKeyRequest {
  PublicKeyBase58Check: string;
  IsFollowingPublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.IsFolllowingPublicKeyResponse
export interface IsFolllowingPublicKeyResponse {
  IsFollowing: boolean;
}

// struct2ts:types/dist/generated.IsHodlingPublicKeyRequest
export interface IsHodlingPublicKeyRequest {
  PublicKeyBase58Check: string;
  IsHodlingPublicKeyBase58Check: string;
  IsDAOCoin: boolean;
}

// struct2ts:types/dist/generated.IsHodlingPublicKeyResponse
export interface IsHodlingPublicKeyResponse {
  IsHodling: boolean;
  BalanceEntry: BalanceEntryResponse | null;
}

// struct2ts:types/dist/generated.GetUserDerivedKeysRequest
export interface GetUserDerivedKeysRequest {
  PublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.UserDerivedKey
export interface UserDerivedKey {
  OwnerPublicKeyBase58Check: string;
  DerivedPublicKeyBase58Check: string;
  ExpirationBlock: number;
  IsValid: boolean;
}

// struct2ts:types/dist/generated.GetUserDerivedKeysResponse
export interface GetUserDerivedKeysResponse {
  DerivedKeys: { [key: string]: UserDerivedKey };
}

// struct2ts:types/dist/generated.DeletePIIRequest
export interface DeletePIIRequest {
  PublicKeyBase58Check: string;
  JWT: string;
}

// struct2ts:types/dist/generated.SendPhoneNumberVerificationTextRequest
export interface SendPhoneNumberVerificationTextRequest {
  PublicKeyBase58Check: string;
  PhoneNumber: string;
  JWT: string;
}

// struct2ts:types/dist/generated.SendPhoneNumberVerificationTextResponse
export interface SendPhoneNumberVerificationTextResponse {}

// struct2ts:types/dist/generated.SubmitPhoneNumberVerificationCodeRequest
export interface SubmitPhoneNumberVerificationCodeRequest {
  JWT: string;
  PublicKeyBase58Check: string;
  PhoneNumber: string;
  VerificationCode: string;
}

// struct2ts:types/dist/generated.SubmitPhoneNumberVerificationCodeResponse
export interface SubmitPhoneNumberVerificationCodeResponse {
  TxnHashHex: string;
}

// struct2ts:types/dist/generated.ResendVerifyEmailRequest
export interface ResendVerifyEmailRequest {
  PublicKey: string;
  JWT: string;
}

// struct2ts:types/dist/generated.VerifyEmailRequest
export interface VerifyEmailRequest {
  PublicKey: string;
  EmailHash: string;
}

// struct2ts:types/dist/generated.JumioInitRequest
export interface JumioInitRequest {
  customerInternalReference: string;
  userReference: string;
  successUrl: string;
  errorUrl: string;
}

// struct2ts:types/dist/generated.JumioInitResponse
export interface JumioInitResponse {
  redirectUrl: string;
  transactionReference: string;
}

// struct2ts:types/dist/generated.JumioBeginRequest
export interface JumioBeginRequest {
  PublicKey: string;
  ReferralHashBase58: string;
  SuccessURL: string;
  ErrorURL: string;
  JWT: string;
}

// struct2ts:types/dist/generated.JumioBeginResponse
export interface JumioBeginResponse {
  URL: string;
}

// struct2ts:types/dist/generated.JumioFlowFinishedRequest
export interface JumioFlowFinishedRequest {
  PublicKey: string;
  JumioInternalReference: string;
  JWT: string;
}

// struct2ts:types/dist/generated.JumioIdentityVerification
export interface JumioIdentityVerification {
  similarity: string;
  validity: boolean;
  reason: string;
}

// struct2ts:types/dist/generated.JumioRejectReason
export interface JumioRejectReason {
  rejectReasonCode: string;
  rejectReasonDescription: string;
  rejectReasonDetails: any;
}

// struct2ts:types/dist/generated.GetJumioStatusForPublicKeyRequest
export interface GetJumioStatusForPublicKeyRequest {
  JWT: string;
  PublicKeyBase58Check: string;
}

// struct2ts:types/dist/generated.GetJumioStatusForPublicKeyResponse
export interface GetJumioStatusForPublicKeyResponse {
  JumioFinishedTime: number;
  JumioReturned: boolean;
  JumioVerified: boolean;
  BalanceNanos: number | null;
}

// struct2ts:types/dist/generated.WyreWalletOrderFullDetails
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

// struct2ts:types/dist/generated.WyreTransferDetails
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

// struct2ts:types/dist/generated.WalletOrderQuotationRequest
export interface WalletOrderQuotationRequest {
  SourceAmount: number;
  Country: string;
  SourceCurrency: string;
}

// struct2ts:types/dist/generated.WyreWalletOrderQuotationPayload
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

// struct2ts:types/dist/generated.WalletOrderReservationRequest
export interface WalletOrderReservationRequest {
  SourceAmount: number;
  ReferenceId: string;
  Country: string;
  SourceCurrency: string;
}

// struct2ts:types/dist/generated.WyreWalletOrderReservationPayload
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

// struct2ts:types/dist/generated.GetWyreWalletOrderForPublicKeyRequest
export interface GetWyreWalletOrderForPublicKeyRequest {
  PublicKeyBase58Check: string;
  Username: string;
  AdminPublicKey: string;
}

// struct2ts:types/dist/generated.WyreWalletOrderMetadataResponse
export interface WyreWalletOrderMetadataResponse {
  LatestWyreWalletOrderWebhookPayload: WyreWalletOrderWebhookPayload;
  LatestWyreTrackWalletOrderResponse: WyreTrackOrderResponse | null;
  DeSoPurchasedNanos: number;
  BitCloutPurchasedNanos: number;
  BasicTransferTxnHash: string;
  Timestamp: Date | null;
}

// struct2ts:types/dist/generated.GetWyreWalletOrderForPublicKeyResponse
export interface GetWyreWalletOrderForPublicKeyResponse {
  WyreWalletOrderMetadataResponses: WyreWalletOrderMetadataResponse[] | null;
}

// exports
