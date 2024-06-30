import React, { use } from "react";
import { getFormattedTime } from "../../utils/getFormattedTime";
import ShortenName from "../../utils/nameShortner";
import Link from "next/link";
import Image from "next/image";

interface cardProps {
  // pfpImg: string;
  // username: string;
  castText: string;
  // timestamp: string;
  likesCount: number;
  repliesCount: number;
  recastCount: number;
  url: string;
  img?: string;
  channel?: string;
}

const CastCard = ({
  // pfpImg,
  // username,
  castText,
  // timestamp,
  likesCount,
  recastCount,
  repliesCount,
  url,
  img,
  channel,
}: cardProps) => {
  // const formattedTime = getFormattedTime(timestamp);

  const reactions = [
    {
      icon: "/images/heart.svg",
      count: likesCount,
    },
    {
      icon: "/images/replies.svg",
      //  NOTE ADD REPLIES COUNT BELOW DYNAMICALLY
      count: repliesCount,
    },
    {
      icon: "/images/recast.svg",
      count: recastCount,
    },
  ];

  return (
    // <div className=" rounded-xl flex items-center w-full justify-center">
    <Link
      className='p-5 rounded-2xl bg-white border  border-[#DEDEDE] w-full  flex-col-start gap-4'
      href={url}
      target='_blank'
      style={{
        boxShadow:
          "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
      }}
    >
      {/* <div className='flex justify-between w-full'> */}
      {/* <div className='flex items-center'>
          // profile img
          <Image
            className='h-8 w-8 rounded-full object-cover'
            alt='profile'
            width={32}
            height={32}
            src={pfpImg}
            unoptimized
            loader={({ src }) => src}
          />
          <div className='ml-1.5 text-xs leading-tight'>
            // display name
            <span className='text-slate-500 font-bold block '>
              {displayName}
            </span>
            // username
            <span className='text-[#5b616e] font-normal block'>
              @{username}
            </span>
          </div>
        </div> */}

      {/* </div> */}
      <div className='max-w-full w-full flex-between !items-start'>
        <p className='text-[#262626] block h-[90px] max-h-[90px] text-base font-medium w-[calc(100%-40px)] max-w-[calc(100%-40px)] whitespace-break-spaces overflow-hidden'>
          {ShortenName(castText, 100)}
        </p>

        {/* warpcast icon */}
        <img
          src='https://play-lh.googleusercontent.com/cRcdfJ01plmO9AhusWRZ1uyrjcYbbMMiyqTakPEHatoNVEzxtFt-78GJ7IZX-1cd2Vz2'
          alt='warpcast'
          height={24}
          width={24}
          className='w-6 h-6 rounded-sm'
        />
      </div>

      {/* cast img if exists */}
      {img && (
        <div className='w-full h-[181px] rounded-xl'>
          <img
            src={img}
            className='w-full h-full object-cover rounded-xl'
            alt=''
          />
        </div>
      )}

      <div className='w-full flex-between'>
        {/* time of cast */}
        {/* <p className='text-gray-500 dark:text-gray-400 text-xs mt-0.5 '>
          {formattedTime}
        </p> */}

        {/* reactions */}
        <div className='text-primary-grey flex-start gap-4'>
          {reactions.map((reaction, idx) => {
            return (
              <div className='flex-center gap-1.5' key={idx}>
                <Image
                  src={reaction.icon}
                  alt='rxtn'
                  height={20}
                  width={20}
                  className='w-5 h-5'
                />
                <span className=' text-sm font-normal'>{reaction.count}</span>
              </div>
            );
          })}
        </div>

        {/* cast parent channel if exists or Home */}
        {channel && (
          <span className=' text-sm font-normal text-primary-grey'>
            {`/${channel}`}
          </span>
        )}
      </div>
    </Link>
    // </div>
  );
};

export default CastCard;
