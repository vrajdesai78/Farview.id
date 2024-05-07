import React, { FC } from "react";
import Grid from "./Grid/Grid";
import CastCard from "./castCard";
import { TCast } from "@/types/types";
import { TUserData } from "./Profile";

interface TopCastProps {
  topCast: TCast;
  userDetails: TUserData;
}

const TopCast: FC<TopCastProps> = ({ topCast, userDetails }) => {
  return (
    <Grid heading='Top Cast'>
      <div className='flex items-center rounded-xl justify-center w-full  bg-[#E3E8EF] h-[180px] '>
        {topCast.message ? (
          <span className=' text-[10px] md:text-xs  text-primary-grey font-normal'>
            {topCast.message}
          </span>
        ) : (
          <CastCard
            castText={topCast.text}
            displayName={userDetails.display_name}
            username={userDetails.username}
            pfpImg={userDetails.pfp_url}
            likesCount={topCast.likes_count}
            recastCount={topCast.recasts_count}
            timestamp={topCast.timestamp}
            url={topCast.url}
          />
        )}
      </div>
    </Grid>
  );
};

export default TopCast;
