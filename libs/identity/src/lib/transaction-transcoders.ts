import {
  ArrayOf,
  BinaryRecord,
  Boolean,
  ChunkBuffer,
  Enum,
  FixedBuffer,
  Optional,
  Record,
  TransactionNonceTranscoder,
  Transcode,
  Uint8,
  Uvarint64,
  VarBuffer,
} from './transcoders';

export class TransactionInput extends BinaryRecord {
  @Transcode(FixedBuffer(32))
  id: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  index = 0;
}

export class TransactionOutput extends BinaryRecord {
  @Transcode(FixedBuffer(33))
  publicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  amountNanos = 0;
}

export class TransactionNonce extends BinaryRecord {
  @Transcode(Uvarint64)
  expirationBlockHeight = 0;

  @Transcode(Uvarint64)
  partialId = 0;
}

export class TransactionExtraDataKV extends BinaryRecord {
  @Transcode(VarBuffer)
  key: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  value: Uint8Array = new Uint8Array(0);
}

export class TransactionExtraData extends BinaryRecord {
  @Transcode(ArrayOf(TransactionExtraDataKV))
  kvs: TransactionExtraDataKV[] = [];
}
export abstract class TransactionMetadata extends BinaryRecord {}

export class TransactionMetadataBlockReward extends TransactionMetadata {
  @Transcode(VarBuffer)
  extraData: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataBasicTransfer extends TransactionMetadata {}

export class TransactionMetadataBitcoinExchange extends TransactionMetadata {
  @Transcode(VarBuffer)
  transaction: Uint8Array = new Uint8Array(0);

  @Transcode(FixedBuffer(32))
  blockHash: Uint8Array = new Uint8Array(0);

  @Transcode(FixedBuffer(32))
  merkleRoot: Uint8Array = new Uint8Array(0);

  @Transcode(ChunkBuffer(33))
  merkleProof: Uint8Array[] = [];
}

export class TransactionMetadataPrivateMessage extends TransactionMetadata {
  @Transcode(FixedBuffer(33))
  recipientPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  encryptedText: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  timestampNanos = 0;
}

export class TransactionMetadataSubmitPost extends TransactionMetadata {
  @Transcode(VarBuffer)
  postHashToModify: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  parentStakeId: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  body: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  creatorBasisPoints = 0;

  @Transcode(Uvarint64)
  stakeMultipleBasisPoints = 0;

  @Transcode(Uvarint64)
  timestampNanos = 0;

  @Transcode(Boolean)
  isHidden = false;
}

export class TransactionMetadataUpdateProfile extends TransactionMetadata {
  @Transcode(VarBuffer)
  profilePublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  newUsername: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  newDescription: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  newProfilePic: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  newCreatorBasisPoints = 0;

  @Transcode(Uvarint64)
  newStakeMultipleBasisPoints = 0;

  @Transcode(Boolean)
  isHidden = false;
}

export class TransactionMetadataUpdateBitcoinUSDExchangeRate extends TransactionMetadata {
  @Transcode(Uvarint64)
  usdCentsPerBitcoin = 0;
}

export class TransactionMetadataFollow extends TransactionMetadata {
  @Transcode(FixedBuffer(33))
  followedPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Boolean)
  isUnfollow = false;
}

export class TransactionMetadataLike extends TransactionMetadata {
  @Transcode(FixedBuffer(32))
  likedPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Boolean)
  isUnlike = false;
}

export class TransactionMetadataCreatorCoin extends TransactionMetadata {
  @Transcode(VarBuffer)
  profilePublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Uint8)
  operationType = 0;

  @Transcode(Uvarint64)
  desoToSellNanos = 0;

  @Transcode(Uvarint64)
  creatorCoinToSellNanos = 0;

  @Transcode(Uvarint64)
  desoToAddNanos = 0;

  @Transcode(Uvarint64)
  minDeSoExpectedNanos = 0;

  @Transcode(Uvarint64)
  minCreatorCoinExpectedNanos = 0;
}

