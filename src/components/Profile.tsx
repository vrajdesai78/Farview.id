"use client";

import React, { FC, useEffect, useState } from "react";

interface userData {
  bio: string;
  pfp_url: string;
  follower_count: number;
  following_count: number;
  username: string;
  display_name: string;
}

interface ProfileProps {
  username: string;
}

const Profile: FC<ProfileProps> = ({ username }) => {
  const [userData, setUserData] = useState<userData>({
    bio: "",
    pfp_url: "",
    display_name: "",
    follower_count: 0,
    following_count: 0,
    username: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserBasicData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/getUser?fname=${username}`);
        const data = await res.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (username) {
      fetchUserBasicData();
    } else {
      console.log("fname required");
    }
  }, []);

  return (
    <div className='w-full min-h-screen flex items-center justify-start flex-col py-20 px-4 sm:px-8 lg:px-10 gap-10 bg-black'>
      {loading ? (
        <h1 className='text-white/90 font-bold text-2xl font-mono'>
          Loading...
        </h1>
      ) : (
        <>
          {/* profile img */}
          <img
            src={userData.pfp_url}
            alt=''
            className='w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover'
          />

          <div className='flex items-center justify-start w-full flex-col gap-4 '>
            <div className='flex items-center justify-start w-full flex-col gap-1'>
              {/* display name */}
              <h1 className='text-white/90 font-bold text-2xl font-mono'>
                {userData.display_name}
              </h1>
              {/* username */}
              <span className='text-white/40 font-normal text-xs font-mono'>
                {userData.username.length > 0 && "@"}
                {userData.username}
              </span>
            </div>
            {/* bio */}
            <p className='text-white/70 font-medium text-lg font-mono'>
              {userData.bio}
            </p>

            {!loading && (
              <div className='flex items-center justify-center w-full  gap-4'>
                {/* follower count */}
                <button className='bg-white p-2 rounded-lg flex items-center justify-center'>
                  <span className='text-sm text-black font-semibold'>
                    Followers: {userData.follower_count}
                  </span>
                </button>

                {/* following count */}
                <button className='bg-white p-2 rounded-lg flex items-center justify-center'>
                  <span className='text-sm text-black font-semibold'>
                    Following: {userData.following_count}
                  </span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
