import { Route } from 'react-router-dom';
import { PageSection } from './PageSections';
import { DEZO_DOG, ParentRoutes } from '../../services/utils';
import { Ethereum } from '../CustomChapters/Ethereum';
import Page from '../CustomChapters/Page';
import { CHAPTERS } from './Chapter.models';
import Deso from 'deso-protocol';
import { ethers } from 'ethers';
const deso = new Deso();
const getKeyPair = async () => {
  return await deso.utils.generateKey();
};
let keyPair = {};
getKeyPair().then((kp) => (keyPair = kp.keyPair));
export const ethereumChapter = {
  // need to make core changes first
  // SET_USERNAME_TO_ENS: {
  //   parentRoute: ParentRoutes.ethereum,
  //   title: 'Set Username To ENS',
  //   route: '/ethereum/set-username-to-ens',
  //   githubSource: [],
  //   documentation: [],
  //   method: deso.ethereum.updateProfileUserNameToEns,
  //   params: () => {
  //     return;
  //   },
  //   component: function () {
  //     return (
  //       <Route
  //         key={this.title}
  //         path={this.route}
  //         element={<Ethereum chapters={CHAPTERS} selectedChapter={this} />}
  //       ></Route>
  //     );
  //   },
  // },

  GET_DESO_ADDRESS_FROM_ETH_SIGNATURE: {
    parentRoute: ParentRoutes.ethereum,
    title: 'Get Deso Address From eth Signature',
    route: '/ethereum/get-deso-address-from-signature',
    githubSource: [],
    documentation: [],
    method: deso.ethereum.getDesoAddressFromSignature,
    params: () => {
      return { network: 'mainnet' };
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              bind="ethereum"
              demo={true}
              method={{
                methodName: 'deso.metaData.getPublicKeyFromSignature(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Gets the deso address from an ethereum signature. A signature
                  is required because ethereum addresses are hashes, not
                  encodings of the public key, meaning we must first extract the
                  public key from a signature which then is converted to the
                  deso address.
                </div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  PUBLIC_KEY_TO_ETH_ADDRESS: {
    parentRoute: ParentRoutes.ethereum,
    title: 'Public Key To Eth Address',
    route: '/ethereum/set-username-to-ens',
    githubSource: [],
    documentation: [],

    method: deso.ethereum.publicKeyPairToEthAddress,
    params: () => {
      return keyPair;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.ethereum.publicKeyPairToEthAddress()',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Converts a public key pair object to an eth address.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  DESO_KEY_TO_ETHEREUM_KEY: {
    parentRoute: ParentRoutes.ethereum,
    title: 'Deso Key To Ethereum Key',
    route: '/ethereum/deso-key-to-ethereum-key',
    githubSource: [],
    documentation: [],

    method: deso.ethereum.desoAddressToEthereumAddress,
    params: () => {
      return DEZO_DOG;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              bind="ethereum"
              demo={true}
              method={{
                methodName: 'deso.ethereum.desoAddressToEthereumAddress()',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Converts a deso public address to a ethereum public address.
                </div>
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
