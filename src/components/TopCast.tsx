import React, { FC } from "react";
import Grid from "./Grid/Grid";
import CastCard from "./castCard";
import { TCast } from "@/types/types";

interface TopCastProps {
  topCast: TCast;
}

const TopCast: FC<TopCastProps> = ({ topCast }) => {
  return (
    <Grid heading='Top Cast'>
      <div className='flex items-center rounded-xl justify-center w-full  bg-[#E3E8EF] h-[180px] '>
        <CastCard
          castText={topCast.text}
          displayName={topCast.display_name}
          username={topCast.username}
          pfpImg={topCast.pfp_url}
          likesCount={topCast.likes_count}
          recastCount={topCast.recasts_count}
          timestamp={topCast.timestamp}
        />
      </div>
    </Grid>
  );
};

export default TopCast;
