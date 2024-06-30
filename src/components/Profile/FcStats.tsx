import React from 'react'
import ActiveCasterContainer from './ActiveCasterContainer';

const FcStats = () => {

    
    const topChannels = [
        {
            title: "Base",
            val: 69,
            icon: "/images/baseIcon.svg"
        },
        {
            title: "Base",
            val: 9,
            icon: "/images/baseIcon.svg"
        },
        {
            title: "Base",
            val: 39,
            icon: "/images/baseIcon.svg"
        },
    ]

    const topFollowers = [
        {
            title: "greg",
            val: 245000,
            icon: "/images/pfp.svg"
        },
        {
            title: "greg",
            val: 45000,
            icon: "/images/pfp.svg"
        },
        {
            title: "greg",
            val: 5000,
            icon: "/images/pfp.svg"
        },
    ]

    // channel with max no. of casts done by a user
    const channelWithMaxCasts = topChannels.reduce((maxChannel, currentChannel) => {
        return currentChannel.val > maxChannel.val ? currentChannel : maxChannel;
    }, topChannels[0]);

    // top followers with max numbber of follower count
    const followersWithMaxCount = topFollowers.reduce((topFollower, currentFollower) => {
        return currentFollower.val > topFollower.val ? currentFollower : topFollower;
    }, topFollowers[0]);

    // channel with less no. of casts done by user
    const secondaryMainChannels = topChannels.filter((channel) => channel !== channelWithMaxCasts)

    // followers with relatively less number of follower count
    const secondaryFollowers = topFollowers.filter((follower) => follower !== followersWithMaxCount)



    return (
        <div className="w-full flex-center gap-8 md:!flex-row !flex-col">

            {/* active caster */}
            <div className="flex-col-start w-full md:w-[calc(50%-16px)] !items-start gap-2">
                <span className="text-primary-grey text-sm font-semibold uppercase">
                    active caster
                </span>

                <div className="flex-col-start w-full bg-white rounded-2xl" style={{
                    boxShadow: "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
                }}>

                    {/* main channel in which user have casted the most */}

                    <ActiveCasterContainer
                        text={`Posted ${channelWithMaxCasts.val} Casts`}
                        key={'main channel'}
                        icon={channelWithMaxCasts.icon}
                        title={`/${channelWithMaxCasts.title}`}
                        isMain={true}
                    />

                    <div className="flex-between w-full">
                        {/* secondary active channels for a user */}
                        {secondaryMainChannels.map(({ icon, title, val }, index) => {
                            return (
                                <ActiveCasterContainer
                                    text={val > 1 ? `${val} Casts` : `${val} cast`}
                                    key={index}
                                    icon={icon}
                                    title={`/${title}`}
                                    isMain={false}
                                    isRight={index === 1}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>


            {/* top followers */}
            <div className="flex-col-start w-full md:w-[calc(50%-16px)] !items-start gap-2">
                <span className="text-primary-grey text-sm font-semibold uppercase">
                    top followers
                </span>

                <div className="flex-col-start bg-white w-full rounded-2xl" style={{
                    boxShadow: "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
                }}>

                    {/* main follower which  have the most number of followerss */}
                    <ActiveCasterContainer
                        text={` ${followersWithMaxCount.val >= 1000
                            ? `${Number(followersWithMaxCount.val / 1000).toFixed(0)}k`
                            : followersWithMaxCount.val} followers`}
                        key={'main follower'}
                        icon={followersWithMaxCount.icon}
                        title={followersWithMaxCount.title}
                        isMain={true}
                    />

                    <div className="flex-between w-full">
                        {/* secondary followers with relative less numnber of followers */}
                        {secondaryFollowers.map(({ icon, title, val }, index) => {
                            return (
                                <ActiveCasterContainer
                                    text={` ${val >= 1000
                                        ? `${Number(val / 1000).toFixed(0)}k`
                                        : val} followers`}
                                    key={index}
                                    icon={icon}
                                    title={`@${title}`}
                                    isMain={false}
                                    isRight={index === 1}
                                />
                            )
                        })}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default FcStats