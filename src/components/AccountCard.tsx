import Image from "next/image";
import React from "react";

interface accountCard {
  pfpImg: string;
  username: string;
  displayName: string;
  bio: string;
}

const AccountCard = ({ pfpImg, username, displayName, bio }: accountCard) => {
  return (
    <div className='w-full max-w-xl h-full border border-[#382a3d] bg-[#16101e] rounded-lg p-12 flex flex-col justify-center items-center'>
      <div className='mb-8'>
        <Image
          className='object-center object-cover rounded-full h-36 w-36'
          src={pfpImg}
          height={144}
          width={144}
          alt='photo'
          unoptimized
          loader={({ src }) => src}
        />
      </div>
      <div className='text-center w-full flex flex-col items-center justify-start gap-2'>
        <div className='text-sm leading-tight'>
          {/* display name */}
          <span className='text-[#f4f4f5] font-bold block '>{displayName}</span>
          {/* username */}
          <span className='text-[#5b616e] font-normal block'>@{username}</span>
        </div>
        <p className='text-white/70 font-medium text-lg font-mono'>{bio}</p>
      </div>
    </div>
  );
};

export default AccountCard;
