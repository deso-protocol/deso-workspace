import {
  CreateFollowTxnStatelessRequest,
  GetDecryptMessagesResponse,
  GetFollowsResponse,
  GetFollowsStatelessRequest,
  GetMessagesResponse,
  GetMessagesStatelessRequest,
  LoginUser,
  MessageContactResponse,
  SendMessageStatelessRequest,
} from '@deso-workspace/deso-types';
import axios from 'axios';
import { Identity } from '../identity/Identity';
import Deso, { Node } from '../../index';

export class Social {
  node: Node;
  identity: Identity;
  constructor(node: Node, identity: Identity) {
    this.node = node;
    this.identity = identity;
  }
  // needs access
  public async sendMessage(request: Partial<SendMessageStatelessRequest>) {
    const response = (
      await axios.post(`${this.node.uri}/send-message-stateless`, request)
    ).data;
    if (response) {
      const TransactionHex = response.TransactionHex as string;
      this.identity.transaction.submit(TransactionHex, this.node.uri);
    }
  }

  // needs
  public async createFollowTxnStateless(
    request: CreateFollowTxnStatelessRequest,
    user: LoginUser
  ) {
    if (!request.FollowerPublicKeyBase58Check) {
      throw Error('FollowerPublicKeyBase58Check is undefined');
    }
    if (!request.FollowedPublicKeyBase58Check) {
      throw Error('FollowedPublicKeyBase58Check is undefined');
    }
    if ((request.IsUnfollow as any) instanceof Boolean) {
      throw Error('IsUnfollow is undefined');
    }
    request = { ...{ MinFeeRateNanosPerKB: 1000 }, ...request };
    const apiResponse = (
      await axios.post(`${this.node.uri}/create-follow-txn-stateless`, request)
    ).data;
    await this.identity.approve({ apiResponse });
    // const payload = getSignerInfo(user, response);
    // const requestToBeSigned = {
    //   id: uuid(),
    //   method: 'sign',
    //   payload,
    //   service: 'identity',
    // };
    // await this.identity.signAndSubmit(requestToBeSigned).catch((e) => {
    //   throw Error('something went wrong with submitting the transaction');
    // });
  }

  public async getFollowsStateless(PublicKeyBase58Check: string): Promise<{
    response: GetFollowsResponse;
    endpoint: string;
    request: Partial<GetFollowsStatelessRequest>;
  }> {
    const endpoint = 'get-follows-stateless';
    const request: Partial<GetFollowsStatelessRequest> = {
      PublicKeyBase58Check,
      GetEntriesFollowingUsername: true,
      NumToFetch: 10,
    };
    const response: GetFollowsResponse = (
      await axios.post(`${this.node.uri}/${endpoint}`, request)
    ).data;
    if (endpoint) {
      return { request, response, endpoint };
    } else {
      throw new Error('need to add endpoint value');
    }
  }

  public async getMessagesStateless(
    request: GetMessagesStatelessRequest,
    user: LoginUser
  ): Promise<GetDecryptMessagesResponse[]> {
    const response: GetMessagesResponse = (
      await axios.post(`${this.node.uri}/get-messages-stateless`, request)
    ).data;
    // temp any fix for compiler
    const encryptedMessages = (
      response.OrderedContactsWithMessages as MessageContactResponse[]
    )
      .map((thread) => {
        if (thread.Messages === null) {
          return [];
        }
        return thread.Messages.map((message) => ({
          EncryptedHex: message.EncryptedText,
          PublicKey: message.IsSender
            ? message.RecipientPublicKeyBase58Check
            : message.SenderPublicKeyBase58Check,
          IsSender: message.IsSender,
          Legacy: !message.V2 && (!message.Version || message.Version < 2),
          Version: message.Version,
          SenderMessagingPublicKey: message.SenderMessagingPublicKey,
          SenderMessagingGroupKeyName: message.SenderMessagingGroupKeyName,
          RecipientMessagingPublicKey: message.RecipientMessagingPublicKey,
          RecipientMessagingGroupKeyName:
            message.RecipientMessagingGroupKeyName,
        }));
      })
      .flat();
    const { encryptedSeedHex, accessLevel, accessLevelHmac } = user;
    // const approval = await this.identity({encryptedSeedHex});
    // const iFrameRequest = {
    //   id: uuid(),
    //   method: 'decrypt',
    //   payload: {
    //     accessLevel,
    //     accessLevelHmac,
    //     encryptedSeedHex,
    //     encryptedMessages,
    //   },
    //   service: 'identity',
    // };
    return [];
    // return decrypt(iFrameRequest);
  }
}

function decrypt(request: any): Promise<GetDecryptMessagesResponse[]> {
  if (!request?.payload?.encryptedMessages) {
    throw Error('Encrypted Messages are were not Included');
  }

  const iframe: HTMLIFrameElement | null = document.getElementById(
    'identity'
  ) as HTMLIFrameElement;
  if (iframe === null) {
    throw Error('Iframe with id identity does not exist');
  }
  iframe.contentWindow?.postMessage(request, '*');
  return new Promise((resolve) => {
    const windowHandler = (event: any) => {
      if (!event?.data?.payload?.decryptedHexes) {
        return;
      }
      const decryptedHexes = event?.data?.payload?.decryptedHexes;
      const messages = request.payload?.encryptedMessages;
      const thread = (messages as GetDecryptMessagesResponse[])?.map((m) => {
        const DecryptedMessage = decryptedHexes[m.EncryptedHex];
        return { ...m, DecryptedMessage };
      });
      resolve(thread);
    };
    window.addEventListener('message', windowHandler);
  });
}
