import React from "react";

export interface TopChannelProps {
  channelName: string;
  channelIcon: string;
}

const TopChannel = ({ channelIcon, channelName }: TopChannelProps) => {
  return (
    <div className="justify-center items-center gap-2 flex lg:flex-row flex-col">
      <img className="w-9 h-9 rounded-full" src={channelIcon} />
      <div className=" lg:text-primary-violet text-primary-grey text-sm lg:text-base font-semibold leading-tight">
        {channelName}
      </div>
    </div>
  );
};

export default TopChannel;
