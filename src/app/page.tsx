import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { getFCDetails, getUserData } from "./_actions/queries";
import SearchInput from "@/components/SearchInput";

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

export default async function Home() {
  const newDataPromises = ogProfiles.map(async (og) => {
    const fetchOgData = await getFCDetails(og.username);
    return fetchOgData;
  });

  const data = (await Promise.all(newDataPromises)) as {
    name: string;
    pfp: string;
    address: string | undefined;
    bio: string;
    followers: number;
    following: number;
    fid: string;
    username: string;
  }[];

  console.log(data);

  return (
    <div className='pt-8 px-6 bg-[#F8FAFC] w-full min-h-screen flex flex-col items-center sm:gap-4 md:gap-16 gap-10 justify-start '>
      <Navbar />
      <main className='w-full min-h-[80vh] flex items-center justify-start flex-col px-6'>
        <div className='w-full flex flex-col items-center justify-start gap-6 max-w-[1200px]'>
          <div className='flex flex-col items-center justify-center gap-8'>
            <div className='flex items-center justify-center gap-1 w-full max-w-2xl'>
              <span className='text-[1.5rem] sm:text-[2rem] lg:text-[2.60rem] text-[#030816] font-black flex flex-col items-center justify-start gap-0.5 text-center'>
                Your personal page to show everything you do on
                <span className=' text-primary-violet'>Farcaster.</span>
              </span>
            </div>

            {/* OG PROFILES */}
            <div className='flex flex-col items-center justify-center gap-8 w-full'>
              <span className='text-base font-normal text-primary-grey'>
                or view some OG profiles
              </span>

              <SearchInput />

              <div className='w-full flex items-center justify-center gap-8 flex-wrap max-w-[1110px]'>
                {data.map((og, id) => {
                  return (
                    <Link
                      href={`/${og.username}`}
                      target='_blank'
                      className='flex items-center justify-start gap-4 p-5 flex-col max-w-full sm:max-w-[350px]  rounded-3xl bg-white border border-[#E5E5E5]'
                      key={id}
                    >
                      <div className='flex-start gap-[14px] !items-start  w-full  '>
                        {/* pfp img */}
                        <div className='flex-center relative w-12 h-12 rounded-full '>
                          {/* profile img */}
                          <Image
                            // src={pfp_url}
                            src={og.pfp}
                            alt='pfp'
                            width={48}
                            height={48}
                            unoptimized
                            className='w-full h-full object-cover rounded-full'
                          />
                        </div>

                        <div className='flex items-start justify-start w-full flex-col gap-1.5 '>
                          <h1 className=' text-lg font-medium text-[#000] '>
                            {og.name}
                          </h1>

                          <p className='text-primary-grey font-normal text-base text-start max-w-full sm:max-w-[205px] '>
                            {og.bio.slice(0, 30) + "..."}
                          </p>
                        </div>
                      </div>

                      {/* follower count */}
                      <div className='flex-start w-full  gap-4'>
                        <span className='text-sm text-primary-grey font-normal'>
                          Followers
                          <span className='text-primary-violet font-semibold ml-1.5'>
                            {og.followers >= 1000
                              ? `${Number(og.followers / 1000).toFixed(2)}k`
                              : og.followers}
                          </span>
                        </span>

                        {/* following count */}
                        <span className='text-sm text-primary-grey font-normal'>
                          Following
                          <span className='text-primary-violet font-semibold ml-1.5'>
                            {og.following >= 1000
                              ? `${Number(og.following / 1000).toFixed(2)}k`
                              : og.following}
                          </span>
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
