import { Identity } from '../identity/Identity';
import { Node } from '../node/Node';
import { GetUsersResponse, GetUsersStatelessRequest, GetSingleProfileResponse, GetSingleProfileRequest, GetProfilesRequest, GetProfilesResponse, GetUserMetadataRequest, GetUserMetadataResponse, DeletePIIRequest, BlockPublicKeyRequest, GetUserDerivedKeysRequest, BlockPublicKeyResponse, GetUserDerivedKeysResponse } from 'deso-protocol-types';
export declare class User {
    private node;
    private identity;
    constructor(node: Node, identity: Identity);
    getUserStateless(request: Partial<GetUsersStatelessRequest>): Promise<GetUsersResponse>;
    getSingleProfilePicture(PublicKeyBase58Check: string): string;
    getSingleProfile(request: Partial<GetSingleProfileRequest>): Promise<GetSingleProfileResponse>;
    getProfiles(request: Partial<GetProfilesRequest>): Promise<GetProfilesResponse>;
    getUserMetadata(request: Partial<GetUserMetadataRequest>): Promise<GetUserMetadataResponse>;
    deletePii(request: Partial<DeletePIIRequest>): Promise<boolean>;
    blockPublicKey(request: Partial<BlockPublicKeyRequest>): Promise<BlockPublicKeyResponse>;
    getUserDerivedKeys(request: Partial<GetUserDerivedKeysRequest>): Promise<GetUserDerivedKeysResponse>;
}