export class TransactionMetadataSwapIdentity extends TransactionMetadata {
  @Transcode(VarBuffer)
  fromPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  toPublicKey: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataUpdateGlobalParams extends TransactionMetadata {}

export class TransactionMetadataCreatorCoinTransfer extends TransactionMetadata {
  @Transcode(VarBuffer)
  profilePublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  creatorCoinToTransferNanos = 0;

  @Transcode(VarBuffer)
  receiverPublicKey: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataCreateNFT extends TransactionMetadata {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  numCopies = 0;

  @Transcode(Boolean)
  hasUnlockable = false;

  @Transcode(Boolean)
  isForSale = false;

  @Transcode(Uvarint64)
  minBidAmountNanos = 0;

  @Transcode(Uvarint64)
  nftRoyaltyToCreatorBasisPoints = 0;

  @Transcode(Uvarint64)
  nftRoyaltyToCoinBasisPoints = 0;
}

export class TransactionMetadataUpdateNFT extends TransactionMetadata {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;

  @Transcode(Boolean)
  isForSale = false;

  @Transcode(Uvarint64)
  minBidAmountNanos = 0;
}

export class TransactionMetadataAcceptNFTBid extends TransactionMetadata {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;

  @Transcode(VarBuffer)
  bidderPKID: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  bidAmountNanos = 0;

  @Transcode(VarBuffer)
  encryptedUnlockableText: Uint8Array = new Uint8Array(0);

  @Transcode(ArrayOf(TransactionInput))
  bidderInputs: TransactionInput[] = [];
}

export class TransactionMetadataNFTBid extends TransactionMetadata {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;

  @Transcode(Uvarint64)
  bidAmountNanos = 0;
}

export class TransactionMetadataNFTTransfer extends TransactionMetadata {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;

  @Transcode(VarBuffer)
  receiverPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  encryptedUnlockableText: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataAcceptNFTTransfer extends TransactionMetadata {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;
}

export class TransactionMetadataBurnNFT extends TransactionMetadata {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;
}

export class TransactionMetadataAuthorizeDerivedKey extends TransactionMetadata {
  @Transcode(VarBuffer)
  derivedPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  expirationBlock = 0;

  @Transcode(Uint8)
  operationType = 0;

  @Transcode(VarBuffer)
  accessSignature: Uint8Array = new Uint8Array(0);
}

export class MessagingGroupMember extends BinaryRecord {
  @Transcode(VarBuffer)
  groupMemberPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  groupMemberKeyName: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  encryptedKey: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataMessagingGroup extends BinaryRecord {
  @Transcode(VarBuffer)
  messagingPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  messagingGroupKeyName: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  groupOwnerSignature: Uint8Array = new Uint8Array(0);

  @Transcode(ArrayOf(MessagingGroupMember))
  messagingGroupMembers: MessagingGroupMember[] = [];
}

export class TransactionMetadataDAOCoin extends TransactionMetadata {
  @Transcode(VarBuffer)
  profilePublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Uint8)
  operationType = 0;

  @Transcode(VarBuffer)
  coinsToMintNanos: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  coinsToBurnNanos: Uint8Array = new Uint8Array(0);

  @Transcode(Uint8)
  transferRestrictionStatus = 0;
}

export class TransactionMetadataTransferDAOCoin extends TransactionMetadata {
  @Transcode(VarBuffer)
  profilePublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  daoCoinToTransferNanos: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  receiverPublicKey: Uint8Array = new Uint8Array(0);
}

export class TransactionCountLimitMapItem extends BinaryRecord {
  @Transcode(Uint8)
  txnType = 0;

  @Transcode(Uvarint64)
  value = 0;
}

export class TransactionCountLimitMap extends BinaryRecord {
  @Transcode(ArrayOf(TransactionCountLimitMapItem))
  txnCountLimitMap: TransactionCountLimitMapItem[] = [];
}

export class TransactionCoinOperationLimitMapItem extends BinaryRecord {
  @Transcode(VarBuffer)
  creatorPKID: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  operation = 0;

