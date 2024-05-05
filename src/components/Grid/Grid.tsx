import React from "react";

interface GridProps {
  heading: string;
  children: React.ReactElement;
}

const Grid = ({ heading, children }: GridProps) => {
  return (
    <div
      className={`bg-white border border-[#E3E8EF] rounded-3xl flex flex-col p-8  items-center ${
        !heading.includes("Owns")
          ? !heading.includes("Reach")
            ? "md:h-[326px] lg:h-[287px] "
            : "md:h-[188px] md:w-auto w-full "
          : "md:h-[188px] md:w-auto w-full"
      } ${
        heading.includes("Caster") || heading.includes("Follower")
          ? "md:w-auto w-[calc(50%-12px)]"
          : ""
      }
      ${
        heading.includes("Reach")
          ? "justify-center gap-8"
          : " justify-between  gap-6"
      }
      `}
    >
      {/* top channels */}
      {children}

      <span className="text-center text-slate-500 text-sm lg:text-base font-normal tracking-tight">
        {heading}
      </span>
    </div>
  );
};

export default Grid;
