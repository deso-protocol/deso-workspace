import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import { getSpendingLimits, PUBLIC_KEY_PREFIXES } from './Metamask.helper';
import * as bs58check from 'bs58check';
import {
  AuthorizeDerivedKeyParams,
  AuthorizeDerivedKeyResponse,
} from 'deso-protocol-types';
import { Social } from '../social/Social';

import { User } from '../user/User';

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
    const publicDesoAddress =
      await this.getMetaMaskMasterPublicKeyFromSignature();
    const { derivedPublicKeyBase58Check, keyPair } =
      await this.generateDerivedKey();
    const response = await this.authorizeDerivedKeyBackEndRequest(
      publicDesoAddress,
      derivedPublicKeyBase58Check
    );
    const signedMessage = await this.generateMessage(
      derivedPublicKeyBase58Check,
      response.Transaction.TxnMeta.AccessSignature,
      keyPair
    );
    console.log(signedMessage);
    console.log({
      publicDesoAddress,
      derivedPublicKeyBase58Check,
      response,
    });
    // 2.1 sends funds to deso public address if the eth address has eth in it && the deso public address has not already received an airdrop
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
  async getMetaMaskMasterPublicKeyFromSignature(): Promise<string> {
    const e = new ec('secp256k1');
    const randomMessage =
      'You are about to generate a derived Key through metamask.';
    const arrayify = ethers.utils.arrayify;

    const signature = await this.signMessage(
      Uint8Array.from(ethers.utils.toUtf8Bytes(randomMessage))
    );
    const messageHash = arrayify(ethers.utils.hashMessage(randomMessage));
    const publicKeyUncompressedHexWith0x = ethers.utils.recoverPublicKey(
      messageHash,
      signature
    );
    const messagingPublicKey = e.keyFromPublic(
      publicKeyUncompressedHexWith0x.slice(2),
      'hex'
    );
    const prefix = PUBLIC_KEY_PREFIXES.mainnet.deso;
    const key = messagingPublicKey.getPublic().encode('array', true);
    const desoKey = Uint8Array.from([...prefix, ...key]);
    const encodedDesoKey = bs58check.encode(desoKey);
    return encodedDesoKey;
  }

  private async authorizeDerivedKeyBackEndRequest(
    OwnerPublicKeyBase58Check: string,
    DerivedPublicKeyBase58Check: string
  ): Promise<AuthorizeDerivedKeyResponse> {
    const limits: Partial<AuthorizeDerivedKeyParams> = {
      OwnerPublicKeyBase58Check,
      DerivedPublicKeyBase58Check,
      DerivedKeySignature: true,
      MinFeeRateNanosPerKB: 1000,
      TransactionSpendingLimitResponse: getSpendingLimits(),
    };
    console.log(limits);
    return this.user.authorizeDerivedKey(limits, false);
  }

  private async generateDerivedKey(): Promise<{
    derivedPublicKeyBase58Check: string;
    keyPair: ec.KeyPair;
  }> {
    const e = new ec('secp256k1');
    // 1.1 goal of this is to generate a random derived key
    const entropy = ethers.utils.randomBytes(16);
    const dMnemonic = ethers.utils.entropyToMnemonic(entropy);
    const dKeyChain = ethers.utils.HDNode.fromMnemonic(dMnemonic);
    // 1.2 turn it into a deso key
    const prefix = PUBLIC_KEY_PREFIXES.mainnet.deso;
    const keyPair = e.keyFromPrivate(dKeyChain.privateKey); // gives us the keypair
    const desoKey = keyPair.getPublic().encode('array', true);
    const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
    const derivedPublicKeyBase58Check = bs58check.encode(prefixAndKey);
    return { derivedPublicKeyBase58Check, keyPair };
  }

  private async generateMessage(
    derivedPublicKeyBase58Check: string,
    spendingLimitsSignature: string,
    keyPair: ec.KeyPair
  ): Promise<any> {
    // 0 configure helper objects
    //2. expiration block
    //3. spending limits
    //
    // AuthorizeDerivedKeyRequest ...
    //4. convert to a bytes for signing
    const numBlocksBeforeExpiration = '999999999999';
    const message = [
      ...ethers.utils.toUtf8Bytes(derivedPublicKeyBase58Check),
      ...ethers.utils.toUtf8Bytes(numBlocksBeforeExpiration),
      ...ethers.utils.toUtf8Bytes(spendingLimitsSignature),
    ];
    return keyPair.sign(message);
    // const signature = ethers.utils.toUtf8Bytes(message);
    // return { signature: await this.signMessage(signature), message };
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
