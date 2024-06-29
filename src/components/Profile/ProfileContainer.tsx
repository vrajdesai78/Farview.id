"use server "
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileContainer = () => {

    const socials = [
        {
            img: "/images/x.svg",
            link: ""
        },
        {
            img: "/images/reddit.svg",
            link: ""
        },
        {
            img: "/images/yt.svg",
            link: ""
        },
    ]

    const Achievements = [
        {
            tag: "Tag 1",
            bg: "#F0FAFF",
            text: "#0075AD",
            border: "#ADE4FF"
        },
        {
            tag: "Tag 2",
            bg: "#F4F1FD",
            text: "#4316CA",
            border: "#C6B6F7"
        },
        {
            tag: "Tag 3",
            bg: "#FFF2EE",
            text: "#B82E00",
            border: "#FFCDBD"
        },
    ]

    const stats = [
        {
            title: "Net Worth",
            val: "$9139",
            isIcon: true
        },
        {
            title: "Txns on Base",
            val: "$9139",
            isIcon: false
        },
        {
            title: "First txn on Base",
            val: "29th Jul '23",
            isIcon: true
        },
        {
            title: "Profile Visit",
            val: "234",
            isIcon: false
        },
    ]
    return (
        <div className='w-full flex-col-start gap-[27px] p-[42px] bg-white border border-[#DEDEDE] rounded-3xl'>


            {/* basic profile details-name, pfp & socials */}
            <div className="w-full !flex-col-start lg:!flex-between">

                {/* pfp info*/}
                <div className="flex-start gap-6 !items-start lg:w-1/2 w-full">

                    {/* pfp img */}
                    <div className="flex-center relative w-16 h-16 max-w-16 max-h-16 rounded-full ">
                        {/* profile img */}
                        <Image
                            // src={pfp_url}
                            src={'/images/jessePFP.svg'}
                            alt="pfp"
                            width={64}
                            height={64}
                            loader={({ src }) => src}
                            unoptimized
                            className="w-full h-full object-cover"
                        />

                        {/* edit option */}
                        <div style={{
                            boxShadow: "0px 0px 0px 1px rgba(16, 24, 40, 0.08), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
                        }} className="p-4 flex-center rounded-[6px] bg-white absolute -bottm-4 right-2">
                            <Image
                                // src={pfp_url}
                                src={'/images/edit.svg'}
                                alt="pfp"
                                width={16}
                                height={16}
                                loader={({ src }) => src}
                                unoptimized
                                className="w-4 h-4 "
                            />
                        </div>
                    </div>

                    <div className="flex items-start justify-start w-full flex-col gap-3 ">

                        <div className="flex items-center justify-center w-full gap-1 sm:flex-row flex-col">
                            <h1 className=" text-lg sm:text-xl md:text-2xl font-semibold text-[#000] ">
                                {/* {display_name} */}
                                Kushal Singh
                            </h1>
                            {/* username */}
                            <span className="text-primary-grey font-normal text-xs sm:text-sm md:text-base ">
                                {/* {username.length > 0 && "@"}
                                {username} */}
                                @kuxshl
                            </span>
                        </div>

                        {/* bio */}
                        <p className="text-primary-grey font-normal text-base text-center max-w-full sm:max-w-[384px] ">
                            {/* {bio} */}
                            Product & Web Designer
                            Work→ https://kuxshl.in/
                        </p>

                        {/* {!loading && ( */}
                        <div className="flex-start w-full  gap-4">
                            {/* follower count */}

                            <span className="text-base text-primary-grey font-normal">
                                Followers
                                <span className="text-primary-violet font-semibold ml-1.5">
                                    {/* {follower_count >= 1000
                                        ? `${Number(follower_count / 1000).toFixed(2)}k`
                                        : follower_count} */}
                                    12.9k
                                </span>
                            </span>

                            {/* following count */}
                            <span className="text-base text-primary-grey font-normal">
                                Following
                                <span className="text-primary-violet font-semibold ml-1.5">
                                    {/* {following_count >= 1000
                                        ? `${Number(following_count / 1000).toFixed(2)}k`
                                        : following_count} */}
                                    1.1k
                                </span>
                            </span>
                        </div>
                        {/* )} */}
                    </div>
                </div>

                <div className="flex-col-between !items-center lg:gap-0 gap-6 lg:!items-end ">

                    {/* socials */}
                    <div className="lg:w-[156px] w-full !flex-start lg:!flex-between">
                        {socials.map((social) => {
                            return (
                                <Link href={social.link}>
                                    <Image
                                        // src={pfp_url}
                                        src={social.img}
                                        alt="pfp"
                                        width={24}
                                        height={24}
                                        className="w-6 h-6"
                                    />
                                </Link>
                            )
                        })}
                    </div>

                    {/* Achievement */}
                    <div className="lg:w-[156px] w-full !flex-start lg:!flex-between">
                        {Achievements.map(({ bg, tag, text, border }) => {
                            return (
                                <div className={`flex-center px-2 py-1 rounded-[360px] border border-[${border}] bg-[${bg}] text-sm font-normal text-[${text}] `} >
                                    {tag}
                                </div>
                            )
                        })}
                    </div>


                </div>
            </div>


            {/* user stats- net worth , txns on base, first txn on base, profile visits */}
            <div className="w-full flex-between gap-2 flex-nowrap overflow-auto no-scrollbar">

            </div>
        </div>
    )
}

export default ProfileContainer