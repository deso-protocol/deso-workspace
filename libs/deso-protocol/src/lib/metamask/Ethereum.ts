import { ethers } from 'ethers';
import { Keccak } from 'sha3';
import * as bs58check from 'bs58check';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import { Social } from '../social/Social';
import { Transactions } from '../transaction/Transaction';
import { publicKeyHexToDeSoPublicKey } from '../utils/Utils';
import { User } from '../user/User';
import {
  Network,
  desoAddressToECKeyPair,
  PUBLIC_KEY_PREFIXES,
} from '../utils/Utils';
import { ec } from 'elliptic';
import axios from 'axios';
import {
  InfuraResponse,
  InfuraTx,
  QueryETHRPCRequest,
} from 'deso-protocol-types';

export class Ethereum {
  private identity: Identity;
  private social: Social;
  private node: Node;

  constructor(
    node: Node,
    identity: Identity,
    social: Social,
    user: User,
    transactions: Transactions
  ) {
    this.identity = identity;
    this.social = social;
    this.node = node;
  }

  public async getENS(EthereumAddress: string): Promise<string | null> {
    const provider = this.getProvider();
    const checkSumAddress = ethers.utils.getAddress(EthereumAddress);
    const ens = await provider.lookupAddress(checkSumAddress);
    return ens;
  }

