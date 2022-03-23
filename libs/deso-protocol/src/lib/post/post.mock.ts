import { SubmitPostRequest } from 'deso-protocol-types';

export const MOCK_POST_NULL_BODY: Readonly<Partial<SubmitPostRequest>> = {
  UpdaterPublicKeyBase58Check:
    'BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog',
  BodyObj: {
    Body: 'Checking out the developer hub',
    VideoURLs: [],
    ImageURLs: [],
  },
};
