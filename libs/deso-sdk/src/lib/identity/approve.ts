import { setIdentityFrame } from './set-identity-frame';
import { GetApproveResponse } from '@deso-workspace/deso-types';
export const approve = (
  transactionHex: string
): Promise<GetApproveResponse> => {
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
    setIdentityFrame();
    window.addEventListener('message', windowHandler);
  });
};
