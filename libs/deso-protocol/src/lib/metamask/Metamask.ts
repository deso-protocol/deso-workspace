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

    // const message = await provider.send('eth_sign', [address, ethers.utils.arrayify('0x0000000000000e16e8b0331bedf6c9ca52d5c1ddd7143caf480dadcf7659e76e')]);
    // 0x52d29d3f07683754accff1d48584a6f7518b83b66e1b0a712471fe7745cb8bd24952a1b026420f8dbab3ad7a3a2607a35c56e618376eebe5064a1cab4d7ccff71b
    // this.identity.derive();
    console.log("signature", signature);
    console.log("message", message);
    console.log("recoveredPublicKey", recoveredPublicKey);
    console.log("recovered address", ethers.utils.computeAddress(recoveredPublicKey));
    console.log("address", address);
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
