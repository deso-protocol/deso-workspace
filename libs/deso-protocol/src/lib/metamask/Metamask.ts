// import axios from 'axios';
// import * as bs58check from 'bs58check';
// import {
//   AuthorizeDerivedKeyRequest,
//   AuthorizeDerivedKeyResponse,
//   MetaMaskInitResponse,
//   SubmitTransactionResponse,
// } from 'deso-protocol-types';
// import { ec } from 'elliptic';
// import { ethers } from 'ethers';
// import * as sha256 from 'sha256';
// import { Identity } from '../identity/Identity';
// import { Node } from '../Node/Node';
// import { Social } from '../social/Social';
// import { Transactions } from '../transaction/Transaction';
// import { User } from '../user/User';
// import {
//   getSpendingLimitsForMetamask,
//   PUBLIC_KEY_PREFIXES,
//   uint64ToBufBigEndian,
//   uvarint64ToBuf,
// } from './Metamask.helper';

// export class Metamask {
//   private node: Node;
//   private BLOCK: Readonly<number> = 999999999999;
//   private identity: Identity;
//   private social: Social;
//   private user: User;
//   private transactions: Transactions;
//   constructor(
//     node: Node,
//     identity: Identity,
//     social: Social,
//     user: User,
//     transactions: Transactions
//   ) {
//     this.node = node;
//     this.identity = identity;
//     this.social = social;
//     this.user = user;
//     this.transactions = transactions;
//   }

//   public async getFundsForNewUsers(request: {
//     RecipientEthAddress: string;
//     RecipientPublicKey: string;
//     Signer: string;
//     Message: number[];
//     Signature: string;
//   }) {
//     const messageBytes = Array.from(new Uint8Array(request.Message));
//     const signatureBytes = Array.from(
//       ethers.utils.toUtf8Bytes(request.Signature)
//     );
//     const publicEthAddressToBytes = Array.from(
//       ethers.utils.toUtf8Bytes(request.Signer)
//     );
//     await axios.post(
//       `http://localhost:18001/api/v0/send-starter-deso-for-metamask-account`,
//       {
//         RecipientEthAddress: request.RecipientEthAddress,
//         RecipientPublicKey: request.RecipientPublicKey,
//         AmountNanos: 1000,
//         Signer: publicEthAddressToBytes,
//         signatureBytes: signatureBytes,
//         Message: messageBytes,
//       }
//     );
//   }

//   public async getENS(EthereumAddress: string): Promise<string | null> {
//     const provider = this.getProvider();
//     const ens = await provider.lookupAddress(EthereumAddress);

//     return ens;
//   }

//   public async populateProfile(EthereumAddress: string): Promise<void> {
//     const ens = await this.getENS(EthereumAddress);
//     if (ens) {
//       await this.social.updateProfile({
//         UpdaterPublicKeyBase58Check: EthereumAddress,
//         MinFeeRateNanosPerKB: 1000,
//         NewUsername: ens,
//       });
//     }
//   }

//   /**
//    * Flow for new deso users looking to sign in with metamask
//    */
//   public async signInWithMetamaskNewUser(): Promise<MetaMaskInitResponse> {
//     // generate a random derived key
//     const { derivedPublicKeyBase58Check, derivedKeyPair } =
//       await this.generateDerivedKey();

//     // fetch a spending limit hex string based off of the permissions you're allowing
//     const spendingLimitHexString =
//       await this.transactions.getTransactionSpendingLimitHexString(
//         getSpendingLimitsForMetamask()
//       );
//     //  we can now generate the message and sign it
//     const { signature, message } = await this.generateMessageAndSignature(
//       derivedKeyPair,
//       spendingLimitHexString.HexString
//     );
//     const publicEthAddress = await this.getProvider().getSigner().getAddress();
//     // once we have the signature we can fetch the public key from it
//     const publicDesoAddress =
//       await this.getMetaMaskMasterPublicKeyFromSignature(signature, message);
//     this.getFundsForNewUsers({
//       RecipientEthAddress: publicEthAddress,
//       Message: message,
//       Signature: signature,
//       Signer: publicEthAddress,
//       RecipientPublicKey: publicDesoAddress,
//     });

//     // we now have all the arguments to generate an authorize derived key transaction
//     const response = await this.authorizeDerivedKeyBackEndRequest(
//       publicDesoAddress,
//       derivedPublicKeyBase58Check,
//       signature,
//       spendingLimitHexString
//     );
//     // convert it to a byte array, sign it, submit it
//     const submissionResponse = await this.signAndSubmitTransactionBytes(
//       response.TransactionHex,
//       derivedKeyPair
//     );
//     const ethereumAddress: string = await this.getProvider()
//       .getSigner()
//       .getAddress();
//     return {
//       derivedKeyPair,
//       derivedPublicKeyBase58Check,
//       ethereumAddress,
//       submissionResponse,
//     };
//     // const ens = await this.getENS('0xC99DF6B7A5130Dce61bA98614A2457DAA8d92d1c');
//   }