  private getProvider = (): ethers.providers.Web3Provider => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    return provider;
  };

  public async updateProfileUserNameToEns(): Promise<void> {
    const desoAddress = this.identity.getUserKey();
    if (!desoAddress) throw Error('unable to fetch public key');
    const ethereumAddress = this.desoAddressToEthereumAddress(desoAddress);
    const ens = await this.getENS(ethereumAddress);
    if (!ens) throw Error('unable to locate ENS');
    await this.social.updateProfile({
      UpdaterPublicKeyBase58Check: desoAddress,
      MinFeeRateNanosPerKB: 1000,
      NewUsername: ens,
    });
  }

  public desoAddressToEthereumAddress(key: string): string {
    if (!key) return '';
    const pub = desoAddressToECKeyPair(key);
    return this.publicKeyPairToEthAddress(pub);
  }

  public publicKeyPairToEthAddress = (keyPair: ec.KeyPair): string => {
    const uncompressedKey = Buffer.from(
      keyPair.getPublic(false, 'array').slice(1)
    );
    const ethAddress = new Keccak(256)
      .update(uncompressedKey)
      .digest('hex')
      .slice(24);

    // EIP-55 requires a checksum. Reference implementation: https://eips.ethereum.org/EIPS/eip-55
    const checksumHash = new Keccak(256).update(ethAddress).digest('hex');
    let ethAddressChecksum = '0x';

    for (let i = 0; i < ethAddress.length; i++) {
      if (parseInt(checksumHash[i], 16) >= 8) {
        ethAddressChecksum += ethAddress[i].toUpperCase();
      } else {
        ethAddressChecksum += ethAddress[i];
      }
    }

    return ethAddressChecksum;
  };

  public async getDesoAddressFromSignature({
    network = 'mainnet',
  }: {
    network: Network;
  }): Promise<string> {
    const message =
      'arbitrary message which is required in order to extract the deso public address';
    const provider = this.getProvider();
    provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const e = new ec('secp256k1');
    const arrayify = ethers.utils.arrayify;
    const messageHash = arrayify(ethers.utils.hashMessage(message));
    const publicKeyUncompressedHexWith0x = ethers.utils.recoverPublicKey(
      messageHash,
      signature
    );
    const messagingPublicKey = e.keyFromPublic(
      publicKeyUncompressedHexWith0x.slice(2),
      'hex'
    );
    const prefix = PUBLIC_KEY_PREFIXES[network].deso;
    const key = messagingPublicKey.getPublic().encode('array', true);
    const desoKey = Uint8Array.from([...prefix, ...key]);
    return bs58check.encode(desoKey);
  }

  public async ethAddressToDeSoPublicKey(
    ethAddress: string,
    network: Network = 'mainnet',
    ethereumNetwork: 'goerli' | 'homestead' | undefined = undefined
  ): Promise<string> {
    const txns = await this.getEtherscanTransactionsSignedByAddress(
      ethAddress,
      network,
      ethereumNetwork
    );
    if (txns.length === 0) {
      return Promise.reject(
        'an ETH address must sign at least one transaction in order to recover its public key'
      );
    }
    let recoveredETHPublicKey = '';
    let recoveredETHAddress = '';
    for (let ii = 0; ii < txns.length; ii++) {
      try {
        [recoveredETHPublicKey, recoveredETHAddress] =
          await this.recoverETHPublicKeyAndAddressFromTransaction(
            txns[ii].hash,
            network,
            ethereumNetwork
          );
        break;
      } catch (e) {
        console.error('error recovering public key from txn ', txns[ii].hash);
      }
    }
    if (!recoveredETHAddress || !recoveredETHPublicKey) {
      return Promise.reject('failed to recover public key from transactions');
    }
    if (recoveredETHAddress.toLowerCase() !== ethAddress.toLowerCase()) {
      return Promise.reject('recovered an incorrect public key');
    }
    return publicKeyHexToDeSoPublicKey(recoveredETHPublicKey.slice(2), network);
  }

  desoNetworkToETHNetwork(network: Network): 'goerli' | 'homestead' {
    // should really be Networkish from ethers.
    return network === 'testnet' ? 'goerli' : 'homestead';
  }

  async getTransactionByHash(
    transactionHashHex: string,
    ethereumNetwork?: 'goerli' | 'homestead'
  ): Promise<InfuraTx> {
    return this.QueryETHRPC({
      Method: 'eth_getTransactionByHash',
      Params: [transactionHashHex],
      UseNetwork: ethereumNetwork
        ? ethereumNetwork === 'homestead'
          ? 'mainnet'
          : 'goerli'
        : undefined,
    }).then((res) => res.result as InfuraTx);
  }

  public async recoverETHPublicKeyAndAddressFromTransaction(
    transactionHashHex: string,
    network: Network = 'mainnet',
    ethereumNetwork: 'goerli' | 'homestead' | undefined = undefined
  ): Promise<string[]> {
    const ethNet = ethereumNetwork ?? this.desoNetworkToETHNetwork(network);
    const txn = await this.getTransactionByHash(
      transactionHashHex,
      ethereumNetwork ?? this.desoNetworkToETHNetwork(network)
    );
    const expandedSig = {
      r: txn.r as string,
      s: txn.s as string,
      v: parseInt(txn.v, 16) as number,
    };

    const signature = ethers.utils.joinSignature(expandedSig);

    // Special thanks for this answer on ethereum.stackexchange.com: https://ethereum.stackexchange.com/a/126308
    let txnData: any;
    // TODO: figure out how to handle AccessList (type 1) transactions.
    switch (parseInt(txn.type, 16)) {
      case 0:
        txnData = {
          gasPrice: txn.gasPrice,
          gasLimit: txn.gas,
          value: txn.value,
          nonce: parseInt(txn.nonce, 16),
          data: txn.input,
          chainId: parseInt(
            txn.chainId || ethNet === 'goerli' ? '0x5' : '0x1',
            16
          ),
          to: txn.to,
        };
        break;
      case 2:
        txnData = {
          gasLimit: txn.gas,
          value: txn.value,
          nonce: parseInt(txn.nonce, 16),
          data: txn.input,
          chainId: parseInt(
            txn.chainId || ethNet === 'goerli' ? '0x5' : '0x1',
            16
          ),
          to: txn.to,
          type: 2,
          maxFeePerGas: txn.maxFeePerGas,
          maxPriorityFeePerGas: txn.maxPriorityFeePerGas,
        };
        break;
      default:
        throw new Error('Unsupported txn type');
    }
    const rstxn = await ethers.utils.resolveProperties(txnData);
    const raw = ethers.utils.serializeTransaction(rstxn as any); // returns RLP encoded transactionHash
    const msgHash = ethers.utils.keccak256(raw); // as specified by ECDSA
    const msgBytes = ethers.utils.arrayify(msgHash); // create binary hash
    const recoveredPubKey = ethers.utils.recoverPublicKey(msgBytes, signature);
    const recoveredAddress = ethers.utils.computeAddress(recoveredPubKey);
    if (recoveredAddress.toLowerCase() != txn.from.toLowerCase()) {
      return Promise.reject('recovered incorrect address');
    }
    return [recoveredPubKey, recoveredAddress];
  }

  async getEtherscanTransactionsSignedByAddress(
    ethAddress: string,
    network: Network = 'mainnet',
    ethereumNetwork: 'goerli' | 'homestead' | undefined = undefined
  ): Promise<EtherscanTransaction[]> {
    const allTransactions = await this.getETHTransactionsForETHAddress(
      ethAddress,
      network,
      ethereumNetwork
    );
    return allTransactions.filter(
      (txn) => txn.from.toLowerCase() === ethAddress.toLowerCase()
    );
  }

  public async QueryETHRPC(
    request: Partial<QueryETHRPCRequest>
  ): Promise<InfuraResponse> {
    return (await axios.post(`${this.node.getUri()}/query-eth-rpc`, request))
      .data;
  }

  async getETHTransactionsForETHAddress(
    ethAddress: string,
    network: Network = 'mainnet',
    ethereumNetwork: 'goerli' | 'homestead' | undefined = undefined
  ): Promise<EtherscanTransaction[]> {
    const isTestnet = ethereumNetwork
      ? ethereumNetwork === 'goerli'
      : network === 'testnet';
    const data = (
      await axios.get(
        `${this.node.getUri()}/get-eth-transactions-for-eth-address/${ethAddress}${
          ethereumNetwork
            ? `?eth_network=${isTestnet ? 'goerli' : 'mainnet'}`
            : ''
        }`
      )
    ).data;
    if (data.status !== '1' || !data.message.startsWith('OK')) {
      return Promise.reject('Error fetching transactions');
    }
    return data.result;
  }
}

interface EtherscanTransactionsByAddressResponse {
  status: string;
  message: string;
  result: EtherscanTransaction[];
}

interface EtherscanTransaction {
  blockNumber: string;
  timestamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}
