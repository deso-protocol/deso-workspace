import { GetFullTikTokURLRequest, GetFullTikTokURLResponse, GetVideoStatusRequest, GetVideoStatusResponse, UploadImageRequest, UploadImageResponse } from 'deso-protocol-types';
import { Node } from '../node/Node';
import { Identity } from '../identity/Identity';
export declare class Media {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    uploadImage(request: Partial<UploadImageRequest>): Promise<UploadImageResponse>;
    uploadVideo(request: Partial<UploadImageRequest>): Promise<UploadImageResponse>;
    getVideoStatus(request: Partial<GetVideoStatusRequest>): Promise<GetVideoStatusResponse>;
    getFullTikTokUrl(request: Partial<GetFullTikTokURLRequest>): Promise<GetFullTikTokURLResponse>;
}
