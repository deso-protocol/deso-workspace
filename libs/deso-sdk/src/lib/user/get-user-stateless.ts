import axios from 'axios';
import {
  GetUsersResponse,
  GetUsersStatelessRequest,
} from '@deso-workspace/deso-types';
import { BASE_URI } from '../state';

export const getUserStateless = async (
  PublicKeysBase58Check: string[]
): Promise<GetUsersResponse> => {
  const userInfoRequest: Partial<GetUsersStatelessRequest> = {
    PublicKeysBase58Check,
    SkipForLeaderboard: false,
  };
  return (await axios.post(`${BASE_URI}/get-users-stateless`, userInfoRequest))
    .data;
};
