import React from "react";
import Grid from "../Grid/Grid";
import TopChannel, { TopChannelProps } from "./TopChannel";

const TopChannels = () => {
  const topChannels = [
    {
      name: "fbi",
      icon: "/fbiChannel.svg",
    },
    {
      name: "higher",
      icon: "/higherChannel.svg",
    },
    {
      name: "degen",
      icon: "/degenChannel.svg",
    },
  ];

  return (
    <Grid heading="Top Caster">
      <div className="flex-col justify-start items-center lg:items-start gap-6 inline-flex w-full">
        {topChannels.map((channel: any, id: number) => (
          <TopChannel
            channelIcon={channel.icon}
            channelName={`/ ${channel.name}`}
            key={id}
          />
        ))}
      </div>
    </Grid>
  );
};

export default TopChannels;
