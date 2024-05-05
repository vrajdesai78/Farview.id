import React from "react";

interface GridProps {
  heading: string;
  children: React.ReactElement;
}

const Grid = ({ heading, children }: GridProps) => {
  return (
    <div className="bg-white border border-[#E3E8EF] rounded-3xl flex flex-col p-6 lg:w-auto w-full items-center justify-between gap-6 h-[287px]">
      {/* top channels */}
      {children}

      <span className="text-center text-slate-500 text-base font-normal tracking-tight">
        {heading}
      </span>
    </div>
  );
};

export default Grid;
