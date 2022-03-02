import * as d from './lib/index';
import { BASE_URI } from './lib/state';
import { initialize } from '../src/lib/identity/initialize';
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
initialize();
export default deso;
