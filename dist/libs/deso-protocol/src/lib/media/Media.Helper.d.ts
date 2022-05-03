import { Node } from '../Node/Node';
import { UploadImageRequest, UploadImageResponse } from 'deso-protocol-types';
export declare const uploadVideoToCloudFlare: (path: string, file: File, callbackOverrides?: {
    onProgress?: ((bytesUploaded: number, bytesTotal: number) => void) | undefined;
    onSuccess?: (() => void) | undefined;
    onAfterResponse?: ((req: any, res: any) => void) | undefined;
} | undefined) => Promise<string>;
export declare const selectFile: () => Promise<unknown>;
export declare const uploadImageHelper: (request: Partial<UploadImageRequest>, node: Node, JWT: string) => Promise<UploadImageResponse>;
