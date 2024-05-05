import React from "react";
import Grid from "./Grid/Grid";
import TopChannel from "./TopChannel/TopChannel";

const OwnNfts = () => {
  const OwnNfts = [
    {
      name: "Degen Punk",
      icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3765900c-48ad-4580-932d-bed17d58ae00/original",
    },
    {
      name: "Based Punk",
      icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3765900c-48ad-4580-932d-bed17d58ae00/original",
    },
    {
      name: "Degentleman",
      icon: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3765900c-48ad-4580-932d-bed17d58ae00/original",
    },
  ];

  return (
    <Grid heading="Owns">
      <div className=" justify-center items-center gap-6 inline-flex w-full">
        {OwnNfts.map((nft: any, id: number) => (
          <div className="flex flex-col items-center justify-start gap-2.5">
            {/* nft img */}
            <img src={nft.icon} alt="" className="w-16 h-16 rounded-2xl" />
            {/* nft icon */}
            <span className=" text-[10px] md:text-xs  text-primary-grey font-normal">
              {nft.name}
            </span>
          </div>
        ))}
      </div>
    </Grid>
  );
};

export default OwnNfts;
