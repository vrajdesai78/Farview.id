import React from "react";

interface TagProps {
  title: string;
  icon: string;
}

const Tag = ({ icon, title }: TagProps) => {
  return (
    <div className='px-4 py-3 bg-white rounded-full border border-slate-300 justify-center items-center gap-2.5 inline-flex'>
      <div className='rounded-3xl justify-center items-center flex'>
        {/* tag icon */}
        <img className='w-7 h-7' src={icon} />
      </div>

      {/* tag title */}
      <span className='text-center text-slate-500 text-sm font-normal tracking-tight'>
        {title}
      </span>
    </div>
  );
};

export default Tag;
