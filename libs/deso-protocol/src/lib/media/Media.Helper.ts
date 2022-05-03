import { Node } from '../Node/Node';
import axios from 'axios';
import { UploadImageRequest, UploadImageResponse } from 'deso-protocol-types';
import * as tus from 'tus-js-client';

export const uploadVideoToCloudFlare = (
  path: string,
  file: File
): Promise<string> => {
  if (!(file && file.type.startsWith('video/')))
    throw Error('invalid file or file type');

  let mediaId: string;
  const onResponse = new Promise((resolve, reject) => {
    const options = {
      endpoint: path,
      chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
      uploadSize: file.size,
      onError: function (error: any) {
        throw new Error(error);
      },
      onProgress: function (bytesUploaded: number, bytesTotal: number) {
        // const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      },

      onSuccess: function () {
        // Construct the url for the video based on the videoId and use the iframe url.
        if (!mediaId) reject('no media id');
        const postVideoSrc = `https://iframe.videodelivery.net/${mediaId}`;
        resolve(postVideoSrc);
      },
      onAfterResponse: function (req: any, res: any) {
        const mediaIdHeader = res.getHeader('stream-media-id');
        if (!mediaId && mediaIdHeader) {
          mediaId = mediaIdHeader;
        }
      },
    };
    new tus.Upload(file, options).start();
  });
  return onResponse as Promise<string>;
};

export const selectFile = (): Promise<unknown> => {
  const input = document.createElement('input');
  input.type = 'file';
  input.click();
  const waitForSelection = new Promise((resolve, reject) => {
    input.onchange = () => {
      input && input.files && input.files[0]
        ? resolve(input.files[0])
        : reject(new Error('No File selected'));
    };
  });
  return waitForSelection;
};

export const uploadImageHelper = async (
  request: Partial<UploadImageRequest>,
  node: Node,
  JWT: string
): Promise<UploadImageResponse> => {
  const endpoint = 'upload-image';
  const formData = new FormData();
  formData.append('file', request.file as File);
  formData.append(
    'UserPublicKeyBase58Check',
    request.UserPublicKeyBase58Check as string
  );
  formData.append('JWT', JWT);
  return await (
    await axios.post(`${node.getUri()}/${endpoint}`, formData)
  ).data;
};
