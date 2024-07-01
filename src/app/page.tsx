"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserData } from "./_actions/queries";

export default function Home() {
  const [fcName, setFcName] = useState("");
  const router = useRouter();

  const [data, setData] = useState<Array<{
    userCreatedAtBlockTimestamp: string;
    userAssociatedAddresses: string[];
    profileBio: string;
    profileImage: string;
    followerCount: number;
    followingCount: number;
    profileName: string;
    profileDisplayName: string;
    userId: string;
    socialCapital: any; // Replace 'any' with the actual type if known
  }>>([]);

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
    {
      pfp: "/images/jaeckPFP.svg",
      username: "saxenasaheb.eth",
    },
    {
      pfp: "/images/jaeckPFP.svg",
      username: "bhadoriya",
    },
  ];
  useEffect(() => {
    const fetchOgs = async () => {
      try {
        const newDataPromises = ogProfiles.map(async (og) => {
          const fetchOgData = await getUserData(og.username);
          return fetchOgData.Socials.Social[0];
        });

        const newData = await Promise.all(newDataPromises);
        console.log(newData);
        setData(newData);
      } catch (error) {
        console.error("Error fetching OG profiles:", error);
      }
    };

    fetchOgs();
  }, []);

  return (
    <div className="pt-8 px-6 bg-[#F8FAFC] w-full min-h-screen flex flex-col items-center sm:gap-4 md:gap-16 gap-10 justify-start ">
      <Navbar />
      <main className="w-full min-h-[80vh] flex items-center justify-start flex-col px-6">
        <div className="w-full flex flex-col items-center justify-start gap-6 max-w-[1200px]">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-1 w-full max-w-2xl">
              <span className="text-[1.5rem] sm:text-[2rem] lg:text-[2.60rem] text-[#030816] font-black flex flex-col items-center justify-start gap-0.5 text-center">
                Your personal page to show everything you do on
                <span className=" text-primary-violet">Farcaster.</span>
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 w-full">
              {/* search input */}
              <div
                className="sm:max-w-[492px] max-w-full w-full flex gap-2 items-center bg-[#FFF] px-2 sm:px-5 py-3 md:px-8 md:py-2 rounded-2xl"
                style={
                  {
                    boxShadow: "0px 0px 0px 1px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)"
                  }
                }
              >
                <Image
                  src={"/images/search.svg"}
                  width={16}
                  height={16}
                  alt=""
                  className="max-w-4 max-h-4"
                />

                <input
                  type="text"
                  placeholder="Search username"
                  className="focus:outline-none bg-transparent w-[calc(100%-105px)] "
                  value={fcName}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick(fcName);
                  }}
                />

                <button
                  style={{
                    background: "radial-gradient(310.89% 232.9% at 18.4% -109%, #E2B2FF 0%, #9F5AFF 100%)",
                  }}
                  className={`px-[18px] py-2.5 text-[16px]  rounded-xl ml-1 flex-center `}
                  onClick={() => handleClick(fcName)}>
                  <span className="text-base font-semibold text-white">Search</span>
                </button>
              </div>
            </div>

            {/* OG PROFILES */}
            <div className="flex flex-col items-center justify-center gap-8 w-full">
              <span className="text-base font-normal text-primary-grey">
                or view some OG profiles
              </span>

              <div className="w-full flex items-center justify-center gap-8 flex-wrap max-w-[1110px]">
                {data.map((og, id) => {

                  return (
                    <Link
                      href={`/${og.profileName}`}
                      target="_blank"
                      className="flex items-center justify-start gap-4 p-5 flex-col max-w-full sm:max-w-[350px]  rounded-3xl bg-white border border-[#E5E5E5]"
                      key={id}
                    >
                      <div className='flex-start gap-[14px] !items-start  w-full  '>
                        {/* pfp img */}
                        <div className='flex-center relative w-12 h-12 rounded-full '>
                          {/* profile img */}
                          <Image
                            // src={pfp_url}
                            loader={({ src }) => src}
                            src={og.profileImage}
                            alt='pfp'
                            width={48}
                            height={48}
                            className='w-full h-full object-cover rounded-full'
                          />
                        </div>

                        <div className='flex items-start justify-start w-full flex-col gap-1.5 '>
                          <h1 className=' text-lg font-medium text-[#000] '>
                            {og.profileDisplayName}
                          </h1>

                          <p className='text-primary-grey font-normal text-base text-start max-w-full sm:max-w-[205px] '>
                            {og.profileBio.slice(0,30)+ '...'}
                          </p>
                        </div>
                      </div>

                      {/* follower count */}
                      <div className='flex-start w-full  gap-4'>
                        <span className='text-sm text-primary-grey font-normal'>
                          Followers
                          <span className='text-primary-violet font-semibold ml-1.5'>
                            {og.followerCount >= 1000
                              ? `${Number(og.followerCount / 1000).toFixed(2)}k`
                              : og.followerCount}
                          </span>
                        </span>

                        {/* following count */}
                        <span className='text-sm text-primary-grey font-normal'>
                          Following
                          <span className='text-primary-violet font-semibold ml-1.5'>
                            {og.followingCount >= 1000
                              ? `${Number(og.followingCount / 1000).toFixed(2)}k`
                              : og.followingCount}
                          </span>
                        </span>
                      </div>
                    </Link>
                  )
                }
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
