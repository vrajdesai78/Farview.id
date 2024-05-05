import Image from "next/image";
import React from "react";

export interface TopChannelProps {
  channelName: string;
  channelIcon: string;
}

const TopChannel = ({ channelIcon, channelName }: TopChannelProps) => {
  return (
    <div className='justify-center items-center gap-2 flex lg:flex-row flex-col'>
      <Image
        className='rounded-full'
        height={36}
        width={36}
        alt='icon'
        loader={() => channelIcon}
        src={channelIcon}
      />
      <div className=' lg:text-primary-violet text-primary-grey text-sm lg:text-base font-semibold leading-tight'>
        {channelName}
      </div>
    </div>
  );
};

export default TopChannel;
