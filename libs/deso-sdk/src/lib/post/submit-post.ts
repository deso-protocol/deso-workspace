import axios from 'axios';
import * as identity from '../identity';
import { BASE_URI } from '../state/BaseUri';
import { getSignerInfo, uuid } from '../../utils/utils';

export const submitPost = async (
  publicKey: string,
  user: any,
  body: string,
  postExtraData?: any,
  ParentStakeID?: string,
  imageURL?: string[]
): Promise<{ response: any; data: any } | undefined> => {
  if (!publicKey) {
    console.log('publicKey is required');
    return;
  }

  if (!body) {
    console.log('body is required');
    return;
  }

  // 1. verify they have a key and body everything else is optional
  const data = {
    UpdaterPublicKeyBase58Check: publicKey,
    PostHashHexToModify: '',
    ParentStakeID: ParentStakeID,
    Title: '',
    BodyObj: { Body: body, ImageURLs: imageURL },
    RecloutedPostHashHex: '',
    PostExtraData: postExtraData,
    Sub: '',
    IsHidden: false,
    MinFeeRateNanosPerKB: 2000,
  };
  // 2. Inform the blockchain that a post is on its way
  const response: any = (await axios.post(`${BASE_URI}/submit-post`, data))
    .data;
  // 3. get some info for signing a transaction
  const payload = getSignerInfo(user, response);

  const request = {
    id: uuid(),
    method: 'sign',
    payload,
    service: 'identity',
  };
  return identity.sign(request, data);
};
