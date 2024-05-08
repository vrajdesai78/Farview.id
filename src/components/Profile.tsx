"use client";

import React, { FC } from "react";
import Navbar from "./Navbar";
import Tag from "./Tag";
import ProfileHero from "./ProfileHero";
import TopChannels from "./TopChannel/TopChannels";
import TopFollowers from "./TopFollowers";
import TopCast from "./TopCast";
import OwnNfts from "./OwnNfts";
import ReachOut from "./ReachOut";
import {
  TActiveChannels,
  TCast,
  TNFTs,
  TTopFollowers,
  TokenBalances,
} from "@/types/types";
import Link from "next/link";

export interface TUserData {
  bio: string;
  pfp_url: string;
  follower_count: number;
  following_count: number;
  username: string;
  display_name: string;
  firstTxn: string;
  daysSinceFirstTxn: number;
  txnCount: number | null;
}

interface ProfileProps {
  userData: TUserData;
  fid: string;
  nfts: TNFTs[];
  activeChannels: TActiveChannels[];
  topFollowers: TTopFollowers[];
  topCast: TCast;
  Tokens: TokenBalances;
}

const Profile: FC<ProfileProps> = ({
  userData,
  nfts,
  activeChannels,
  topFollowers,
  topCast,
  Tokens,
}) => {
  // dummy tags
  const tags = [
    {
      title: `${userData.txnCount}+ txns on Base`,
      icon: "💸",
    },
    {
      title: `First txn on Base - ${userData.firstTxn}`,
      icon: "🥇",
    },
    {
      title: `${userData.daysSinceFirstTxn} D since First Base txn`,
      icon: "⌛️",
    },
  ];

  return (
    <div className='w-full min-h-screen flex items-center justify-start flex-col py-8 px-3  bg-[#F8FAFC] '>
      <div className='w-full flex flex-col items-center justify-start gap-6 max-w-[1200px]'>
        <Navbar />
        <>
          <ProfileHero
            username={userData.username}
            bio={userData.bio}
            display_name={userData.display_name}
            follower_count={userData.follower_count}
            following_count={userData.following_count}
            loading={false}
            pfp_url={userData.pfp_url}
            key={"profile-hero"}
          />

          {/* famous tags */}
          {userData.txnCount && (
            <div className='w-full flex items-center justify-center gap-3 flex-wrap'>
              {tags.map((tag: any, id: number) => (
                <Tag icon={tag.icon} title={tag.title} key={id} />
              ))}
            </div>
          )}
          <div className='w-full flex items-center justify-start gap-3  flex-col'>
            <div className='w-full flex items-center justify-between md:justify-center gap-3 '>
              <TopChannels topChannels={activeChannels} />
              {/* top cast for large dekstop screens */}
              <div className='md:block hidden w-[348px]'>
                <TopCast userDetails={userData} topCast={topCast} />
              </div>
              <TopFollowers topFollowers={topFollowers} />
            </div>
            {/* top cast for small screens */}
            <div className='md:hidden block  w-full'>
              <TopCast userDetails={userData} topCast={topCast} />
            </div>
          </div>
          <div className='w-full md:max-w-[700px] lg:max-w-[800px] flex items-center justify-between md:flex-row flex-col md:justify-between gap-3'>
            <OwnNfts nfts={nfts} />
            <div className='lg:w-[484px] md:w-[400px] w-full'>
              <ReachOut TokenBalance={Tokens.TokenBalance} />
            </div>
          </div>
          <div className='text-center'>
            <span className='text-slate-500 text-sm font-normal '>
              Made with 💜 by
            </span>
            <span className='text-primary-violet text-sm font-semibold ml-1'>
              Farview
            </span>
            <span className='text-slate-500 text-sm font-normal ml-1'>
              | From the House of
            </span>
            <Link
              className='text-primary-violet text-sm font-semibold ml-1'
              href='https://warpcast.com/~/channel/fbi'
              target='_blank'
            >
              FBI
            </Link>
          </div>
        </>
      </div>
    </div>
  );
};

export default Profile;
