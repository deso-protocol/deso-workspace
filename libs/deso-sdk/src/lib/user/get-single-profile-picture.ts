import { BASE_URI } from '../state';

export const getSingleProfilePicture = (PublicKeyBase58Check: string) => {
  return `${BASE_URI}/get-single-profile-picture/${PublicKeyBase58Check}`;
};
