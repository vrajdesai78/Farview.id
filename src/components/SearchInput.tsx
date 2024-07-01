"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const [fcName, setFcName] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFcName(e.target.value);
  };

  const handleClick = () => {
    router.push(`/${fcName}`);
  };

  return (
    <div className='flex items-center justify-center gap-3 w-full'>
      {/* search input */}
      <div
        className='sm:max-w-[492px] max-w-full w-full flex gap-2 items-center bg-[#FFF] px-2 sm:px-5 py-3 md:px-8 md:py-2 rounded-2xl'
        style={{
          boxShadow:
            "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        }}
      >
        <Image
          src={"/images/search.svg"}
          width={16}
          height={16}
          alt=''
          className='max-w-4 max-h-4'
        />

        <input
          type='text'
          placeholder='Search username'
          className='focus:outline-none bg-transparent w-[calc(100%-105px)] '
          value={fcName}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        />

        <button
          style={{
            background:
              "radial-gradient(310.89% 232.9% at 18.4% -109%, #E2B2FF 0%, #9F5AFF 100%)",
          }}
          className={`px-[18px] py-2.5 text-[16px]  rounded-xl ml-1 flex-center `}
          onClick={() => handleClick()}
        >
          <span className='text-base font-semibold text-white'>Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
