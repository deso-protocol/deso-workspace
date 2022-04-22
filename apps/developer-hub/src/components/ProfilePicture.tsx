import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';

export interface ProfilePictureProps {
  publicKey: string;
}
const deso = new Deso();
export const ProfilePicture = ({ publicKey }: ProfilePictureProps) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(deso.user.getSingleProfilePicture(publicKey));
  }, [publicKey]);
  return (
    <img
      className=" rounded-full  opacity-100"
      width={30}
      height={30}
      src={url}
    />
  );
};
