import { useEffect, useState } from 'react';

export interface BannerProps {
  userName: string;
  timestamptNanos: number;
  title: string;
}
export const Banner = ({ userName, timestamptNanos, title }: BannerProps) => {
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(new Date(timestamptNanos / 1000000).toDateString());
  }, []);
  return (
    <div>
      <div className="bg-black w-full text-white flex justify-start min-h-[50px] pl-4">
        <div className="text-gray text-lg my-auto">
          On {date} <span className=" font-semibold text-xl">{userName}</span>{' '}
          asked: {title}
        </div>{' '}
      </div>
    </div>
  );
};
