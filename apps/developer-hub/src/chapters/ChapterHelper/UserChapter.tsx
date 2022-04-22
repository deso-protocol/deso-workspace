import { Route } from 'react-router-dom';
import { CHAPTERS } from './Chapter.models';
import { Page } from '../Read/Page';
import { PageSection } from './PageSections';
import { DEZO_DOG, ParentRoutes, RUSSIA, TYLER } from '../../services/utils';
import Deso from 'deso-protocol';
import {
  GetSingleProfileRequest,
  GetUsersStatelessRequest,
  GetProfilesRequest,
  GetUserMetadataRequest,
  DeletePIIRequest,
  BlockPublicKeyRequest,
  AuthorizeDerivedKeyParams,
  CreatorCoinLimitOperationString,
  DAOCoinLimitOperationString,
  DAOCoinLimitOrderOperationTypeString,
  NFTLimitOperationString,
} from 'deso-protocol-types';
import { Nft } from 'libs/deso-protocol/src/lib/nft/Nft';
const deso = new Deso();
// deso.user.getSingleProfile;
// deso.user.getSingleProfilePicture;
export const userChapter = {
  GET_USERS_STATELESS: {
    parentRoute: ParentRoutes.user,
    title: 'Get Users Stateless',
    route: '/user/get-users-stateless',
    method: deso.user.getUserStateless,
    params: () => {
      return {
        PublicKeysBase58Check: [DEZO_DOG],
      } as GetUsersStatelessRequest;
    },
    documentation: [
      'https://docs.deso.org/backend/blockchain-data/api/user-endpoints#get-users-stateless',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.user.getUserStateless(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Will query information on an existing user or users.</div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_SINGLE_PROFILE: {
    parentRoute: ParentRoutes.user,
    title: 'Get Single Profile',
    route: '/get-single-profile',
    method: deso.user.getSingleProfile,
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
      } as GetSingleProfileRequest;
    },
    documentation: [
      'https://docs.deso.org/backend/blockchain-data/api/user-endpoints#get-single-profile',
    ],
    githubSource: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.getSingleProfile(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  As it sounds get-single-profile, fetches various data around a
                  single profile. This call is useful if you want common display
                  data for a user.{' '}
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
  GET_PROFILES: {
    parentRoute: ParentRoutes.user,
    title: 'Get Profiles',
    route: '/user/get-profiles',
    params: () => {
      return { PublicKeyBase58Check: DEZO_DOG } as GetProfilesRequest;
    },
    method: deso.user.getProfiles,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/user-endpoints#get-profiles',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.getProfiles(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get the profiles following a specific user.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  GET_SINGLE_PROFILE_PICTURE: {
    parentRoute: ParentRoutes.user,
    title: 'Get Single Profile Picture',
    route: '/user/get-single-profile-picture',
    params: () => DEZO_DOG,
    method: deso.user.getSingleProfilePicture,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/user-endpoints#get-single-profile-picture',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.getSingleProfilePicture(request)`,
                params: this.params,
                method: this.method,
                customResponse: () => (
                  <img
                    src={deso.user.getSingleProfilePicture(DEZO_DOG)}
                    alt="sample"
                  />
                ),
              }}
              pretext={PageSection(
                this.title,
                <div>Get the profile picture for a specific account.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  GET_USER_METADATA: {
    parentRoute: ParentRoutes.user,
    title: 'Get User Metadata',
    route: '/user/get-user-metadata',
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
        jwt: 'jwt',
      } as GetUserMetadataRequest;
    },
    method: deso.user.getUserMetadata,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/user-endpoints#get-user-metadata',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.getUserMetadata(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get metadata for a specific user.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  DELETE_PII: {
    parentRoute: ParentRoutes.user,
    title: 'Delete Pii',
    route: '/user/delete-pii',
    params: () => {
      return { PublicKeyBase58Check: DEZO_DOG } as DeletePIIRequest;
    },
    method: deso.user.deletePii,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/user-endpoints#delete-pii-personal-identifiable-information',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.deletePii(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Delete personal information such as email and phone number
                  from the account
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

  BLOCK_PUBLIC_KEY: {
    parentRoute: ParentRoutes.user,
    title: 'Block Public Key',
    route: '/user/block-public-key',
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
        BlockPublicKeyBase58Check: RUSSIA,
      } as BlockPublicKeyRequest;
    },
    method: deso.user.blockPublicKey,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/user-endpoints#block-public-key',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.blockPublicKey(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Block a specific account.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_USER_DERIVED_KEYS: {
    parentRoute: ParentRoutes.user,
    title: 'Get User Derived Keys',
    route: '/user/get-user-derived-keys',
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
      } as BlockPublicKeyRequest;
    },
    method: deso.user.getUserDerivedKeys,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/user-endpoints#get-user-derived-keys',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.getUserDerivedKeys(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get a map of derived public keys to metadata about that
                  derived key for a given master public key.
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
  AUTHORIZE_DERIVED_KEY: {
    parentRoute: ParentRoutes.user,
    title: 'Authorize Derived Key',
    route: '/user/authorize-derived-key',
    params: () => {
      const publicKey = deso.identity.getUserKey() || '';
      return {
        OwnerPublicKeyBase58Check: publicKey,
        DeleteKey: false,
        MinFeeRateNanosPerKB: 1000,
        TransactionSpendingLimitResponse: {
          GlobalDESOLimit: 100 * 1e9,
          TransactionCountLimitMap: {
            BASIC_TRANSFER: 10,
            SUBMIT_POST: 9810278,
            LIKE: 89178,
            CREATE_NFT: 10,
          },
          CreatorCoinOperationLimitMap: {
            'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s': {
              [CreatorCoinLimitOperationString.BUY]: 10,
            }
          },
          DAOCoinOperationLimitMap: {
            'BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s': {
              [DAOCoinLimitOperationString.TRANSFER]: 10,
            },
            [publicKey]: {
              [DAOCoinLimitOperationString.ANY]: 2,
              [DAOCoinLimitOperationString.MINT]: 5,
              [DAOCoinLimitOperationString.UPDATE_TRANSFER_RESTRICTION_STATUS]: 1,
              [DAOCoinLimitOperationString.DISABLE_MINTING]: 1,
              [DAOCoinLimitOperationString.BURN]: 21908,
              [DAOCoinLimitOperationString.TRANSFER]: 10,
            }
          },
          NFTOperationLimitMap: {
            "01855d9ca9c54d797e53df0954204ae7d744c98fe853bc846f5663459ac9cb7b": {
              0: {
                [NFTLimitOperationString.ACCEPT_BID]: 1,
                [NFTLimitOperationString.ACCEPT_TRANSFER]: 2,
                [NFTLimitOperationString.BID]: 190283,
                [NFTLimitOperationString.BURN]: 12,
                [NFTLimitOperationString.TRANSFER]: 1,
                [NFTLimitOperationString.UPDATE]: 190238,
                [NFTLimitOperationString.ANY]: 1,
              },
              1: {
                [NFTLimitOperationString.UPDATE]: 2
              }
            }
          },
          DAOCoinLimitOrderLimitMap: {
            "DESO": {
              BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: 10,
            },
            BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: {
              "DESO": 5,
            },
            [TYLER]: {
              BC1YLhtBTFXAsKZgoaoYNW8mWAJWdfQjycheAeYjaX46azVrnZfJ94s: 1092,
            }
          }
        },
        Memo: "deso developer hub derived key",
      } as Partial<AuthorizeDerivedKeyParams>;
    },
    method: deso.user.authorizeDerivedKey,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/derived-keys-transaction-api',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.authorizeDerivedKey(request, broadcast)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Authorize a derived key.
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
  DELETE_IDENTITIES: {
    parentRoute: ParentRoutes.user,
    title: 'Delete Identities',
    route: '/user/delete_identities',
    params: () => undefined,
    method: deso.user.getUserDerivedKeys,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/user-endpoints#delete-identities',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: `deso.user.getUserDerivedKeys(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get a map of derived public keys to metadata about that
                  derived key for a given master public key.
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
