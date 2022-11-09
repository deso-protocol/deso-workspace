import { Deso } from 'deso-protocol';
import { MessagingApp } from './messaging-app';
const deso = new Deso();
export const MessagingRoot = () => {
  return (
    <div className="flex justify-center bg-[#0C2F62] py-3">
      <MessagingApp deso={deso} />
    </div>
  );
};
