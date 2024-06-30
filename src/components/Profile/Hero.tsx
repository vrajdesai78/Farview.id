import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ShortenName from '../../../utils/nameShortner'

const Hero = () => {
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

    
    return (
        <div className="w-full flex lg:justify-between justify-start items-center md:!flex-row !flex-col ">

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
                        className="w-full h-full object-cover rounded-full"
                    />

                    {/* edit option */}
                    <div style={{
                        boxShadow: "0px 0px 0px 1px rgba(16, 24, 40, 0.08), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
                    }} className="p-1 flex-center rounded-[6px] bg-white absolute -bottom-0.5 -right-3">
                        <Image
                            // src={pfp_url}
                            src={'/images/edit.svg'}
                            alt="pfp"
                            width={16}
                            height={16}
                            className="w-4 h-4 "
                        />
                    </div>
                </div>

                <div className="flex items-start justify-start w-full flex-col gap-3 ">

                    <div className="flex items-start justify-start w-full gap-1 flex-col">
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
                    <p className="text-primary-grey font-normal text-base text-start max-w-full sm:max-w-[384px] ">
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

            <div className="flex-col-between !items-start lg:gap-0 gap-6 md:!items-end h-[141px] ">

                {/* socials */}
                <div className="md:w-[156px] w-full flex-start !justify-start gap-5 md:!justify-between">
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
                <div className=" w-full flex-end gap-2 md:!justify-end justify-start">
                    {Achievements.map(({ bg, tag, text, border }) => {
                        return (
                            <div
                                style={{
                                    borderColor: border,
                                    color: text,
                                    backgroundColor: bg
                                }}
                                className={`flex-start px-2 py-1 rounded-[360px] border text-sm font-normal text-ellipsis text-nowrap text-start w-full overflow-hidden max-w-[93px]`} >
                                {ShortenName(tag,15)}
                            </div>
                        )
                    })}

                    <div className="py-1 px-2 flex-center">
                        <span className="cursor-pointer text-sm font-normal text-[#3F3F50] ">2+</span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Hero