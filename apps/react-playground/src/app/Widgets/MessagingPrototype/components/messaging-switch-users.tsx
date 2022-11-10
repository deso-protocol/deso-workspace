import Deso from 'deso-protocol';
import { buttonClass } from '../consts/styles';
export const MessagingSwitchUsers: React.FC<{
  deso: Deso;
}> = ({ deso }) => {
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
