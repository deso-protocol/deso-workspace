import axios from 'axios';
import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import {
  GetReferralInfoForReferralHashRequest,
  GetReferralInfoForReferralHashResponse,
  GetReferralInfoForUserRequest,
  GetReferralInfoForUserResponse,
} from 'deso-protocol-types';
import { throwErrors } from '../../utils/Utils';
export class Referral {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async getReferralInfoForUser(
    request: Partial<GetReferralInfoForUserRequest>
  ): Promise<GetReferralInfoForUserResponse> {
    throwErrors(['PublicKeyBase58Check'], request);
    if (!request.JWT) {
      const JWT = await this.identity.getJwt();
      request.JWT = JWT;
    }
    const endpoint = 'get-referral-info-for-user';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getReferralInfoForReferralHash(
    request: Partial<GetReferralInfoForReferralHashRequest>
  ): Promise<GetReferralInfoForReferralHashResponse> {
    throwErrors(['ReferralHash'], request);
    const endpoint = 'get-referral-info-for-referral-hash';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }
}
