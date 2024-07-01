"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div
      className={`w-full flex items-center px-6 max-w-[1200px] ${
        pathname !== "/" ? "justify-between" : "justify-center"
      }`}
    >
      {/* Farview */}
      <Link href={"/"} className='text-2xl font-semibold text-[#030816]'>
        <Image src={"/images/eye.svg"} alt='' width={64} height={24} />
      </Link>

      {/* share */}
      {pathname !== "/" && (
        <div className='w-24 h-11 px-6 py-3 bg-white rounded-full border border-slate-200 justify-center items-center gap-2.5 inline-flex'>
          <Link
            className='text-center text-slate-500 text-base font-normal tracking-tight'
            href={`https://warpcast.com/~/compose?embeds[]=https://www.farview.id/frames?fname=${pathname?.slice(
              1
            )}`}
            target='_blank'
          >
            Share
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
