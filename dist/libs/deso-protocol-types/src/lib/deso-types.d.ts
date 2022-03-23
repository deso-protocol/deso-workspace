export interface BitcoinUtxo {
    TxID: number[];
    Index: number;
    AmountSatoshis: number;
}
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
export interface BlockCypherAPIOutputResponse {
    value: number;
    script: string;
    addresses: string[] | null;
    script_type: string;
    spent_by: string;
}
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
export interface BlockCypherAPIFullAddressResponse {
    address: string;
    balance: number;
    unconfirmed_balance: number;
    final_balance: number;
    txs: BlockCypherAPITxnResponse[] | null;
    hasMore: boolean;
    error: string;
}
export interface BlockchainInfoAPIResponse {
    double_spend: boolean;
}
export interface BlockonomicsRBFResponse {
    rbf: number;
    status: string;
}
export interface DeSoBlockProducer {
}
export interface BlockTemplateStats {
    TxnCount: number;
    FailingTxnHash: string;
    FailingTxnError: string;
    FailingTxnOriginalTimeAdded: Date;
    FailingTxnMinutesSinceAdded: number;
}
export interface UtxoKey {
    TxID: number[];
    Index: number;
}
export interface UtxoEntry {
    AmountNanos: number;
    PublicKey: number[] | null;
    BlockHeight: number;
    UtxoType: number;
    UtxoKey: UtxoKey | null;
}
export interface GlobalParamsEntry {
    USDCentsPerBitcoin: number;
    CreateProfileFeeNanos: number;
    CreateNFTFeeNanos: number;
    MaxCopiesPerNFT: number;
    MinimumNetworkFeeNanosPerKB: number;
}
export interface ForbiddenPubKeyEntry {
    PubKey: number[] | null;
}
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
export interface MessagingGroupMember {
    GroupMemberPublicKey: number[];
    GroupMemberKeyName: number[];
    EncryptedKey: number[] | null;
}
export interface MessagingGroupEntry {
    GroupOwnerPublicKey: number[];
    MessagingPublicKey: number[];
    MessagingGroupKeyName: number[];
    MessagingGroupMembers: MessagingGroupMember[] | null;
}
export interface PGMessage {
    MessageHash: number[];
    SenderPublicKey: number[] | null;
    RecipientPublicKey: number[] | null;
    EncryptedText: number[] | null;
    TimestampNanos: number;
}
export interface FollowEntry {
    Followerany: number[];
    Followedany: number[];
}
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
export interface NFTBidEntry {
    Bidderany: number[];
    NFTPostHash: number[];
    SerialNumber: number;
    BidAmountNanos: number;
    AcceptedBlockHeight: number | null;
}
export interface DiamondEntry {
    Senderany: number[];
    Receiverany: number[];
    DiamondPostHash: number[];
    DiamondLevel: number;
}
export interface LikeEntry {
    LikerPubKey: number[] | null;
    LikedPostHash: number[];
}
export interface RepostEntry {
    ReposterPubKey: number[] | null;
    RepostPostHash: number[];
    RepostedPostHash: number[];
}
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
    AdditionalNFTRoyaltiesToCreatorsBasisPoints: {
        [key: string]: number;
    };
    AdditionalNFTRoyaltiesToCoinsBasisPoints: {
        [key: string]: number;
    };
    PostExtraData: {
        [key: string]: number[];
    };
}
export interface anyEntry {
    any: number[];
    PublicKey: number[] | null;
}
export interface CoinEntry {
    CreatorBasisPoints: number;
    DeSoLockedNanos: number;
    NumberOfHolders: number;
    CoinsInCirculationNanos: number[];
    CoinWatermarkNanos: number;
    MintingDisabled: boolean;
    TransferRestrictionStatus: number;
}
export interface ProfileEntry {
    PublicKey: number[] | null;
    Username: number[] | null;
    Description: number[] | null;
    ProfilePic: number[] | null;
    IsHidden: boolean;
    CreatorCoinEntry: CoinEntry;
    DAOCoinEntry: CoinEntry;
}
export interface BalanceEntry {
    HODLerany: number[];
    Creatorany: number[];
    BalanceNanos: number[];
    HasPurchased: boolean;
}
export interface DerivedKeyEntry {
    OwnerPublicKey: number[];
    DerivedPublicKey: number[];
    ExpirationBlock: number;
    OperationType: number;
}
export interface DB {
}
export interface Postgres {
}
export interface DNSSeed {
    Host: string;
    HasFiltering: boolean;
}
export interface BlockHeader {
    Version: number;
    PrevBlock: number[];
    MerkleRoot: number[];
    Timestamp: Date;
    Bits: number;
    Nonce: number;
}
export interface OutPoint {
    Hash: number[];
    Index: number;
}
export interface TxIn {
    PreviousOutPoint: OutPoint;
    SignatureScript: number[] | null;
    Witness: number[] | null;
    Sequence: number;
}
export interface TxOut {
    Value: number;
    PkScript: number[] | null;
}
export interface MsgTx {
    Version: number;
    TxIn: TxIn[] | null;
    TxOut: TxOut[] | null;
    LockTime: number;
}
export interface MsgBlock {
    Header: BlockHeader;
    Transactions: MsgTx[] | null;
}
export interface Int {
}
export interface Checkpoint {
    Height: number;
    Hash: number[];
}
export interface ConsensusDeployment {
    BitNumber: number;
    StartTime: number;
    ExpireTime: number;
}
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
export interface MsgDeSoHeader {
    Version: number;
    PrevBlockHash: number[];
    TransactionMerkleRoot: number[];
    TstampSecs: number;
    Height: number;
    Nonce: number;
    ExtraNonce: number;
}
export interface BlockNode {
    Parent: BlockNode | null;
    Hash: number[];
    Height: number;
    DifficultyTarget: number[];
    CumWork: Int | null;
    Header: MsgDeSoHeader | null;
    Status: number;
}
export interface DeSoInput {
    TxID: number[];
    Index: number;
}
export interface DeSoOutput {
    PublicKey: number[] | null;
    AmountNanos: number;
}
export interface Signature {
    R: Int | null;
    S: Int | null;
}
export interface MsgDeSoTxn {
    TxInputs: DeSoInput[] | null;
    TxOutputs: DeSoOutput[] | null;
    TxnMeta: any;
    PublicKey: number[] | null;
    ExtraData: {
        [key: string]: number[];
    };
    Signature: Signature | null;
    TxnTypeJSON: number;
}
export interface BlockProducerInfo {
    PublicKey: number[] | null;
    Signature: Signature | null;
}
export interface MsgDeSoBlock {
    Header: MsgDeSoHeader | null;
    Txns: MsgDeSoTxn[] | null;
    BlockProducerInfo: BlockProducerInfo | null;
}
export interface Float {
}
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
    ParamUpdaterPublicKeys: {
        [key: string]: boolean;
    };
    SeedTxns: string[] | null;
    SeedBalances: DeSoOutput[] | null;
    CreatorCoinTradeFeeBasisPoints: number;
    CreatorCoinSlope: Float | null;
    CreatorCoinReserveRatio: Float | null;
    CreatorCoinAutoSellThresholdNanos: number;
    ForkHeights: ForkHeights;
}
export interface UtxoView {
    NumUtxoEntries: number;
    UtxoKeyToUtxoEntry: {
        [key: string]: UtxoEntry;
    };
    PublicKeyToDeSoBalanceNanos: {
        [key: string]: number;
    };
    NanosPurchased: number;
    USDCentsPerBitcoin: number;
    GlobalParamsEntry: GlobalParamsEntry | null;
    BitcoinBurnTxIDs: {
        [key: string]: boolean;
    };
    ForbiddenPubKeyToForbiddenPubKeyEntry: {
        [key: string]: ForbiddenPubKeyEntry;
    };
    MessageKeyToMessageEntry: {
        [key: string]: MessageEntry;
    };
    MessagingGroupKeyToMessagingGroupEntry: {
        [key: string]: MessagingGroupEntry;
    };
    MessageMap: {
        [key: string]: PGMessage;
    };
    FollowKeyToFollowEntry: {
        [key: string]: FollowEntry;
    };
    NFTKeyToNFTEntry: {
        [key: string]: NFTEntry;
    };
    NFTBidKeyToNFTBidEntry: {
        [key: string]: NFTBidEntry;
    };
    NFTKeyToAcceptedNFTBidHistory: {
        [key: string]: NFTBidEntry;
    };
    DiamondKeyToDiamondEntry: {
        [key: string]: DiamondEntry;
    };
    LikeKeyToLikeEntry: {
        [key: string]: LikeEntry;
    };
    RepostKeyToRepostEntry: {
        [key: string]: RepostEntry;
    };
    PostHashToPostEntry: {
        [key: string]: PostEntry;
    };
    PublicKeyToanyEntry: {
        [key: string]: anyEntry;
    };
    anyToPublicKey: {
        [key: string]: anyEntry;
    };
    ProfileanyToProfileEntry: {
        [key: string]: ProfileEntry;
    };
    ProfileUsernameToProfileEntry: {
        [key: string]: ProfileEntry;
    };
    HODLeranyCreatoranyToBalanceEntry: {
        [key: string]: BalanceEntry;
    };
    HODLeranyCreatoranyToDAOCoinBalanceEntry: {
        [key: string]: BalanceEntry;
    };
    DerivedKeyToDerivedEntry: {
        [key: string]: DerivedKeyEntry;
    };
    TipHash: number[];
    Handle: DB | null;
    Postgres: Postgres | null;
    Params: DeSoParams | null;
}
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
export interface PublicKeyRoyaltyPair {
    PublicKey: number[] | null;
    RoyaltyAmountNanos: number;
}
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
    PrevCoinRoyaltyCoinEntries: {
        [key: string]: CoinEntry;
    };
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
export interface MessageKey {
    PublicKey: number[];
    BlockHeight: number;
    TstampNanos: number;
}
export interface MessagingGroupKey {
    OwnerPublicKey: number[];
    GroupKeyName: number[];
}
export interface LikeKey {
    LikerPubKey: number[];
    LikedPostHash: number[];
}
export interface NFTKey {
    NFTPostHash: number[];
    SerialNumber: number;
}
export interface NFTBidKey {
    Bidderany: number[];
    NFTPostHash: number[];
    SerialNumber: number;
}
export interface DerivedKeyMapKey {
    OwnerPublicKey: number[];
    DerivedPublicKey: number[];
}
export interface FollowKey {
    Followerany: number[];
    Followedany: number[];
}
export interface DiamondKey {
    Senderany: number[];
    Receiverany: number[];
    DiamondPostHash: number[];
}
export interface RepostKey {
    ReposterPubKey: number[];
    RepostedPostHash: number[];
}
export interface PostEntryReaderState {
    LikedByReader: boolean;
    DiamondLevelBestowed: number;
    RepostedByReader: boolean;
    RepostPostHashHex: string;
}
export interface BalanceEntryMapKey {
    HODLerany: number[];
    Creatorany: number[];
}
export interface OrphanBlock {
    Block: MsgDeSoBlock | null;
    Hash: number[];
}
export interface RWMutex {
}
export interface Blockchain {
    ChainLock: RWMutex;
}
export interface ConnectionManager {
}
export interface AffectedPublicKey {
    PublicKeyBase58Check: string;
    Metadata: string;
}
export interface BasicTransferTxindexMetadata {
    TotalInputNanos: number;
    TotalOutputNanos: number;
    FeeNanos: number;
    UtxoOpsDump: string;
    UtxoOps: UtxoOperation[] | null;
    DiamondLevel: number;
    PostHashHex: string;
}
export interface BitcoinExchangeTxindexMetadata {
    BitcoinSpendAddress: string;
    SatoshisBurned: number;
    NanosCreated: number;
    TotalNanosPurchasedBefore: number;
    TotalNanosPurchasedAfter: number;
    BitcoinTxnHash: string;
}
export interface CreatorCoinTxindexMetadata {
    OperationType: string;
    DeSoToSellNanos: number;
    CreatorCoinToSellNanos: number;
    DeSoToAddNanos: number;
    DESOLockedNanosDiff: number;
}
export interface CreatorCoinTransferTxindexMetadata {
    CreatorUsername: string;
    CreatorCoinToTransferNanos: number;
    DiamondLevel: number;
    PostHashHex: string;
}
export interface DAOCoinTransferTxindexMetadata {
    CreatorUsername: string;
    DAOCoinToTransferNanos: number[];
}
export interface DAOCoinTxindexMetadata {
    CreatorUsername: string;
    OperationType: string;
    CoinsToMintNanos: number[];
    CoinsToBurnNanos: number[];
    TransferRestrictionStatus: string;
}
export interface UpdateProfileTxindexMetadata {
    ProfilePublicKeyBase58Check: string;
    NewUsername: string;
    NewDescription: string;
    NewProfilePic: string;
    NewCreatorBasisPoints: number;
    NewStakeMultipleBasisPoints: number;
    IsHidden: boolean;
}
export interface SubmitPostTxindexMetadata {
    PostHashBeingModifiedHex: string;
    ParentPostHashHex: string;
}
export interface LikeTxindexMetadata {
    IsUnlike: boolean;
    PostHashHex: string;
}
export interface FollowTxindexMetadata {
    IsUnfollow: boolean;
}
export interface PrivateMessageTxindexMetadata {
    TimestampNanos: number;
}
export interface SwapIdentityTxindexMetadata {
    FromPublicKeyBase58Check: string;
    ToPublicKeyBase58Check: string;
    FromDeSoLockedNanos: number;
    ToDeSoLockedNanos: number;
}
export interface NFTRoyaltiesMetadata {
    CreatorCoinRoyaltyNanos: number;
    CreatorRoyaltyNanos: number;
    CreatorPublicKeyBase58Check: string;
    AdditionalCoinRoyaltiesMap: {
        [key: string]: number;
    };
    AdditionalDESORoyaltiesMap: {
        [key: string]: number;
    };
}
export interface NFTBidTxindexMetadata {
    NFTPostHashHex: string;
    SerialNumber: number;
    BidAmountNanos: number;
    IsBuyNowBid: boolean;
    OwnerPublicKeyBase58Check: string;
    CreatorCoinRoyaltyNanos: number;
    CreatorRoyaltyNanos: number;
    CreatorPublicKeyBase58Check: string;
    AdditionalCoinRoyaltiesMap: {
        [key: string]: number;
    };
    AdditionalDESORoyaltiesMap: {
        [key: string]: number;
    };
}
export interface AcceptNFTBidTxindexMetadata {
    NFTPostHashHex: string;
    SerialNumber: number;
    BidAmountNanos: number;
    CreatorCoinRoyaltyNanos: number;
    CreatorRoyaltyNanos: number;
    CreatorPublicKeyBase58Check: string;
    AdditionalCoinRoyaltiesMap: {
        [key: string]: number;
    };
    AdditionalDESORoyaltiesMap: {
        [key: string]: number;
    };
}
export interface NFTTransferTxindexMetadata {
    NFTPostHashHex: string;
    SerialNumber: number;
}
export interface AcceptNFTTransferTxindexMetadata {
    NFTPostHashHex: string;
    SerialNumber: number;
}
export interface BurnNFTTxindexMetadata {
    NFTPostHashHex: string;
    SerialNumber: number;
}
export interface CreateNFTTxindexMetadata {
    NFTPostHashHex: string;
    AdditionalCoinRoyaltiesMap: {
        [key: string]: number;
    };
    AdditionalDESORoyaltiesMap: {
        [key: string]: number;
    };
}
export interface UpdateNFTTxindexMetadata {
    NFTPostHashHex: string;
    IsForSale: boolean;
}
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
export interface TransactionEvent {
    Txn: MsgDeSoTxn | null;
    TxnHash: number[];
    UtxoView: UtxoView | null;
    UtxoOps: UtxoOperation[] | null;
}
export interface BlockEvent {
    Block: MsgDeSoBlock | null;
    UtxoView: UtxoView | null;
    UtxoOps: UtxoOperation[] | null;
}
export interface EventManager {
}
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
export interface SummaryStats {
    Count: number;
    TotalBytes: number;
}
export interface UnconnectedTx {
}
export interface DeSoMempool {
}
export interface PublicKey {
    Curve: any;
    X: Int | null;
    Y: Int | null;
}
export interface DeSoMiner {
    PublicKeys: PublicKey[] | null;
    BlockProducer: DeSoBlockProducer | null;
}
export interface MsgDeSoQuit {
}
export interface MsgDeSoNewPeer {
}
export interface MsgDeSoDonePeer {
}
export interface MsgDeSoBitcoinManagerUpdate {
    TransactionsFound: MsgDeSoTxn[] | null;
}
export interface MsgDeSoGetHeaders {
    StopHash: number[];
    BlockLocator: any[] | null;
}
export interface MsgDeSoHeaderBundle {
    Headers: MsgDeSoHeader[] | null;
    TipHash: number[];
    TipHeight: number;
}
export interface MsgDeSoGetBlocks {
    HashList: any[] | null;
}
export interface DeSoBodySchema {
    Body: string;
    ImageURLs: string[] | null;
    VideoURLs: string[] | null;
}
export interface MsgDeSoGetTransactions {
    HashList: any[] | null;
}
export interface MsgDeSoTransactionBundle {
    Transactions: MsgDeSoTxn[] | null;
}
export interface MsgDeSoMempool {
}
export interface InvVect {
    Type: number;
    Hash: number[];
}
export interface MsgDeSoInv {
    InvList: InvVect[] | null;
    IsSyncResponse: boolean;
}
export interface MsgDeSoPing {
    Nonce: number;
}
export interface MsgDeSoPong {
    Nonce: number;
}
export interface MsgDeSoVersion {
    Version: number;
    Services: number;
    TstampSecs: number;
    Nonce: number;
    UserAgent: string;
    StartBlockHeight: number;
    MinFeeRateNanosPerKB: number;
}
export interface SingleAddr {
    Timestamp: Date;
    Services: number;
    IP: number[] | null;
    Port: number;
}
export interface MsgDeSoAddr {
    AddrList: SingleAddr[] | null;
}
export interface MsgDeSoGetAddr {
}
export interface MsgDeSoVerack {
    Nonce: number;
}
export interface BasicTransferMetadata {
}
export interface BlockRewardMetadataa {
    ExtraData: number[] | null;
}
export interface ProofPart {
    IsRight: boolean;
    Hash: number[] | null;
}
export interface BitcoinExchangeMetadata {
    BitcoinTransaction: MsgTx | null;
    BitcoinBlockHash: number[];
    BitcoinMerkleRoot: number[];
    BitcoinMerkleProof: ProofPart[] | null;
}
export interface PrivateMessageMetadata {
    RecipientPublicKey: number[] | null;
    EncryptedText: number[] | null;
    TimestampNanos: number;
}
export interface LikeMetadata {
    LikedPostHash: number[];
    IsUnlike: boolean;
}
export interface FollowMetadata {
    FollowedPublicKey: number[] | null;
    IsUnfollow: boolean;
}
export interface SubmitPostMetadata {
    PostHashToModify: number[] | null;
    ParentStakeID: number[] | null;
    Body: number[] | null;
    CreatorBasisPoints: number;
    StakeMultipleBasisPoints: number;
    TimestampNanos: number;
    IsHidden: boolean;
}
export interface UpdateProfileMetadata {
    ProfilePublicKey: number[] | null;
    NewUsername: number[] | null;
    NewDescription: number[] | null;
    NewProfilePic: number[] | null;
    NewCreatorBasisPoints: number;
    NewStakeMultipleBasisPoints: number;
    IsHidden: boolean;
}
export interface UpdateGlobalParamsMetadata {
}
export interface UpdateBitcoinUSDExchangeRateMetadataa {
    USDCentsPerBitcoin: number;
}
export interface CreatorCoinMetadataa {
    ProfilePublicKey: number[] | null;
    OperationType: number;
    DeSoToSellNanos: number;
    CreatorCoinToSellNanos: number;
    DeSoToAddNanos: number;
    MinDeSoExpectedNanos: number;
    MinCreatorCoinExpectedNanos: number;
}
export interface CreatorCoinTransferMetadataa {
    ProfilePublicKey: number[] | null;
    CreatorCoinToTransferNanos: number;
    ReceiverPublicKey: number[] | null;
}
export interface CreateNFTMetadata {
    NFTPostHash: number[];
    NumCopies: number;
    HasUnlockable: boolean;
    IsForSale: boolean;
    MinBidAmountNanos: number;
    NFTRoyaltyToCreatorBasisPoints: number;
    NFTRoyaltyToCoinBasisPoints: number;
}
export interface UpdateNFTMetadata {
    NFTPostHash: number[];
    SerialNumber: number;
    IsForSale: boolean;
    MinBidAmountNanos: number;
}
export interface AcceptNFTBidMetadata {
    NFTPostHash: number[];
    SerialNumber: number;
    Bidderany: number[];
    BidAmountNanos: number;
    UnlockableText: number[] | null;
    BidderInputs: DeSoInput[] | null;
}
export interface NFTBidMetadata {
    NFTPostHash: number[];
    SerialNumber: number;
    BidAmountNanos: number;
}
export interface NFTTransferMetadata {
    NFTPostHash: number[];
    SerialNumber: number;
    ReceiverPublicKey: number[] | null;
    UnlockableText: number[] | null;
}
export interface AcceptNFTTransferMetadata {
    NFTPostHash: number[];
    SerialNumber: number;
}
export interface BurnNFTMetadata {
    NFTPostHash: number[];
    SerialNumber: number;
}
export interface SwapIdentityMetadataa {
    FromPublicKey: number[] | null;
    ToPublicKey: number[] | null;
}
export interface AuthorizeDerivedKeyMetadata {
    DerivedPublicKey: number[] | null;
    ExpirationBlock: number;
    OperationType: number;
    AccessSignature: number[] | null;
}
export interface DAOCoinMetadata {
    ProfilePublicKey: number[] | null;
    OperationType: number;
    CoinsToMintNanos: number[];
    CoinsToBurnNanos: number[];
    TransferRestrictionStatus: number;
}
export interface DAOCoinTransferMetadata {
    ProfilePublicKey: number[] | null;
    DAOCoinToTransferNanos: number[];
    ReceiverPublicKey: number[] | null;
}
export interface MessagingGroupMetadata {
    MessagingPublicKey: number[] | null;
    MessagingGroupKeyName: number[] | null;
    GroupOwnerSignature: number[] | null;
    MessagingGroupMembers: MessagingGroupMember[] | null;
}
export interface Notifier {
}
export interface ExpectedResponse {
    TimeExpected: Date;
    MessageType: number;
}
export interface DeSoMessageMeta {
    DeSoMessage: any;
    Inbound: boolean;
}
export interface Mutex {
}
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
export interface PGChain {
    Name: string;
    TipHash: number[];
}
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
export interface PGMetadataBlockReward {
    TransactionHash: number[];
    ExtraData: number[] | null;
}
export interface PGMetadataBitcoinExchange {
    TransactionHash: number[];
    BitcoinBlockHash: number[];
    BitcoinMerkleRoot: number[];
}
export interface PGMetadataPrivateMessage {
    TransactionHash: number[];
    RecipientPublicKey: number[] | null;
    EncryptedText: number[] | null;
    TimestampNanos: number;
}
export interface PGMetadataSubmitPost {
    TransactionHash: number[];
    PostHashToModify: number[];
    ParentStakeID: number[];
    Body: number[] | null;
    TimestampNanos: number;
    IsHidden: boolean;
}
export interface PGMetadataUpdateExchangeRate {
    TransactionHash: number[];
    USDCentsPerBitcoin: number;
}
export interface PGMetadataUpdateProfile {
    TransactionHash: number[];
    ProfilePublicKey: number[] | null;
    NewUsername: number[] | null;
    NewDescription: number[] | null;
    NewProfilePic: number[] | null;
    NewCreatorBasisPoints: number;
}
export interface PGMetadataFollow {
    TransactionHash: number[];
    FollowedPublicKey: number[] | null;
    IsUnfollow: boolean;
}
export interface PGMetadataLike {
    TransactionHash: number[];
    LikedPostHash: number[];
    IsUnlike: boolean;
}
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
export interface PGMetadataCreatorCoinTransfer {
    TransactionHash: number[];
    ProfilePublicKey: number[] | null;
    CreatorCoinToTransferNanos: number;
    ReceiverPublicKey: number[] | null;
}
export interface PGMetadataSwapIdentity {
    TransactionHash: number[];
    FromPublicKey: number[] | null;
    ToPublicKey: number[] | null;
}
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
export interface PGMetadataUpdateNFT {
    TransactionHash: number[];
    NFTPostHash: number[];
    SerialNumber: number;
    IsForSale: boolean;
    MinBidAmountNanos: number;
}
export interface PGMetadataBidInput {
    TransactionHash: number[];
    InputHash: number[];
    InputIndex: number;
}
export interface PGMetadataAcceptNFTBid {
    TransactionHash: number[];
    NFTPostHash: number[];
    SerialNumber: number;
    Bidderany: number[];
    BidAmountNanos: number;
    UnlockableText: number[] | null;
    BidderInputs: PGMetadataBidInput[] | null;
}
export interface PGMetadataNFTBid {
    TransactionHash: number[];
    NFTPostHash: number[];
    SerialNumber: number;
    BidAmountNanos: number;
}
export interface PGMetadataNFTTransfer {
    TransactionHash: number[];
    NFTPostHash: number[];
    SerialNumber: number;
    ReceiverPublicKey: number[] | null;
    UnlockableText: number[] | null;
}
export interface PGMetadataAcceptNFTTransfer {
    TransactionHash: number[];
    NFTPostHash: number[];
    SerialNumber: number;
}
export interface PGMetadataBurnNFT {
    TransactionHash: number[];
    NFTPostHash: number[];
    SerialNumber: number;
}
export interface PGMetadataDerivedKey {
    TransactionHash: number[];
    DerivedPublicKey: number[];
    ExpirationBlock: number;
    OperationType: number;
    AccessSignature: number[] | null;
}
export interface PGMetadataDAOCoin {
    TransactionHash: number[];
    ProfilePublicKey: number[] | null;
    OperationType: number;
    CoinsToMintNanos: string;
    CoinsToBurnNanos: string;
    TransferRestrictionStatus: number;
}
export interface PGMetadataDAOCoinTransfer {
    TransactionHash: number[];
    ProfilePublicKey: number[] | null;
    DAOCoinToTransferNanos: string;
    ReceiverPublicKey: number[] | null;
}
export interface PGTransaction {
    Hash: number[];
    any: number[];
    Type: number;
    PublicKey: number[] | null;
    ExtraData: {
        [key: string]: number[];
    };
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
    AdditionalNFTRoyaltiesToCoinsBasisPoints: {
        [key: string]: number;
    };
    AdditionalNFTRoyaltiesToCreatorsBasisPoints: {
        [key: string]: number;
    };
    ExtraData: {
        [key: string]: number[];
    };
}
export interface PGLike {
    LikerPublicKey: number[] | null;
    LikedPostHash: number[];
}
export interface PGFollow {
    Followerany: number[];
    Followedany: number[];
}
export interface PGDiamond {
    Senderany: number[];
    Receiverany: number[];
    DiamondPostHash: number[];
    DiamondLevel: number;
}
export interface PGMessagingGroup {
    GroupOwnerPublicKey: number[];
    MessagingPublicKey: number[];
    MessagingGroupKeyName: number[];
    MessagingGroupMembers: number[] | null;
}
export interface PGCreatorCoinBalance {
    Holderany: number[];
    Creatorany: number[];
    BalanceNanos: number;
    HasPurchased: boolean;
}
export interface PGDAOCoinBalance {
    Holderany: number[];
    Creatorany: number[];
    BalanceNanos: string;
    HasPurchased: boolean;
}
export interface PGBalance {
    PublicKey: number[];
    BalanceNanos: number;
}
export interface PGGlobalParams {
    ID: number;
    USDCentsPerBitcoin: number;
    CreateProfileFeeNanos: number;
    CreateNFTFeeNanos: number;
    MaxCopiesPerNFT: number;
    MinNetworkFeeNanosPerKB: number;
}
export interface PGRepost {
    ReposterPublickey: number[];
    RepostedPostHash: number[];
    RepostPostHash: number[];
}
export interface PGForbiddenKey {
    PublicKey: number[];
}
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
export interface PGNFTBid {
    Bidderany: number[];
    NFTPostHash: number[];
    SerialNumber: number;
    BidAmountNanos: number;
    Accepted: boolean;
    AcceptedBlockHeight: number | null;
}
export interface PGDerivedKey {
    OwnerPublicKey: number[];
    DerivedPublicKey: number[];
    ExpirationBlock: number;
    OperationType: number;
}
export interface ServerMessage {
    Peer: Peer | null;
    Msg: any;
    ReplyChan: ServerReply;
}
export interface GetDataRequestInfo {
    PeerWhoSentInv: Peer | null;
    TimeRequested: Date;
}
export interface CountryLevelSignUpBonus {
    AllowCustomReferralAmount: boolean;
    ReferralAmountOverrideUSDCents: number;
    AllowCustomKickbackAmount: boolean;
    KickbackAmountOverrideUSDCents: number;
}
export interface Alpha3CountryCodeDetails {
    CountryCode: string;
    Name: string;
    Alpha3: string;
}
export interface CountrySignUpBonusResponse {
    CountryLevelSignUpBonus: CountryLevelSignUpBonus;
    CountryCodeDetails: Alpha3CountryCodeDetails;
}
export interface ServerReply {
    GraylistedResponseMap: {
        [key: string]: number[];
    };
    GlobalFeedPostHashes: any[] | null;
    TotalSupplyNanos: number;
    TotalSupplyDESO: number;
    CountKeysWithDESO: number;
    AllCountryLevelSignUpBonuses: {
        [key: string]: CountrySignUpBonusResponse;
    };
    USDCentsToDESOReserveExchangeRate: number;
    BuyDESOFeeBasisPoints: number;
    JumioUSDCents: number;
    JumioKickbackUSDCents: number;
}
export interface Server {
    SyncPeer: Peer | null;
    Notifier: Notifier | null;
}
export interface MiningSupplyIntervalStart {
    StartBlockHeight: number;
    BlockRewardNanos: number;
}
export interface PurchaseSupplyIntervalStart {
    SatoshisPerUnit: number;
    SupplyStartNanos: number;
}
export interface TXIndex {
    TXIndexLock: RWMutex;
    TXIndexChain: Blockchain | null;
    CoreChain: Blockchain | null;
    Params: DeSoParams | null;
}
export interface SetUSDCentsToDeSoExchangeRateRequest {
    USDCentsPerDeSo: number;
    AdminPublicKey: string;
}
export interface SetUSDCentsToDeSoExchangeRateResponse {
    USDCentsPerDeSo: number;
}
export interface GetUSDCentsToDeSoExchangeRateResponse {
    USDCentsPerDeSo: number;
}
export interface SetBuyDeSoFeeBasisPointsRequest {
    BuyDeSoFeeBasisPoints: number;
    AdminPublicKey: string;
}
export interface SetBuyDeSoFeeBasisPointsResponse {
    BuyDeSoFeeBasisPoints: number;
}
export interface GetBuyDeSoFeeBasisPointsResponse {
    BuyDeSoFeeBasisPoints: number;
}
export interface AdminPinPostRequest {
    PostHashHex: string;
    UnpinPost: boolean;
}
export interface AdminUpdateGlobalFeedRequest {
    PostHashHex: string;
    RemoveFromGlobalFeed: boolean;
}
export interface AdminRemoveNilPostsRequest {
    NumPostsToSearch: number;
}
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
    PostExtraData: {
        [key: string]: string;
    };
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
    AdditionalDESORoyaltiesMap: {
        [key: string]: number;
    };
    AdditionalCoinRoyaltiesMap: {
        [key: string]: number;
    };
    DiamondsFromSender: number;
    HotnessScore: number;
    PostMultiplier: number;
    RecloutCount: number;
    QuoteRecloutCount: number;
    RecloutedPostEntryResponse: PostEntryResponse | null;
}
export interface CoinEntryResponse {
    CreatorBasisPoints: number;
    DeSoLockedNanos: number;
    NumberOfHolders: number;
    CoinsInCirculationNanos: number;
    CoinWatermarkNanos: number;
    BitCloutLockedNanos: number;
}
export interface DAOCoinEntryResponse {
    NumberOfHolders: number;
    CoinsInCirculationNanos: number[];
    MintingDisabled: boolean;
    TransferRestrictionStatus: string;
}
export interface BalanceEntryResponse {
    HODLerPublicKeyBase58Check: string;
    CreatorPublicKeyBase58Check: string;
    HasPurchased: boolean;
    BalanceNanos: number;
    BalanceNanosUint256: number[];
    NetBalanceInMempool: number;
    ProfileEntryResponse: ProfileEntryResponse | null;
}
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
export interface TransactionFee {
    PublicKeyBase58Check: string;
    ProfileEntryResponse: ProfileEntryResponse | null;
    AmountNanos: number;
}
export interface AdminSetTransactionFeeForTransactionTypeRequest {
    TransactionType: string;
    NewTransactionFees: TransactionFee[] | null;
}
export interface AdminSetTransactionFeeForTransactionTypeResponse {
    TransactionFeeMap: {
        [key: string]: TransactionFee;
    };
}
export interface AdminSetAllTransactionFeesRequest {
    NewTransactionFees: TransactionFee[] | null;
}
export interface AdminSetAllTransactionFeesResponse {
    TransactionFeeMap: {
        [key: string]: TransactionFee;
    };
}
export interface AdminGetTransactionFeeMapResponse {
    TransactionFeeMap: {
        [key: string]: TransactionFee;
    };
}
export interface AdminAddExemptPublicKey {
    PublicKeyBase58Check: string;
    IsRemoval: boolean;
}
export interface AdminGetExemptPublicKeysResponse {
    ExemptPublicKeyMap: {
        [key: string]: ProfileEntryResponse;
    };
}
export interface AdminResetJumioRequest {
    PublicKeyBase58Check: string;
    Username: string;
    JWT: string;
}
export interface AdminUpdateJumioDeSoRequest {
    JWT: string;
    DeSoNanos: number;
}
export interface AdminUpdateJumioDeSoResponse {
    DeSoNanos: number;
}
export interface AdminUpdateJumioUSDCentsRequest {
    JWT: string;
    USDCents: number;
}
export interface AdminUpdateJumioUSDCentsResponse {
    USDCents: number;
}
export interface AdminUpdateJumioKickbackUSDCentsRequest {
    JWT: string;
    USDCents: number;
}
export interface AdminUpdateJumioKickbackUSDCentsResponse {
    USDCents: number;
}
export interface AdminSetJumioVerifiedRequest {
    PublicKeyBase58Check: string;
    Username: string;
}
export interface AdminJumioCallback {
    PublicKeyBase58Check: string;
    Username: string;
    CountryAlpha3: string;
}
export interface AdminUpdateJumioCountrySignUpBonusRequest {
    CountryCode: string;
    CountryLevelSignUpBonus: CountryLevelSignUpBonus;
}
export interface GetAllCountryLevelSignUpBonusResponse {
    SignUpBonusMetadata: {
        [key: string]: CountrySignUpBonusResponse;
    };
    DefaultSignUpBonusMetadata: CountryLevelSignUpBonus;
}
export interface AdminGetNFTDropRequest {
    DropNumber: number;
}
export interface NFTDropEntry {
    IsActive: boolean;
    DropNumber: number;
    DropTstampNanos: number;
    NFTHashes: any[] | null;
}
export interface AdminGetNFTDropResponse {
    DropEntry: NFTDropEntry | null;
    Posts: PostEntryResponse[] | null;
}
export interface AdminUpdateNFTDropRequest {
    DropNumber: number;
    DropTstampNanos: number;
    IsActive: boolean;
    NFTHashHexToAdd: string;
    NFTHashHexToRemove: string;
}
export interface AdminUpdateNFTDropResponse {
    DropEntry: NFTDropEntry | null;
    Posts: PostEntryResponse[] | null;
}
export interface NodeControlRequest {
    Address: string;
    MinerPublicKeys: string;
    OperationType: string;
    JWT: string;
    AdminPublicKey: string;
}
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
export interface PeerResponse {
    IP: string;
    ProtocolPort: number;
    IsSyncPeer: boolean;
}
export interface NodeControlResponse {
    DeSoStatus: NodeStatusResponse | null;
    DeSoOutboundPeers: PeerResponse[] | null;
    DeSoInboundPeers: PeerResponse[] | null;
    DeSoUnconnectedPeers: PeerResponse[] | null;
    MinerPublicKeys: string[] | null;
}
export interface AdminGetMempoolStatsResponse {
    TransactionSummaryStats: {
        [key: string]: SummaryStats;
    };
}
export interface AdminCreateReferralHashRequest {
    UserPublicKeyBase58Check: string;
    Username: string;
    ReferrerAmountUSDCents: number;
    RefereeAmountUSDCents: number;
    MaxReferrals: number;
    RequiresJumio: boolean;
    AdminPublicKey: string;
}
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
export interface ReferralInfoResponse {
    IsActive: boolean;
    Info: ReferralInfo;
    ReferredUsers: ProfileEntryResponse[] | null;
}
export interface AdminCreateReferralHashResponse {
    ReferralInfoResponse: ReferralInfoResponse;
}
export interface AdminUpdateReferralHashRequest {
    ReferralHashBase58: string;
    ReferrerAmountUSDCents: number;
    RefereeAmountUSDCents: number;
    MaxReferrals: number;
    RequiresJumio: boolean;
    IsActive: boolean;
    AdminPublicKey: string;
}
export interface AdminUpdateReferralHashResponse {
    ReferralInfoResponse: ReferralInfoResponse;
}
export interface SimpleReferralInfo {
    ReferralHashBase58: string;
    RefereeAmountUSDCents: number;
    MaxReferrals: number;
    TotalReferrals: number;
}
export interface SimpleReferralInfoResponse {
    IsActive: boolean;
    Info: SimpleReferralInfo;
}
export interface AdminGetAllReferralInfoForUserRequest {
    UserPublicKeyBase58Check: string;
    Username: string;
    AdminPublicKey: string;
}
export interface AdminGetAllReferralInfoForUserResponse {
    ReferralInfoResponses: ReferralInfoResponse[] | null;
}
export interface AdminDownloadReferralCSVResponse {
    CSVRows: string[] | null;
}
export interface AdminUploadReferralCSVRequest {
    CSVRows: string[] | null;
}
export interface AdminUploadReferralCSVResponse {
    LinksCreated: number;
    LinksUpdated: number;
}
export interface AdminDownloadRefereeCSVResponse {
    CSVRows: string[] | null;
}
export interface GetGlobalParamsRequest {
}
export interface GetGlobalParamsResponse {
    USDCentsPerBitcoin: number;
    CreateProfileFeeNanos: number;
    MinimumNetworkFeeNanosPerKB: number;
    CreateNFTFeeNanos: number;
    MaxCopiesPerNFT: number;
}
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
export interface UpdateGlobalParamsResponse {
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
}
export interface SwapIdentityRequest {
    UpdaterPublicKeyBase58Check: string;
    FromUsernameOrPublicKeyBase58Check: string;
    ToUsernameOrPublicKeyBase58Check: string;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
export interface SwapIdentityResponse {
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
}
export interface TestSignTransactionWithDerivedKeyRequest {
    TransactionHex: string;
    DerivedKeySeedHex: string;
}
export interface TestSignTransactionWithDerivedKeyResponse {
    TransactionHex: string;
}
export interface AdminUpdateTutorialCreatorRequest {
    PublicKeyBase58Check: string;
    IsRemoval: boolean;
    IsWellKnown: boolean;
    JWT: string;
}
export interface AdminResetTutorialStatusRequest {
    PublicKeyBase58Check: string;
}
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
export interface AdminGetAllUserGlobalMetadataRequest {
    NumToFetch: number;
}
export interface UserMetadata {
    PublicKey: number[] | null;
    RemoveEverywhere: boolean;
    RemoveFromLeaderboard: boolean;
    Email: string;
    EmailVerified: boolean;
    PhoneNumber: string;
    PhoneNumberCountryCode: string;
    MessageReadStateByContact: {
        [key: string]: number;
    };
    NotificationLastSeenIndex: number;
    SatoshisBurnedSoFar: number;
    HasBurnedEnoughSatoshisToCreateProfile: boolean;
    BlockedPublicKeys: {
        [key: string]: any;
    };
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
export interface AdminGetAllUserGlobalMetadataResponse {
    PubKeyToUserGlobalMetadata: {
        [key: string]: UserMetadata;
    };
    PubKeyToUsername: {
        [key: string]: string;
    };
}
export interface AdminGetUserGlobalMetadataRequest {
    UserPublicKeyBase58Check: string;
}
export interface AdminGetUserGlobalMetadataResponse {
    UserMetadata: UserMetadata;
    UserProfileEntryResponse: ProfileEntryResponse | null;
}
export interface VerifiedUsernameToany {
    VerifiedUsernameToany: {
        [key: string]: any;
    };
}
export interface VerificationUsernameAuditLog {
    TimestampNanos: number;
    VerifierUsername: string;
    Verifierany: number[];
    VerifiedUsername: string;
    Verifiedany: number[];
    IsRemoval: boolean;
}
export interface FilterAuditLog {
    TimestampNanos: number;
    Filter: number;
    UpdaterUsername: string;
    Updaterany: number[];
    UpdatedUsername: string;
    Updatedany: number[];
    IsRemoval: boolean;
}
export interface AdminGrantVerificationBadgeRequest {
    UsernameToVerify: string;
    AdminPublicKey: string;
}
export interface AdminGrantVerificationBadgeResponse {
    Message: string;
}
export interface AdminRemoveVerificationBadgeRequest {
    UsernameForWhomToRemoveVerification: string;
    AdminPublicKey: string;
}
export interface AdminRemoveVerificationBadgeResponse {
    Message: string;
}
export interface AdminGetVerifiedUsersResponse {
    VerifiedUsers: string[] | null;
}
export interface VerificationUsernameAuditLogResponse {
    TimestampNanos: number;
    VerifierUsername: string;
    VerifierPublicKeyBase58Check: string;
    VerifiedUsername: string;
    VerifiedPublicKeyBase58Check: string;
    IsRemoval: boolean;
}
export interface AdminGetUsernameVerificationAuditLogsRequest {
    Username: string;
}
export interface AdminGetUsernameVerificationAuditLogsResponse {
    VerificationAuditLogs: VerificationUsernameAuditLogResponse[] | null;
}
export interface AdminGetUserAdminDataRequest {
    UserPublicKeyBase58Check: string;
}
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
export interface BlockchainDeSoTickerResponse {
    symbol: string;
    price_24h: number;
    volume_24h: number;
    last_trade_price: number;
}
export interface CoinbaseDeSoTickerResponse {
    data: any;
}
export interface GetAppStateRequest {
    PublicKeyBase58Check: string;
}
export interface DeSoNode {
    Name: string;
    URL: string;
    Owner: string;
}
export interface GetAppStateResponse {
    MinSatoshisBurnedForProfileCreation: number;
    BlockHeight: number;
    IsTestnet: boolean;
    HasStarterDeSoSeed: boolean;
    HasTwilioAPIKey: boolean;
    CreateProfileFeeNanos: number;
    CompProfileCreation: boolean;
    DiamondLevelMap: {
        [key: number]: number;
    };
    HasWyreIntegration: boolean;
    HasJumioIntegration: boolean;
    BuyWithETH: boolean;
    USDCentsPerDeSoExchangeRate: number;
    JumioDeSoNanos: number;
    JumioUSDCents: number;
    JumioKickbackUSDCents: number;
    CountrySignUpBonus: CountryLevelSignUpBonus;
    DefaultFeeRateNanosPerKB: number;
    TransactionFeeMap: {
        [key: string]: TransactionFee;
    };
    BuyETHAddress: string;
    Nodes: {
        [key: number]: DeSoNode;
    };
    USDCentsPerBitCloutExchangeRate: number;
    JumioBitCloutNanos: number;
}
export interface CoinbaseResponse {
    data: any;
}
export interface CoingeckoResponse {
    bitcoin: any;
}
export interface BlockchainDotcomResponse {
    USD: any;
}
export interface GeminiResponse {
    last: string;
}
export interface KrakenResponse {
    result: any;
}
export interface ETHTx {
    nonce: string;
    value: string;
    chainId: string;
    to: string;
    r: string;
    s: string;
}
export interface SubmitETHTxRequest {
    PublicKeyBase58Check: string;
    Tx: ETHTx;
    TxBytes: string;
    ToSign: string[] | null;
    SignedHashes: string[] | null;
}
export interface SubmitETHTxResponse {
    DESOTxHash: string;
}
export interface ETHTxLog {
    PublicKey: number[] | null;
    DESOTxHash: string;
}
export interface AdminProcessETHTxRequest {
    ETHTxHash: string;
}
export interface AdminProcessETHTxResponse {
    DESOTxHash: string;
}
export interface InfuraRequest {
    jsonrpc: string;
    method: string;
    params: any[] | null;
    id: number;
}
export interface InfuraResponse {
    id: number;
    jsonrpc: string;
    result: any;
    error: any;
}
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
export interface QueryETHRPCRequest {
    Method: string;
}
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
export interface InputResponse {
    TransactionIDBase58Check: string;
    Index: number;
}
export interface OutputResponse {
    PublicKeyBase58Check: string;
    AmountNanos: number;
}
export interface TransactionResponse {
    TransactionIDBase58Check: string;
    RawTransactionHex: string;
    Inputs: InputResponse[] | null;
    Outputs: OutputResponse[] | null;
    SignatureHex: string;
    TransactionType: string;
    BlockHashHex: string;
    TransactionMetadata: TransactionMetadata;
    ExtraData: {
        [key: string]: string;
    };
}
export interface APIBaseResponse {
    Error: string;
    Header: HeaderResponse | null;
    Transactions: TransactionResponse[] | null;
}
export interface APIKeyPairRequest {
    Mnemonic: string;
    ExtraText: string;
    Index: number;
}
export interface APIKeyPairResponse {
    Error: string;
    PublicKeyBase58Check: string;
    PublicKeyHex: string;
    PrivateKeyBase58Check: string;
    PrivateKeyHex: string;
}
export interface APIBalanceRequest {
    PublicKeyBase58Check: string;
    Confirmations: number;
}
export interface UTXOEntryResponse {
    TransactionIDBase58Check: string;
    Index: number;
    AmountNanos: number;
    PublicKeyBase58Check: string;
    Confirmations: number;
    UtxoType: string;
    BlockHeight: number;
}
export interface APIBalanceResponse {
    Error: string;
    ConfirmedBalanceNanos: number;
    UnconfirmedBalanceNanos: number;
    UTXOs: UTXOEntryResponse[] | null;
}
export interface TransactionInfoResponse {
    TotalInputNanos: number;
    SpendAmountNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    FeeRateNanosPerKB: number;
    SenderPublicKeyBase58Check: string;
    RecipientPublicKeyBase58Check: string;
}
export interface APITransferDeSoRequest {
    SenderPrivateKeyBase58Check: string;
    RecipientPublicKeyBase58Check: string;
    AmountNanos: number;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
    DryRun: boolean;
}
export interface APITransferDeSoResponse {
    Error: string;
    Transaction: TransactionResponse | null;
    TransactionInfo: TransactionInfoResponse | null;
}
export interface APITransactionInfoRequest {
    IsMempool: boolean;
    TransactionIDBase58Check: string;
    PublicKeyBase58Check: string;
    IDsOnly: boolean;
    LastTransactionIDBase58Check: string;
    LastPublicKeyTransactionIndex: number;
    Limit: number;
}
export interface APITransactionInfoResponse {
    Error: string;
    Transactions: TransactionResponse[] | null;
    LastTransactionIDBase58Check: string;
    LastPublicKeyTransactionIndex: number;
    BalanceNanos: number;
}
export interface APINodeInfoRequest {
}
export interface APINodeInfoResponse {
    Error: string;
}
export interface APIBlockRequest {
    Height: number;
    HashHex: string;
    FullBlock: boolean;
}
export interface APIBlockResponse {
    Error: string;
    Header: HeaderResponse | null;
    Transactions: TransactionResponse[] | null;
}
export interface GlobalState {
    GlobalStateRemoteNode: string;
    GlobalStateRemoteSecret: string;
    GlobalStateDB: DB | null;
}
export interface HotFeedApprovedPostOp {
    IsRemoval: boolean;
    Multiplier: number;
}
export interface HotFeedanyMultiplierOp {
    InteractionMultiplier: number;
    PostsMultiplier: number;
}
export interface PhoneNumberMetadata {
    PublicKey: number[] | null;
    PhoneNumber: string;
    PhoneNumberCountryCode: string;
    ShouldCompProfileCreation: boolean;
    PublicKeyDeleted: boolean;
}
export interface WyreWalletOrderWebhookPayload {
    referenceId: string;
    accountId: string;
    orderId: string;
    orderStatus: string;
    transferId: string;
    failedReason: string;
}
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
export interface WyreWalletOrderMetadata {
    LatestWyreWalletOrderWebhookPayload: WyreWalletOrderWebhookPayload;
    LatestWyreTrackWalletOrderResponse: WyreTrackOrderResponse | null;
    DeSoPurchasedNanos: number;
    BasicTransferTxnBlockHash: number[];
}
export interface PutRemoteRequest {
    Key: number[] | null;
    Value: number[] | null;
}
export interface PutRemoteResponse {
}
export interface GetRemoteRequest {
    Key: number[] | null;
}
export interface GetRemoteResponse {
    Value: number[] | null;
}
export interface BatchGetRemoteRequest {
    KeyList: number[] | null;
}
export interface BatchGetRemoteResponse {
    ValueList: number[] | null;
}
export interface DeleteRemoteRequest {
    Key: number[] | null;
}
export interface DeleteRemoteResponse {
}
export interface SeekRemoteRequest {
    StartPrefix: number[] | null;
    ValidForPrefix: number[] | null;
    MaxKeyLen: number;
    NumToFetch: number;
    Reverse: boolean;
    FetchValues: boolean;
}
export interface SeekRemoteResponse {
    KeysFound: number[] | null;
    ValsFound: number[] | null;
}
export interface HotFeedEntry {
    PostHash: number[];
    PostHashHex: string;
    HotnessScore: number;
}
export interface HotFeedInteractionKey {
    Interactionany: number[];
    InteractionPostHash: number[];
}
export interface HotFeedanyMultiplier {
    InteractionMultiplier: number;
    PostsMultiplier: number;
}
export interface HotnessPostInfo {
    PostBlockAge: number;
    HotnessScore: number;
}
export interface HotFeedPageRequest {
    ReaderPublicKeyBase58Check: string;
    SeenPosts: string[] | null;
    ResponseLimit: number;
}
export interface HotFeedPageResponse {
    HotFeedPage: PostEntryResponse[] | null;
}
export interface AdminUpdateHotFeedAlgorithmRequest {
    InteractionCap: number;
    TimeDecayBlocks: number;
}
export interface AdminGetHotFeedAlgorithmResponse {
    InteractionCap: number;
    TimeDecayBlocks: number;
}
export interface AdminUpdateHotFeedPostMultiplierRequest {
    PostHashHex: string;
    Multiplier: number;
}
export interface AdminUpdateHotFeedUserMultiplierRequest {
    Username: string;
    InteractionMultiplier: number;
    PostsMultiplier: number;
}
export interface AdminGetHotFeedUserMultiplierRequest {
    Username: string;
}
export interface AdminGetHotFeedUserMultiplierResponse {
    InteractionMultiplier: number;
    PostsMultiplier: number;
}
export interface UploadImageResponse {
    ImageURL: string;
}
export interface GetFullTikTokURLRequest {
    TikTokShortVideoID: string;
}
export interface GetFullTikTokURLResponse {
    FullTikTokURL: string;
}
export interface CFVideoDetailsResponse {
    result: {
        [key: string]: any;
    };
    success: boolean;
    errors: any[] | null;
    messages: any[] | null;
}
export interface GetVideoStatusResponse {
    ReadyToStream: boolean;
    Duration: number;
    Dimensions: {
        [key: string]: any;
    };
}
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
export interface MessageContactResponse {
    PublicKeyBase58Check: string;
    Messages: MessageEntryResponse[] | null;
    ProfileEntryResponse: ProfileEntryResponse | null;
    NumMessagesRead: number;
}
export interface MessagingGroupMemberResponse {
    GroupMemberPublicKeyBase58Check: string;
    GroupMemberKeyName: string;
    EncryptedKey: string;
}
export interface MessagingGroupEntryResponse {
    GroupOwnerPublicKeyBase58Check: string;
    MessagingPublicKeyBase58Check: string;
    MessagingGroupKeyName: string;
    MessagingGroupMembers: MessagingGroupMemberResponse[] | null;
    EncryptedKey: string;
}
export interface GetMessagesResponse {
    PublicKeyToProfileEntry: {
        [key: string]: ProfileEntryResponse;
    };
    OrderedContactsWithMessages: MessageContactResponse[] | null;
    UnreadStateByContact: {
        [key: string]: boolean;
    };
    NumberOfUnreadThreads: number;
    MessagingGroups: MessagingGroupEntryResponse[] | null;
}
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
export interface SendMessageStatelessResponse {
    TstampNanos: number;
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
}
export interface MarkContactMessagesReadRequest {
    JWT: string;
    UserPublicKeyBase58Check: string;
    ContactPublicKeyBase58Check: string;
}
export interface MarkAllMessagesReadRequest {
    JWT: string;
    UserPublicKeyBase58Check: string;
}
export interface RegisterMessagingGroupKeyRequest {
    OwnerPublicKeyBase58Check: string;
    MessagingPublicKeyBase58Check: string;
    MessagingGroupKeyName: string;
    MessagingKeySignatureHex: string;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
export interface RegisterMessagingGroupKeyResponse {
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
    TxnHashHex: string;
}
export interface GetAllMessagingGroupKeysRequest {
    OwnerPublicKeyBase58Check: string;
}
export interface GetAllMessagingGroupKeysResponse {
    MessagingGroupEntries: MessagingGroupEntryResponse[] | null;
}
export interface CheckPartyMessagingKeysRequest {
    SenderPublicKeyBase58Check: string;
    SenderMessagingKeyName: string;
    RecipientPublicKeyBase58Check: string;
    RecipientMessagingKeyName: string;
}
export interface CheckPartyMessagingKeysResponse {
    SenderMessagingPublicKeyBase58Check: string;
    SenderMessagingKeyName: string;
    IsSenderMessagingKey: boolean;
    RecipientMessagingPublicKeyBase58Check: string;
    RecipientMessagingKeyName: string;
    IsRecipientMessagingKey: boolean;
}
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
    AdditionalDESORoyaltiesMap: {
        [key: string]: number;
    };
    AdditionalCoinRoyaltiesMap: {
        [key: string]: number;
    };
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
export interface CreateNFTResponse {
    NFTPostHashHex: string;
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
}
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
export interface UpdateNFTResponse {
    NFTPostHashHex: string;
    SerialNumber: number;
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
}
export interface CreateNFTBidRequest {
    UpdaterPublicKeyBase58Check: string;
    NFTPostHashHex: string;
    SerialNumber: number;
    BidAmountNanos: number;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
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
export interface GetNFTShowcaseRequest {
    ReaderPublicKeyBase58Check: string;
}
export interface GetNFTShowcaseResponse {
    NFTCollections: NFTCollectionResponse[] | null;
}
export interface GetNextNFTShowcaseResponse {
    NextNFTShowcaseTstamp: number;
}
export interface GetNFTsForUserRequest {
    UserPublicKeyBase58Check: string;
    ReaderPublicKeyBase58Check: string;
    IsForSale: boolean | null;
    IsPending: boolean | null;
}
export interface NFTEntryAndPostEntryResponse {
    PostEntryResponse: PostEntryResponse | null;
    NFTEntryResponses: NFTEntryResponse[] | null;
}
export interface GetNFTsForUserResponse {
    NFTsMap: {
        [key: string]: NFTEntryAndPostEntryResponse;
    };
}
export interface GetNFTBidsForUserRequest {
    UserPublicKeyBase58Check: string;
    ReaderPublicKeyBase58Check: string;
}
export interface GetNFTBidsForUserResponse {
    NFTBidEntries: NFTBidEntryResponse[] | null;
    PublicKeyBase58CheckToProfileEntryResponse: {
        [key: string]: ProfileEntryResponse;
    };
    PostHashHexToPostEntryResponse: {
        [key: string]: PostEntryResponse;
    };
}
export interface GetNFTBidsForNFTPostRequest {
    ReaderPublicKeyBase58Check: string;
    PostHashHex: string;
}
export interface GetNFTBidsForNFTPostResponse {
    PostEntryResponse: PostEntryResponse | null;
    NFTEntryResponses: NFTEntryResponse[] | null;
    BidEntryResponses: NFTBidEntryResponse[] | null;
}
export interface GetNFTCollectionSummaryRequest {
    PostHashHex: string;
    ReaderPublicKeyBase58Check: string;
}
export interface GetNFTCollectionSummaryResponse {
    NFTCollectionResponse: NFTCollectionResponse | null;
    SerialNumberToNFTEntryResponse: {
        [key: number]: NFTEntryResponse;
    };
}
export interface GetNFTEntriesForPostHashRequest {
    PostHashHex: string;
    ReaderPublicKeyBase58Check: string;
}
export interface GetNFTEntriesForPostHashResponse {
    NFTEntryResponses: NFTEntryResponse[] | null;
}
export interface TransferNFTRequest {
    SenderPublicKeyBase58Check: string;
    ReceiverPublicKeyBase58Check: string;
    NFTPostHashHex: string;
    SerialNumber: number;
    EncryptedUnlockableText: string;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
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
export interface AcceptNFTTransferRequest {
    UpdaterPublicKeyBase58Check: string;
    NFTPostHashHex: string;
    SerialNumber: number;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
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
export interface BurnNFTRequest {
    UpdaterPublicKeyBase58Check: string;
    NFTPostHashHex: string;
    SerialNumber: number;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
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
export interface GetNFTsCreatedByPublicKeyRequest {
    PublicKeyBase58Check: string;
    Username: string;
    ReaderPublicKeyBase58Check: string;
    LastPostHashHex: string;
    NumToFetch: number;
}
export interface NFTDetails {
    NFTEntryResponses: NFTEntryResponse[] | null;
    NFTCollectionResponse: NFTCollectionResponse | null;
}
export interface GetNFTsCreatedByPublicKeyResponse {
    NFTs: NFTDetails[] | null;
    LastPostHashHex: string;
}
export interface GetAcceptedBidHistoryResponse {
    AcceptedBidHistoryMap: {
        [key: number]: NFTBidEntryResponse;
    };
}
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
export interface GetPostsStatelessResponse {
    PostsFound: PostEntryResponse[] | null;
}
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
export interface GetSinglePostResponse {
    PostFound: PostEntryResponse | null;
}
export interface CommentsPostEntryResponse {
    PostEntryResponse: PostEntryResponse | null;
    PosterPublicKeyBytes: number[] | null;
}
export interface GetPostsForPublicKeyRequest {
    PublicKeyBase58Check: string;
    Username: string;
    ReaderPublicKeyBase58Check: string;
    LastPostHashHex: string;
    NumToFetch: number;
    MediaRequired: boolean;
}
export interface GetPostsForPublicKeyResponse {
    Posts: PostEntryResponse[] | null;
    LastPostHashHex: string;
}
export interface GetPostsDiamondedBySenderForReceiverRequest {
    ReceiverPublicKeyBase58Check: string;
    ReceiverUsername: string;
    SenderPublicKeyBase58Check: string;
    SenderUsername: string;
    ReaderPublicKeyBase58Check: string;
    StartPostHashHex: string;
    NumToFetch: number;
}
export interface GetPostsDiamondedBySenderForReceiverResponse {
    DiamondedPosts: PostEntryResponse[] | null;
    TotalDiamondsGiven: number;
    ReceiverProfileEntryResponse: ProfileEntryResponse | null;
    SenderProfileEntryResponse: ProfileEntryResponse | null;
}
export interface GetLikesForPostRequest {
    PostHashHex: string;
    Offset: number;
    Limit: number;
    ReaderPublicKeyBase58Check: string;
}
export interface GetLikesForPostResponse {
    Likers: ProfileEntryResponse[] | null;
}
export interface GetDiamondsForPostRequest {
    PostHashHex: string;
    Offset: number;
    Limit: number;
    ReaderPublicKeyBase58Check: string;
}
export interface DiamondSenderResponse {
    DiamondSenderProfile: ProfileEntryResponse | null;
    DiamondLevel: number;
}
export interface GetDiamondsForPostResponse {
    DiamondSenders: DiamondSenderResponse[] | null;
}
export interface GetRepostsForPostRequest {
    PostHashHex: string;
    Offset: number;
    Limit: number;
    ReaderPublicKeyBase58Check: string;
}
export interface GetRepostsForPostResponse {
    Reposters: ProfileEntryResponse[] | null;
    Reclouters: ProfileEntryResponse[] | null;
}
export interface GetQuoteRepostsForPostRequest {
    PostHashHex: string;
    Offset: number;
    Limit: number;
    ReaderPublicKeyBase58Check: string;
}
export interface GetQuoteRepostsForPostResponse {
    QuoteReposts: PostEntryResponse[] | null;
    QuoteReclouts: PostEntryResponse[] | null;
}
export interface GetReferralInfoForUserRequest {
    PublicKeyBase58Check: string;
    JWT: string;
}
export interface GetReferralInfoForUserResponse {
    ReferralInfoResponses: ReferralInfoResponse[] | null;
}
export interface GetReferralInfoForReferralHashRequest {
    ReferralHash: string;
}
export interface GetReferralInfoForReferralHashResponse {
    ReferralInfoResponse: SimpleReferralInfoResponse | null;
    CountrySignUpBonus: CountryLevelSignUpBonus;
}
export interface LastTradePriceHistoryItem {
    LastTradePrice: number;
    Timestamp: number;
}
export interface Route {
    Name: string;
    Method: string[] | null;
    Pattern: string;
    any: any;
    AccessLevel: number;
}
export interface AdminRequest {
    JWT: string;
    AdminPublicKey: string;
}
export interface AmplitudeEvent {
    user_id: string;
    event_type: string;
    event_properties: {
        [key: string]: any;
    };
}
export interface AmplitudeUploadRequestBody {
    api_key: string;
    events: AmplitudeEvent[] | null;
}
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
    BlockedPubKeys: {
        [key: string]: any;
    };
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
export interface GetTxnRequest {
    TxnHashHex: string;
}
export interface GetTxnResponse {
    TxnFound: boolean;
}
export interface SubmitTransactionRequest {
    TransactionHex: string;
}
export interface SubmitTransactionResponse {
    Transaction: MsgDeSoTxn;
    TxnHashHex: string;
    PostEntryResponse: PostEntryResponse | null;
}
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
export interface UpdateProfileResponse {
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
    TxnHashHex: string;
    CompProfileCreationTxnHashHex: string;
}
export interface ExchangeBitcoinRequest {
    PublicKeyBase58Check: string;
    BurnAmountSatoshis: number;
    FeeRateSatoshisPerKB: number;
    LatestBitcionAPIResponse: BlockCypherAPIFullAddressResponse;
    BTCDepositAddress: string;
    Broadcast: boolean;
    SignedHashes: string[] | null;
}
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
export interface SendDeSoRequest {
    SenderPublicKeyBase58Check: string;
    RecipientPublicKeyOrUsername: string;
    AmountNanos: number;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
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
export interface CreateLikeStatelessRequest {
    ReaderPublicKeyBase58Check: string;
    LikedPostHashHex: string;
    IsUnlike: boolean;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
export interface CreateLikeStatelessResponse {
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
}
export interface SubmitPostRequest {
    UpdaterPublicKeyBase58Check: string;
    PostHashHexToModify: string;
    ParentStakeID: string;
    BodyObj: DeSoBodySchema;
    RepostedPostHashHex: string;
    PostExtraData: {
        [key: string]: string;
    };
    IsHidden: boolean;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
    InTutorial: boolean;
}
export interface SubmitPostResponse {
    TstampNanos: number;
    PostHashHex: string;
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
}
export interface CreateFollowTxnStatelessRequest {
    FollowerPublicKeyBase58Check: string;
    FollowedPublicKeyBase58Check: string;
    IsUnfollow: boolean;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
export interface CreateFollowTxnStatelessResponse {
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
}
export interface BuyOrSellCreatorCoinRequest {
    UpdaterPublicKeyBase58Check: string;
    CreatorPublicKeyBase58Check: string;
    OperationType: 'buy' | 'sell';
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
export interface TransferCreatorCoinRequest {
    SenderPublicKeyBase58Check: string;
    CreatorPublicKeyBase58Check: string;
    ReceiverUsernameOrPublicKeyBase58Check: string;
    CreatorCoinToTransferNanos: number;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
export interface TransferCreatorCoinResponse {
    SpendAmountNanos: number;
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
    TxnHashHex: string;
}
export interface SendDiamondsRequest {
    SenderPublicKeyBase58Check: string;
    ReceiverPublicKeyBase58Check: string;
    DiamondPostHashHex: string;
    DiamondLevel: number;
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
    InTutorial: boolean;
}
export interface SendDiamondsResponse {
    SpendAmountNanos: number;
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
    TxnHashHex: string;
}
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
export interface DAOCoinResponse {
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
    TxnHashHex: string;
}
export interface TransferDAOCoinRequest {
    SenderPublicKeyBase58Check: string;
    ProfilePublicKeyBase58CheckOrUsername: string;
    ReceiverPublicKeyBase58CheckOrUsername: string;
    DAOCoinToTransferNanos: number[];
    MinFeeRateNanosPerKB: number;
    TransactionFees: TransactionFee[] | null;
}
export interface TransferDAOCoinResponse {
    SpendAmountNanos: number;
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
    TxnHashHex: string;
}
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
export interface AuthorizeDerivedKeyResponse {
    SpendAmountNanos: number;
    TotalInputNanos: number;
    ChangeAmountNanos: number;
    FeeNanos: number;
    Transaction: MsgDeSoTxn;
    TransactionHex: string;
    TxnHashHex: string;
}
export interface AppendExtraDataRequest {
    TransactionHex: string;
    ExtraData: {
        [key: string]: string;
    };
}
export interface AppendExtraDataResponse {
    TransactionHex: string;
}
export interface GetTransactionSpendingRequest {
    TransactionHex: string;
}
export interface GetTransactionSpendingResponse {
    TotalSpendingNanos: number;
}
export interface GetTutorialCreatorsRequest {
    ResponseLimit: number;
}
export interface UpdateTutorialStatusRequest {
    PublicKeyBase58Check: string;
    TutorialStatus: string;
    CreatorPurchasedInTutorialPublicKey: string;
    ClearCreatorCoinPurchasedInTutorial: boolean;
    JWT: string;
}
export interface GetTutorialCreatorResponse {
    UpAndComingProfileEntryResponses: ProfileEntryResponse[] | null;
    WellKnownProfileEntryResponses: ProfileEntryResponse[] | null;
}
export interface StartOrSkipTutorialRequest {
    PublicKeyBase58Check: string;
    JWT: string;
    IsSkip: boolean;
}
export interface GetUsersStatelessRequest {
    PublicKeysBase58Check: string[] | null;
    SkipForLeaderboard: boolean;
    GetUnminedBalance: boolean;
}
export interface GetUsersResponse {
    UserList: User[] | null;
    DefaultFeeRateNanosPerKB: number;
    ParamUpdaters: {
        [key: string]: boolean;
    };
}
export interface GetUserMetadataRequest {
    PublicKeyBase58Check: string;
}
export interface GetUserMetadataResponse {
    HasPhoneNumber: boolean;
    CanCreateProfile: boolean;
    BlockedPubKeys: {
        [key: string]: any;
    };
    HasEmail: boolean;
    EmailVerified: boolean;
    JumioFinishedTime: number;
    JumioVerified: boolean;
    JumioReturned: boolean;
}
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
export interface GetProfilesResponse {
    ProfilesFound: ProfileEntryResponse[] | null;
    NextPublicKey: string | null;
}
export interface GetSingleProfileRequest {
    PublicKeyBase58Check: string;
    Username: string;
    NoErrorOnMissing: boolean;
}
export interface GetSingleProfileResponse {
    Profile: ProfileEntryResponse | null;
    IsBlacklisted: boolean;
    IsGraylisted: boolean;
}
export interface GetHodlersForPublicKeyRequest {
    PublicKeyBase58Check: string;
    Username: string;
    LastPublicKeyBase58Check: string;
    NumToFetch: number;
    IsDAOCoin: boolean;
    FetchHodlings: boolean;
    FetchAll: boolean;
}
export interface GetHodlersForPublicKeyResponse {
    Hodlers: BalanceEntryResponse[] | null;
    LastPublicKeyBase58Check: string;
}
export interface DiamondSenderSummaryResponse {
    SenderPublicKeyBase58Check: string;
    ReceiverPublicKeyBase58Check: string;
    TotalDiamonds: number;
    HighestDiamondLevel: number;
    DiamondLevelMap: {
        [key: number]: number;
    };
    ProfileEntryResponse: ProfileEntryResponse | null;
}
export interface GetDiamondsForPublicKeyRequest {
    PublicKeyBase58Check: string;
    FetchYouDiamonded: boolean;
}
export interface GetDiamondsForPublicKeyResponse {
    DiamondSenderSummaryResponses: DiamondSenderSummaryResponse[] | null;
    TotalDiamonds: number;
}
export interface GetFollowsStatelessRequest {
    PublicKeyBase58Check: string;
    Username: string;
    GetEntriesFollowingUsername: boolean;
    LastPublicKeyBase58Check: string;
    NumToFetch: number;
}
export interface GetFollowsResponse {
    PublicKeyToProfileEntry: {
        [key: string]: ProfileEntryResponse;
    };
    NumFollowers: number;
}
export interface GetUserGlobalMetadataRequest {
    UserPublicKeyBase58Check: string;
    JWT: string;
}
export interface GetUserGlobalMetadataResponse {
    Email: string;
    PhoneNumber: string;
}
export interface UpdateUserGlobalMetadataRequest {
    UserPublicKeyBase58Check: string;
    JWT: string;
    Email: string;
    MessageReadStateUpdatesByContact: {
        [key: string]: number;
    };
}
export interface GetNotificationsCountRequest {
    PublicKeyBase58Check: string;
}
export interface GetNotificationsCountResponse {
    NotificationsCount: number;
    LastUnreadNotificationIndex: number;
    UpdateMetadata: boolean;
}
export interface GetNotificationsRequest {
    PublicKeyBase58Check: string;
    FetchStartIndex: number;
    NumToFetch: number;
    FilteredOutNotificationCategories: {
        [key: string]: boolean;
    };
}
export interface TransactionMetadataResponse {
    Metadata: TransactionMetadata;
    TxnOutputResponses: OutputResponse[] | null;
    Txn: TransactionResponse | null;
    Index: number;
}
export interface GetNotificationsResponse {
    Notifications: TransactionMetadataResponse[] | null;
    ProfilesByPublicKey: {
        [key: string]: ProfileEntryResponse;
    };
    PostsByHash: {
        [key: string]: PostEntryResponse;
    };
    LastSeenIndex: number;
}
export interface SetNotificationMetadataRequest {
    PublicKeyBase58Check: string;
    LastSeenIndex: number;
    LastUnreadNotificationIndex: number;
    UnreadNotifications: number;
    JWT: string;
}
export interface BlockPublicKeyRequest {
    PublicKeyBase58Check: string;
    BlockPublicKeyBase58Check: string;
    Unblock: boolean;
    JWT: string;
}
export interface BlockPublicKeyResponse {
    BlockedPublicKeys: {
        [key: string]: any;
    };
}
export interface IsFollowingPublicKeyRequest {
    PublicKeyBase58Check: string;
    IsFollowingPublicKeyBase58Check: string;
}
export interface IsFolllowingPublicKeyResponse {
    IsFollowing: boolean;
}
export interface IsHodlingPublicKeyRequest {
    PublicKeyBase58Check: string;
    IsHodlingPublicKeyBase58Check: string;
    IsDAOCoin: boolean;
}
export interface IsHodlingPublicKeyResponse {
    IsHodling: boolean;
    BalanceEntry: BalanceEntryResponse | null;
}
export interface GetUserDerivedKeysRequest {
    PublicKeyBase58Check: string;
}
export interface UserDerivedKey {
    OwnerPublicKeyBase58Check: string;
    DerivedPublicKeyBase58Check: string;
    ExpirationBlock: number;
    IsValid: boolean;
}
export interface GetUserDerivedKeysResponse {
    DerivedKeys: {
        [key: string]: UserDerivedKey;
    };
}
export interface DeletePIIRequest {
    PublicKeyBase58Check: string;
    JWT: string;
}
export interface SendPhoneNumberVerificationTextRequest {
    PublicKeyBase58Check: string;
    PhoneNumber: string;
    JWT: string;
}
export interface SendPhoneNumberVerificationTextResponse {
}
export interface SubmitPhoneNumberVerificationCodeRequest {
    JWT: string;
    PublicKeyBase58Check: string;
    PhoneNumber: string;
    VerificationCode: string;
}
export interface SubmitPhoneNumberVerificationCodeResponse {
    TxnHashHex: string;
}
export interface ResendVerifyEmailRequest {
    PublicKey: string;
    JWT: string;
}
export interface VerifyEmailRequest {
    PublicKey: string;
    EmailHash: string;
}
export interface JumioInitRequest {
    customerInternalReference: string;
    userReference: string;
    successUrl: string;
    errorUrl: string;
}
export interface JumioInitResponse {
    redirectUrl: string;
    transactionReference: string;
}
export interface JumioBeginRequest {
    PublicKey: string;
    ReferralHashBase58: string;
    SuccessURL: string;
    ErrorURL: string;
    JWT: string;
}
export interface JumioBeginResponse {
    URL: string;
}
export interface JumioFlowFinishedRequest {
    PublicKey: string;
    JumioInternalReference: string;
    JWT: string;
}
export interface JumioIdentityVerification {
    similarity: string;
    validity: boolean;
    reason: string;
}
export interface JumioRejectReason {
    rejectReasonCode: string;
    rejectReasonDescription: string;
    rejectReasonDetails: any;
}
export interface GetJumioStatusForPublicKeyRequest {
    JWT: string;
    PublicKeyBase58Check: string;
}
export interface GetJumioStatusForPublicKeyResponse {
    JumioFinishedTime: number;
    JumioReturned: boolean;
    JumioVerified: boolean;
    BalanceNanos: number | null;
}
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
export interface WalletOrderQuotationRequest {
    SourceAmount: number;
    Country: string;
    SourceCurrency: string;
}
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
export interface WalletOrderReservationRequest {
    SourceAmount: number;
    ReferenceId: string;
    Country: string;
    SourceCurrency: string;
}
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
export interface GetWyreWalletOrderForPublicKeyRequest {
    PublicKeyBase58Check: string;
    Username: string;
    AdminPublicKey: string;
}
export interface WyreWalletOrderMetadataResponse {
    LatestWyreWalletOrderWebhookPayload: WyreWalletOrderWebhookPayload;
    LatestWyreTrackWalletOrderResponse: WyreTrackOrderResponse | null;
    DeSoPurchasedNanos: number;
    BitCloutPurchasedNanos: number;
    BasicTransferTxnHash: string;
    Timestamp: Date | null;
}
export interface GetWyreWalletOrderForPublicKeyResponse {
    WyreWalletOrderMetadataResponses: WyreWalletOrderMetadataResponse[] | null;
}
