import {
  GetApproveResponse,
  GetLoginResponse,
} from '@deso-workspace/deso-types';
import { Transaction } from '../transaction/Transaction';
import { Node } from '../../index';
export class Identity {
  node: Node;
  transaction: Transaction;
  constructor(transaction: Transaction, node: Node) {
    this.node = node;
    this.transaction = transaction;
  }
  public approve(transactionHex: string): Promise<GetApproveResponse> {
    const prompt = window.open(
      `https://identity.deso.org/approve?tx=${transactionHex}`,
      null as unknown as any,
      'toolbar=no, width=800, height=1000, top=0, left=0'
    );
    return new Promise((resolve, reject) => {
      const windowHandler = (event: any) => {
        const signedTransaction = event?.data?.payload?.signedTransactionHex;
        if (signedTransaction) {
          resolve(signedTransaction);
        }
        prompt?.close();

        window.removeEventListener('message', windowHandler);
      };
      this.setIdentityFrame();
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

  public login(accessLevel = '4'): Promise<GetLoginResponse> {
    const prompt = window.open(
      `https://identity.deso.org/log-in?accessLevelRequest=${accessLevel}&hideJumio=true`,
      null as unknown as any,
      'toolbar=no, width=800, height=1000, top=0, left=0'
    );
    return new Promise((resolve, reject) => {
      const windowHandler = ({ data }: { data: GetLoginResponse }) => {
        if (data.method !== 'login') {
          return;
        }
        prompt?.close();
        localStorage.setItem('loginUser', JSON.stringify(data));
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

  public sign(request: any): Promise<any> {
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
          return this.transaction
            .submit(event?.data?.payload?.signedTransactionHex, this.node.uri)
            .then((response: any) => {
              window.removeEventListener('message', windowHandler);
              resolve(response);
            })
            .catch(() => {
              window.removeEventListener('message', windowHandler);
              reject();
            });
        }

        return null;
      };
      window.addEventListener('message', windowHandler);
    });
  }
}
