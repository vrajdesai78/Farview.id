import React from "react";

export interface TopChannelProps {
  channelName: string;
  channelIcon: string;
}

const TopChannel = ({ channelIcon, channelName }: TopChannelProps) => {
  return (
    <div className="justify-center items-center gap-2 inline-flex">
      <img className="w-9 h-9 rounded-full" src={channelIcon} />
      <div className="text-violet-500 text-base font-semibold leading-tight">
        {channelName}
      </div>
    </div>
  );
};

export default TopChannel;
