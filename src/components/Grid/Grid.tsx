import React from "react";

interface GridProps {
  heading: string;
  children: React.ReactElement;
}

const Grid = ({ heading, children }: GridProps) => {
  return (
    <div
      className={`bg-white border relative border-[#E3E8EF] rounded-3xl flex flex-col  items-center ${
        !heading.includes("Top Base NFTs")
          ? !heading.includes("Tokens")
            ? "md:h-[326px] lg:h-[287px] p-8"
            : "h-[188px] w-full p-8"
          : "md:h-[188px] lg:w-[calc(60%)] md:w-auto w-full md:p-8 p-4 justify-end"
      } ${
        heading.includes("Caster") || heading.includes("Follower")
          ? "md:w-auto w-[calc(50%-12px)]"
          : ""
      }
      ${
        heading.includes("Reach")
          ? "justify-end gap-8 pb-[18px]"
          : " justify-between  gap-6"
      }
      `}
    >
      {children}

      <span className='text-center text-slate-500 text-sm lg:text-base font-normal tracking-tight'>
        {heading}
      </span>
    </div>
  );
};

export default Grid;
