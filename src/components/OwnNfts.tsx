import React, { FC } from "react";
import Grid from "./Grid/Grid";
import { TNFTs } from "@/types/types";
import ShortenName from "../../utils/nameShortner";
import Link from "next/link";
import Image from "next/image";

interface OwnNFTsProps {
  nfts: TNFTs[];
}

const OwnNfts: FC<OwnNFTsProps> = ({ nfts }) => {
  return (
    <div className=' flex-start gap-6 w-full p-4 bg-white rounded-2xl' style={{
      boxShadow: "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
    }}>
      {nfts.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-2'>
          <span className='text-lg text-primary-grey font-normal'>
            No NFTs on Base yet
          </span>
          <span className='text-primary-grey'>
            (Check your FC connected wallet)
          </span>
        </div>
      ) : (
        <>
          {nfts.map((nft: TNFTs, id: number) => (
            <Link
              className='flex flex-col items-start justify-start gap-2'
              key={id}
              href={nft.nftUrl}
              target='_blank'
            >
              {/* nft img */}
              <Image
                src={nft.imageUrl}
                alt='nfts'
                height={178}
                width={178}
                className='w-44 h-44 rounded-lg object-cover'
                unoptimized
                loader={({ src }) => src}
              />
              <div className="flex-col-start !items-start gap-0.5">
                {/* nft icon */}
                <span className="text-[#262626] font-medium text-sm sm:text-base">
                  {/* ALLOW ONLY 15 CHARACTERS FOR NFT NAME ELSE ...... */}
                  {ShortenName(nft.name, 15)}
                </span>
                {/* nft price */}
                <span className="text-primary-grey font-normal text-xs sm:text-base">
                  {0.30003} WETH
                </span>
              </div>
            </Link>
          ))}
        </>
      )
      }
    </div >
  );
};

export default OwnNfts;
