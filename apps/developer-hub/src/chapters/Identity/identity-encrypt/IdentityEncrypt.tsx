export const IdentityEncrypt = () => {
  const iframe: HTMLIFrameElement | null = document.getElementById(
    "identity"
  ) as HTMLIFrameElement;
  if (iframe === null) {
    throw Error("Iframe with id identity does not exist");
  }
  //   iframe.contentWindow?.postMessage(request, "*");
  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      if (!event?.data?.payload?.encryptedMessage) {
        return;
      }
      resolve(event?.data?.payload?.encryptedMessage);
    };
  });
  // event?.data?.payload?.encryptedMessage
};
