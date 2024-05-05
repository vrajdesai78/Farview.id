import React from "react";
import Grid from "./Grid";

const TopCast = () => {
  return (
    <Grid heading="Top Cast">
      <div className="flex items-center rounded-xl justify-center w-[348px] bg-[#E3E8EF] h-[206px] ">
        <span className="text-center text-slate-500 text-base font-normal  tracking-tight">
          Embed the cast
        </span>
      </div>
    </Grid>
  );
};

export default TopCast;
