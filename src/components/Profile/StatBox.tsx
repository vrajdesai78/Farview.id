import Image from "next/image";
import React from "react";

interface StatProps {
  title: string;
  val: string;
  isIcon?: boolean;
}
const StatBox = ({ title, val, isIcon }: StatProps) => {
  return (
    <div className='flex-col-start !items-start px-4 py-2 gap-1 lg:min-w-[190px] border h-24 border-[#E5E5E5] rounded-lg md:w-[calc(100%/4-8px)] md:h-auto'>
      <span className='text-primary-grey font-normal text-xs sm:text-sm  '>
        {title}
      </span>

      <div className='flex-start gap-1'>
        <span className='text-[#171717] font-medium text-sm sm:text-base'>
          {val}
        </span>
      </div>
    </div>
  );
};

export default StatBox;
