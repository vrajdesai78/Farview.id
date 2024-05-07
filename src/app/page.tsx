"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [fcName, setFcName] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFcName(e.target.value);
  };

  const handleClick = (name: string) => {
    router.push(`/${fcName}`);
  };

  return (
    <div className='py-12 px-6 bg-[#F8FAFC] '>
      <Navbar />
      <main className='w-full h-[80vh] flex items-center justify-center flex-col py-12 px-6'>
        <div className='w-full flex flex-col items-center justify-start gap-6 max-w-[1200px]'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <span className='text-[2rem] md:text-[2rem] lg:text-[2.5rem] text-black font-semibold'>
              Welcome to Farento 👋
            </span>
            <span className='text-[1rem] md:text-[1rem] text-black'>
              Search any Farcaster username below
            </span>
            <div className='flex items-center justify-center gap-3 mt-4 w-full'>
              <div
                className='max-w-sm flex gap-2 items-center border-gray-300 border bg-white px-3 py-2 md:px-4 md:py-3 rounded-2xl'
                style={{
                  boxShadow: "2px 2px 5px 1px rgba(0,0,0,.5)",
                }}
              >
                <input
                  type='text'
                  placeholder='Search username'
                  className='focus:outline-none'
                  value={fcName}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick(fcName);
                  }}
                />
                <button onClick={() => handleClick(fcName)}>
                  <svg
                    width='35'
                    height='34'
                    viewBox='0 0 35 34'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15.9236 26.9167C22.3195 26.9167 27.5043 21.8426 27.5043 15.5833C27.5043 9.32411 22.3195 4.25 15.9236 4.25C9.52767 4.25 4.34277 9.32411 4.34277 15.5833C4.34277 21.8426 9.52767 26.9167 15.9236 26.9167Z'
                      stroke='black'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M30.3996 29.7504L24.1025 23.5879'
                      stroke='black'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
