import { CoinEntry } from '@deso-workspace/deso-types';
import axios from 'axios';
import { BASE_URI } from '../state';

export const getFollowsStateless = async (
  PublicKeyBase58Check: string
): Promise<{
  response: FollowerInfoResponse;
  endpoint: string;
  request: FollowerInfoRequest;
}> => {
  const endpoint = 'get-follows-stateless';
  const request: FollowerInfoRequest = {
    PublicKeyBase58Check,
    GetEntriesFollowingUsername: true,
    NumToFetch: 10,
  };
  const response: FollowerInfoResponse = (
    await axios.post(`${BASE_URI}/${endpoint}`, request)
  ).data;
  if (endpoint) {
    return { request, response, endpoint };
  } else {
    throw new Error('need to add endpoint value');
  }
};

export interface FollowerInfoRequest {
  PublicKeyBase58Check?: string;
  Username?: string;
  GetEntriesFollowingUsername: boolean;
  LastPublicKeyBase58Check?: string;
  NumToFetch?: number;
}

export interface FollowerInfoResponse {
  PublicKeyToProfileEntry: {
    [SomeStringHash: string]: {
      PublicKeyBase58Check: string;
      Username: string;
      Description: string;
      IsHidden: boolean;
      IsReserved: boolean;
      IsVerified: boolean;
      Comments?: any;
      Posts?: any;
      CoinEntry: CoinEntry;
      DAOCoinEntry: CoinEntry;
      CoinPriceDeSoNanos: number;
      CoinPriceBitCloutNanos: number;
      UsersThatHODL?: any;
      IsFeaturedTutorialWellKnownCreator: boolean;
      IsFeaturedTutorialUpAndComingCreator: boolean;
    };
  };
  NumFollowers: number;
}