  @Transcode(Uvarint64)
  value = 0;
}

export class TransactionCoinOperationLimitMap extends BinaryRecord {
  @Transcode(ArrayOf(TransactionCoinOperationLimitMapItem))
  coinOperationLimitMap: TransactionCoinOperationLimitMap[] = [];
}

export class TransactionNFTOperationLimitMapItem extends BinaryRecord {
  @Transcode(VarBuffer)
  postHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;

  @Transcode(Uvarint64)
  operation = 0;

  @Transcode(Uvarint64)
  value = 0;
}

export class TransactionNFTOperationLimitMap extends BinaryRecord {
  @Transcode(ArrayOf(TransactionNFTOperationLimitMapItem))
  coinOperationLimitMap: TransactionNFTOperationLimitMap[] = [];
}

export class TransactionDAOCoinLimitOrderLimitMapItem extends BinaryRecord {
  @Transcode(VarBuffer)
  buyingDAOCoinCreatorPKID: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  sellingDAOCoinCreatorPKID: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  value = 0;
}

export class TransactionSpendingLimit extends BinaryRecord {
  @Transcode(Uvarint64)
  globalDESOLimit = 0;

  @Transcode(ArrayOf(TransactionCountLimitMapItem))
  txnCountLimitMap: TransactionCountLimitMapItem[] = [];

  @Transcode(ArrayOf(TransactionCoinOperationLimitMapItem))
  creatorCoinOperationLimitMap: TransactionCoinOperationLimitMapItem[] = [];

  @Transcode(ArrayOf(TransactionCoinOperationLimitMapItem))
  daoCoinOperationLimitMap: TransactionCoinOperationLimitMapItem[] = [];

  @Transcode(ArrayOf(TransactionNFTOperationLimitMapItem))
  nftOperationLimitMap: TransactionNFTOperationLimitMapItem[] = [];

  @Transcode(ArrayOf(TransactionDAOCoinLimitOrderLimitMapItem))
  daoCoinLimitOrderLimitMap: TransactionDAOCoinLimitOrderLimitMapItem[] = [];
}

export class DeSoInputsByTransactor extends BinaryRecord {
  @Transcode(FixedBuffer(33))
  transactorPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(ArrayOf(TransactionInput))
  inputs: TransactionInput[] = [];
}

export class TransactionMetadataDAOCoinLimitOrder extends BinaryRecord {
  @Transcode(VarBuffer)
  buyingDAOCoinCreatorPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  sellingDAOCoinCreatorPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  scaledExchangeRateCoinsToSellPerCoinToBuy: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  quantityToFillInBaseUnits: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  operationType = 0;

  @Transcode(Uvarint64)
  fillType = 0;

  @Transcode(VarBuffer)
  cancelOrderID: Uint8Array = new Uint8Array(0);

