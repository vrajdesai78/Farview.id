import React from "react";

interface GridProps {
  heading: string;
  children: React.ReactElement;
}

const Grid = ({ heading, children }: GridProps) => {
  return (
    <div
      className={`bg-white border relative border-slate-300 rounded-3xl flex flex-col  items-center ${
        !heading.includes("Top Base NFTs")
          ? !heading.includes("Tokens")
            ? "md:h-[326px] lg:h-[287px] p-8 !pt-5"
            : "h-[188px] w-full p-8 !pt-6"
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
      ${heading.includes("Caster") ? "!justify-start gap-4" : ""}
      `}
    >
      <span className="text-center text-slate-500 text-sm lg:text-base font-normal tracking-tight">
        {heading}
      </span>

      {children}
    </div>
  );
};

export default Grid;
