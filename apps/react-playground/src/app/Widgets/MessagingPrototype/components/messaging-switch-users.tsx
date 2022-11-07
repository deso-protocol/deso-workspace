import Deso from 'deso-protocol';
import { buttonClass } from '../consts/styles';
export interface MessagingSwitchUsers {
  deso: Deso;
}
export const MessagingSwitchUsers = ({ deso }: MessagingSwitchUsers) => {
  return (
    <div className="flex justify-center mt-5">
      <button
        className={buttonClass}
        onClick={async () => {
          await deso.identity.login();
          await window.location.reload();
        }}
      >
        switch users
      </button>
    </div>
  );
};
