import { setIdentityFrame } from './set-identity-frame';

export const login = (): Promise<{
  publicKey: string;
  loggedInUser: any;
}> => {
  const prompt = window.open(
    'https://identity.deso.org/log-in?accessLevelRequest=4&hideJumio=true',
    null as unknown as any,
    'toolbar=no, width=800, height=1000, top=0, left=0'
  );
  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      const publicKey = event.data?.payload?.publicKeyAdded;
      if (!publicKey) {
        return;
      }
      const loggedInUser = event.data.payload.users[publicKey];
      prompt?.close();
      resolve({ publicKey, loggedInUser });

      window.removeEventListener('message', windowHandler);
    };
    setIdentityFrame();
    window.addEventListener('message', windowHandler);
  });
};
