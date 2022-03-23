import axios from 'axios';
import {
  GetFullTikTokURLRequest,
  GetFullTikTokURLResponse,
  GetVideoStatusRequest,
  GetVideoStatusResponse,
  UploadImageRequest,
  UploadImageResponse,
} from 'deso-protocol-types';
import { Node } from '../node/Node';
import { Identity } from '../identity/Identity';

export class Media {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async uploadImage(
    request: Partial<UploadImageRequest>
  ): Promise<UploadImageResponse> {
    const endpoint = 'upload-image';
    const formData = new FormData();
    formData.append('file', request.file as Blob);
    formData.append(
      'UserPublicKeyBase58Check',
      request.UserPublicKeyBase58Check as string
    );
    formData.append('JWT', request.JWT as string);
    return await axios.post(`${this.node.getUri()}/${endpoint}`, request);
  }

  public async uploadVideo(
    request: Partial<UploadImageRequest>
  ): Promise<UploadImageResponse> {
    const endpoint = 'get-nfts-for-user';
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
