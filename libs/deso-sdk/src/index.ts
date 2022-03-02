import * as d from './lib/index';
import { BASE_URI } from './lib/state';
const { metaData, social, post, transaction, user, identity } = d;
const deso = {
  api: {
    metaData,
    post,
    social,
    transaction,
    user,
  },
  identity,
  node: {
    //   have this as default?
    uri: BASE_URI,
  },
};
export default deso;
