import Image from 'next/image';
import React from 'react'


interface StatProps {
    title: string;
    val: string;
    isIcon?: boolean;
}
const StatBox = ({
    title,
    val,
    isIcon
}: StatProps) => {
    return (
        <div className='flex-col-start !items-start px-4 py-2 gap-1 min-w-[190px] '>
            <span className="text-primary-grey font-normal text-xs sm:text-sm  ">
                {title}
            </span>

            <div className="flex-start gap-1">
                <span className="text-[#171717] font-medium text-sm sm:text-base">
                    {val}
                </span>

                {isIcon &&
                    <Image
                        // src={pfp_url}
                        src={'/images/redirectArrow.svg'}
                        alt="pfp"
                        width={64}
                        height={64}
                        loader={({ src }) => src}
                        unoptimized
                        className="w-full h-full object-cover"
                    />
                }

            </div>
        </div>
    )
}

export default StatBox