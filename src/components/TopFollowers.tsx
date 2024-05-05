import React from "react";
import Grid from "./Grid";
import TopChannel from "./TopChannel/TopChannel";

const TopFollowers = () => {
  const TopFollowers = [
    {
      name: "saxenasaheb",
      icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3765900c-48ad-4580-932d-bed17d58ae00/original",
    },
    {
      name: "saxenasaheb",
      icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3765900c-48ad-4580-932d-bed17d58ae00/original",
    },
    {
      name: "saxenasaheb",
      icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3765900c-48ad-4580-932d-bed17d58ae00/original",
    },
  ];

  return (
    <Grid heading="Top Followers">
      <div className="flex-col justify-start items-start gap-6 inline-flex w-full">
        {TopFollowers.map((channel: any, id: number) => (
          <TopChannel
            channelIcon={channel.channelIcon}
            channelName={`@${channel.channelName}`}
            key={id}
          />
        ))}
      </div>
    </Grid>
  );
};

export default TopFollowers;
