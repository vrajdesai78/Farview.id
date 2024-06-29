import ProfileContainer from '@/components/Profile/ProfileContainer'
import React from 'react'

const HomeV2 = () => {
  return (
    <div className='flex-start w-full min-h-screen !items-start pt-[92px] bg-[#FAFAFA]'>

        {/* main profile container */}
        <div className="w-full max-w-[869px]">
            <ProfileContainer />
        </div>
    </div>
  )
}

export default HomeV2