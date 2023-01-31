import axios from 'axios';
import {
  RequestOptions,
  AssociationTxnResponse,
  UserAssociationResponse,
  PostAssociationResponse,
  UserAssociationsResponse,
  PostAssociationsResponse,
  CreatePostAssociationRequest,
  CreateUserAssociationRequest,
  DeleteAssociationRequest,
  UserAssociationQuery,
  PostAssociationQuery,
  AssociationCountsResponse,
  AssociationsCountResponse,
} from 'deso-protocol-types';
import {
  DeSoProtocolSubmitTransactionResponse,
  Identity,
} from '../identity/Identity';
import { Node } from '../Node/Node';

enum AssociationRoute {
  POST = 'post-associations',
  USER = 'user-associations',
}

export class Association {
  private node: Node;
  private identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }

  private async executeAssociationTxn(
    operation: 'create' | 'delete',
    userOrPost: AssociationRoute,
    requestBody: Partial<
      | CreateUserAssociationRequest
      | CreatePostAssociationRequest
      | DeleteAssociationRequest
    >,
    options?: RequestOptions
  ): Promise<AssociationTxnResponse & DeSoProtocolSubmitTransactionResponse> {
    const response: AssociationTxnResponse = (
      await axios.post(
        `${this.node.getUri()}/${userOrPost}-associations/${operation}`,
        requestBody
      )
    ).data;

    return await this.identity
      .submitTransaction(response.TransactionHex, options)
      .then((stRes) => ({ ...response, ...stRes }))
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  public async CreateUserAssociation(
    request: Partial<CreateUserAssociationRequest>,
    options?: RequestOptions
  ): Promise<AssociationTxnResponse & DeSoProtocolSubmitTransactionResponse> {
    return this.executeAssociationTxn(
      'create',
      AssociationRoute.USER,
      request,
      options
    );
  }

  public async CreatePostAssociation(
    request: Partial<CreatePostAssociationRequest>,
    options?: RequestOptions
  ): Promise<AssociationTxnResponse & DeSoProtocolSubmitTransactionResponse> {
    return this.executeAssociationTxn(
      'create',
      AssociationRoute.POST,
      request,
      options
    );
  }

  public async DeleteUserAssociation(
    request: Partial<DeleteAssociationRequest>,
    options?: RequestOptions
  ): Promise<AssociationTxnResponse & DeSoProtocolSubmitTransactionResponse> {
    return this.executeAssociationTxn(
      'delete',
      AssociationRoute.USER,
      request,
      options
    );
  }

  public async DeletePostAssociation(
    request: Partial<DeleteAssociationRequest>,
    options?: RequestOptions
  ): Promise<AssociationTxnResponse & DeSoProtocolSubmitTransactionResponse> {
    return this.executeAssociationTxn(
      'delete',
      AssociationRoute.POST,
      request,
      options
    );
  }

  public async GetUserAssociationByID(
    AssociationID: string
  ): Promise<UserAssociationResponse> {
    return (
      await axios.get(
        `${this.node.getUri()}/${AssociationRoute.USER}/${AssociationID}`
      )
    ).data;
  }

  public async GetPostAssociationByID(
    AssociationID: string
  ): Promise<PostAssociationResponse> {
    return (
      await axios.get(
        `${this.node.getUri()}/${AssociationRoute.POST}/${AssociationID}`
      )
    ).data;
  }

  private async executeAssociationQuery<
    T extends
      | UserAssociationsResponse
      | PostAssociationsResponse
      | AssociationsCountResponse
      | AssociationCountsResponse
  >(
    request: Partial<UserAssociationQuery | PostAssociationQuery>,
    operation: 'query' | 'count' | 'counts',
    associationRoute: AssociationRoute
  ): Promise<T> {
    return (
      await axios.post(
        `${this.node.getUri()}/${associationRoute}/${operation}`,
        request
      )
    ).data;
  }

  public async GetUserAssociations(
    request: Partial<UserAssociationQuery>
  ): Promise<UserAssociationsResponse> {
    return this.executeAssociationQuery<UserAssociationsResponse>(
      request,
      'query',
      AssociationRoute.USER
    );
  }

  public async GetPostAssociations(
    request: Partial<PostAssociationQuery>
  ): Promise<PostAssociationsResponse> {
    return this.executeAssociationQuery<PostAssociationsResponse>(
      request,
      'query',
      AssociationRoute.POST
    );
  }

  public async CountUserAssociations(
    request: Partial<UserAssociationQuery>
  ): Promise<AssociationsCountResponse> {
    return this.executeAssociationQuery<AssociationsCountResponse>(
      request,
      'count',
      AssociationRoute.USER
    );
  }

  public async CountPostAssociations(
    request: Partial<PostAssociationQuery>
  ): Promise<AssociationsCountResponse> {
    return this.executeAssociationQuery<AssociationsCountResponse>(
      request,
      'count',
      AssociationRoute.POST
    );
  }

  public async CountUserAssociationsByValues(
    request: Partial<UserAssociationQuery>
  ): Promise<AssociationCountsResponse> {
    return this.executeAssociationQuery<AssociationCountsResponse>(
      request,
      'counts',
      AssociationRoute.USER
    );
  }

  public async CountPostAssociationsByValues(
    request: Partial<PostAssociationQuery>
  ): Promise<AssociationCountsResponse> {
    return this.executeAssociationQuery<AssociationCountsResponse>(
      request,
      'counts',
      AssociationRoute.POST
    );
  }
}
