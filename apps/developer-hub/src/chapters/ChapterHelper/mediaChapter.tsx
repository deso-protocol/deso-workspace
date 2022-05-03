import Deso from 'deso-protocol';
import {
  GetFullTikTokURLRequest,
  GetVideoStatusRequest,
  UploadImageRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';

const deso = new Deso();
export const mediaChapter = {
  UPLOAD_IMAGE: {
    parentRoute: ParentRoutes.media,
    title: 'Upload Image',
    route: '/media/upload-image',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/media-endpoints#upload-image',
    ],
    method: deso.media.uploadImage,
    params: () => {
      return {
        UserPublicKeyBase58Check: deso.identity.getUserKey(),
      } as UploadImageRequest;
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
                methodName: 'deso.media.uploadImage(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Uploads an image to be included in a post and returns the URL
                  where the image is stored. This endpoint also handles the
                  resizing of the image.
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
  UPLOAD_VIDEO: {
    parentRoute: ParentRoutes.media,
    title: 'Upload Video',
    route: '/media/upload-video',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/media-endpoints#upload-video',
    ],
    method: deso.media.uploadVideo,
    params: () => {
      //
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
                methodName: 'deso.media.uploadVideo(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  UploadVideo creates a one-time tokenized URL that can be used
                  to upload larger video files using the tus protocol. The
                  client uses the Location header in the response from this
                  function to upload the file. The client uses the
                  Stream-Media-Id header in the response from cloudflare to
                  understand how to access the file for streaming.{' '}
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
  GET_VIDEO_STATUS: {
    parentRoute: ParentRoutes.media,
    title: 'Get Video Status',
    route: '/media/get-video-status',
    githubSource: [],
    method: deso.media.getVideoStatus,
    params: () => {
      return {
        videoId: '20b42475c2116fbaeba01573535cad89',
      } as GetVideoStatusRequest;
    },
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/media-endpoints#get-video-status',
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
                methodName: 'deso.media.getVideoStatus(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Get Video Status queries cloudflare's API to see if a video is
                  ready to be streamed. This is useful in showing a preview of
                  an uploaded video to an end-user when they are creating a
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
  GET_FULL_TIKTOK_URL: {
    parentRoute: ParentRoutes.media,
    title: 'Get Full Tiktok Url',
    route: '/media/get-full-tiktok-url',
    githubSource: [],
    method: deso.media.getFullTikTokUrl,
    params: () => {
      return { TikTokShortVideoID: 'ZTdbMKkFB' } as GetFullTikTokURLRequest;
    },
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/media-endpoints#get-full-tiktok-url',
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
                methodName: 'deso.media.getVideoStatus(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Given a short video ID of a TikTok, find the URL that can be
                  used to embed this video. The short URL users get when copying
                  a link to a TikTok from TikTok's mobile app isn't embeddable,
                  so this endpoint allows us to find the desktop version of the
                  URL from which we can construct an embeddable version of the
                  URL.
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
