import axios from 'axios';
import {
  AuthorizeDerivedKeyParams,
  AuthorizeDerivedKeyRequest,
  AuthorizeDerivedKeyResponse,
  BlockPublicKeyRequest,
  BlockPublicKeyResponse,
  DeletePIIRequest,
  GetAllMessagingGroupKeysRequest,
  GetAllMessagingGroupKeysResponse,
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
  RegisterMessagingGroupKeyRequest,
  RegisterMessagingGroupKeyResponse,
  GetUserGlobalMetadataRequest,
  GetUserGlobalMetadataResponse,
  UpdateUserGlobalMetadataRequest,
  RequestOptions,
  DerivedPrivateUserInfo,
} from 'deso-protocol-types';
import { throwErrors } from '../../utils/Utils';
import {
  DeSoProtocolSubmitTransactionResponse,
  Identity,
} from '../identity/Identity';
import { Node } from '../Node/Node';
export class User {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  public async getUsernameForPublicKey(
    PublicKeyBase58Check: string
  ): Promise<any> {
    return (
      await axios.get(
        `${this.node.getUri()}/get-user-name-for-public-key/${PublicKeyBase58Check}`
      )
    ).data;
  }

  // remove this on next major release, currently kept for backwards compatibility
  public async getUserStateless(
    request: Partial<GetUsersStatelessRequest>
  ): Promise<GetUsersResponse> {
    return this.getUsersStateless(request);
  }
  public async getUsersStateless(
    request: Partial<GetUsersStatelessRequest>
  ): Promise<GetUsersResponse> {
    return (
      await axios.post(`${this.node.getUri()}/get-users-stateless`, request)
    ).data;
  }

  public getSingleProfilePicture(
    PublicKeyBase58Check: string,
    fallbackImageUrl?: string
  ) {
    return `${this.node.getUri()}/get-single-profile-picture/${PublicKeyBase58Check}${
      fallbackImageUrl ? `?fallback=${fallbackImageUrl}` : ''
    }`;
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

  public async getUserGlobalMetadata(
    request: Partial<GetUserGlobalMetadataRequest>
  ): Promise<GetUserGlobalMetadataResponse> {
    if (!request.UserPublicKeyBase58Check) {
      throw Error('UserPublicKeyBase58Check is undefined');
    }
    const endpoint = 'get-user-global-metadata';
    const JWT = await this.identity.getJwt();
    const response = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, {
        ...request,
        JWT,
      })
    ).data;
    return response;
  }

  public async updateUserGlobalMetadata(
    request: Partial<UpdateUserGlobalMetadataRequest>
  ): Promise<boolean> {
    if (!request.UserPublicKeyBase58Check) {
      throw Error('UserPublicKeyBase58Check is undefined');
    }
    const endpoint = 'update-user-global-metadata';
    const JWT = await this.identity.getJwt();

    await axios.post(`${this.node.getUri()}/${endpoint}`, {
      ...request,
      JWT,
    });
    return true;
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
    return (
      await axios.post(`${this.node.getUri()}/${endpoint}`, {
        ...request,
        JWT,
      })
    ).data;
  }

  public async getUserDerivedKeys(
    request: Partial<GetUserDerivedKeysRequest>
  ): Promise<GetUserDerivedKeysResponse> {
    if (!request.PublicKeyBase58Check) {
      throw Error('PublicKeyBase58Check is undefined');
    }
    const endpoint = 'get-user-derived-keys';
    const JWT = await this.identity.getJwt();
    return (
      await axios.post(`${this.node.getUri()}/${endpoint}`, {
        ...request,
        JWT,
      })
    ).data;
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
    options?: RequestOptions
  ): Promise<
    AuthorizeDerivedKeyResponse &
      DeSoProtocolSubmitTransactionResponse & {
        DerivedPrivateUserInfo: DerivedPrivateUserInfo;
      }
  > {
    throwErrors(['MinFeeRateNanosPerKB'], request);
    const derivedPrivateUser = await this.identity.derive({
      publicKey: this.identity.getUserKey() || undefined,
      transactionSpendingLimitResponse:
        request.TransactionSpendingLimitResponse,
      derivedPublicKey: request.DerivedPublicKeyBase58Check,
      deleteKey: request.DeleteKey || undefined,
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

    return await this.identity
      .submitTransaction(apiResponse.TransactionHex, options)
      .then((stRes) => ({ ...apiResponse, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async getAllMessagingGroupKeys(
    request: Partial<GetAllMessagingGroupKeysRequest>
  ): Promise<GetAllMessagingGroupKeysResponse> {
    const endpoint = 'get-all-messaging-group-keys';
    const apiResponse: any = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return apiResponse;
  }
  public async registerMessagingGroupKey(
    request: Partial<RegisterMessagingGroupKeyRequest>
  ): Promise<RegisterMessagingGroupKeyResponse> {
    const endpoint = 'register-messaging-group-key';
    const apiResponse: any = (
      await axios.post(`${this.node.getUri()}/${endpoint}`, request)
    ).data;
    return apiResponse;
  }
}
