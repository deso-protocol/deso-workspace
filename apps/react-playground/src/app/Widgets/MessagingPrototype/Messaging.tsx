import Deso from 'deso-protocol';

export const Messaging = ({ deso }: { deso: Deso }) => {
  return (
    <div className="flex justify-around">
      <button
        onClick={() => {
          console.log('encrypt');
        }}
      >
        encrypt
      </button>
      <button
        onClick={() => {
          console.log('decrypt');
        }}
      >
        decrypt
      </button>
    </div>
  );
};
