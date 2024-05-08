import { Button } from "frames.js/next";
import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {

    const tags = [
        
    ]

  return {
    image: (
      <div tw='flex gap-10 p-20 w-full h-full bg-[#7F5FC6]'>
        <div tw='flex flex-col gap-4'>
          <div tw='flex gap-4'>
            <img
              tw='h-20 w-20 rounded-full'
              src='https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/85687246-d19f-4cc1-3987-f4e5a9ad4b00/rectcrop3'
            />
            <div tw='flex flex-col gap-2'>
              <span>@vrajdesai</span>
              <div tw='flex gap-2'>
                <span>Followers: 43</span>
                <span>Following: 28</span>
              </div>
            </div>
          </div>
          <div tw='px-4 flex py-3 bg-white rounded-full border border-slate-300 justify-center items-center gap-2.5 inline-flex'>
            <div tw='rounded-3xl flex justify-center items-center flex'>
              <span className='text-xl'>💸</span>
            </div>
            <span className='text-center text-slate-500 text-sm font-normal tracking-tight'>
              500+ txns on Base
            </span>
          </div>
        </div>
      </div>
    ),
    buttons: [
      <Button action='post' target={{ query: { value: "Yes" } }}>
        View Full Profile
      </Button>,
      <Button action='post' target={{ query: { value: "No" } }}>
        See My Frame
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
