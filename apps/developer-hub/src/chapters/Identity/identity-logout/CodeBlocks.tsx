import { CopyBlock, nord } from "react-code-blocks";
export const CodeBlocks = {
  section1: (
    <CopyBlock
      codeBlock
      text={`
  const prompt = window.open(
    https://identity.deso.org/logout?publicKey=myPublicKey,
    null as unknown as any,
    "toolbar=no, width=800, height=1000, top=0, left=0"
  ); `}
      language="jsx"
      wrapLines={true}
      theme={nord}
    />
  ),
  section2: (
    <CopyBlock
      codeBlock
      text={`
  const windowHandler = (event: any) => {
  console.log(event.data.method);
    if (event.data.method === "login") {
      prompt?.close();
      resolve(true);
    }
  };
    `}
      language="jsx"
      wrapLines={true}
      theme={nord}
    />
  ),

  // (
  // )),
};
