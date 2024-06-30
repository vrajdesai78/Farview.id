import React from "react";

const ActiveCasterContainer = ({
  title,
  icon,
  text,
  isMain,
  isRight,
  url,
}: {
  title: string;
  icon: string;
  text?: string;
  isMain?: boolean;
  isRight?: boolean;
  url?: string;
}) => {
  return (
    <div
      className={`p-4 flex-start gap-3 ${
        isMain
          ? "w-full  border-b border-[#E5E5E5] rounded-t-2xl"
          : !isRight
          ? "w-1/2 border-r border-[#E5E5E5] rounded-bl-2xl"
          : "w-1/2 rounded-br-2xl"
      } ${url ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (url) {
          window.open(url, "_blank");
        }
      }}
    >
      <img
        src={icon}
        className={`${isMain ? "w-12 h-12" : "w-8 h-8"} rounded-full`}
        alt=''
      />

      <div className='flex-col-start !items-start gap-0.5 w-full sm:text-nowrap'>
        <span className='text-[#262626] font-medium text-sm sm:text-base'>
          {title}
        </span>
        {text && (
          <span className='text-primary-grey font-normal text-xs sm:text-base'>
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default ActiveCasterContainer;
