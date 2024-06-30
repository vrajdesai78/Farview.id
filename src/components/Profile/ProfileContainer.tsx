"use client";

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import StatBox from "./StatBox";
import CastCard from "../castCard";
import FcStats from "./FcStats";
import Tabs from "./Tabs";
import OwnNfts from "../OwnNfts";
import ReachOut from "../ReachOut";
import {
  TActiveChannels,
  TCast,
  TNFTs,
  TSocials,
  TStats,
  TTokenBalances,
  TTopFollowers,
  TUserInfo,
} from "@/types/types";

interface ProfileContainerProps {
  stats: TStats[];
  nfts: TNFTs[];
  tokenBalances: TTokenBalances[];
  tags: string[];
  socials: TSocials[];
  userInfo: TUserInfo;
  activeChannels: TActiveChannels[];
  topFollowers: TTopFollowers[];
  topCasts: TCast[];
}

const ProfileContainer = ({
  stats,
  nfts,
  tokenBalances,
  tags,
  socials,
  userInfo,
  activeChannels,
  topFollowers,
  topCasts,
}: ProfileContainerProps) => {
  const [tab, setTab] = useState("nft");

  const handleSwitchTab = (val: string) => {
    setTab(val);
  };

  return (
    <div className='w-full flex-col-start gap-11 p-6 md:p-[42px] bg-white border border-[#DEDEDE] rounded-3xl'>
      <div className='w-full flex-col-start gap-[27px]'>
        {/* basic profile details-name, pfp & socials */}
        {/* Profile Hero */}
        <Hero userInfo={userInfo} socials={socials} tags={tags} />

        {/* user stats- net worth , txns on base, first txn on base, profile visits */}
        <div className='w-full flex-between gap-2 flex-nowrap '>
          {stats.map(({ title, isIcon, val }) => {
            return (
              <StatBox key={title} title={title} val={val} isIcon={isIcon} />
            );
          })}
        </div>
      </div>

      {/* active channels , top followers */}
      <FcStats activeChannels={activeChannels} topFollowers={topFollowers} />

      <div className='w-full flex-center gap-8 md:!flex-row !flex-col'>
        {/* pinned cast */}
        <div className='flex-col-start w-full md:w-[calc(50%-16px)] !items-start gap-2'>
          <span className='text-primary-grey text-sm font-semibold uppercase'>
            Popular Casts
          </span>

          <CastCard
            castText={topCasts[0].text}
            likesCount={topCasts[0].likes_count}
            recastCount={topCasts[0].recasts_count}
            url={topCasts[0].url}
            repliesCount={topCasts[0].replies_count}
            key={"pinned cast"}
            channel={topCasts[0].channel}
          />
        </div>

        {/* top cast */}
        <div className='flex-col-start !items-start w-full md:w-[calc(50%-16px)] mt-8 gap-2'>
          {/* <span className='text-primary-grey text-sm font-semibold uppercase'>
            popular cast
          </span> */}

          <CastCard
            castText={topCasts[1].text}
            likesCount={topCasts[1].likes_count}
            recastCount={topCasts[1].recasts_count}
            url={topCasts[1].url}
            repliesCount={topCasts[1].replies_count}
            key={"pinned cast1"}
            channel={topCasts[1].channel}
          />
        </div>
      </div>

      <div className='flex-col-start !items-start w-full  gap-2'>
        {/* nfts and tokens */}
        <Tabs tab={tab} handleSwitchTab={handleSwitchTab} />

        {tab === "nft" && <OwnNfts nfts={nfts} />}

        {tab === "tokens" && <ReachOut TokenBalance={tokenBalances} />}
      </div>
    </div>
  );
};

export default ProfileContainer;
