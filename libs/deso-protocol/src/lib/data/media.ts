import {
  GetVideoStatusRequest,
  GetVideoStatusResponse,
  LinkPreviewResponse,
} from '../backend-types';
import { cleanURL, media } from './api';
////////////////////////////////////////////////////////////////////////////////
// Media: All of these endpoints are hitting a separate server dedicated to
// handling media requests (images, videos, etc.). The media server is
// independently configurable and does not receive any of the same same request
// options as a node.
////////////////////////////////////////////////////////////////////////////////

/**
 * https://docs.deso.org/deso-backend/api/media-endpoints#get-video-status
 */
export const getVideoStatus = (
  params: GetVideoStatusRequest
): Promise<GetVideoStatusResponse> => {
  return media.get(`api/v0/get-video-status/${params.videoId}`);
};

export const getLinkPreview = (url: string): Promise<LinkPreviewResponse> => {
  return media.get(`api/v0/link-preview?url=${encodeURIComponent(url)}`);
};

export const buildProxyImageURL = (imageURL: string): string => {
  return cleanURL(
    media.mediaURI,
    `api/v0/proxy-image?url=${encodeURIComponent(imageURL)}`
  );
};

/**
 * @param videoId this corresponds to the assetId returned from the uploadVideo endpoint
 * @param options.duration optional duration in milliseconds to poll for video ready status
 * @param options.timeout optional timeout in milliseconds before we stop polling for video ready status
 */
export const pollForVideoReady = async (
  videoId: string,
  {
    duration = 300,
    timeout = 3e5, // 5 minutes
  } = {}
): Promise<void> => {
  const { status } = await getVideoStatus({ videoId });

  if (status.phase === 'ready') {
    return;
  }

  if (status.phase === 'failed') {
    throw new Error('There was an error processing the video upload.');
  }

  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      getVideoStatus({ videoId })
        .then(({ status }) => {
          switch (status.phase) {
            case 'ready':
              clearTimeout(intervalId);
              resolve();
              return;
            case 'failed':
              clearTimeout(intervalId);
              reject(
                new Error('there was an error processing the video upload.')
              );
              return;
          }

          if (Date.now() - startTime > timeout) {
            clearTimeout(intervalId);
            reject(new Error('timed out waiting for video to be ready'));
            return;
          }
        })
        .catch(reject);
    }, duration);
  });
};
