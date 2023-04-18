import {
  DeSoInput,
  DeSoOutput,
  MsgDeSoTxn,
  TransactionType,
} from '../backend-types';
import { bufToUvarint64, publicKeyToBase58Check } from './crypto-utils';
import { decodeBytesToUTF8 } from './transcoder-utils';
import {
  ArrayOf,
  BinaryRecord,
  Boolean,
  ChunkBuffer,
  Enum,
  FixedBuffer,
  instanceToType,
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

  constructor(key?: Uint8Array, value?: Uint8Array) {
    super();
    this.key = key || new Uint8Array(0);
    this.value = value || new Uint8Array(0);
  }
}

export class TransactionExtraData extends BinaryRecord {
  @Transcode(ArrayOf(TransactionExtraDataKV))
  kvs: TransactionExtraDataKV[] = [];
}
export abstract class TransactionMetadataRecord extends BinaryRecord {}

export class TransactionMetadataBlockReward extends TransactionMetadataRecord {
  @Transcode(VarBuffer)
  extraData: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataBasicTransfer extends TransactionMetadataRecord {}

export class TransactionMetadataBitcoinExchange extends TransactionMetadataRecord {
  @Transcode(VarBuffer)
  transaction: Uint8Array = new Uint8Array(0);

  @Transcode(FixedBuffer(32))
  blockHash: Uint8Array = new Uint8Array(0);

  @Transcode(FixedBuffer(32))
  merkleRoot: Uint8Array = new Uint8Array(0);

  @Transcode(ChunkBuffer(33))
  merkleProof: Uint8Array[] = [];
}

export class TransactionMetadataPrivateMessage extends TransactionMetadataRecord {
  @Transcode(FixedBuffer(33))
  recipientPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  encryptedText: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  timestampNanos = 0;
}

export class TransactionMetadataSubmitPost extends TransactionMetadataRecord {
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

export class TransactionMetadataUpdateProfile extends TransactionMetadataRecord {
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

export class TransactionMetadataUpdateBitcoinUSDExchangeRate extends TransactionMetadataRecord {
  @Transcode(Uvarint64)
  usdCentsPerBitcoin = 0;
}

export class TransactionMetadataFollow extends TransactionMetadataRecord {
  @Transcode(FixedBuffer(33))
  followedPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Boolean)
  isUnfollow = false;
}

export class TransactionMetadataLike extends TransactionMetadataRecord {
  @Transcode(FixedBuffer(32))
  likedPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Boolean)
  isUnlike = false;
}

export class TransactionMetadataCreatorCoin extends TransactionMetadataRecord {
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

export class TransactionMetadataSwapIdentity extends TransactionMetadataRecord {
  @Transcode(VarBuffer)
  fromPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  toPublicKey: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataUpdateGlobalParams extends TransactionMetadataRecord {}

export class TransactionMetadataCreatorCoinTransfer extends TransactionMetadataRecord {
  @Transcode(VarBuffer)
  profilePublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  creatorCoinToTransferNanos = 0;

