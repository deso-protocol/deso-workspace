import { SendDeSoRequest, SendDeSoResponse, TransferCreatorCoinRequest, TransferCreatorCoinResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../node/Node';
export declare class Wallet {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    sendDesoRequest(request: Partial<SendDeSoRequest>): Promise<SendDeSoResponse>;
    buyOrSellCreatorCoin(request: Partial<SendDeSoRequest>): Promise<SendDeSoResponse>;
    transferCreatorCoin(request: Partial<TransferCreatorCoinRequest>): Promise<TransferCreatorCoinResponse>;
}
