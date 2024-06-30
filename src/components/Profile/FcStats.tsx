import React from "react";
import ActiveCasterContainer from "./ActiveCasterContainer";
import { TActiveChannels, TTopFollowers } from "@/types/types";

interface FcStatsProps {
  activeChannels: TActiveChannels[];
  topFollowers: TTopFollowers[];
}

const FcStats = ({ activeChannels, topFollowers }: FcStatsProps) => {
  console.log("topFollowers", topFollowers);

  const followersWithMaxCount = topFollowers.reduce(
    (topFollower, currentFollower) => {
      return currentFollower.val > topFollower.val
        ? currentFollower
        : topFollower;
    },
    topFollowers[0]
  );

  const secondaryFollowers = topFollowers.filter(
    (follower) => follower !== followersWithMaxCount
  );

  return (
    <div className='w-full flex-center gap-8 md:!flex-row !flex-col'>
      {/* active caster */}
      <div className='flex-col-start w-full md:w-[calc(50%-16px)] !items-start gap-2'>
        <span className='text-primary-grey text-sm font-semibold uppercase'>
          active caster
        </span>

        <div
          className='flex-col-start w-full bg-white rounded-2xl'
          style={{
            boxShadow:
              "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
          }}
        >
          <ActiveCasterContainer
            key={"main channel"}
            icon={activeChannels[0]?.imageUrl}
            title={`/${activeChannels[0]?.name}`}
            isMain={true}
          />

          <div className='flex-between w-full'>
            {/* secondary active channels for a user */}
            {activeChannels?.slice(1).map(({ name, imageUrl, url }, index) => {
              return (
                <ActiveCasterContainer
                  key={index}
                  icon={imageUrl}
                  title={`/${name}ssldkfjsdklfjskldjfsdklfj`}
                  isMain={false}
                  isRight={index === 1}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* top followers */}
      <div className='flex-col-start w-full md:w-[calc(50%-16px)] !items-start gap-2'>
        <span className='text-primary-grey text-sm font-semibold uppercase'>
          top followers
        </span>

        <div
          className='flex-col-start bg-white w-full rounded-2xl'
          style={{
            boxShadow:
              "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
          }}
        >
          {/* main follower which  have the most number of followerss */}
          <ActiveCasterContainer
            text={` ${
              followersWithMaxCount.val >= 1000
                ? `${Number(followersWithMaxCount.val / 1000).toFixed(0)}k`
                : followersWithMaxCount.val
            } followers`}
            key={"main follower"}
            icon={followersWithMaxCount.icon}
            title={followersWithMaxCount.title}
            isMain={true}
          />

          <div className='flex-between w-full'>
            {/* secondary followers with relative less numnber of followers */}
            {secondaryFollowers.map(({ icon, title, val }, index) => {
              return (
                <ActiveCasterContainer
                  text={` ${
                    val >= 1000 ? `${Number(val / 1000).toFixed(0)}k` : val
                  } followers`}
                  key={index}
                  icon={icon}
                  title={`@${title}`}
                  isMain={false}
                  isRight={index === 1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FcStats;
