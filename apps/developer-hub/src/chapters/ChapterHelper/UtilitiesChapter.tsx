import Deso from 'deso-protocol';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import { Page } from '../CustomChapters/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';
const deso = new Deso();
const getKeyPair = async () => {
  return await deso.utils.generateKey();
};
let keyPair = {};
getKeyPair().then((kp) => (keyPair = kp.keyPair));
export const utilitiesChapter = {
  GENERATE_DERIVED_KEY: {
    parentRoute: ParentRoutes.utilities,
    title: 'Generate Key',
    route: '/utilities/generate-key',
    method: deso.utils.generateKey,
    params: () => {
      return 'mainnet';
    },
    githubSource: [],
    documentation: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.wallet.generateKey()',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Generate a new key pair for Deso or Deso Testnet.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GENERATE_KEY_FROM_SOURCE: {
    parentRoute: ParentRoutes.utilities,
    title: 'Generate Key From Source',
    route: '/utilities/generate-key-from-source',
    method: deso.utils.generateKeyFromSource,
    params: () => {
      return {
        mnemonic:
          'this is some mnemonic which can generate a new or existing key',
      };
    },
    githubSource: [],
    documentation: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.wallet.generateKeyFromSource()',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Generate a key pair object from an existing source.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  SIGN_MESSAGE_LOCALLY: {
    parentRoute: ParentRoutes.utilities,
    title: 'Sign a message locally',
    route: '/utilities/sign-message-locally',
    method: deso.utils.signMessageLocally,
    params: () => {
      return {
        transactionHex: '323330303530353020',
        keyPair,
      };
    },
    githubSource: [],
    documentation: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.wallet.generateKeyFromSource()',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Sign any message with an existing key pair object.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
