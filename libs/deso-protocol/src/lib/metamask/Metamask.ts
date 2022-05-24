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
    signer.getAddress();

    const payload: Partial<IdentityDeriveParams> = {};

    const message = await signer.signMessage('message to sign');

    // this.identity.derive();
    console.log(message);
  }
}
