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
import { throwErrors } from '../../utils/utils';
import {
  selectFile,
  uploadImageHelper,
  uploadVideoToCloudFlare,
} from './Media.Helper';
// import * as tus from 'tus-js-client';
// import { uploadVideo } from './Tus.config';
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
    const JWT = await this.identity.getJwt();
    if (document && !request.file) {
      const file = await selectFile();
      if (file) {
        request.file = file as File;
      }
    }
    throwErrors(['UserPublicKeyBase58Check', 'file'], request);
    if (request.file && request.file.type.startsWith('image/')) {
      return uploadImageHelper(request, this.node, JWT);
    }
  }

  public async uploadVideo(
    request: Partial<UploadImageRequest>
  ): Promise<string> {
    const endpoint = 'upload-video';
    const file: File = (await selectFile()) as File;
    return uploadVideoToCloudFlare(`${this.node.getUri()}/${endpoint}`, file);
  }

  public async getVideoStatus(
    request: Partial<GetVideoStatusRequest>
  ): Promise<GetVideoStatusResponse> {
    throwErrors(['videoId'], request);
    const endpoint = 'get-video-status';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  private async getFullTikTokUrl(
    request: Partial<GetFullTikTokURLRequest>
  ): Promise<GetFullTikTokURLResponse> {
    const endpoint = 'get-full-tik-tok-url';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }
}
