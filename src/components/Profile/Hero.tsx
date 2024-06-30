import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShortenName from "../../../utils/nameShortner";
import { TSocials, TUserInfo } from "@/types/types";

interface HeroProps {
  userInfo: TUserInfo;
  socials: TSocials[];
  tags: string[];
}

const Hero = ({ userInfo, socials, tags }: HeroProps) => {
  return (
    <div className='w-full flex lg:justify-between justify-start items-center md:!flex-row !flex-col '>
      {/* pfp info*/}
      <div className='flex-start gap-6 !items-start lg:w-1/2 w-full'>
        {/* pfp img */}
        <div className='flex-center relative w-20 h-16 rounded-full '>
          {/* profile img */}
          <Image
            // src={pfp_url}
            loader={({ src }) => src}
            src={userInfo.pfp}
            alt='pfp'
            width={64}
            height={64}
            className='w-full h-full object-cover rounded-full'
          />

          {/* edit option */}
        </div>

        <div className='flex items-start justify-start w-full flex-col gap-3 '>
          <div className='flex items-start justify-start w-full gap-1 flex-col'>
            <h1 className=' text-lg sm:text-xl md:text-2xl font-semibold text-[#000] '>
              {userInfo.name}
            </h1>
            {/* username */}
            <span className='text-primary-grey font-normal text-xs sm:text-sm md:text-base '>
              @{userInfo.username}
            </span>
          </div>

          <p className='text-primary-grey font-normal text-base text-start max-w-full sm:max-w-[384px] '>
            {userInfo.bio}
          </p>

          {/* {!loading && ( */}
          <div className='flex-start w-full  gap-4'>
            {/* follower count */}

            <span className='text-base text-primary-grey font-normal'>
              Followers
              <span className='text-primary-violet font-semibold ml-1.5'>
                {userInfo.follower_count >= 1000
                  ? `${Number(userInfo.follower_count / 1000).toFixed(2)}k`
                  : userInfo.follower_count}
              </span>
            </span>

            {/* following count */}
            <span className='text-base text-primary-grey font-normal'>
              Following
              <span className='text-primary-violet font-semibold ml-1.5'>
                {userInfo.following_count >= 1000
                  ? `${Number(userInfo.following_count / 1000).toFixed(2)}k`
                  : userInfo.following_count}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className='flex-col-between !items-start lg:gap-0 gap-6 md:!items-end h-[141px] w-2/5'>
        {/* socials */}
        <div className='md:w-[156px] w-full flex-start !justify-start gap-5 md:!justify-between'>
          {socials.map((social: TSocials, index) => {
            return (
              <Link href={social.link} key={index}>
                <Image
                  // src={pfp_url}
                  src={social.img}
                  alt='pfp'
                  width={24}
                  height={24}
                  className='w-6 h-6'
                />
              </Link>
            );
          })}
        </div>

        {/* Achievement */}
        <div className='w-full flex-end gap-2 md:!justify-end justify-start'>
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                style={{
                  borderColor:
                    index === 0
                      ? "#ADE4FF"
                      : index === 1
                      ? "#C6B6F7"
                      : "#FFCDBD",
                  color:
                    index === 0
                      ? "#0075AD"
                      : index === 1
                      ? "#4316CA"
                      : "#B82E00",
                  backgroundColor:
                    index === 0
                      ? "#F0FAFF"
                      : index === 1
                      ? "#F4F1FD"
                      : "#FFF2EE",
                }}
                className={`text-center max-w-[8rem] px-2 py-1 rounded-[360px] border text-sm font-normal text-ellipsis text-nowrap w-full overflow-hidden`}
              >
                {tag}
              </div>
            );
          })}

          {/* <div className='py-1 px-2 flex-center'>
            <span className='cursor-pointer text-sm font-normal text-[#3F3F50] '>
              2+
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
