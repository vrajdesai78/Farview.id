import React, { FC } from "react";
import Grid from "./Grid/Grid";
import { TNFTs } from "@/types/types";
import ShortenName from "../../utils/nameShortner";

interface OwnNFTsProps {
  nfts: TNFTs[];
}

const OwnNfts: FC<OwnNFTsProps> = ({ nfts }) => {
  return (
    <Grid heading='Top NFTs'>
      <div className=' justify-center items-center gap-6 inline-flex w-full'>
        {nfts.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-2'>
            <span className='text-xs  text-primary-grey font-normal'>
              There is no wallet connected to this Farcaster ID
            </span>
          </div>
        ) : (
          <>
            {nfts.map((nft: TNFTs, id: number) => (
              <div
                className='flex flex-col items-center justify-start gap-2.5'
                key={id}
              >
                {/* nft img */}
                <img
                  src={nft.imageUrl}
                  alt=''
                  className='w-16 h-16 rounded-2xl'
                />
                {/* nft icon */}
                <span className=' text-[10px] md:text-xs  text-primary-grey font-normal'>
                  {/* ALLOW ONLY 15 CHARACTERS FOR NFT NAME ELSE ...... */}
                  {ShortenName(nft.name, 5)}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </Grid>
  );
};

export default OwnNfts;
