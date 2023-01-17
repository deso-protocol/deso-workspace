import { Deso } from 'deso-protocol';
import { DeSoNetwork } from 'deso-protocol-types';
import { MessagingApp } from './messaging-app';
const deso = new Deso({
  nodeUri: 'http://localhost:18001/api/v0',
  identityConfig: {
    uri: 'http://localhost:4201',
    network: DeSoNetwork.testnet,
  },
});
export const MessagingRoot = () => {
  return (
    <div className="flex justify-center bg-[#0C2F62] py-3">
      <MessagingApp deso={deso} />
    </div>
  );
};
