import {
  GetFollowsResponse,
  GetFollowsStatelessRequest,
} from '@deso-workspace/deso-types';
import axios from 'axios';
import { BASE_URI } from '../state';

export const getFollowsStateless = async (
  PublicKeyBase58Check: string
): Promise<{
  response: GetFollowsResponse;
  endpoint: string;
  request: Partial<GetFollowsStatelessRequest>;
}> => {
  const endpoint = 'get-follows-stateless';
  const request: Partial<GetFollowsStatelessRequest> = {
    PublicKeyBase58Check,
    GetEntriesFollowingUsername: true,
    NumToFetch: 10,
  };
  const response: GetFollowsResponse = (
    await axios.post(`${BASE_URI}/${endpoint}`, request)
  ).data;
  if (endpoint) {
    return { request, response, endpoint };
  } else {
    throw new Error('need to add endpoint value');
  }
};
