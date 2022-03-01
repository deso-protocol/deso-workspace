export const IdentityLogout = (myPublicKey: string): Promise<boolean> => {
  const prompt = window.open(
    `https://identity.deso.org/logout?publicKey=${myPublicKey}`,
    null as unknown as any,
    "toolbar=no, width=800, height=1000, top=0, left=0"
  );

  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      if (event.data.method === "login") {
        prompt?.close();
        resolve(true);
      }
    };
    window.addEventListener("message", windowHandler);
  });
};
