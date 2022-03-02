import { identity } from '@deso-workspace/deso-sdk';
import axios from 'axios';
import { getSignerInfo, uuid } from '../../utils/utils';
import { BASE_URI } from '../state';
export interface CreateFollowTxnStatelessRequest {
  FollowerPublicKeyBase58Check: string;
  FollowedPublicKeyBase58Check: string;
  IsUnfollow: boolean;
  MinFeeRateNanosPerKB?: number;
}
export const CreateFollowTxnStateless = async (
  request: CreateFollowTxnStatelessRequest,
  user: any
) => {
  if (!request.FollowerPublicKeyBase58Check) {
    throw Error('FollowerPublicKeyBase58Check is undefined');
  }
  if (!request.FollowedPublicKeyBase58Check) {
    throw Error('FollowedPublicKeyBase58Check is undefined');
  }
  if ((request.IsUnfollow as any) instanceof Boolean) {
    throw Error('IsUnfollow is undefined');
  }
  request = { ...{ MinFeeRateNanosPerKB: 1000 }, ...request };
  const response = (
    await axios.post(`${BASE_URI}/create-follow-txn-stateless`, request)
  ).data;
  const payload = getSignerInfo(user, response);
  const requestToBeSigned = {
    id: uuid(),
    method: 'sign',
    payload,
    service: 'identity',
  };
  await identity.sign(requestToBeSigned, user).catch((e) => {
    throw Error('something went wrong with submitting the transaction');
  });
};
