import axios from 'axios';
import {
  GetFullTikTokURLRequest,
  GetFullTikTokURLResponse,
  GetVideoStatusRequest,
  GetVideoStatusResponse,
  UploadImageRequest,
  UploadImageResponse,
} from 'deso-protocol-types';
import { Node } from '../Node/Node';
import { Identity } from '../identity/Identity';
import { resolve } from 'path';
import { throwErrors } from '../../utils/utils';
import * as tus from 'tus-js-client';
import { uploadVideo } from './Tus.config';
export class Media {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async uploadImage(
    request: Partial<UploadImageRequest>
  ): Promise<UploadImageResponse | void> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const nodeRef = this.node;
    const JWT = await this.identity.getJwt();
    if (document && !request.file) {
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

      return await waitForSelection.then(function (file) {
        if (file) {
          request.file = file as File;
          return uploadImageHelper(request, nodeRef, JWT);
        }
        return;
      });
    } else if (request.file) {
      return uploadImageHelper(request, nodeRef, JWT);
    }
    throwErrors(['UserPublicKeyBase58Check', 'file'], request);
  }

  private async uploadVideo(
    request: Partial<UploadImageRequest>
  ): Promise<UploadImageResponse> {
    // TODO
    const endpoint = '';
    // uploadVideo(`${this.node.getUri()}/${endpoint}`);
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getVideoStatus(
    request: Partial<GetVideoStatusRequest>
  ): Promise<GetVideoStatusResponse> {
    const endpoint = 'get-video-status';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async getFullTikTokUrl(
    request: Partial<GetFullTikTokURLRequest>
  ): Promise<GetFullTikTokURLResponse> {
    const endpoint = 'get-full-tik-tok-url';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }
}

const uploadImageHelper = async (
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
