import React from "react";
import Grid from "./Grid/Grid";
import ShortenName from "../../utils/nameShortner";
import { TokenBalances } from "@/types/types";

const ReachOut = ({ TokenBalance }: TokenBalances) => {
  const links = [
    {
      icon: "/twitter.svg",
      url: "https://twitter.com/tusharrvrma",
    },
    {
      icon: "/reddit.svg",
      url: "https://twitter.com/tusharrvrma",
    },
    {
      icon: "/discord.svg",
      url: "https://twitter.com/tusharrvrma",
    },
    {
      icon: "/instagram.svg",
      url: "https://twitter.com/tusharrvrma",
    },
    {
      icon: "/twitter.svg",
      url: "https://twitter.com/tusharrvrma",
    },
  ];
  return (
    <Grid heading="Tokens">
      <div className=" justify-center items-center gap-6 inline-flex w-full">
        {TokenBalance && TokenBalance.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-xs  text-primary-grey font-normal">
              There is no wallet connected to this Farcaster ID
            </span>
          </div>
        ) : (
          <>
            {TokenBalance.map(({ token, formattedAmount }, id: number) => {
              const tokenIcon =
                token.symbol === "DEGEN"
                  ? "/degenIcon.svg"
                  : token.symbol === "ENJOY"
                  ? "/enjoyIcon.svg"
                  : "/hamIcon.svg";
              return (
                <div
                  className="flex flex-col items-center justify-start gap-2.5"
                  key={id}
                >
                  {/* nft img */}
                  <img
                    src={tokenIcon}
                    alt=""
                    className="sm:w-16 w-12 sm:h-16 h-12 "
                  />
                  {/* nft icon */}
                  <span className=" text-[10px] md:text-xs  text-primary-grey font-normal">
                    {token.symbol}=$
                    {Number(formattedAmount) >= 1000
                      ? `${(Number(formattedAmount) / 1000).toFixed(2)}`
                      : Number(formattedAmount).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </Grid>
  );
};

export default ReachOut;