  @Transcode(ArrayOf(DeSoInputsByTransactor))
  bidderInputs: DeSoInputsByTransactor[] = [];
}

export class TransactionMetadataCreateUserAssociation extends BinaryRecord {
  @Transcode(VarBuffer)
  targetUserPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  appPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  associationType: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  associationValue: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataDeleteUserAssociation extends BinaryRecord {
  @Transcode(VarBuffer)
  associationID: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataCreatePostAssociation extends BinaryRecord {
  @Transcode(VarBuffer)
  postHash: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  appPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  associationType: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  associationValue: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataDeletePostAssociation extends BinaryRecord {
  @Transcode(VarBuffer)
  associationID: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataAccessGroup extends BinaryRecord {
  @Transcode(VarBuffer)
  accessGroupOwnerPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  accessGroupPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  accessGroupKeyName: Uint8Array = new Uint8Array(0);

  @Transcode(Uint8)
  accessGroupOperationType = 0;
}

export class AccessGroupMember extends BinaryRecord {
  @Transcode(VarBuffer)
  accessGroupMemberPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  accessGroupMemberKeyName: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  encryptedKey: Uint8Array = new Uint8Array(0);

  @Transcode(Record(TransactionExtraData))
  extraData: TransactionExtraData | null = null;
}

export class TransactionMetadataAccessGroupMembers extends BinaryRecord {
  @Transcode(VarBuffer)
  accessGroupOwnerPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  accessGroupKeyName: Uint8Array = new Uint8Array(0);

  @Transcode(ArrayOf(AccessGroupMember))
  accessGroupMembersList: AccessGroupMember[] = [];

  @Transcode(Uint8)
  accessGroupMemberOperationType = 0;
}

export class TransactionMetadataNewMessage extends BinaryRecord {
  @Transcode(VarBuffer)
  senderAccessGroupOwnerPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  senderAccessGroupKeyName: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  senderAccessGroupPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  recipientAccessGroupOwnerPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  recipientAccessGroupKeyname: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  recipientAccessGroupPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  encryptedText: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  timestampNanos = 0;

  @Transcode(Uint8)
  newMessageType = 0;

  @Transcode(Uint8)
  newMessageOperation = 0;
}

export const TransactionTypeMetadataMap = {
  1: TransactionMetadataBlockReward,
  2: TransactionMetadataBasicTransfer,
  3: TransactionMetadataBitcoinExchange,
  4: TransactionMetadataPrivateMessage,
  5: TransactionMetadataSubmitPost,
  6: TransactionMetadataUpdateProfile,
  8: TransactionMetadataUpdateBitcoinUSDExchangeRate,
  9: TransactionMetadataFollow,
  10: TransactionMetadataLike,
  11: TransactionMetadataCreatorCoin,
  12: TransactionMetadataSwapIdentity,
  13: TransactionMetadataUpdateGlobalParams,
  14: TransactionMetadataCreatorCoinTransfer,
  15: TransactionMetadataCreateNFT,
  16: TransactionMetadataUpdateNFT,
  17: TransactionMetadataAcceptNFTBid,
  18: TransactionMetadataNFTBid,
  19: TransactionMetadataNFTTransfer,
  20: TransactionMetadataAcceptNFTTransfer,
  21: TransactionMetadataBurnNFT,
  22: TransactionMetadataAuthorizeDerivedKey,
  23: TransactionMetadataMessagingGroup,
  24: TransactionMetadataDAOCoin,
  25: TransactionMetadataTransferDAOCoin,
  26: TransactionMetadataDAOCoinLimitOrder,
  27: TransactionMetadataCreateUserAssociation,
  28: TransactionMetadataDeleteUserAssociation,
  29: TransactionMetadataCreatePostAssociation,
  30: TransactionMetadataDeletePostAssociation,
  31: TransactionMetadataAccessGroup,
  32: TransactionMetadataAccessGroupMembers,
  33: TransactionMetadataNewMessage,
};

export class Transaction extends BinaryRecord {
  @Transcode(ArrayOf(TransactionInput))
  inputs: TransactionInput[] = [];

  @Transcode(ArrayOf(TransactionOutput))
  outputs: TransactionOutput[] = [];

  @Transcode(Enum(TransactionTypeMetadataMap))
  metadata: TransactionMetadata | null = null;

  @Transcode(VarBuffer)
  publicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Record(TransactionExtraData))
  extraData: TransactionExtraData | null = null;

  @Transcode(VarBuffer)
  signature: Uint8Array | null = null;

  // TODO: figure out how to deal with versioning. I don't LOVE
  // this optional field, but it's the best I can think of for now.
  @Transcode(Optional(Uvarint64))
  version = 0;

  @Transcode(Optional(Uvarint64))
  feeNanos = 0;

  @Transcode(Optional(TransactionNonceTranscoder))
  nonce: TransactionNonce | null = null;

  constructor(attributes: { [k: string]: any }) {
    super();
    Object.assign(this, attributes);
  }
}

export class TransactionV0 extends BinaryRecord {
  @Transcode(ArrayOf(TransactionInput))
  inputs: TransactionInput[] = [];

  @Transcode(ArrayOf(TransactionOutput))
  outputs: TransactionOutput[] = [];

  @Transcode(Enum(TransactionTypeMetadataMap))
  metadata: TransactionMetadata | null = null;

  @Transcode(VarBuffer)
  publicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Record(TransactionExtraData))
  extraData: TransactionExtraData | null = null;

  @Transcode(VarBuffer)
  signature: Uint8Array | null = null;
}
