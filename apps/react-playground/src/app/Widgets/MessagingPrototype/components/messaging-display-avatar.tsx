import Deso from 'deso-protocol';
import { useEffect, useState } from 'react';
import { avatarClass } from '../consts/styles';
export const MessagingDisplayAvatar: React.FC<{
  publicKey: string;
  deso: Deso;
  diameter: number;
  timeStamp?: number;
}> = ({ publicKey, deso, diameter, timeStamp }) => {
  const [time, setTime] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  useEffect(() => {
    const profilePicURL = `url('${deso.user.getSingleProfilePicture(
      publicKey,
      'https://node.deso.org/assets/img/default_profile_pic.png'
    )}')`;
    setProfilePicUrl(profilePicURL);
    if (timeStamp) {
      setTime(convertTstampToDateTime(timeStamp));
      // const date = new Date(timeStamp / 1000000);
      // let minutes: number | string = date.getMinutes();
      // if (minutes < 10) {
      //   minutes = `0${minutes}`;
      // }
      // const time = `${date.getMonth()}/${date.getDay()}/${
      //   date.getHours() % 12 || 12
      // }:${minutes}`;
      // setTime(time);
    }
  }, [publicKey]);
  return (
    <div>
      <div
        style={{ backgroundImage: profilePicUrl }}
        className={`${avatarClass} max-w-[${diameter}px] max-h-[${diameter}px]`}
      ></div>
      {timeStamp && <div className="ml-2 text-xs">{time}</div>}
    </div>
  );
};

function convertTstampToDateTime(tstampNanos: number) {
  const date = new Date(tstampNanos / 1e6);
  const currentDate = new Date();
  if (date.getFullYear() != currentDate.getFullYear()) {
    const yearsAgo = currentDate.getFullYear() - date.getFullYear();
    if (yearsAgo === 1) {
      return 'a year ago';
    }
    return `${yearsAgo} years ago`;
  }
  if (
    date.getDate() != currentDate.getDate() ||
    date.getMonth() != currentDate.getMonth()
  ) {
    return date.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
    });
  }

  return date.toLocaleString('default', { hour: 'numeric', minute: 'numeric' });
}
