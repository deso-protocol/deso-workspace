import { AuthorizeDerivedKeyParams, AuthorizeDerivedKeyRequest, AuthorizeDerivedKeyResponse, BlockPublicKeyRequest, BlockPublicKeyResponse, DeletePIIRequest, GetProfilesRequest, GetProfilesResponse, GetSingleProfileRequest, GetSingleProfileResponse, GetUserDerivedKeysRequest, GetUserDerivedKeysResponse, GetUserMetadataRequest, GetUserMetadataResponse, GetUsersResponse, GetUsersStatelessRequest } from 'deso-protocol-types';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
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
    authorizeDerivedKeyWithoutIdentity(request: Partial<AuthorizeDerivedKeyRequest>): Promise<AuthorizeDerivedKeyResponse>;
    authorizeDerivedKey(request: Partial<AuthorizeDerivedKeyParams>, broadcast: boolean): Promise<AuthorizeDerivedKeyResponse>;
}
