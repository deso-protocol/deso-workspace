import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { getSpendingLimits, PUBLIC_KEY_PREFIXES } from './Metamask.helper';
import * as bs58check from 'bs58check';
import {
  AuthorizeDerivedKeyParams,
  AuthorizeDerivedKeyRequest,
  AuthorizeDerivedKeyResponse,
} from 'deso-protocol-types';
import { Social } from '../social/Social';

import { User } from '../user/User';
import { Transactions } from '../transaction/Transaction';
const BLOCK: Readonly<number> = 999999999999;

export class Metamask {
  private node: Node;
  private identity: Identity;
  private social: Social;
  private user: User;
  constructor(node: Node, identity: Identity, social: Social, user: User) {
    this.node = node;
    this.identity = identity;
    this.social = social;
    this.user = user;
  }

  public async main() {
    const { derivedPublicKeyBase58Check, derivedKeyPair } =
      await this.generateDerivedKey();

    const { signature, message } = await this.generateMessage(
      derivedKeyPair.getPublic().encode('hex', true),
      getSpendingLimits()
    );

    const publicDesoAddress =
      await this.getMetaMaskMasterPublicKeyFromSignature(signature, message);

    const response = await this.authorizeDerivedKeyBackEndRequest(
      publicDesoAddress,
      derivedPublicKeyBase58Check,
      signature,
      getSpendingLimits()
    );

    const authorizedDerivedKeySignature = derivedKeyPair.sign(
      response.TransactionHex
    );

    const hexToSign = Buffer.from(
      authorizedDerivedKeySignature.toDER()
    ).toString('hex');

    // console.log(authorizedDerivedKeySignature.toDER('hex'));
    // console.log(hexToSign);
    // console.log(hexToSign);
    const submissionResponse = await Transactions.submitTransaction(hexToSign);
    // console.log(submissionResponse);
    // const ens = await this.getENS('0xC99DF6B7A5130Dce61bA98614A2457DAA8d92d1c');
    // if (ens) {
    //   await this.social.updateProfile({
    //     UpdaterPublicKeyBase58Check:
    //       'BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog',
    //     MinFeeRateNanosPerKB: 1000,
    //     NewUsername: ens,
    //   });
    // }
  }

  private async getMetaMaskMasterPublicKeyFromSignature(
    signature: string,
    message: string
  ): Promise<string> {
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
    const prefix = PUBLIC_KEY_PREFIXES.testnet.deso;
    const key = messagingPublicKey.getPublic().encode('array', true);
    const desoKey = Uint8Array.from([...prefix, ...key]);
    const encodedDesoKey = bs58check.encode(desoKey);
    return encodedDesoKey;
  }

  private async authorizeDerivedKeyBackEndRequest(
    OwnerPublicKeyBase58Check: string,
    DerivedPublicKeyBase58Check: string,
    AccessSignature: string,
    TransactionSpendingLimits: any
  ): Promise<AuthorizeDerivedKeyResponse> {
    const TransactionSpendingLimitHex = new Buffer(
      JSON.stringify(TransactionSpendingLimits)
    ).toString('hex');
    const limits: Partial<AuthorizeDerivedKeyRequest> = {
      OwnerPublicKeyBase58Check,
      DerivedPublicKeyBase58Check,
      DerivedKeySignature: true,
      ExpirationBlock: BLOCK,
      MinFeeRateNanosPerKB: 1000,
      AccessSignature: AccessSignature.slice(2),
      TransactionSpendingLimitHex,
    };
    return this.user.authorizeDerivedKeyWithoutIdentity(limits, false);
  }

  // private generateDkTemp() {
  //   const e = new ec('secp256k1');
  //   const derivedKeyPair = e.keyFromPrivate(
  //     '32abae6b92a979038402b15ec7dbb016538746d93d428378b699dc0636aa177d',
  //     'hex'
  //   );
  //   const prefix = PUBLIC_KEY_PREFIXES.testnet.deso;
  //   const desoKey = derivedKeyPair.getPublic().encode('array', true);
  //   const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
  //   const derivedPublicKeyBase58Check = bs58check.encode(prefixAndKey);
  //   return { derivedPublicKeyBase58Check, derivedKeyPair };
  // }

  private async generateDerivedKey(): Promise<{
    derivedPublicKeyBase58Check: string;
    derivedKeyPair: ec.KeyPair;
  }> {
    const e = new ec('secp256k1');
    // 1.1 goal of this is to generate a random derived key
    const entropy = ethers.utils.randomBytes(16);
    const dMnemonic = ethers.utils.entropyToMnemonic(entropy);
    const dKeyChain = ethers.utils.HDNode.fromMnemonic(dMnemonic);
    // 1.2 turn it into a deso key
    const prefix = PUBLIC_KEY_PREFIXES.testnet.deso;
    const derivedKeyPair = e.keyFromPrivate(dKeyChain.privateKey); // gives us the keypair
    const desoKey = derivedKeyPair.getPublic().encode('array', true);
    const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
    const derivedPublicKeyBase58Check = bs58check.encode(prefixAndKey);
    return { derivedPublicKeyBase58Check, derivedKeyPair };
  }

  private async generateMessage(
    derivedPublicKeyBase58Check: string,
    spendingLimits: any
  ): Promise<any> {
    console.log('=>', derivedPublicKeyBase58Check);
    const numBlocksBeforeExpiration = BLOCK;
    const spendingLimitHex = new Buffer(
      JSON.stringify(spendingLimits)
    ).toString('hex');
    const message = [
      ...ethers.utils.toUtf8Bytes(derivedPublicKeyBase58Check),
      ...ethers.utils.toUtf8Bytes(
        uint64ToBufBigEndian(numBlocksBeforeExpiration).toString('hex')
      ),
      ...ethers.utils.toUtf8Bytes(spendingLimitHex),
    ];
    const provider = this.getProvider();
    const signature = await provider.getSigner().signMessage(message);
    return { message, signature };
  }

  private async signMessage(message: Uint8Array) {
    const provider = this.getProvider();
    const signer = provider.getSigner();
    return await signer.signMessage(message);
  }

  public async getENS(address: string): Promise<string | null> {
    const provider = this.getProvider();
    const ens = await provider.lookupAddress(address);
    return ens;
  }

  private getProvider = (): ethers.providers.Web3Provider => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    return provider;
  };
}

export const uint64ToBufBigEndian = (uint: number): Buffer => {
  const result = [];
  while (BigInt(uint) >= BigInt(0xff)) {
    result.push(Number(BigInt(uint) & BigInt(0xff)));
    uint = Number(BigInt(uint) >> BigInt(8));
  }
  result.push(Number(BigInt(uint) | BigInt(0)));
  while (result.length < 8) {
    result.push(0);
  }
  return new Buffer(result.reverse());
};
