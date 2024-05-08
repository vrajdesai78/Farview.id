import React from "react";
import Grid from "./Grid/Grid";
import ShortenName from "../../utils/nameShortner";
import { TokenBalances } from "@/types/types";
import Image from "next/image";

const ReachOut = ({ TokenBalance }: TokenBalances) => {
  return (
    <Grid heading='Base Tokens'>
      <div className=' justify-center items-center gap-6 inline-flex w-full'>
        {TokenBalance && TokenBalance.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-2'>
            <span className='text-xs  text-primary-grey font-normal'>
              There is no wallet connected to this Farcaster ID
            </span>
          </div>
        ) : (
          <>
            {TokenBalance ? (
              TokenBalance.slice(0, 2).map(
                ({ token, formattedAmount }, id: number) => {
                  return (
                    <div
                      className='flex flex-col items-center justify-start gap-2.5'
                      key={id}
                    >
                      <Image
                        src={`/images/${token.symbol}.png`}
                        alt='token'
                        height={64}
                        width={64}
                        loader={({ src }) => src}
                        unoptimized
                        className='sm:w-16 w-12 sm:h-16 h-12 rounded-full'
                      />
                      <span className=' text-[10px] md:text-xs  text-primary-grey font-normal'>
                        {Number(formattedAmount) >= 1000
                          ? `${(Number(formattedAmount) / 1000).toFixed(2)}k`
                          : Number(formattedAmount) % 1 !== 0
                          ? Number(formattedAmount).toFixed(2)
                          : formattedAmount}{" "}
                        {token.symbol}
                      </span>
                    </div>
                  );
                }
              )
            ) : (
              <div className='flex flex-col items-center justify-center gap-2'>
                <span className='text text-center text-primary-grey font-normal'>
                  No Tokens Found
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </Grid>
  );
};

export default ReachOut;
