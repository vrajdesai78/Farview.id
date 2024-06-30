"use client"
import ProfileContainer from '@/components/Profile/ProfileContainer'
import Image from 'next/image'
import React from 'react'

const HomeV2 = () => {
  return (
    <div className='flex-center w-full min-h-screen !items-start pt-[92px] bg-[#FAFAFA] relative'>

      <div className="w-full min-h-[322px] absolute top-0 left-0 z-10">
        <Image
          // src={pfp_url}
          src={'/images/banner.png'}
          alt="pfp"
          width={1440}
          height={322}
          className="!w-full !h-[322px] object-cover"
        />
      </div>

      {/* main profile container */}
      <div className="w-full max-w-[869px] relative z-30">
        <ProfileContainer />
      </div>
    </div>
  )
}

export default HomeV2