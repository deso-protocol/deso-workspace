// import { rejects } from 'assert';
// import * as tus from 'tus-js-client';

export const uploadVideo = (path: string, file: File): void => {
  //   let mediaId;
  //   const onResponse = new Promise((resolve, reject) => {
  //     const options = {
  //       endpoint: path,
  //       chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
  //       uploadSize: file.size,
  //       onError: function (error) {
  //         throw new Error(error);
  //       },
  //       onProgress: function (bytesUploaded, bytesTotal) {
  //         //   comp.videoUploadPercentage = ((bytesUploaded / bytesTotal) * 100).toFixed(
  //         // 2
  //         //   );
  //       },
  //       onSuccess: function () {
  //         // Construct the url for the video based on the videoId and use the iframe url.
  //         const postVideoSrc = `https://iframe.videodelivery.net/${mediaId}`;
  //       },
  //       onAfterResponse: function (req, res) {
  //         // The stream-media-id header is the video Id in Cloudflare's system that we'll need to locate the video for streaming.
  //         const mediaIdHeader = res.getHeader('stream-media-id');
  //         let mediaId;
  //         if (mediaIdHeader) {
  //           mediaId = mediaIdHeader;
  //           resolve(mediaId as string);
  //         } else {
  //           reject(new Error('no media id'));
  //         }
  //       },
  //     };
  //   });
  //   return onResponse as Promise<string>;
};