//   /**
//    * @returns derivedPublicKeyBase58Check Base58 encoded derived public key
//    * @returns derivedKeyPairKey pair object that handles the public private key logic for the derived key
//    * Generates a new derived key
//    */
//   private async generateDerivedKey(): Promise<{
//     derivedPublicKeyBase58Check: string;
//     derivedKeyPair: ec.KeyPair;
//   }> {
//     const e = new ec('secp256k1');
//     const entropy = ethers.utils.randomBytes(16);
//     const dMnemonic = ethers.utils.entropyToMnemonic(entropy);
//     const dKeyChain = ethers.utils.HDNode.fromMnemonic(dMnemonic);
//     const prefix = PUBLIC_KEY_PREFIXES.testnet.deso;
//     const derivedKeyPair = e.keyFromPrivate(dKeyChain.privateKey); // gives us the keypair
//     const desoKey = derivedKeyPair.getPublic().encode('array', true);
//     const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
//     const derivedPublicKeyBase58Check = bs58check.encode(prefixAndKey);
//     return { derivedPublicKeyBase58Check, derivedKeyPair };
//   }

//   /**
//    *
//    * @param derivedKeyPair Key pair object that handles the public private key logic
//    * @param spendingLimits determines what the derived key will be able to do for the user
//    * @returns message: a byte array representation of the public key, expiration block for the derived key, and spending limits
//    * @returns signature: the the signed message by the derivedKeyPair object
//    * generates a spending limits message and signature for authorizing a derived key
//    */
//   private async generateMessageAndSignature(
//     derivedKeyPair: ec.KeyPair,
//     spendingLimits: string
//   ): Promise<{ message: number[]; signature: string }> {
//     const numBlocksBeforeExpiration = this.BLOCK;
//     const message = [
//       ...ethers.utils.toUtf8Bytes(
//         derivedKeyPair.getPublic().encode('hex', true)
//       ),
//       ...ethers.utils.toUtf8Bytes(
//         uint64ToBufBigEndian(numBlocksBeforeExpiration).toString('hex')
//       ),
//       ...ethers.utils.toUtf8Bytes(spendingLimits),
//     ];
//     const provider = this.getProvider();
//     await provider.send('eth_requestAccounts', []);
//     const signature = await provider.getSigner().signMessage(message);
//     return { message, signature };
//   }

//   /**
//    *
//    * @param transactionHex transaction representation from the authorized derived key construction endpoint
//    * @param keyPair
//    * @returns a submit transaction response
//    * submits the authorize derived key transaction, if successful the derived key will now be active.
//    */
//   private async signAndSubmitTransactionBytes(
//     transactionHex: string,
//     derivedKeyPair: ec.KeyPair
//   ): Promise<SubmitTransactionResponse> {
//     const transactionBytes = new Buffer(transactionHex, 'hex');
//     const transactionHash = new Buffer(sha256.x2(transactionBytes), 'hex');
//     const sig = derivedKeyPair.sign(transactionHash);
//     const signatureBytes = new Buffer(sig.toDER());
//     const signatureLength = uvarint64ToBuf(signatureBytes.length);

//     const signedTransactionBytes = Buffer.concat([
//       transactionBytes.slice(0, -1),
//       signatureLength,
//       signatureBytes,
//     ]);

//     const submissionResponse = await this.transactions.submitTransaction(
//       signedTransactionBytes.toString('hex')
//     );
//     return submissionResponse;
//   }

//   /**
//    *
//    * @param signature a signature from the metamask account that we can extract the public key from
//    * @param message the raw message that's included in the signature, needed to pull out the public key
//    * @returns
//    * extracts the public key from a signature and then encodes it to base58 aka a deso public key
//    */
//   public async getMetaMaskMasterPublicKeyFromSignature(
//     signature: string,
//     message: number[]
//   ): Promise<string> {
//     const e = new ec('secp256k1');
//     const arrayify = ethers.utils.arrayify;
//     const messageHash = arrayify(ethers.utils.hashMessage(message));
//     const publicKeyUncompressedHexWith0x = ethers.utils.recoverPublicKey(
//       messageHash,
//       signature
//     );

//     const messagingPublicKey = e.keyFromPublic(
//       publicKeyUncompressedHexWith0x.slice(2),
//       'hex'
//     );

//     const prefix = PUBLIC_KEY_PREFIXES.testnet.deso;
//     const key = messagingPublicKey.getPublic().encode('array', true);
//     const desoKey = Uint8Array.from([...prefix, ...key]);
//     const encodedDesoKey = bs58check.encode(desoKey);
//     return encodedDesoKey;
//   }

//   /**
//    *
//    * @param OwnerPublicKeyBase58Check the master public deso key
//    * @param DerivedPublicKeyBase58Check the derived deso key
//    * @param AccessSignature  signature including public key, block expiration, and spending limits hex
//    * @param TransactionSpendingLimits spending limits object
//    * @returns a constructed authorize derived key transaction that can now be signed by the derived key
//    * construct a authorize derived key transaction
//    */
//   private async authorizeDerivedKeyBackEndRequest(
//     OwnerPublicKeyBase58Check: string,
//     DerivedPublicKeyBase58Check: string,
//     AccessSignature: string,
//     TransactionSpendingLimits: any
//   ): Promise<AuthorizeDerivedKeyResponse> {
//     const limits: Partial<AuthorizeDerivedKeyRequest> = {
//       OwnerPublicKeyBase58Check,
//       DerivedPublicKeyBase58Check,
//       DerivedKeySignature: true,
//       ExpirationBlock: this.BLOCK,
//       MinFeeRateNanosPerKB: 1000,
//       AccessSignature: AccessSignature.slice(2),
//       TransactionSpendingLimitHex: TransactionSpendingLimits.HexString,
//     };

//     return this.user.authorizeDerivedKeyWithoutIdentity(limits);
//   }

//   private getProvider = (): ethers.providers.Web3Provider => {
//     const provider = new ethers.providers.Web3Provider(
//       (window as any).ethereum
//     );
//     return provider;
//   };
// }
