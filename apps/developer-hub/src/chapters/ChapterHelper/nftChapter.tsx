import { Route } from 'react-router-dom';
import { CHAPTERS } from './Chapter.models';
import Deso from 'deso-protocol';
import {
  ParentRoutes,
  TYLER,
  DEZO_DOG,
  SAMPLE_POST,
  SAMPLE_NFT_POST,
} from '../../services/utils';
import {
  AcceptNFTBidRequest,
  AcceptNFTTransferRequest,
  BurnNFTRequest,
  CreateNFTBidRequest,
  CreateNFTRequest,
  GetNFTBidsForNFTPostRequest,
  GetNFTBidsForUserRequest,
  GetNFTCollectionSummaryRequest,
  GetNFTEntriesForPostHashRequest,
  GetNFTsForUserRequest,
  GetNFTShowcaseRequest,
  TransferNFTRequest,
  UpdateNFTRequest,
} from 'deso-protocol-types';
import Page from '../CustomChapters/Page';
import { PageSection } from './PageSections';
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });

export const nftChapter = {
  GET_NFTS_FOR_USER: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nfts For User',
    route: '/nft/get-nfts-for-user',
    method: deso.nft.getNftsForUser,
    params: () => {
      return {
        UserPublicKeyBase58Check:
          (localStorage.getItem('login_key') as string) || DEZO_DOG,
      } as GetNFTsForUserRequest;
    },
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
              demo={true}
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
    params: () => {
      return { UserPublicKeyBase58Check: DEZO_DOG } as GetNFTBidsForUserRequest;
    },
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
              demo={true}
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
    params: () => {
      return { PostHashHex: SAMPLE_POST } as GetNFTBidsForNFTPostRequest;
    },
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
              demo={true}
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
    params: () => {
      return { ReaderPublicKeyBase58Check: DEZO_DOG } as GetNFTShowcaseRequest;
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
    params: () => {
      return { ReaderPublicKeyBase58Check: TYLER } as GetNFTShowcaseRequest;
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
    params: () => {
      return { PostHashHex: SAMPLE_POST } as GetNFTCollectionSummaryRequest;
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
    params: () => {
      return { PostHashHex: SAMPLE_POST } as GetNFTEntriesForPostHashRequest;
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
                methodName: 'deso.nft.getNftEntriesForPostHash(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get an NFT entry response for each serial number of this NFT
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

  CREATE_NFT: {
    parentRoute: ParentRoutes.nft,
    title: 'Create Nft',
    route: '/nft/create-nft',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/nft-transactions-api#create-nft',
    ],
    method: deso.nft.createNft,
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: localStorage.getItem(
          'login_key'
        ) as string,
        NFTPostHashHex: SAMPLE_NFT_POST,
        NumCopies: 1,
        NFTRoyaltyToCreatorBasisPoints: 100,
        NFTRoyaltyToCoinBasisPoints: 100,
        HasUnlockable: false,
        IsForSale: false,
        MinFeeRateNanosPerKB: 1000,
      } as Partial<CreateNFTRequest>;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.nft.createNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Create an NFT.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  UPDATE_NFT: {
    parentRoute: ParentRoutes.nft,
    title: 'Update Nft',
    route: '/nft/update-nft',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/nft-transactions-api#update-nft',
    ],
    method: deso.nft.updateNft,
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: localStorage.getItem(
          'login_key'
        ) as string,
        NFTPostHashHex: SAMPLE_NFT_POST,
        SerialNumber: 1,
        IsForSale: true,
        MinBidAmountNanos: 100,
        MinFeeRateNanosPerKB: 1000,
      } as UpdateNFTRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.nft.updateNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Update an NFT.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  CREATE_NFT_BID: {
    parentRoute: ParentRoutes.nft,
    title: 'Create Nft Bid',
    route: '/nft/create-nft-bid',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/nft-transactions-api#create-nft-bid',
    ],
    method: deso.nft.createNftBid,
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: localStorage.getItem(
          'login_key'
        ) as string,
        NFTPostHashHex: SAMPLE_NFT_POST,
        SerialNumber: 1,
        BidAmountNanos: 100,
        MinFeeRateNanosPerKB: 1000,
      } as CreateNFTBidRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.nft.createNftBid(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Make a bid on an existing NFT.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  ACCEPT_NFT_BID: {
    parentRoute: ParentRoutes.nft,
    title: 'Accept Nft Bid',
    route: '/nft/accept-nft-bid',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/nft-transactions-api#accept-nft-bid',
    ],
    method: deso.nft.acceptNftBid,
    params: () => {
      return {
        UpdaterPublicKeyBase58Check: localStorage.getItem(
          'login_key'
        ) as string,
        BidderPublicKeyBase58Check: DEZO_DOG,
        NFTPostHashHex: SAMPLE_NFT_POST,
        SerialNumber: 1,
        BidAmountNanos: 100,
        MinFeeRateNanosPerKB: 1000,
      } as AcceptNFTBidRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.nft.acceptNftBid(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Accept an NFT bid.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  TRANSFER_NFT: {
    parentRoute: ParentRoutes.nft,
    title: 'Transfer Nft',
    route: '/nft/transfer-nft',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/nft-transactions-api#transfer-nft',
    ],
    method: deso.nft.transferNft,
    params: () => {
      return {
        SenderPublicKeyBase58Check: localStorage.getItem('login_key') as string,
        ReceiverPublicKeyBase58Check: TYLER,
        NFTPostHashHex: SAMPLE_NFT_POST,
        SerialNumber: 1,
        MinFeeRateNanosPerKB: 1000,
      } as TransferNFTRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.nft.transferNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Transfer an NFT.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  ACCEPT_NFT_TRANSFER: {
    parentRoute: ParentRoutes.nft,
    title: 'Accept Transfer Nft',
    route: '/nft/accept-nft-transfer',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/nft-transactions-api#accept-nft-transfer',
    ],
    method: deso.nft.acceptNftTransfer,
    params: () => {
      return {
        MinFeeRateNanosPerKB: 1000,
        NFTPostHashHex: SAMPLE_NFT_POST,
        SerialNumber: 1,
        UpdaterPublicKeyBase58Check: localStorage.getItem(
          'login_key'
        ) as string,
      } as AcceptNFTTransferRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.nft.acceptNftTransfer(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Accept a transfer NFT.</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  BURN_NFT: {
    parentRoute: ParentRoutes.nft,
    title: 'Burn Nft',
    route: '/nft/burn-nft',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/transactions/construct-transactions/nft-transactions-api#burn-nft',
    ],
    method: deso.nft.burnNft,
    params: () => {
      return {
        MinFeeRateNanosPerKB: 1000,
        NFTPostHashHex: SAMPLE_NFT_POST,
        SerialNumber: 1,
        UpdaterPublicKeyBase58Check: localStorage.getItem(
          'login_key'
        ) as string,
      } as BurnNFTRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.nft.burnNft(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(this.title, <div>Burn an NFT.</div>)}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
