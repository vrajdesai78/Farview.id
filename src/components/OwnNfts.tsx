import React, { FC } from "react";
import Grid from "./Grid/Grid";
import { TNFTs } from "@/types/types";

interface OwnNFTsProps {
  nfts: TNFTs[];
}

const OwnNfts: FC<OwnNFTsProps> = ({ nfts }) => {
  return (
    <Grid heading='Owns'>
      <div className=' justify-center items-center gap-6 inline-flex w-full'>
        {nfts.map((nft: TNFTs, id: number) => (
          <div
            className='flex flex-col items-center justify-start gap-2.5'
            key={id}
          >
            {/* nft img */}
            <img src={nft.imageUrl} alt='' className='w-16 h-16 rounded-2xl' />
            {/* nft icon */}
            <span className=' text-[10px] md:text-xs  text-primary-grey font-normal'>
              {nft.name}
            </span>
          </div>
        ))}
      </div>
    </Grid>
  );
};

export default OwnNfts;
