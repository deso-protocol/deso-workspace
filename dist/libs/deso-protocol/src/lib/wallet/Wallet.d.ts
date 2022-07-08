import { RequestOptions, SendDeSoRequest, SendDeSoResponse, TransferCreatorCoinRequest, TransferCreatorCoinResponse } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
export declare class Wallet {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    sendDesoRequest(request: Partial<SendDeSoRequest>, options?: RequestOptions): Promise<SendDeSoResponse>;
    buyOrSellCreatorCoin(request: Partial<SendDeSoRequest>, options?: RequestOptions): Promise<SendDeSoResponse>;
    transferCreatorCoin(request: Partial<TransferCreatorCoinRequest>, options?: RequestOptions): Promise<TransferCreatorCoinResponse>;
}
