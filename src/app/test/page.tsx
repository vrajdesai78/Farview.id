import React from "react";

const page = () => {
  const tags = [
    {
      title: `40+ txns on Base`,
      icon: "💸",
    },
    {
      title: `First txn on Base - 20 Oct'23`,
      icon: "🥇",
    },
    {
      title: `200 D since First Base txn`,
      icon: "⌛️",
    },
  ];
  const activeChannels = [
    {
      title: `fbi`,
      icon: "/images/fbiChannel.svg",
    },
    {
      title: `higher`,
      icon: "/images/higherChannel.svg",
    },
    {
      title: `degen`,
      icon: "/images/degenChannel.svg",
    },
  ];

  return (
    <div className='w-[570px] h-[320px]'>
      <div className='flex gap-3 flex-col items-center justify-start p-8 py-10 w-full h-full bg-[#7F5FC6]'>
        {/* info and channels */}
        <div className='w-full flex justify-between items-center'>
          {/* user info */}
          <div className='flex flex-col gap-4'>
            <div className='flex gap-4'>
              <img
                style={{
                  objectFit: "cover",
                }}
                className='h-12 w-12 rounded-full '
                src='https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/85687246-d19f-4cc1-3987-f4e5a9ad4b00/rectcrop3'
              />
              <div className='flex flex-col gap-2 text-white '>
                <span className='font-bold text-base'>@vrajdesai</span>
                <div className='flex gap-2  font-semibold text-sm'>
                  <span>Followers: 43</span>
                  <span>Following: 28</span>
                </div>
              </div>
            </div>
            <div className='flex-col flex items-start justify-start gap-2'>
              {tags.map(({ icon, title }: any, id: number) => (
                <div className='px-4 py-3 bg-[#6440B4] rounded-full border border-[#543696] justify-center items-center gap-2.5 inline-flex'>
                  <div className='rounded-3xl justify-center items-center flex font-normal'>
                    {/* tag icon */}
                    <span className='text-sm'>{icon}</span>
                  </div>

                  {/* tag title */}
                  <span className='text-center text-white text-sm font-normal tracking-tight'>
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* active channels */}
          <div
            className={`bg-[#6440B4] border relative border-[#543696] rounded-3xl flex flex-col  items-center w-[188px]  gap-6 justify-between h-[230px] p-6`}
          >
            <div className='flex-col justify-start items-center lg:items-start gap-5 inline-flex w-full'>
              {activeChannels.length === 0 ? (
                <span className=' text-[10px] md:text-xs  text-primary-grey font-normal max-w-[100px] text-center '>
                  This user is not active in any channels
                </span>
              ) : (
                <>
                  {activeChannels.map(({ title, icon }: any, id: number) => (
                    <div className='justify-center items-center gap-2 flex lg:flex-row flex-col'>
                      {/* not using Next Image here bcq we are getting pfp url hosted on different domain i.imgur.com and next doesn't allow this */}
                      <img
                        className='rounded-full max-w-9 max-h-9 object-cover'
                        height={36}
                        width={36}
                        alt='icon'
                        // loader={() => channelIcon}
                        src={icon}
                      />
                      <div className=' text-white text-base font-semibold leading-tight'>
                        /{title}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <span className='text-center text-white text-xs font-normal tracking-tight'>
              {"Active Caster"}
            </span>
          </div>
        </div>

        <div className='text-center text-white'>
          <span className='text-sm font-normal '>Frame via</span>{" "}
          <span className='text-sm font-semibold '>Farview.id</span>
        </div>
      </div>
    </div>
  );
};

export default page;