  @Transcode(VarBuffer)
  receiverPublicKey: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataCreateNFT extends TransactionMetadataRecord {
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

export class TransactionMetadataUpdateNFT extends TransactionMetadataRecord {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;

  @Transcode(Boolean)
  isForSale = false;

  @Transcode(Uvarint64)
  minBidAmountNanos = 0;
}

export class TransactionMetadataAcceptNFTBid extends TransactionMetadataRecord {
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

export class TransactionMetadataNFTBid extends TransactionMetadataRecord {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;

  @Transcode(Uvarint64)
  bidAmountNanos = 0;
}

export class TransactionMetadataNFTTransfer extends TransactionMetadataRecord {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;

  @Transcode(VarBuffer)
  receiverPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(VarBuffer)
  encryptedUnlockableText: Uint8Array = new Uint8Array(0);
}

export class TransactionMetadataAcceptNFTTransfer extends TransactionMetadataRecord {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;
}

export class TransactionMetadataBurnNFT extends TransactionMetadataRecord {
  @Transcode(FixedBuffer(32))
  nftPostHash: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  serialNumber = 0;
}

export class TransactionMetadataAuthorizeDerivedKey extends TransactionMetadataRecord {
  @Transcode(VarBuffer)
  derivedPublicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Uvarint64)
  expirationBlock = 0;

  @Transcode(Uint8)
  operationType = 0;

  @Transcode(VarBuffer)
  accessSignature: Uint8Array = new Uint8Array(0);
}

export class MessagingGroupMemberRecord extends BinaryRecord {
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

  @Transcode(ArrayOf(MessagingGroupMemberRecord))
  MessagingGroupMemberRecords: MessagingGroupMemberRecord[] = [];
}

export class TransactionMetadataDAOCoin extends TransactionMetadataRecord {
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

export class TransactionMetadataTransferDAOCoin extends TransactionMetadataRecord {
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

export class TransactionSpendingLimitRecord extends BinaryRecord {
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

export class DeSoInputsByTransactorRecord extends BinaryRecord {
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

  @Transcode(ArrayOf(DeSoInputsByTransactorRecord))
  bidderInputs: DeSoInputsByTransactorRecord[] = [];
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

export class AccessGroupMemberRecord extends BinaryRecord {
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

  @Transcode(ArrayOf(AccessGroupMemberRecord))
  accessGroupMembersList: AccessGroupMemberRecord[] = [];

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

export const TransactionTypeToStringMap: { [k: number]: string } = {
  0: 'UNDEFINED',
  1: 'BLOCK_REWARD',
  2: TransactionType.BasicTransfer,
  3: TransactionType.BitcoinExchange,
  4: TransactionType.PrivateMessage,
  5: TransactionType.SubmitPost,
  6: TransactionType.UpdateProfile,
  8: TransactionType.UpdateBitcoinUSDExchangeRate,
  9: TransactionType.Follow,
  10: TransactionType.Like,
  11: TransactionType.CreatorCoin,
  12: TransactionType.SwapIdentity,
  13: TransactionType.UpdateGlobalParams,
  14: TransactionType.CreatorCoinTransfer,
  15: TransactionType.CreateNFT,
  16: TransactionType.UpdateNFT,
  17: TransactionType.AcceptNFTBid,
  18: TransactionType.NFTBid,
  19: TransactionType.NFTTransfer,
  20: TransactionType.AcceptNFTTransfer,
  21: TransactionType.BurnNFT,
  22: TransactionType.AuthorizeDerivedKey,
  23: TransactionType.MessagingGroup,
  24: TransactionType.DAOCoin,
  25: TransactionType.DAOCoinTransfer,
  26: TransactionType.DAOCoinLimitOrder,
  27: TransactionType.CreateUserAssociation,
  28: TransactionType.DeleteUserAssociation,
  29: TransactionType.CreatePostAssociation,
  30: TransactionType.DeletePostAssociation,
  31: TransactionType.AccessGroup,
  32: TransactionType.AccessGroupMembers,
  33: TransactionType.NewMessage,
};

export class Transaction extends BinaryRecord {
  @Transcode(ArrayOf(TransactionInput))
  inputs: TransactionInput[] = [];

  @Transcode(ArrayOf(TransactionOutput))
  outputs: TransactionOutput[] = [];

  @Transcode(Enum(TransactionTypeMetadataMap))
  metadata: TransactionMetadataRecord | null = null;

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

  getTxnType(): number {
    return this.metadata !== null
      ? instanceToType(this.metadata, TransactionTypeMetadataMap)
      : 0;
  }

  getTxnTypeString(): string {
    return TransactionTypeToStringMap[this.getTxnType()];
  }
}

export const TransactionToMsgDeSoTxn = (txn: Transaction) => {
  const TxInputs = txn.inputs.map((input) => ({
    TxID: Array.from(input.id),
    Index: bufToUvarint64(input.id)[0],
  })) as DeSoInput[];
  const TxOutputs = txn.outputs.map((output) => ({
    PublicKey: publicKeyToBase58Check(output.publicKey),
    AmountNanos: output.amountNanos,
  })) as DeSoOutput[];
  txn.signature;
  return {
    TxInputs,
    TxOutputs,
    // TODO: need to make all the metadata match EXACTLY what
    // is coming from backend.
    TxnMeta: txn.metadata,
    PublicKey: publicKeyToBase58Check(txn.publicKey),
    ExtraData: (txn.extraData?.kvs || []).reduce((extraDataMap, kv) => {
      // TODO: special case extradata encoding
      extraDataMap[decodeBytesToUTF8(kv.key)] = decodeBytesToUTF8(kv.value);
      return extraDataMap;
    }, {} as { [k: string]: any }),
    // TODO: implement parsing of signature.
    Signature: null,
    TxnTypeJSON: txn.getTxnType(),
  } as MsgDeSoTxn;
};

export class TransactionV0 extends BinaryRecord {
  @Transcode(ArrayOf(TransactionInput))
  inputs: TransactionInput[] = [];

  @Transcode(ArrayOf(TransactionOutput))
  outputs: TransactionOutput[] = [];

  @Transcode(Enum(TransactionTypeMetadataMap))
  metadata: TransactionMetadataRecord | null = null;

  @Transcode(VarBuffer)
  publicKey: Uint8Array = new Uint8Array(0);

  @Transcode(Record(TransactionExtraData))
  extraData: TransactionExtraData | null = null;

  @Transcode(VarBuffer)
  signature: Uint8Array | null = null;
}
