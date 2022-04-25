import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';

export interface ProfilePictureProps {
  publicKey: string;
  className?: string;
}
const deso = new Deso();
export const ProfilePicture = ({
  publicKey,
  className = '',
}: ProfilePictureProps) => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(deso.user.getSingleProfilePicture(publicKey));
  }, [publicKey]);
  return (
    <img
      className={`min-h-[30px] rounded-full bg-inherit ${className}  opacity-100`}
      width={30}
      src={url}
    />
  );
};
