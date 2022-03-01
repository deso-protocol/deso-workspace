import { setIdentityFrame } from "./GetIdentityFrame";

export const IdentityInitialize = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      if (event.origin !== "https://identity.deso.org") {
        return;
      }
      if (event.data.method === "initialize") {
        event.source.postMessage(
          {
            id: event.data.id,
            service: "identity",
            payload: {},
          },
          "https://identity.deso.org" as WindowPostMessageOptions
        );

        resolve(event.data);
      }
    };
    window.addEventListener("message", windowHandler);

    setIdentityFrame(true);
  });
};
