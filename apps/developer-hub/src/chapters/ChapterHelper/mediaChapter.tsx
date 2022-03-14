import Deso from 'deso-protocol';
import {
  GetFullTikTokURLRequest,
  GetVideoStatusRequest,
  UploadImageRequest,
  UploadVideoRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';

const deso = new Deso();
export const mediaChapter = {
  // UPLOAD_IMAGE: {
  //   parentRoute: ParentRoutes.media,
  //   title: 'Upload Image',
  //   route: '/media/upload-image',
  //   githubSource: [],
  //   documentation: [
  //     'https://docs.deso.org/for-developers/backend/blockchain-data/api/media-endpoints#upload-image',
  //   ],
  //   method: deso.media.uploadImage,
  //   params: {
  //     UserPublicKeyBase58Check: localStorage.getItem('login_key'),
  //     JWT: 'jwt',
  //   } as UploadImageRequest,
  //   component: function () {
  //     return (
  //       <Route
  //         key={this.title}
  //         path={this.route}
  //         element={
  //           <Page
  //             demo={true}
  //             method={{
  //               methodName: 'deso.media.uploadImage(request)',
  //               params: this.params,
  //               method: this.method,
  //             }}
  //             pretext={PageSection(
  //               this.title,
  //               <div>Get the nfts that belongs to an account.</div>
  //             )}
  //             chapters={CHAPTERS}
  //             selectedChapter={this}
  //           />
  //         }
  //       ></Route>
  //     );
  //   },
  // },
  // UPLOAD_VIDEO: {
  //   parentRoute: ParentRoutes.media,
  //   title: 'Upload Video',
  //   route: '/media/upload-video',
  //   githubSource: [],
  //   documentation: [
  //     'https://docs.deso.org/for-developers/backend/blockchain-data/api/media-endpoints#upload-video',
  //   ],
  //   method: deso.media.uploadVideo,
  //   params: {} as UploadVideoRequest,
  //   component: function () {
  //     return (
  //       <Route
  //         key={this.title}
  //         path={this.route}
  //         element={
  //           <Page
  //             demo={true}
  //             method={{
  //               methodName: 'deso.media.uploadVideo(request)',
  //               params: this.params,
  //               method: this.method,
  //             }}
  //             pretext={PageSection(
  //               this.title,
  //               <div>Get the nfts that belongs to an account.</div>
  //             )}
  //             chapters={CHAPTERS}
  //             selectedChapter={this}
  //           />
  //         }
  //       ></Route>
  //     );
  //   },
  // },
  // GET_VIDEO_STATUS: {
  //   parentRoute: ParentRoutes.media,
  //   title: 'Get Video Status',
  //   route: '/media/get-video-status',
  //   githubSource: [],
  //   method: deso.media.getVideoStatus,
  //   params: {} as GetVideoStatusRequest,
  //   documentation: [
  //     'https://docs.deso.org/for-developers/backend/blockchain-data/api/media-endpoints#get-video-status',
  //   ],
  //   component: function () {
  //     return (
  //       <Route
  //         key={this.title}
  //         path={this.route}
  //         element={
  //           <Page
  //             demo={true}
  //             method={{
  //               methodName: 'deso.media.getVideoStatus(request)',
  //               params: this.params,
  //               method: this.method,
  //             }}
  //             pretext={PageSection(
  //               this.title,
  //               <div>Get the nfts that belongs to an account.</div>
  //             )}
  //             chapters={CHAPTERS}
  //             selectedChapter={this}
  //           />
  //         }
  //       ></Route>
  //     );
  //   },
  // },
  // GET_FULL_TIKTOK_URL: {
  //   parentRoute: ParentRoutes.media,
  //   title: 'Get Full Tiktok Url',
  //   route: '/media/get-full-tiktok-url',
  //   githubSource: [],
  //   method: deso.media.getVideoStatus,
  //   params: {} as GetFullTikTokURLRequest,
  //   documentation: [
  //     'https://docs.deso.org/for-developers/backend/blockchain-data/api/media-endpoints#get-full-tiktok-url',
  //   ],
  //   component: function () {
  //     return (
  //       <Route
  //         key={this.title}
  //         path={this.route}
  //         element={
  //           <Page
  //             demo={true}
  //             method={{
  //               methodName: 'deso.media.getVideoStatus(request)',
  //               params: this.params,
  //               method: this.method,
  //             }}
  //             pretext={PageSection(
  //               this.title,
  //               <div>Get the nfts that belongs to an account.</div>
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
