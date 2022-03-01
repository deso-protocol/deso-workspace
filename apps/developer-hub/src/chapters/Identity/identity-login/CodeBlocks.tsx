import { CopyBlock, nord } from "react-code-blocks";
export const LoginCodeBlocks = {
  section1: (
    <CopyBlock
      codeBlock
      text={`window.open( "https://identity.deso.org/log-in?accessLevelRequest=4&hideJumio=true",
null as unknown, "toolbar=no, width=800, height=1000, top=0, left=0" );`}
      language="jsx"
      wrapLines={true}
      theme={nord}
    />
  ),

  section2: (
    <CopyBlock
      codeBlock
      text={`const windowHandler = (event: any) => {
    const publicKey = event.data?.payload?.publicKeyAdded;
    if (!publicKey) { return; }
    const loggedInUser = event.data.payload.users[publicKey];
    prompt?.close(); resolve({ publicKey, loggedInUser });
    window.removeEventListener("message", windowHandler);
}`}
      language="jsx"
      wrapLines={true}
      theme={nord}
    />
  ),
};
