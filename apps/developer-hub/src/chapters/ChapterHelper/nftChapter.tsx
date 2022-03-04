import { Route } from 'react-router-dom';
import { CHAPTERS, TODOTemplate } from './Chapter.models';

import { ParentRoutes } from '../../services/utils';
export const nftChapter = {
  GET_NFTS_FOR_USER: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nfts For User',
    route: '/nft/get-nfts-for-user',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
  GET_NFT_BIDS_FOR_USER: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Bids For User',
    route: '/nft/get_nft_bids_for_user',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
  GET_NFT_BIDS_FOR_NFT_POST: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Bids For Nft Post',
    route: '/nft/get_nft_bids_for_nft_post',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
  GET_NFT_SHOWCASE: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Showcase',
    route: '/nft/get_nft_showcase',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
  GET_NEXT_NFT_SHOWCASE: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Next Nft Showcase',
    route: '/nft/get_next_nft_showcase',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
  GET_NFT_COLLECTION_SUMMARY: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Collection Summary',
    route: '/nft/get_nft_collection_summary',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
  GET_NFT_ENTRIES_FOR_POST_HASH: {
    parentRoute: ParentRoutes.nft,
    title: 'Get Nft Entries For Post Hash',
    route: '/nft/get-nft-entries-for-post-hash',
    githubSource: [],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<TODOTemplate selectedChapter={this} chapters={CHAPTERS} />}
        ></Route>
      );
    },
  },
};
