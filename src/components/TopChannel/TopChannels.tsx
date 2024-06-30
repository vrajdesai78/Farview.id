import React, { FC } from "react";
import Grid from "../Grid/Grid";
import TopChannel from "./TopChannel";
import { TActiveChannels } from "@/types/types";
import ShortenName from "../../../utils/nameShortner";

interface TopChannelsProps {
  topChannels: TActiveChannels[];
}

const TopChannels: FC<TopChannelsProps> = ({ topChannels }) => {
  return (
    <Grid heading='Active Caster'>
      <div className='flex-col justify-start items-center lg:items-start gap-6 inline-flex w-full'>
        {topChannels.length === 0 ? (
          <span className=' text-[10px] md:text-xs  text-primary-grey font-normal max-w-[100px] text-center '>
            This user is not active in any channels
          </span>
        ) : (
          <>
            {topChannels.map((channel: TActiveChannels, id: number) => (
              <TopChannel
                channelIcon={channel.imageUrl}
                channelName={`/${ShortenName(channel.name, 8)}`}
                channelUrl={channel.url}
                key={id}
              />
            ))}
          </>
        )}
      </div>
    </Grid>
  );
};

export default TopChannels;
