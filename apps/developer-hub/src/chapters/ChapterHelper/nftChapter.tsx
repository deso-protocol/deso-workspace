import { Route } from 'react-router-dom';
import { CHAPTERS } from './Chapter.models';
import Deso from 'deso-protocol';
import {
  ParentRoutes,
  TYLER,
  DEZO_DOG,
  SAMPLE_POST,
} from '../../services/utils';
import {
  CreateNFTRequest,
  GetNFTBidsForNFTPostRequest,
  GetNFTBidsForUserRequest,
  GetNFTCollectionSummaryRequest,
  GetNFTEntriesForPostHashRequest,
  GetNFTsForUserRequest,
  GetNFTShowcaseRequest,
} from 'deso-protocol-types';
import Page from '../Read/Page';
import { PageSection } from './PageSections';
const deso = new Deso();

export const nftChapter = {
  GET_NFTS_FOR_USER: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nfts For User',
    route: '/nft/get-nfts-for-user',
    method: deso.nft.getNftsForUser,
    params: { UserPublicKeyBase58Check: TYLER } as GetNFTsForUserRequest,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/nft-endpoints#get-nfts-for-user',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: 'deso.nft.getNftsForUser(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get the nfts that belongs to an account.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_NFT_BIDS_FOR_USER: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Bids For User',
    route: '/nft/get-nft-bids-for-user',
    method: deso.nft.getNftBidsForUser,
    params: { UserPublicKeyBase58Check: DEZO_DOG } as GetNFTBidsForUserRequest,
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/nft-endpoints#get-nft-bids-for-user',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: 'deso.nft.getNftBidsForUser(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get active bids for a user.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_NFT_BIDS_FOR_NFT_POST: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Bids For Nft Post',
    route: '/nft/get-nft-bids-for-nft-post',
    githubSource: [],
    method: deso.nft.getNftBidsForNftPost,
    params: { PostHashHex: SAMPLE_POST } as GetNFTBidsForNFTPostRequest,
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/nft-endpoints#get-nft-bids-for-nft-post',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: 'deso.nft.getNftBidsForNftPost(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get all bids for all serial numbers of a given post</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_NFT_SHOWCASE: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Showcase',
    route: '/nft/get-nft-showcase',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/nft-endpoints#get-nft-showcase',
    ],
    method: deso.nft.getNftShowcase,
    params: { ReaderPublicKeyBase58Check: DEZO_DOG } as GetNFTShowcaseRequest,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: 'deso.nft.getNftShowcase(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get summaries of all NFTs included in the NFT showcase.
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
  GET_NEXT_NFT_SHOWCASE: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Next Nft Showcase',
    route: '/nft/get-next-nft-showcase',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/nft-endpoints#get-next-nft-showcase',
    ],
    method: deso.nft.getNextNftShowCase,
    params: { ReaderPublicKeyBase58Check: TYLER } as GetNFTShowcaseRequest,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: 'deso.nft.getNextNftShowCase(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get the time of the next NFT showcase drop.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_NFT_COLLECTION_SUMMARY: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Collection Summary',
    route: '/nft/get-nft-collection-summary',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/nft-endpoints#get-nft-collection-summary',
    ],
    method: deso.nft.getNftCollectionSummary,
    params: { PostHashHex: SAMPLE_POST } as GetNFTCollectionSummaryRequest,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: 'deso.nft.getNftCollectionSummary(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get information on a NFT collection.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_NFT_ENTRIES_FOR_POST_HASH: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Entries For Post Hash',
    route: '/nft/get-nft-entries-for-post-hash',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/nft-endpoints#get-nft-entries-for-post-hash',
    ],
    method: deso.nft.getNftEntriesForPostHash,
    params: { PostHashHex: SAMPLE_POST } as GetNFTEntriesForPostHashRequest,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              tabs={[]}
              method={{
                methodName: 'deso.nft.getNftEntriesForPostHash(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Gets an NFT entry response for each serial number of this NFT
                  post.
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

  // CREATE_NFT: {
  //   parentRoute: ParentRoutes.nft,
  //   title: 'Create Nft',
  //   route: '/nft/',
  //   githubSource: [],
  //   documentation: [
  //     'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/nft-transactions-api#create-nft',
  //   ],
  //   method: deso.nft.getNftEntriesForPostHash,
  //   params: {
  //     // UpdaterPublicKeyBase58Check: localStorage.getItem('login_key'),
  //     // NFTPostHashHex: '',
  //     // NumCopies: 1,
  //     // NFTRoyaltyToCreatorBasisPoints: 100,
  //     // NFTRoyaltyToCoinBasisPoints: 100,
  //     // HasUnlockable: '',
  //     // IsForSale: true,
  //     // MinBidAmountNanos: '' ,
  //     // IsBuyNow:''
  //     // BuyNowPriceNanos: ''
  //     // AdditionalDESORoyaltiesMap: {''},
  //     // AdditionalCoinRoyaltiesMap: {},
  //     // MinFeeRateNanosPerKB: 1000
  //   } as CreateNFTRequest,
  //   component: function () {
  //     return (
  //       <Route
  //         key={this.title}
  //         path={this.route}
  //         element={
  //           <Page
  //             tabs={[]}
  //             method={{
  //               methodName: 'deso.nft.getNftEntriesForPostHash(request)',
  //               params: this.params,
  //               method: this.method,
  //             }}
  //             pretext={PageSection(
  //               this.title,
  //               <div>
  //                 Gets an NFT entry response for each serial number of this NFT
  //                 post.
  //               </div>
  //             )}
  //             chapters={CHAPTERS}
  //             selectedChapter={this}
  //           />
  //         }
  //       ></Route>
  //     );
  //   },
  // },
};
