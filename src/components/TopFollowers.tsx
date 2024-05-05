import React, { FC } from "react";
import Grid from "./Grid/Grid";
import TopChannel from "./TopChannel/TopChannel";
import { TTopFollowers } from "@/types/types";

interface TopFollowersProps {
  topFollowers: TTopFollowers[];
}

const TopFollowers: FC<TopFollowersProps> = ({ topFollowers }) => {
  return (
    <Grid heading='Top Followers'>
      <div className='flex-col justify-start items-center md:items-start gap-6 inline-flex w-full'>
        {topFollowers.map((channel: TTopFollowers, id: number) => (
          <TopChannel
            channelIcon={channel.pfp}
            channelName={`@${channel.name}`}
            key={id}
          />
        ))}
      </div>
    </Grid>
  );
};

export default TopFollowers;
