import axios from 'axios';
import {
  AuthorizeDerivedKeyParams,
  AuthorizeDerivedKeyRequest,
  AuthorizeDerivedKeyResponse,
  BlockPublicKeyRequest,
  BlockPublicKeyResponse,
  DeletePIIRequest,
  GetProfilesRequest,
  GetProfilesResponse,
  GetSingleProfileRequest,
  GetSingleProfileResponse,
  GetUserDerivedKeysRequest,
  GetUserDerivedKeysResponse,
  GetUserMetadataRequest,
  GetUserMetadataResponse,
  GetUsersResponse,
  GetUsersStatelessRequest,
} from 'deso-protocol-types';
import { throwErrors } from '../../utils/utils';
import { Identity } from '../identity/Identity';
import { Node } from '../Node/Node';
export class User {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async getUserStateless(
    request: Partial<GetUsersStatelessRequest>
  ): Promise<GetUsersResponse> {
    return (
      await axios.post(`${this.node.getUri()}/get-users-stateless`, request)
    ).data;
  }

  public getSingleProfilePicture(PublicKeyBase58Check: string) {
    return `${this.node.getUri()}/get-single-profile-picture/${PublicKeyBase58Check}`;
  }

  public async getSingleProfile(
    request: Partial<GetSingleProfileRequest>
  ): Promise<GetSingleProfileResponse> {
    const endpoint = 'get-single-profile';
    const response = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return response;
  }

  public async getProfiles(
    request: Partial<GetProfilesRequest>
  ): Promise<GetProfilesResponse> {
    const endpoint = 'get-profiles';
    const response = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return response;
  }

  public async getUserMetadata(
    request: Partial<GetUserMetadataRequest>
  ): Promise<GetUserMetadataResponse> {
    const endpoint = `get-user-metadata/${request.PublicKeyBase58Check}`;
    const response = (await axios.get(`${this.node.getUri()}/${endpoint}`))
      .data;
    return response;
  }

  public async deletePii(request: Partial<DeletePIIRequest>): Promise<boolean> {
    if (!request.PublicKeyBase58Check) {
      throw Error('PublicKeyBase58Check is undefined');
    }
    const endpoint = 'delete-pii';
    const JWT = await this.identity.getJwt();
    await axios.post(`${this.node.getUri()}/${endpoint}`, {
      ...request,
      JWT,
    });
    return true;
  }

  public async blockPublicKey(
    request: Partial<BlockPublicKeyRequest>
  ): Promise<BlockPublicKeyResponse> {
    if (!request.PublicKeyBase58Check) {
      throw Error('PublicKeyBase58Check is undefined');
    }
    if (!request.BlockPublicKeyBase58Check) {
      throw Error('BlockPublicKeyBase58Check is undefined');
    }
    const endpoint = 'block-public-key';
    const JWT = await this.identity.getJwt();
    return await axios.post(`${this.node.getUri()}/${endpoint}`, {
      ...request,
      JWT,
    });
  }

  public async getUserDerivedKeys(
    request: Partial<GetUserDerivedKeysRequest>
  ): Promise<GetUserDerivedKeysResponse> {
    if (!request.PublicKeyBase58Check) {
      throw Error('PublicKeyBase58Check is undefined');
    }
    const endpoint = 'get-user-derived-keys';
    const JWT = await this.identity.getJwt();
    return await axios.post(`${this.node.getUri()}/${endpoint}`, {
      ...request,
      JWT,
    });
  }

  public async authorizeDerivedKeyWithoutIdentity(
    request: Partial<AuthorizeDerivedKeyRequest>
  ): Promise<AuthorizeDerivedKeyResponse> {
    const endpoint = 'authorize-derived-key';
    const apiResponse: AuthorizeDerivedKeyResponse = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return apiResponse;
  }

  public async authorizeDerivedKey(
    request: Partial<AuthorizeDerivedKeyParams>,
    broadcast: boolean
  ): Promise<AuthorizeDerivedKeyResponse> {
    throwErrors(['MinFeeRateNanosPerKB'], request);
    const derivedPrivateUser = await this.identity.derive({
      publicKey: this.identity.getUserKey() || undefined,
      transactionSpendingLimitResponse:
        request.TransactionSpendingLimitResponse,
      derivedPublicKey: request.DerivedPublicKeyBase58Check,
    });
    const authorizeDerivedKeyRequest: Partial<AuthorizeDerivedKeyRequest> = {
      OwnerPublicKeyBase58Check: derivedPrivateUser.publicKeyBase58Check,
      DerivedPublicKeyBase58Check:
        derivedPrivateUser.derivedPublicKeyBase58Check,
      ExpirationBlock: derivedPrivateUser.expirationBlock,
      AccessSignature: derivedPrivateUser.accessSignature,
      DeleteKey: request.DeleteKey,
      ExtraData: request.ExtraData,
      TransactionSpendingLimitHex:
        derivedPrivateUser.transactionSpendingLimitHex,
      Memo: request.Memo,
      AppName: request.AppName,
      TransactionFees: request.TransactionFees,
      MinFeeRateNanosPerKB: request.MinFeeRateNanosPerKB,
    };

    const endpoint = 'authorize-derived-key';
    const apiResponse: AuthorizeDerivedKeyResponse = (
      await axios.post(
        `${this.node.getUri()}/${endpoint}`,
        authorizeDerivedKeyRequest
      )
    ).data;

    if (!broadcast) {
      return apiResponse;
    }

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex)
      .then(() => apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }
}
