import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';
import { avatarClass } from '../consts/styles';
export const MessagingDisplayAvatar: React.FC<{
  publicKey: string;
  deso: Deso;
  diameter: number;
}> = ({ publicKey, deso, diameter }) => {
  const [profilePicUrl, setProfilePicUrl] = useState('');
  useEffect(() => {
    const profilePicURL = `url('${deso.user.getSingleProfilePicture(
      publicKey,
      'https://node.deso.org/assets/img/default_profile_pic.png'
    )}')`;
    setProfilePicUrl(profilePicURL);
  }, []);
  return (
    <div
      style={{ backgroundImage: profilePicUrl }}
      className={`${avatarClass} max-w-[${diameter}px] max-h-[${diameter}px]`}
    ></div>
  );
};
