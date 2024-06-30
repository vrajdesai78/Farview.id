"use client";

import {
  TActiveChannels,
  TCast,
  TNFTs,
  TSocials,
  TStats,
  TTokenBalances,
  TTopFollowers,
  TUserDetail,
  TUserInfo,
} from "@/types/types";
import NavButton from "./Profile/NavButton";
import Image from "next/image";
import ProfileContainer from "./Profile/ProfileContainer";
import { useState } from "react";
import Modal from "./Profile/Modal/Modal";

interface PageContainerProps {
  stats: TStats[];
  nfts: TNFTs[];
  tokenBalances: TTokenBalances[];
  tags: string[];
  socials: TSocials[];
  userInfo: TUserInfo;
  activeChannels: TActiveChannels[];
  topFollowers: TTopFollowers[];
  topCasts: TCast[];
  userData: TUserDetail;
  fid: string;
}

const PageContainer = ({
  stats,
  nfts,
  tokenBalances,
  tags,
  socials,
  userInfo,
  activeChannels,
  topFollowers,
  topCasts,
  userData,
  fid,
}: PageContainerProps) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className='flex-center w-full min-h-screen !items-start pt-[92px] bg-[#FAFAFA] relative'>
      <div className='w-full min-h-[322px] absolute top-0 right-0 z-10'>
        <NavButton openModal={openModal} fid={fid} />
        <Image
          src={"/images/banner.png"}
          alt='pfp'
          width={1440}
          height={322}
          className='!w-full !h-[322px] object-cover'
        />
      </div>
      <div className='w-full max-w-[869px] relative z-30'>
        <ProfileContainer
          stats={stats}
          nfts={nfts}
          tokenBalances={tokenBalances}
          userInfo={userInfo}
          socials={socials}
          tags={tags}
          activeChannels={activeChannels}
          topFollowers={topFollowers}
          topCasts={topCasts as TCast[]}
        />
        <Modal open={open} closeModal={closeModal} userData={userData} />
      </div>
    </div>
  );
};

export default PageContainer;
