"use client "
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Hero from './Hero'
import StatBox from './StatBox'
import CastCard from '../castCard'
import ActiveCasterContainer from './ActiveCasterContainer'
import FcStats from './FcStats'
import Tabs from './Tabs'
import OwnNfts from '../OwnNfts'
import ReachOut from '../ReachOut'

const ProfileContainer = () => {

    const [tab, setTab] = useState("nft")

    // handling public private switch
    const handleSwitchTab = (val: string) => {
        setTab(val);
    };

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

    const nfts = [
        {
            imageUrl: "/images/nft1.png",
            name: "Higher",
            nftUrl: ""
        },

        {
            imageUrl: "/images/nft1.png",
            name: "Higher",
            nftUrl: ""
        },

        {
            imageUrl: "/images/nft1.png",
            name: "Higher",
            nftUrl: ""
        },

        {
            imageUrl: "/images/nft1.png",
            name: "Higher",
            nftUrl: ""
        },


    ]

    const tokenBalances = [
        {
            token: {
                symbol: "USDC"
            },
            formattedAmount: "200"
        },
        {
            token: {
                symbol: "USDC"
            },
            formattedAmount: "200"
        },
        {
            token: {
                symbol: "USDC"
            },
            formattedAmount: "200"
        },
    ]

    return (
        <div className='w-full flex-col-start gap-11 p-6 md:p-[42px] bg-white border border-[#DEDEDE] rounded-3xl'>


            <div className="w-full flex-col-start gap-[27px]">

                {/* basic profile details-name, pfp & socials */}
                {/* Profile Hero */}
                <Hero />

                {/* user stats- net worth , txns on base, first txn on base, profile visits */}
                <div className="w-full flex-between gap-2 flex-nowrap ">
                    {stats.map(({ title, isIcon, val }) => {
                        return (
                            <StatBox title={title} val={val} isIcon={isIcon} />
                        )
                    })}
                </div>

            </div>

            <div className="w-full flex-center gap-8 md:!flex-row !flex-col">

                {/* pinned cast */}
                <div className="flex-col-start w-full md:w-[calc(50%-16px)] !items-start gap-2">
                    <span className="text-primary-grey text-sm font-semibold uppercase">
                        pinned cast
                    </span>

                    <CastCard
                        castText='What’s wrong with people on this app?'
                        likesCount={290}
                        recastCount={21}
                        url=''
                        repliesCount={32}
                        key={'pinned cast'}
                        img='/images/castImg1.png'
                    />
                </div>


                {/* top cast */}
                <div className="flex-col-start !items-start w-full md:w-[calc(50%-16px)]  gap-2">
                    <span className="text-primary-grey text-sm font-semibold uppercase">
                        popular cast
                    </span>

                    <CastCard
                        castText={`Proposal from /fbi and@duttsaheb.eth 1 Mil Degen grant for setting up of the first IRL Based House in Goa, India.`}
                        likesCount={290}
                        recastCount={21}
                        url=''
                        repliesCount={32}
                        key={'pinned cast'}
                        img='/images/castImg2.png'
                    />
                </div>
            </div>

            {/* active channels , top followers */}
            <FcStats />


            <div className="flex-col-start !items-start w-full  gap-2">
                {/* nfts and tokens */}
                <Tabs tab={tab} handleSwitchTab={handleSwitchTab} />

                {tab === 'nft' &&
                    <OwnNfts nfts={nfts} />
                }

                {tab === 'tokens' &&
                    <ReachOut TokenBalance={tokenBalances} />
                }

            </div>
        </div>
    )
}

export default ProfileContainer