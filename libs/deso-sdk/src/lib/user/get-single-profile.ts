import axios from 'axios';
import {
  GetSingleProfileRequest,
  GetSingleProfileResponse,
} from '@deso-workspace/deso-types';
import { BASE_URI } from '../state';
export const getSingleProfile = async (
  PublicKeyBase58Check: string
): Promise<{
  response: GetSingleProfileResponse;
  endpoint: string;
  request: Partial<GetSingleProfileRequest>;
}> => {
  const endpoint = 'get-single-profile';
  const request: Partial<GetSingleProfileRequest> = {
    PublicKeyBase58Check,
  };
  if (endpoint) {
    const response = (await axios.post(`${BASE_URI}/${endpoint}`, request))
      .data;
    return { response, endpoint, request };
  } else {
    throw new Error('need to add endpoint value');
  }
};
