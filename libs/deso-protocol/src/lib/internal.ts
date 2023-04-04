import { api, cleanURL, getAppState } from '@deso-core/data';
import {
  bs58PublicKeyToCompressedBytes,
  encodeUTF8ToBytes,
  identity,
  publicKeyToBase58Check,
  sha256X2,
  Transaction,
  TransactionExtraData,
  TransactionExtraDataKV,
  TransactionMetadataRecord,
  TransactionNonce,
  TransactionOutput,
} from '@deso-core/identity';
import { bytesToHex } from '@noble/hashes/utils';
import { RequestOptions, TransactionFee } from 'deso-protocol-types';

////////////////////////////////////////////////////////////////////////////////
// This is all the stuff we don't export to consumers of the library. If
// anything here needs to be exported, it should be moved to another file.
////////////////////////////////////////////////////////////////////////////////

// This can be mutated by the user of the library via the configure function,
// but it's not exported explicitly. Whatever changes are made externally will
// be reflected in the library.
export const globalConfigOptions = {
  MinFeeRateNanosPerKB: 1500,
};

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

/**
 * Wraps signing and submit to include the configurable fee, and add defaults
 * for optional params.
 *
 * @param endpoint the endpoint for constructing the transaction
 * @param params tx specific params for the endpoint + optional fees and extra data
 */
export const handleSignAndSubmit = async (
  endpoint: string,
  params: OptionalFeesAndExtraData & any,
  // we always broadcast by default, but consumers can optionally disable it.
  // TODO: How to properly parameterize options.
  options: RequestOptions<any, any> = { broadcast: true }
) => {
  const constructedTransactionResponse = await (options.localConstruction &&
  options.constructionFunction
    ? options.constructionFunction(params)
    : api.post(
        options.nodeURI ? `${cleanURL(options.nodeURI, endpoint)}` : endpoint,
        {
          ...params,
          MinFeeRateNanosPerKB:
            params.MinFeeRateNanosPerKB ??
            globalConfigOptions.MinFeeRateNanosPerKB,
        }
      ));
  const submittedTransactionResponse = options.broadcast
    ? await identity.signAndSubmit(constructedTransactionResponse)
    : null;

  return {
    constructedTransactionResponse,
    submittedTransactionResponse,
  };
};

export type BalanceModelTransactionFields = {
  Outputs?: TransactionOutput[];
  ExtraData?: { [k: string]: string };
  ConsensusExtraDataKVs?: TransactionExtraDataKV[];
  MinFeeRateNanosPerKB?: number;
  TransactionFees?: TransactionFee[] | null;
};

export type ConstructedTransactionResponse = {
  Transaction: Transaction;
  FeeNanos: number;
  TransactionHex: string;
  TxnHashHex: string;
  TotalInputNanos: number;
  ChangeAmountNanos: number;
  SpendAmountNanos: number;
  TransactionIDBase58Check: string;
};

export const convertExtraData = (
  extraData?: { [k: string]: string },
  consensusExtraDataKVs?: TransactionExtraDataKV[]
): TransactionExtraData => {
  // TODO: encoding special consensus fields.
  const sortedExtraData = (consensusExtraDataKVs || [])
    .concat(
      Object.entries(extraData || {}).map(([k, v]) => {
        const newKV = new TransactionExtraDataKV();
        newKV.key = encodeUTF8ToBytes(k);
        newKV.value = encodeUTF8ToBytes(v);
        return newKV;
      })
    )
    .sort((a, b) => a.key.toString().localeCompare(b.key.toString()));
  const realExtraData = new TransactionExtraData();
  realExtraData.kvs = sortedExtraData;
  return realExtraData;
};

export const constructBalanceModelTx = async (
  pubKey: string,
  metadata: TransactionMetadataRecord,
  txFields?: BalanceModelTransactionFields
  // TODO: how do I make the input to ConstructedAndSubmittedTx generic?
): Promise<ConstructedTransactionResponse> => {
  // TODO: cache block height somewhere.
  const { BlockHeight } = await getAppState();
  const nonce = new TransactionNonce();
  // TODO: put in real block height buffer.
  nonce.expirationBlockHeight = BlockHeight + 1000;
  // TODO: cache used partial IDs? Replace with better logic
  // for generating random uint64
  nonce.partialId = Math.floor(Math.random() * 1e18);
  const transactionFeeOutputs = (txFields?.TransactionFees || []).map((tf) => {
    const newOutput = new TransactionOutput();
    newOutput.publicKey = bs58PublicKeyToCompressedBytes(
      tf.PublicKeyBase58Check
    );
    newOutput.amountNanos = tf.AmountNanos;
    return newOutput;
  });
  const transaction = new Transaction({
    version: 1,
    feeNanos: 0,
    nonce,
    metadata,
    outputs: transactionFeeOutputs.concat(txFields?.Outputs || []),
    inputs: [],
    extraData: convertExtraData(txFields?.ExtraData),
    publicKey: bs58PublicKeyToCompressedBytes(pubKey),
    signature: new Uint8Array(0),
  });

  const txnWithFee = computeFee(
    transaction,
    txFields?.MinFeeRateNanosPerKB || globalConfigOptions.MinFeeRateNanosPerKB
  );
  const txnBytes = txnWithFee.toBytes();
  const TransactionHex = bytesToHex(txnBytes);

  // TODO: maintain backward compatibility with everything returned in the constructed transaction
  // response object for each type. this will be a headache no doubt.
  const fees = txnWithFee.feeNanos;
  const outputSum = txnWithFee.outputs.reduce((a, b) => a + b.amountNanos, 0);
  // TODO: sum extra spend for creator coins, dao coin limit orders (ugh), create NFTs, create profile
  // NFT buys. Probably not necessarily, but would be best to ahve this.
  const txnHash = sha256X2(txnBytes);
  return {
    Transaction: txnWithFee,
    FeeNanos: fees,
    TransactionHex,
    ChangeAmountNanos: 0,
    TotalInputNanos: fees + outputSum,
    SpendAmountNanos: fees + outputSum,
    TransactionIDBase58Check: publicKeyToBase58Check(txnHash),
    TxnHashHex: bytesToHex(txnHash),
  };
};

export const computeFee = (txn: Transaction, feeRate: number): Transaction => {
  if (!feeRate) return txn;
  let prevFee = 0;
  let fee = 0;
  while (prevFee == 0 || prevFee != fee) {
    prevFee = fee;
    const size = computeTxSize(txn) + 71;
    fee = Math.ceil((size * feeRate) / 1000);
    txn.feeNanos = fee;
  }
  return txn;
};

export const computeTxSize = (txn: Transaction): number => {
  return txn.toBytes().length;
};

export const isMaybeDeSoPublicKey = (query: string): boolean => {
  return (
    (query.length === 55 && query.startsWith('BC')) ||
    (query.length === 54 && query.startsWith('tBC'))
  );
};
