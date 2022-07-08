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
    request: Partial<UploadImageRequest> = {}
  ): Promise<string> {
    const endpoint = 'upload-video';
    if (!request?.file) {
      const file: File = (await selectFile()) as File;
      request.file = file;
    }
    return uploadVideoToCloudFlare(
      `${this.node.getUri()}/${endpoint}`,
      request.file
    );
  }

  public async getVideoStatus(
    request: Partial<GetVideoStatusRequest>
  ): Promise<GetVideoStatusResponse> {
    throwErrors(['videoId'], request);
    const endpoint = 'get-video-status';
    return await axios.get(
      `${this.node.getUri()}/${endpoint}/${request.videoId}`
    );
  }

  public async getFullTikTokUrl(
    request: Partial<GetFullTikTokURLRequest>
  ): Promise<GetFullTikTokURLResponse> {
    const endpoint = 'get-full-tiktok-url';
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }
}
