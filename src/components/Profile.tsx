"use client";

import React, { FC, useEffect, useState } from "react";
import CastCard from "./castCard";
import { fetchMostEngagedPeople, fetchTopCasts } from "@/app/_actions/queries";
import AccountCard from "./AccountCard";
import Navbar from "./Navbar";
import Tag from "./Tag";
import ProfileHero from "./ProfileHero";
import TopChannels from "./TopChannel/TopChannels";
import TopFollowers from "./TopFollowers";
import TopCast from "./TopCast";
import OwnNfts from "./OwnNfts";
import ReachOut from "./ReachOut";

interface TUserData {
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
}

const Profile: FC<ProfileProps> = ({ userData, fid }) => {
  const [topCasts, setTopCasts] = useState([]);
  const [mostEngagedAccounts, setMostEngagedAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserBasicData = async () => {
      setLoading(true);
      try {
        // NOTE: facing 500 error in basic data fetch- Cannot read properties of null (reading 'Socials')
        // const res = await fetch(`/api/getUser?fname=${username}`);
        // const data = await res.json();
        const topCasts = await fetchTopCasts(fid);
        const casts = JSON.parse(topCasts).casts;
        const mostEngagedPeople = await fetchMostEngagedPeople(fid);
        const people =
          JSON.parse(mostEngagedPeople).top_relevant_followers_hydrated;
        setMostEngagedAccounts(people);
        setTopCasts(casts.slice(0, 3));
        // setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (userData.username) {
      fetchUserBasicData();
    } else {
      console.log("fname required");
    }
  }, []);

  // dummy tags
  const tags = [
    {
      title: "500+ txns on Base",
      icon: "/base.svg",
    },
    {
      title: "Joined FC on 4th May, 21",
      icon: "/calendar.svg",
    },
    {
      title: "500 Days since first Cast",
      icon: "/clock.svg",
    },
  ];

  return (
    <div className="w-full min-h-screen flex items-center justify-start flex-col py-12 px-6  bg-[#F8FAFC] ">
      <div className="w-full flex flex-col items-center justify-start gap-6 max-w-[1200px]">
        <Navbar />

        {loading ? (
          <h1 className="text-black/90 font-bold text-2xl">Loading...</h1>
        ) : (
          <>
            <ProfileHero
              username={userData.username}
              bio={userData.bio}
              display_name={userData.display_name}
              follower_count={userData.follower_count}
              following_count={userData.following_count}
              loading={loading}
              pfp_url={userData.pfp_url}
              key={"profile-hero"}
            />

            {/* famous tags */}
            <div className="w-full flex items-center justify-center gap-3 flex-wrap">
              {tags.map((tag: any, id: number) => (
                <Tag icon={tag.icon} title={tag.title} key={id} />
              ))}
            </div>

            <div className="w-full flex items-center justify-start gap-3  flex-col">
              <div className="w-full flex items-center justify-between md:justify-center gap-3 ">
                <TopChannels />
                {/* top cast for large dekstop screens */}
                <div className="md:block hidden w-[348px]">
                  <TopCast />
                </div>
                <TopFollowers />
              </div>
              {/* top cast for small screens */}
              <div className="md:hidden block  w-full">
                <TopCast />
              </div>
            </div>
            <div className="w-full flex items-center justify-between md:flex-row flex-col md:justify-center gap-3 ">
              <OwnNfts />
              <ReachOut />
            </div>
            {/* cast */}
            {/* <div className="w-full flex-col flex items-center justify-start gap-4">
              <h1 className="text-white/90 font-bold text-2xl font-mono">
                Your Top Casts
              </h1>

              {topCasts.map((cast: any, id: number) => (
                <CastCard
                  key={id}
                  castText={cast.text}
                  displayName={userData.display_name}
                  username={userData.username}
                  pfpImg={userData.pfp_url}
                  likesCount={cast.reactions.likes_count}
                  recastCount={cast.reactions.recasts_count}
                  timestamp={cast.timestamp}
                />
              ))}
            </div> */}

            {/* most engaged accounts */}
            {/* <div className="w-full flex-col flex items-center justify-start gap-4">
              <h1 className="text-white/90 font-bold text-2xl font-mono">
                Fav bulders
              </h1>

              <div className='w-full grid-cols-3 grid items-start justify-center  gap-4'>
                {mostEngagedAccounts.map((account: any, id: number) => (
                  <AccountCard
                    key={id}
                    displayName={account.user.display_name}
                    username={account.user.username}
                    pfpImg={account.user.pfp_url}
                    bio={account.user.profile.bio.text}
                  />
                ))}
              </div>
            </div> */}

            <div className="text-center">
              <span className="text-slate-500 text-sm font-normal ">
                Create your own via{" "}
              </span>
              <span className="text-violet-500 text-sm font-semibold ">
                Farento.
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
