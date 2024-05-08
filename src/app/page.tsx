"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
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

  const ogProfiles = [
    {
      pfp: "/images/jessePFP.svg",
      username: "jessepollak",
    },
    {
      pfp: "/images/fishmanPFP.svg",
      username: "markfishman",
    },
    {
      pfp: "/images/proxyPFP.svg",
      username: "proxystudio.eth",
    },
    {
      pfp: "/images/jaeckPFP.svg",
      username: "jacek",
    },
  ];

  return (
    <div className='py-12 px-6 bg-[#F8FAFC] w-full flex flex-col items-center justify-start '>
      <Navbar />
      <main className='w-full h-[80vh] flex items-center justify-center flex-col py-12 px-6'>
        <div className='w-full flex flex-col items-center justify-start gap-6 max-w-[1200px]'>
          <div className='flex flex-col items-center justify-center gap-6'>
            <div className='flex flex-col items-center justify-center gap-2 w-full max-w-xl'>
              <span className='text-[2rem] md:text-[2rem] lg:text-[2.60rem] text-black font-semibold flex flex-col items-center justify-start gap-0.5 text-center'>
                Your personal page to show everything you do on
                <span className=' text-primary-violet'>Farcaster.</span>
              </span>
            </div>

            <div className='flex items-center justify-center gap-3 mt-4 w-full'>
              {/* search input */}
              <div
                className='max-w-sm flex gap-2 items-center border-[#E3E8EF] border bg-[#E3E8EF] px-5 py-3 md:px-8 md:py-6 rounded-full'
                style={
                  {
                    // boxShadow: "2px 2px 5px 1px rgba(0,0,0,.5)",
                  }
                }
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
                  className='focus:outline-none bg-[#E3E8EF] '
                  value={fcName}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick(fcName);
                  }}
                />

                <button onClick={() => handleClick(fcName)}>
                  <Image
                    src={"/images/rightArrow.svg"}
                    width={24}
                    height={24}
                    alt=''
                    className='max-w-6 max-h-6'
                  />
                </button>
              </div>
            </div>

            {/* OG PROFILES */}
            <div className='flex flex-col items-center justify-center gap-4 w-full'>
              <span className='text-base font-normal text-[#677489]'>
                or view some OG profiles
              </span>

              <div className='w-full flex items-center justify-center gap-8 flex-wrap'>
                {ogProfiles.map(
                  (
                    { pfp, username }: { pfp: string; username: string },
                    id: number
                  ) => (
                    <Link
                      href={`/${username}`}
                      target='_blank'
                      className='flex items-center justify-start gap-1 flex-col'
                      key={id}
                    >
                      <Image
                        src={pfp}
                        width={64}
                        height={64}
                        alt=''
                        className='max-w-16 max-h-16 rounded-full object-cover'
                      />
                      <span className='text-base font-normal text-primary-violet'>
                        {username}
                      </span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
