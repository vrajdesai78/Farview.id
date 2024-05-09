import Image from "next/image";
import React from "react";

interface HeroProps {
  pfp_url: string;
  display_name: string;
  username: string;
  bio: string;
  loading: boolean;
  follower_count: number;
  following_count: number;
}
const ProfileHero = ({
  bio,
  display_name,
  follower_count,
  following_count,
  loading,
  pfp_url,
  username,
}: HeroProps) => {
  return (
    <div className="flex items-center justify-start w-full flex-col gap-2 ">
      {/* profile img */}
      <Image
        src={pfp_url}
        alt="pfp"
        width={64}
        height={64}
        loader={({ src }) => src}
        unoptimized
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex items-center justify-center w-full gap-1 sm:flex-row flex-col">
        {/* display name */}
        <h1 className=" text-lg sm:text-xl md:text-2xl font-semibold text-[#030816] ">
          {display_name}
        </h1>
        {/* username */}
        <span className="text-primary-grey font-normal text-xs sm:text-sm md:text-lg ">
          {username.length > 0 && "@"}
          {username}
        </span>
      </div>
      {/* bio */}
      <p className="text-primary-grey font-normal text-lg text-center max-w-full sm:max-w-[484px] ">
        {bio}
      </p>

      {!loading && (
        <div className="flex items-center justify-center w-full  gap-4">
          {/* follower count */}

          <span className="text-lg text-primary-grey font-normal">
            Followers
            <span className="text-primary-violet font-semibold ml-2">
              {follower_count >= 1000
                ? `${Number(follower_count / 1000).toFixed(2)}k`
                : follower_count}
            </span>
          </span>

          {/* following count */}
          <span className="text-lg text-primary-grey font-normal">
            Following
            <span className="text-primary-violet font-semibold ml-2">
              {following_count >= 1000
                ? `${Number(following_count / 1000).toFixed(2)}k`
                : following_count}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileHero;
