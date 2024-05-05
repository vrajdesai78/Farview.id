import React from "react";
import Grid from "./Grid/Grid";
import CastCard from "./castCard";

const TopCast = () => {
  return (
    <Grid heading='Top Cast'>
      <div className='flex items-center rounded-xl justify-center w-full  bg-[#E3E8EF] h-[180px] '>
        <CastCard
          castText='Sample'
          displayName='new'
          username='check'
          pfpImg='https://i.imgur.com/WvmWLia.jpg'
          likesCount={100}
          recastCount={20}
          timestamp={new Date().toISOString()}
        />
      </div>
    </Grid>
  );
};

export default TopCast;
