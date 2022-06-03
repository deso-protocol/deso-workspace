import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { ec } from 'elliptic';
// import { IdentityDeriveParams } from 'deso-protocol-types';
import { ethers } from 'ethers';
import { getSpendingLimits, PUBLIC_KEY_PREFIXES } from './Metamask.helper';
import { IdentityDeriveParams } from 'deso-protocol-types';
// import * as bs58check from 'bs58check';
export class Metamask {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
  public async signMessage(message: Uint8Array[]) {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    signer.signMessage;
    provider.send('personal_sign', [message]);
  }

  public async generateSignature(): Promise<void> {
    // 0 configure helper objects
    const e = new ec('secp256k1');
    // 1.1 goal of this is to generate a random derived key
    const entropy = ethers.utils.randomBytes(16);
    const dMnemonic = ethers.utils.entropyToMnemonic(entropy);
    const dKeyChain = ethers.utils.HDNode.fromMnemonic(dMnemonic);

    console.log('step 1.1', { entropy, dMnemonic, dKeyChain });

    // 1.2 turn it into a deso key
    const prefix = PUBLIC_KEY_PREFIXES.mainnet.deso;
    const path = dKeyChain.derivePath("m/44'/0'/0'/0/0");
    const ecKey = e.keyFromPrivate(path.privateKey); // gives us the keypair
    console.log({ path, dKeyChain });
    const desoKey = ecKey.getPublic().encode('array', true);

    const prefixAndKey = Uint8Array.from([...prefix, ...desoKey]);
    console.log({ prefixAndKey });
    const derivedPublicKeyBase58Check =
      ethers.utils.base58.encode(prefixAndKey);
    // const response = bs58check.encode(Buffer.from(prefixAndKey));
    console.log('step 1.1.1', {
      // response,
      prefix,
      desoKey,
      prefixAndKey,
      derivedPublicKeyBase58Check,
    });

    //2. expiration block
    const numDaysBeforeExpiration = 10000;
    const numBlocksBeforeExpiration = (numDaysBeforeExpiration * 24 * 60) / 5;
    console.log('step 1.2', numDaysBeforeExpiration, numBlocksBeforeExpiration);
    //3. spending limits
    console.log(derivedPublicKeyBase58Check);
    const limits: Partial<IdentityDeriveParams> = getSpendingLimits(
      derivedPublicKeyBase58Check
    );
    console.log('step 1.3', 'todo');
    // const deriveSig = await this.identity.derive(limits);
    const deriveSig = 'todo';
    // console.log(limitsSignature);
    const message = [
      ethers.utils.toUtf8Bytes(derivedPublicKeyBase58Check), //deso public key
      ethers.utils.toUtf8Bytes(numBlocksBeforeExpiration + ''), //expiration
      ethers.utils.toUtf8Bytes(deriveSig),
    ];
    //4. create signature Byte[key, block, limit ]
    // console.log({
    //   derivedPublicKeyBase58Check,
    //   numBlocksBeforeExpiration,
    //   limitsSignature,
    // });
  }
}
