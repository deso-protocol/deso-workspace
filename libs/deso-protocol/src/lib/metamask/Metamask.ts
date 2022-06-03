import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { IdentityDeriveParams } from 'deso-protocol-types';
import { ethers } from 'ethers';

export class Metamask {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;

    this.promptLogin = this.promptLogin.bind(this);
  }

  public async promptLogin(): Promise<any> {
    console.log('in?');

    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum,
      'any'
    );

    // Prompt user for account connections
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("address", address);

    const payload: Partial<IdentityDeriveParams> = {};

    const message = 'message to sign';
    const signature = await signer.signMessage(message);

    // const pk = ethers.utils.recoverPublicKey(arrayify)
    let recoveredPublicKey = this.getMetaMaskMasterPublicKeyFromSignature(message, signature);

    // this.identity.derive();
  }

  getMetaMaskMasterPublicKeyFromSignature(message: string, signature: string): string {
    const arrayify = ethers.utils.arrayify
    const messageHash = arrayify(ethers.utils.hashMessage(message));
    // This will output the hex encoded uncompressed (65 bytes) public key with '0x' prefix.
    const publicKeyUncompressedHexWith0x = ethers.utils.recoverPublicKey(messageHash, signature);
    // Remove the '0x' prefix.
    // const publicKeyUncompressedHex = publicKeyUncompressedHexWith0x.slice(2);
    //
    // const publicKeyUncompressedBytes = new Buffer(publicKeyUncompressedHex, 'hex');
    // const ec = new EC('secp256k1');
    //
    // const publicKeyEC = ec.keyFromPublic(ecies.getPublic(publicKeyUncompressedBytes), 'array')
    return publicKeyUncompressedHexWith0x
  }

}
