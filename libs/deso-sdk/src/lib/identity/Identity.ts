import {
  GetApproveResponse,
  IdentityApproveResponse,
  IdentityLoginResponse,
  LoginUser,
} from '@deso-workspace/deso-types';
import { Transaction } from '../transaction/Transaction';
import { Node } from '../../index';
import { getSignerInfo, uuid } from '../../utils/utils';
export class Identity {
  node: Node;
  transaction: Transaction;
  constructor(transaction: Transaction, node: Node) {
    this.node = node;
    this.transaction = transaction;
  }
  public getUser(): LoginUser {
    const user = localStorage.getItem('loginUser');
    if (user) {
      return JSON.parse(user);
    }
    throw Error('User is not logged in');
  }
  private approveAndSubmit(
    transactionHex: string
  ): Promise<IdentityApproveResponse> {
    const prompt = window.open(
      `https://identity.deso.org/approve?tx=${transactionHex}`,
      null as unknown as any,
      'toolbar=no, width=800, height=1000, top=0, left=0'
    );
    this.setIdentityFrame();
    return new Promise((resolve, reject) => {
      const windowHandler = ({ data }: { data: IdentityApproveResponse }) => {
        const signedTransaction = data?.payload?.signedTransactionHex;
        if (signedTransaction) {
          return this.handleSubmit(
            signedTransaction,
            windowHandler,
            resolve,
            reject
          ).finally(() => {
            prompt?.close();
            window.removeEventListener('message', windowHandler);
          });
        }
        return;
      };
      window.addEventListener('message', windowHandler);
    });
  }

  public initialize(): Promise<any> {
    return new Promise((resolve) => {
      const windowHandler = (event: any) => {
        if (event.origin !== 'https://identity.deso.org') {
          return;
        }
        if (event.data.method === 'initialize') {
          event.source.postMessage(
            {
              id: event.data.id,
              service: 'identity',
              payload: {},
            },
            'https://identity.deso.org' as WindowPostMessageOptions
          );

          resolve(event.data);
        }
      };
      window.addEventListener('message', windowHandler);

      this.setIdentityFrame(true);
    });
  }

  public login(accessLevel = '4'): Promise<IdentityLoginResponse> {
    const prompt = window.open(
      `https://identity.deso.org/log-in?accessLevelRequest=${accessLevel}&hideJumio=true`,
      null as unknown as any,
      'toolbar=no, width=800, height=1000, top=0, left=0'
    );
    return new Promise((resolve, reject) => {
      const windowHandler = ({ data }: { data: IdentityLoginResponse }) => {
        if (data.method !== 'login') {
          return;
        }
        const key = data.payload.publicKeyAdded;
        const user = data.payload.users[key];
        prompt?.close();
        localStorage.setItem('loginUser', JSON.stringify(user));
        resolve(data);

        window.removeEventListener('message', windowHandler);
      };
      this.setIdentityFrame();
      window.addEventListener('message', windowHandler);
    });
  }

  public logout(myPublicKey: string): Promise<boolean> {
    const prompt = window.open(
      `https://identity.deso.org/logout?publicKey=${myPublicKey}`,
      null as unknown as any,
      'toolbar=no, width=800, height=1000, top=0, left=0'
    );
    return new Promise((resolve, reject) => {
      const windowHandler = (event: any) => {
        if (event.data.method === 'login') {
          prompt?.close();
          resolve(true);

          localStorage.setItem('loginUser', '');
        }
      };
      window.addEventListener('message', windowHandler);
    });
  }
  public async approve(request: {
    apiResponse: { TransactionHex: string };
    user?: LoginUser;
  }) {
    // no user needs to be approved
    if (!request.user && request?.apiResponse?.TransactionHex) {
      return await this.approveAndSubmit(request?.apiResponse?.TransactionHex)
        .then(() => request)
        .catch(() => {
          throw Error('something went wrong while signing');
        });
    }
    // doesn't have a transaction and no user is provided
    if (!request.user) {
      throw Error('No user provided');
    }
    const payload = getSignerInfo(request.user, request.apiResponse);
    return this.signAndSubmit({
      id: uuid(),
      method: 'sign',
      payload,
      service: 'identity',
    })
      .then(() => request.apiResponse)
      .catch(() => {
        throw Error('something went wrong while signing');
      });
  }

  private setIdentityFrame(createNewIdentityFrame = false): void {
    let frame = document.getElementById('identity');
    if (frame && createNewIdentityFrame) {
      frame.remove();
    }
    if (!createNewIdentityFrame) {
      return;
    }

    frame = document.createElement('iframe');
    frame.setAttribute('src', 'https://identity.deso.org/embed?v=2');
    frame.setAttribute('id', 'identity');
    frame.style.width = '100vh';
    frame.style.height = '100vh';
    frame.style.position = 'fixed';
    frame.style.zIndex = '1000';
    frame.style.display = 'none';
    frame.style.left = '0';
    frame.style.right = '0';

    const root = document.getElementsByTagName('body')[0];
    if (root) {
      root.appendChild(frame);
    }
  }
  private handleSubmit(
    signedTransactionHex: string,
    windowHandler: (event: any) => null,
    resolve: (value: any) => void,
    reject: (reason?: any) => void
  ): Promise<any> {
    return this.transaction
      .submit(signedTransactionHex, this.node.uri)
      .then((response: any) => {
        window.removeEventListener('message', windowHandler);
        resolve(response);
      })
      .catch(() => {
        window.removeEventListener('message', windowHandler);
        reject();
      });
  }
  public signAndSubmit(request: any): Promise<any> {
    const iframe: HTMLIFrameElement | null = document.getElementById(
      'identity'
    ) as HTMLIFrameElement;
    if (iframe === null) {
      throw Error('Iframe with id identity does not exist');
    }
    iframe.contentWindow?.postMessage(request, '*');
    return new Promise((resolve, reject) => {
      const windowHandler = (event: any) => {
        if (event?.data?.payload?.signedTransactionHex) {
          this.handleSubmit(
            event?.data?.payload?.signedTransactionHex,
            windowHandler,
            resolve,
            reject
          ).finally(() => {
            window.removeEventListener('message', windowHandler);
          });
        }

        return null;
      };
      window.addEventListener('message', windowHandler);
    });
  }
}
