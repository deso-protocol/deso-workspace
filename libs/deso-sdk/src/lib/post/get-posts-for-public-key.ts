import {
  GetPostsForPublicKeyRequest,
  GetPostsForPublicKeyResponse,
} from '@deso-workspace/deso-types';
import axios from 'axios';
import { BASE_URI } from '../state';

export const getPostsForPublicKey = async (
  ReaderPublicKeyBase58Check: string,
  Username: string
): Promise<GetPostsForPublicKeyResponse> => {
  const request: Partial<GetPostsForPublicKeyRequest> = {
    PublicKeyBase58Check: '',
    Username,
    ReaderPublicKeyBase58Check,
    NumToFetch: 10,
  };
  return (await axios.post(`${BASE_URI}/get-posts-for-public-key`, request))
    .data;
};
