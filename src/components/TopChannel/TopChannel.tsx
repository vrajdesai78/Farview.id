import Image from "next/image";
import React from "react";

export interface TopChannelProps {
  channelName: string;
  channelIcon: string;
}

const TopChannel = ({ channelIcon, channelName }: TopChannelProps) => {
  return (
    <div className="justify-center items-center gap-2 flex lg:flex-row flex-col">
      {/* not using Next Image here bcq we are getting pfp url hosted on different domain i.imgur.com and next doesn't allow this */}
      <img
        className="rounded-full max-w-9 max-h-9 object-cover"
        height={36}
        width={36}
        alt="icon"
        // loader={() => channelIcon}
        src={channelIcon}
      />
      <div className=" lg:text-primary-violet text-primary-grey text-sm lg:text-base font-semibold leading-tight">
        {channelName}
      </div>
    </div>
  );
};

export default TopChannel;
