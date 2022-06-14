import { Node } from '../Node/Node';
import * as sha256 from 'sha256';
import { Identity } from '../identity/Identity';
import { ec } from 'elliptic';
import { ethers } from 'ethers';
import {
  getSpendingLimitsForMetamask,
  PUBLIC_KEY_PREFIXES,
  uint64ToBufBigEndian,
  uvarint64ToBuf,
} from './Metamask.helper';
import * as bs58check from 'bs58check';
import {
  AuthorizeDerivedKeyRequest,
  AuthorizeDerivedKeyResponse,
  SubmitTransactionResponse,
} from 'deso-protocol-types';
import { Social } from '../social/Social';

import { User } from '../user/User';
import { Transactions } from '../transaction/Transaction';

export class Metamask {
  private node: Node;
  private BLOCK: Readonly<number> = 999999999999;
  private identity: Identity;
  private social: Social;
  private user: User;
  constructor(node: Node, identity: Identity, social: Social, user: User) {
    this.node = node;
    this.identity = identity;
    this.social = social;
    this.user = user;
  }

  public async getENS(address: string): Promise<string | null> {
    const provider = this.getProvider();
    const ens = await provider.lookupAddress(address);

    // if (ens) {
    //   await this.social.updateProfile({
    //     UpdaterPublicKeyBase58Check:
    //       'BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog',
    //     MinFeeRateNanosPerKB: 1000,
    //     NewUsername: ens,
    //   });
    // }
    return ens;
  }

  /**
   * Flow for new deso users looking to sign in with metamask
   */
  public async signInWithMetamaskNewUser() {
    // generate a random derived key
    const { derivedPublicKeyBase58Check, derivedKeyPair } =
      await this.generateDerivedKey();

    // fetch a spending limit hex string based off of the permissions you're allowing
    const spendingLimitHexString =
      await Transactions.getTransactionSpendingLimitHexString(
        getSpendingLimitsForMetamask()
      );
    //  we can now generate the message and sign it
    const { signature, message } = await this.generateMessageAndSignature(
      derivedKeyPair,
      spendingLimitHexString.HexString
    );
    // once we have the signature we can fetch the public key from it
    const publicDesoAddress =
      await this.getMetaMaskMasterPublicKeyFromSignature(signature, message);

    // we now have all the arguments to generate an authorize derived key transaction
    const response = await this.authorizeDerivedKeyBackEndRequest(
      publicDesoAddress,
      derivedPublicKeyBase58Check,
      signature,
      spendingLimitHexString
    );
    // convert it to a byte array, sign it, submit it
    this.signAndSubmitTransactionBytes(response.TransactionHex, derivedKeyPair);

    // const ens = await this.getENS('0xC99DF6B7A5130Dce61bA98614A2457DAA8d92d1c');
  }

  /**
   * @returns derivedPublicKeyBase58Check Base58 encoded derived public key
   * @returns derivedKeyPairKey pair object that handles the public private key logic for the derived key
   * Generates a new derived key
   */
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

  /**
   *
   * @param derivedKeyPair Key pair object that handles the public private key logic
   * @param spendingLimits determines what the derived key will be able to do for the user
   * @returns message: a byte array representation of the public key, expiration block for the derived key, and spending limits
   * @returns signature: the the signed message by the derivedKeyPair object
   * generates a spending limits message and signature for authorizing a derived key
   */
  private async generateMessageAndSignature(
    derivedKeyPair: ec.KeyPair,
    spendingLimits: string
  ): Promise<any> {
    const numBlocksBeforeExpiration = this.BLOCK;
    const message = [
      ...ethers.utils.toUtf8Bytes(
        derivedKeyPair.getPublic().encode('hex', true)
      ),
      ...ethers.utils.toUtf8Bytes(
        uint64ToBufBigEndian(numBlocksBeforeExpiration).toString('hex')
      ),
      ...ethers.utils.toUtf8Bytes(spendingLimits),
    ];
    const provider = this.getProvider();
    const signature = await provider.getSigner().signMessage(message);
    return { message, signature };
  }

  /**
   *
   * @param transactionHex transaction representation from the authorized derived key construction endpoint
   * @param keyPair
   * @returns a submit transaction response
   * submits the authorize derived key transaction, if successful the derived key will now be active.
   */
  private async signAndSubmitTransactionBytes(
    transactionHex: string,
    derivedKeyPair: ec.KeyPair
  ): Promise<SubmitTransactionResponse> {
    const transactionBytes = new Buffer(transactionHex, 'hex');
    const transactionHash = new Buffer(sha256.x2(transactionBytes), 'hex');
    const sig = derivedKeyPair.sign(transactionHash);
    const signatureBytes = new Buffer(sig.toDER());
    const signatureLength = uvarint64ToBuf(signatureBytes.length);

    const signedTransactionBytes = Buffer.concat([
      transactionBytes.slice(0, -1),
      signatureLength,
      signatureBytes,
    ]);

    const submissionResponse = await Transactions.submitTransaction(
      signedTransactionBytes.toString('hex')
    );
    return submissionResponse;
  }

  /**
   *
   * @param signature a signature from the metamask account that we can extract the public key from
   * @param message the raw message that's included in the signature, needed to pull out the public key
   * @returns
   * extracts the public key from a signature and then encodes it to base58 aka a deso public key
   */
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

  /**
   *
   * @param OwnerPublicKeyBase58Check the master public deso key
   * @param DerivedPublicKeyBase58Check the derived deso key
   * @param AccessSignature  signature including public key, block expiration, and spending limits hex
   * @param TransactionSpendingLimits spending limits object
   * @returns a constructed authorize derived key transaction that can now be signed by the derived key
   * construct a authorize derived key transaction
   */
  private async authorizeDerivedKeyBackEndRequest(
    OwnerPublicKeyBase58Check: string,
    DerivedPublicKeyBase58Check: string,
    AccessSignature: string,
    TransactionSpendingLimits: any
  ): Promise<AuthorizeDerivedKeyResponse> {
    const limits: Partial<AuthorizeDerivedKeyRequest> = {
      OwnerPublicKeyBase58Check,
      DerivedPublicKeyBase58Check,
      DerivedKeySignature: true,
      ExpirationBlock: this.BLOCK,
      MinFeeRateNanosPerKB: 1000,
      AccessSignature: AccessSignature.slice(2),
      TransactionSpendingLimitHex: TransactionSpendingLimits.HexString,
    };

    return this.user.authorizeDerivedKeyWithoutIdentity(limits, false);
  }

  private getProvider = (): ethers.providers.Web3Provider => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    return provider;
  };
}
