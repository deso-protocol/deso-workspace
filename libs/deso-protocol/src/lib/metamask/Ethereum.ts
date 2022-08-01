import { ethers } from 'ethers';
import { Keccak } from 'sha3';
import * as bs58check from 'bs58check';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
import { Social } from '../social/Social';
import { Transactions } from '../transaction/Transaction';
import { User } from '../user/User';
import {
  Network,
  desoAddressToECKeyPair,
  PUBLIC_KEY_PREFIXES,
} from '../utils/Utils';
import { ec } from 'elliptic';

export class Ethereum {
  private identity: Identity;
  private social: Social;

  constructor(
    node: Node,
    identity: Identity,
    social: Social,
    user: User,
    transactions: Transactions
  ) {
    this.identity = identity;
    this.social = social;
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
    const encodedDesoKey = bs58check.encode(desoKey);
    return encodedDesoKey;
  }
}
